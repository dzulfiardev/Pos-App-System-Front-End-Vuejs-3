<template>
  <!-- Sidebar -->
  <div class="min-h-screen h-fit bg-gray-800 md:px-2 md:py-5">
    <div class="px-3">
      <router-link to="/dashboard">
        <div class="flex align-middle">
          <div class="w-1/4">
            <img
              class="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </div>
          <div class="w-3/4">
            <p class="text-xl text-gray-100 sm:text-md">My App Name</p>
          </div>
        </div>
      </router-link>

      <!-- Sidebar Menu List -->
      <SidebarMenus />
      <!-- End Sidebar Menu List -->
    </div>
  </div>
  <!-- End of sidebar -->
</template>

<script>
import SidebarMenus from "./SidebarMenus.vue";

export default {
  components: {
    SidebarMenus,
  },
};
</script>

<style>
.router-link-active {
  color: #fff;
}
.list_dropdown_hide {
  position: relative;
  top: -100px;
  opacity: 0;
  transition: 300ms;
}
.list_dropdown_show {
  top: 0px;
  opacity: 1;
  transition: 300ms;
}
.rotate_show {
  transition: 300ms;
  transform: rotate(180deg);
}
.rotate_hide {
  transition: 300ms;
  transform: rotate(0);
}
</style>