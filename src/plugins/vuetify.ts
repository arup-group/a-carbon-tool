import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import store from "../store/index";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: store.state.darkMode,
    themes: {
      light: {
        primary: "#32A4A0",
        secondary: "#C83C96",
        background: "#FFFFFF",
        border: "BEBEBE",
        warning: "#FFE011",
        error: "#F40808",
      },
      dark: {
        primary: "#4EC0EB",
        secondary: "#FF79C0",
        background: "#1C1C1C",
        container: "#1C1C1C",
        border: "BEBEBE",
        warning: "#FFE011",
        error: "#F40808",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
