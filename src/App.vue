<template>
  <div>
    <md-toolbar
      class="fixed-to-top xxx-md-transparent md-elevation-0 my-toolbar"
    >
      <md-menu
        style="pointer-events:all; z-index:100;"
        md-direction="top-start"
        md-size="huge"
        md-align-trigger
      >
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <md-menu-content style="pointer-events:all; z-index:100;">
          <md-menu-item @click="data = 'click 1'" to="/">
            <span>Dashboard</span>
            <md-icon>home</md-icon>
          </md-menu-item>
          <md-menu-item @click="data = 'click 2'" to="/methodology">
            <span>Methodology</span>
            <md-icon>school</md-icon>
          </md-menu-item>
          <md-menu-item @click="data = 'click 2'" to="/help">
            <span>Help</span>
            <md-icon>help</md-icon>
          </md-menu-item>
          <md-menu-item @click="data = 'click 2'" to="/faqs">
            <span>FAQs</span>
            <md-icon>question_answer</md-icon>
          </md-menu-item>
          <md-menu-item @click="data = 'click 2'" to="/contact">
            <span>Contact</span>
            <md-icon>supervisor_account</md-icon>
          </md-menu-item>
          <md-menu-item @click="logout">
            <span>Logout</span>
            <md-icon>exit_to_app</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <img src="@/assets/Arup_Black.png" style="width:100px" />
      <span class="md-subheading">
        <md-chip class="md-accent"> <strong>Carbon</strong> </md-chip>&nbsp;
        <span class="md-caption md-small-hide">
          v{{ version }}
          <i>creating with conscience</i>
        </span>
      </span>
    </md-toolbar>
    <div id="app" xxxstyle="margin-top:60px;">
      <md-content>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </md-content>
    </div>
  </div>
</template>
<script>
import { version } from "../package.json";
export default {
  name: "MainApp",
  components: {},
  watch: {
    $route(newVal) {
      this.routeName = newVal.name;
    },
  },
  data() {
    return {
      version: version,
      showLoading: false,
      routeName: null,
      isStoreInit: false,
      closeOnClick: false,
      closeOnSelect: true,
    };
  },
  created() {
    this.initStore();
    if (this.$store.state.isAuth) {
      this.$store.dispatch(
        "getStreams",
        "omit=objects,layers&isComputedResult=false&&sort=updatedAt",
      );
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    initStore() {
      if (!this.isStoreInit) {
        this.$store.commit("SET_MATERIALS_DB");
        this.$store.commit("SET_SELECTED_DB_SOURCE");
        this.isStoreInit = true;
      }
    },
  },
  updated() {},
};
</script>
<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    // The primary color of your application
      primary: md-get-palette-color(black, A200),
    // The accent or secondary color
      accent: md-get-palette-color(teal, A200)
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

$SpeckleBlue: #448aff;

a:not(.md-button) {
  color: $SpeckleBlue !important;
}

.credits {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.credits a {
  color: white !important;
}

.text-center-small {
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
}

#app {
  width: 100%;
  height: auto;
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btn-no-margin,
.no-margin {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.md-card.md-with-hover {
  cursor: default !important;
}

.stream-chips:after {
  display: none !important;
}

.stream-chips:before {
  display: none !important;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center !important;
}

.bg-ghost-white {
  background-color: ghostwhite;
}

.my-toolbar {
  box-shadow: none !important;
  pointer-events: none;
  z-index: 2 !important;
}

.fixed-to-top {
  position: fixed !important;
  top: 0;
  z-index: 10;
}

.sticky-top {
  position: -webkit-sticky;
  /* Safari */
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
}
</style>
