<template>
    <div class="special-discount-sidebar">
        <div class="layout-sidebar special_discount">
            <!-- Start Secondary Sidebar Header Area--> 
            <div class="header">  
               <div class="row1">
                    <div class="form-group"><i class="fa fa-search"></i>
                        <input type="text" placeholder="Search by Name, ID No" id="search-filter" class="form-control" v-on:keyup="searchKeyUpHandler">
                    </div>
                    <span class="filter_search"><i class="fa fa-filter"> </i> </span>
               </div>
              <div class="row2">
                <p class="customer-info"><span class="label" >Special Request</span><span class="label-value" style="color: blue;" >( {{ PENDING_APPROVAL_LIST ? PENDING_APPROVAL_LIST.length : 0 }} )</span></p>
              </div>
            </div>
            <!--End Secondary Sidebar Header Area-->  
            
            <!--Start Secondary Sidebar Content Area--> 
            <div class="content jmi-scroll-section">
                <div :id="'card_body_' + i" class="card_body" v-for="(item, i) in PENDING_APPROVAL_LIST" :key="i" @click="singleItemClickHandler(item, i)">
                    <div class="row1">
                        <p>{{ item.sbu_customer_info ? (item.sbu_customer_info.display_name ? item.sbu_customer_info.display_name : '') : '' }}</p>
                    </div>
                    <div class="row2">
                        <h5>{{ item.order_no ? item.order_no : '' }}</h5>
                        <p class="tag-new">{{ item.submit_date ? dateFormat(item.submit_date) : '' }}</p>
                        <p class="search_by_item hide">{{ item.requisition_no }} {{ item.date }} {{ item.requisition }} {{ item.area }} {{ item.req_status }}</p>
                    </div>
                    <div class="row3">
                        <p class="tag-new">Total Bill<span class="label-value" >: {{ item.net_total ? Number(item.net_total).toFixed(2) : 0.00 }}</span></p>
                        <p class="tag-new"><span class="label-value" >{{ item.sales_type ? saleTypeCreator(item.sales_type) : '' }}</span></p>
                    </div>
                </div>
            </div>
            <!--End Secondary Sidebar Content Area--> 
        </div>
    </div>
</template>

<script>
// import DemoData from '../../DemoData'
// const demoData = new DemoData()
// import JMIFilter from '.././../../../../../functions/JMIFIlter'
// const jmiFilter = new JMIFilter()
import Service from '../../../../../service/ERPService_T2'
const service = new Service()
import GlobalDateFormat from '../../../../../functions/GlobalDateFormat'
const globalDateFormat = new GlobalDateFormat()

export default {
    props: [],
    components: {},
    data() {
        return {
            items: [],
            PENDING_APPROVAL_LIST: null,
        }
    },
    computed: {
        LOAD_STOCK_REQUISITION_LIST() {
            return this.$store.state.DESELECT_ALL_SELECTED_PRODUCT
        }
    },
    created() {},
    async mounted() {
        // this.items = demoData.demo_data().requisition_items
        await this.SPECIAL_ORDER_LIST__FROM_SERVICE()
    },
    methods: {
        searchKeyUpHandler(value) {
            console.log(value.key)
            // let input = document.getElementById("search-filter");
            // let filter = input.value.toUpperCase();
            // let list = document.querySelectorAll('.card_body')
            // let txt_selector = "search_by_item"

            // jmiFilter.searchById_LeftSidebar(filter, list, txt_selector)
        },
        singleItemClickHandler(item, index) {
            console.log('index : ' + index)
            console.log(item)
            // console.log(item)
            
            // let length = document.getElementsByClassName('card_body').length
            // for(let i=0; i<length; i++) {
            //     document.querySelector('#special-request-sidebar #card_body_' + i).className = 'card_body'
            // }
            // if(document.querySelector('#special-request-sidebar card_body_' + index).className === 'card_body') {
            //     document.querySelector('#special-request-sidebar #card_body_' + index).className = 'card_body active'
            // } else {
            //     document.querySelector('#special-request-sidebar #card_body_' + index).className = 'card_body'
            // }

            this.$emit('SINGLE_ITEM_SELECTED', item)
        },
        // ---------------------------------------------------------------------------
        // SERVICE CALL
        // async SOTCK_REQUISITION_LIST__FROM_SERVICE() {
        //     this.items = []
        //     await service.getStockRequisitionList_TRANSFER_REQUISITION()
        //         .then(res => {
        //             // console.log(res.data)
        //             this.items = res.data.transfer_info
        //             console.log(this.items)
        //         })
        //         .catch(err => {
        //             if(err) {
        //                 this.items = []
        //                 alert('Server Error 500. ' + err)
        //             }
        //         })
        // },
        dateFormat(dt) {
            return globalDateFormat.dateFormatT4(dt)
        },
        saleTypeCreator(data) {
            let str = null
            switch(data) {
                case 'PD':
                    str = 'Special Discount'
                    break
                case 'SR':
                    str = 'Special Rate'
                    break
                default:
                    break
            }
            
            return str
        },
        async SPECIAL_ORDER_LIST__FROM_SERVICE() {
            service.getSpecialOrdersRequestPendingApprovalList()
                .then(res => {
                    console.log(res.data)
                    this.PENDING_APPROVAL_LIST = res.data.pending_approval_list
                })
                .catch(err => {
                    if(err) {
                        console.log(err)
                        this.PENDING_APPROVAL_LIST = null
                    }
                })
        }

    },
    watch: {
        LOAD_STOCK_REQUISITION_LIST(newVal) {
            if(newVal) {
                console.log(newVal)
                this.SOTCK_REQUISITION_LIST__FROM_SERVICE()
            }
        }
    }
}
</script>

<style scoped>
.special-discount-sidebar {
    height: calc(100vh - (74px + 54px + 32px));
}
.layout-sidebar.special_discount .header .row1 {
    height: 38px;
}
.layout-sidebar.special_discount .header .row1 .form-group {
     overflow: hidden;
     height: 38px; 
}
.layout-sidebar.special_discount .header .row1 .form-group svg {
    position: absolute;
    top: 12px;
    left: 10px;
    color: #AAC0D9;
    font-size: var(--font14);
} 
 .header input {
    width: 80%;
    height: 36px;
    margin: 0;
    font-size: 14px;
}
.layout-sidebar.special_discount .header .row2 .customer-info span{
    font-weight: 500;
    padding-top: 4px;
    padding-right: 8px;
    color: var(--text-label);
    font-size: var(--front14);
}
.layout-sidebar.special_discount .content .card_body .row1 h5 {
    margin: 0;
    font-weight: 500;
    line-height: 1.2;
}
.layout-sidebar.special_discount .content .card_body .row1 h5 {
    line-height: 1.5;
}
.jmi-scroll-section {
    height: calc(100vh - (74px + 54px + 32px + 108px)) !important;
} 

.layout-sidebar.special_discount{
    min-width: var(--sidebar-width);
    width: 100%;
    border-right: 1px solid  var(--border-color);
}
/* .layout-sidebar.special_discount .header{
    background-color: var(--white);
    padding: 15px 10px;
} */
.layout-sidebar.special_discount .header .row2{
    background-color: var(--white);
    padding: 15px 10px;
}
.layout-sidebar.special_discount .header .row2 p{
    display: inline-flex;
    width: 100%;
}
.layout-sidebar.special_discount .header .row2 .form-control{
    font-size: 10px;
    border:border 1px solid #131314;
	width: 78%;
	display: inline-block;
	padding-bottom: 0px;
	padding-top: 0px;
    padding-right: 0px;
} 
.layout-sidebar.special_discount .header .row1{
    display: flex;
    justify-content:space-between; 
    padding-left: 8px;
    padding-top: 11px;
    padding-right: 8px;
}
 /* .layout-sidebar.special_discount .header .row1 .form-group {
    position: relative;
    margin-bottom: 0px!important;
    width: 100%;
    display:inline;
}*/
.layout-sidebar.special_discount .header .row1 .form-group svg{
    position: absolute; 
    top: 153px; 
    left: 72px; 
    color: #AAC0D9;
    font-size: var(--font16);
    display:inline;
    }
.layout-sidebar.special_discount .header .row1 .form-group input{
    padding-left: 36px;
    border-radius: 2px;
    border: 1px solid var(--border-color);
}
/*.layout-sidebar.special_discount .header .row1 .form-group input::placeholder{
    font-size: var(--font14) ;
    color: #AAC0D9;
}
.layout-sidebar.special_discount .header .row1 .form-group input:focus{
    border-color: var(--blue);
    box-shadow: none;
}*/
.layout-sidebar.special_discount .header .row1 .filter_search{
    color: #AAC0D9;
    font-size: var(--font16);
    text-align: center;
    padding: 8px;
    height: 38px;
    width: 38px;
    border-radius: 2px;
    border: 1px solid  var(--border-color);
    margin-left: 10px;
    display:inline;
}
.layout-sidebar.special_discount .header .row1 .filter_search:hover{
    color: var(--white);
    background-color: var(--blue);
}  
/*End Secondary Sidebar Header Area*/

/*Start Secondary Sidebar Content Area*/
/* .layout-sidebar.special_discount .content{
    height: calc( 100vh - (var(--used-height) + 68px + 45px) );
    overflow-y: scroll;
} */
.layout-sidebar.special_discount .content .card_body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--white);
    border-bottom: 1px solid var(--border-color);
}
.layout-sidebar.special_discount .content .card_body:hover,
.layout-sidebar.special_discount .content .card_body:active {
    background-color: var(--bluish-white);
}
.layout-sidebar.special_discount .content .card_body .row1,
.layout-sidebar.special_discount .content .card_body .row2,
.layout-sidebar.special_discount .content .card_body .row3 {
    margin: 1px 0px;
    display: flex;
    justify-content:space-between; 
}
.layout-sidebar.special_discount .content .card_body .row2 .order-status{
	color: #f0ad4e ;
}
.layout-sidebar.special_discount .content .card_body .row3 .zmdi-check-square{
	color: var(--blue);
}
.layout-sidebar.special_discount .content .card_body .row2 h5 {
    font-size: var(--font14);
    color: var(--blue);
    text-overflow: ellipsis;
    width: inherit;
    white-space: nowrap;
}
.layout-sidebar.special_discount .content .card_body .row2 .tag {
    text-align: center;
    font-size: var(--font10) ;
    color: var(--black);
    padding: 1px 6px;
    border-radius: 50px;
}
.layout-sidebar.special_discount .content .card_body .row2 .tag .p .span{
    text-align: center;
    font-size: var(--font10) ;
	color:#d41d10!important;
    padding: 1px 6px;
    border-radius: 50px;
	display: inline-block;
}
.layout-sidebar.special_discount .content .card_body .row1 p {
    font-size: var(--font14) ;
    color: var(--text-black);
}
.layout-sidebar.special_discount .content .card_body .row3 p {
    font-size: var(--font14);
    color: #879097;
}
</style>