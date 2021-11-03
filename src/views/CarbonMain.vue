<template>
  <div class="md-layout viewer-main">
    <div class="legend">
      <span v-if="legend" class="md-caption"
        >Colouring by {{ legend.propertyName }}.</span
      >
      <span class="md-caption"
        >{{ selectedObjects.length }} selected objects.</span
      >
    </div>
    <md-progress-bar
      v-if="showLoading"
      class="md-primary global-loader"
      md-mode="indeterminate"
    ></md-progress-bar>
    <div class="view-control-buttons">
      <md-button
        class="md-icon-button md-transparent xxxmd-primary md-dense"
        @click.native="zoomExtents"
      >
        <md-icon>zoom_out_map</md-icon>
      </md-button>
      <span v-if="selectedObjects.length === 1">
        <br />
        <md-button
          class="md-icon-button md-transparent xxxmd-primary md-dense"
          @click.native="zoomToObject"
        >
          <md-icon>gps_fixed</md-icon>
        </md-button>
      </span>
      <br />
      <md-button
        class="md-icon-button md-transparent xxxmd-primary md-dense"
        @click.native="showDialog = !showDialog"
      >
        <md-icon>help</md-icon>
      </md-button>
    </div>
    <div class="view-part-render" ref="render"></div>
    <div
      class="md-layout-item md-small-size-100 md-size-50 md-medium-size-50"
    ></div>
    <div
      class="md-layout-item md-small-size-100 md-size-50 md-medium-size-50 view-part-data md-elevation-20"
    >
      <br />
      <router-view
        @add-stream="addStream"
        @remove-stream="removeStream"
        @set-buckets="setBucketsAndGo"
      ></router-view>
    </div>
    <md-dialog :md-active.sync="showDialog" style="min-width:50%">
      <md-dialog-title>
        How to use the 3d viewer
        <md-icon>360</md-icon>
      </md-dialog-title>
      <div style="padding:20px;">
        <h3>Desktop</h3>
        <p>
          You can
          <strong>rotate</strong> by left-clicking with your mouse and dragging.
        </p>
        <p>
          You can
          <strong>pan</strong> by right-clicking with your mouse and dragging.
        </p>
        <p>
          You can
          <strong>zoom</strong>using your mouse's scrollwheel.
        </p>
        <h3>Mobile & Touch Devices</h3>
        <p>
          You can
          <strong>pan</strong> with a three finger swipe.
        </p>
        <p>
          You can
          <strong>rotate</strong> with a single finger swipe.
        </p>
        <p>
          You can
          <strong>zoom</strong> by pinching.
        </p>
        <h3>Object Selection</h3>
        <p>
          You can tap on an object to select it; depending on where you are in
          the UI (creating a report or viewing one) you can get extra
          information about it.
        </p>
        <p>
          <strong>Double clicking</strong> on an object will focus the view on
          it - this can be a useful way to navigate around.
        </p>
        <p>
          <strong>Multiple selection:</strong>
        </p>
        <p>
          Holding down
          <b>shift</b> and clicking on objects will add them to the selection.
          Conversely, holding down <b>control</b> will remove them from the
          selection.
        </p>
        <p>
          By holding down
          <b>shift</b> and dragging with your mouse you can select
          simulatenoulsy more objects.
        </p>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary md-raised" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import debounce from "lodash.debounce";

import SpeckleRenderer from "@/renderer/SpeckleRenderer.js";
import { categoryExceptionRef } from "@/utils/categoryExceptions";

export default {
  name: "CarbonMainView",
  components: {},
  computed: {
    selectedObjects() {
      return this.$store.state.selectedObjects;
    },
    streamIds() {
      return this.$store.state.loadedStreamIds;
    },
    streams() {
      return this.$store.state.streams.filter(
        s => this.streamIds.indexOf(s.streamId) !== -1,
      );
    },
    legend() {
      return this.$store.state.legend;
    },
  },
  watch: {},
  data() {
    return {
      toRequest: [],
      requestBuckets: [],
      isRequesting: false,
      pauseRequesting: false,
      bucketInProgress: false,
      removeInterval: null,
      streamsToRemove: [],
      showLoading: false,
      showDialog: false,
    };
  },
  methods: {
    zoomExtents() {
      window.renderer.zoomExtents();
    },
    zoomToObject() {
      window.renderer.zoomToObject(this.selectedObjects[0]);
    },
    async addStream(streamId) {
      this.showLoading = true;
      this.$store.commit("ADD_LOADED_STREAMID", streamId);
      let objectIds = await this.$store.dispatch(
        "getStreamObjectsIds",
        streamId,
      );

      let toRequest = objectIds.filter(
        id => this.$store.state.objects.findIndex(o => o._id === id) === -1,
      );
      let toUpdate = objectIds.filter(
        id => this.$store.state.objects.findIndex(o => o._id === id) !== -1,
      );
      this.$store.commit("UPDATE_OBJECTS_STREAMS", {
        objIds: toUpdate,
        streamToAdd: streamId,
      });

      let bucket = [],
        maxReq = 50; // magic number; maximum objects to request in a bucket

      for (let i = 0; i < toRequest.length; i++) {
        bucket.push(toRequest[i]);
        if (i % maxReq === 0 && i !== 0) {
          this.requestBuckets.push({
            objectIds: [...bucket],
            streamId: streamId,
          });
          bucket = [];
          if (!this.isRequesting) this.bucketProcessor();
        }
      }

      // last one
      if (bucket.length !== 0) {
        this.requestBuckets.push({
          objectIds: [...bucket],
          streamId: streamId,
        });
        if (!this.isRequesting) this.bucketProcessor();
      }
    },

    // Goes through all the request buckets and requests them from the server,
    // then plops them in the renderer as they go
    async bucketProcessor() {
      if (this.pauseRequesting) return;
      if (this.requestBuckets.length === 0) {
        this.isRequesting = false;
        // as we don't want to flood the vue store with a lotta add objects calls,
        // we store all objects in an accumulator and commit that once we're done

        // Add original stream objects to store for flow 2: creating new report
        if (this.objectAccumulator.length > 0) {
          this.$store.commit("ADD_OBJECTS", this.objectAccumulator);
        }

        this.objectAccumulator = [];
        this.showLoading = false;

        window.bus.$emit("loading-done");
        return;
      }

      this.isRequesting = true;
      this.bucketInProgress = true;

      let objs = await this.$store.dispatch(
        "getObjects",
        this.requestBuckets[0].objectIds,
      );
      let stream = this.$store.state.streams.find(
        s => s.streamId === this.requestBuckets[0].streamId,
      );
      if (!objs) {
        this.requestBuckets.splice(0, 1);

        this.bucketInProgress = false;
        this.bucketProcessor();
        return;
      }

      let output = [];

      objs.forEach(o => {
        if (!o.properties) o.properties = {};
        o.properties.parameters = o.properties.parameters || {};
        o.properties.id = o._id ? o._id : "no id";
        o.properties.hash = o.hash ? o.hash : "no hash";
        o.properties.speckle_type = o.type;
        o.properties.material_name =
          o.properties.material_name || "no material";
        let objIndexInStream = stream.objects.indexOf(o._id);
        o.properties.objIndexInStream = objIndexInStream;

        let layer = null;
        for (let ll of stream.layers) {
          if (objIndexInStream >= ll.startIndex)
            if (objIndexInStream < ll.startIndex + ll.objectCount) layer = ll;
        }

        o.streams = [this.requestBuckets[0].streamId];

        if (layer && layer.properties) {
          o.color = { hex: "#B3B3B3", a: 0.75 };
          o.properties.layer_guid = layer.guid ? layer.guid : "no layer guid";
          o.properties.layer_name = layer.name;
        } else if (layer) {
          o.properties.layer_guid = layer.guid;
          o.properties.layer_name = layer.name;
          o.color = { hex: "#B3B3B3", a: 0.75 };
        } else {
          o.properties.layer_name = "no layer";
          o.color = { hex: "#B3B3B3", a: 0.75 };
        }

        // Handle exceptions/transformations for certain objects
        const { Category } = o.properties.parameters;
        const exceptionHandler = categoryExceptionRef[Category];

        if (exceptionHandler) {
          const transformed = exceptionHandler(o);
          // Handler may return an array if object cloning was necessary
          if (Array.isArray(transformed)) {
            output.push(...transformed);
          } else {
            output.push(transformed);
          }
        } else {
          output.push(o);
        }
      });

      this.objectAccumulator.push(...output);

      // this.objectAccumulator.push(
      //   ...objs.map(obj => {
      //     return Object.freeze({
      //       type: obj.type,
      //       properties: obj.properties ? obj.properties : null,
      //       streams: obj.streams,
      //       _id: obj._id,
      //       hash: obj.hash,
      //     });
      //   }),
      // );
      // No freezing as we're modifying the props; mem footprint seems ok still
      // this.objectAccumulator.push( ...objs.map( obj => { return { type: obj.type, properties: obj.properties ? obj.properties : null, streams: obj.streams, _id: obj._id, hash: obj.hash } } ) )

      this.renderer.loadObjects({
        objs: objs,
        zoomExtents: this.requestBuckets.length === 1,
      });
      this.requestBuckets.splice(0, 1);

      this.bucketInProgress = false;
      this.bucketProcessor();
    },

    // pauses and any bucket loading and waits for it to stop,
    // then triggers the real remove stream
    async removeStream(streamId) {
      this.pauseRequesting = true;
      if (this.streamsToRemove.indexOf(streamId) === -1)
        this.streamsToRemove.push(streamId);
      this.removeInterval = setInterval(
        this.removeStreamInternal.bind(this),
        250,
      );
    },

    // removes any objects pertaining to one stream, even half loaded ones
    // works with a temporary state. Restarts the bucket processor
    // in case there were other buckets queued from other stream loads.
    removeStreamInternal() {
      if (this.bucketInProgress) return;
      clearInterval(this.removeInterval);
      // create a list of all objects, including ones that are possibly still "accumulating"
      let tempState = [...this.$store.state.objects, ...this.objectAccumulator];

      // clean future loading buckets, if any are present
      this.requestBuckets = this.requestBuckets.filter(
        b => this.streamsToRemove.indexOf(b.streamId) === -1,
      );

      let objIdsToUnload = [];
      this.streams.forEach(s => {
        this.streamsToRemove.indexOf(s.streamId) !== -1
          ? objIdsToUnload.push(...s.objects)
          : null;
      });

      this.streamsToRemove.forEach(stream =>
        this.$store.commit("UPDATE_OBJECTS_STREAMS", {
          objIds: objIdsToUnload,
          streamToRemove: stream,
        }),
      );

      // filter out objects that are in another stream.
      objIdsToUnload = objIdsToUnload.filter(id => {
        let x = tempState.find(o => o._id === id);
        if (x) return x.streams.length === 0;
        return false; // means the object was not loaded yet
      });

      this.streamsToRemove.forEach(sId => {
        this.$store.commit("REMOVE_LOADED_STREAMID", sId);
      });

      this.$store.commit("REMOVE_OBJECTS", objIdsToUnload);

      this.renderer.unloadObjects({ objIds: objIdsToUnload });
      this.pauseRequesting = false;
      this.streamsToRemove = [];
      // restart the bucket processor
      this.bucketProcessor();
    },

    setBucketsAndGo(buckets) {
      // this.showLoading = true
      this.requestBuckets = buckets;
      this.bucketProcessor();
    },
  },
  mounted() {
    // non reactive instance props
    this.objectAccumulator = [];
    this.renderer = new SpeckleRenderer({ domObject: this.$refs.render });
    this.renderer.animate();

    window.renderer = this.renderer; // let's pollute the global scope hell yeah!

    this.renderer.on(
      "select-objects",
      debounce(
        function(ids) {
          this.$store.commit("SET_SELECTED_OBJECTS", {
            objectIds: ids,
          });
        }.bind(this),
        250,
      ),
    );

    this.renderer.on(
      "select-add-objects",
      debounce(
        function(ids) {
          this.$store.commit("ADD_SELECTED_OBJECTS", {
            objectIds: ids,
          });
        }.bind(this),
        250,
      ),
    );

    this.renderer.on(
      "select-remove-objects",
      debounce(
        function(ids) {
          this.$store.commit("REMOVE_SELECTED_OBJECTS", {
            objectIds: ids,
          });
        }.bind(this),
        250,
      ),
    );

    this.renderer.on("analysis-legend", legend => {
      this.$store.commit("SET_LEGEND", legend);
    });

    this.renderer.on("clear-analysis-legend", () => {
      this.$store.commit("SET_LEGEND", null);
    });
  },
  deactivated() {
    this.$store.commit("FLUSH_STREAMS");
  },
};
</script>
<style scoped lang="scss">
.view-control-buttons {
  z-index: 10;
  position: fixed;
  left: 14px;
  top: 72px;
  /*top:50%;*/
  line-height: 35px;
  margin-top: auto;
  margin-bottom: auto;

  @media only screen and (max-width: 960px) {
    top: 50px;
    left: 6px;
  }
}

.global-loader {
  position: fixed !important;
  width: 100vw !important;
  top: 0;
  left: 0;
  height: 4px !important;
  z-index: 10;
}

.legend {
  position: fixed;
  bottom: 10px;
  left: 0;
  z-index: 200;
  padding: 10px;

  @media only screen and (max-width: 960px) {
    bottom: 70vh;
  }
}

.md-stepper-content .md-active {
  height: 500px;
  max-height: 500px;
  overflow: auto;
}

.viewer-main {
  max-height: 100vh;
}

.md-tab {
  padding: 0 !important;
}

body.noScroll {
  overflow: hidden;
}

.view-part-render {
  position: fixed;
  height: 100vh;
  width: 50vw;
  top: 0;
  left: 0vw;

  @media only screen and (max-width: 960px) {
    position: relative;
    height: 30vh;
    width: 100vw;
    background: #f3f3f3;
  }
}

.view-part-data {
  overflow: auto;
  user-select: none;
  background-color: white;
  z-index: 4;
  height: 100vh;
  overflow-y: scroll;

  @media only screen and (max-width: 960px) {
    height: 70vh;
  }
}
</style>
