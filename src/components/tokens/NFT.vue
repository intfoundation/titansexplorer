<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">
        <div class="sd-t-i">Non-Fungible Token Tracker</div>
        <div class="sd-t-ii" v-if="isPageShow">
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
            <div class="sa-t sa-t-bg">
              <span class="sa-tt">Non-Fungible Tokens (NFT)</span>
            </div>
            <div class="sa-block">
              <el-table :data="tokenList" v-loading="isActLoading">
                <el-table-column prop="i" label="#" :key="Math.random()" align="left" width="50"></el-table-column>
                <el-table-column label="Token" align="left" :key="Math.random()" width="400">
                  <template slot-scope="scope">
<!--                    <span>{{ scope.row.name }}</span>-->
                    <router-link tag="span" :to="'/token/' + scope.row.contract" class="al-url">{{scope.row.name + ' (' + scope.row.symbol + ')'}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="Price" :key="Math.random()" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="change" label="Change(%)" :key="Math.random()" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="volume" label="Volume" :key="Math.random()" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="marketCap" label="Market Cap" :key="Math.random()" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="transfers" label="Transfers" :key="Math.random()" align="left" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="holders" label="Holders" :key="Math.random()" align="left" :show-overflow-tooltip="true" width="100"></el-table-column>
              </el-table>
              <div class="sd-t-ii" v-if="isPageShow">
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
    name: "tokens",
    data() {
      return {
        tokenList: [],
        isActLoading: false,
        currentPage: 1,
        page: this.$route.params.page || 1,
        total: 0,
        pageSize: 20,
        isPageShow: false,
      }
    },
    created() {
    },
    mounted() {
      this.getTokenList();
    },

    methods: {
      getTokenList () {
        this.isActLoading = true;
        this.$axios.get('/api/token/list', { params: { pageNo: this.page, pageSize: this.pageSize, type: 2 }}).then( res => {
          this.tokenList = res.data.list;
          this.total = res.data.count;
          this.isPageShow = this.total > 25;
          this.tokenList.forEach((val, index) => {
            val.i = index + 1;
            val.contract = val.contract_address;
            val.price = val.price === 0 ? "-" : "$" + val.price;
            val.change = val.change === 0 ? "-" : "$" + val.change;
            val.volume = val.volume === 0 ? "-" : "$" + val.volume;
            val.marketCap = val.marketCap === 0 ? "-" : "$" + val.marketCap;
          });
          this.isActLoading = false;
        }).catch(err => {
          console.log(err)
        })
      },

      handleCurrentChange(val) {
        this.isActLoading = true;
        this.currentPage = val;
        this.$router.push ('/tokens-nft/list/' + val);
        this.page = val;
        this.getTokenList()
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
    height: 52px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid rgb(230,230,230);
  }

  .sDetail .sc-asset .sa-t .sa-tt {
    display: block;
    padding: 15px;
    /*line-height: ;*/
    font-weight: bold;
  }

  .sc-asset .sa-c .sa-block {
    padding: 20px 15px 0;
    border-radius: 0 0 10px 10px;
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
