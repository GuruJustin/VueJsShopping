<template>
    <div  class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10">
        <div class="col-md-8">
            <url-input />
        </div>
        <div class = "col-md-4">
            <instant-quote />
            <help-component class = "mt-2" />
        </div>
    </div>
</template>

<script>
import UrlInput from '@/view/pages/itemstep/itemurl/UrlInput'
import InstantQuote from '../common/InstantQuote.vue'
import HelpComponent from '../common/HelpComponent.vue'

export default {    
    name:'InputUrlStep',
    components : {
        UrlInput,
        HelpComponent,
        InstantQuote
    }
}
</script>