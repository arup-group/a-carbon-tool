<template>
    <div>
        <p>Menu6 working!</p>
        <code>
            {{ report }}
        </code>
    </div>
</template>
<script lang="ts">
import { ReportPassdown } from "@/models/newAssessment";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Menu6 extends Vue {
    @Prop() report!: ReportPassdown;
}
</script>