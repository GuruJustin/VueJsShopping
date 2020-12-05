<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h6>Are you really going to remove this item?</h6>
                        <h5>Production Name : <strong>{{item.productName}}</strong></h5>
                    </div>

                    <div class="modal-footer">
                        <button v-on:click="confirmation()" type="button" style="color : #43a047!important;font-size:15px;font-family:italic">Remove</button>
                        <button v-on:click="$emit('close')" type="button" style="color : #43a047!important;font-size:15px;" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name : 'ConfirmationBox',
    props : [
      'id'
    ],
    computed: {
      ...mapGetters(['getItemDetailbyId']),
        item() {
          return this.getItemDetailbyId(this.id)
        }
    },
    methods : {
        ...mapActions(['deleteItem']),
        confirmation:function() {
          this.deleteItem(this.id)
          this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 5px 0px;
  background-color: white;
  color:rgba(0,0,0,.6);
  border-radius: 2px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  transition: .3s cubic-bezier(.25,.8,.25,1);
  border-radius: 4px;
  font-family: Helvetica, Arial, sans-serif;
  
    .modal-header {
        margin-top : 10px;
        display:flex;
        flex-direction :column;
        justify-content : center !important;
        align-items:center;
        color : rgba(0,0,0,.6);
        margin-bottom: -1px;
    }
    .modal-footer {
        height : 30px;
        display:flex;
        flex-direction :column;
        justify-content : space-between !important;
        margin-bottom:20px;
    }
}


.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>