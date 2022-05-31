<template>
  <DashboardLayout>
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Products</h1>
    </div>

    <div class="max-w-7xl mx-auto mt-10">
      <div class="lg:flex">
        <span>
          <button type="button" class="btn_success" @click="addModal()">
            <PlusIcon />
            Add New Products
          </button>
        </span>
      </div>

      <AddModal
        :open="modal.add"
        :modal="modal"
        @submitProduct="submitProduct"
        @addModal="addModal"
      />

      <div class="lg:flex">
        <ag-grid-vue
          id="myGrid"
          class="ag-theme-alpine mt-5"
          style="height: 550px; width: 100%"
          :columnDefs="columnDefs.value"
          :rowData="rowD"
          :defaultColDef="defaultColDef"
          :pagination="true"
          :paginationAutoPageSize="true"
          rowSelection="multiple"
          :rowMultiSelectWithClick="true"
          :suppressRowClickSelection="true"
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
import AddModal from "./Partials/Products/AddModal.vue";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { ModuleRegistry } from "@ag-grid-community/core";
// ModuleRegistry.registerModules([ClientSideRowModelModule]);
// import BtnCellRenderer from "./Partials/Products/BtnAction.js";

export default defineComponent({
  components: {
    DashboardLayout,
    AddModal,
    PlusIcon,
    ButtonAction,
    AgGridVue,
  },
  setup() {
    const rowData = reactive({
      value: null,
    });
    const modal = reactive({
      add: false,
      title: "Add New Product",
      btnSubmitTitle: "Submit",
      btnCancelTitle: "Cancel",
      widthClass: "sm:w-2/3 w-full",
      inputs: {
        firstRow: [
          {
            type: "text",
            label: "Code",
            placeholder: "Code",
            name: "code",
            value: "",
            errorMsg: "",
          },
          {
            type: "text",
            label: "Barcode",
            placeholder: "Barcode",
            name: "barcode",
            value: "",
            errorMsg: "",
          },
        ],
        secondRow: [
          {
            type: "select",
            label: "Category",
            name: "category",
            value: "",
            errorMsg: "",
            placeholder: "Select Category...",
            options: [
              {
                value: "Category 1",
                text: "Category 1",
              },
              {
                value: "Category 2",
                text: "Category 2",
              },
              {
                value: "Category 3",
                text: "Category 3",
              },
            ],
          },
          {
            type: "autocomplete",
            label: "Brand",
            name: "brand",
            value: "",
            errorMsg: "",
            placeholder: "Select Brand...",
            options: [
              {
                value: "Coca-Cola",
                text: "Coca-Cola",
              },
              {
                value: "Fanta",
                text: "Fanta",
              },
              {
                value: "Sprite",
                text: "Sprite",
              },
            ],
          },
        ],
        thirdRow: [
          {
            type: "select",
            label: "Supplier",
            name: "brand",
            value: "",
            errorMsg: "",
            placeholder: "Select Supplier...",
            options: [
              {
                value: "Supplier 1",
                text: "Supplier 1",
              },
              {
                value: "Supplier 2",
                text: "Supplier 2",
              },
              {
                value: "Supplier 3",
                text: "Supplier 3",
              },
            ],
          },
        ],
        fourthRow: [
          {
            type: "text",
            label: "Purchase Price",
            placeholder: "$0.00",
            name: "purchasePrice",
            value: "",
            errorMsg: "",
          },
          {
            type: "text",
            label: "Selling Price",
            placeholder: "$0.00",
            name: "sellingPrice",
            value: "",
            errorMsg: "",
          },
        ],
      },
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

    // Ag Grid Instance

    function addModal() {
      modal.add = !modal.add;
    }

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
          barcode: data.barcode,
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

    function submitProduct() {
      addModal();
    }

    return {
      onGridReady,
      columnDefs,
      rowData,
      rowD,
      defaultColDef,
      modal,
      addModal,
      submitProduct,
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