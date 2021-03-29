<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">
        <div class="sd-t-i">Mapping List</div>
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
              <el-table :data="mappingList" v-loading="isActLoading">
                <el-table-column prop="i" label="#" :key="Math.random()" align="center" width="50"></el-table-column>
                <el-table-column label="INT 3.0 Address" align="center" :key="Math.random()" width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.int3_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="INT 4.0 Address" align="center" :key="Math.random()" width="400">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.int4Url" class="al-url">{{ scope.row.int4_address }}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" :key="Math.random()" align="center" :show-overflow-tooltip="true"></el-table-column>
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
    name: "mappinglist",
    data() {
      return {
        mappingList: [],
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
        this.$axios.get('/api/reward/getMappingList',{params:{ current:this.page, pageSize:this.pageSize }}).then(res => {
          this.mappingList = res.data.list.docs;
          this.total = res.data.list.pageInfo.totalItems;
          this.currentPage = res.data.list.pageInfo.current;
          this.mappingList.forEach((a,index) => {
            a.i = index + 1;
            a.int4Url = '/stats/statsdetail/' + a.int4_address;
            a.amount = transAmount(a.num);
            a.time = this.$moment(a.mp_time).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC'
          });
          this.isActLoading = false;
        }).catch(err =>{
          console.log(err);
        })
      },

      handleCurrentChange(val) {
        this.isActLoading = true;
        this.currentPage = val;
        this.$router.push ('/stats/mappinglist/' + val);
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
