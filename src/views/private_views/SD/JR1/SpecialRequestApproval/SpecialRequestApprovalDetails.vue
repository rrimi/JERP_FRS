<template>
    <div class="special-request-approval-details" id="special-request-approval-details">
        <div class="layout-container">
            <div class="container-fluid">
                <div class="special_request_approval_body">
                    <div class="special_request_approval_area">
                        <div class="row special_request_approval_header">
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle">
                                <p class="header_1">Order ID : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.order_no : '' }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle_second">
                                <p class="header_2">Customer : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.customer_name : ''  }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_3">Request Type : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.sales_type ? ORDER_DETAILS.sales_type == 'SR' ? 'Special Rate' : '' : '' : ''}}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle">
                                <p class="header_4">Territory : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.area_name : '' }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle_second">
                                <p class="header_5">Address : <span class="header-lvl-value">Address</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_6">Order Date :<span class="header-lvl-value">{{ ORDER_DETAILS ? dateFormat(ORDER_DETAILS.submit_date) : ''  }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_7">AM : <span class="header-lvl-value">{{ ORDER_DETAILS ? (ORDER_DETAILS.am) : ''  }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_8">MIO : <span class="header-lvl-value">{{ ORDER_DETAILS ? (ORDER_DETAILS.mio) : ''  }}</span></p>
                            </div>
                        </div>
                        <div class="special_request_approval_content">
                            <table class="table special_request_approval-table">
								<thead>
									<tr>
										<th scope="col"><p>Name</p></th>
										<th scope="col"><p>Trade Price <br> <small> (TP+VAT) </small></p></th>
										<th scope="col"><p>New TP</p></th>
										<th scope="col"><p>Quantity</p></th>
										<!-- <th scope="col"><p>Discount</p></th>
										<th scope="col"><p>Bonus</p></th> -->
										<th scope="col"><p>Total Price</p></th>
									</tr>
								</thead>
								<tbody>
								<tr v-for="(item, index) in ORDER_DETAILS_TABLE_DATA" v-bind:key="index">
									<td> {{  item.product_name }} </td>
									<td>  {{ item ? Number(parseFloat(item.standard_tp) + parseFloat(item.vat)).toFixed(2) :'' }} </td>
									<td><div class="form-group"><span class="new_tp-increase" @click="decreaseOrderedItemClickHandler(data, i)"><i class="zmdi zmdi-minus"></i> </span>
                                        <input :id="'new-tp-qty-' + i" type="number" :value="item.unit_tp" class="form-control" v-on:keyup="newtpKeyUp_request_approval_table(data, $event, i)" min="1" step="1" v-on:keydown="newtpKeyDown_request_approval_table($event, i)">
                                        <span class="qty-decrease" @click="increaseOrderedItemClickHandler(data, i)"><i class="zmdi zmdi-plus"></i> </span> </div> </td>
									<td> {{ Number(item.qty).toFixed(2) }} </td>
									<!-- <td> {{ item.qty }} </td> -->
									<!--<td> {{ Number(item.discount).toFixed(2) }}</td>
									<td> {{ item.bonus }} </td>-->
									<td> {{ Number(item.line_total).toFixed(2) }} </td>
								</tr>
								</tbody>
                            </table>
                        </div>
                    </div>
					<div class="submit-section">	
                        <div class="reason">
                            <p><span class="label">Reason</span><span class="label-value"> : </span></p>
                        </div>
						<div class="submit-section-percentage">
							<p><span>Valid Untill:</span><input type="date" value="2017-06-01"></p>
							<p><button type="button" class="btn btn-outline-danger">Cancel</button>
							<button type="button" class="btn btn-primary ml-4">Approve Request</button></p>
						</div>
					</div>		

                </div>

            </div>
        </div>
    </div>
</template>

<script>

import GlobalDateFormat from '../../../../../functions/GlobalDateFormat'
const globalDateFormat = new GlobalDateFormat();


export default {
    props: ['selected_item_id', "ORDER_DETAILS"],
    components: {},
    data() {
        return {
            items: [],
			order_detail: null,
            ORDER_DETAILS_TABLE_DATA: [],
            special_rate_pct: []
        }
    },
	async mounted() {
	},
	methods: {
        
        dateFormat(dt) {
            return globalDateFormat.dateFormatT4(dt)
        },
        increaseOrderedItemClickHandler(data, index) {
            console.log(data + '    ' + index)
            data.quantity++
            // Free Product row quantity increase
            if(data.offer_type === "free") {
                this.ORDER_DETAILS_TABLE_DATA[index + 1].quantity++
            }
        },
         decreaseOrderedItemClickHandler(data, index) {
             console.log(data + '    ' + index)
                if(data.quantity > 1) {
                 data.quantity--
             }
             // Free Product row quantity decrease
             if(data.offer_type === "free") {
                 this.ORDER_DETAILS_TABLE_DATA[index + 1].quantity--
             }
         },
        //--------- Ordered Table Quantity input keyup & keydown------------
        newtpKeyUp_request_approval_table(data, value, i) {
            console.log(value.keyCode)
            let selector = document.querySelector('#special-request-approval-table-' + i)
            if(parseInt(selector.value) === 0) {
                selector.value = 1
            } else if((selector.value).toString() === '') {
                selector.value = 1
            }
        },
        quantityKeyDown_ordered_table(value, i) {
            console.log(document.querySelector('#special-request-approval-table-' + i).value)
            if(value.keyCode === 190 || value.keyCode === 110) {
                value.preventDefault()
            }
        }
	},
    watch: {
        ORDER_DETAILS(newVal) {
            if(newVal) {
                console.log(newVal)
                this.ORDER_DETAILS_TABLE_DATA = []
                this.ORDER_DETAILS_TABLE_DATA = newVal.order_detail_info
            }
        },
        special_rate_pct(newVal) {
            console.log(newVal)
        },
     }
}
</script>

<style scoped>
/* @import '../../../../../custom.css';
@import '../../../../../assets/css/styles.css'; */

.layout-container{
	height: calc( 100vh - var(--used-height) );
    overflow-y: auto;
    background-color: transparent;
}
.third_party_tender_body{
	margin-top: 3px;
    min-height: calc(100vh - (var(--used-height) - (-30px)));
    background-color: var(--white);
    -webkit-box-shadow: 0px 0px 8px #026cd11a;
    box-shadow: 0px 0px 8px #026cd11a;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.special_request_approval_area .row.special_request_approval_header{
    font-size: var(--font12);
	margin-left: auto;
}

.special_request_approval_area .row.special_request_approval_header .header{
	font-weight: bold;
}
.special_request_approval_area .row.special_request_approval_header .header span{
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header span{
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_1 {
	padding-top: 5px;
}
.special_request_approval_area .row.special_request_approval_header .header_1 span {
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_2 {
	padding-top: 5px;
}
.special_request_approval_area .row.special_request_approval_header .header_2 p {
	padding-right: 5px;
}
.special_request_approval_area .row.special_request_approval_header .header_2 span {
	color: var(--blue);
	padding-right: 5px;
}
.special_request_approval_area .row.special_request_approval_header .header_2 i{
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_3 {
	padding-top: 5px;
}
.special_request_approval_area .row.special_request_approval_header .header_3 span {
	color: var(--blue);
}
/* .special_request_approval_area .row.special_request_approval_header .header_4 {
} */
.special_request_approval_area .row.special_request_approval_header .header_4 span {
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_5 span {
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_6 span {
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_7 {
	padding-bottom: 10px;
}
.special_request_approval_area .row.special_request_approval_header .header_7 span {
	color: var(--blue);
}
.special_request_approval_area .row.special_request_approval_header .header_8 span {
	color: var(--blue);
}

.layout-container .container-fluid{
	
    width: 100%;
    padding-right: 15px;
	padding-top: 10px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.special_request_approval_content .special_request_approval-table td:nth-child(3) .form-group {
	position: relative;
}
.special_request_approval_content .special_request_approval-table .form-group i.zmdi {
    /*background-color: aqua;
    padding: 6px 8px;*/
    font-size: 16px;
}
.special_request_approval_content .special_request_approval-table .form-group i.zmdi-minus {
	position: absolute;
    left: 4px;
    top: 5px;
    cursor: pointer;
    color: var(--blue);
}
.special_request_approval_content .special_request_approval-table .form-group i.zmdi-plus {
	position: absolute;
    right: 10px;
    top: 3px;
    cursor: pointer;
    color: var(--blue);
}
.special_request_approval_content .special_request_approval-table td:nth-child(3) .form-group input {
   height: 24px;
   border-radius: 5px;
   text-align: center;
}

.layout-container .submit-section .submit-section-inner{
	text-align: center; 
}
.special_request_approval_content .table.special_request_approval-table tr {
	display: flex;
}
.special_request_approval_content .table.special_request_approval-table thead {
	position: relative;
	display: block;
	width: 100%;
	font-size: var(--font16);
}
.special_request_approval_content .table.special_request_approval-table thead tr th {
	color: var(--blue);
	width: 18.5%;
}
.special_request_approval_content .table.special_request_approval-table tbody {
	width: 100%;
	display: block;
	position: relative;
	overflow-y: scroll;
	font-size: var(--font14);
	color: var(--text-black);
	height: calc(100vh - (var(--used-height) + 250px));
}
.special_request_approval_content .table.special_request_approval-table tbody tr td {
	padding: 4px;
	width: 18.5%;
	
}
  .special_request_approval-table td:first-child(1),
  .special_request_approval-table th:first-child(1),
  .special_request_approval-table td:nth-child(2),
  .special_request_approval-table th:nth-child(2),
  .special_request_approval-table td:nth-child(3),
  .special_request_approval-table th:nth-child(3),
  .special_request_approval-table td:nth-child(4),
  .special_request_approval-table th:nth-child(4),
  .special_request_approval-table td:nth-child(6),
  .special_request_approval-table th:nth-child(6){
    justify-content: center;
    text-align: center;
	
  }
  
  .special_request_approval-table td:nth-child(2){
	text-align: center;
  }
  .special_request_approval-table th:nth-child(2){
	text-align: center;
  }
  .special_request_approval-table th:nth-child(2) small{
	font-size: 60%;
  }
  .special_request_approval-table td:nth-child(3){
	text-align: center;
  }
  .special_request_approval-table th:nth-child(3){
	text-align: center;
  }
  .special_request_approval-table td:nth-child(4){
	text-align: center;
  }
  .special_request_approval-table th:nth-child(4){
	text-align: center;
  }
  .special_request_approval-table td:nth-child(5){
	text-align: center;
  }
  .special_request_approval-table th:nth-child(5){
	text-align: center;
  }
  .special_request_approval-table td:nth-child(6){
	text-align: center;
  }
  .special_request_approval-table th:nth-child(6){
	text-align: center;
  }
  .special_request_approval-table td:nth-child(7){
	text-align: right;
  }
  .special_request_approval-table th:nth-child(7){
	text-align: right;
  }
  .special_request_approval-tabletbody .action-btn{
      display: flex;
      align-items: center;
  }
  .special_request_approval-tabletbody .action-btn span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7px;
    height: 30px;
    font-size: var(--font16);
    color:  var(--blue);
    border-radius: 100px;
    margin: 0px 10px;
}
.submit-section .reason span{
   padding-left: 11px;
}
.submit-section {
	position: relative;
}
.submit-section .submit-section-percentage {
	display: flex;
	font-size: var(--font14);
    padding-top: 0px;
}
.submit-section .submit-section-percentage span{
	width: 17%;
	padding-left: 8px;
    padding-top: 6px;
}
.submit-section .submit-section-percentage input {
	width: 152px;
    height: 27px;
	
}
.submit-section .submit-section-percentage p{
	display: flex;
	width: 43%;
}
.submit-section .submit-section-percentage .btn.btn-outline-danger{
	font-weight: 20px;
	font-weight: 20px;
    text-decoration:none;
    color: #de3545;
    border-color: #de3545;
    border-radius: 2px;
    background-color: #f8f8f8;
    text-align: center;
    letter-spacing: .5px;
    transition: background-color .2s ease-out;
    cursor: pointer;
}
.submit-section .submit-section-percentage .btn.btn-primary{
	font-weight: 20px;
    text-decoration:none;
    color: #fff;
    background-color: #1b7cc9;
    text-align: center;
    letter-spacing: .5px;
    transition: background-color .2s ease-out;
    cursor: pointer; 

}

</style>
