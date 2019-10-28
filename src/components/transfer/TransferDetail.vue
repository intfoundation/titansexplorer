<template>
  <div class="txDetail">
    <div id="box">
      <div class="tx-info">
        <div class="td-t"><span>Transaction Information</span></div>
        <div class="td-c">
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
            <div class="tc-group">
              <div class="tg-i">Gas Used :</div>
              <div class="tg-ii"><span>{{txDetail.gasUsed}}</span></div>
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
        <div class="td-c">
          <div class="tc-c">
            <div class="tc-group">
              <div class="tg-i">TxType :</div>
              <div class="tg-ii"><span>{{txDetail.type}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">From :</div>
              <div class="tg-ii text-url"><span>{{txDetail.fromAddress}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Amount :</div>
              <div class="tg-ii"><span>{{txDetail.amount}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">To :</div>
              <div class="tg-ii text-url"><span>{{txDetail.toAddress}}</span></div>
            </div>
          </div>
        </div>
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
        blockUrl: ''
      }
    },
    created() {
      this.getTxDetail();
    },
    mounted() {

    },
    methods: {
      getTxDetail() {
        this.$axios.get('/api/tx/detail',{params:{hash:this.hash}}).then(res => {
          console.log(res);
          this.txDetail = res.data;
          this.txDetail.status = statusType(this.txDetail.status);
          this.txDetail.fee = this.txDetail.gasUsed * this.txDetail.gasPrice;
          this.txDetail.fee = new BigNumber(this.txDetail.fee).dividedBy(Math.pow(10, 18)).toNumber() + ' INT';
          this.txDetail.amount = new BigNumber(this.txDetail.value).dividedBy(Math.pow(10, 18)).toNumber() + ' INT';
          this.txDetail.gasPrice = new BigNumber(this.txDetail.gasPrice).dividedBy(Math.pow(10, 18)).toNumber() + ' INT';
          this.txDetail.createTime = this.$moment(this.txDetail.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
          this.txDetail.passTime = formatPassTime(this.txDetail.timestamp,Date.now());
          this.blockUrl = '/blockchain/blockdetail/' + this.txDetail.blockNumber;
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
    height: 55px;
    line-height: 55px;
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
</style>
