<template>
  <DashboardLayout>
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Products</h1>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "./Layout/DashboardLayout.vue";
import * as API from "@/services/API";

export default {
  components: {
    DashboardLayout,
  },
  setup() {
    async function getProducts() {
      try {
        const products = await API.apiClient.get("/products-by-company");
        console.log(products.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  },
};
</script>

<style>
</style>