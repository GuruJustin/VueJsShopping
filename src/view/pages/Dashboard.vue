<template>
  <div class="card card-custom">
    <div class="card-body p-0">
      <!--begin: Wizard-->
      <div
        class="wizard wizard-1"
        id="shopItemWizard"
        data-wizard-state="step-first"
        data-wizard-clickable="true"
      >
        <!--begin: Wizard Nav-->
        <div class="wizard-nav border-bottom">
          <div class="wizard-steps p-8 p-lg-10" style = "justify-content :space-around">
            <div
              class="wizard-step"
              data-wizard-type="step"
              :data-wizard-state="stepNumber == 1?'current':''"
               @click="stepNumber=1"
            >
              <div class="wizard-label">
                <i class="wizard-icon flaticon-bus-stop"></i>
                <h3 class="wizard-title">Item URL</h3>
              </div>
              <i class="wizard-arrow flaticon2-next"></i>
            </div>
            
            <div class="wizard-step" data-wizard-type="step" 
              :data-wizard-state="stepNumber == 2?'current':''"
              @click="stepNumber=2">
              <div class="wizard-label">
                <i class="wizard-icon flaticon-list"></i>
                <h3 class="wizard-title">Item Detail</h3>
              </div>
              <i class="wizard-arrow flaticon2-next"></i>
            </div>
            <div 
            class="wizard-step" data-wizard-type="step"
            :data-wizard-state="stepNumber == 3?'current':''"
              @click="stepNumber=3">
              <div class="wizard-label">
                <i class="wizard-icon flaticon-responsive"></i>
                <h3 class="wizard-title">My Cart</h3>
              </div>
              <i class="wizard-arrow flaticon2-next"></i>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-label">
                <i class="wizard-icon flaticon-truck"></i>
                <h3 class="wizard-title">Checkout</h3>
              </div>
              <i class="wizard-arrow flaticon2-next"></i>
            </div>
          </div>
        </div>
        <!--end: Wizard Nav-->
        <!--begin: Wizard Body-->
        <div>
          <InputUrlStep v-show="stepNumber == 1"/>
          <ItemDetailStep v-show="stepNumber == 2"/>
          <MyCartStep v-show="stepNumber == 3"/>
        </div>
        <!--end: Wizard Body-->
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>


<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module"
import KTWizard from "@/assets/js/components/wizard"
import Swal from "sweetalert2"

import InputUrlStep from './itemstep/itemurl/Index.vue'
import ItemDetailStep from './itemstep/itemdetail/Index.vue'
import MyCartStep from './itemstep/cart/Index'

import { mapGetters, mapActions } from 'vuex'


export default {
  name: "dashboard",
  components: {
    InputUrlStep,
    ItemDetailStep,
    MyCartStep
  },
  computed : {
    ...mapGetters(['getWizardStep']),
    ...mapActions(['updateStep']),
    stepNumber : {
      get () {
        return this.getWizardStep
      },
      set (newStep) {
        return this.$store.dispatch('updateStep', newStep)
      }
    }
  },
  data(){
    return {
      current_step : 1
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Shoppu from Japan - Order anything you want from Japan" },
    ]);

    // Initialize form wizard
    const wizard = new KTWizard("shopItemWizard", {
      stepNumber : this.stepNumber, // initial active step number
      clickableSteps: true // allow step clicking
    });

    // Validation before going to next page
    wizard.on("beforeNext", function(/*wizardObj*/) {
      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    // wizard.on("change", function(/*wizardObj*/) {
    //   setTimeout(() => {
    //     KTUtil.scrollTop();
    //   }, 500);
    // });
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    },

    
    submit: function(e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary"
      });
    }
  }
};
</script>
