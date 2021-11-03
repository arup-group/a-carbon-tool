<template>
  <md-content
    class="md-layout md-alignment-top-center"
    style="min-height: 100vh;margin-top:60px;"
  >
    <div class="md-layout-item md-size-50 md-small-size-90">
      <br />
      <br />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">
        For any questions and general chatter head over to the
        <a
          href="https://teams.microsoft.com/l/team/19%3a0471aa82c51e4620b97fcd46f43c73a7%40thread.skype/conversations?groupId=c2a09e19-5bb1-4092-b04f-375df351b316&tenantId=4ae48b41-0137-4599-8661-fc641fe77bea"
          target="_blank"
          >Arup Carbon Tool teams page</a
        >!
      </h1>
      <br />
      <h1 style="line-height: 50px" class="md-display-1">
        See our
        <a
          href="https://www.yammer.com/arup.com/#/threads/inGroup?type=in_group&feedId=14967250944&view=all"
          target="_blank"
          >Yammer page</a
        >
        for the latest updates and bulletins
      </h1>
      <br />
      <br />
      <h1 style="line-height: 50px" class="md-display-1">
        Arup Carbon Tool contributors
      </h1>
      <p>
        <img
          src="@/assets/contacts/nb.png"
          alt="Nathan"
          style="width:100px;height:100px;"
        />
        &nbsp;
        <img
          src="@/assets/contacts/tb.png"
          alt="Tom"
          style="width:100px;height:100px;"
        />
        &nbsp;
        <img
          src="@/assets/contacts/sg.png"
          alt="Stuart"
          style="width:100px;height:100px;"
        />
        &nbsp;
        <img
          src="@/assets/contacts/rm.png"
          alt="Rory"
          style="width:100px;height:100px;"
        />
        &nbsp;
        <img
          src="@/assets/contacts/sm.png"
          alt="Sean"
          style="width:100px;height:100px;"
        />
        &nbsp;
        <img
          src="@/assets/contacts/sp.png"
          alt="Stam"
          style="width:100px;height:100px;"
        />
        &nbsp;
        <img
          src="@/assets/contacts/ds.png"
          alt="Dimitrie"
          style="width:100px;height:100px;"
        />
        &nbsp;
      </p>

      <br />
      <p>
        ACT is intended to be a global platform. It relies heavily on the
        contributions of a small team, scattered near and far (relative to your
        location).
      </p>
      <p>
        If you would like to join this merry band, and have something relevant
        you'd like to be included, please get in touch via the teams page.
      </p>
      <p>Those who have contributed so far are:</p>
      <ul type="circle" style="line-height: 25px">
        <li>Nathan Breuring (Amsterdam, NL)</li>
        <li>Tom Bunn (London, UK)</li>
        <li>Stuart Goodman (Melbourne, Aus)</li>
        <li>Rory McCully (London, UK)</li>
        <li>Sean Merrifield (Amsterdam, NL)</li>
        <li>Stam Psarras (London, UK)</li>
        <li>Dimitrie Stefanescu (London, UK)</li>
      </ul>

      <br />

      <h1 style="line-height: 50px" class="md-display-1">
        Friends of Arup Carbon Tool
      </h1>
      <p>
        ACT wouldn't be possible without the support of our leaders in
        sustainability, engineering and digital. Those listed below deserve a
        mention for the backing they've provided.
      </p>
      <ul type="circle" style="line-height: 25px">
        <li>Richard Boyd</li>
        <li>Grace Campbell</li>
        <li>Damien Canning</li>
        <li>Orlando Gibbons</li>
        <li>Tom Mossop</li>
        <li>John Noel</li>
        <li>Heleni Pantelidou</li>
      </ul>
    </div>
  </md-content>
</template>
<script>
export default {
  name: "MethodologyView",
  components: {},
  computed: {},
  watch: {},
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
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="scss" />
