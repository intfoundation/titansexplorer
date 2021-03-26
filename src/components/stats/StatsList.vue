<template>
    <div class="aList">
      <div id="box">
        <div class="al-t"><span>Top {{num}} Addresses by INT</span></div>
        <div class="al-c">
          <el-table :data="aList" v-loading="isLoading">
            <el-table-column prop="index" label="#" align="left" width="80"></el-table-column>
            <el-table-column prop="address" label="Address" align="left" :show-overflow-tooltip="over">
              <template slot-scope="scope">
                <router-link tag="span" :to="scope.row.addrUrl" class="al-url">{{scope.row.address}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="Amount" align="left" width="200" :show-overflow-tooltip="over"></el-table-column>
            <el-table-column prop="delegate_balance" label="Stake" align="left" width="200" :show-overflow-tooltip="over"></el-table-column>
            <el-table-column prop="per" label="Percentage" align="left" width="150"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    name: "StatsList",
    data() {
      return {
        aList: [],
        num: '100',
        isLoading: true,
        over: true,
        amount: ''
      }
    },
    created() {

    },
    mounted() {
      this.getAddressList();
    },
    methods: {
      getAddressList() {
        this.isLoading = true;
        this.$axios.get('/api/account/bond').then(res1 => {
          this.amount = res1.data.balance + res1.data.stake;
          this.$axios.get('/api/account/list',{params:{pageNo:'1',pageSize:this.num}}).then(res => {
            this.aList = res.data.list;
            this.aList.forEach((item,index) => {
              item.index = index+1;
              item.per = (item.balance + item.stake)/this.amount;
              item.per = new BigNumber(toDecimal4NoZero(item.per)).times(100).toNumber() + '%';
              item.balance = toDecimal4NoZero(item.balance);
              item.amount = transAmount(item.balance);
              item.addrUrl = '/stats/statsdetail/' + item.address;
            });
            this.isLoading = false;
          }).catch(err => {
            console.log(err);
          })
        }).catch(err1 => {
          console.log(err1);
        });
      },
    }
  }
</script>

<style scoped>
  .aList #box {
    padding: 30px 0 50px;
  }

  .aList .al-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .aList .al-c {
    padding: 0 15px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6
  }

  .aList .al-c .al-url {
    color: #ed303b;
    cursor: pointer;
  }

  .aList .al-c .al-url:hover {
    text-decoration: underline;
  }
</style>
