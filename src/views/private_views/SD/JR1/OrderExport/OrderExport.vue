<template>
    <div class="order-export" id="order-export">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
              <ExportSidebar/>
            <ExportDetails/>
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import ExportSidebar from "./ExportSidebar";
import ExportDetails from "./ExportDetails";
// import ERPSidebarService from "../../../../../service/ERPSidebarService";
// const service = new ERPSidebarService();

export default {
    props:[],
    components:{
        Heading,
        ExportSidebar,
        ExportDetails,

    },
    
    data() {
        return {
        routeName: "Order(Export)",
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Export" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
