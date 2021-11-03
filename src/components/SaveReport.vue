<template>
  <div>
    <div class="md-layout xxx-md-alignment-center-left md-gutter" v-if="!reportSaved">
      <div class="md-layout-item md-size-100">
        <p>
          When saving a report, only valid objects will be included. This report
          will then be accessible via a direct link, and visible in the
          dashboard.
        </p>
      </div>
      <div class="md-layout-item md-size-70">
        <md-field>
          <label>Report Name</label>
          <md-input v-model="reportName"></md-input>
        </md-field>
        <md-field>
          <label>Job Number</label>
          <md-input v-model="jobNumber"></md-input>
        </md-field>

        <md-chips v-model="tags" md-placeholder="Set report tags"></md-chips>
      </div>
      <div
        class="md-layout-item md-size-30 md-caption"
      >Give this report a name you can remeber it by!</div>
      <div class="md-layout-item md-size-70" xxxstyle="height:300px">
        <md-field>
          <label>Report description (supports markdown)</label>
          <md-textarea v-model="reportDescription"></md-textarea>
        </md-field>
      </div>
      <div class="md-layout-item md-size-30 md-caption">
        You can write up in here any issues you would want flagged or stored
        alongside this report.
        <br />&nbsp;
        <br />
        <a href="javascript:void(0);">Preview?</a>
      </div>
      <div class="md-layout-item md-size-70 md-caption">
        <md-switch v-model="isPublic" class="md-primary">
          {{
          isPublic ? "Link sharing on" : "Link sharing off"
          }}
        </md-switch>
      </div>
      <div class="md-layout-item md-size-30 md-caption">
        If link sharing is on, anyone with the link will be able to view this
        report. A bit like google docs, eh?
      </div>
      <div class="md-layout-item md-size-100 md-caption">
        <br />
        <md-button
          class="md-primary md-raised"
          :disabled="isSaving"
          style="width:100%"
          @click.native="saveReport()"
        >SAVE</md-button>
      </div>
      <div class="md-layout-item md-size-100 text-center">
        <span class="md-caption">{{ loadingMessage }}</span>
        <br />
        <md-progress-bar md-mode="indeterminate" xxx-md-value="progress" v-show="isSaving"></md-progress-bar>
        <br />&nbsp;
      </div>
    </div>
    <div class="md-layout xxx-md-alignment-center-left md-gutter" v-else>
      <div class="md-layout-item md-size-100">
        <br />&nbsp;
        <h2 class="md-title">
          Report
          <i>{{ resultStream.name }}</i> saved.
        </h2>
        <br />
        <md-button
          :to="`/carbon/report/${resultStream.streamId}`"
          target="_blank"
          class="md-raised md-primary btn-no-margin"
        >View</md-button>&nbsp;
        <md-button
          @click.native="reportSaved = false"
          class="xxxmd-raised btn-no-margin"
        >new version</md-button>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  name: "ReportSaver",
  props: {
    squareMeters: Number,
  },
  computed: {
    report() {
      return this.$store.state.report;
    },
  },
  data() {
    return {
      reportName: null,
      jobNumber: null,
      reportDescription: null,
      tags: [],
      isSaving: false,
      isPublic: false,
      resultStream: null,
      progress: 0,
      reportSaved: false,
      statusCode: null,
      loadingMessage: "",
    };
  },
  methods: {
    cloneObject(obj) {
      // return {
      //   type: obj.type,
      //   properties: obj.properties,
      //   vertices: obj.vertices,
      //   faces: obj.faces,
      //   owner: obj.owner,
      //   parent: obj._id,
      // };

      return JSON.parse(JSON.stringify(obj));
    },
    createReportStream() {
      return {
        name: this.reportName || "Anonymous Carbon Report",
        jobNumber: this.jobNumber,
        description: this.reportDescription,
        private: !this.isPublic,
        tags: this.tags,
        ancestors: this.$store.state.loadedStreamIds,
        isCarbonReport: true,
        baseProperties: {
          units: "meters",
          isCarbonReport: true,
        },
        globalMeasures: {
          carbonReport: this.report,
        },
        squareMeters: this.squareMeters,
        type: "String",
      };
    },
    async saveReport() {
      this.isSaving = true;
      this.progress = 0;
      this.loadingMessage = "Saving...";
      this.tags.push("carbon-report");

      //Create new stream
      const stream = this.createReportStream();

      //Collect object IDs to include
      let objectIdsToInclude = [];

      for (let key in this.report.materialTable) {
        objectIdsToInclude.push(...this.report.materialTable[key].objectIds);
      }

      //Get objects from the ids
      let objects = this.$store.getters.getObjects(objectIdsToInclude);

      //Clear existing object ids so that new objects are creating when posting to the API
      const newObjects = objects.map(o => {
        //Cloning is needed to ensure API creates a new object
        let newObj = this.cloneObject(o);

        //Assign the original ID as the parent object
        newObj.parent = o._id;
        // API won't create new objects if there is an id present
        delete newObj._id;
        delete newObj.properties.id;
        delete newObj.hash;

        return newObj;
      });

      //Create new objects and Report stream via Speckle API
      this.loadingMessage = "Finalising...";
      const objectIds = await this.saveObjects(newObjects);

      //Attach new object ids to stream
      stream.objects = objectIds;
      this.resultStream = await this.$store.dispatch(
        "createStreamSimple",
        stream,
      );
    },
    async saveObjects(objects) {
      const chunks = this.chunk(objects, 10);
      const savedObjectIds = [];
      let i = 0;
      let res;

      try {
        for (let ch of chunks) {
          i++;
          this.loadingMessage = `${i * chunks[0].length} out of ${
            objects.length
          }`;

          // res = await Axios.post("/objects", ch);
          res = await this.$store.dispatch("createObjects", ch).catch(e => {
            console.error("createObjects: ", e);
          });
          if (!res) continue;
          savedObjectIds.push(...res);
        }
        this.reportSaved = true;
      } catch (e) {
        console.error(e);
        this.isSaving = false;
        this.reportSaved = false;
        if (!e.status) {
          // This happens on generic Network Errors see: https://github.com/axios/axios/issues/383
          // In our case these have only occured on 413's so far
          // Chrome and firefox don't seem to handle 413 well and neglect to send a response or proper error
          this.statusCode = 413;
        } else {
          this.statusCode = res.status;
        }

        this.loadingMessage = `Saving failed with statuscode: ${this.statusCode} - please contact support and provide this code`;
      }
      return savedObjectIds;
    },
  },
};
</script>
<style scoped lang="scss" />
