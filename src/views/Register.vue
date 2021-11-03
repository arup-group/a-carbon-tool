<template>
  <md-content
    class="md-layout md-alignment-center-center"
    style="min-height: 100vh"
  >
    <form
      class="md-layout-item md-size-33 md-small-size-100 md-medium-size-50"
      @submit.prevent="validateForm"
    >
      <md-card class="md-elevation-3">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Register</div>
            <div class="md-caption">
              Do you want to <router-link to="/login">login</router-link>?
            </div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Server API address</label>
            <md-input
              disabled
              type="url"
              v-model="server"
              name="server"
            ></md-input>
          </md-field>
          <md-field :class="getValidationClass('email')">
            <label>Email adress</label>
            <md-input v-model="email" name="email"></md-input>
            <span class="md-error" v-if="!$v.email.required"
              >The email is required</span
            >
            <span class="md-error" v-else-if="!$v.email.email"
              >Invalid email</span
            >
          </md-field>
          <md-field :class="getValidationClass('name')">
            <label>Name</label>
            <md-input v-model="name" name="name"></md-input>
            <span class="md-error" v-if="!$v.name.required"
              >The name is required</span
            >
            <span class="md-error" v-else-if="!$v.name.minlength"
              >Invalid name</span
            >
          </md-field>
          <md-field :class="getValidationClass('surname')">
            <label>Surname</label>
            <md-input v-model="surname" name="surname"></md-input>
            <span class="md-error" v-if="!$v.surname.required"
              >The surname is required</span
            >
            <span class="md-error" v-else-if="!$v.surname.minlength"
              >Invalid surname</span
            >
          </md-field>
          <md-field :class="getValidationClass('company')">
            <label>Company</label>
            <md-input v-model="company"></md-input>
            <span class="md-error" v-if="!$v.company.required"
              >The company is required</span
            >
            <span class="md-error" v-else-if="!$v.company.minlength"
              >Invalid company (too short).</span
            >
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label>Password</label>
            <md-input
              v-model="password"
              type="password"
              name="password"
              autocomplete="new-password"
            ></md-input>
            <span class="md-error" v-if="!$v.password.required"
              >The password is required</span
            >
            <span class="md-error" v-else-if="!$v.password.minlength"
              >Password too short.</span
            >
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised"
            >Register</md-button
          >
        </md-card-actions>
        <br />
        <speckle-alert
          type="error"
          v-on:closed="showError = false"
          v-show="showError"
          >{{ errorMessage }}</speckle-alert
        >
      </md-card>
    </form>
  </md-content>
</template>
<script>
import Axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import SpeckleAlert from "../components/SpeckleAlert.vue";

export default {
  name: "RegisterView",
  mixins: [validationMixin],
  components: {
    SpeckleAlert,
  },
  data() {
    return {
      server:
        localStorage.getItem("server") || this.$store.state.servers[0].url,
      email: null,
      password: null,
      name: null,
      surname: null,
      company: null,
      errorMessage: null,
      showError: false,
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
    name: { required, minLength: minLength(3), maxLength: maxLength(20) },
    surname: { required, minLength: minLength(3), maxLength: maxLength(20) },
    company: { required, minLength: minLength(3) },
  },
  methods: {
    register() {
      // TODO: validation...
      Axios.post("/accounts/register", {
        email: this.email,
        name: this.name,
        surname: this.surname,
        company: this.company,
        password: this.password,
      })
        .then(res => {
          return this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        })
        .then(res => {
          this.$store.dispatch(
            "getStreams",
            "omit=objects,layers&isComputedResult=false&deleted=false&sort=-lastModified",
          );
          this.$store.dispatch("getProjects");
          this.$router.push("/");
        })
        .catch(err => {
          this.errorMessage = `Failed to log in: ${err.response.data.message}`;
          this.showError = true;
        });
    },
    getValidationClass(fieldName) {
      if (this.$v) {
        const field = this.$v[fieldName];
        if (field) {
          return { "md-invalid": field.$invalid && field.$dirty };
        }
      }
    },
    validateForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) this.register();
    },
  },
  activated() {
    this.server =
      localStorage.getItem("server") || this.$store.state.servers[0].url;
  },
  mounted() {},
};
</script>
<style scoped lang="scss" />
