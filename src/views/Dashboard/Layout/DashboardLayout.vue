<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex h-full text-gray-600">
    <transition name="wrapper">
      <Sidebar
        v-if="sidebar.open"
        class="hidden sm:hidden md:hidden xl:block w-1/5 z-0"
        :companyName="authUser.company"
      />
    </transition>
    <DrawerSidebar
      :slideClass="sidebar.slideClass"
      @toggleSlide="toggleSlide"
    />
    <div class="min-h-full h-fit w-full sm:w-full md:w-full">
      <Topbar
        :photo="photo"
        @logout="handleLogout"
        @toggleSidebar="toggleSidebar"
        @toggleSlide="toggleSlide"
      />
      <!-- Main content container -->
      <main class="bg-gray-100 h-fit">
        <div class="max-w-7xl mx-auto pt-6 pb-10 sm:px-6 px-3 lg:px-8">
          <!-- Replace with your content -->
          <slot></slot>
          <!-- /End replace -->
        </div>
      </main>
      <!-- Main content container -->
      <!-- <div class="h-100 bg-gray-400">
        <h1>Footer</h1>
      </div> -->
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { mapGetters, useStore } from "vuex";
import Topbar from "../Partials/Topbar.vue";
import Sidebar from "../Partials/Sidebar.vue";
import DrawerSidebar from "../Partials/DrawerSidebar.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Topbar,
    DrawerSidebar,
  },
  computed: {
    ...mapGetters("auth", ["authUser"]),
  },
  setup() {
    const store = useStore();
    const form = reactive({
      disabled: false,
    });
    const sidebar = reactive({
      open: true,
      openClass: "showSlideSidebar",
      slide: false,
      slideClass: "hideSlideSidebar",
    });

    const photo = reactive({
      avatar: null,
      avatarSrc: null,
    });

    async function getAuthData() {
      await store.dispatch("auth/getAuthUser");
    }
    getAuthData();

    function toggleSidebar() {
      sidebar.open = !sidebar.open;
      // if (sidebar.open) {
      //   sidebar.slideClass = "showSlideSidebar";
      // } else {
      //   sidebar.slideClass = "hideSlideSidebar";
      // }
    }

    function toggleSlide() {
      sidebar.slide = !sidebar.slide;
      if (sidebar.slide) {
        sidebar.slideClass = "showSlideSidebar";
      } else {
        sidebar.slideClass = "hideSlideSidebar";
      }
    }

    function handleLogout() {
      form.disabled = true;
      store.dispatch("auth/logout");
    }

    return {
      photo,
      store,
      sidebar,
      form,
      handleLogout,
      toggleSidebar,
      toggleSlide,
    };
  },
};
</script>

<style>
.showSlideSidebar {
  left: 0;
  transition: 350ms;
}
.hideSlideSidebar {
  left: -500px;
  transition: 350ms;
}
</style>