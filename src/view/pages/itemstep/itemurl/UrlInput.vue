<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            Please add the URL of the item you would like us to buy for you
            </h3>
        </div>
        <!--begin::Form-->
        <div class="card-body">
            <div class="form-group">
                <label for="inputUrl">Product web Page</label>
                <b-form-input v-model="itemUrl"></b-form-input>
                <span v-show="!itemUrl || !preferable" class="form-text text-muted" style = "color : red !important">Pls input the correct url of your item or Please confirm your internet connection.</span>
            </div>
            <button @click="nextStep" class="btn btn-primary mr-2">Next</button>
        </div>
    <!--end::Form-->
    </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
    name : "UrlInput",
    data () {
        return {
            preferable : true
        }
    },
    computed : {
        ...mapGetters(['getItemUrl']),
        itemUrl: {
            get(){
                return this.getItemUrl
            },
            set(value) {
                if (value.indexOf('http://') == 0 ||  value.indexOf('https://') == 0)
                    this.preferable = true;
                else this.preferable = false;

                this.updateUrl(value)
            }
        },
    },
    methods : {
        ...mapActions(['updateUrl', 'updateStep']),
        nextStep : function() {
            if (this.itemUrl && this.preferable){
                this.updateStep(2)
            }
        },
    }
}
</script>