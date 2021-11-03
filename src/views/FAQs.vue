<template>
    <md-content
    class="md-layout md-alignment-top-center"
    style="min-height: 100vh;margin-top:60px;">
        <div class="md-layout-item md-size-60 md-small-size-90 md-medium-size-70">
            <br>
            <br>
            <br>
            <h1>Frequently asked questions</h1>
            <p>
                Below are answers to questions we get asked on a regular basis. Scroll down to see if your queries
                relating to the Arup Carbon Tool are answered. If you still have questions feel free to get in touch
                through our <a href="./contacts">contacts</a> page.
            </p>
            <br>
            <h2>What is the purpose of Arup Carbon?</h2>
            <p>
              Arup Carbon is a tool for estimating the embodied carbon equivalent content of projects from their Building 
              Information Models (BIMs). It has been designed to provide quick & efficient feedback to designers & 
              engineers to aid in both the assessment of environmental impact, and the reduction of embodied carbon 
              through iteration.
            </p>
            <p>
              Our focus is on providing users the tools to consider embodied carbon as part of multi-parameter design. The 
              tool can not, as yet, be used for full life-cycle assessments for compliance with BREEAM or other methodologies.
            </p>
            <br>
            <br>
            <h2>Where can I find Arup Carbon?</h2>
            <p>
              Arup Carbon is hosted at <a href="https://carbon.arup.com" target="_blank">https://carbon.arup.com</a>. 
              Within Arup details can be found on 
              <a href="https://arup.sharepoint.com/sites/tools-register/SitePages/ToolsRegister.aspx#/tool-details/987" target="_blank">the tools register</a>. 
              It's probably safe to say that you found 1 or both of these as you're here!
            </p>
            <br>
            <br>
            <h2>Is Arup Carbon just for Buildings?</h2>
            <p>
              Absolutely not. The tool has been designed to take any information from BIMs that can be exported as part 
              of a Speckle stream. So long as the environment you are working in can communicate with Speckle, then you 
              can perform an assessment in Arup Carbon.
            </p>
            <br>
            <br>
            <h2>What is Speckle?</h2>
            <p>
              Speckle is an open-source tool that is able to live stream data between platforms and different users. 
              It has been used in the past to share models between separate environments with all able to edit collaboratively. 
              It achieves this by storing models in a central database.
            </p>
            <p>
              We leverage Speckle in Arup Carbon as it enables a consistent means of pulling data from BIMs regardless of the 
              software used to create them. This is the primary reason that we haven’t been developed as a Revit or Rhino plug-in, 
              but instead as a stand-alone tool.
            </p>
            <br>
            <br>
            <h2>Can I update reports once completed?</h2>
            <p>
              Currently, the tool does not allow for completed reports to be edited. This is something we hope to implement in the 
              future. It hasn’t been a priority up until now due to the speed at which a report can be generated. For now, new 
              reports will need to be created for new iterations in the design.
            </p>
            <p>
              To address this we intend to build 2 features into the tool. Firstly, the ability to edit existing reports to change 
              assigned properties, modes of transport, and incoming speckle streams. Secondly, to allow new versions of existing 
              reports to be created with auto-population of previously assigned properties to BIM objects.
            </p>
            <br>
            <br>
            <h2>Can Arup Carbon reports be exported to other tools?</h2>
            <p>
              Yes! When a report is saved 2 speckle streams are created – one showing the overall results and another providing a 
              breakdown of embodied carbon for each object brought into the tool. These are in a JSON format and can be pulled into 
              tools like Excel and Power BI for interrogation or further analysis. To access these, use the ‘API’ links in the deader 
              of any completed report.
            </p>
            <br>
            <br>
            <h2>Will reports be used to create insights and metrics?</h2>
            <p>
              Currently no. In the future we’d like Arup Carbon to contribute to both internal Arup and industry-wide benchmarks – 
              important for understanding our direction of travel and opportunities to improve further. Before we do this there 
              are several steps we need to take in gathering and understanding important meta-data for each project submitted. These 
              include:
            </p>
            <ul>
              <li>Gross internal area or other important comparator metrics</li>
              <li>Project design stage or completeness</li>
              <li>Project location</li>
              <li>Project sector and type</li>
              <li>System / disciplines assessed</li>
            </ul>
            <p>
              We’d like to be able to pick these up automatically (without user input) to keep the tool as easy and intuitive for 
              the user as possible.
            </p>
            <br>
            <br>
            <h2>Are there any plans to introduce cost as something assessed?</h2>
            <p>
              Not within Arup Carbon. Something we pride ourselves on is how simple the tool is to use. Introducing new analysis 
              within the same environment adds complexity, and may not be something that every user wants as an output.
            </p>
            <p>
              We are exploring ideas to build related tools for metrics like cost, which could communicate with Arup Carbon in the 
              future. This would add functionality without sacrificing user experience.
            </p>
            <br>
            <br>
            <h2>Can Arup Carbon assess whole life carbon?</h2>
            <p>
              Our current scope is to deliver an assessment of the embodied carbon associated with material extraction, creation, 
              deliver and construction (A1-5), but we not the importance of understanding the whole-life impact of construction 
              projects. Arup Carbon is likely to stay within it’s current scope. In the future we’d like to look at the other aspects 
              in turn including building operation and end of life.
            </p>
            <br>
            <br>
            <h2>How is Arup Carbon funded?</h2>
            <p>
              Arup Carbon started life as an Invest in Arup (IiA) application. Since then we’ve been adding new features through a 
              combination of specific IiA applications, skills network funding and funding set aside for the development of Speckle 
              connectors. Although productive this isn’t the most sustainable means of securing funding long-term and we are 
              currently assessing the best means of growing both Arup Carbon and the associated tools.
            </p>
        </div>
    </md-content>
</template>

<script>
export default {
  name: "FAQsView",
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