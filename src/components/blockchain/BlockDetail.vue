<template>
  <div class="blockDetail">
    <div id="box">
      <div class="bd-info">
        <div class="bd-t"><div class="bt-i"><span>Blockchain</span></div></div>
        <div class="bd-c">
          <div class="bi-t"><i></i><span>Blockchain  #</span><span style="color: #ed303b">{{block.number}}</span></div>
          <div class="bi-c" v-loading="isInfoLoading">
            <div class="bi-group">
              <div class="bg-i"><span>Block Hash :</span></div>
              <div class="bg-ii"><span>{{block.hash}}</span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Proposer :</span></div>
              <div class="bg-ii" style="color: #ed303b"><span></span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Validators :</span></div>
              <div class="bg-ii"><span>{{block.validators}}/{{block.totalValidators}}</span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Voting Power :</span></div>
              <div class="bg-ii"><span>{{voteP}}</span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Transactions :</span></div>
              <div class="bg-ii"><span>{{block.txns}}</span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Block reward :</span></div>
              <div class="bg-ii"><span></span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Timestamp :</span></div>
              <div class="bg-ii"><span>{{block.createTime}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bd-trans">
        <div class="bd-t">
          <div class="bt-i"><span>Transactions</span></div>
        </div>
        <div class="bd-c">
          <el-table :data="txList" max-height="800" v-loading="isTxLoading">
            <el-table-column prop="hash" label="TxHash" align="left" :show-overflow-tooltip="over"></el-table-column>
            <el-table-column prop="blockNumber" label="Block" align="left" width="100"></el-table-column>
            <el-table-column prop="type" label="TxType" align="left" width="100"></el-table-column>
            <el-table-column prop="fee" label="Fee" align="left" width="150"></el-table-column>
            <el-table-column prop="fromAddress" label="Signer" align="left" :show-overflow-tooltip="over"></el-table-column>
            <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
            <el-table-column prop="time" label="Timestamp" align="right"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bd-validator" v-if="isVaShow">
        <div class="bd-t">
          <div class="bt-i"><span>Validator Set</span></div></div>
        <div class="bd-c"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    name: "BlockDetail",
    data() {
      return {
        height: this.$route.params.height,
        block: {},
        isVaShow: false,
        txList: [],
        isTxLoading: false,
        isInfoLoading: false,
        isTxShow: true,
        over:true,
        voteP: ''
      }
    },
    created() {
      this.getBlockDetail();
      this.getTxList();
      // console.log(this.height);
    },
    mounted() {

    },
    methods:{
      getBlockDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/block/detail',{params:{height:this.height}}).then(res=> {
          this.block = res.data;
          this.voteP = toDecimal4NoZero(this.block.votingPower/this.block.totalVotingPower) * 100 + '%';
          this.block.createTime = this.$moment(this.block.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getTxList() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/blocktx',{params:{height:this.height}}).then(res => {
          this.txList = res.data;
          if (this.txList.length) {
            this.txList.forEach((item,index) => {
              item.i = index + 1;
              item.fee = new BigNumber(item.gasUsed).dividedBy(Math.pow(10, 18)).toNumber() + 'INT';
              item.time = this.$moment().utc().format('YYYY-MM-DD hh:mm:ss') + '+UTC';
              item.status = statusType(item.status);
            });
            console.log(this.txList);
          } else {
            // this.isTxShow = false;
          }
          this.isTxLoading = false
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .blockDetail #box {
    padding: 30px 0 50px;
  }

  .blockDetail .bd-info {
    margin-bottom: 30px;
  }

  .blockDetail .bd-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .blockDetail .bd-c {
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6
  }

  .bd-info .bd-c .bi-t {
    height: 70px;
    line-height: 70px;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #e6e6e6;
  }

  .bd-info .bd-c .bi-c {
    padding-left: 25px;
  }

  .bd-c .bi-c .bi-group {
    display: flex;
    align-items: center;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
  }

  .bi-group .bg-i {
    width: 150px;
    font-weight: 500;
  }

  .blockDetail .bd-trans {
    margin-bottom: 30px;
  }

  .bd-trans .bd-c {
    padding: 0 15px;
  }

</style>
