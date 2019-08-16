<template>
  <nuxt-link :to="{name: 'casos-id-analysis', params: {id: $route.params.id, analysis: type}}">
    <div class="caso">{{ name }}</div>
  </nuxt-link>
</template>

<script>
export default {
  name: "Analysis",
  props: {
    type: { type: String, required: true },
    analysis: { type: Object, required: true }
  },
  computed: {
    name() {
      let nombre = "";
      switch (this.type) {
        case "temporal_analysis":
          nombre = "Temporal analysis";
          break;
        case "geo_analysis":
          nombre = "Geographical analysis";
          break;
        case "text_analysis":
          nombre = "Text analysis";
          break;
        case "graph_analysis":
          nombre = "Network analysis";
          break;
      }
      return nombre;
    }
  }
};
</script>

<style>
.caso {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 200px;
  height: 150px;
  margin: 0 auto;
  cursor: pointer;
  background-color: #dcdcdc;
  color: black;
  border-radius: 5px;
  transition: all 0.1s ease-in;
}
.caso:hover {
  box-shadow: 2px 2px #424242;
  font-size: 16px;
}
</style>
