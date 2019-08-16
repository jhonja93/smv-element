<template>
  <div class="analysis-list">
    <div v-for="(value, name, index) in caso" :key="index">
      <template v-if="name.includes('analysis') && value.enabled">
        <div>
          <Analysis :type="name" :analysis="value" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Analysis from "~/components/Analysis.vue";

export default {
  name: "CasoId",
  components: { Analysis },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  async fetch({ store, params, error }) {
    if (
      !params.hasOwnProperty("caso") &&
      !store.state.casos.all.find(c => c._id === params.id)
    ) {
      try {
        await store.dispatch("casos/fetchCase", params.id);
      } catch (e) {
        error({ statusCode: 404, message: "Case not found" });
      }
    }
  },
  computed: {
    caso() {
      let caso = this.$store.state.casos.all.find(caso => caso._id === this.id);
      return Object.keys(caso)
        .filter(key => key.includes('analysis') && caso[key].enabled)
        .reduce((obj, key) => {
          obj[key] = caso[key];
          return obj;
        }, {});
    }
  }
};
</script>

<style>
.analysis-list {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>
