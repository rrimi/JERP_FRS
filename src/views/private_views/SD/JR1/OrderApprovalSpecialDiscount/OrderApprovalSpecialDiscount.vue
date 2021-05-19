<template>
    <div class="special-discount" id="special-discount">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
            <DiscountSidebar/>
            <DiscountDetails/>
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb"; 
import DiscountSidebar from "./DiscountSidebar/DiscountSidebar";
import DiscountDetails from "./DiscountDetails/DiscountDetails";

export default {
    props:[],
    components:{
        Heading,
        DiscountSidebar,
        DiscountDetails,
    },
    
    data() {
        return {
        routeName: "Order Approval(Special Discount)",
        parentPath: "Local Sales",
        pathName: [],
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Special Discount" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
