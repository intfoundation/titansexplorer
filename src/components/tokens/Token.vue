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
            <div class="sa-c">
              <div class="sa-t">
                <span class="sa-tt">Summary</span>
              </div>
              <div class="sa-block sa-asset" v-loading="isInfoLoading">
                <div class="sa-group">
                  <div class="sg-i"><span>Contract :</span></div>
                  <div class="sg-ii">
                      <router-link tag="span" :to="tokenInfo.addrUrl" type="text" class="sc-url">{{tokenInfo.contract}}</router-link>
                  </div>
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
                           v-if="tokenInfo.email" :href="'mailto:' + tokenInfo.email">
                          <el-tooltip effect="dark"
                                      :content="'Email: ' + tokenInfo.email"
                                      placement="top">
                            <span class="fas fa-envelope-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.reddit" :href="tokenInfo.reddit" target="_blank">
                          <el-tooltip effect="dark"
                                      :content="'Reddit: ' + tokenInfo.reddit"
                                      placement="top">
                            <span class="fab fa-reddit-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.faceBook" :href="tokenInfo.faceBook" target="_blank">
                          <el-tooltip effect="dark"
                                      :content="'FaceBook: ' + tokenInfo.faceBook"
                                      placement="top">
                            <span class="fab fa-facebook-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.twitter" :href="tokenInfo.twitter">
                          <el-tooltip effect="dark"
                                      :content="'Twitter: ' + tokenInfo.twitter"
                                      placement="top">
                            <span class="fab fa-twitter-square"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.whitePaper" :href="tokenInfo.whitePaper">
                          <el-tooltip effect="dark"
                                      :content="'WhitePaper: ' + tokenInfo.whitePaper"
                                      placement="top">
                            <span class="fas fa-file-alt"></span>
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.cmc" :href="tokenInfo.cmc">
                          <el-tooltip effect="dark"
                                      :content="'CoinMarketCap: ' + tokenInfo.cmc"
                                      placement="top">
                            <img src="../../assets/cmc.svg" width="14" alt="">
                          </el-tooltip>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a class="sg-icon"
                           v-if="tokenInfo.coingecko" :href="tokenInfo.coingecko">
                          <el-tooltip effect="dark"
                                      :content="'Coingecko: ' + tokenInfo.coingecko"
                                      placement="top">
                            <img src="../../assets/coingecko.svg" width="14" alt="">
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
            <div class="st-l">
              <div class="st-tab" v-for="(item,index) in txTagList" :class="{'st-tab-choose': activeName === index}" @click="activeName = index"><span>{{item}}</span></div>
            </div>
          </div>
          <div class="stx-c">
            <div class="stx-pane" v-if="activeName === 0">
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
                    <router-link tag="span"  v-else class="sc-url" :to="scope.row.fAddrUrl">{{scope.row.fromAddr}}</router-link>
<!--                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddr}}</span>-->
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
                <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <template v-if="scope.row.toAddress === null">
<!--                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>-->
                      <router-link tag="span" class="sc-url" :to="scope.row.tAddrUrl">{{"Contract Creation"}}</router-link>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress === addr">{{scope.row.toAddr}}</span>
                      <router-link v-else class="sc-url" :to="scope.row.tAddrUrl">{{scope.row.toAddr}}</router-link>
<!--                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{scope.row.toAddr}}</span>-->
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
                <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>
                <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
                <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
              </el-table>
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
            <div class="stx-pane" v-if="activeName === 1">
              <div class="st-r" v-if="isPageShow">
                <el-pagination
                  @current-change="handleHolersChange"
                  :current-page.sync="holderPage.currentPage"
                  :page-size="holderPage.size"
                  :total="holderPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
              <el-table :data="holdersList" v-loading="isHolderLoading">
                <el-table-column prop="i" label="Rank" :key="Math.random()" width="100"></el-table-column>
                <el-table-column label="Address" align="center" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <span v-if="scope.row.address === addr">{{scope.row.address}}</span>
                    <router-link tag="span"  v-else class="sc-url" :to="scope.row.addrUrl">{{scope.row.address}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" align="center"></el-table-column>
                <el-table-column prop="percent" label="Percentage" align="center"></el-table-column>
              </el-table>
              <div class="st-r" v-if="isPageShow">
                <el-pagination
                  @current-change="handleHolersChange"
                  :current-page.sync="holderPage.currentPage"
                  :page-size="holderPage.size"
                  :total="holderPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="stx-pane" v-if="activeName === 2">

            </div>
            <div class="stx-pane" v-if="activeName === 3">

            </div>
            <div class="stx-pane" v-if="activeName === 4">

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
    name: "Token",
    data() {
      return {
        addr: this.$route.params.address,
        tokenInfo: {
          addrUrl: "",
          // name: 'BitCoin',
          // symbol: 'BTC',
          // price: '$8546.87',
          // totalSupply: 21000000 + ' BTC',
          // holders: 200,
          // transfers: 30000,
          // contract: '0x2b14a6b2649a28b5fc90c42bf90f5242ea82f66a',
          // decimals: 18,
          // officialSite: 'https://www.intchain.io',
          // email: 'int@intchain.io',
          // reddit: 'https://www.reddit.com/r/intchain',
          // faceBook: 'https://www.facebook.com/intchain',
          // twitter: 'https://twitter.com/intchain',
          // whitePaper: 'https://intchain.io/whitepaper/INT-whitepaper-release-EN.pdf',
          // cmc: 'https://coinmarkercap.com/int',
          // coingecko: 'https://www.coingecko.com/en/coins/int-coin',
        },
        txList: [],
        isInfoLoading: true,
        isTxLoading: false,
        isHolderLoading: false,
        over: true,
        currentPage: 1,
        page: 1,
        size: 20,
        total: 0,
        isPageShow: false,
        tokenList: [{
          label: 'IIP-20 Tokens',
          tokens: []
        }, {
          label: 'IIP-721 Tokens',
          tokens: []
        }],
        tokenCount: 0,
        txTagList: ['Transfers', 'Holders'],
        activeName: 0,
        holdersList: [],
        holderPage: {
          currentPage: 1,
          page: 1,
          size: 20,
          total: 0,
        }
      }
    },
    created() {
      this.currentPage = +this.page;
      this.getTokenInfo();
      this.getTokenTx();
    },
    mounted() {

    },
    watch: {
      activeName(val) {
        switch(val) {
          case 0:
            this.getTokenTx();
            break;
          case 1:
            this.getTokenHolders();
            break;
          case 2:
            break;
        }
      }
    },
    methods: {
      getTokenInfo() {
        this.isInfoLoading = true;
        this.$axios.get('/api/token/list', { params: { pageNo: this.page, pageSize: this.pageSize, contract: this.addr }}).then(res => {
          this.tokenInfo = res.data.list[0];
          this.tokenInfo.totalSupply = this.tokenInfo.totalSupply + " "+ this.tokenInfo.symbol;
          this.tokenInfo.contract = this.tokenInfo.contract_address;
          this.tokenInfo.addrUrl = '/address/' + this.tokenInfo.contract_address;
          this.tokenInfo.price = "$" + this.tokenInfo.price;
          this.isInfoLoading = false;
        })
      },

      getTokenTx() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/tokentx', {params:{address:this.addr, pageNo:this.currentPage, pageSize:this.size}}).then(res => {
          this.total = res.data.count;
          this.isPageShow = this.total > 25;
          this.txList = res.data.list;
          this.txList.forEach(item => {
            item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            item.status = statusType(item.status);
            item.amount = toDecimal4NoZero(item.value);
            item.amount = transAmount(item.amount);
            item.txUrl = `/tx/${item.hash}`;
            item.blockUrl =  `/block/${item.blockNumber}/1`;
            item.fAddrUrl = `/address/${item.fromAddress}`;
            item.tAddrUrl =  `/address/${item.toAddress}`;
            item.fromAddr = addrHide(item.fromAddress);
            item.toAddr = addrHide(item.toAddress);
          });
          this.isTxLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },

      getTokenHolders() {
        this.isHolderLoading = true;
        this.$axios.get('/api/token/holders', {params:{address:this.addr, pageNo:this.holderPage.currentPage, pageSize:this.holderPage.size}}).then(res => {
          this.holderPage.total = res.data.count;
          this.isPageShow = this.total > 25;
          this.holdersList = res.data.list;
          this.holdersList.forEach((val, index) => {
            val.i = ++index;
            val.address = val.holder_address;
            val.addrUrl = `/address/${val.holder_address}`;
            val.percent = res.data.totalSupply == 0 ? 0 : ((val.amount / (res.data.totalSupply) * 100).toFixed(2) + '%');
          });
          this.isHolderLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },

      handleCurrentChange(val) {
        this.isTxLoading = true;
        this.currentPage = val;
        this.page = val;
        this.getTokenTx()
      },

      handleHolersChange(val) {
        this.isHolderLoading = true;
        this.holderPage.currentPage = val;
        this.holderPage.page = val;
        this.getTokenHolders()
      }
      // toAddrDetail(url) {
      //   this.$router.push(url);
      //   this.addr = this.$route.params.addr;
      //   this.page = 1;
      //   this.currentPage = this.page;
      //   this.getAddrTx();
      // },
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
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: flex-end;*/
    /*margin-bottom: 10px;*/
  }

  .sc-tx .stx-t .st-l {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #e6e6e6;
    /*height: 45px;*/
  }

  .sc-tx .stx-t .st-l .st-tab {
    display: inline-block;
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    border-bottom: 2px solid transparent;
    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
    transition: .3s;
  }

  .sc-tx .stx-t .st-l .st-tab:hover {
    color: #ed303b;
  }

  .sc-tx .stx-t .st-l .st-tab-choose {
    color: #ed303b;
    border-bottom-color: #ed303b;
    background-color: #fff;
  }


  .sDetail .sc-tx .stx-c {
    padding: 0 15px 15px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid rgb(230,230,230);
    border-top: 0;
  }

  .sDetail .sc-tx .stx-c .st-r {
    float: right;
    margin: 15px 0;
  }

  .sDetail .sc-tx .stx-c:after {
    content:'';
    display: block;
    clear: both;
  }

  .sc-url {
    color: #ed303b;
    cursor: pointer;
  }

  .sc-url:hover {
    text-decoration: underline;
  }
</style>
