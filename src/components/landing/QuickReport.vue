<template>
    <v-dialog v-model="dialog" max-width="50%" persistent>
        <v-card>
            <v-card-text>
                <assessment :modal="true" :modalStreamid="streamid" @close="close" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import Assessment from "@/views/Assessment.vue";

@Component({
    components: { Assessment }
})
export default class QuickReport extends Vue {
    @Prop() dialog!: boolean;
    @Prop() streamid!: string;

    @Emit("close")
    close() {
        return;
    }
}
</script>
