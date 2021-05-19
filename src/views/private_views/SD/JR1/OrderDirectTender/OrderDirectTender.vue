<template>
    <div class="direct-tender" id="direct-tender">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
             <DirectTenderSidebar/>
             <DirectTenderDetails/> 
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import DirectTenderSidebar from "./DirectTenderSidebar";
import DirectTenderDetails from "./DirectTenderDetails";
// import ERPSidebarService from "../../../../../service/ERPSidebarService";
// const service = new ERPSidebarService();

export default {
    props:[],
    components:{
        Heading,
        DirectTenderSidebar,
        DirectTenderDetails,

    },
    
    data() {
        return {
        routeName: "Order(Direct Tender)",
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Direct Tender" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
