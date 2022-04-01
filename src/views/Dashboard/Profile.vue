<template>
  <DashboardLayout>
    <div>
      <h1 class="text-2xl font-bold text-gray-800">My Profile</h1>
    </div>

    <!-- Container -->
    <div class="mt-10">
      <div class="flex flex-col md:flex-row">
        <div class="w-full pb-5">
          <h1 class="text-xl">Profile Information</h1>
          <p class="mt-1">
            Update your account's profie information and email address.
          </p>
        </div>
        <div class="w-full">
          <Card>
            <div>
              <h1 class="font-bold">Photo</h1>
            </div>
            <div>
              <small class="text-green-500" v-if="alert.success">{{
                alert.success
              }}</small>
              <small class="text-red-500" v-if="alert.error">{{
                alert.error
              }}</small>
            </div>
            <div class="mt-3">
              <img
                v-if="img.avatar"
                class="w-32 h-32 rounded-full object-cover object-center"
                :src="img.avatar"
              />
              <span
                v-else
                class="w-20 h-20 rounded-full bg-gray-300 block"
              ></span>
            </div>
            <div class="mt-4">
              <div class="inline-block relative">
                <input
                  type="file"
                  class="
                    btn_file_upload
                    custom-file-input
                    file:text-xs file:tracking-widest file:p-2 file:border
                    hover:file:bg-gray-700 hover:file:text-white
                  "
                  accept="image/*"
                  ref="profie_photo"
                  style="width: 150px !important"
                  @change="updateImage($event)"
                />

                <button type="button" class="btn_upload custom-file-input">
                  UPLOAD PHOTO
                </button>
              </div>

              <div class="inline" v-if="img.submitBtn">
                <button
                  type="button"
                  class="btn_accept_upload accept_btn"
                  @click="uploadFile()"
                >
                  Accept
                </button>
              </div>
            </div>

            <form @submit.prevent="updateUser()">
              <div class="mt-4">
                <label for="email" class="text-sm">Email</label>
                <input
                  type="text"
                  class="input_style_1"
                  placeholder="Your Email"
                  v-model="form.email"
                  :class="{ ' border-2 border-red-500': alert.errorEmail }"
                />
                <small class="text-red-600" v-if="alert.errorEmail">{{
                  alert.errorEmail
                }}</small>
              </div>
              <div class="mt-2">
                <label for="email" class="text-sm">Username</label>
                <input
                  type="text"
                  class="input_style_1"
                  placeholder="Username"
                  v-model="form.username"
                  :class="{ ' border-2 border-red-500': alert.errorUsername }"
                />
                <small class="text-red-600" v-if="alert.errorUsername">{{
                  alert.errorUsername
                }}</small>
              </div>
              <div class="mt-2">
                <label for="email" class="text-sm">Full Name</label>
                <input
                  type="text"
                  class="input_style_1"
                  placeholder="Full Name"
                  v-model="form.name"
                  :class="{ ' border-2 border-red-500': alert.errorName }"
                />
                <small class="text-red-600" v-if="alert.errorName">{{
                  alert.errorName
                }}</small>
              </div>

              <!-- Footer -->
              <div class="flex justify-end pt-3 mt-10 border-t border-gray-200">
                <button
                  type="submit"
                  class="btn_dark"
                  :class="{ 'opacity-25': disable.submitProfile }"
                  :disabled="disable.submitProfile"
                >
                  Update
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "./Layout/DashboardLayout.vue";
import Card from "../../components/reusable/Card.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import FileService from "../../services/FileService";
import AuthService from "../../services/AuthService";

export default {
  components: {
    DashboardLayout,
    Card,
  },
  setup() {
    const store = useStore();
    const img = reactive({
      avatar: null,
      submitBtn: false,
    });
    const form = reactive({
      email: null,
      username: null,
      name: null,
      avatar: null,
      file: null,
    });
    const alert = reactive({
      success: null,
      error: null,
      errorEmail: null,
      errorName: null,
      errorUsername: null,
    });
    const disable = reactive({
      submitProfile: false,
    });

    async function authData() {
      const authUser = await store.dispatch("auth/getAuthUser");
      form.email = authUser.email;
      form.username = authUser.username;
      form.name = authUser.name;
      form.avatar = authUser.avatar;
      if (!authUser.avatar) {
        const name = authUser.name.split(" ", 2);
        img.avatar = `https://ui-avatars.com/api/?name=${name[0]}+${name[1]}`;
      } else {
        img.avatar = authUser.avatar;
      }
    }
    authData();

    function updateImage(event) {
      const file = event.target.files[0];
      if (file) {
        form.file = file;
        img.submitBtn = true;
        img.avatar = URL.createObjectURL(file);
      } else {
        form.file = null;
        img.avatar = "";
        img.submitBtn = false;
      }
    }

    function uploadFile() {
      const payload = {};
      const formData = new FormData();
      formData.append("file", form.file);
      payload.file = formData;
      payload.endpoint = "/users/auth/avatar";
      FileService.uploadFile(payload)
        .then(() => {
          alert.success = "File Uploaded.";
          setTimeout(() => {
            alert.success = null;
          }, 3000);
          alert.error = null;
          img.submitBtn = false;
        })
        .catch((err) => {
          alert.success = null;
          alert.error = err.response.data.message;
        });
    }

    function updateUser() {
      disable.submitProfile = true;
      const payload = {
        name: form.name,
        email: form.email,
        username: form.username,
      };
      AuthService.updateUser(payload)
        .then(() => {
          disable.submitProfile = false;
          alert.success = "User Updated";
          setTimeout(() => {
            alert.success = null;
          }, 3000);
          alert.error = null;
          alert.errorUsername = null;
          alert.errorEmail = null;
          alert.errorName = null;
        })
        .catch((err) => {
          disable.submitProfile = false;
          const errors = err.data.errors;
          if (errors.email) {
            alert.errorEmail = errors.email[0];
          } else {
            alert.errorEmail = null;
          }
          if (errors.username) {
            alert.errorUsername = errors.username[0];
          } else {
            alert.errorUsername = null;
          }
          if (errors.name) {
            alert.errorName = errors.name[0];
          } else {
            alert.errorName = null;
          }
        });
    }

    return { disable, form, img, alert, updateImage, uploadFile, updateUser };
  },
};
</script>

<style>
.accept_btn:active {
  transform: scale(90%);
}
</style>