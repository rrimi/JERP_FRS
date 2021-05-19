<template>
    <div class="special-discount" id="special-discount">
        <Heading :pathName="pathName" :routeName="routeName" />

        <div class="layout-body">
              <SpecialDiscountSidebar/>
            <SpecialDiscountDetails/>
        </div>
    </div>
</template>

<script>
import Heading from "../../../../components/master_layout/HeadingTitleBreadcrumbT3/HeadingTitleBreadcrumb";
import SpecialDiscountSidebar from "./SpecialDiscountSidebar";
import SpecialDiscountDetails from "./SpecialDiscountDetails";
// import ERPSidebarService from "../../../../../service/ERPSidebarService";
// const service = new ERPSidebarService();

export default {
    props:[],
    components:{
        Heading,
        SpecialDiscountSidebar,
        SpecialDiscountDetails,

    },
    
    data() {
        return {
        routeName: "Special Request Approval",
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
        this.pathName = [{ name: "Features" }, { name: "Local Sales" }, { name: "Special Request Approval" }];
      // this.pathName = breadcrumbFunctions.jmiERPBreadcrumb(window.location.pathname)
        },
    }
};

</script>

<style scoped>

</style>
