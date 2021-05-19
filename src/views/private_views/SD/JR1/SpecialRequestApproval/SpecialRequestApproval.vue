<template>
    <div class="special-request" id="special-request">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
              <SpecialRequestApprovalSidebar/>
            <SpecialRequestApprovalDetails/>
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import SpecialRequestApprovalSidebar from "./SpecialRequestApprovalSidebar";
import SpecialRequestApprovalDetails from "./SpecialRequestApprovalDetails";
// import ERPSidebarService from "../../../../../service/ERPSidebarService";
// const service = new ERPSidebarService();

export default {
    props:[],
    components:{
        Heading,
        SpecialRequestApprovalSidebar,
        SpecialRequestApprovalDetails,

    },
    
    data() {
        return {
        routeName: "Special Request Approval Two",
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Special Request Approval Two" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
