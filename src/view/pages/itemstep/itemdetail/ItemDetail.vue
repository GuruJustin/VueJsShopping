<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            Almost there! We just need a few more details to complete your order.
            </h3>
        </div>
        <!--begin::Form-->
        <ProgressModalComponent
             @fetchingProduction="fetchingProduction"
             v-show="progressVisible"
        />
        <div class="card-body">
            <div class="form-group">
                <label for="inputUrl">Product web Page</label>
                <div style="display:flex;flex-direction:row">
                <input class="form-control" :disabled="!editable" v-model="getItemUrl" ref="itemurlInput"/>
                <a class = "btn btn-success" style = "width:100px" @click="updateStep(1)"><i class = "fas fa-edit"></i>Edit</a>
                </div>
            </div>
            <div class="form-group">
                <label for="inputUrl">Product Name <span class="text-danger">*</span></label>
                <input class="form-control" v-model="newItem.productName"/>
                <span v-show="!newItem.productName" class="form-text text-muted" style = "color : red !important">If applicable - any additional comments are welcome too</span>
            </div>
            <div class="form-group">
                <a @click="isDescriptable += 1" style="cursor:pointer">Add size, color or other options</a>
                <input class="form-control" v-model="newItem.description" v-show="isDescriptable%2"/>
                <span v-show="isDescriptable%2 && !newItem.description" class="form-text text-muted" style = "color : red !important">If applicable - if you have no comments please write: No comments or /. Any additional comments are welcome too.</span>
            </div>
            <div class="form-group">
                <label for="inputUrl">Quantity to buy <span class="text-danger">*</span></label>
                <input class="form-control"  type="number"  v-model="newItem.quantity"/>
            </div>
            <div class="form-group">
                <label for="inputUrl">Item Price in Japanese Yen <span class="text-danger">*</span></label>
                <input class="form-control" type="number" v-model="newItem.priceYen"/>
                <span v-show="!newItem.priceYen" class="form-text text-muted" style = "color : red !important">Numbers only, no Yen(¥) sign or JPY needed</span>
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
            isDescriptable : 0,
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
            "addNewItem",
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
                }, 1500)
            };
            xhr.send();
        },
        AddItem() {
            console.log(!this.isDescriptable)
            if (this.newItem && this.newItem.productName && this.newItem.priceYen && (!(this.isDescriptable%2) || this.newItem.description)) {
                this.newItem.url = this.getItemUrl;
                if (this.getItemCount != 0) 
                    this.newItem.id = this.getItemsDetail[this.getItemCount-1].id + 1
                else
                    this.newItem.id = 1;

                const self = this;
                this.addNewItem(self.newItem).then(()=>{
                    this.updateStep(3)
                })
            }
        }
    }
}
</script>
