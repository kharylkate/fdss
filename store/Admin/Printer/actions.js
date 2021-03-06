import axios from "axios";
export default {
  async fetchListPrinters({ commit }, data) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/api/printer/select`,
    })
      .then(res => {
        if (Array.isArray(res.data.view))
          commit("setListPrinters", res.data.view);
        else commit("setListPrinters", []);
        return res;
      })
      .catch(err => err);
  },

  async addPrinter({commit}, data) {
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/api/printer/add`,
      headers: {
        Authorization : `B1SESSION=${data.sessionID}`
      },
      data: {
        U_IP_ADD: data.data.U_IP_ADD,
        U_LOCATION_ID: data.data.U_LOCATION_ID
      }
    }).then( res => {
      if(res.data.patched){
        commit("addPrinter", data.data);
      } else {
        commit("addPrinter", []);
      }
    }).catch(err => err);
  },

  async updatePrinter({commit}, data) {
    return await axios({
      method: "PUT",
      url: `${this.$axios.defaults.baseURL}/api/printer/update/${data.data.Code}`,
      headers: {
        Authorization : `B1SESSION=${data.sessionId}`
      },
      data: {
        U_LOCATION_ID: data.data.U_LOCATION_ID,
        U_IP_ADD: data.data.U_IP_ADD
      },
      validateStatus: () => true
    }).then( res => {
      if(res.data.patched) {
        commit("updatePrinter", data.data);
      } else {
        commit("updatePrinter", []);
      }
      return res.data
    }).catch(err => console.log(err));

  }
}