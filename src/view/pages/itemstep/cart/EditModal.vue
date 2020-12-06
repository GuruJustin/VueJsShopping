<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                  <div class="modal-header">
                      <h6>Edit</h6>
                  </div>

                  <div class="card-body" style = "max-height : 500px; overflow:auto">
                    <div class="form-group">
                        <label for="inputUrl">Product web Page <span class="text-danger">*</span></label>
                        <input class="form-control" disabled="disabled" :value="getItemUrl"/>
                    </div>
                    <div class="form-group">
                        <label for="inputUrl">Product Name</label>
                        <input class="form-control" v-model="newItem.productName"/>
                        <span v-show="!newItem.productName" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
                    </div>
                    <div class="form-group">
                        <a @click="isDescriptable += 1">Add size, color or other options</a>
                        <input class="form-control" v-model="newItem.description" v-show="isDescriptable%2"/>
                        <span v-show="isDescriptable%2 && !newItem.description" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
                    </div>
                    <div class="form-group">
                        <label for="inputUrl">Quantity to buy</label>
                        <input class="form-control" v-model="newItem.quantity"/>
                    </div>
                    <div class="form-group">
                        <label for="inputUrl">Item Price in Japanese Yen</label>
                        <input class="form-control" type="number" v-model="newItem.priceYen"/>
                        <span v-show="!newItem.priceYen" class="form-text text-muted" style = "color : red !important">Please Input the Production Name.</span>
                    </div>
                    <div class="form-group">
                        <label for="inputUrl">Product Image (beta)</label>
                        <b-card
                            :img-src="newItem.imageUrl"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                        >
                            <b-button href="#" variant="primary" class = "btn btn-danger btn-outline-danger"><i class = "far fa-times-circle"></i>Reject</b-button>
                        </b-card>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button v-on:click="saveChange()" type="button" style="color : #43a047!important;font-size:15px;font-family:italic">SAVE</button>
                    <button v-on:click="$emit('close')" type="button" style="color : #43a047!important;font-size:15px;" data-dismiss="modal">CANCEL</button>
                  </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  name : 'EditModalBox',
  props : [
    'id'
  ],
  data () {
    return {
      isDescriptable : false,
      newItem : {
        productName : '',
        description : "",
        quantity : 0,
        priceYen : 0
      }
    }
  },
  mounted () {
    Object.assign(this.newItem, this.item)
  },
  watch:{
    id : function(val){
     Object.assign(this.newItem, this.item)
    }
  },
  computed: {
    ...mapGetters(['getItemDetailbyId', 'getItemUrl']),
    item : {
      get() {
        return this.getItemDetailbyId(this.id)
      },
      set() {
      }
    }
  },
  methods : {
    ...mapActions(['modifyItemDetail']),
    saveChange : function() {
      console.log('heyehey');
      let value = {
        'id': this.id,
        'detail' : this.newItem
      }
      this.modifyItemDetail(value).then((res) => {
        console.log(res)
      })
      this.$emit('close') 
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
  width: 600px;
  margin: 0px auto;
  padding: 5px 0px;
  background-color: white;
  color:rgba(0,0,0,.6);
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
  margin: 10px 0;
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