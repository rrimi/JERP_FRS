<template>
    <div class="special-discount-details" id="special-discount-details">
        <div class="layout-container">
            <div class="container-fluid">
                <div class="special_request_body">
                    <div class="special_request_area">
                        <div class="row special_request_header">
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle">
                                <p class="header_1">Order ID : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.order_no : '' }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle_second">
                                <p class="header_2">Customer : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.customer_name : ''  }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_3">Request Type : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.sales_type ? ORDER_DETAILS.sales_type == 'PD' ? 'Special Discount' : '' : '' : ''}}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle">
                                <p class="header_4">Territory : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.area_name : '' }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_middle_second">
                                <p class="header_5">Address : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.customer_address : ' ' }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_6">Order Date : <span class="header-lvl-value">{{ ORDER_DETAILS ? dateFormat(ORDER_DETAILS.submit_date) : ''  }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_7">AM : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.am : '' }}</span></p>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 header_section_last">
                                <p class="header_8">MIO : <span class="header-lvl-value">{{ ORDER_DETAILS ? ORDER_DETAILS.mio : '' }}</span></p>
                            </div>
                        </div>
                        <div class="special_request_content">
                            <table class="table special_request-table">
								<thead>
									<tr>
										<th scope="col"><p>Name</p></th>
										<th scope="col"><p>Trade Price <br> <small> (TP+VAT) </small> </p> </th>
										<th scope="col"><p>Quantity</p></th>
										<th scope="col"><p>Discount</p></th>
										<th scope="col"><p>Total Price</p></th>
									</tr>
								</thead>
								<tbody>
								<tr v-for="(item, index) in ORDER_DETAILS_TABLE_DATA" v-bind:key="index">
									<td> {{ item ? item.product_name :'' }} </td>
									<td> {{ item ? Number(parseFloat(item.tp) + parseFloat(item.vat)).toFixed(2) :'' }} </td>
									<td> {{ item ? item.qty :'' }} </td>
									<td> {{ item ? item.discount :''  }}</td>
									<td> {{ item ? calculate_total(item) :''  }} </td>
								</tr> 
								</tbody>
                            </table>
                        </div>
                    </div>	
					<div class="submit-section">
						<div class="submit-section-percentage">
							<p><span>Approved Percentage:</span><input v-model="special_discount_pct" id="submit-percentage" type="number" placeholder="20" class="form-control"></p>
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

//  import Service from '../../../../../service/ERPService_T2'
//  const service = new Service();


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
            special_discount_pct: null,
        }
    },
	async mounted() {
	},
	methods: {
        
        dateFormat(dt) {
            return globalDateFormat.dateFormatT4(dt)
        },

        calculate_total(item) {
            let tp = (parseFloat(item.unit_tp) - parseFloat(item.discounted_tp)) * parseInt(item.qty)
            return Number(tp).toFixed(2)
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
        special_discount_pct(newVal) {
            console.log(newVal)
            // let discounted_tp = (newVal / 100) * 
            for(let i=0; i<this.ORDER_DETAILS_TABLE_DATA.length; i++) {
                let discounted_tp = (newVal / 100) * this.ORDER_DETAILS_TABLE_DATA[i].unit_tp
                this.ORDER_DETAILS_TABLE_DATA[i].discounted_tp = discounted_tp
            }
        },
    }
}
</script>
<style scoped>
.layout-container{
	height: calc( 100vh - var(--used-height) );
    overflow-y: auto;
    background-color: transparent;
}
/* .third_party_tender_body{
	margin-top: 3px;
    min-height: calc(100vh - (var(--used-height) - (-30px)));
    background-color: var(--white);
    -webkit-box-shadow: 0px 0px 8px #026cd11a;
    box-shadow: 0px 0px 8px #026cd11a;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
} */
.special_request_area .row.special_request_header{
    font-size: var(--font12);
	margin-left: auto;
}

.special_request_area .row.special_request_header .header{
	font-weight: bold;
}
.special_request_area .row.special_request_header .header span{
	color: var(--blue);
}
.special_request_area .row.special_request_header .header span{
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_1 {
	padding-top: 5px;
}
.special_request_area .row.special_request_header .header_1 span {
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_2 {
	padding-top: 5px;
}
.special_request_area .row.special_request_header .header_2 p {
	padding-right: 5px;
}
.special_request_area .row.special_request_header .header_2 span {
	color: var(--blue);
	padding-right: 5px;
}
.special_request_area .row.special_request_header .header_2 i{
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_3 {
	padding-top: 5px;
}
.special_request_area .row.special_request_header .header_3 span {
	color: var(--blue);
}
/* .special_request_area .row.special_request_header .header_4 {
} */
.special_request_area .row.special_request_header .header_4 span {
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_5 span {
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_6 span {
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_7 {
	padding-bottom: 10px;
}
.special_request_area .row.special_request_header .header_7 span {
	color: var(--blue);
}
.special_request_area .row.special_request_header .header_8 span {
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

.layout-container .submit-section .submit-section-inner{
	text-align: center; 
}
.special_request_content .table.special_request-table tr {
	display: flex;
}
.special_request_content .table.special_request-table thead {
	position: relative;
	display: block;
	width: 100%;
	font-size: var(--font16);
}
.special_request_content .table.special_request-table thead tr th {
	color: var(--blue);
	width: 20%;
}
.special_request_content .table.special_request-table tbody {
	width: 100%;
	display: block;
	position: relative;
	overflow-y: scroll;
	font-size: var(--font14);
	color: var(--text-black);
	height: calc(100vh - (var(--used-height) + 240px));
}
.special_request_content .table.special_request-table tbody tr td {
	padding: 4px;
	width: 20%;
	
}
  .special_request-table td:first-child(1),
  .special_request-table th:first-child(1),
  .special_request-table td:nth-child(2),
  .special_request-table th:nth-child(2),
  .special_request-table td:nth-child(3),
  .special_request-table th:nth-child(3),
  .special_request-table td:nth-child(4),
  .special_request-table th:nth-child(4),
  .special_request-table td:nth-child(6),
  .special_request-table th:nth-child(6){
    justify-content: center;
    text-align: center;
	
  }
  
  .special_request-table td:nth-child(2){
	text-align: center;
  }
  .special_request-table th:nth-child(2){
	text-align: center;
  }
  .special_request-table td:nth-child(3){
	text-align: center;
  }
  .special_request-table th:nth-child(3){
	text-align: center;
  }
  .special_request-table td:nth-child(4){
	text-align: center;
  }
  .special_request-table th:nth-child(4){
	text-align: center;
  }
  .special_request-table td:nth-child(5){
	text-align: right;
  }
  .special_request-table th:nth-child(5){
	text-align: right;
  }
  .special_request-table tbody .action-btn{
    display: flex;
    align-items: center;
  }
  .special_request-table tbody .action-btn span{
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
.submit-section {
	position: relative;
}
.submit-section .submit-section-percentage {
	display: flex;
	font-size: var(--font14);
    padding-top: 10px;
}
.submit-section .submit-section-percentage span{
	width: 30%;
	padding-left: 8px;
    padding-top: 13px;
}
.submit-section .submit-section-percentage .form-control {
	width: 74px;
    height: 45px;
   opacity: 1;	
}
/* input#submit-percentage {
    background-color: #1b7cc9;
} */
/* input#submit-percentage::-webkit-inner-spin-button, 
input#submit-percentage::-webkit-outer-spin-button {  

   opacity: 1;

} */
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
