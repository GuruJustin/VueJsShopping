<template>
    <div class = "card">
        <div class="card card-custom">
            <div class="card-header"  style = "padding:8px 15px 8px 15px; min-height : 45px;">
                <div class="card-title">
                    <h3 class="card-label">
                        Instant Quote : <span style = "color:red">¥ {{$numberWithCommas(getTotalItemPrice)}}</span>
                    </h3>
            </div>
            </div>
            <div class="card-body" style = "padding:8px 15px 8px 15px">
                <div class="form-group" style="margin-bottom:0.5rem">
                    <label for="inputUrl">View Cart for details</label>
                    <button @click="updateStep(3)" class = "btn btn-warning" style = "color:white; width:100%" >
                        My Cart
                        <i class = "fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name:"InstantQuote",
    computed : {
        ...mapGetters(['getTotalItemPrice'])
    },
    methods : { 
        ...mapActions(['updateStep']),
    }
}
</script>