<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">{{isContract ? "Contract " + addr : "Address " + addr}}</div>
      <div class="sd-c">
        <div class="sc-asset">
          <div class="sa-t">
            <div class="sa-tab" v-for="(item,index) in tabList" :class="{'sa-tab-choose': choose === index}" @click="choose = index"><span>{{item}}</span></div>
          </div>
          <div class="sa-c">
            <div class="sa-block sa-asset" v-if="choose === 0" v-loading="isInfoLoading">
              <div class="sa-group">
                <div class="sg-i"><span>{{isContract ? "Contract :" : "Address :"}}</span></div>
                <div class="sg-ii"><span>{{addrInfo.address}}</span></div>
              </div>
              <div class="sa-group">
                <div class="sg-i"><span>Balance :</span></div>
                <div class="sg-ii"><span>{{addrInfo.balance}}</span></div>
              </div>
              <template v-if="isContract">
                <div class="sa-group">
                  <div class="sg-i"><span>Contract Creator :</span></div>
                  <div class="sg-ii">
                    <span>
                      {{addrInfo.delegated}}
                    </span>
                    <span @click="toAddrDetail(addrInfo.creatorAddrUrl)" class="sc-url">{{addrInfo.creatorAddr}}</span>
                    at tx
                    <router-link tag="span" :to="addrInfo.creatHashUrl" type="text" class="sc-url">{{addrInfo.creatHash}}</router-link>
                  </div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Token Tracker :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.tokenTracker}}</span></div>
                </div>
              </template>
              <template v-else>
                <div class="sa-group">
                  <div class="sg-i"><span>Delegate :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.delegated}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Reward :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.reward}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Pending Refund :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.pendingRefund}}</span></div>
                </div>
              </template>
              <div class="sa-group">
                <div class="sg-i"><span>Token :</span></div>
                <div class="sg-ii">
                  <template>
                    <el-select
                      v-model="tokenCount"
                      placeholder="请选择"
                      class="sg-sl"
                      @change="onTokenChange">
                      <el-option-group
                        v-for="group in tokenList"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.tokens"
                          :key="item.address"
                          :label="item.name + ' (' + item.balance + ' ' + item.symbol + ')'"
                          :value="item.address">
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </template>
                </div>
              </div>
<!--              <div class="sa-group">-->
<!--                <div class="sg-i"><span>Create Time :</span></div>-->
<!--                <div class="sg-ii"><span>{{addrInfo.time}}</span></div>-->
<!--              </div>-->
            </div>
            <div class="sa-block sa-del" v-if="choose === 1">
              <el-table :data="delList" max-height="800" v-loading="isDelLoading">
                <el-table-column label="Address" align="left">
                  <template slot-scope="scope">
                    <span v-if="scope.row.candidate === addr">{{scope.row.candidate}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.addUrl)">{{scope.row.candidate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" ></el-table-column>
<!--                <el-table-column prop="shares" label="Shares" align="left">-->
<!--                  <template slot-scope="scope">-->
<!--                    <span>{{scope.row.shares}}</span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="Block" align="left">-->
<!--                  <template slot-scope="scope">-->
<!--                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.block}}</router-link>-->
<!--                  </template>-->
<!--                </el-table-column>-->
              </el-table>
              <div class="sa-r" v-if="delPage.isPageShow">
                <el-pagination
                  @current-change="handleDelCurrentChange"
                  :current-page.sync="delPage.currentPage"
                  :page-size="delPage.size"
                  :total="delPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="sa-block sa-undel" v-if="choose === 2">
              <el-table :data="unDelList" max-height="800" v-loading="isUnDelLoading">
                <el-table-column label="Address" align="left" width="450">
                  <template slot-scope="scope">
                    <span v-if="scope.row.candidate === addr">{{scope.row.candidate}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.addUrl)">{{scope.row.candidate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount"  align="left"></el-table-column>
                <el-table-column label="Block" align="left">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.block}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="Timestamp" align="left"></el-table-column>
              </el-table>
              <div class="sa-r" v-if="unDelPage.isPageShow">
                <el-pagination
                  @current-change="handleUnDelCurrentChange"
                  :current-page.sync="unDelPage.currentPage"
                  :page-size="unDelPage.size"
                  :total="unDelPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="sa-block sa-reward" v-if="choose === 3">
              <el-table :data="delRewardList" max-height="800" v-loading="isReWardLoading">
                <el-table-column label="Address" align="left">
                  <template slot-scope="scope">
                    <span v-if="scope.row.candidate === addr">{{scope.row.candidate}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.addUrl)">{{scope.row.candidate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="reward" label="Reward" align="left"></el-table-column>
              </el-table>
              <div class="sa-r" v-if="delRewardPage.isPageShow">
                <el-pagination
                  @current-change="handleDelRewardCurrentChange"
                  :current-page.sync="delRewardPage.currentPage"
                  :page-size="delRewardPage.size"
                  :total="delRewardPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-tx">
          <div class="stx-t">
            <div class="st-l">
              <div class="st-tab" v-for="(item,index) in txTagList" :class="{'st-tab-choose': activeName === index}" @click="activeName = index"><span>{{item}}</span></div>
            </div>
          </div>
          <div class="stx-c">
            <div class="stx-pane" v-show="activeName === 0">
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
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddr}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
                <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <template v-if="scope.row.toAddress === null">
                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress === addr">{{scope.row.toAddr}}</span>
                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">
                    {{scope.row.toAddr}}
                  </span>
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
            <div class="stx-pane" v-show="activeName === 1">
              <div class="st-r" v-if="IIP20Page.isIIP20TxPageShow">
                <el-pagination
                  @current-change="handleIIP20Change"
                  :current-page.sync="IIP20Page.currentPage"
                  :page-size="IIP20Page.size"
                  :total="IIP20Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
              <el-table :data="iip20Txs" v-loading="isTxLoading">
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
                    <template v-if="scope.row.toAddress === null">
                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress === addr">{{scope.row.toAddr}}</span>
                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">
                    {{scope.row.toAddr}}
                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
                <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>
                <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
                <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
              </el-table>
              <div class="st-r" v-if="IIP20Page.isIIP20TxPageShow">
                <el-pagination
                  @current-change="handleIIP20Change"
                  :current-page.sync="IIP20Page.currentPage"
                  :page-size="IIP20Page.size"
                  :total="IIP20Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="stx-pane" v-show="activeName === 2">
              <div class="st-r" v-if="IIP721Page.isIIP721TxPageShow">
                <el-pagination
                  @current-change="handleIIP721Change"
                  :current-page.sync="IIP721Page.currentPage"
                  :page-size="IIP721Page.size"
                  :total="IIP721Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
              <el-table :data="iip721Txs" v-loading="isTxLoading">
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
                    <template v-if="scope.row.toAddress === null">
                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress === addr">{{scope.row.toAddr}}</span>
                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">
                    {{scope.row.toAddr}}
                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
                <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>
                <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
                <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
              </el-table>
              <div class="st-r" v-if="IIP721Page.isIIP721TxPageShow">
                <el-pagination
                  @current-change="handleIIP721Change"
                  :current-page.sync="IIP721Page.currentPage"
                  :page-size="IIP721Page.size"
                  :total="IIP721Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="stx-pane" v-show="activeName === 3">

            </div>
            <div class="stx-pane" v-show="activeName === 4">

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
    name: "StatsDetail",
    data() {
      return {
        addr: this.$route.params.addr,
        choose: 0,
        addrInfo: {},
        isContract: false,
        tabList: [],
        delList: [],
        unDelList: [],
        delRewardList: [],
        txList: [],
        isInfoLoading: true,
        isDelLoading: false,
        isUnDelLoading: false,
        isReWardLoading: false,
        isTxLoading: false,
        isTokenTxLoading: false,
        over: true,
        currentPage: 1,
        page: 1,
        size: 25,
        total: 0,
        isPageShow: false,
        delPage: {
          currentPage: 1,
          page: 1,
          size: 5,
          total: 0,
          isPageShow: false,
        },
        unDelPage: {
          currentPage: 1,
          page: 1,
          size: 5,
          total: 0,
          isPageShow: false,
        },
        delRewardPage: {
          currentPage: 1,
          page: 1,
          size: 5,
          total: 0,
          isPageShow: false,
        },
        tokenList: [{
          label: 'IIP-20 Tokens',
          tokens: []
        }, {
          label: 'IIP-721 Tokens',
          tokens: []
        }],
        tokenCount: 0,
        txTagList: ['Transactions', 'IIP20 Token Txs', 'IIP721 Token Txs'],
        activeName: 0,
        tokenTxList: [],
        iip20Txs: [],
        iip721Txs: [],
        IIP20Page: {
          currentPage: 1,
          page: 1,
          size: 25,
          total: 0,
          isIIP20TxPageShow: false,
        },
        IIP721Page: {
          currentPage: 1,
          page: 1,
          size: 25,
          total: 0,
          isIIP721TxPageShow: false,
        },
      }
    },
    created() {
      this.currentPage = +this.page;
      this.getAddrDetail();
      this.getAddrTx();
      this.getTokenTx();
      this.getTokens(this.addr);
    },
    mounted() {

    },
    computed: {

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
      iip20Txs(val) {
        this.IIP20Page.isIIP20TxPageShow = val.length > 25;
        this.IIP20Page.total = val.length;
      },
      iip721Txs(val) {
        this.IIP721Page.isIIP721TxPageShow = val.length > 25;
        this.IIP721Page.total = val.length;
      },
    },
    methods: {
      getAddrDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/account/detail',{params:{address:this.addr}}).then(res => {
          // console.log('api account detail', res.data);
          this.addrInfo = res.data;
          let keys = Object.keys(res.data);
          if (keys.length === 0) {
            this.addrInfo.address = this.addr;
            this.addrInfo.name = this.addrInfo.name === '' ? "/" : this.addrInfo.name;
            this.addrInfo.balance = 0 + ' INT';
            this.addrInfo.delegated = 0 + ' INT';
            this.addrInfo.pendingRefund = 0 + ' INT';
            this.addrInfo.reward = 0 + ' INT';
            this.addrInfo.time = '/';
          } else {
            if (res.data.isContract) {
              this.isContract = true;
              this.tabList = ['Overview'];
              this.txTagList.push('Contract');
              this.addrInfo.address = this.addrInfo.contract_address;
              this.addrInfo.balance = this.addrInfo.balance ? transAmount(this.addrInfo.balance) + ' INT' : 0 + ' INT';
              this.addrInfo.creatorAddr = hideEnd(this.addrInfo.creator_address);
              this.addrInfo.creatorAddrUrl = `/address/${this.addrInfo.creator_address}`;
              this.addrInfo.creatHash = hideEnd(this.addrInfo.hash);
              this.addrInfo.creatHashUrl = `/tx/${this.addrInfo.hash}`;
              this.addrInfo.tokenTracker = this.addrInfo.contract_type !== 0 ? `${this.addrInfo.name}(${this.addrInfo.symbol})` : "";
              this.addrInfo.tokenTrackerUrl = this.addrInfo.contract_type !== 0 ? `/token/${this.addrInfo.contract_type}` : "";
            }else {
              this.tabList = ['Assets','Delegations','UnDelegations','Delegate Rewards'];
              this.addrInfo = res.data;
              this.addrInfo.name = this.addrInfo.name === '' ? "/" : this.addrInfo.name;
              this.addrInfo.balance = transAmount(this.addrInfo.balance) + ' INT';
              this.addrInfo.delegated = transAmount(this.addrInfo.delegate_balance) + ' INT';
              this.addrInfo.pendingRefund = transAmount(this.addrInfo.pending_refund_balance) + ' INT';
              this.addrInfo.reward = transAmount(this.addrInfo.reward_balance) + ' INT';
              // this.addrInfo.time = this.$moment(this.addrInfo.createtime).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            }
          }
          this.isInfoLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getAddrTx() {
        this.isTxLoading = true;
        this.$axios.get('/api/tx/addresstx',{params:{address:this.addr, pageNo:this.currentPage, pageSize:this.size}}).then(res => {
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
            item.tAddrUrl =  item.toAddress === null ? `/address/${item.contractAddress}` : `/address/${item.toAddress}`;
            item.fromAddr = item.fromAddress;
            item.toAddr = item.toAddress === null ? item.contractAddress : item.toAddress;
          });
          this.isTxLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },

      getTokenTx() {
        this.isTokenTxLoading = true;
        this.$axios.get('/api/tx/tokentx',{params:{address:this.addr, pageNo:this.currentPage, pageSize:this.size}}).then(res => {
          this.total = res.data.count;
          this.tokenTxList = res.data.list;
          this.tokenTxList.forEach(item => {
            item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            item.status = statusType(item.status);
            item.amount = toDecimal4NoZero(item.value);
            item.amount = transAmount(item.amount);
            item.txUrl = `/tx/${item.hash}`;
            item.blockUrl =  `/block/${item.blockNumber}/1`;
            item.fAddrUrl = `/address/${item.fromAddress}`;
            item.tAddrUrl =  item.toAddress === null ? `/address/${item.contractAddress}` : `/address/${item.toAddress}`;
            item.fromAddr = addrHide(item.fromAddress);
            item.toAddr = item.toAddress === null ? addrHide(item.contractAddress) : addrHide(item.toAddress);
            if (item.contractType === 1) {
              this.iip20Txs.push(item);
            }else if (item.contractType === 2) {
              this.iip721Txs.push(item)
            }
          });
          this.isTokenTxLoading = false;
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

      handleIIP20Change(val) {
        this.isTokenTxLoading = true;
        this.IIP20Page.currentPage = val;
        this.IIP20Page.page = val;
        this.getTokenTx()
      },

      handleIIP721Change(val) {
        this.isTokenTxLoading = true;
        this.IIP721Page.currentPage = val;
        this.IIP721Page.page = val;
        this.getTokenTx()
      },

      toAddrDetail(url) {
        this.$router.push(url);
        this.addr = this.$route.params.addr;
        this.page = 1;
        this.currentPage = this.page;
        this.isContract = false;
        this.tabList = ['Assets','Delegations','UnDelegations','Delegate Rewards'];
        this.getAddrDetail();
        this.getAddrTx();
        this.getTokens(this.addr);
        // this.getDel();
        // this.getUnDel();
        // this.getDelReward();
      },
      getDel() {
        this.isDelLoading = true;
        this.$axios.get('/api/account/delegations', {params: {address: this.addr, pageNo:this.delPage.currentPage, pageSize:this.delPage.size}}).then( res => {
          this.delPage.total = res.data.count;
          this.delPage.isPageShow = this.delPage.total > this.delPage.size;
          this.delList = res.data.list;
          // console.log('delegations', res.data)
          this.delList.forEach((v, i) => {
            v.addUrl = `/address/${v.candidate}`;
          });
        }).catch(err => {
          console.log(err);
        });
        this.isDelLoading = false;
      },
      handleDelCurrentChange(val) {
        this.isDelLoading = true;
        this.delPage.currentPage = val;
        this.delPage.page = val;
        this.getDel();
      },
      getUnDel() {
        this.isUnDelLoading = true;
        this.$axios.get('/api/account/undelegations', { params: {address: this.addr, pageNo:this.unDelPage.currentPage, pageSize:this.unDelPage.size}}).then( res => {
          this.unDelPage.total = res.data.count;
          this.unDelPage.isPageShow = this.unDelPage.total > this.unDelPage.size;
          this.unDelList = res.data.list;
          this.unDelList.forEach( v => {
            let input = JSON.parse(v.unlockInput);
            v.amount = new BigNumber(input.amount, 16).div(new BigNumber(Math.pow(10, 18))).toString();
            v.blockUrl = `/block/${v.block}/1`;
            v.addUrl = `/address/${v.candidate}`;
            v.time = this.$moment(v.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + 'UTC';
          });
        }).catch(err => {
          console.log(err);
        });
        this.isUnDelLoading = false;
      },
      handleUnDelCurrentChange(val) {
        this.isUnDelLoading = true;
        this.unDelPage.currentPage = val;
        this.unDelPage.page = val;
        this.getUnDel();
      },
      getDelReward() {
        this.isReWardLoading = true;
        this.$axios.get('/api/account/delrewards', {params: {address: this.addr, pageNo:this.delRewardPage.currentPage, pageSize:this.delRewardPage.size}}).then( res => {
          this.delRewardPage.total = res.data.count;
          this.delRewardPage.isPageShow = this.delRewardPage.total > this.delRewardPage.size;
          this.delRewardList = res.data.list;
          this.delRewardList.forEach((v, i) => {
            v.addUrl = `/address/${v.candidate}`;
          });
        }).catch(err => {
          console.log(err);
        });
        this.isReWardLoading = false;
      },
      handleDelRewardCurrentChange(val) {
        this.isReWardLoading = true;
        this.delRewardPage.currentPage = val;
        this.delRewardPage.page = val;
        this.getDelReward();
      },

      getTokens() {
        this.$axios.get('/api/token/tokens', { params: {holderAddress: this.addr}}).then(res => {
          let r = res.data.list;
          this.tokenCount = res.data.count;
          r.forEach( val => {
            if (val.type === 1) {
              this.tokenList[0].tokens.push({
                name: val.name,
                symbol: val.symbol,
                balance: transAmount(val.amount),
                address: val.token_address
              });
            }

            if (val.type === 2) {
              this.tokenList[1].tokens.push({
                name: val.name,
                symbol: val.symbol,
                balance: transAmount(val.amount),
                address: val.token_address
              });
            }
          });
        })
      },

      onTokenChange(val) {
        // console.log('token change', val)
        this.$router.push(`/token/${val}`);
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

  .sc-asset .sa-c .sa-block .sa-r {
    height: 45px;
    padding: 10px 0 10px;
    text-align: right;
  }

  .sc-asset .sa-c .sa-asset {
    padding: 25px;
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

  .sg-ii .sg-sl {
    width: 350px;
  }
</style>
