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
        primary: "#BFF7EA",
        secondary: "#F6BEE2",
        background: "#353535",
        border: "BEBEBE",
        warning: "#FFE011",
        error: "#F40808",
      },
    },
  },
});
