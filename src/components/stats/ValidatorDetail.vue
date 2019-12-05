<template>
  <div class="vDetails">
    <div id="box">
      <div class="vd-t"><span>VALIDATOR DETAILS</span></div>
      <div class="vd-c">
        <div class="vd-a">
          <div class="va-addr">
            <div class="va-tx">
              <img src="" alt="">
            </div>
            <div class="va-int">
              <div class="vai-name"><span></span></div>
              <div class="vai-t"><span>Address</span></div>
              <div class="vai-addr"><span>{{}}</span></div>
            </div>
            <div class="va-status"></div>
          </div>
          <div class="va-line"></div>
          <div class="va-info">
            <div class="vai-group">
              <div class="vai-i">Website</div>
              <div class="vai-ii"></div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Commission</div>
              <div class="vai-ii"></div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Uptime</div>
              <div class="vai-ii"></div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Voting Power</div>
              <div class="vai-ii"></div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Bonded Height</div>
              <div class="vai-ii"></div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Details</div>
              <div class="vai-ii"></div>
            </div>
          </div>
        </div>
        <div class="vd-t">
          <div class="vd-del"></div>
          <div class="vd-power"></div>
        </div>
        <div class="vd-block"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ValidatorDetail",
    data() {
      return {
        addr: this.$route.params.addr
      }
    },
    created() {
      this.getDetail();
    },
    mounted() {

    },
    methods: {
      getDetail() {
        this.$axios.get('/api/node/detail',{params:{address:this.addr}}).then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
