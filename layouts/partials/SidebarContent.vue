<template>
  <el-menu class="main-navigation-menu">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"></i>Casos
      </template>
      <el-menu-item v-for="caso in casos" :key="caso._id" :index="caso._id">
        <nuxt-link
          class="link"
          :to="{name: 'casos-id', params: {id: caso._id, caso}}"
        >{{ caso.name }}</nuxt-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SidebarContent",
  computed: {
    casos() {
      return this.$store.state.casos.all;
    }
  }
};
</script>

<style>
.el-menu {
  background-color: transparent;
}
.main-navigation-menu {
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
}
.menu-group .link {
  text-decoration: none;
}
.main-navigation-menu .el-menu-item:not(.is-active),
.main-navigation-menu .el-submenu__title {
  color: #4a596a;
}
.main-navigation-menu:not(.el-menu--collapse):not(.el-menu--horizontal)
  .el-menu-item,
.main-navigation-menu:not(.el-menu--collapse):not(.el-menu--horizontal)
  .el-submenu {
  position: relative;
}
.main-navigation-menu:not(.el-menu--collapse) .el-menu-item,
.main-navigation-menu:not(.el-menu--collapse) .el-submenu__title {
  height: 40px;
  line-height: 40px;
  background-color: transparent !important;
}
.main-navigation-menu:not(.el-menu--collapse) .el-submenu.is-opened:after {
  content: "";
  display: block;
  width: 2px;
  position: absolute;
  top: 40px;
  bottom: 10px;
  left: 31px;
  background: #4a596a;
  z-index: 1;
}
</style>