<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  #app {
    font-family: 'Roboto R','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1e2022;
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
    color: #ed303b!important;
  }

  /*.el-input.is-active .el-input__inner, .el-input__inner {*/
  /*  background-color: transparent;*/
  /*  border-color: #ed303b;*/
  /*}*/

  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #ed303b!important;
  }

  .el-input__inner:hover {
    border-color: #ed303b!important;
  }

  .el-loading-spinner .path {
    stroke: #ed303b!important;
    stroke-width: 3;
  }

  .el-table {
    color: #333!important;
  }

  .el-table thead {
    color: #333!important;
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

  .el-table td {
    padding: 10px 0!important;
  }

  .el-input__inner {
    height: 32px;
    line-height: 32px;
  }

  .text-success {
    color: #67C23A
  }

  .text-danger {
    color: #F56C6C
  }

  .text-warning {
    color: #E6A23C
  }

  .el-button {
    border: none!important;
    padding: 2px!important;
  }

  .el-button:focus {
    color: #ed303b!important;
    background-color: #ffffff!important;
  }

  .el-button:hover {
    color: #ed303b!important;
    background-color: #ffffff!important;
  }

  /* more */
  .el-form-item{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .el-form-item__label{
    color: #6c757e;
  }

  .md-input .el-input__inner, .md-select .el-input--suffix .el-input__inner {
    width: 685px !important;
    height: 42px;
    padding: 10px 12px !important;
  }

  .el-form-item:last-child{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .el-form-item__content:last-child .el-button{
    height: 42px;
    padding: 12px 16px !important;
  }

/* verify */

  .el-collapse-item__header{
    margin: 0 14px;
    font-size: 14px;
  }

  .el-collapse-item__content{
    padding-bottom: 10px;
    font-size: 14px;
  }

  .ad-input .el-input__inner{
    height: 32px;
  }


  .op-selest .el-input.is-disabled .el-input__inner{
    width: 223px !important;
  }
  
  .compiler-input .el-input--suffix .el-input__inner{
    width: 470px;
  }

  .el-input__suffix{
    top:4px;
  }

  .el-input__suffix .el-input__suffix-inner{
    display: block;
    margin-top: -6px;
  }
  .el-collapse-item__wrap{
    border-top: 1px solid rgba(0,0,0,.125);
    padding: 15px 0 0 15px;
  }

 .json .compiler-input .el-input--suffix .el-input__inner{
    width: 600px;
  }
  
  .el-collapse-item__header{
    border-bottom: none;
  }

</style>
