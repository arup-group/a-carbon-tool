<template>
  <md-card md-with-hover class="md-elevation-0 stream-search">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Search streams</div>
        <div class="md-caption">
          Search streams by name. To search streams by ID, prepend the keyword
          <span
            style="color:#808080"
          >
            <b>streamId:</b>
          </span>
        </div>
      </md-card-header-text>
    </md-card-header>
    <md-card-content>
      <md-field md-clearable>
        <md-icon>search</md-icon>
        <md-input
          @input="updateSearch"
          v-model="searchfilter"
          spellcheck="false"
          :disabled="globalDisabled"
        ></md-input>
        <label>Search for a stream to add</label>
      </md-field>
      <md-progress-bar
        md-mode="indeterminate"
        :md-diameter="20"
        :md-stroke="2"
        v-show="searchInProgress"
      ></md-progress-bar>
      <div class="search-results" v-if="showSearchResults && filters.length > 0">
        <md-chip
          md-clickable
          class="md-primary"
          style="margin: 3px;"
          v-for="stream in paginatedStreams"
          :key="stream.streamId"
          @click="selectStream(stream.streamId)"
        >
          <strong>{{ stream.name }}</strong>
          {{ stream.streamId }}
          <div v-if="stream.tags">
            <span
              v-for="tag in stream.tags"
              v-bind:key="tag.id"
              style="background: #0B5DE8; border-radius:3px; margin-right:4px; padding:1px"
            >{{ tag }}</span>
          </div>
        </md-chip>
        <p
          v-if="paginatedStreams.length === 0"
          class="md-caption"
        >No streams found. Streams that have already been loaded are ignored</p>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import debounce from "lodash.debounce";

export default {
  name: "StreamSearch",
  props: {
    streamsToOmit: {
      type: Array,
      default() {
        return [];
      },
    },
    globalDisabled: {
      type: Boolean,
      default: false,
    },
    writeOnly: Boolean,
  },
  computed: {
    filteredStreams() {
      // return this.$store.state.streams;
      return this.$store.getters
        .filteredStreams(this.filters)
        .filter(s => this.streamsToOmit.indexOf(s.streamId) === -1);
    },
    paginatedStreams() {
      let toReturn = this.filteredStreams.slice(this.startIndex, this.endIndex);
      if (this.writeOnly)
        toReturn = toReturn.filter(
          s =>
            s.owner === this.$store.state.user._id ||
            s.canWrite.indexOf(this.$store.state.user._id) > -1,
        );
      return toReturn;
    },
  },
  watch: {
    searchfilter(val) {
      if (val === "") {
        this.showSearchResults = false;
        this.searchInProgress = false;
      } else this.searchInProgress = true;
    },
  },
  data() {
    return {
      searchfilter: "",
      filters: [],
      showSearchResults: false,
      searchInProgress: false,
    };
  },
  methods: {
    selectStream(streamId) {
      this.$emit("selected-stream", streamId);
    },
    parseFilters(search) {
      try {
        let filters = search.split(" ").map(t => {
          if (t.includes(":"))
            return { key: t.split(":")[0], value: t.split(":")[1] };
          else if (
            !t.includes("public") &&
            !t.includes("private") &&
            !t.includes("mine") &&
            !t.includes("shared")
          )
            // TODO: not elegant
            return { key: "name", value: t };
          else return { key: t, value: null };
        });

        return filters;
      } catch (e) {
        return [{ key: "name", value: e }];
      }
    },
    updateSearch: debounce(async function(e) {
      this.searchInProgress = true;

      if (e === "") {
        this.showSearchResults = false;
        this.searchInProgress = false;
        return;
      }

      //Parse search query
      let filters = this.parseFilters(e);

      //Request streams from filters in case this hasn't been cached in memory yet
      for (let i = 0; i < filters.length; i++) {
        await this.$store
          .dispatch("getStream", { streamId: filters[i].value })
          .catch(e => {
            console.error("Cannot find stream with ID: ", filters[i].value);
          });
      }
      this.filters = filters;
      this.showSearchResults = true;
      this.searchInProgress = false;
    }, 1000),
  },
};
</script>
<style scoped lang="scss">
.stream-search {
  padding-left: 0;
  padding-right: 0;
  margin: 0;
  border-radius: 10px;
}
</style>
