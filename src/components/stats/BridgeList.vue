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
      </div>
      <div class="sd-c">
        <div class="sc-asset">
          <div class="sa-c">
            <div class="sa-block">
              <el-table :data="bridgeList" v-loading="isActLoading">
                <el-table-column prop="i" label="#" :key="Math.random()" align="center" width="40" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="Address" :key="Math.random()" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.formUrl" class="al-url">{{ scope.row.from_address }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="coin" label="Token" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="value" label="Amount" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="From" align="center" :key="Math.random()" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <el-tooltip v-if="scope.row.fromChainUrl" class="item" effect="dark" :content="scope.row.hash" placement="top-end">
                      <a :href="scope.row.fromChainUrl" :class="{'al-url': scope.row.hash}" target="_blank">{{ scope.row.fromChain }}</a>
                    </el-tooltip>

                    <a v-else>{{ scope.row.fromChain }}</a>
                  </template>
                </el-table-column>
                <el-table-column label="To" align="center" :key="Math.random()" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <el-tooltip v-if="scope.row.toChainUrl" class="item" effect="dark" :content="scope.row.ex_hash" placement="top-start">
                      <a :href="scope.row.toChainUrl" :class="{'al-url': scope.row.ex_hash}" target="_blank">{{ scope.row.toChain }}</a>
                    </el-tooltip>

                    <a v-else>{{ scope.row.toChain }}</a>
                  </template>
                </el-table-column>
<!--                <el-table-column prop="txStatus" label="Status" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>-->
                <el-table-column label="Status" :key="Math.random()" align="center" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span v-bind:class="{'text-success': scope.row.status === 2}">{{scope.row.txStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="Time" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
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
      this.getActiveVdList();
      // this.getBridgeTimer();
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      getActiveVdList () {
        this.isActLoading = true;
        this.$axios.get('/api/bridge/list',{params:{ pageNo:this.page, pageSize:this.pageSize }}).then(res => {
          this.bridgeList = res.data.list;
          this.total = res.data.count;
          this.currentPage = +this.page;
          this.bridgeList.forEach((a,index) => {
            a.i = index + 1;
            a.formUrl = '/address/' + a.from_address;
            a.txStatus = a.status === 2 ? "Success" : "Pending";
            switch (a.direction) {
              case 1:
                a.fromChain = "INT Chain";
                a.fromChainUrl = a.hash ? this.intExUrl + a.hash : "";
                a.toChain = "Ethereum";
                a.toChainUrl = a.ex_hash ? this.ethExUrl + a.ex_hash : "";
                break;
              case 2:
                a.fromChain = "Ethereum";
                a.fromChainUrl = a.hash ? this.ethExUrl + a.hash : "";
                a.toChain = "INT Chain";
                a.toChainUrl = a.ex_hash ? this.intExUrl + a.ex_hash : "";
                break;
              case 3:
                a.fromChain = "INT Chain";
                a.fromChainUrl = a.hash ? this.intExUrl + a.hash : "";
                a.toChain = "Binance Smart Chain";
                a.toChainUrl = a.ex_hash ? this.bscExUrl + a.ex_hash : "";
                break;
              case 4:
                a.fromChain = "Binance Smart Chain";
                a.fromChainUrl = a.hash ? this.bscExUrl + a.hash : "";
                a.toChain = "INT Chain";
                a.toChainUrl = a.ex_hash ? this.intExUrl + a.ex_hash : "";
                break;
              case 5:
                a.fromChain = "Ethereum";
                a.fromChainUrl = a.hash ? this.ethExUrl + a.hash : "";
                a.toChain = "Binance Smart Chain";
                a.toChainUrl = a.ex_hash ? this.bscExUrl + a.ex_hash : "";
                break;
              case 6 :
                a.fromChain = "Binance Smart Chain";
                a.fromChainUrl = a.hash ? this.bscExUrl + a.hash : "";
                a.toChain = "Ethereum";
                a.toChainUrl = a.ex_hash ? this.ethExUrl + a.ex_hash : "";
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

      getBridgeTimer () {
        this.timer = setInterval(() => {
          this.getActiveVdList()
        }, 5000)
      },

      handleCurrentChange(val) {
        this.isActLoading = true;
        this.currentPage = val;
        this.$router.push ('/stats/bridgelist/' + val);
        this.page = val;
        this.getActiveVdList()
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .sDetail .sd-t .sd-t-i {
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
  }

  .sd-t-ii {
    height: 45px;
    padding: 8px 0 10px;
    text-align: right;
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
