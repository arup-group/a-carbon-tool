import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#4EC0EB',
                secondary: '#FF79C0',
                background: '#FFFFFF',
                border:'BEBEBE',
                warning: '#FFE011',
                error: '#F40808'
            },
            dark: {
                primary: '#FF79C0',
                secondary: '#4EC0EB',
                background: '#353535',
                border:'BEBEBE',
                warning: '#FFE011',
                error: '#F40808'
            }
        }
    }
});
