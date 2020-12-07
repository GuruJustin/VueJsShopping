<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            We need a few more details to create your quote.
            </h3>
        </div>
        <!--begin::Form-->
        <ProgressModalComponent
             @fetchingProduction="fetchingProduction"
             v-show="progressVisible"
        />
        <div class="card-body">
            <div class="form-group">
                <label for="inputUrl">Product web Page <span class="text-danger">*</span></label>
                <div style="display:flex;flex-direction:row">
                <input class="form-control" :disabled="!editable" v-model="getItemUrl" ref="itemurlInput"/>
                <a class = "btn btn-success" style = "width:100px" @click="updateStep(1)"><i class = "fas fa-edit"></i>Edit</a>
                </div>
            </div>
            <div class="form-group">
                <label for="inputUrl">Product Name</label>
                <input class="form-control" v-model="newItem.productName"/>
                <span v-show="!newItem.productName" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
            </div>
            <div class="form-group">
                <a @click="isDescriptable += 1">Add size, color or other options</a>
                <input class="form-control" v-model="newItem.description" v-show="isDescriptable%2"/>
                <span v-show="isDescriptable%2 && !newItem.description" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
            </div>
            <div class="form-group">
                <label for="inputUrl">Quantity to buy</label>
                <input class="form-control" v-model="newItem.quantity"/>
            </div>
            <div class="form-group">
                <label for="inputUrl">Item Price in Japanese Yen</label>
                <input class="form-control" type="number" v-model="newItem.priceYen"/>
                <span v-show="!newItem.priceYen" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
            </div>

            <div class="form-group">
                <label for="inputUrl">Product Image (beta)</label>
                <b-card
                    :img-src="newItem.imageUrl"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                >
                    <b-button href="#" variant="primary" class = "btn btn-danger btn-outline-danger"><i class = "far fa-times-circle"></i>Reject</b-button>
                </b-card>
            </div>
            
            <button type="reset" class="btn btn-primary mr-2" @click="AddItem"><i class ="fas fa-plus"></i>Add Item to Cart</button>
        </div>
        <div class="card-footer">
            Add an item to your cart to get a detailed quote.
        </div>


        <div id = "virtualDom" style = "opacity : 0">
        </div>
    <!--end::Form-->
    </div>
</template>

<style scoped>

</style>

<script>
import { mapGetters } from "vuex"
import { mapState } from "vuex"
import { mapActions } from "vuex"

import ProgressModalComponent from '../common/ProgressModalComponent'


export default {
    name : "ItemDetail",
    components : {
        ProgressModalComponent
    },
    data() {
        return {
            editable : false,
            preferable : false,
            isDescriptable : false,
            newItem : {
                id : 0,
                url: this.getItemUrl,
                productName : "",
                description : "",
                quantity : 1,
                imageUrl: "",
                priceYen : 0,
            },
            progressVisible : false
        }
    },
    watch : {
        WizardStep: function (newWizardStep, oldWizardStep) {
            if (oldWizardStep == 1) {
                this.fetchingProduction()
            }
        }
    },
    computed : {
        // ...mapActions(["item/updateUrl"]),
        ...mapGetters(['getItemUrl','getItemCount', 'getItemsDetail', 'getWizardStep']),
        WizardStep : {
            get() {
                return this.getWizardStep;
            },
            set(value) {
                if (value == 2) {
                    this.fetchingProduction()
                }
            }
        }
    },
    methods : {
        ...mapActions([
            "updateStep",
            "addNewItem"
        ]),
        fetchingProduction () {
            this.progressVisible = true
            document.getElementById('virtualDom').innerHTML = ""
            this.newItem.imageUrl = ""
            const self=this
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.getItemUrl, true);
            xhr.responseType = 'document';
            xhr.onload = function(e) {
                var doc = this.response;
                console.log(this)
                console.log(this.response)

                var s = new XMLSerializer();
                var str = s.serializeToString(doc);

                document.getElementById('virtualDom').innerHTML = str

                setTimeout(()=>{
                    var img_src = document.getElementsByTagName("img");
                    let max_img = img_src[0].clientHeight * img_src[0].clientWidth
                    for (let i = 0 ; i < img_src.length; i ++ ) {
                        if (max_img < img_src[i].clientHeight  * img_src[i].clientWidth) {
                            max_img = img_src[i].clientHeight * img_src[i].clientWidth
                            self.newItem.productName = img_src[i].alt
                            self.newItem.imageUrl = img_src[i].src
                        }
                    }
                    document.getElementById('virtualDom').innerHTML = ""
                    self.progressVisible = false
                }, 1000)
            };
            xhr.send();
        },
        AddItem() {
            if (this.newItem.productName && this.newItem.priceYen && (!this.isDescriptable || this.newItem.description)) {
                this.newItem.id = this.getItemsDetail[this.getItemCount-1].id + 1;
                this.newItem.url = this.getItemUrl;

                const self = this;
                this.addNewItem(self.newItem).then(()=>{
                    this.updateStep(3)
                })
            }
        }
    }
}
</script>
