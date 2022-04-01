import * as API from "./API";

export default {
  uploadFile(payload) {
    return API.apiClient.post(payload.endpoint, payload.file);
  },
};
