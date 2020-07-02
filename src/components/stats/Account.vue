<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t"><span>ACCOUNT DETAILS</span></div>
      <div class="sd-c">
        <div class="sd-addr sd-block">
          <div class="sa-i">
            <div class="sa-l">
              <div class="qr"><img src="../../assets/qr.png" alt=""></div>
              <div class="addr">
                <div class="ad-i">Address</div>
                <div class="ad-ii">{{addr}}</div>
              </div>
            </div>
            <div class="sa-r">
              <div class="ad-i">Reward Address</div>
              <div class="ad-ii">{{addr}}</div>
            </div>
          </div>
          <div class="sa-ii"></div>
        </div>
        <div class="sd-table">
          <div class="sd-del">
            <div class="sd-tt"><span>Delegations</span></div>
            <div class="sd-tc sd-block" v-loading="isDelLoading">
              <div class="nodata" v-if="!delList.length">
                <img src="../../assets/nodata.png" alt="">
                <div class="dt">No Delegations</div>
              </div>
              <div v-else>
                <el-table :data="delList">
                  <el-table-column label="Validator" align="left" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <router-link tag="span" to="" type="text" class="sc-url">{{scope.row.validator}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="Amount" align="right"></el-table-column>
                  <el-table-column prop="reward" label="Reward" align="right"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="sd-bond">
            <div class="sd-tt"><span>Unbondings</span></div>
            <div class="sd-tc sd-block" v-loading="isUnBondLoading">
              <div class="nodata" v-if="!unBondList.length">
                <img src="../../assets/nodata.png" alt="">
                <div class="dt"><span>No Unbondings</span></div>
              </div>
              <div v-else>
                <el-table :data="unBondList">
                  <el-table-column label="Validator" align="left" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <router-link tag="span" to="" type="text" class="sc-url">{{scope.row.validator}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="Height" align="left" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <router-link tag="span" to="" type="text" class="sc-url">{{scope.row.validator}}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="Amount" align="right"></el-table-column>
                  <el-table-column prop="" label="Time" align="right"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-tx">
          <div class="stx-t">
            <div class="st-l"><span>Transactions</span><span class="st-li">{{total}}Txs</span></div>
            <div class="st-r" v-if="isPageShow">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="30"
                :total="total"
                layout="prev, pager, next, jumper"
                background>
              </el-pagination>
            </div>
          </div>
          <div class="stx-c">
            <el-table :data="txList" v-loading="isTxLoading">
              <el-table-column label="TxHash" align="left" :show-overflow-tooltip="over">
                <template slot-scope="scope">
                  <router-link tag="span" :to="scope.row.txUrl" type="text" class="sc-url">{{scope.row.transactionHash}}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="Block" align="left" width="100">
                <template slot-scope="scope">
                  <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.blockNumber}}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="From" align="left" :show-overflow-tooltip="over">
                <template slot-scope="scope">
                  <span v-if="scope.row.fromAddress === addr">{{scope.row.fromAddress}}</span>
                  <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddress}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="Amount" align="right" width="120" :show-overflow-tooltip="over"></el-table-column>
              <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                <template slot-scope="scope">
                  <span v-if="scope.row.toAddress === addr">{{scope.row.toAddress}}</span>
                  <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{scope.row.toAddress}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
              <el-table-column prop="fromAddress" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>
              <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
              <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Account",
    data() {
      return {
        addr: this.$route.params.addr,
        choose: 0,
        addrInfo: {},
        tabList: ['Assets','Delegations','Unbonding Delegations','Delegator Rewards'],
        delList: [],
        unBondList: [],
        delRewardList: [],
        txList: [],
        isInfoLoading: true,
        isDelLoading: false,
        isUnBondLoading: false,
        isReWardLoading: false,
        isTxLoading: false,
        over: true,
        currentPage: 1,
        page: 1,
        total: 0,
        isPageShow: false
      }
    },
    created() {
      this.currentPage = +this.page;
      this.getAddrDetail();
      this.getAddrTx();
    },
    mounted() {

    },
    methods: {
      getAddrDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/account/detail',{params:{address:this.addr}}).then(res => {
          this.addrInfo = res.data;
          this.addrInfo.name = this.addrInfo.name === '' ? "/" : this.addrInfo.name;
          this.addrInfo.balance = transAmount(this.addrInfo.balance) + ' INT';
          this.addrInfo.time = this.$moment(this.addrInfo.createtime).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getAddrTx() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/addresstx',{params:{address:this.addr,pageNo:this.currentPage,pageSize:'10'}}).then(res => {
          console.log(res);
          this.total = res.data.count;
          this.isPageShow = this.total > 10;
          this.txList = res.data.list;
          this.txList.forEach(item => {
            item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            item.status = statusType(item.status);
            item.amount = toDecimal4NoZero(item.value);
            item.amount = transAmount(item.amount);
            item.txUrl = '/transfer/transferdetail/' + item.hash;
            item.blockUrl = '/blockchain/blockdetail/' + item.blockNumber + '/1';
            item.fAddrUrl = '/stats/statsdetail/' + item.fromAddress;
            item.tAddrUrl = '/stats/statsdetail/' + item.toAddress;
          });
          this.isTxLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      handleCurrentChange(val) {
        this.isTxLoading = true;
        this.currentPage = val;
        this.page = val;
        this.getAddrTx()
      },
      toAddrDetail(url) {
        this.$router.push(url);
        this.addr = this.$route.params.addr;
        this.page = 1;
        this.currentPage = this.page;
        this.getAddrDetail();
        this.getAddrTx();
      },
      getDel() {

      },
      getUnBond() {

      },
      getDelReward() {

      }
    }
  }
</script>

<style scoped>
  .sDetail #box {
    padding: 30px 0 50px;
  }

  .sDetail .sd-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .sDetail .sd-block {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-radius:4px;
  }

  .sDetail .sd-c .sd-addr {
    margin-bottom: 30px;
    color: #fff;
  }

  .sd-addr .sa-i {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 4px 4px 0 0;
    background: #ed303b;
  }

  .sd-addr .sa-i .sa-l {
    display: flex;
    align-items: center;
    width: 50%;
  }

  .sa-i .sa-r {
    margin-left: 30px;
  }

  .sa-i .sa-l .qr {
    width: 50px;
    height: 50px;
    padding: 10px;
    margin-right: 30px;
    background-color: #fff;
    border-radius: 4px;
  }

  .sa-l .qr img {
    width: 100%;
  }

  .sa-i .ad-i {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .sa-i .ad-ii {
    font-size: 14px;
  }

  .sDetail .sd-table {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .sd-table .sd-del {
    width: 49%;
  }

  .sd-table .sd-bond {
    width: 49%;
  }

  .sd-table .sd-tt {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .sd-table .sd-tc {
    position: relative;
    padding: 0 20px;
    height: 300px;
  }

  .sd-table .nodata {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }

  .sd-table .nodata img {
    width: 40px;
  }

  .sd-table .nodata .dt {
    font-size: 14px;
    font-weight: 500;
  }

  .sDetail .sc-tx {
    margin-bottom: 30px;
  }

  .sDetail .sc-tx .stx-t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .sc-tx .stx-t .st-l {
    font-size: 20px;
    font-weight: bold;
  }

  .sc-tx .stx-t .st-l .st-li {
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
  }

  .sDetail .sc-tx .stx-c {
    padding: 0 15px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-radius: 4px;
    border: 1px solid rgb(230,230,230);
  }

  .sc-tx .stx-c .sc-url {
    color: #ed303b;
    cursor: pointer;
  }

  .sc-tx .stx-c .sc-url:hover {
    text-decoration: underline;
  }
</style>
