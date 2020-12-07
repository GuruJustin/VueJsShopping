<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            My Cart - Summary
            </h3>
        </div>
        <!--begin::Form-->
        <div class="card-body">
            <div class="form-group" >
                <div class ="row">
                    <div class = "col-6">Item Total</div>
                    <div class = "col-6">{{getAllItemPrice}}</div>
                </div>
                <div v-show="domestic == 'true'" class ="row">
                    <div class = "col-6">Domestic Shipping <span style = "color : #6993ff">(estimated)</span></div>
                    <div class = "col-6">¥{{getDomesticPrice}}</div>
                </div>

                <div class ="row">
                    <div class = "col-6">Per Shop Fee(1 @ ¥{{getPerShopFee}})</div>
                    <div class = "col-6">¥{{getPerShopFee}}</div>
                </div>

                <div class ="row">
                <div class = "col-6">Per Item Free(1 @ ¥{{getPerItemFee}})</div>
                <div class = "col-6">¥{{getPerItemFee}}</div>
                </div>

                <div class ="row">
                <div class = "col-6">Service Fee(12%)</div>
                <div class = "col-6">¥{{getAllServiceFee}}</div>
                </div>

                <div class ="row">
                <div class = "col-6">Estimated Total</div>
                <div class = "col-6">(JP) ¥{{getTotalItemPrice}}</div>
                </div>
            </div>

            <b-form-group label="Individual radios">
                <label for="inputUrl" style="font-weight:bold">Get your items faster with Domestic Shipping Pre-Approval</label>
                <b-form-radio v-model="domestic" name="some-radios" value=true>
                    I pre-approve up to ¥9.88 per-shop for domestic shipping.
                    <span class="label label-success label-pill label-inline ml-1">Recommended</span>
                </b-form-radio>
                <b-form-radio v-model="domestic" name="some-radios" value=false>
                    I want to manually approve any shipping charges (may delay your order)
                </b-form-radio>
            </b-form-group>

            <a href ="#">What is Domestic Shipping Pre-Approved</a>
        </div>
    <!--end::Form-->
    </div>
</template>

<style lang="scss" scoped>
</style>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name : 'CartSummary',
    computed : {
        ...mapGetters([
            'getDomesticSetting',
            'getItemCount',
            'getAllItemPrice',
            'getAllServiceFee',
            'getPerItemFee',
            'getPerShopFee',
            'getTotalItemPrice',
            'getDomesticPrice'
        ]),
        domestic : {
            get() {
                return this.getDomesticSetting;
            },
            set(value) {
                this.setDomestic(value);
            }
        }
    },
    methods : {
        ...mapActions(['setDomestic'])
    }
}
</script>