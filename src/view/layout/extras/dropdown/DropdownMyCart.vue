<template>
  <form>
    <!--begin::Header-->
    <div
      class="d-flex align-items-center py-10 px-8 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <span class="btn btn-md btn-icon bg-white-o-15 mr-4">
        <i class="flaticon2-shopping-cart-1 text-success" />
      </span>
      <h4 class="text-white m-0 flex-grow-1 mr-3">My Cart</h4>
      <button type="button" class="btn btn-success btn-sm">{{getItemCount}} Items</button>
    </div>
    <!--end::Header-->

    <div class="scroll scroll-push">
      <perfect-scrollbar
        class="scroll"
        style="max-height: 30vh; position: relative;"
      >
        <!--begin::Item-->
        <template v-for="(item, i) in getItemsDetail">
          <div
            class="d-flex align-items-center justify-content-between p-8"
            v-bind:key="i"
          >
            <div class="d-flex flex-column mr-2">
              <a
                href="#"
                class="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
              >
                {{ item.productName }}
              </a>
              <span class="text-muted">
                {{ item.description }}
              </span>
              <div class="d-flex align-items-center mt-2">
                <span class="font-weight-bold mr-1 text-dark-75 font-size-3">
                  ¥{{ $numberWithCommas(item.priceYen) }}
                </span>
                <span class="text-muted mr-1">for</span>
                <span class="font-weight-bold mr-2 text-dark-75 font-size-3">
                  {{ item.quantity }}
                </span>
              </div>
            </div>
            <a href="#" class="symbol symbol-70 flex-shrink-0">
              <img :src="item.imageUrl" alt="" />
            </a>
          </div>
        </template>
        <!--end::Item-->
        <div class="separator separator-solid"></div>
      </perfect-scrollbar>
    </div>

    <!--begin::Summary-->
    <div class="p-8">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <span class="font-weight-bold text-muted font-size-sm mr-2">Total</span>
        <span class="font-weight-bolder text-dark-50 text-right">¥ {{$numberWithCommas(getTotalItemPrice)}}</span>
      </div>
    </div>
    <!--end::Summary-->
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "KTDropdownMyCart",
  data() {
    return {
      list: [
        {
          title: "iBlender",
          desc: "Best kichen badge in 2020",
          price: "$ 350",
          quantity: "5",
          img: process.env.BASE_URL + "media/stock-600x400/img-1.jpg"
        },
        {
          title: "SmartCleaner",
          desc: "Smart tool for cooking",
          price: "$ 650",
          quantity: "4",
          img: process.env.BASE_URL + "media/stock-600x400/img-2.jpg"
        },
        {
          title: "CameraX",
          desc: "Professional camera for edge cutting shots",
          price: "$ 150",
          quantity: "3",
          img: process.env.BASE_URL + "media/stock-600x400/img-3.jpg"
        },
        {
          title: "3DPrinted",
          desc: "Manufactoring unique objects",
          price: "$ 1450",
          quantity: "7",
          img: process.env.BASE_URL + "media/stock-600x400/img-4.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['getItemsDetail', 'getItemCount', 'getTotalItemPrice']),
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    }
  }
};
</script>
