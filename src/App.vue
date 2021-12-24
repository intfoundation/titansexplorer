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
    color: #ed303b;
    background-color: #ffffff!important;
  }

  .el-button:hover {
    color: #ed303b;
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
    /* margin: 0 14px; */
    padding: 0 14px;
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
    border-bottom: none !important;
  }

  .el-select-dropdown__item{
    font-size: 13px;
  }

  .s-input .el-input .el-input__inner{
    font-size: 13px;
  }
/* 
  .el-loading-spinner .path{
    background-color:#132a47 !important;
  } */



  :root[data-theme=dark]{
    --current-background-color:var(--dark-background-color);
    --current-home-background-color:var(--dark-home-background-color);
    --current-box-shadow:var(--dark-box-shadow);
    --current-border:var(--dark-border);
    --current-item-background-color:var(--dark-item-background-color);
    --current-span-color:var(--dark-span-color);
    --current-hover-background-color:var(--dark-hover-background-color);
    --current-hb-box-shadow:var(--dark-hb-box-shadow);
    --current-hl-span-color:var(--dark-hl-span-color);
    --current-title-color:var(--dark-title-color);
    --current-nav-span-color:var(--dark-nav-span-color);
    --current-nav-border:var(--dark-nav-border);
    --current-td-color:var(--dark-td-color);
    --current-textarea:var(--dark-textarea);
    --current-table-hover:var(--dark-table-hover);
    --current-group-border:var(--dark-group-border);
    --current-table-border:var(--dark-table-border);
    --current-verify-color:var(--dark-verify-color);
    --current-hr-color:var(--dark-hr-color);
    --current-verify-span-color:var(--dark-verify-span-color);
    --current-spans-color:var(--dark-spans-color);
    --current-table-background-color:var(--dark-table-background-color);
    --current-code-color:var(--dark-code-color);
    --current-exact-color:var(--dark-exact-color);
    --current-read-color:var(--dark-read-color);
    --current-read-border:var(--dark-read-border);
    --current-input-color:var(--dark-input-color);
    --current-input-border:var(--dark-input-border);
    --current-read-button:var(--dark-read-button);
    --current-button-color:var(--dark-button-color);
    --current-button-border-color:var(--dark-button-border-color);
    --current-top-button:var(--dark-top-button);
    --current-top-color: var(--dark-top-color);
    --current-top-border:var(--dark-top-border);
    --current-write-color:var(--dark-write-color);
    --current-loading:var(--dark-loading);
    --currebt-asset-border:var(--dark-asset-border);
    --current-card:var(--dark-card);
    --current-border-hover:var(--dark-border-hover);
      
  
    --dark-background-color:#132a47;
    --dark-home-background-color: #132a47;
    --dark-box-shadow:0 4px 8px 0 rgb(4 76 124 / 30%);
    --dark-border:1px solid #18365b;
    --dark-item-background-color:#15253f;
    --dark-span-color:#e5ecf3 ;
    --dark-hover-background-color: #15253f;
    --dark-hb-box-shadow:none;
    --dark-hl-span-color: #a8bcdb;
    --dark-title-color: #e5ecf3;
    --dark-nav-span-color: #c0d3df;
    --dark-nav-border: 1px solid #15253f;
    --dark-td-color: #c0d3df;
    --dark-textarea: #163153;
    --dark-table-hover: #18365b;
    --dark-group-border: none;
    --dark-table-border: none;
    --dark-verify-color: #e5ecf3;
    --dark-hr-color:1px solid #18365b;
    --dark-verify-span-color:  #a8bcdb;
    --dark-spans-color: #ed303b;
    --dark-table-background-color: #132a47;
    --dark-code-color: #e5ecf3;
    --dark-exact-color: #c0d3df;
    --dark-read-color: #a8bcdb;
    --dark-read-border: 1px solid rgba(0,0,0,.125);
    --dark-input-color: #01263f;
    --dark-input-border: 1px solid #013558;
    --dark-read-button: rgba(52,152,219,.2);
    --dark-button-color: #fff;
    --dark-button-border-color: rgba(52,152,219,.2);
    --dark-top-button: #18365b;
    --dark-top-color: #c0d3df;
    --dark-top-border:  1px solid #18365b;
    --dark-write-color: #132a47;
    --dark-loading: #132a47;
    --dark-asset-border: 1px solid #132a47;
    --dark-card: #132a47;
    --dark-border-hover: 0 0 8px 0 rgba(230,230,230,.5);
  }

  :root[data-theme=light]{
    --current-background-color:var(--light-background-color);
    --current-box-shadow:var(--light-box-shadow);
    --current-border:var(--light-border);
    --current-item-background-color:var(--light-item-background-color);
    --current-span-color:var(--light-span-color);
    --current-hover-background-color:var(--light-hover-background-color);
    --current-hb-box-shadow:var(--light-hb-box-shadow);
    --current-hl-span-color:var(--light-hl-span-color);
    --current-title-color:var(--light-title-color);
    --current-nav-span-color:var(--light-nav-span-color);
    --current-nav-border:var(--light-nav-border);
    --current-td-color:var(--light-td-color);
    --current-textarea:var(--light-textarea);
    --current-table-hover:var(--light-table-hover);
    --current-group-border:var(--light-group-border);
    --current-table-border:var(--light-table-border);
    --current-verify-color:var(--light-verify-color);
    --current-hr-color:var(--light-hr-color);
    --current-verify-span-color:var(--light-verify-span-color);
    --current-spans-color:var(--light-spans-color);
    --current-table-background-color:var(--light-table-background-color);
    --current-code-color:var(--light-code-color);
    --current-exact-color:var(--light-exact-color);
    --current-read-coloer:var(--light-read-color);
    --current-read-border:var(--light-read-border);
    --current-input-border:var(--light-input-border);
    --current-button-color:var(--light-button-color);
    --current-read-button:var(--light-read-button);
    --current-button-border-color:var(--light-button-border-color);
    --current-top-color: var(--light-top-color);
    --current-top-border:var(--light-top-border);
    --current-write-color:var(--light-write-color);
    --current-loading:var(--light-loading);
    --currebt-asset-border:var(--light-asset-border);
    --current-card:var(--light-card);
    --current-border-hover:var(--light-border-hover);


    --light-background-color:#fff;
    --light-box-shadow:0 4px 8px 0 rgb(230 230 230 / 60%);
    --light-border:1px solid #e6e6e6;
    --light-item-background-color:#fff;
    --light-span-color: #ed303b;
    --light-hover-background-color: #faf7f8;
    --light-hb-box-shadow: 0 0 8px 0 rgba(230,230,230,1);
    --light-hl-span-color:#666;
    --light-title-color:#1e2022;
    --light-nav-span-color:#6c757e;
    --light-nav-border: none;
    --light-td-color: #333;
    --light-textarea: #f9f9f9;
    --light-table-hover: #faf7f8;
    --light-group-border: 1px solid #e6e6e6;
    --light-table-border: 1px solid #EBEEF5;
    --light-verify-color: #4a4f55;
    --light-hr-color:1px solid #e7eaf3;
    --light-verify-span-color: #6c757e;
    --light-spans-color: #ed303b;
    --light-table-background-color: #f3f3f3;
    --light-code-color: #12161c;
    --light-exact-color: #12161c;
    --light-read-color: #303313;
    --light-read-border: transparent;
    --light-input-border: 1px solid #ced4da;
    --light-button-color: #666;
    --light-read-button: #f8f9fa;
    --light-button-border-color: #ced4da;
    --light-top-color: #606266;
    --light-top-border: 1px solid #d5dae2;
    --light-write-color: #fff;
    --light-loading: #fff;
    --light-asset-border: 1px solid rgb(230,230,230);
    --light-card: #fff;
    --light-border-hover:  0 0 8px 0 rgba(230,230,230,1)
    
  }

  .navbar{
    background-color: var(--current-background-color);
  }

  .home, .block, .txlist, .aList, .sDetail, .blockDetail, .vDetails, .txDetail, .more, .container{
    background-color: var(--dark-home-background-color);
  }

  .h-block,.h-chart .h-l,.h-chart .h-r,.h-list .h-l,.h-list .h-r{
    box-shadow: var(--current-box-shadow) !important;
    border: var(--current-border) !important;
    background-color: var(--current-item-background-color) !important;
  }

  .hb-box{
    border: var(--current-border) !important;
    background-color: var(--current-item-background-color) !important;
  }

  .home .h-block .hb-box:hover {
    box-shadow: var(--current-hb-box-shadow) !important;
  }

  .hb-num span{
    color: var(--current-span-color);
  }

  .hb-data button{
    background-color: var(--current-item-background-color) !important;
  }

  .hl-down, .hl-ul .hl-li{
    border-top: var(--current-border) !important;
  }


  .hl-ul .hl-li:hover {
    background-color: var(--current-hover-background-color) !important;
  }

  .bl-time span, .tx, .tl-time span, .hl-ii span, .hb-data span{
    color:var(--current-hl-span-color) !important;
  }

  .h-t span, .hb-t span{
    color: var(--current-title-color)
  }

  .nav-block{
    box-shadow: var(--current-box-shadow) !important;
    background-color: var(--current-background-color) !important;
  }

  .menu .m-li .nav-block .nav-item-s:hover {
    background-color: var(--current-hover-background-color) !important;
  }

  .nav-item-f{
    color:var(--current-nav-span-color) !important;
  }

  .nav-item-s{
    color: var(--current-title-color);
  }

  .b-height span, .tlt-i span, .al-t span, .sd-t, .vd-t span, .vt-t span, .vp-t span{
    color: var(--current-title-color)
  }

  .block  .b-list,.al-c,.bd-c,  .stx-c, .td-c, .st-l, .sc-border,.sc-asset,.sd-card .sa-asset,.sd-card .sc{
    box-shadow: var(--current-box-shadow) !important;
    border: var(--current-border) !important;
    background-color: var(--current-item-background-color) !important;
  }

  .sa-c{
    background-color: var(--current-item-background-color) !important;
    box-shadow: var(--current-box-shadow) !important;

  }

  .sd-card .sa-c{
    border: var(--current-border) !important;
  }

  /* .v-c{
    border: none !important;
  } */



  .sd-bg .sc-asset .sa-c, .stx-c{
    border-top: none !important;
  }

  .tl-c{
    background-color: var(--current-item-background-color) !important;
  }

  .vd-a, .vd-block{
    box-shadow: var(--current-box-shadow) !important;
    background-color: var(--current-item-background-color) !important;
  }

  .sd-card .sa-asset{
     background-color: var(--current-item-background-color) !important;
     border: none !important;
  }


  .sDetail .sd-card .sa-t, .sc-border .sa-c .sa-t, .sa-t-bg{
    background-color: var(--current-card) !important;
  }

  .sd-bg .sc-asset .sa-t,.v-bg{
    background-color: var(--current-table-background-color) !important;
  }

  .el-table td, .el-table th, .el-table__empty-block{
    background-color: var(--current-item-background-color) !important;
  }

  .el-table th.el-table__cell>.cell{
    color: var(--current-td-color) !important;
  }

  .el-table td.el-table__cell>.cell{
    color: var(--current-td-color) !important;
  }

  .bi-t, .bg-i span, .bg-i, .bg-ii span {
    color:var(--current-title-color) !important;
  }

  .bg-ii button{
    background-color: var(--current-item-background-color) !important;
  }

  .bd-c span, .bt-i, .vai-mo span, .vai-t span, .vai-addr span, .vai-i, .vai-ii{
    color: var(--current-title-color)
  }

  .sg-i span, .sg-ii span, .tc-t span, .tg-i, .tg-ii span, .td-t, .event-t b, .event-t, .topic-c span, .event-c span, .sa-tab span, .sa-tt{
    color: var(--current-title-color);
  }

  .tg-ii textarea, .blocks textarea{
    background-color: var(--current-textarea) !important;
    color: var(--current-title-color) !important;
    border-radius: 4px;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: var(--current-table-hover) !important;
  }

  .sa-tab-choose, .st-tab{
    background-color: var(--current-item-background-color) !important;
  }

  .st-tab span{
    color: var(--current-title-color);
  }

  .sa-group, .tc-t,.tc-group, .bi-t, .bi-group, .td-c .tc-c .tc-input{
    border-bottom: var(--current-group-border) !important;
  }

  .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border-bottom: var(--current-table-border) !important;
  }

  .w-md h1{
    color:var(--current-verify-color) !important;
  }

  .border-top{
    border-top: var(--current-hr-color) !important;
  }

  .row p, .el-form-item__label{
    color: var(--current-verify-span-color) !important;
  }

  .spans{
    color:var(--current-spans-color) !important;
  }

  .sa-tab-choose{
    color: #ed303b !important;
  }

  .el-table::before {
    height: 0px; 
  }

  .blocks p, .exact-l strong, .exact-r .exact-span, .read-flex p{
    color:var(--current-code-color);
  }

  .exact-l span,.exact-r span{
    color:var(--current-exact-color)
  }
  
  .el-collapse-item__header, .is-active, .el-collapse-item__wrap{
    background-color: var(--dark-home-background-color);
    /* color: var(--current-read-color) !important; */
  }
  .el-collapse-item__wrap{
    border-bottom: var(--current-table-border);
  }


  .el-collapse-item__header.is-active {
    border-bottom: var(--current-read-border) !important;
  }

  .is-active, .el-collapse-item__content,.el-collapse-item__header,.all-flex input{
    color: var(--current-read-color) !important;
  }

  .all-flex input, .el-input input, .sd-t-iii input{
    background-color: var(--current-input-color);
  }

  .from-control, .el-input input, .sd-t-iii input{
    border: var(--current-input-border) !important;
  }

  .s-input{
    background-color: var(--current-input-color) !important;
    border: var(--current-input-border) !important;
  }

  .all-btn{
    background-color: var(--current-read-button) !important;
    color: var(--current-button-color);
    border-color: var(--current-button-border-color) !important;
  }

  .el-button{
    background-color: var(--current-background-color);
    color: var(--current-top-color);
  }

  .con-button{
    border:var(--current-top-border) !important;
  }

  .el-button:hover{
    background-color: var(--current-top-button) !important;   
  }

  .el-button:focus{
    background-color: var(--current-top-button) !important;   
  }

  .sub-btn{
    background-color: var(--current-write-color) !important;
  }

  .sDetail .sc-border .sa-t, .sDetail .sd-card .sa-t, .sa-t-bg{
    border-bottom: var(--currebt-asset-border) !important;
  }

  .el-loading-mask{
    background-color: var(--current-loading);
  }

  .el-table, .el-table__expanded-cell{
    background-color: transparent !important;
  }

  .all-flex input[type=text]:focus, select:focus{
    outline: var(--current-input-border);
  }

   .home .h-block .hb-box:hover{
     box-shadow: var(--current-border-hover) !important;
   }









  /* .iscur{
    color: var(--current-iscur-color) !important;
    border-color:var(--current-iscur-border) !important;
  } */





  
 







</style>
