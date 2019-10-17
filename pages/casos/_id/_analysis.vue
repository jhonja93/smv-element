<template>
  <component v-if="analysis" :data="analysis" v-bind:is="component"></component>
</template> 

<script>
import TextAnalysis from "~/components/analysis/TextAnalysis";
import GeoAnalysis from "~/components/analysis/GeoAnalysis";
import TemporalAnalysis from "~/components/analysis/TemporalAnalysis";
import NetworkAnalysis from "~/components/analysis/NetworkAnalysis";

export default {
  name: "AnalysisId",
  components: {
    TextAnalysis,
    GeoAnalysis,
    TemporalAnalysis,
    NetworkAnalysis
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  async asyncData({ params, error, store }) {
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

    let component = null;

    switch (params.analysis) {
      case "temporal_analysis":
        component = "temporal-analysis";
        break;
      case "network_analysis":
        component = "network-analysis";
        break;
      case "geo_analysis":
        component = "geo-analysis";
        break;
      case "text_analysis":
        component = "text-analysis";
        break;
      default:
        break;
    }
    return {
      component: component
    };
  },
  computed: {
    analysis() {
      let caso = this.$store.state.casos.all.find(caso => {
        return (
          caso._id === this.id &&
          caso[this.$route.params.analysis] &&
          caso[this.$route.params.analysis].enabled
        );
      });

      if (caso) {
        return caso[this.$route.params.analysis];
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
