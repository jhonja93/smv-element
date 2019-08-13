<template>
  <div class="container">
    <text-analysis
      v-if="caso && caso['text_analysis'] && caso.text_analysis.enabled"
      :data="caso.text_analysis"
    ></text-analysis>
    <geo-analysis
      v-if="caso && caso['geo_analysis'] && caso.geo_analysis.enabled"
      :data="caso.geo_analysis"
    ></geo-analysis>
    <temporal-analysis
      v-if="caso && caso['temporal_analysis'] && caso.temporal_analysis.enabled"
      :data="caso.temporal_analysis"
    ></temporal-analysis>
    <graph-analysis
      v-if="caso && caso['graph_analysis'] && caso.graph_analysis.enabled"
      :caso="caso.graph_analysis"
    ></graph-analysis>
  </div>
</template> 

<script>
import TextAnalysis from '~/components/analysis/TextAnalysis'
import GeoAnalysis from '~/components/analysis/GeoAnalysis'
import TemporalAnalysis from '~/components/analysis/TemporalAnalysis'
import GraphAnalysis from '~/components/analysis/GraphAnalysis'

export default {
  components: {
    TextAnalysis,
    GeoAnalysis,
    TemporalAnalysis,
    GraphAnalysis
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  async fetch({store, params}){
    if (!params.hasOwnProperty('caso')) {
      await store.dispatch('casos/fetchCase', params.id)
    }
  },
  computed: {
    caso () {
      return this.$store.state.casos.all.find(caso => caso._id === this.id)
    }
  }
}
</script>

<style>
</style>
