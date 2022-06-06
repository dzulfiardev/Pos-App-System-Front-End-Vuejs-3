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
        @imageFileInput="imageFileInput"
        @submit="submitProduct"
        @close="addModal"
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
import { reactive, ref, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import DashboardLayout from "./Layout/DashboardLayout.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import * as API from "@/services/API";
import { AgGridVue } from "ag-grid-vue3";
import ButtonAction from "./Partials/Products/ButtonAction.vue";
import AddModal from "@/components/reusable/FormModal.vue";

export default defineComponent({
  components: {
    DashboardLayout,
    AddModal,
    PlusIcon,
    ButtonAction,
    AgGridVue,
  },
  setup() {
    const store = useStore();
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
        row_1: [
          {
            key: "product_code",
            type: "text",
            label: "Code",
            placeholder: "Code",
            name: "code",
            value: "",
            errorMsg: "",
          },
          {
            key: "product_barcode",
            type: "text",
            label: "Barcode",
            placeholder: "Barcode",
            name: "barcode",
            value: "",
            errorMsg: "",
          },
        ],
        row_2: [
          {
            key: "category_id",
            type: "select",
            label: "Category",
            name: "category",
            value: "",
            errorMsg: "",
            options: [],
          },
          {
            key: "brand_id",
            type: "select",
            label: "Brand",
            name: "brand",
            value: "",
            errorMsg: "",
            options: [
              {
                value: "",
                text: "",
              },
            ],
          },
          {
            key: "product_unit",
            type: "select",
            label: "Unit",
            name: "unit",
            value: "",
            errorMsg: "",
            options: [
              {
                value: "Pcs",
                text: "Pcs",
              },
              {
                value: "Kg",
                text: "Kg",
              },
              {
                value: "Gr",
                text: "Gr",
              },
              {
                value: "Box",
                text: "Box",
              },
            ],
          },
        ],
        row_3: [
          {
            key: "product_name",
            type: "text",
            label: "Product Name",
            placeholder: "Product Name",
            name: "code",
            value: "",
            errorMsg: "",
          },
        ],
        row_4: [
          {
            key: "supplier_id",
            type: "select",
            label: "Supplier",
            name: "brand",
            value: "",
            errorMsg: "",
            options: [
              {
                value: "",
                text: "",
              },
            ],
          },
        ],
        row_5: [
          {
            key: "product_purchase_price",
            type: "text",
            label: "Purchase Price",
            placeholder: "$0.00",
            name: "purchasePrice",
            value: "",
            errorMsg: "",
          },
          {
            key: "product_selling_price",
            type: "text",
            label: "Selling Price",
            placeholder: "$0.00",
            name: "sellingPrice",
            value: "",
            errorMsg: "",
          },
        ],
        row_6: [
          {
            key: "product_image",
            type: "file",
            mime: "image",
            label: "Upload Picture",
            name: "upload_image",
            placeholder: "Upload Picture",
            value: "",
            imgSrc: "",
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
      emptyForm();
    }

    function emptyForm() {
      for (const input in modal.inputs) {
        for (const i in modal.inputs[input]) {
          modal.inputs[input][i].value = "";
          modal.inputs[input][i].errorMsg = "";
        }
      }
    }

    function imageFileInput() {
      modal.inputs.row_6[0].value = store.state.products.file;
    }

    function reloadGridData() {
      grid.gridApi.redraRows();
    }

    function resGridData(gridApi) {
      let resData = {};
      API.apiClient.get("/products-by-company").then((res) => {
        const data = res.data.data;
        resData = data.map((data) => ({
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
        gridApi.setRowData(resData);
      });
    }

    const onGridReady = (params) => {
      grid.gridApi = params.api;
      grid.columnApi = params.columnApi;
      resGridData(grid.gridApi);
    };

    function loadAllBrand() {
      API.apiClient.get("/brand-by-company").then((res) => {
        const data = res.data.data;
        const brandData = data.map((res) => {
          return {
            value: res.id,
            text: res.brand_name,
          };
        });

        modal.inputs.row_2[1].options = [
          ...modal.inputs.row_2[1].options,
          ...brandData,
        ];
      });
    }

    async function loadAllCategory() {
      try {
        const res = await API.apiClient.get("category");
        const data = res.data.data;
        modal.inputs.row_2[0].options = data.map((res) => {
          return {
            value: res.id,
            text: res.category_name,
          };
        });
      } catch (err) {
        console.log(err);
      }
    }

    async function loadAllSupplier() {
      try {
        const res = await API.apiClient.get("supplier-by-company");
        const data = res.data.data;
        const supplierData = data.map((res) => {
          return {
            value: res.id,
            text: `${res.supplier_name} - ${res.supplier_address}`,
          };
        });

        modal.inputs.row_4[0].options = [
          ...modal.inputs.row_4[0].options,
          ...supplierData,
        ];
      } catch (err) {
        console.log(err);
      }
    }

    onMounted(() => {
      loadAllBrand();
      loadAllCategory();
      loadAllSupplier();
    });

    function submitProduct() {
      // const payload = {
      //   product_code: modal.inputs.row_1[0].value,
      //   product_barcode: modal.inputs.row_1[1].value,
      //   category_id: modal.inputs.row_2[0].value,
      //   brand_id: modal.inputs.row_2[1].value,
      //   product_name: modal.inputs.row_3[0].value,
      //   supplier_id: modal.inputs.row_4[0].value,
      //   product_purchase_price: modal.inputs.row_5[0].value,
      //   product_selling_price: modal.inputs.row_5[1].value,
      //   product_image: modal.inputs.row_6[0].value
      //     ? modal.inputs.row_5[0].value
      //     : null,
      // };

      // let payload = {};
      const formData = new FormData();

      for (const row_j in modal.inputs) {
        for (const j in modal.inputs[row_j]) {
          let key = modal.inputs[row_j][j].key;
          // payload[key] = modal.inputs[row_j][j].value;
          formData.append(key, modal.inputs[row_j][j].value);
        }
      }

      API.apiClient
        .post("products", formData)
        .then((res) => {
          const data = res.data;
          resGridData(grid.gridApi);
          addModal();
          console.log(data.success);
        })
        .catch((err) => {
          if (err) {
            const error = err.response.data.errors;

            for (const row in modal.inputs) {
              for (const i in modal.inputs[row]) {
                let key = modal.inputs[row][i].key;
                error[key]
                  ? (modal.inputs[row][i].errorMsg = error[key][0])
                  : (modal.inputs[row][i].errorMsg = "");
              }
            }
          }
        });

      // formData.append("product_image", modal.inputs.row_6[0].value);
      // payload["product_image"] = formData;

      // try {
      //   const res = await API.apiClient.post("products", formData);
      //   const data = res.data;
      //   console.log(data.success);
      //   onGridReady();
      //   addModal();
      // } catch (err) {
      //   if (err) {
      //     console.log(err.response);
      //   }

      // if (err.response.data) {
      //   const error = err.response.data.errors;

      //   for (const row in modal.inputs) {
      //     for (const i in modal.inputs[row]) {
      //       let key = modal.inputs[row][i].key;
      //       error[key]
      //         ? (modal.inputs[row][i].errorMsg = error[key][0])
      //         : (modal.inputs[row][i].errorMsg = "");
      //     }
      //   }
      // }

      // error.product_code
      //   ? (modal.inputs.row_1[0].errorMsg = error.product_code[0])
      //   : (modal.inputs.row_1[0].errorMsg = "");
      // }
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
      imageFileInput,
      reloadGridData,
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