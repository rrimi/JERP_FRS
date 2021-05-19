<template>
    <div class="special-rate" id="special-rate">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
            <RateSidebar/>
            <RateDetails/>
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import RateSidebar from "./RateSidebar/RateSidebar";
import RateDetails from "./RateDetails/RateDetails";
// import ERPSidebarService from "../../../../../service/ERPSidebarService";
// const service = new ERPSidebarService();

export default {
    props:[],
    components:{
        Heading,
        RateSidebar,
        RateDetails,

    },
    
    data() {
        return {
        routeName: "Order Approval(Special Rate)",
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Special Rate" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
