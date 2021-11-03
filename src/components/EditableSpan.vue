<template>
  <span>
    <span
      :title="hint"
      :contenteditable="!disabled"
      @blur="updateOnBlur"
      @keydown.enter="updateOnEnter"
      v-html="getContent()"
    ></span>
    <md-tooltip>{{ hint }}</md-tooltip>
  </span>
</template>
<script>
export default {
  name: "EditableSpan",
  props: {
    text: { type: String, default: "loading..." },
    disabled: { type: Boolean, default: false },
    hint: { type: String, default: "click and type to edit" },
    dataKey: { type: String, default: "" },
  },
  computed: {},
  data() {
    return {
      innerText: null,
    };
  },
  methods: {
    getContent() {
      if (this.innerText)
        return this.innerText.replace(/(\r\n|\n|\r)/gm, "") !== ""
          ? this.innerText
          : this.text;
      return this.text;
    },
    updateOnBlur(e) {
      let newContent = e.target.innerText.replace(/(\r\n|\n|\r)/gm, "");
      if (newContent === "") return (e.target.innerText = this.text);
      if (this.getContent() === newContent) {
        return;
      }
      this.innerText = newContent;
      this.$emit("update", { text: newContent, dataKey: this.dataKey });
    },
    updateOnEnter(e) {
      let newContent = e.target.innerText.replace(/(\r\n|\n|\r)/gm, "");
      if (newContent === "") return (e.target.innerText = this.text);
      if (this.getContent() === newContent) {
        e.target.blur();
        return;
      }
      e.target.blur();
      this.innerText = newContent;
    },
  },
};
</script>
<style scoped lang="scss">
$SpeckleBlue: #448aff;

span {
  border-bottom: 2px dashed rgba(55, 126, 247, 0.6);
  transition: all 0.3s ease;
}

span:hover {
  cursor: text;
  color: $SpeckleBlue;
  border-bottom: 2px solid $SpeckleBlue;
  cursor: pointer;
}
</style>
