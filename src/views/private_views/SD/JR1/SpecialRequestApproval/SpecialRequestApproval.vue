<template>
    <div class="special-request" id="special-request">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
            <SpecialRequestApprovalSidebar 
                v-on:SINGLE_ITEM_SELECTED="selectedItemFromLeftCatchHandler"/>
            <SpecialRequestApprovalDetails 
                v-if="selected_item ? selected_item.sales_type == 'SR' : false"
                :ORDER_DETAILS="ORDER_DETAILS"/>
            <SpecialDiscountDetails v-else
                :ORDER_DETAILS="ORDER_DETAILS" />
        </div>
    </div>
</template>

<script>
import Heading from "../../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import SpecialRequestApprovalSidebar from "./SpecialRequestApprovalSidebar";
import SpecialRequestApprovalDetails from "./SpecialRequestApprovalDetails";
import ERPService_T2 from "../../../../../service/ERPService_T2";
const service = new ERPService_T2();

import SpecialDiscountDetails from "./SpecialDiscountDetails";

export default {
    props:[],
    components:{
        Heading,
        SpecialRequestApprovalSidebar,
        SpecialRequestApprovalDetails,
        SpecialDiscountDetails

    },
    
    data() {
        return {
            routeName: "Special Request Approval",
            parentPath: "Local Sales",
            pathName: [],
            selected_item: null,
            ORDER_DETAILS: null,
        };
    },
    computed: {
    },
    created() {
        this.$emit("routeName", this.$route.name);
        this.createBreadcrumbData();
    },
    async mounted() {
    },
    methods: {
        createBreadcrumbData() {
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Special Request Approval" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
        selectedItemFromLeftCatchHandler(item) {
            console.log(item)
            // console.log('SELECTED_ITEM', item);
            this.selected_item = item;
            // console.log('SALES_TYPE', this.selected_item);
            this.SPECIAL_REQUEST_ORDER_DETAILS__FROM_SERVICE(item.id)
        },
        // ---------------------------------------------------------------------------------------
        // SERVICE CALL
        async SPECIAL_REQUEST_ORDER_DETAILS__FROM_SERVICE(order_id) {
            this.ORDER_DETAILS = null
            await service.getSpecialRequestOrderDetail__SPECIAL_APPROVAL(order_id)
                .then(res => {
                    console.log(res.data)
                    this.ORDER_DETAILS = res.data.pending_approval_order_detail
                    console.log(this.ORDER_DETAILS)
                })
                .catch(err => {
                    if(err) {
                        console.log(err)
                        this.ORDER_DETAILS = null
                    }
                })
        }

    }
};

</script>

<style scoped>
@import '../../../../../custom.css';
@import '../../../../../assets/css/styles.css';

/* @import '../../../../../assets/t2-style.css';
@import '../../../../../assets/style-transfer_requition.css'; */


</style>
