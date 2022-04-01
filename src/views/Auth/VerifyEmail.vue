<template>
  <div class="p-10">
    <form @submit.prevent="sendVerification">
      <p>Email have a send, please verify your email</p>
      If you haven't recieve a email verification please click
      <button type="submit" class="text-green-500 font-bold">Here</button>
    </form>
    <button type="button" @click="handleLogout" class="text-red-700">
      Logout
    </button>

    <FlashMessage :message="attr.message" :error="attr.error" />
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore, mapGetters } from "vuex";
import AuthService from "../../services/AuthService";
import FlashMessage from "../../components/reusable/FlashMessage.vue";

export default {
  components: {
    FlashMessage,
  },
  computed: {
    ...mapGetters("auth", ["authUser"]),
  },
  setup() {
    const store = useStore();
    const attr = reactive({
      message: null,
      error: null,
    });

    const payload = reactive({
      user: null,
    });

    const authUser = computed(() => store.getters["auth/authUser"]);

    function sendVerification() {
      payload.user = authUser.value.id;
      AuthService.sendVerification(payload)
        .then(() => {
          attr.message = "Verification email sent";
          setTimeout(() => {
            attr.message = null;
          }, 3000);
        })
        .catch((err) => (attr.error = err.data.message));
    }

    function handleLogout() {
      store.dispatch("auth/logout");
    }

    return { attr, sendVerification, handleLogout };
  },
};
</script>