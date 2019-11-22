<template>
  <div class="block">
    <div id="box">
      <div class="b-t">
        <div class="b-height"><span>Current Height: </span><span style="color: #ed303b">{{height}}</span></div>
        <div class="b-page">
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
      <div class="b-list">
        <el-table :data="blockList" height="800" v-loading="isLoading">
          <el-table-column label="Block" width="100" align="left">
            <template slot-scope="scope">
              <router-link v-if="scope.row.url" tag="span" :to="scope.row.url" type="text" class="bl-num">{{scope.row.number}}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="Proposer" align="left">
            <template slot-scope="scope">
              <router-link v-if="scope.row.addrUrl" tag="span" :to="scope.row.addrUrl" type="text" class="bl-num">{{scope.row.miner}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="txns" label="Transactions" align="left" width="120"></el-table-column>
          <el-table-column label="Validators" align="left" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.validators}}</span>/<span>{{scope.row.totalValidators}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="voteP" label="Voting_Power" align="left" width="120"></el-table-column>
          <el-table-column prop="createTime" label="Timestamp" align="left" width="260"></el-table-column>
          <el-table-column prop="passTime" label="Age" align="right" width="180"></el-table-column>
        </el-table>
        <div class="b-f">
          <div class="b-page">
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
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    name: "Blocks",
    data() {
      return {
        blockList: [],
        isLoading: true,
        currentPage: 1,
        page: this.$route.params.page || 1,
        total: 0,
        height: ''
      }
    },
    created() {
      this.currentPage = +this.page;
    },
    mounted() {
      this.getBlockList();
      this.getHeight();
    },
    methods: {
      getBlockList() {
        this.$axios.get('/api/block/list',{params:{
            pageNo: this.page|| '1',
            pageSize: '30'
          }}).then(res => {
          this.isLoading = false;
          this.total = res.data.count;
          this.blockList = res.data.list;
          this.blockList.forEach(item => {
            item.url = '/blockchain/blockdetail/' + item.number;
            item.addrUrl = '/stats/statsdetail/' + item.miner;
            item.createTime = this.$moment(item.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
            item.passTime = '> ' + formatPassTime(item.timestamp,Date.now());
            item.voteP = toDecimal4NoZero(item.votingPower/item.totalVotingPower);
            item.voteP = new BigNumber(item.voteP).times(100).toNumber() + '%';
          });
        })
      },
      handleCurrentChange(val) {
        console.log(val);
        this.isLoading = true;
        this.currentPage = val;
        this.$router.push ('/blockchain/blocks/' + val);
        this.page = val;
        this.getBlockList()
      },
      getHeight() { //获取当前区块高度
        this.$axios.get('/api/block/height').then(res => {
          this.height = res.data.number;
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped>
  .block {
    padding: 40px 0 60px;
  }

  .block .b-t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .block .b-t .b-height {
    font-size: 24px;
    font-weight: bold;
  }

  .block .b-list {
    padding: 0 15px;
    background-color: #fff;
    box-shadow:0 4px 8px 0 rgba(230,230,230,0.6);
    border-radius:4px;
    border:1px solid rgb(230,230,230);
    color: #333;
    font-size: 14px;
  }

  .block .b-list .bl-num {
    color: #ed303b;
    font-weight: 500;
    cursor: pointer;
  }

  .block .b-list .bl-num:hover {
    text-decoration: underline;
  }

  .block .b-f {
    height: 45px;
    padding: 8px 0 10px;
    text-align: right;
  }
</style>
