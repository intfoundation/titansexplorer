<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">
        <div class="sd-t-i">Epoch List</div>
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
              <el-table :data="epochList" v-loading="isActLoading">
                <el-table-column prop="i" label="#" :key="Math.random()" align="center" width="50"></el-table-column>
                <el-table-column prop="number" label="Epoch" align="center" :key="Math.random()"></el-table-column>
                <el-table-column prop="startTime" label="Start Time" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="endTime" label="End Time" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="Start Block" align="center" :key="Math.random()">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.startBlockUrl" class="al-url">{{ scope.row.start_block }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column label="End Block" align="center" :key="Math.random()">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.endBlockUrl" class="al-url">{{ scope.row.end_block }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="rewardPerBlcok" label="Reward/Block" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
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
  export default {
    name: "epochs",
    data() {
      return {
        epochList: [],
        isActLoading: false,
        currentPage: 1,
        page: this.$route.params.page || 1,
        total: 0,
        pageSize: 20,
      }
    },
    created() {
    },
    mounted() {
      this.getActiveVdList();
    },

    methods: {
      getActiveVdList () {
        this.isActLoading = true;
        this.$axios.get('/api/epoch/list',{params:{ pageNo:this.page, pageSize:this.pageSize }}).then(res => {
          this.epochList = res.data.list;
          this.total = res.data.count;
          this.epochList.forEach((a,index) => {
            a.i = index + 1;
            a.startBlockUrl = '/block/' + a.start_block + '/1';
            a.endBlockUrl = '/block/' + a.end_block + '/1';
            a.startTime = this.$moment(a.start_time).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            a.endTime = this.$moment(a.end_time).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
            a.rewardPerBlcok = a.reward_per_block;
          });
          this.isActLoading = false;
        }).catch(err =>{
          console.log(err);
        })
      },

      handleCurrentChange(val) {
        this.isActLoading = true;
        this.currentPage = val;
        this.$router.push ('/staking/epochs/' + val);
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

