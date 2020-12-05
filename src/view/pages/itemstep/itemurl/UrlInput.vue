<template>
    <div class="card card-custom">
        <div class="card-header">
            <h3 class="card-title">
            Add a Url for the product you want as to buy
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
        {{htmlcontent.body}}

        <div class="card-footer">
            Next we'll gather a few more details so we can make you a quote for you.
        </div>
    <!--end::Form-->
    </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

require("isomorphic-fetch")

export default {
    name : "UrlInput",
    data () {
        return {
            htmlcontent : '',
            preferable : true,
        }
    },
    computed : {
        ...mapGetters(['getItemUrl']),
        itemUrl: {
            get(){
                return this.getItemUrl
            },
            set(value) {
                if (value.indexOf('http://') == 0 ||  value.indexOf('https://') == 0)    this.preferable = true;
                else this.preferable = false;
                this.updateUrl(value)
            }
        },
    },
    methods : {
        ...mapActions(['updateUrl', 'updateStep']),
        sendRequest(url, method, body) {
            const options = {
                method: method,
                headers: new Headers({'content-type': 'application/json'}),
                mode: 'no-cors'
            };

            options.body = JSON.stringify(body);

            return fetch(url, options);
        },
        nextStep : async function() {
            if(this.itemUrl && this.preferable) 
                return this.updateStep(2)
            
            let xhr = new XMLHttpRequest();
            xhr.open('GET', "https://www.mercari.com/us/item/m25479651386/?ref=brand_detail", true)
            xhr.send();
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr)
                }
            }, false);

        }
    }
}
</script>