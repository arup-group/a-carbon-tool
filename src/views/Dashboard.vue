<template>
  <div class="md-layout md-alignment-center-center" style="margin-top:60px;">
    <md-card
      class="md-elevation-0 md-layout-item md-size-90 md-medium-size-75 md-small-size-100"
    >
      <md-card-content>
        <h1 class="md-display-2">Hello {{ $store.state.user.name }}!</h1>
        <p>
          To get started, have a read through the
          <router-link to="/methodology">
            <md-chip class="md-accent-xxx md-elevation-5" md-clickable>
              methodology
            </md-chip>
          </router-link>
          behind this tool, and don't forget to browse the
          <router-link to="/help">
            <md-chip class="md-accent-xxx md-elevation-5" md-clickable>
              help
            </md-chip> </router-link
          >page we've set up to get you going with creating reports.
          <br />&nbsp;
        </p>
        <md-button
          class="md-raised md-primary-xxx xxx-md-dense text-center btn-no-margin"
          style="width: 100%; backgroundColor: grey; color: white"
          to="/carbon/calc"
          >Create a new report</md-button
        >
      </md-card-content>
    </md-card>
    <md-card
      class="md-elevation-0 md-layout-item md-size-90 md-medium-size-75 md-small-size-100"
    >
      <md-card-content>
        <div class="md-layout md-alignment-center-left">
          <div
            class="md-title md-layout-item md-size-100"
            v-if="!$store.state.hadNoReports"
          >
            Your existing reports:
          </div>
          <div
            class="md-title md-layout-item md-size-100"
            v-if="$store.state.hadNoReports"
          >
            It seems like you have no existing reports. No worries, there's a
            sample below!
          </div>
          <div
            v-if="tags.length > 0"
            class="md-caption"
            style="margin-top:10px"
          >
            <a v-if="selectedTags.length === 0" @click="showTags = !showTags">
              {{ showTags ? "HIDE TAG FILTERS" : "SHOW TAG FILTERS" }}
            </a>
            <b>
              <a v-if="selectedTags.length !== 0" @click="selectedTags = []"
                >CLEAR</a
              >
            </b>
            <br />&nbsp;
            <div v-show="showTags">
              <md-chip
                v-for="tag in tags"
                :key="tag"
                md-clickable
                :class="{
                  'tag-chip': true,
                  'md-elevation-10 md-primary':
                    selectedTags.indexOf(tag) !== -1,
                }"
                @click.native="toggleTag(tag)"
                >{{ tag }}</md-chip
              >
            </div>
          </div>
        </div>
        <div class="md-layout md-gutter" style="margin-top:40px;">
          <report-card
            v-for="stream in displayStreams"
            :stream="stream"
            v-bind:key="stream.id"
          />
        </div>
        <div
          class="md-layout md-gutter"
          style="margin-top:40px;margin-bottom: 40px;"
        >
          <div
            class="md-layout-item md-size-100 text-center"
            style="margin-top:40px;margin-bottom:20px"
          >
            <md-button
              class="md-icon-button"
              @click.native="pageNumber = 0"
              :disabled="pageNumber === 0"
            >
              <md-icon>first_page</md-icon>
            </md-button>
            <md-button
              class="md-icon-button"
              @click.native="pageNumber -= 1"
              :disabled="pageNumber === 0"
            >
              <md-icon>chevron_left</md-icon>
            </md-button>
            <span class="md-caption" style="position: relative;top:8px;">
              {{ pageNumber }} /
              {{ (streams.length / sliceSize).toFixed(0) }}
            </span>
            <md-button
              class="md-icon-button"
              @click.native="pageNumber += 1"
              :disabled="pageNumber >= Math.round(streams.length / sliceSize)"
            >
              <md-icon>chevron_right</md-icon>
            </md-button>
            <md-button
              class="md-icon-button"
              @click.native="
                pageNumber = Math.round(streams.length / sliceSize)
              "
              :disabled="pageNumber >= Math.round(streams.length / sliceSize)"
            >
              <md-icon>last_page</md-icon>
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
// @ is an alias to /src
import ReportCard from "@/components/ReportCard.vue";

export default {
  name: "HomeView",
  components: {
    ReportCard,
  },
  computed: {
    tags() {
      let set = new Set();
      this.allReports.forEach(({ tags }) => {
        set = new Set([...set, ...tags]);
      });
      return [...set];
    },
    allReports() {
      let reports = this.$store.state.streams
        .filter(
          stream =>
            stream.hasOwnProperty("isCarbonReport") &&
            stream.parent === null &&
            stream.deleted === false,
        )
        .sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
      return reports;
    },
    streams() {
      if (this.selectedTags.length === 0) return this.allReports;
      return this.allReports.filter(({ tags }) => {
        return tags.some(val => this.selectedTags.includes(val));
      });
    },
    displayStreams() {
      return this.streams.slice(
        this.currentIndex + this.pageNumber * this.sliceSize,
        this.sliceSize * (this.pageNumber + 1),
      );
    },
  },
  methods: {
    toggleTag(tag) {
      let index = this.selectedTags.indexOf(tag);
      if (index !== -1) this.selectedTags.splice(index, 1);
      else this.selectedTags.push(tag);
    },
  },
  data() {
    return {
      currentIndex: 0,
      sliceSize: 6,
      pageNumber: 0,
      selectedTags: [],
      showTags: true,
      hadNoStreams: false,
      sampleRetrieved: false,
    };
  },
  mounted() {
    this.showTags = window.innerWidth > 960;
  },
};
</script>
<style scoped lang="scss">
.tag-chip {
  height: 25px;
  line-height: 25px;
  margin-bottom: 5px;
}
</style>
