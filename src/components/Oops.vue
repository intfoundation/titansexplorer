<template>
  <div class="oops">
    <div id="box">
      <div class="oops-t"><span style="font-weight: bold;">Search Results</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #787c99;">for </span><span style="color:#787c99;">{{result}}</span></div>
      <div class="oops-c">
        <div class="oc-c">
          <div class="oc-i"><span>Oops!</span></div>
          <div class="oc-ii"><span>There is no valid result.</span></div>
          <div class="oc-iii"><span>Try to search with Address, Txhash, Block Number.</span></div>
          <router-link tag="div" to="/" class="oc-btn"><span>Back Home</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Oops",
    data() {
      return {
        result: this.$route.params.result
      }
    },
  }
</script>

<style scoped>
  .oops #box {
    padding: 30px 0 50px;
  }

  .oops .oops-t {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .oops .oops-c {
    position: relative;
    height: 800px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6
  }

  .oops-c .oc-c {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }

  .oc-c .oc-i {
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 30px;
  }

  .oc-c .oc-ii {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .oc-c .oc-iii {
    font-size: 14px;
    color: #787c99;
    margin-bottom: 40px;
  }

  .oc-c .oc-btn {
    width: 160px;
    height: 36px;
    margin: auto;
    line-height: 36px;
    font-size: 14px;
    font-weight: 500;
    background-color: #ed303b;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

</style>
