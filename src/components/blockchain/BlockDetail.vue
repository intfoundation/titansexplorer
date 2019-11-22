<template>
  <div class="blockDetail">
    <div id="box">
      <div class="bd-info">
        <div class="bd-t"><div class="bt-i"><span>Blockchain</span></div></div>
        <div class="bd-c">
          <div class="bi-t"><i></i><span>Blockchain&nbsp;&nbsp;&nbsp;#</span><span style="color: #ed303b">{{block.number}}</span></div>
          <div class="bi-c" v-loading="isInfoLoading">
            <div class="bi-group">
              <div class="bg-i"><span>Block Hash :</span></div>
              <div class="bg-ii"><span>{{block.hash}}</span></div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Proposer :</span></div>
              <router-link v-if="block.url" tag="div" :to="block.url" class="bg-ii bg-link">{{block.miner}}<span></span></router-link>
              <span v-if="!block.url" class="bg-ii bg-link">{{block.miner}}</span>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Block Size :</span></div>
              <div class="bg-ii"><span>{{block.size ? block.size : 0}} Byte</span></div>
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
              <router-link tag="div" to="" class="bg-ii bg-link"><span>{{block.txns}}</span></router-link>
            </div>
            <div class="bi-group bi-gas">
              <div class="bg-i">Gas Used :</div>
              <div class="bg-ii">
                <div><span>{{block.gasUsed}}</span></div>
                <div class="bg-tip">
                  <div class="bgt-icon"></div>
                  <div class="bgt-tx">
                    <div><span>Gas Limit: </span><span>{{block.gasLimit}}</span></div>
                    <div><span>Gas Used: </span><span>{{block.gasUsed}}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bi-group bi-gas">
              <div class="bg-i">Block reward :</div>
              <div class="bg-ii">
                <div><span>{{block.reward}}</span></div>
                <div class="bg-tip">
                  <div class="bgt-icon"></div>
                  <div class="bgt-tx">
                    <div><span>Reward: </span><span>{{block.blockReward}}</span></div>
                    <div><span>Block Fee: </span><span>{{block.blockFee}}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bi-group">
              <div class="bg-i"><span>Timestamp :</span></div>
              <div class="bg-ii"><span>{{block.createTime}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="bd-trans" v-if="isTxShow">
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
      </div>-->
      <div class="bd-validator">
        <div class="bd-t">
          <div class="bt-i"><span>Validator Set</span></div></div>
        <div class="bd-c">
          <el-table :data="vdList" max-height="600" v-loading="isVdLoading">
            <el-table-column prop="i" label="#" align="left" width="80"></el-table-column>
            <el-table-column prop="" label="Moniker" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
            <el-table-column label="Operator" align="left">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.addrUrl" class="bv-link">{{scope.row.address}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="" label="Proposer Priority" align="left"></el-table-column>
            <el-table-column prop="voting_power" label="Voting Power" align="left"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bd-extra">
        <div class="bd-t">
          <div class="bt-i"><span>Extra Data</span></div></div>
        <div class="bd-c"><span>{{block.unlockExtraData}}</span></div>
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
        txList: [],
        isTxLoading: false,
        isInfoLoading: false,
        isTxShow: true,
        over:true,
        voteP: '',
        vdList: [],
        isVdLoading: false
      }
    },
    created() {

    },
    mounted() {
      this.getBlockDetail();
      // this.getTxList();
      this.getValidatorList();
    },
    methods:{
      getBlockDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/block/detail',{params:{height:this.height}}).then(res=> {
          this.block = res.data;
          this.voteP = toDecimal4NoZero(this.block.votingPower/this.block.totalVotingPower);
          this.voteP = new BigNumber(this.voteP).times(100).toNumber() + '%';
          this.block.createTime = this.$moment(this.block.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
          this.block.url = '/stats/statsdetail/' + this.block.miner;
          this.block.reward = toDecimal4NoZero(this.block.blockReward + this.block.blockFee) + ' INT';
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      // getTxList() {
      //   this.isTxLoading = true;
      //   this.$axios.get('/api/tx/blocktx',{params:{height:this.height}}).then(res => {
      //     this.txList = res.data;
      //     this.isTxShow = this.txList.length;
      //     if (this.txList.length) {
      //       this.txList.forEach((item,index) => {
      //         item.i = index + 1;
      //         item.fee = new BigNumber(item.gasUsed).dividedBy(Math.pow(10, 18)).toNumber() + 'INT';
      //         item.time = this.$moment().utc().format('YYYY-MM-DD hh:mm:ss') + '+UTC';
      //         item.status = statusType(item.status);
      //       });
      //       console.log(this.txList);
      //     } else {
      //     }
      //     this.isTxLoading = false
      //   }).catch(err => {
      //     console.log(err);
      //   })
      // },
      getValidatorList() {
        this.isVdLoading = true;
        this.$axios.get('/api/block/validators',{params:{height:this.height}}).then(res => {
          this.vdList = res.data;
          this.vdList.forEach((item,index)=> {
            item.i = index + 1;
            item.voting_power = toDecimal4NoZero(item.voting_power);
            item.addrUrl = '/stats/statsdetail/' + item.address;
          });
          this.isVdLoading = false;
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
    padding-left: 15px;
  }

  .bd-c .bi-c .bi-group {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
  }

  .bi-group .bg-i {
    width: 150px;
    font-weight: 500;
  }

  .bi-group .bg-link {
    color: #ed303b;
    cursor: pointer;
  }

  .bi-group .bg-link:hover {
    text-decoration: underline;
  }

  .bi-c .bi-gas .bg-ii > div {
    display: inline-block;
    vertical-align: middle;
  }

  .bi-gas .bg-tip {
    position: relative;
    margin-left: 10px;
    width: 300px;
    height: auto;
  }

  .bi-gas .bg-tip .bgt-icon {
    width: 18px;
    height: 18px;
    background: url("../../assets/gasTip.png") no-repeat center/contain;
    cursor: pointer;
  }

  .bi-gas .bg-tip .bgt-tx {
    position: absolute;
    line-height: 20px;
    top: -26px;
    left: 35px;
    padding: 15px 20px;
    background-color: #333;
    border-radius: 5px;
    color: #fff;
    opacity: 0;
    filter: Alpha(opacity = 0);
    transition: all 0.3s ease-in-out;
  }

  .bi-gas .bg-tip .bgt-tx:before {
    content: '';
    position: absolute;
    top: 24px;
    left: -19px;
    border: 10px solid transparent;
    border-right-color: #333;
    z-index: 100;
  }

  .bi-gas .bg-tip .bgt-icon:hover+.bgt-tx{
    opacity: 1;
    filter: Alpha(opacity = 100);
  }

  .blockDetail .bd-validator {
    margin-bottom: 30px;
  }

  .bd-validator .bd-c {
    padding: 0 15px;
  }

  .bd-validator .bd-c .bv-link {
    color: #ed303b;
    cursor: pointer;
  }

  .bd-validator .bd-c .bv-link:hover {
    text-decoration: underline;
  }

  .bd-extra .bd-c {
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
