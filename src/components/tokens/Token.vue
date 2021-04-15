<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">
        Token
        <span class="sd-symbol">{{tokenInfo.symbol}}</span>
      </div>
      <div class="sd-c">
        <div class="sc-token">
          <div class="sc-asset">
            <!--          <div class="sa-t">-->
            <!--            <div class="sa-tab" v-for="(item,index) in tabList" :class="{'sa-tab-choose': choose === index}" @click="choose = index"><span>{{item}}</span></div>-->
            <!--          </div>-->
            <div class="sa-c">
              <div class="sa-t">
                  <span class="sa-tt">Overview</span>
              </div>
              <div class="sa-block sa-asset" v-loading="isInfoLoading">
                <div class="sa-group">
                  <div class="sg-i"><span>Price :</span></div>
                  <div class="sg-ii"><span>{{tokenInfo.price}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Total Supply :</span></div>
                  <div class="sg-ii"><span>{{tokenInfo.totalSupply}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Holders :</span></div>
                  <div class="sg-ii"><span>{{tokenInfo.holders}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Transfers :</span></div>
                  <div class="sg-ii"><span>{{tokenInfo.transfers}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="sc-asset">
            <!--          <div class="sa-t">-->
            <!--            <div class="sa-tab" v-for="(item,index) in tabList" :class="{'sa-tab-choose': choose === index}" @click="choose = index"><span>{{item}}</span></div>-->
            <!--          </div>-->
            <div class="sa-c">
              <div class="sa-t">
                <span class="sa-tt">Summary</span>
              </div>
              <div class="sa-block sa-asset" v-loading="isInfoLoading">
                <div class="sa-group">
                  <div class="sg-i"><span>Contract :</span></div>
                  <div class="sg-ii"><span>{{tokenInfo.contract}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Decimals :</span></div>
                  <div class="sg-ii"><span>{{tokenInfo.decimals}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Official Site :</span></div>
                  <div class="sg-ii"><a :href="tokenInfo.officialSite" target="_blank" class="sc-url">{{tokenInfo.officialSite}}</a></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Social Profiles :</span></div>
                  <div class="sg-ii">
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.socialProfiles.email" :href="'mailto:' + tokenInfo.socialProfiles.email">
                          <el-tooltip effect="dark"
                                      :content="'Email: ' + tokenInfo.socialProfiles.email"
                                      placement="top">
                            <span class="fas fa-envelope-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.socialProfiles.reddit" :href="tokenInfo.socialProfiles.reddit" target="_blank">
                          <el-tooltip effect="dark"
                                      :content="'Reddit: ' + tokenInfo.socialProfiles.reddit"
                                      placement="top">
                            <span class="fab fa-reddit-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.socialProfiles.faceBook" :href="tokenInfo.socialProfiles.faceBook" target="_blank">
                          <el-tooltip effect="dark"
                                      :content="'FaceBook: ' + tokenInfo.socialProfiles.faceBook"
                                      placement="top">
                            <span class="fab fa-facebook-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.socialProfiles.twitter" :href="tokenInfo.socialProfiles.twitter">
                          <el-tooltip effect="dark"
                                      :content="'Twitter: ' + tokenInfo.socialProfiles.twitter"
                                      placement="top">
                            <span class="fab fa-twitter-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.socialProfiles.cmc" :href="tokenInfo.socialProfiles.cmc">
                          <el-tooltip effect="dark"
                                      :content="'CoinMarketCap: ' + tokenInfo.socialProfiles.cmc"
                                      placement="top">
                            <span class="fas fa-file-alt"></span>
                          </el-tooltip>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="sc-tx">
          <div class="stx-t">
            <div class="st-l"><span>Transactions</span><span class="st-li">{{total}}Txs</span></div>
            <div class="st-r" v-if="isPageShow">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="size"
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
  import BigNumber from 'bignumber.js'
  export default {
    name: "StatsDetail",
    data() {
      return {
        addr: this.$route.params.address,
        tokenInfo: {
          name: 'BitCoin',
          symbol: 'BTC',
          price: '$8546.87',
          totalSupply: 21000000 + ' BTC',
          holders: 200,
          transfers: 30000,
          contract: '0x2b14a6b2649a28b5fc90c42bf90f5242ea82f66a',
          decimals: 18,
          officialSite: 'https://www.intchain.io',
          socialProfiles: {
            email: 'int@intchain.io',
            reddit: 'https://www.reddit.com/r/intchain',
            faceBook: 'https://www.facebook.com/intchain',
            twitter: 'https://twitter.com/intchain',
            whitePaper: 'https://intchain.io/whitepaper/INT-whitepaper-release-EN.pdf',
            cmc: 'https://coinmarkercap.com/int',
          }
        },
        choose: 0,
        addrInfo: {},
        tabList: ['Assets','Delegations','UnDelegations','Delegate Rewards'],
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
        size: 10,
        total: 0,
        isPageShow: false,
        delPage: {
          currentPage: 1,
          page: 1,
          size: 5,
          total: 0,
          isPageShow: false,
        }
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
          this.addrInfo.balance = transAmount(this.addrInfo.balance) + ' INT';
          this.addrInfo.delegated = transAmount(this.addrInfo.delegate_balance) + ' INT';
          this.addrInfo.pendingRefund = transAmount(this.addrInfo.pending_refund_balance) + ' INT';
          this.addrInfo.reward = transAmount(this.addrInfo.reward_balance) + ' INT';
          this.addrInfo.time = this.$moment(this.addrInfo.createtime).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getAddrTx() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/addresstx',{params:{address:this.addr, pageNo:this.currentPage, pageSize:this.size}}).then(res => {
          this.total = res.data.count;
          this.isPageShow = this.total > 10;
          this.txList = res.data.list;
          this.txList.forEach(item => {
            item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            item.status = statusType(item.status);
            item.amount = toDecimal4NoZero(item.value);
            item.amount = transAmount(item.amount);
            item.txUrl = `/transfer/transferdetail/${item.hash}`;
            item.blockUrl =  `/blockchain/blockdetail/${item.blockNumber}/1`;
            item.fAddrUrl = `/stats/statsdetail/${item.fromAddress}`;
            item.tAddrUrl =  `/stats/statsdetail/${item.toAddress}`;
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
        this.getDel();
      },
      getDel() {
        this.isDelLoading = true;
        this.$axios.get('/api/account/delegations', {params: {address: this.addr, pageNo:this.delPage.currentPage, pageSize:this.delPage.size}}).then( res => {
          this.delPage.total = res.data.count;
          this.delPage.isPageShow = this.delPage.total > this.delPage.size;
          this.delList = res.data.list;
          // console.log('delegations', res.data)
          this.delList.forEach((v, i) => {
            v.addUrl = `/stats/statsdetail/${v.candidate}`;
          });
        });

        this.isDelLoading = false;
      },
      handleDelCurrentChange(val) {
        this.isDelLoading = true;
        this.delPage.currentPage = val;
        this.delPage.page = val;
        this.getDel();
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

  .sDetail .sd-t .sd-symbol {
    font-size: 80%;
    font-weight: 600;
    color: #77838f;
  }

  .sDetail .sc-token .clearfix{
    clear: both;
  }

  .sDetail .sc-asset {
    float: left;
    width: 50%;
    margin-bottom: 30px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .sDetail .sc-asset .sa-c {
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-radius: 5px;
    border: 1px solid rgb(230,230,230);
    background-color: #fff;
  }

  .sDetail .sc-asset .sa-t {
    height: 52px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid rgb(230,230,230);
  }
  .sDetail .sc-asset .sa-t .sa-tt {
    display: block;
    padding: 15px;
    /*line-height: ;*/
    font-weight: bold;
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
    /*background-color: #fff;*/
  }

  .sc-asset .sa-c .sa-block {
    padding: 20px 15px 40px;
    border-radius: 0 0 4px 4px;
  }

  .sc-asset .sa-c .sa-block .sa-r {
    height: 45px;
    padding: 10px 0 10px;
    text-align: right;
  }

  .sc-asset .sa-c .sa-asset {
    padding: 15px;
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

  .sa-group .sg-ii {
    font-weight: 500;
  }

  .sg-ii .list-inline {
    list-style: none;
  }

  .sg-ii .list-inline .list-inline-item {
    display: inline-block;
    margin-right: 15px;
    font-size: 16px;
  }

  .sa-group .sg-ii .sg-icon {
    color: #77838f;
  }

  .sa-group .sg-ii .sg-icon:hover {
    color: #ed303b;
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

  .sc-url {
    color: #ed303b;
    cursor: pointer;
  }

  .sc-url:hover {
    text-decoration: underline;
  }
</style>
