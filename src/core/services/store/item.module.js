export const DOMESTICSHIPPING = 9.92;

const state = {
    itemurl : "http://www.heyhey.com",
    domestic : false,
    domesticPrice : 1000,
    perItemFee : 500,
    perShopFee : 500,
    serviceFee : 12,
    items: [
        {
            id : 1,
            url:"https://www.mercari.com/us/item/m25479651386/?ref=brand_detail",
            productName : "Heyhey's Head",
            description : "I don't know what it is exactly",
            quantity : 1,
            imageUrl: "https://res.cloudinary.com/whiterabbitexpress-dev/image/fetch/c_fit,h_200,w_200/https://wre-product-image-cache.s3.amazonaws.com/image%257C3%257C1021615885",
            priceYen : 2300,
        }
    ]
};

const getters = {
    /**
     * Get list of breadcrumbs for current page
     * @param state
     * @returns {*}
     */
    getItemUrl(state){
        return state.itemurl;
    },
    getItemsDetail(state) {
        return state.items
    },
    getItemDetailbyId : (state)=>(id) =>{
        return state.items[id]
    },
    getDomesticPrice(state) {
        return state.domesticPrice
    },
    getDomesticSetting(state) {
        return state.domestic
    },

    // Get All type of Item price details
    getItemCount(state){
        return state.items.length
    },
    getAllItemPrice(state, getters) {
        let sum = 0;
        let cnt = getters.getItemCount
        for (let i = 0 ; i < cnt ; i ++) 
            sum += state.items[i].priceYen * state.items[i].quantity
        return sum
    },
    getAllServiceFee(state,getters) {
        return getters.getAllItemPrice * 1.0 * 12 / 100
    },
    getPerItemFee(state) {
        return state.perItemFee
    },
    getPerShopFee(state) {
        return state.perShopFee
    },
    getTotalItemPrice(state, getters) {
        let cnt = getters.getItemCount
        console.log(cnt);
        let total = state.domestic == true ? state.domesticPrice : 0
        total += (getters.getAllItemPrice + cnt * (getters.getPerItemFee + getters.getPerShopFee) + getters.getAllServiceFee)
        return total
    }
};

const mutations = {
    UPDATE_ITEMURL(state, value) {
        state.itemurl = value
    },
    ADD_NEWITEM(state, value) {
        const newItem = {}
        Object.assign(newItem, value);
        state.items.push(newItem)
    },
    DELETE_ITEM(state, index) {
        state.items.splice(index, 1)
    },
    MODIFY_ITEMDETAIL(state, value) {
        Object.assign(state.items[value.id], value.detail);
    },
    SET_DOMESTIC(state, value) {
        state.domestic = value
    }
};

const actions = {
    updateUrl({commit}, n) {
        commit("UPDATE_ITEMURL", n)
    },
    addNewItem({commit}, value){
        commit("ADD_NEWITEM", value)
    },
    deleteItem({commit}, index){
        commit("DELETE_ITEM", index)
    },
    modifyItemDetail(context, value){
        return new Promise((resolve, reject) => {
            context.commit("MODIFY_ITEMDETAIL", value);
            resolve(value)
        })
    },
    setDomestic(context, value) {
        return new Promise((resolve, reject) => {
            context.commit('SET_DOMESTIC', value)
            resolve(value)
        });
    }
}


export default {
    state,
    actions,
    mutations,
    getters
};
