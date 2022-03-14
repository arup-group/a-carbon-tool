<template>
    <v-container
        class="d-flex justify-center align-center pt-0"
        :style="[
        this.$store.state.darkMode
            ? { 'background-color': '#121212 !important' }
            : { 'background-color': '#FFFFFF !important' },
        ]"
    >
        <v-card
            outlined
            class="align-center justify-center mt-0"
            width="50%"
        >
            <v-card-text class="my-4 py-0" align="center">
              OR
            </v-card-text>
            <v-card-actions class="justify-center mb-4">
                <v-btn
                outlined
                @click="openDefine = true"
                color="border darken-2"
            >
                Enter Manually
            </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
            v-model="openDefine"
            max-width="640px"
            persistent
        >
            <v-card flat outlined>
                <v-card-title>
                    Speckle Server
                </v-card-title>
                <v-card-subtitle>
                    Note that any speckle server will need to be registered
                    with ACT before use. Visit our github site to request.
                </v-card-subtitle>
                <v-card-actions class="mx-8">
                    <v-text-field
                        label= "URL"
                        v-model="url"
                        prefix="https://"
                    >

                    </v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-end mb-2">
                    <v-btn
                        text
                        color="primary"
                        @click="openDefine = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        outlined
                        color="primary"
                        @click="signIn(url)"
                    >
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
            dark="!this.$store.state.darkMode"
            v-model="urlFail"
            multi-line="true"
            
        >
            This URL is not registered with ACT. Try again or visit our git repository 
            to register
            <v-btn
                @click="urlFail=false"
                text
                color="secondary"
                class="ma-2"
            >
                close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Server } from "@/models/auth";

@Component ({})

export default class DefinLogin extends Vue {

    servers = this.$store.state.servers

    openDefine = false
    url = ""
    urlFail = false

    signIn(serverUrl: string) {
        const fullUrl = "https://" + serverUrl
        if (fullUrl === this.servers.arup.url) {
            this.submit(this.servers.arup);
        } 
        else if (fullUrl === this.servers.xyz_server.url) {
            this.submit(this.servers.xyz_server);
        }
        else if (fullUrl === this.servers.hs2.url) {
            this.submit(this.servers.hs2);
        }
        else if (fullUrl === this.servers.p500.url) {
            this.submit(this.servers.p500);
        }
        else {
            this.urlFail = true
        }
    }

    @Emit("submit")
    submit(server: Server) {
        return server
    }
}

</script>
