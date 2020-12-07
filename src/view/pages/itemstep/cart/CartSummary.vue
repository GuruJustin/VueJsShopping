<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            My Cart - Summary
            </h3>
        </div>
        <!--begin::Form-->
        <div class="card-body">
            <div class="form-group" style="font-size : 15px; font-weight : 600; font-family : 'Font Awesome 5 Free'">
                <div class ="row">
                    <div class = "col-6">Item Total :</div>
                    <div class = "col-6">¥ {{ $numberWithCommas(getAllItemPrice)}}</div>
                </div>
                <div v-show="domestic == 'true'" class ="row" style = "margin-top : -20px">
                    <div class = "col-6">Domestic Shipping :<span style = "color : #6993ff">(estimated)</span></div>
                    <div class = "col-6">¥ {{$numberWithCommas(getDomesticPrice)}}</div>
                </div>

                <div class ="row"  style = "margin-top : -20px">
                    <div class = "col-6">Packing fee : </div>
                    <div class = "col-6">¥ {{$numberWithCommas(getPerShopFee)}}</div>
                </div>

                <div class ="row" style = "margin-top : -20px">
                <div class = "col-6">Service Fee(12%) :</div>
                <div class = "col-6">¥ {{$numberWithCommas(getAllServiceFee)}}</div>
                </div>

                <div class ="row" style = "margin-top : -20px">
                <div class = "col-6">Estimated Total :</div>
                <div class = "col-6">(JP) ¥{{$numberWithCommas(getTotalItemPrice)}}</div>
                </div>
            </div>

            <b-form-group >
                <label for="inputUrl" style="font-weight:bold">Pre-approve shipping and get your items faster!</label>
                <b-form-radio v-model="domestic" name="some-radios" value=true>
                    I want my items ASAP and approve ¥ 2,500 for shipping.
                    <span class="label label-success label-pill label-inline ml-1">Recommended</span>
                </b-form-radio>
                <b-form-radio v-model="domestic" name="some-radios" value=false>
                    I want to apporve the correct shipping costs after I pay for the items/
                </b-form-radio>
            </b-form-group>

            <a href ="#">Why should I pre-approve shipping?</a>
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