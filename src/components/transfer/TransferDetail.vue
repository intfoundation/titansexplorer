<template>
  <div class="txDetail">
    <div id="box">
      <div class="tx-info">
        <div class="td-t"><span>Transaction Information</span></div>
        <div class="td-c" v-loading="isInfoLoading">
          <div class="tc-t"><span>TxHash : </span><span>{{hash}}</span></div>
          <div class="tc-c">
            <div class="tc-group">
              <div class="tg-i">Block :</div>
              <div class="tg-ii text-url"><router-link tag="span" :to="blockUrl">{{txDetail.blockNumber}}</router-link></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Status :</div>
              <div class="tg-ii"><span>{{txDetail.status}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Timestamp :</div>
              <div class="tg-ii"><span>{{txDetail.passTime}} ({{txDetail.createTime}})</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Fee :</div>
              <div class="tg-ii"><span>{{txDetail.fee}}</span></div>
            </div>
            <div class="tc-group tc-gas">
              <div class="tg-i">Gas Used :</div>
              <div class="tg-ii">
                <div><span>{{txDetail.gasUsed}}</span></div>
                <div class="tg-tip">
                  <div class="tgt-icon"></div>
                  <div class="tgt-tx">
                    <div><span>Gas Limit: </span><span>{{txDetail.gas}}</span></div>
                    <div><span>Gas Price: </span><span>{{txDetail.gasPrice}} INT</span></div>
                    <div><span>Gas Used: </span><span>{{txDetail.gasUsed}}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Signer :</div>
              <div class="tg-ii"><span>{{txDetail.fromAddress}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Memo :</div>
              <div class="tg-ii"><span>--</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tx-msg">
        <div class="td-t">Transaction Message</div>
        <div class="td-c" v-loading="isInfoLoading">
          <div class="tc-c">
            <div class="tc-group">
              <div class="tg-i">TxType :</div>
              <div class="tg-ii"><span>{{txDetail.type}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">From :</div>
              <router-link tag="div" :to="fromUrl" class="tg-ii text-url"><span>{{txDetail.fromAddress}}</span></router-link>
            </div>
            <div class="tc-group">
              <div class="tg-i">Amount :</div>
              <div class="tg-ii"><span>{{txDetail.amount}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">To :</div>
              <router-link tag="div" :to="toUrl" class="tg-ii text-url"><span>{{txDetail.toAddress}}</span></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="tx-input" v-if="isTxInputShow">
        <div class="td-t">Transaction Input</div>
        <div class="td-c"><span>{{txDetail.unlockInput}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    name: "TransferDetail",
    data() {
      return {
        hash: this.$route.params.hash,
        txDetail: {},
        blockUrl: '',
        fromUrl: '',
        toUrl: '',
        isTxInputShow: false,
        isInfoLoading: true
      }
    },
    created() {
      this.getTxDetail();
    },
    mounted() {

    },
    methods: {
      getTxDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/tx/detail',{params:{hash:this.hash}}).then(res => {
          this.txDetail = res.data;
          this.txDetail.status = statusType(this.txDetail.status);
          this.txDetail.fee = new BigNumber(this.txDetail.gasPrice).times(this.txDetail.gasUsed) + ' INT';
          this.txDetail.amount = transAmount(this.txDetail.value) + ' INT';
          this.txDetail.createTime = this.$moment(this.txDetail.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
          this.txDetail.passTime = formatPassTime(this.txDetail.timestamp,Date.now());
          this.blockUrl = '/blockchain/blockdetail/' + this.txDetail.blockNumber + '/1';
          this.fromUrl = '/stats/statsdetail/' + this.txDetail.fromAddress;
          this.toUrl = '/stats/statsdetail/' + this.txDetail.toAddress;
          this.isTxInputShow = this.txDetail.type !== 'Transfer';
          this.isInfoLoading = false
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .txDetail #box {
    padding: 30px 0 50px;
  }

  .txDetail .td-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .txDetail .td-c {
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6
  }

  .txDetail .td-c .tc-t {
    height: 70px;
    line-height: 70px;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #e6e6e6;
  }

  .txDetail .td-c .tc-c {
    padding-left: 25px;
  }

  .td-c .tc-c .tc-group {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
  }

  .td-c .tc-c .tc-group:last-of-type {
    border-bottom: none;
  }

  .tc-c .tc-group .tg-i {
    width: 150px;
    font-weight: 500;
  }

  .tc-c .tc-gas .tg-ii > div {
    display: inline-block;
    vertical-align: middle;
  }

  .tc-gas .tg-tip {
    position: relative;
    margin-left: 10px;
    width: 300px;
    height: auto;
  }

  .tc-gas .tg-tip .tgt-icon {
    width: 18px;
    height: 18px;
    background: url("../../assets/gasTip.png") no-repeat center/contain;
    cursor: pointer;
  }

  .tc-gas .tg-tip .tgt-tx {
    position: absolute;
    line-height: 20px;
    top: -36px;
    left: 35px;
    padding: 15px 20px;
    background-color: #333;
    border-radius: 5px;
    color: #fff;
    opacity: 0;
    filter: Alpha(opacity = 0);
    transition: all 0.3s ease-in-out;
  }

  .tc-gas .tg-tip .tgt-tx:before {
    content: '';
    position: absolute;
    top: 35px;
    left: -19px;
    border: 10px solid transparent;
    border-right-color: #333;
    z-index: 100;
  }

  .tc-gas .tg-tip .tgt-icon:hover+.tgt-tx{
    opacity: 1;
    filter: Alpha(opacity = 100);
  }

  .txDetail .text-url span {
    color: #ed303b;
    cursor: pointer;
  }

  .txDetail .text-url span:hover {
    text-decoration: underline;
  }

  .txDetail .tx-info {
    margin-bottom: 30px;
  }

  .txDetail .tx-msg {
    margin-bottom: 30px;
  }

  .txDetail .tx-input {
    margin-bottom: 30px;
  }

  .txDetail .tx-input .td-c {
    padding: 30px 25px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    font-size: 14px;
    line-height: 30px;
    word-break: break-word;
  }
</style>
