<template>
  <md-content
    class="md-layout md-alignment-top-center"
    style="min-height: 100vh;margin-top:60px;"
  >
    <div class="md-layout-item md-size-33 md-small-size-90 md-medium-size-70">
      <br id="top_of_page" />
      <br />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">
        Help
        <a href="https://www.youtube.com/watch?v=2Q_ZzBGPdqE" target="_blank"
          >!</a
        >
      </h1>
      <p>
        This is a quick guide to get you started with the Arup Carbon Tool. If
        you've scrolled through and are still in trouble,
        <router-link to="/contact">get in touch!</router-link>
      </p>
      <p>
        If it's
        <a href="https://speckle.systems/" target="_blank">Speckle</a> that's
        causing you grief, see the pages below for useful guidance...
      </p>
      <ul type="circle" style="line-height: 25px">
        <li>
          <a
            href="https://speckle.systems/docs/clients/revit/basics"
            target="_blank"
            >Revit</a
          >
        </li>
        <li>
          <a
            href="https://speckle.systems/docs/clients/rhino/basics"
            target="_blank"
            >Rhino</a
          >
        </li>
        <li>
          <a
            href="https://speckle.systems/docs/clients/dynamo/basics"
            target="_blank"
            >Dynamo</a
          >
        </li>
        <li>
          <a
            href="https://speckle.systems/docs/clients/grasshopper/basics"
            target="_blank"
            >Grasshopper</a
          >
        </li>
      </ul>
      <p>Otherwise continue on below...</p>
      <br />
      <h1 style="line-height: 50px" class="md-display-1">Contents</h1>
      <h3>
        <a href="#quick_version">The quick version</a>
      </h3>
      <h3>
        <a href="#long_version">The long version</a>
      </h3>
      <h3>
        <a href="#common_problems">Common problems & challenges</a>
      </h3>
      <h3>
        <a href="#future_features">Future features</a>
      </h3>
      <br id="quick_version" />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">The quick version</h1>
      <p>Speckle to ACT report at normal speed...</p>
      <video src="@/assets/help/ACT-latest.mp4" height="240" controls></video>
      <br />
      <br />
      <h2>Steps taken</h2>
      <ol type="circle" style="line-height: 25px">
        <li>Generate a stream in your chosen platform (not shown)</li>
        <li>Import the stream into ACT</li>
        <li>Assign materials to objects</li>
        <li>Select material transport</li>
        <li>Review</li>
        <li>Save and share!</li>
      </ol>
      <br id="long_version" />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">The long version</h1>
      <h2>1 Data input</h2>
      <p>
        First thing you will be asked for when starting out a new report is to
        load a model on which to run the calculations on.
      </p>
      <img src="@/assets/help/input.png" class="md-elevation-5" />
      <p>
        This tool works with pretty much any speckle stream. You'll need to
        <a href="https://speckle.works/log/speckle-guide/" target="_blank"
          >install the speckle plugins</a
        >
        in order to be able to proceed.
      </p>
      <br />
      <h3>Too much data? Mix and match!</h3>
      <p>
        Speckle has an artificial limit in place for maximum stream size. If you
        get any annoying messages that things are too "big", simply create
        several streams separated by any logical concern; for example, a stream
        containing the core, a stream containing the steel structure, a stream
        containing the surroundings, etc. and then...
      </p>
      <br />
      <h3>...combine them!</h3>
      <img src="@/assets/help/mix.png" class="md-elevation-5" />
      <p>When you generate a report, you can load as many as you want!</p>
      <br />
      <h2>2 Setting materials</h2>
      <p>
        The second step in the report generation part is setting up materials.
        You can easily assign a group of objects a given material, with its
        associated properties related to carbon, by selecting first a way to
        group them (by layer name works well usually) and thereafter clicking
        the text box and selecting the desired material.
      </p>
      <img src="@/assets/help/setmat.png" class="md-elevation-5" />
      <p>
        You can also assign a material to an individual object by selecting it,
        and setting it thereafter in the last object group ("selected objects").
        You can select multiple objects by holding down left shift and dragging
        a selection box in the 3d view.
      </p>
      <br />
      <h2>3 Taking transportation costs into account</h2>
      <p>
        The next step allows you to set transportation costs. You can either
        select from a predefined list, or, if needed, a custom scenario.
      </p>
      <img src="@/assets/help/settransport.png" class="md-elevation-5" />
      <p>
        By selecting a custom scenario, you will be able to type directly in the
        transport mode boxes. Units are in km, and don't forget to click save
        after you've edited your custom transport scenario!
      </p>
      <br />
      <h2>4 Setting or checking volume</h2>
      <p>
        In this step, you can check the volumes of the objects. It's an
        essential step! If the objects have a previous property defined on them
        called "volume", it will be used. Otherwise, you can calculate the
        volumes there, but mind you you will need only closed meshes loaded,
        otherwise things might get wonky.
      </p>
      <img src="@/assets/help/volume.png" class="md-elevation-5" />
      <br />
      <br />
      <h2>5 Review</h2>
      <p>
        This step will show you at a glance what the status of the model is. We
        check if all the units of the loaded models match and are metric,
        whether objects have a transport scenario associated and a material, and
        whether there's any problems with the volume.
      </p>
      <img src="@/assets/help/checks.png" class="md-elevation-5" />
      <p>
        Bear in mind, these checks are not mandatory and will not prevent you
        from saving the report: objects that do not have the needed information
        will just be ignored. This is not necessarily a problem!
      </p>
      <br />
      <h2>6 Saving & sharing</h2>
      <p>
        Okay, you've reached the last step - if you've managed so far, you
        should see a report summary. You can still edit it if unhappy with the
        results - go back to any of the previous steps and assign different
        materials, change transport scenarios, etc.
      </p>
      <img src="@/assets/help/save.png" class="md-elevation-5" />
      <p>
        Once you are happy, you can save the report. This will allow you to
        share it with others and it will store it permanently against your
        account on the speckle server you are using. You can still edit
        permissions, tags and description, but otherwise it's fixed.
      </p>
      <br />
      <h2>7 Your dashboard</h2>
      <p>
        Here you'll find the reports you generated and the ones shared with you
        by others. You can sort them by tags to quickly compare versions, or
        have an overview of a specific typology.
      </p>
      <img src="@/assets/help/dashboard.png" class="md-elevation-5" />
      <br id="common_problems" />
      <br />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">
        Common problems & challenges
      </h1>
      <h2>Adding non-modelled information</h2>
      <p>
        The Arup Carbon Tool works best when the Building Information Models
        used accurately reflect what's intended to be built. It's noted tht
        frequently we do not model every single building element (and usually
        for good reason).
      </p>
      <p>Examples include:</p>
      <ul type="circle" style="line-height: 25px">
        <li>Structural reinforcement</li>
        <li>Composite decks</li>
        <li>Floor finishes</li>
        <li>Fixtures & fittings</li>
      </ul>
      <br />
      <p>
        To cover these cases, we've added a handy 'Custom Quantities' importer
        to the 'Quantities' section of the tool. Simply calculate the volume of
        unmodelled information and add as line items
      </p>
      <p>
        The quantities will appear in the report produced but will not be
        reflected in the 3D viewer.
      </p>
      <p>
        Make sure to stick to the units (m
        <sup>3</sup> in most cases) used in the original Speckle stream. The
        material will default to Steel: Bar & rod (as the most common case).
      </p>
      <img src="@/assets/help/CustomQuants.png" class="md-elevation-5" />
      <br />
      <br />
      <br />
      <h2>Importing data into PowerBI and/or Excel</h2>
      <p>The following guidance applies to both PowerBI as well as Excel.</p>
      <p>
        You can access the carbon report summary as well as the per-object
        information (effectively, the schedule) from the speckle api. You can
        thereafter create your own visualisations or do further analytics. To
        load the data, follow these steps:
      </p>
      <p>
        1 Click on the "API Report Objects" in the report, highlighted in yellow
        below:
      </p>
      <img src="@/assets/help/power1.png" class="md-elevation-5" />
      <p>2 Copy the web address, highlighted in yellow below:</p>
      <img src="@/assets/help/power2.png" class="md-elevation-5" />
      <p>
        Please note, if your the report's link sharing is turned off, this will
        not work.
      </p>
      <p>3 Load PowerBI, go to “get data”, highlighted in yellow below.</p>
      <img src="@/assets/help/power3.png" class="md-elevation-5" />
      <p>
        4 Click “other”, then “web”, then “connect”, all highlighted in yellow
        below.
      </p>
      <img src="@/assets/help/power4.png" class="md-elevation-5" />
      <p>
        5 Copy the web address from Step (2) into the URL box, click OK, all
        highlighted in yellow. If this is your first time, you will be asked to
        enter your Speckle account details, do this under the “Basic” option.
      </p>
      <p class="md-caption">
        If your stream's link sharing is off, select advanced, and add your
        speckle API token.
      </p>
      <img src="@/assets/help/power5.png" class="md-elevation-5" />
      <p>
        The query editor will now load with the data from Arup Carbon, ready to
        use in PowerBI. Congrats, you're ready to go!
      </p>
      <br id="future_features" />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">Future features</h1>
      <p>
        There are lots of fixes and features we want to introduce into the tool
        in the future. Here's a list of what's currently on our backlog. Get in
        touch if you think there's more we should be doing. Be warned, you will
        become part of making it a reality!
      </p>
      <ul type="circle" style="line-height: 25px">
        <li>Allowing users to input custom carbon factors - COMING SOON</li>
        <li>Auto-matching of materials to Revit object names - COMING SOON</li>
        <li>Report output against Arup insights / benchmarks</li>
        <li>Dashboard for comparing multiple reports</li>
        <li>
          Saving progress & auto-filling materials / travel methods from
          previous reports
        </li>
      </ul>
      <br />
      <br />
      <h2>
        Still having questions?
        <router-link to="/contact">Get in touch!</router-link>
        <br />
        <br />
        <br />
        <a href="#top_of_page">Return to top</a>
      </h2>
      <br />
      <br />
    </div>
  </md-content>
</template>
<script>
export default {
  name: "LoginView",
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss" />
