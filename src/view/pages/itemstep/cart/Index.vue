<template>
    <div  class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10">
        <div class="col-md-8">
            <cart-summary/>
        </div>
        <div class = "col-md-4">
            <instant-quote />
            <help-component class = "mt-2" />
        </div>

        <item-list />
    </div>
</template>

<script>
import CartSummary from '@/view/pages/itemstep/cart/CartSummary'
import ItemList from '@/view/pages/itemstep/cart/ItemList'
import InstantQuote from '../common/InstantQuote.vue'
import HelpComponent from '../common/HelpComponent.vue'

export default {
    name:'MyCartStep',
    components : {
        CartSummary,
        ItemList,
        HelpComponent,
        InstantQuote
    }
}
</script>