<template>
    <v-container class="ma-0 pb-2 pa-0">
        <v-btn
            outlined
            @click="openDefine = true"
        >
            Define Manually
        </v-btn>
        <v-dialog
            v-model="openDefine"
            max-width="640px"
            persistent
        >
            <v-card flat outlined>
                <v-card-title>
                    Define your Speckle Server
                </v-card-title>
                <v-card-actions class="mx-8">
                    <v-text-field
                        label= "URL"
                        v-model="url"
                        prefix="https://"
                    >

                    </v-text-field>
                </v-card-actions>
                <v-card-actions class="justify-end">
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
                    >
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Server } from "@/models/auth";

@Component ({})

export default class DefinLogin extends Vue {

    openDefine = false
    url = "https://"

    signIn(serverDestination: string) {
        const servers = this.$store.state.servers
        var match = false
        var matchServer

        // cycle through servers to find match

        for (const [key, values] of Object.entries(servers)) {
            
            if (values.url === this.url)
                match = true
                matchServer = key
                
        }
    }

    


}

</script>
