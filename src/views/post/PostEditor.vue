<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
  <v-md-preview :text="text"></v-md-preview>
</template>

<script>

export default {
  name: "PostEditor",
  data() {
    return {
      text: '',
    };
  },
  watch: {
    text() {
      console.log(this.text);
    }
  }
}
</script>

<style scoped>

</style>
