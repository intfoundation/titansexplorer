<template>
  <div class="vDetails">
    <div id="box">
      <div class="vd-t"><span>Validator Details</span></div>
      <div class="vd-c">
        <div class="vd-a vd-block">
          <div class="va-addr">
            <div class="va-tx">
              <img src="../../assets/moniker.png" alt="" v-if="!valInfo.thumbnail">
              <img :src="valInfo.thumbnail" alt="" v-if="valInfo.thumbnail">
            </div>
            <div class="va-int">
              <div class="vai-name">
                <div class="vai-mo"><span>{{valInfo.moniker}}</span></div>
                <div class="vai-status">
                  <div class="vs vs-active" v-if="valInfo.active === 2"><i></i><span>active</span></div>
                  <div class="vs vs-jailed" v-if="valInfo.active === 99"><i></i><span>jailed</span></div>
                  <div class="vs vs-can" v-if="valInfo.active === 1"><i></i><span>candidate</span></div>
                </div>
              </div>
              <div class="vai-t"><span>Address</span></div>
              <div class="vai-addr"><span>{{addr}}</span></div>
            </div>
          </div>
          <div class="va-line"></div>
          <div class="va-info">
            <div class="vai-group">
              <div class="vai-i">Website</div>
              <div class="vai-ii vai-url" v-if="valInfo.website" @click="toWebsite"><span>{{web}}</span></div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Commission</div>
              <div class="vai-ii">{{valInfo.commission}}</div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Uptime</div>
              <div class="vai-ii">{{valInfo.uptime}}</div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Voting Power</div>
              <div class="vai-ii">{{valInfo.voteP}} ({{totalStaked}} INT)</div>
            </div>
            <div class="vai-group">
              <div class="vai-i">Bonded Height</div>
              <router-link tag="div" :to="valInfo.url" class="vai-ii vai-url" v-if="valInfo.url">{{valInfo.bondHeight}}</router-link>
            </div>
            <div class="vai-group">
              <div class="vai-i">Details</div>
              <div class="vai-ii">{{valInfo.details}}</div>
            </div>
          </div>
        </div>
        <div class="vd-table">
          <div class="vd-del">
            <div class="vt-t"><span>Delegators</span></div>
            <div class="vt-c vd-block" v-loading="isDelLoading">
              <div class="nodata" v-if="!delList.length">
                <img src="../../assets/nodata.png" alt="">
                <div class="dt">No Delegators</div>
              </div>
              <div v-else>
                <el-table :data="delList">
                  <el-table-column label="Delegator Address" align="left" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <router-link tag="span" :to="scope.row.url" type="text" class="sc-url">{{scope.row.address}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="Amount" width="130" align="right"></el-table-column>
                  <el-table-column prop="share" label="Share" width="130" align="right"></el-table-column>
                </el-table>
                <div class="vt-f">
                  <el-pagination
                    @current-change="handleDelChange"
                    :current-page.sync="delPage"
                    :page-size="5"
                    :total="delTotal"
                    layout="prev, pager, next, jumper"
                    background>
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
          <div class="vd-power">
            <div class="vt-t"><span>Power Events</span></div>
            <div class="vt-c vd-block" v-loading="isPowerLoading">
              <div class="nodata" v-if="!powerList.length">
                <img src="../../assets/nodata.png" alt="">
                <div class="dt">No Power Events</div>
              </div>
              <div v-else>
                <el-table :data="powerList">
                  <el-table-column label="Height" align="left" width="80">
                    <template slot-scope="scope">
                      <router-link tag="span" :to="scope.row.heightUrl" type="text" class="sc-url">{{scope.row.blockNumber}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="TxHash" align="left" width="180" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <router-link tag="span" :to="scope.row.txUrl" type="text" class="sc-url">{{scope.row.hash}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="Amount" align="left" width="120">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type === 'Delegate'" style="color: #37cc6e;font-weight: bold;">+ </span>
                      <span v-if="scope.row.type !== 'Delegate'" style="color:#ed303b;font-weight: bold;">- </span>
                      <span>{{scope.row.amount}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="time" label="Time" align="right"></el-table-column>
                </el-table>
                <div class="vt-f">
                  <el-pagination
                    @current-change="handlePowerChange"
                    :current-page.sync="powerPage"
                    :page-size="5"
                    :total="powerTotal"
                    layout="prev, pager, next, jumper"
                    background>
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="vd-prop">
          <div class="vp-t"><span>Proposed Blocks</span></div>
          <div v-loading="isPropLoading" class="vp-c vd-block" :class="{'vp-minH' : !propList.length}">
            <div class="nodata" v-if="!propList.length">
              <img src="../../assets/nodata.png" alt="">
              <div class="dt">No Proposed Blocks</div>
            </div>
            <div v-else>
              <el-table :data="propList">
                <el-table-column label="Height" align="left" width="140" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.url" type="text" class="sc-url">{{scope.row.number}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="hash" label="Block Hash" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="txns" width="140" label="Txs" align="right"></el-table-column>
                <el-table-column prop="time" width="300" label="Time" align="right"></el-table-column>
              </el-table>
              <div class="vp-f">
                <el-pagination
                  @current-change="handlePropChange"
                  :current-page.sync="propPage"
                  :page-size="10"
                  :total="propTotal"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
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
    name: "ValidatorDetail",
    data() {
      return {
        addr: this.$route.params.addr,
        valInfo: {},
        delList: [],
        delTotal: 0,
        delPage: 1,
        isDelLoading: true,
        powerList: [],
        powerTotal: 0,
        powerPage: 1,
        isPowerLoading: true,
        propList: [],
        propPage: 1,
        propTotal: 0,
        isPropLoading: true,
        web: '',
        totalBond: 1,
        totalStaked: 0
      }
    },
    created() {
      this.getDetail();
      this.getPropList();
    },
    mounted() {

    },
    methods: {
      getDetail() {
        this.$axios.get('/api/node/detail',{params:{address:this.addr}}).then(res => {
          this.valInfo = res.data;
          this.valInfo.commission = toDecimal4NoZero(this.valInfo.commission).toString() + '%';
          this.valInfo.uptime = new BigNumber(toDecimal4NoZero(this.valInfo.uptime)).times(100).toNumber() + '%';
          this.valInfo.url = '/block/' + this.valInfo.bondHeight + '/1';
          this.valInfo.voteP = new BigNumber(toDecimal4NoZero(this.valInfo.total_staked/this.valInfo.totalStaked)).times(100).toNumber() + '%';
          this.web = this.valInfo.website;
          this.totalBond = this.valInfo.totalStaked;
          this.totalStaked = this.valInfo.total_staked;
          this.getDelList();
          this.getPowerList();
        }).catch(err => {
          console.log(err);
        })
      },
      getDelList() {
        this.isDelLoading = true;
        this.$axios.get('/api/node/delegators',{params:{address:this.addr,pageNo:this.delPage,pageSize:5}}).then(res => {
          this.delList = res.data.list;
          this.delList.forEach(item => {
            item.url = '/address/' + item.address;
            let amount = this.valInfo.active === 1 ? item.deposit_proxied_balance : item.proxied_balance;

            item.share = new BigNumber(toDecimal4NoZero(amount/this.totalStaked)).times(100).toNumber() + '%';
            item.amount = transAmount(amount);
          });
          this.delTotal = res.data.count;
          this.isDelLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getPowerList() {
        this.isPowerLoading = true;
        this.$axios.get('/api/node/delegatorTx',{params:{address:this.addr,pageNo:this.powerPage,pageSize:5}}).then(res => {
          this.powerList = res.data.list;
          this.powerList.forEach(item => {
            item.amount = transAmount(item.value);
            item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            item.txUrl = '/tx/' + item.hash;
            item.heightUrl = '/block/' + item.blockNumber + '/1';
          });
          this.powerTotal = res.data.count;
          this.isPowerLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getPropList() {
        this.isPropLoading = true;
        this.$axios.get('/api/block/list',{params:{miner:this.addr,pageNo:this.propPage,pageSize:10}}).then(res => {
          this.propList = res.data.list;
          this.propTotal = res.data.count;
          this.propList.forEach(item => {
            item.url = '/block/' + item.number + '/1';
            item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          });
          this.isPropLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handleDelChange(val) {
        this.delPage = val;
        this.getDelList()
      },
      handlePowerChange(val) {
        this.powerPage = val;
        this.getPowerList()
      },
      handlePropChange(val) {
        this.PropPage = val;
        this.getPropList()
      },
      toWebsite() {
        window.open(this.web);
      }
    }
  }
</script>

<style scoped>
  .vDetails #box {
    padding: 30px 0 50px;
  }

  .vDetails .vd-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .vDetails .vd-block {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-radius:4px;
  }

  .vDetails .vd-a {
    padding: 20px;
    margin-bottom: 30px;
  }

  .vDetails .vd-a .va-addr {
    position: relative;
    display: flex;
    align-items: center;
  }

  .va-addr .va-tx {
    width: 80px;
    height: 80px;
    margin-right: 50px;
  }

  .va-addr .va-tx img {
    width: 100%;
    border-radius: 50%;
  }

  .va-addr .va-int {
    width: 100%;
  }

  .va-addr .va-int .vai-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .va-int .vai-name .vai-mo {
    font-size: 22px;
    font-weight: bold;
  }

  .va-int .vai-status .vs {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0 10px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
  }

  .vai-status .vs i {
    display: inline-block;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 5px;
  }

  .vai-status .vs span {
    display: inline-block;
    vertical-align: middle;
  }

  .vai-status .vs-active {
    background-color: #37cc6e;
  }

  .vs-active i {
    background-image: url('../../assets/active.png');
  }

  .vai-status .vs-can {
    background-color: #575c64;
  }

  .vs-can i {
    background-image: url('../../assets/pend.png');
  }

  .vai-status .vs-jailed {
    background-color: #ed303b;
  }

  .vs-jailed i {
    background-image: url('../../assets/jailed.png');
  }

  .va-int .vai-t {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .va-int .vai-addr {
    font-size: 14px;
  }

  .vd-a .va-line {
    width: 100%;
    height: 1px;
    background-color: #e6e6e6;
    margin: 20px 0;
  }

  .va-info .vai-group {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .va-info .vai-group:last-of-type {
    margin-bottom: 0;
  }

  .vai-group .vai-i {
    width: 200px;
    font-weight: 500;
  }

  .vai-group .vai-url {
    color: #ed303b;
    cursor: pointer;
  }

  .vai-group .vai-url:hover {
    text-decoration: underline;
  }

  .vDetails .vd-table {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .vd-table .vd-del {
    width: 49%;
  }

  .vd-table .vd-power {
    width: 49%;
  }

  .vd-table .vt-t {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .vd-table .vt-c {
    position: relative;
    padding: 0 15px;
    height: 330px;
  }

  .vt-c .nodata {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }

  .vt-c .nodata img {
    width: 40px;
  }

  .vt-c .nodata .dt {
    font-size: 14px;
    font-weight: 500;
  }

  .vt-c .vt-f {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }

  .vDetails .vd-prop .vp-t {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .vDetails .vd-prop .vp-c {
    padding: 0 15px;
    position: relative;
  }

  .vDetails .vd-prop .vp-minH {
    min-height: 400px;
  }

  .vp-c .nodata {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }

  .vp-c .nodata img {
    width: 40px;
  }

  .vp-c .nodata .dt {
    font-size: 14px;
    font-weight: 500;
  }

  .vDetails .sc-url {
    color: #ed303b;
    cursor: pointer;
  }

  .vDetails .sc-url:hover {
    text-decoration: underline;
  }

  .vp-c .vp-f {
    padding: 10px 0;
    text-align: right;
  }
</style>
