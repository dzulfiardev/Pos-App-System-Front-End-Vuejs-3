<template>
  <nav class="bg-white border-b shadow transition duration-500">
    <div class="max-w-7xl mx-auto px-3 sm:px-5 lg:px-3 transition">
      <div class="flex items-center justify-between h-16">
        <!--  -->
        <div class="w-1/6 hidden xl:block">
          <button @click="$emit('toggleSidebar')">
            <MenuBarIcon
              class="w-7 h-7 hover:text-gray-500 transition duration-300"
            />
          </button>
        </div>

        <div class="w-1/6 xl:hidden">
          <button @click="$emit('toggleSlide')">
            <MenuBarIcon
              class="w-7 h-7 hover:text-gray-500 transition duration-300"
            />
          </button>
        </div>

        <div class="flex flex-row-reverse align-middle w-full">
          <Menu as="div" class="relative">
            <div>
              <MenuButton class="flex w-sm">
                <!-- Avatar -->
                <img
                  class="w-10 h-10 rounded-full mr-3 object-center object-cover"
                  :src="avatar"
                  alt=""
                  v-if="avatar"
                />
                <span
                  v-else
                  class="mr-3 block rounded-full bg-gray-200 w-10 h-10"
                ></span>
                <!-- End Avatar -->

                <!-- Full Name -->
                <span v-if="authUser.name" class="mt-2 text-gray-500">
                  {{ authUser.name }}
                </span>

                <!-- Skleton loading -->
                <span
                  v-else
                  class="text-gray-500 block rounded bg-gray-200 w-28 h-5"
                  style="margin-top: 7px"
                ></span>
                <!-- End Full Name -->
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <router-link
                    :to="item.href"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    <span>{{ item.name }}</span>
                  </router-link>
                </MenuItem>
                <hr />
                <MenuItem
                  as="div"
                  class="
                    flex
                    cursor-pointer
                    w-full
                    px-4
                    py-2
                    text-sm text-gray-700
                    hover:bg-gray-100
                  "
                  @click="$emit('logout')"
                >
                  <LogoutIcon />
                  <button class="block" type="button">Logout</button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/vue";
import LogoutIcon from "../../../components/icons/LogoutIcon.vue";
import MenuBarIcon from "../../../components/icons/MenuBarIcon";
import { mapGetters } from "vuex";

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "#" },
];
export default {
  components: {
    Menu,
    MenuItem,
    MenuItems,
    MenuButton,
    MenuBarIcon,
    LogoutIcon,
  },
  computed: {
    ...mapGetters("auth", ["authUser"]),
    ...mapGetters("auth", ["avatar"]),
  },
  emits: ["toggleSidebar", "toggleSlide", "logout"],
  setup() {
    return {
      userNavigation,
    };
  },
};
</script>

<style>
</style>