<template>
  <div class="container">
    <div class="grid">
      <caso v-for="c in casos" :key="c._id" :caso="c"/>
    </div>
  </div>
</template>

<script>
import Caso from '~/components/Caso.vue';
import { mapMutations } from 'vuex'

export default {
  async fetch ({store}) {
    await store.dispatch('casos/fetchAllCases') 
  },
  computed: {
    casos () {
      return this.$store.state.casos.all
    }
  },
  components: {
    Caso
  },
  data() {
    return {

    }
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
  margin-top: 30px;
}
</style>
