<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Roboto R','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    min-width: 1280px;
    height: 100%;
  }

  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    background-color: transparent!important;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ed303b!important;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #ed303b;
  }

  /*.el-input.is-active .el-input__inner, .el-input__inner {*/
  /*  background-color: transparent;*/
  /*  border-color: #ed303b;*/
  /*}*/

  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #ed303b;
  }

  .el-input__inner:hover {
    border-color: #ed303b!important;
  }

  .el-loading-spinner .path {
    stroke: #ed303b;
    stroke-width: 3;
  }

  .el-table {
    color: #333;
  }

  .el-table thead {
    color: #333;
  }

  .el-table__body tr:hover>td{
    background-color: #faf7f8!important;
  }

  .el-table__body tr.current-row>td{
    background-color: #faf7f8!important;
  }

  .el-table__empty-text {
    line-height: 100px!important;
  }

</style>
