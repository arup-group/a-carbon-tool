<template>
    <v-container class="ma-0 mb-2 pa-0">
        <v-btn
            outlined
            color="primary"
            class="mb-0"
            type="submit"
            @click="openDialog = true"
        >
            Arup Staff
        </v-btn>
        <v-dialog
            v-model="openDialog"
            max-width="640px"
        >
            <v-card 
                v-if="arupAuth != true"
                outlined
                flat
            >
                <v-card-title>ACCESS DENIED</v-card-title>
                <v-card-text>
                    Looks like you're not able to access this area. Please close this dialog and select 
                    another server.
                </v-card-text>
                <v-card-actions class="justify-end" >
                    <v-btn 
                        @click="openDialog = false"
                        text
                        color='primary'
                    >
                        CLOSE
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-card
                v-if="arupAuth"
                outlined
                flat
            >
                <v-card-title>
                    Select your server
                </v-card-title>
                <v-card-actions>
                    <v-row
                        v-for="server in servers"
                        :key = "server.name"
                    >
                        <v-col cols="12" align="center">
                            <v-btn
                                outlined
                                color="primary"
                                class="mb-2"
                                @click="server.location"
                            >
                                {{ server.name }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
                <v-card-actions class="justify-end" >
                    <v-btn 
                        @click="openDialog = false"
                        text
                        color='primary'
                    >
                        CLOSE
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Emit } from "vue-property-decorator"

    @Component({})

    export default class ArupLogin extends Vue {

        openDialog = false
        arupAuth = true

        servers = [
            {
                name: "Arup V2",
                location: ""
            },
            // {
            //     name: "HS2 Euston",
            //     location: ""
            // },
            // {
            //     name: "P500",
            //     location: "",
            // }
        ]

    }

</script>
