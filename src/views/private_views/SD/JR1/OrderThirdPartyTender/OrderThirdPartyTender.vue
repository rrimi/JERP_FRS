<template>
    <div class="thirdparty-tender" id="thirdparty-tender">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
              <ThirdPartyTenderSidebar/>
            <ThirdPartyTenderDetails/>
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import ThirdPartyTenderSidebar from "./ThirdPartyTenderSidebar";
import ThirdPartyTenderDetails from "./ThirdPartyTenderDetails";
// import ERPSidebarService from "../../../../../service/ERPSidebarService";
// const service = new ERPSidebarService();

export default {
    props:[],
    components:{
        Heading,
        ThirdPartyTenderSidebar,
        ThirdPartyTenderDetails,

    },
    
    data() {
        return {
        routeName: "Order(Third Party Tender)",
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Third Party Tender" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
