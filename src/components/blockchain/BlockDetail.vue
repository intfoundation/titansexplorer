<template>
  <div class="blockDetail">
    <div id="box">
      <div class="bd-info">
        <div class="bd-t"><div class="bt-i"><span>Blockchain</span></div></div>
        <div class="bd-c">
          <div class="bi-t"><i></i><span>Blockchain&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;</span><span style="color: #ed303b">{{block.number}}</span></div>
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
              <div class="bg-ii"><span style="color: #ed303b">{{block.txns}}</span></div>
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
                    <div><span>Tx Fee: </span><span>{{block.blockFee}}</span></div>
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
      <div class="bd-trans" v-if="isTxShow">
        <div class="bd-t">
          <div class="bt-i"><span>Transactions</span></div>
          <div class="bt-ii" v-if="total > 10">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              :total="total"
              layout="prev, pager, next, jumper"
              background>
            </el-pagination>
          </div>
        </div>
        <div class="bd-c">
          <el-table :data="txList" max-height="800" v-loading="isTxLoading">
            <el-table-column label="TxHash" align="left" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <router-link tag="div" :to="scope.row.txUrl" class="bd-link">{{scope.row.hash}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="blockNumber" label="Block" align="left" width="100"></el-table-column>
            <el-table-column prop="type" label="TxType" align="left" width="150"></el-table-column>
            <el-table-column prop="fee" label="Fee" align="left" width="150"></el-table-column>
            <el-table-column prop="fromAddress" label="Signer" align="left" width="280" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
            <el-table-column prop="time" label="Timestamp" align="right"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bd-validator">
        <div class="bd-t">
          <div class="bt-i"><span>Validator Set</span></div></div>
        <div class="bd-c">
          <el-table :data="vdList" v-loading="isVdLoading">
            <el-table-column prop="i" label="#" align="left" width="80"></el-table-column>
            <el-table-column label="Moniker" align="left" width="120" :show-overflow-tooltip="over">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.addrUrl" class="bd-link">{{scope.row.moniker}}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="Operator" align="left">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.addrUrl" class="bd-link">{{scope.row.address}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="proposerPriority" label="Proposer Priority" align="left"></el-table-column>
            <el-table-column prop="voting_power" label="Voting Power" align="left"></el-table-column>
          </el-table>
<!--          <div class="bd-f">-->
<!--            <el-pagination-->
<!--              @current-change="handleVdChange"-->
<!--              :current-page.sync="vdPage"-->
<!--              :page-size="10"-->
<!--              :total="vdTotal"-->
<!--              layout="prev, pager, next, jumper"-->
<!--              background>-->
<!--            </el-pagination>-->
<!--          </div>-->
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
        page: this.$route.params.page || 1,
        currentPage: 1,
        total: 0,
        block: {},
        txList: [],
        isTxLoading: false,
        isInfoLoading: false,
        isTxShow: true,
        over: true,
        voteP: '',
        vdList: [],
        isVdLoading: false,
        vdPage: 1,
        vdTotal: 0
      }
    },
    created() {
      this.getTxList();
    },
    mounted() {
      this.getBlockDetail();
      this.getValidatorList();
    },
    methods:{
      getBlockDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/block/detail',{params:{height:this.height,pageNum:1,pageSize:10}}).then(res=> {
          this.block = res.data;
          this.voteP = this.block.totalVotingPower === 0 ? 0 : toDecimal4NoZero(this.block.votingPower/this.block.totalVotingPower);
          this.voteP = new BigNumber(this.voteP).times(100).toNumber() + '%';
          this.block.createTime = this.$moment(this.block.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
          this.block.url = '/staking/validatorDetail/' + this.block.miner;
          this.block.reward = toDecimal4NoZero(this.block.blockReward + this.block.blockFee) + ' INT';
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getTxList() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/blocktx',{params:{height:this.height,pageNo:this.page,pageSize:10}}).then(res => {
          this.txList = res.data.list;
          this.isTxShow = res.data.count > 0;
          this.total = res.data.count;
          if (this.isTxShow) {
            this.txList.forEach((item,index) => {
              item.i = index + 1;
              item.fee = new BigNumber(item.gasUsed).dividedBy(Math.pow(10, 18)).toNumber() + 'INT';
              item.time = this.$moment().utc().format('YYYY-MM-DD hh:mm:ss') + '+UTC';
              item.status = statusType(item.status);
              item.txUrl = '/transfer/transferdetail/' + item.hash;
              item.addrUrl = '/stats/statsdetail/' + item.addrUrl;
            });
          }
          this.isTxLoading = false
        }).catch(err => {
          console.log(err);
        })
      },
      getValidatorList() {
        this.isVdLoading = true;
        this.$axios.get('/api/block/validators',{params:{height:this.height,pageNo:this.vdPage,pageSize:10}}).then(res => {
          this.vdList = res.data;
          this.vdTotal = this.vdList.length;
          this.vdList.forEach((item,index)=> {
            item.i = index + 1;
            item.voting_power = toDecimal4NoZero(item.voting_power);
            item.addrUrl = '/staking/validatorDetail/' + item.address;
            if (item.proposerPriority === undefined) {
              item.proposerPriority = '';
            } else if (item.proposerPriority === 0) {
              item.proposerPriority = '0%';
            } else {
              item.proposerPriority = toDecimal4NoZero(item.proposerPriority).toString() + '%';
            }
          });
          this.isVdLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$router.push ('/blockchain/blockdetail/' + this.height + '/' + val);
        this.page = val;
        this.getTxList()
      },
      handleVdChange(val) {
        this.vdPage = val;
        this.$router.push ('/blockchain/blockdetail/' + this.height + '/' + val);
        this.page = val;
        this.getTxList()
      },
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
    margin-bottom: 10px;
  }

  .blockDetail .bd-t .bt-i {
    font-size: 24px;
    font-weight: bold;
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

  .blockDetail .bd-trans {
    margin-bottom: 30px;
  }

  .bd-trans .bd-c {
    padding: 0 15px;
  }

  .bd-trans .bd-t {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .blockDetail .bd-validator {
    margin-bottom: 30px;
  }

  .bd-validator .bd-c {
    padding: 0 15px;
  }

  .bd-validator .bd-c .bd-f {
    padding: 10px 0;
    text-align: right;
  }

  .blockDetail .bd-c .bd-link {
    color: #ed303b;
    cursor: pointer;
  }

  .blockDetail .bd-c .bd-link:hover {
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
