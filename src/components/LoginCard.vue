<template>
  <v-form ref="form" @submit.prevent="checkSubmit">
    <v-container class="d-flex justify-center align-center">
      <v-card style="width: 50%">
        <v-card-title class="">Log In here</v-card-title>
        <!-- added some text to show the user what to do -->
        <v-card-subtitle class="text--primary"> 
          Select a server:
        </v-card-subtitle>
        <div id="arup-xyz">
          <!-- added button to direct to arup server -->
          <v-btn @click="setServerType('arup')" color="secondary" text>
            Arup Servers
          </v-btn>
          <!-- added button to direct to some other server function -->
          <v-btn @click="setServerType('xyz_btn')" color="secondary" text>
            XYZ Server
          </v-btn>
        </div>
        <!-- updated the text slightly to be more descriptive of request -->
        <template v-if="serverType">
          <v-card-subtitle class="text--primary">
            Define the Speckle server you wish to connect to:
          </v-card-subtitle>
          <v-card-text>
            <v-select
              v-model="model"
              :items="items"
              label="Select server location"
            ></v-select>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" text type="submit">Log In</v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <v-card-subtitle class="text--secondary">
            non arup server list shown?
          </v-card-subtitle>
        </template>
      </v-card>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { Server } from "@/models/auth/";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class LoginCard extends Vue {
  @Prop() servers!: Server[];
  model: Server = {} as Server;

  serverType = false;


  setServerType(btn_type : string) {
    // TODO: make conditinal to show arup of XYZ
    if (btn_type === 'arup') {
      this.serverType = true;
    } else {
      this.serverType = false;
    }
    
    return this.serverType;
  };

  get items() {
    if (this.servers) {
      return this.servers.map((server) => {// updated s to server to be more descriptive
        return {
          text: `${server.region}`, //removed  - ${s.url} as we didnt want the user seeing url
          value: server,
        };
      });
    } else {
      return [];
    }
  }

  checkSubmit() {
    if (this.model.region) {
      this.submit(this.model);
    }
  }

  @Emit("submit")
  submit(server: Server) {
    return server;
  }
}
</script>
