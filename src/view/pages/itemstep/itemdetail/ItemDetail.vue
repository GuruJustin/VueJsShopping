<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            We need a few more details to create your quote.
            </h3>
        </div>
        <!--begin::Form-->
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
                <input class="form-control" type="number" v-model="newItem.price.priceYen"/>
                <span v-show="!newItem.price.priceYen" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
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
    <!--end::Form-->
    </div>
</template>

<style scoped>

</style>

<script>
import { mapGetters } from "vuex"
import { mapState } from "vuex"
import { mapActions } from "vuex"

export default {
    name : "ItemDetail",
    data() {
        return {
            editable : false,
            preferable : false,
            isDescriptable : false,
            newItem : {
                id : 0,
                url: "https://www.mercari.com/us/item/m25479651386/?ref=brand_detail",
                productName : "",
                description : "",
                quantity : 1,
                imageUrl: "https://res.cloudinary.com/whiterabbitexpress-dev/image/fetch/c_fit,h_200,w_200/https://wre-product-image-cache.s3.amazonaws.com/image%257C3%257C1021615885",
                price : {
                    priceYen : 0,
                }
            }
        }
    },
    computed : {
        // ...mapActions(["item/updateUrl"]),
        ...mapGetters(['getItemUrl','getItemCount', 'getItemsDetail']),
    },
    methods : {
        ...mapActions([
            "updateStep",
            "addNewItem"
        ]),
        AddItem() {
            if (this.newItem.productName && this.newItem.price.priceYen && (!this.isDescriptable || this.newItem.description)) {
                this.newItem.id = this.getItemsDetail[this.getItemCount-1].id + 1;
                const self = this;
                this.addNewItem(this.newItem)
                //this.updateStep(3)
            }
        }
        // editUrl() {
        //     this.editable = true
        //     const inputEle = this.$refs.itemurlInput;
        //     inputEle.focus()
        // },
        // newUrl() {
        //     console.log("The Item Url has changed")
        //     this.updateUrl(value)
        // }
    }
}
</script>
