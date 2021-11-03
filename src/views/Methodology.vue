<template>
  <md-content
    class="md-layout md-alignment-top-center"
    style="min-height: 100vh;margin-top:60px;"
  >
    <div class="md-layout-item md-size-60 md-small-size-90 md-medium-size-70">
      <br />
      <br />
      <br />
      <h1>Welcome!</h1>
      <p>
        The Arup Carbon Tool (ACT) was developed as an
        <a
          target="_blank"
          href="http://invest.intranet.arup.com/?layout=projsheet&projid=20383&tab=projsheetdetailstabpage0"
          >Invest in Arup project</a
        >. Its purpose is to link our digital design models (BIM) to the Whole
        Life Carbon calculations (as defined by the RICS, 2017 <sup>1</sup>,
        statement, see Figure 1), so that we can rapidly quantify and reduce the
        carbon dioxide equivalent (CO2e) emissions associated with our designs.
      </p>
      <p style="text-align: center">
        <img src="@/assets/methodology/goals.jpg" />
      </p>
      <p>
        In doing this, we are acting to achieve the
        <a
          href="https://sustainabledevelopment.un.org/?menu=1300"
          target="_blank"
          >United Nations Global Sustainable Development Goals</a
        >: 9, 12, 13, and 15. The tool enables the user to interactively view
        carbon hotspots in their design in 3D. The visual, interactive carbon
        analysis summary can be shared simply with colleagues and clients via a
        link, removing the need for printing reports.
      </p>
      <h2>Scope</h2>
      <p>
        The tool currently assesses the Product (A1 – A3) and Construction
        Process (A4 – A5) stages of Whole Life Carbon (highlighted in Figure 1)
        based on a digital design model.
      </p>
    </div>
    <div class="md-layout-item md-size-60 md-small-size-90 md-medium-size-70">
      <img src="@/assets/methodology/fig1.png" />
    </div>
    <div class="md-layout-item md-size-60 md-small-size-90 md-medium-size-70">
      <p class="md-caption">
        Figure 1: Reproduction of Figure 2 from the RICS, 2017 statement
        (originally based on Figure 6 from BS EN 15978:2011
        <sup>2</sup>).
      </p>
      <h2>Reference Data</h2>
      <p>
        <b>A1-3 carbon factors:</b> The Inventory of Carbon & Energy (ICE)
        Version 2.0 dataset <sup>3</sup>. These are provided in kgCO2e per kg of
        material (kgCO2e/kg). Some materials in the ICE dataset do not have
        values for kgCO2e/kg, in these instances kgCO2/kg is assumed to be
        equivalent.
        <br />
        <br />
        <b>A4 carbon factors:</b> The Greenhouse gas reporting: conversion
        factors 2018 <sup>4</sup>. <br />Transport by road = 0.0001136kgCO2e /
        kg / km (All HGVs – average laden) <br />Transport by rail =
        0.00003351kgCO2e / kg / km (Rail – freight train) <br />Transport by sea
        = 0.000016143kgCO2e / kg / km (Cargo ship – container ship – average)
        <br />
        <br />
        <strong>A5 carbon factors for plant emissions:</strong> 1400kgCO2e/£100k
        of project value (RICS, 20171).
        <br />
        <br />
        <strong>A5 waste factors:</strong> Based on WRAP Net Waste Tool
        reference guide <sup>5</sup>.
        <br />
      </p>
      <h2>Carbon Calculations</h2>
      <p>
        Carbon calculations are performed per element (CF denotes the Carbon
        Factor).
      </p>
      <img src="@/assets/methodology/formula1.png" />
      <p>Where mode = transport modes, road, rail, and sea.</p>
      <img src="@/assets/methodology/formula2.png" />
      <p>Where waste volume is:</p>
      <img src="@/assets/methodology/formula3.png" />
      <p>
        Waste volume is computed this way because the WRAP waste factors are
        based on % of total material delivered to site that is subsequently
        taken offsite. Therefore the material ordered needs to include for %
        wasted as a total value
      </p>
      <p>
        For example, if I needed 1000kg of concrete and knew 4% would be wasted,
        ordering 1040kg would not cover me (1040 - 4% = 998.4kg). I actually
        need to order 1041.7kg. If you're still not convinced, you are more than
        welcome to open a dialogue on our
        <a
          href="https://teams.microsoft.com/l/team/19%3a0471aa82c51e4620b97fcd46f43c73a7%40thread.skype/conversations?groupId=c2a09e19-5bb1-4092-b04f-375df351b316&tenantId=4ae48b41-0137-4599-8661-fc641fe77bea"
          target="_blank"
          >Arup Carbon Tool teams page</a
        >. Prepare to be robustly corrected.
      </p>
      <p>
        It is assumed that all waste from site will be disposed locally
        (transported 50km).
      </p>
      <p>
        The A5 material waste calculation follows the guidance by RICS that the
        generated site waste should include A1-A3 and A4 life cycle stages and
        disposal off site. Reducing wastage on site therefore only impacts the
        A5 stage carbon emission estimates.
      </p>
      <h2>Limitations</h2>
      <ul>
        <li>
          Only elements that are in the digital design (BIM) model are assessed
          for carbon emissions.
        </li>
        <li>
          Only elements with a volume are considered (i.e. paint, carpet, etc.
          are not considered at this stage).
        </li>
        <li>
          Once a carbon report is saved, it is fixed. Changes to the BIM model
          will not result in an updated report.
        </li>
        <li>The easiest way to upload a model is through Rhino.</li>
        <li>
          Volume calculations done online might contain errors and do not ignore
          non-solid geometry.
        </li>
        <li>
          The ICE v2.0 carbon dataset is based on UK data only and is the only
          dataset currently supported by the tool.
        </li>
        <li>Transport factors are based on UK data and analysis.</li>
      </ul>
      See our <router-link to="/help">help section</router-link>for more
      information on how to create a report and future features we have lined up
      <!--<h2>Future development</h2>
      <p>
        <ul>
          <li>Additional stages of the Whole Life Carbon Assessment to be included in the calculation scope.</li>
          <li>Align material names and assumptions with the Arup BIM/Revit Global Template.</li>
          <li>Expand the material carbon factor dataset.</li>
          <li>Add a transport carbon factor dataset instead of hard coded values.</li>
          <li>Add more detailed functions to compute A5 construction emissions.</li>
          <li>Automatically adjust A5 plant emissions factor for inflation, etc.</li>
          <li>Allow custom waste factors.</li>
          <li>Allow custom waste disposal travel distances.</li>
          <li>Add carbon calculation capability for materials that are defined as an area.</li>
          <li>Carbon assessment reports automatically update as the BIM model is updated.</li>
          <li>Report carbon estimation over time as BIM model changes with design iterations.</li>
          <li>Roll out an Arup speckle server.</li>
        </ul>
      </p>-->
      <h2>References</h2>
      <p>
        [1] Royal Institution of Chartered Surveyors (RICS), 2017, Whole life
        carbon assessment for the built environment, 1st edition
      </p>
      <p>
        [2] The British Standards Institution, 2012, Sustainability of
        construction works – Assessment of environmental performance of
        buildings – Calculation method
      </p>
      <p>
        [3] University of Bath, 2011, Inventory of Carbon & Energy (ICE) Version
        2.0
      </p>
      <p>
        [4] The Greenhouse gas reporting: conversion factors 2018 (
        <a
          href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2018"
          target="_blank"
          >link</a
        >)
      </p>
      <p>
        [5] WRAP, 2018, Net Waste Tool, Guide to Reference Data, Version 1.0
      </p>
    </div>
  </md-content>
</template>
<script>
export default {
  name: "MethodologyView",
  data() {
    return {
      server: null,
      email: null,
      password: null,
      errorMessage: null,
      showError: false,
      serverOk: false,
    };
  },
};
</script>
<style scoped lang="scss"></style>
