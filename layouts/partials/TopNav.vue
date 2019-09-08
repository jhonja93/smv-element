<template>
  <div class="header">
    <nuxt-link class="navbar-brand" to="/">Social Media Viewer</nuxt-link>
    <el-dropdown>
      <span class="el-dropdown-link">
        Casos de estudio
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="caso in casos" :key="caso._id">
          <nuxt-link :to="{name: 'casos-id', params: {id: caso._id, caso}}">
            <span class="nav-link">{{ caso.name }}</span>
          </nuxt-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  computed: {
    casos() {
      return this.$store.state.casos.all;
    }
  },
  methods: {}
};
</script>

<style>
</style>

