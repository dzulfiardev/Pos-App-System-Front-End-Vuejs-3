<template>
  <div class="grid justify-items-center">
    <div
      class="
        mt-5
        p-4
        max-w-md
        w-full
        bg-white
        rounded-lg
        border border-gray-200
        shadow-md
        sm:p-6
        lg:p-8
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      <form class="space-y-6" @submit.prevent="handleForgotPassword">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Forgot Password
        </h3>

        <FlashMessage :error="alert.error" :message="alert.message" />

        <div>
          <label
            for="email"
            class="
              block
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-gray-300
            "
            >Input your email</label
          >
          <input
            type="text"
            name="email"
            id="email"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:outline-none
              focus:ring-green-500
              focus:border-green-500
              focus:ring-1
              block
              w-full
              p-2.5
              dark:bg-gray-600
              dark:border-gray-500
              dark:placeholder-gray-400
              dark:text-white
              transition
              duration-300
            "
            placeholder="name@company.com"
            v-model="payload.email"
          />
        </div>

        <button
          type="submit"
          class="
            w-full
            text-white
            bg-green-600
            hover:bg-green-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            transition
            duration-300
          "
          :class="{ 'opacity-25': attr.disabled }"
          :disabled="attr.disabled"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import FlashMessage from "../../components/reusable/FlashMessage.vue";
import AuthService from "../../services/AuthService";

export default {
  components: {
    FlashMessage,
  },
  setup() {
    const payload = reactive({
      email: null,
    });
    const alert = reactive({
      error: null,
      message: null,
    });
    const attr = reactive({
      disabled: false,
    });

    function handleForgotPassword() {
      attr.disabled = true;
      AuthService.forgotPassword(payload)
        .then(() => {
          attr.disabled = false;
          alert.message = "Reset password email send, please check your email.";
          payload.email = null;
          setInterval(() => {
            alert.message = null;
          }, 4000);
        })
        .catch((err) => {
          attr.disabled = false;
          alert.error = err.data.message;
          setInterval(() => {
            alert.error = null;
          }, 4000);
        });
    }

    return { payload, alert, attr, handleForgotPassword };
  },
};
</script>

<style>
</style>