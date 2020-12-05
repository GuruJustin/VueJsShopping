<template>
    <div  class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10">
        <div class="col-md-8">
            <item-detail/>
        </div>
        <div class = "col-md-4">
            <instant-quote />
            <help-component class = "mt-2" />
        </div>
    </div>
</template>

<script>
import ItemDetail from '@/view/pages/itemstep/itemdetail/ItemDetail'
import InstantQuote from '../common/InstantQuote.vue'
import HelpComponent from '../common/HelpComponent.vue'

export default {
    name:'ItemDetailStep',
    components : {
        ItemDetail,
        HelpComponent,
        InstantQuote
    }
}
</script>