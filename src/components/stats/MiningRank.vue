<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">Mining Rank <span>The Fourth Stage Start/EndBlock 100000/1000000</span></div>
      <div class="sd-c">
        <div class="sc-asset">
          <div class="sa-c">
            <div class="sa-block" v-if="choose === 0">
              <el-table :data="minedList" v-loading="isActLoading">
                <el-table-column prop="i" label="Rank" :key="Math.random()" align="center" width="60"></el-table-column>
                <el-table-column label="Moniker" align="left" :key="Math.random()" :show-overflow-tooltip="true" width="150">
                  <template slot-scope="scope">
                    <router-link tag="div" :to="scope.row.url" class="al-mo">
                      <img src="../../assets/moniker.png" alt="" v-if="!scope.row.thumbnail">
                      <img :src="scope.row.thumbnail" alt="" v-if="scope.row.thumbnail">
                      <span v-if="scope.row.moniker">{{scope.row.moniker}}</span>
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column label="Miner" align="center" :key="Math.random()">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.url" class="al-url">{{scope.row.addr}}</router-link>
                  </template>
                </el-table-column>
<!--                <el-table-column prop="commission" label="Commission" :key="Math.random()" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>-->
<!--                <el-table-column prop='bondedTokens' label="Bonded_Tokens" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>-->
<!--                <el-table-column prop="voteP" label="Voting_Power" align="center" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>-->
<!--                <el-table-column prop="uptime" label="Uptime" align="center" width="80" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>-->
<!--                <el-table-column prop="selfBonded" label="Self-Bonded " align="left" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>-->
<!--                <el-table-column prop="delegators" label="Delegators" align="left" width="100" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>-->
<!--                <el-table-column prop="bondHeight" label="Bond_Height" align="left" :key="Math.random()" :show-overflow-tooltip="true">-->
<!--                  <template slot-scope="scope">-->
<!--                    <router-link tag="span" :to="scope.row.blockUrl" class="al-url">{{scope.row.bondHeight}}</router-link>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="weightReward" label="Weight Reward" align="center" width="140" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="partReward" label="Part Reward" align="center" width="140" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="luckyReward" label="Lucky Reward" align="center" width="140" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="totalBlocks" label="Mined Blocks" align="center" width="200" :key="Math.random()" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
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
    name: "Validators",
    data() {
      return {
        choose: 0,
        tabList: ['Rank'/*,'Candidate'*//*,'Jailed'*/],
        actVdList: [],
        canVdList: [],
        jailVdList: [],
        minedList: [],
        isActLoading: true,
        isCanLoading: false,
        isJailLoading: false,
        totalBond: 1,
      }
    },
    created() {
    },
    mounted() {
      this.getActiveVdList();
    },
    watch: {
      choose(val) {
        switch (val) {
          case 0:
            this.getActiveVdList();
            break;
          case 1:
            this.getCanVdList();
            break;
          case 2:
            this.getJailVdList();
            break;
        }
      },
    },
    methods: {
      getActiveVdList () {
        this.isActLoading = true;
        this.$axios.get('/api/reward/getMineReward',{params:{rank:true, sort: true, pageNo:1, pageSize:1000}}).then(res => {
          // this.actVdList = res.data.list;
          this.minedList = res.data.list;

          this.minedList.forEach((a,index) => {
            a.i = index + 1;
            a.addr = a.miner;
            a.url = '/staking/validatorDetail/' + a.miner;
          });
          this.isActLoading = false;
        }).catch(err =>{
          console.log(err);
        })
      },
      getCanVdList () {
        this.isCanLoading = true;
        this.$axios.get('/api/node/validators',{params:{active:1,pageNo:1,pageSize:100}}).then(res => {
          this.canVdList = res.data.list;
          this.canVdList.forEach((item) => {
            item.addr = addrHide(item.address);
            item.commission = toDecimal4NoZero(item.commission).toString() + '%';
            item.bondedTokens = transAmount(item.bondedTokens) + ' INT';
            item.selfBonded = transAmount(item.selfBonded) + ' INT';
            item.url = '/staking/validatorDetail/' + item.address;
          });
          this.isCanLoading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      getJailVdList () {
        this.isJailLoading = true;
        this.$axios.get('/api/block/validators',{params:{height:this.height}}).then(res => {
          console.log(res);
          this.isJailLoading = false;
        }).catch(err => {
          console.log(err);
        })
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
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 24px;
  }

  .sDetail .sd-t span {
    float: right;
    font-size: 16px;
    font-weight: bold;
    color: #ed303b;
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
