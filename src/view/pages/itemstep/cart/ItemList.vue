<template>

    <table class="table table-bordered mt-5" >
        <thead class= "bg-primary">
            <th style="max-width:250px">Item</th>
            <th>Comments</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index" >
                <td style="max-width:250px">{{item.productName}} <br/> {{item.url}}</td>
                <td>{{item.description}}</td>
                <td><img  :src="item.imageUrl" style="max-width:100px; max-height : 100px"/></td>
                <td>{{item.quantity}}</td>
                <td>¥ {{$numberWithCommas(item.priceYen)}}</td>
                <td>¥ {{$numberWithCommas(item.priceYen * item.quantity)}}</td>
                <td>
                    <button class = "btn btn-icon btn-sm" style = "margin-left:3px" @click="openEditModal(index)"><i class = "fas fa-edit"></i></button>
                    <button class = "btn btn-icon btn-sm" style = "margin-left:3px" @click="openRemoveModal(index)"><i class = "fas far fa-trash-alt"></i></button>
                </td>
            </tr>
        </tbody>
        <ConfirmationBox
            v-show="removedialogShow"
            :id ="currentId"
            @close="removedialogShow=false"
        />
        <EditModalBox 
            v-show="editmodalShow"
            :id ="currentId"
            @close="editmodalShow=false"
        />
    </table>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import ConfirmationBox from './ConfirmationModal'
import EditModalBox from './EditModal'

export default {
    name : "ItemList",
    components : {
        ConfirmationBox,
        EditModalBox
    },
    data () {
        return {
            currentId           :   0,
            removedialogShow    :   false,
            editmodalShow       :   false
        }
    },
    computed : {
        ...mapGetters(['getItemsDetail']),
        items : {
            get () {
                return this.getItemsDetail;
            },
        }
    },
    methods : {
        ...mapActions(['addNewItem', 'deleteItem','modifyItemDetail']),
        openRemoveModal (id){
            this.currentId = id;
            this.removedialogShow = true;
        },
        openEditModal (id){
            this.currentId = id;
            this.editmodalShow = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  table thead {
    display: none;
  }
  table td {
    display: flex;
  }
  
  table td::before {
    content: attr(label);
    font-weight: bold;
    width: 120px;
    min-width: 120px;
  }
}
</style>