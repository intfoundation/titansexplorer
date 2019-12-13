<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">{{addr}}</div>
      <div class="sd-c">
        <div class="sc-asset">
          <div class="sa-t">
            <div class="sa-tab" v-for="(item,index) in tabList" :class="{'sa-tab-choose': choose === index}" @click="choose = index"><span>{{item}}</span></div>
          </div>
          <div class="sa-c">
            <div class="sa-block sa-asset" v-if="choose === 0" v-loading="isInfoLoading">
              <div class="sa-group">
                <div class="sg-i"><span>Address :</span></div>
                <div class="sg-ii"><span>{{addrInfo.address}}</span></div>
              </div>
              <div class="sa-group">
                <div class="sg-i"><span>Name :</span></div>
                <div class="sg-ii"><span>{{addrInfo.name}}</span></div>
              </div>
              <div class="sa-group">
                <div class="sg-i"><span>Balance :</span></div>
                <div class="sg-ii"><span>{{addrInfo.balance}}</span></div>
              </div>
              <div class="sa-group">
                <div class="sg-i"><span>Stake :</span></div>
                <div class="sg-ii"><span>{{addrInfo.stake}}</span></div>
              </div>
              <div class="sa-group">
                <div class="sg-i"><span>Create Time :</span></div>
                <div class="sg-ii"><span>{{addrInfo.time}}</span></div>
              </div>
            </div>
            <div class="sa-block" v-if="choose === 1">
              <el-table :data="delList" max-height="800" v-loading="isDelLoading">
                <el-table-column prop="" label="Address" align="left"></el-table-column>
                <el-table-column prop="" label="Amount" align="left"></el-table-column>
                <el-table-column prop="" label="Shares" align="left"></el-table-column>
                <el-table-column prop="" label="Block" align="left"></el-table-column>
              </el-table>
            </div>
            <div class="sa-block" v-if="choose === 2">
              <el-table :data="unDelList" max-height="800" v-loading="isUnDelLoading">
                <el-table-column prop="" label="Address" align="left"></el-table-column>
                <el-table-column prop="" label="Amount" align="left"></el-table-column>
                <el-table-column prop="" label="Block" align="left"></el-table-column>
                <el-table-column prop="" label="End Time" align="left"></el-table-column>
              </el-table>
            </div>
            <div class="sa-block" v-if="choose === 3">
              <el-table :data="delRewardList" max-height="800" v-loading="isReWardLoading">
                <el-table-column prop="" label="Address" align="left"></el-table-column>
                <el-table-column prop="" label="Amount" align="right"></el-table-column>
              </el-table>
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
                  <span v-if="scope.row.fromAddress === addr">{{scope.row.fromAddr}}</span>
                  <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddr}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="Amount" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
              <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                <template slot-scope="scope">
                  <span v-if="scope.row.toAddress === addr">{{scope.row.toAddr}}</span>
                  <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{scope.row.toAddr}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
              <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>
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
    name: "StatsDetail",
    data() {
      return {
        addr: this.$route.params.addr,
        choose: 0,
        addrInfo: {},
        tabList: ['Assets','Delegations','Unbonding Delegations','Delegator Rewards'],
        delList: [],
        unDelList: [],
        delRewardList: [],
        txList: [],
        isInfoLoading: true,
        isDelLoading: false,
        isUnDelLoading: false,
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
    watch: {
      choose(val) {
        switch (val) {
          case 0:
            this.getAddrDetail();
            break;
          case 1:
            this.getDel();
            break;
          case 2:
            this.getUnDel();
            break;
          case 3:
            this.getDelReward();
            break;
        }
      },
    },
    methods: {
      getAddrDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/account/detail',{params:{address:this.addr}}).then(res => {
          this.addrInfo = res.data;
          this.addrInfo.name = this.addrInfo.name === '' ? "/" : this.addrInfo.name;
          this.addrInfo.balance = this.addrInfo.available + this.addrInfo.delegated + this.addrInfo.unbonding;
          this.addrInfo.balance = transAmount(this.addrInfo.balance) + ' INT';
          this.addrInfo.time = this.$moment(this.addrInfo.createtime).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getAddrTx() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/addresstx',{params:{address:this.addr,pageNo:this.currentPage,pageSize:'10'}}).then(res => {
          this.total = res.data.count;
          this.isPageShow = this.total > 10;
          this.txList = res.data.list;
          this.txList.forEach(item => {
            item.time = this.$moment(item.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
            item.status = statusType(item.status);
            item.amount = toDecimal4NoZero(item.value);
            item.amount = transAmount(item.amount);
            item.txUrl = '/transfer/transferdetail/' + item.hash;
            item.blockUrl = '/blockchain/blockdetail/' + item.blockNumber;
            item.fAddrUrl = '/stats/statsdetail/' + item.fromAddress;
            item.tAddrUrl = '/stats/statsdetail/' + item.toAddress;
            item.fromAddr = addrHide(item.fromAddress);
            item.toAddr = addrHide(item.toAddress);
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
      getUnDel() {

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

  .sDetail .sc-asset {
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-radius:4px;
    border:1px solid rgb(230,230,230);
  }

  .sDetail .sc-asset .sa-t {
    height: 60px;
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 4px 4px 0 0;
  }

  .sc-asset .sa-t .sa-tab {
    display: inline-block;
    padding: 0 30px;
    height: 60px;
    line-height: 56px;
    border-top: 4px solid transparent;
    font-size: 16px;
    cursor: pointer;
    font-weight: 400;
  }

  .sc-asset .sa-t .sa-tab:first-of-type {
    border-radius: 4px 0 0 0;
  }

  .sc-asset .sa-t .sa-tab:hover {
    color: #ed303b;
  }

  .sc-asset .sa-t .sa-tab-choose {
    color: #ed303b;
    border-top-color: #ed303b;
    background-color: #fff;
  }

  .sDetail .sc-asset .sa-c {
    width: 100%;
    background-color: #fff;
  }

  .sc-asset .sa-c .sa-block {
    padding: 20px 15px 40px;
    border-radius: 0 0 4px 4px;
  }

  .sc-asset .sa-c .sa-asset {
    padding: 20px 0 40px 25px;
  }

  .sc-asset .sa-c .sa-group {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
  }

  .sa-group .sg-i {
    width: 150px;
    font-weight: 700;
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
    font-size: 24px;
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
