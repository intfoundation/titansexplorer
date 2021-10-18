<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">
        <div class="sd-t-i">Bridge</div>
        <div class="sd-t-ii">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            :total="total"
            layout="prev, pager, next, jumper"
            background>
          </el-pagination>
        </div>
<!--        <el-input-->
<!--          class="sd-t-iii"-->
<!--          placeholder="Hash or address"-->
<!--          suffix-icon="el-icon-search"-->
<!--          v-model="searchKey"-->
<!--        >-->
<!--        </el-input>-->
      </div>
      <div class="sd-c">
        <div class="sc-asset">
          <div class="sa-c">
            <div class="sa-block">
              <div class="sd-t-iii">
                <input type="text" placeholder="Hash / Address" v-model="searchKey" @keyup.enter="searchBridge">
                <!--          <i class="el-icon-search"></i>-->
              </div>
              <el-table :data="bridgeList" v-loading="isActLoading">
                <el-table-column prop="i" label="#" align="center" width="40" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="Address" align="center">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" :content="scope.row.from_address" placement="top">
                      <router-link tag="span" :to="scope.row.formUrl" class="al-url">{{ scope.row.from_address.substring(0, 6) + '...' + scope.row.from_address.substr(-4) }}</router-link>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="coin" label="Token" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="value" label="Amount" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="From" align="center" width="260">
                  <template slot-scope="scope">
                    <el-tooltip v-if="scope.row.fromChainUrl" class="item" effect="dark" :content="scope.row.hash" placement="top-end">
                      <a :href="scope.row.fromChainUrl" :class="{'al-url': scope.row.hash}" target="_blank">{{ scope.row.fromChain }}</a>
                    </el-tooltip>

                    <a v-else>{{ scope.row.fromChain }}</a>
                  </template>
                </el-table-column>
                <el-table-column label="To" align="center" width="260">
                  <template slot-scope="scope">
                    <el-tooltip v-if="scope.row.toChainUrl" class="item" effect="dark" :content="scope.row.ex_hash" placement="top-start">
                      <a :href="scope.row.toChainUrl" :class="{'al-url': scope.row.ex_hash}" target="_blank">{{ scope.row.toChain }}</a>
                    </el-tooltip>

                    <a v-else>{{ scope.row.toChain }}</a>
                  </template>
                </el-table-column>
<!--                <el-table-column prop="txStatus" label="Status" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>-->
                <el-table-column label="Status" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span v-bind:class="{'text-success': scope.row.status === 2}">{{scope.row.txStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="Time" align="center" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
              <div class="sd-t-ii">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pageSize"
                  :total="total"
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
    name: "bridgelist",
    data() {
      return {
        searchKey: '',
        bridgeList: [],
        isActLoading: false,
        currentPage: 1,
        page: this.$route.params.page || 1,
        total: 0,
        pageSize: 20,
        intExUrl: "https://test.titansexplorer.intchain.io/tx/",
        ethExUrl: "https://ropsten.etherscan.io/tx/",
        bscExUrl: "https://testnet.bscscan.com/tx/",
      }
    },
    created() {
    },
    mounted() {
      this.getBridgeList();
      this.getBridgeTimer();
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      getBridgeList (searchPage) {
        this.isActLoading = true;
        this.$axios.get('/api/bridge/list',{params:{ pageNo: searchPage ? searchPage : this.page, pageSize:this.pageSize, searchKey: this.searchKey }}).then(res => {
          this.bridgeList = res.data.list;
          this.total = res.data.count;
          this.currentPage = +this.page;
          this.bridgeList.forEach((a,index) => {
            a.i = index + 1;
            a.formUrl = '/address/' + a.from_address;
            a.txStatus = a.status === 2 ? "Success" : "Pending";
            switch (a.direction) {
              case 1:
                a.fromChainUrl = a.hash ? this.intExUrl + a.hash : "";
                a.fromChain = a.hash ? `INT Chain (${a.hash.substring(0, 6)}...${a.hash.substr(-4)})` : "INT Chain";
                a.toChainUrl = a.ex_hash ? this.ethExUrl + a.ex_hash : "";
                a.toChain = a.ex_hash ? `Ethereum (${a.ex_hash.substring(0, 6)}...${a.ex_hash.substr(-4)})` : "Ethereum";
                break;
              case 2:
                a.fromChainUrl = a.hash ? this.ethExUrl + a.hash : "";
                a.fromChain = a.hash ? `Ethereum (${a.hash.substring(0, 6)}...${a.hash.substr(-4)})` : "Ethereum";
                a.toChainUrl = a.ex_hash ? this.intExUrl + a.ex_hash : "";
                a.toChain = a.ex_hash ? `INT Chain (${a.ex_hash.substring(0, 6)}...${a.ex_hash.substr(-4)})` : "INT Chain";
                break;
              case 3:
                a.fromChainUrl = a.hash ? this.intExUrl + a.hash : "";
                a.fromChain = a.hash ? `INT Chain (${a.hash.substring(0, 6)}...${a.hash.substr(-4)})` : "INT Chain";
                a.toChainUrl = a.ex_hash ? this.bscExUrl + a.ex_hash : "";
                a.toChain = a.ex_hash ? `Binance Smart Chain (${a.ex_hash.substring(0, 6)}...${a.ex_hash.substr(-4)})` : "Binance Smart Chain";
                break;
              case 4:
                a.fromChainUrl = a.hash ? this.bscExUrl + a.hash : "";
                a.fromChain = a.hash ? `Binance Smart Chain (${a.hash.substring(0, 6)}...${a.hash.substr(-4)})` : "Binance Smart Chain";
                a.toChainUrl = a.ex_hash ? this.intExUrl + a.ex_hash : "";
                a.toChain = a.ex_hash ? `INT Chain (${a.ex_hash.substring(0, 6)}...${a.ex_hash.substr(-4)})` : "INT Chain";
                break;
              case 5:
                a.fromChainUrl = a.hash ? this.ethExUrl + a.hash : "";
                a.fromChain = a.hash ? `Ethereum (${a.hash.substring(0, 6)}...${a.hash.substr(-4)})` : "Ethereum";
                a.toChainUrl = a.ex_hash ? this.bscExUrl + a.ex_hash : "";
                a.toChain = a.ex_hash ? `Binance Smart Chain (${a.ex_hash.substring(0, 6)}...${a.ex_hash.substr(-4)})` : "Binance Smart Chain";
                break;
              case 6 :
                a.fromChainUrl = a.hash ? this.bscExUrl + a.hash : "";
                a.fromChain = a.hash ? `Binance Smart Chain (${a.hash.substring(0, 6)}...${a.hash.substr(-4)})` : "Binance Smart Chain";
                a.toChainUrl = a.ex_hash ? this.ethExUrl + a.ex_hash : "";
                a.toChain = a.ex_hash ? `Ethereum (${a.ex_hash.substring(0, 6)}...${a.ex_hash.substr(-4)})` : "Ethereum";
                break;
              default:
                a.fromChain = "";
                a.fromChainUrl = "";
                a.toChain = "";
                a.toChainUrl = "";
            }

            a.amount = transAmount(a.num);
            a.time = this.$moment(a.mp_time).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC'
          });
          this.isActLoading = false;
        }).catch(err =>{
          console.log(err);
        })
      },

      searchBridge () {
        console.log('search bridge list');
        const searchPage = 1;
        this.getBridgeList(searchPage);
      },

      getBridgeTimer () {
        this.timer = setInterval(() => {
          this.getBridgeList()
        }, 10000)
      },

      handleCurrentChange(val) {
        this.isActLoading = true;
        this.currentPage = val;
        this.$router.push ('/stats/bridgelist/' + val);
        this.page = val;
        this.getBridgeList()
      },
    }
  }
</script>

<style scoped>
  .sDetail #box {
    padding: 30px 0 50px;
    min-height: 800px;
  }

  .sDetail .sd-t {
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: flex-end;*/
    line-height: 48px;
    margin-bottom: 10px;
  }
  .sDetail .sd-t .sd-t-i {
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
  }

  .sd-t-ii {
    display: inline-block;
    float: right;
    height: 45px;

    margin-top: 8px;
    text-align: right;
  }

  .sd-t-iii {
    float: right;
    display: inline-block;
  }

  .sd-t-iii > input {
    width: 400px;
    height: 30px;
    padding-left: 20px;
    outline: none;
    border:1px solid #dddddd;
    border-radius: 5px;
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

  .sc-asset .sa-c .sa-block {
    padding: 20px 15px 0;
    border-radius: 0 0 4px 4px;
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

  .sc-asset .al-mo {
    color: #ed303b;
    cursor: pointer;
  }

  .sc-asset .al-mo img {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .sc-asset .al-mo span {
    display: inline-block;
    vertical-align: middle;
  }

  .sc-asset .al-mo:hover span {
    text-decoration: underline;
  }

  .sc-asset .al-url {
    color: #ed303b;
    cursor: pointer;
  }

  .sc-asset .al-url:hover {
    text-decoration: underline;
  }
</style>
