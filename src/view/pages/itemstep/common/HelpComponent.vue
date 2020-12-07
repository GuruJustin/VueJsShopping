<template>
    <div class = "card">
        <div class="card card-custom">
            <div class="card-header"  style = "padding:8px 15px 8px 15px; min-height : 45px;">
                <div class="card-title">
                    <h3 class="card-label" style = "color : #6993ff">
                        <i class = "fas fa-info-circle" style = "color : #6993ff"></i>  Help
                    </h3>
                </div>
            </div>
            <div class="card-body" style = "padding:8px 15px 8px 15px">

                <div class="form-group" style="margin-bottom:0.5rem">
                    <label for="inputUrl">Shoppu from Japan is your private shopping service from Japan</label>
                    
                    <div class = "help-list">
                        <div class = "help-list-wrapper"><i class = "fas fa-home"></i></div>
                        <div class = "help-list-container">
                            <div class = "mb-1" style="color : #6993ff">About Service</div>
                            <div class = "mb-1">Visit our <a href = "/home">home page</a> for an overview of our services</div>
                        </div>
                    </div>
                    
                    <!-- <div class = "help-list">
                        <div class = "help-list-wrapper"><i class = "fas fa-location-arrow"></i></div>
                        <div class = "help-list-container">
                            <div class = "help-list-title mb-1" style="color : #6993ff">
                                Tour this page
                                <span class="label label-success label-pill label-inline ml-1">New</span>
                            </div>
                            <div class = "mb-1">Visit our Take a guided tour of this page
                            </div>
                        </div>
                        <div class = help-list-btn>
                            <button class = "btn btn-primary btn-outline-primary">
                                <i class = "fas fa-map-marker-alt"></i>
                                Start Tour
                            </button>
                        </div>
                    </div> -->

                    <div class = "help-list">
                        <div class = "help-list-wrapper"><i class = "fas fa-calculator"></i></div>
                        <div class = "help-list-container">
                            <div class = "help-list-title mb-1" style="color : #6993ff">
                                Shipping Rate
                                <span class="label label-success label-pill label-inline ml-1">New</span>
                            </div>
                            <div class = "mb-1">Check our shipping rates</div>
                        </div>
                        <div class = help-list-btn>
                            <button class = "btn btn-primary btn-outline-primary">
                                <i class = "fas fa-plus-square"></i>
                                Check
                            </button>
                        </div>
                    </div>
                    
                </div>
                
            </div>

            <div class="card-fotter" style = "padding:8px 15px 8px 15px">
                <button class = "btn btn-primary" style = "color:white;">
                    <i class = "fas fa-shopping-cart"></i>Support
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"HelpComponent",
}
</script>

<style lang="scss" scoped>
.help-list{
    margin-top : 10px;
    display:flex !important;
    flex-direction : row !important;
    align-items:center;
    justify-content: space-between;
    .help-list-wrapper {
        i {
            color : #6993ff;
            font-size : 20px;
        }
        display:flex;
        align-items:center;
        justify-content:center;
        width : 50px;
    }
    .help-list-containter {
        display:flex;
        flex-direction:column;
        .help-list-title{
            span{
                padding : 2px 5px 2px 5px !important;
                margin-left : 25px !important;
            }
        }
    }
    .help-list-btn{
        button {
            width : 80px;
            padding : 2px;
        }
    }
}
</style>