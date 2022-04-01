<template>
  <div
    class="
      w-4/6
      sm:w-3/6
      md:w-1/4
      z-10
      h-fit
      min-h-screen
      bg-gray-800
      absolute
      block
      xl:hidden
      text-gray-200
      py-4
      px-2
    "
    :class="slideClass"
    style="height: 100% !important"
  >
    <div class="flex">
      <div class="w-5/6">
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
              <p class="text-md text-gray-100 sm:text-md">My App Name</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="w-1/6 text-right">
        <button class="hover:text-white" @click="$emit('toggleSlide')">
          <CloseIcon />
        </button>
      </div>
    </div>
    <!-- Sidebar Menus -->
    <SidebarMenus />
    <!-- End Sidebar Menus -->
  </div>
</template>

<script>
import CloseIcon from "../../../components/icons/CloseIcon.vue";
import SidebarMenus from "./SidebarMenus.vue";

export default {
  components: {
    CloseIcon,
    SidebarMenus,
  },
  props: {
    slideClass: String,
  },
};
</script>

<style>
</style>