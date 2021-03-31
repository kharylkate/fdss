export default {
    setListPrinters(state, data) {
      if (state.listPrinters.length < 1) state.listPrinters = data;
    },

    addPrinter(state, data) {
      state.listPrinters.push(data)
    },

    updatePrinter(state, data) {
      console.log(data);
      const printer = state.listPrinters.findIndex(loc => loc.U_LOCATION_ID === data.U_LOCATION_ID)
      state.listPrinters.splice(printer, 1);
      state.listPrinters.push(data);
    }

}