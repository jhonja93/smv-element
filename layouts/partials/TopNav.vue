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
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-bottom: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
}

.header .navbar-brand {
  margin-bottom: 0;
  margin-top: 0;
  font-weight: normal;
  text-decoration: none;
  color: inherit;
  margin-right: auto;
}

.header nav {
  margin-right: 1rem;
  margin-bottom: 0;
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .header {
    flex-direction: row !important;
  }
}

@media (min-width: 768px) {
  .header {
    padding-right: 1.5rem !important;
  }
}

a {
  text-decoration: none;
}
</style>

