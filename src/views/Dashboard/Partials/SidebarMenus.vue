<template>
  <!-- Navigations -->
  <div class="mt-5 py-5 border-t border-gray-500 text-gray-300">
    <router-link class="" to="/dashboard">
      <div
        class="
          flex
          align-middle
          rounded
          mt-2
          py-2
          px-3
          hover:bg-gray-600 hover:text-white
          transition
        "
      >
        <DashboardIcon class="mr-3" />
        Dashboard
      </div>
    </router-link>

    <router-link class="" to="/transactions">
      <div
        class="
          flex
          align-middle
          rounded
          mt-2
          py-2
          px-3
          hover:bg-gray-600 hover:text-white
          transition
        "
      >
        <TransactionIcon class="mr-3" />
        Transactions
      </div>
    </router-link>

    <router-link to="/products">
      <div
        class="
          flex
          align-middle
          rounded
          mt-2
          py-2
          px-3
          hover:bg-gray-600 hover:text-white
          transition
        "
      >
        <ViewGridIcon class="mr-3" />
        Products
      </div>
    </router-link>

    <!-- Dropdown Menu -->
    <div class="rounded mt-2">
      <div
        class="
          flex
          align-middle
          transition
          cursor-pointer
          hover:bg-gray-600 hover:text-white
          py-2
          px-3
          rounded
        "
        @click="toggleListDropdown()"
      >
        <div class="flex w-5/6 -z-10">
          <CogIcon class="mr-3 w-6 h-6" />
          Setting
        </div>

        <div class="w-1/6">
          <ChevronDownIcon
            class="w-5 h-5 mt-1"
            :style="listDropdown.rotateStyle"
          />
        </div>
      </div>

      <div class="overflow-hidden" :class="listDropdown.parentClass">
        <ul
          class="text-sm px-3 ml-5 pl-5 border-l h-fit border-gray-400"
          :class="listDropdown.class"
        >
          <li>
            <router-link
              to="/setting/user-management"
              class="
                mt-2
                p-2
                rounded
                hover:text-white hover:bg-gray-600
                transition
                block
              "
              >User Management</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="
                mt-2
                p-2
                rounded
                hover:text-white hover:bg-gray-600
                transition
                block
              "
              >App Settings</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- End Dropdown Menu -->

    <router-link class="" to="/others">
      <div
        class="
          flex
          align-middle
          rounded
          mt-2
          py-2
          px-3
          hover:bg-gray-600 hover:text-white
          transition
          relative
        "
      >
        <TransactionIcon class="mr-3" />
        Others
      </div>
    </router-link>
  </div>
  <!-- End Navigations -->
</template>

<script>
import DashboardIcon from "../../../components/icons/DashboardIcon.vue";
import TransactionIcon from "../../../components/icons/TransactionIcon.vue";
import CogIcon from "../../../components/icons/CogIcon.vue";
import ChevronDownIcon from "../../../components/icons/ChevronDownIcon.vue";
import ViewGridIcon from "../../../components/icons/ViewGridIcon.vue";
import { reactive } from "vue";

export default {
  components: {
    DashboardIcon,
    ViewGridIcon,
    TransactionIcon,
    CogIcon,
    ChevronDownIcon,
  },
  setup() {
    const listDropdown = reactive({
      open: false,
      parentClass: "h-0",
      rotateStyle: "",
      class: "list_dropdown_hide",
    });
    function toggleListDropdown() {
      listDropdown.open = !listDropdown.open;
      if (listDropdown.open) {
        listDropdown.class = "list_dropdown_show";
        listDropdown.parentClass = "h-fit";
        listDropdown.rotateStyle = "transform:rotate(180deg);transition:300ms";
      } else {
        listDropdown.class = "list_dropdown_hide";
        listDropdown.parentClass = "h-0";
        listDropdown.rotateStyle = "transform:rotate(0);transition:300ms";
      }
    }
    function menuSettingShow() {
      const urlString = window.location.href;
      const params = urlString.split("/")[3];
      if (params === "setting") {
        listDropdown.open = true;
        listDropdown.class = "list_dropdown_show";
        listDropdown.parentClass = "h-fit";
      } else {
        listDropdown.open = false;
        listDropdown.class = "list_dropdown_hide";
        listDropdown.parentClass = "h-0";
      }
    }
    menuSettingShow();

    return { listDropdown, toggleListDropdown };
  },
};
</script>

<style>
</style>