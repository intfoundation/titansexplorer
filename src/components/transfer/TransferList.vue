<template>
    <div class="txlist">
      <div id="box">
        <div class="tl-t">
          <div class="tlt-i"><span>Transaction</span></div>
          <div class="tlt-ii">
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
        <div class="tl-c">
          <el-table :data="txList" height="800" v-loading="isLoading">
            <el-table-column label="TxHash" align="left" :show-overflow-tooltip="over">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.txUrl" type="text" class="tl-url">{{scope.row.hash}}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="Block" align="left" width="100">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.blockUrl" type="text" class="tl-url">{{scope.row.blockNumber}}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="From" align="left" :show-overflow-tooltip="over">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.fromUrl" type="text" class="tl-url">{{scope.row.fromAddress}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="Amount" align="right" width="120" :show-overflow-tooltip="over"></el-table-column>
            <el-table-column label="To" align="left" :show-overflow-tooltip="over">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.toUrl" type="text" class="tl-url">{{scope.row.toAddress}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
            <el-table-column prop="fromAddress" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>
            <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
            <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
          </el-table>
          <div class="tl-f">
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
      </div>
    </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    name: "TransferList",
    data() {
      return {
        txList: [],
        isLoading: true,
        currentPage: 1,
        page: this.$route.params.page || 1,
        total: 0,
        over: true
      }
    },
    created() {
      this.currentPage = +this.page;
      this.getTxList();
    },
    mounted() {

    },
    methods: {
      getTxList() {
        this.$axios.get('/api/tx/list',{params:{
          pageNo: this.page,
          pageSize: '30'
        }}).then(res => {
          this.isLoading = false;
          this.total = res.data.count;
          this.txList = res.data.list;
          this.txList.forEach(item => {
            item.time = this.$moment(item.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
            item.status = statusType(item.status);
            item.amount = new BigNumber(item.value).dividedBy(Math.pow(10, 18)).toString();
            item.amount = toDecimal4NoZero(item.value);
            item.amount = transAmount(item.amount);
            item.txUrl = '/transfer/transferdetail/' + item.hash;
            item.blockUrl = '/blockchain/blockdetail/' + item.blockNumber + '/1';
            item.toUrl = '/stats/statsdetail/' + item.toAddress;
            item.fromUrl = '/stats/statsdetail/' + item.fromAddress;
          });
          console.log(this.txList);
        }).catch(err => {
          console.log(err);
        })
      },
      handleCurrentChange(val) {
        this.isLoading = true;
        this.currentPage = val;
        this.$router.push ('/transfer/transferlist/' + val);
        this.page = val;
        this.getTxList()
      },
    }
  }
</script>

<style scoped>
  .txlist #box {
   padding: 30px 0 50px;
  }

  .txlist .tl-t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .tl-t .tlt-i {
    font-size: 24px;
    font-weight: bold;
  }

  .txlist .tl-c {
    padding: 0 15px;
    background-color: #fff;
  }

  .tl-c .tl-url {
    font-weight: 500;
    color: #ed303b;
    cursor: pointer;
  }

  .tl-c .tl-url:hover {
    text-decoration: underline;
  }

  .txlist .tl-f {
    height: 45px;
    padding: 8px 0 10px;
    text-align: right;
  }
</style>
