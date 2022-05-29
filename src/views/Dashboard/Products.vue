<template>
  <DashboardLayout>
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Products</h1>
    </div>

    <div class="max-w-7xl mx-auto mt-10">
      <div class="lg:flex">
        <span>
          <button type="button" class="btn_success">
            <PlusIcon />
            Add New Products
          </button>
        </span>
      </div>

      <div class="lg:flex">
        <ag-grid-vue
          id="myGrid"
          class="ag-theme-alpine mt-5"
          style="height: 550px; width: 1300px"
          :columnDefs="columnDefs.value"
          :rowData="rowD"
          :defaultColDef="defaultColDef"
          :pagination="true"
          :paginationAutoPageSize="true"
          rowSelection="multiple"
          :rowMultiSelectWithClick="true"
          :suppressRowClickSelection="true"
          :frameworkComponents="frameworkComponents"
          animateRows="true"
          @cell-clicked="cellWasClicked"
          @grid-ready="onGridReady"
        >
        </ag-grid-vue>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "./Layout/DashboardLayout.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import * as API from "@/services/API";
import { AgGridVue } from "ag-grid-vue3";
import { reactive, ref, defineComponent } from "vue";
import ButtonAction from "./Partials/Products/ButtonAction.vue";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { ModuleRegistry } from "@ag-grid-community/core";
// ModuleRegistry.registerModules([ClientSideRowModelModule]);
// import BtnCellRenderer from "./Partials/Products/BtnAction.js";

export default defineComponent({
  components: {
    DashboardLayout,
    PlusIcon,
    ButtonAction,
    AgGridVue,
  },
  setup() {
    const rowData = reactive({
      value: null,
    });
    const rowD = ref(null);
    const grid = reactive({
      gridApi: null,
      columnApi: null,
    });
    const defaultColDef = {
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
    };
    const columnDefs = reactive({
      value: [
        {
          field: "code",
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
        },
        { field: "name" },
        { field: "brand" },
        { field: "category" },
        { field: "stock", resizable: true, maxWidth: 130 },
        {
          field: "purchasePrice",
          headerName: "Purchase Price",
          resizable: true,
        },
        {
          field: "sellPrice",
          headerName: "Selling Price",
          resizable: true,
          maxWidth: 130,
        },
        { field: "supplier" },
        {
          field: "action",
          cellRenderer: "ButtonAction",
        },
      ],
    });

    // const frameworkComponents = ref({
    //   btnCellRenderer: BtnCellRenderer,
    // });
    // async function getProducts() {
    //   try {
    //     const products = await API.apiClient.get("/products-by-company");
    //     const data = products.data.data;
    //     rowData.value = data.map((data) => ({
    //       code: data.code,
    //       name: data.name,
    //       brand: data.brand,
    //       category: data.category,
    //       stock: data.stock,
    //       purchasePrice: data.purchasePrice,
    //       sellPrice: data.sellPrice,
    //       supplier: data.supplier,
    //     }));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // getProducts();

    // Ag Grid Instance

    const onGridReady = (params) => {
      console.log(params);
      grid.gridApi = params.api;
      grid.columnApi = params.columnApi;
      const updateData = (data) => {
        params.api.setRowData(data);
      };
      API.apiClient.get("/products-by-company").then((res) => {
        const data = res.data.data;
        const resData = data.map((data) => ({
          id: data.id,
          code: data.code,
          name: data.name,
          brand: data.brand,
          category: data.category,
          stock: data.stock,
          purchasePrice: data.purchasePrice,
          sellPrice: data.sellPrice,
          supplier: data.supplier,
        }));
        updateData(resData);
      });
    };

    return {
      onGridReady,
      columnDefs,
      rowData,
      rowD,
      defaultColDef,
      cellWasClicked: (event) => {
        // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
    };
  },
});
</script>

<style>
</style>