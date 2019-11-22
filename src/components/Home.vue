<template>
    <div class="home">
      <div id="box">
        <div class="h-block">
          <div class="hb-box hb-height">
            <div class="hb-t"><img src="../assets/Blockchain.png" class="hb-icon"/><span>Block Height</span></div>
            <router-link v-if="blockInfo.blockUrl" tag="div" :to="blockInfo.blockUrl" class="hb-num"><span>{{blockInfo.number}}</span></router-link>
            <router-link v-if="blockInfo.addrUrl" tag="div" :to="blockInfo.addrUrl" class="hb-data"><span>{{blockInfo.miner}}</span></router-link>
          </div>
          <div class="hb-box">
            <div class="hb-t"><img src="../assets/Blockchain.png" class="hb-icon"/><span>Current TPS</span></div>
            <div class="hb-num"><span>{{current}}</span></div>
            <div class="hb-data"><span>Max TPS: </span> <span>{{max}}</span></div>
          </div>
          <div class="hb-box">
            <div class="hb-t"><img src="../assets/Transactions2.png" class="hb-icon"/><span>Price</span></div>
            <div class="hb-num"><span>{{INTPrice}} USD</span></div>
            <div class="hb-data"><span>{{INTPTime}}</span></div>
          </div>
          <div class="hb-box">
            <div class="hb-t"><img src="../assets/BlackTime.png" class="hb-icon"/><span>Avg Block Time</span></div>
            <div class="hb-num"><span>{{avgTime}} s</span></div>
            <div class="hb-data"><span>Last 100 Blocks</span></div>
          </div>
          <div class="hb-box">
            <div class="hb-t"><img src="../assets/VotingPower.png" class="hb-icon"/><span>Voting Power</span></div>
            <div class="hb-num"><span>{{votingPower}}</span></div>
            <div class="hb-data"><span>{{validators}}/{{totalValidators}} Validators</span></div>
          </div>
          <div class="hb-box">
            <div class="hb-t"><img src="../assets/Group.png" class="hb-icon"/><span>Bonded INT</span></div>
            <div class="hb-num"><span>{{bondPer}}</span></div>
            <div class="hb-data"><span>{{bondStake}} / {{bondTotal}}</span></div>
          </div>
        </div>
        <div class="h-chart">
          <div class="h-l">
            <div class="h-up">
              <div class="h-t"><i class="h-logo hl-top"></i><span>Validators Top 10</span></div>
<!--              <div class="h-view"><span>View All</span></div>-->
            </div>
            <div class="hc-down">
              <div ref="top10" class="echarts"></div>
            </div>
          </div>
          <div class="h-r">
            <div class="h-up">
              <div class="h-t"><i class="h-logo hl-history"></i><span>14 days Transaction History & INT Average Price</span></div>
<!--              <div class="h-view"><span>View All</span></div>-->
            </div>
            <div class="hc-down">
              <div ref="history" class="echarts"></div>
            </div>
          </div>
        </div>
        <div class="h-list">
          <div class="h-l">
            <div class="h-up">
              <div class="h-t"><i class="h-logo hl-block"></i><span>Blocks</span></div>
              <router-link tag="div" to="/blockchain/blocks/1" class="h-view"><span>View All</span></router-link>
            </div>
            <div class="hl-down">
              <ul class="hl-ul">
                <li class="hl-li" v-for="item in blockList" :key="item.id">
                  <div class="hl-i">
                    <router-link tag="div" :to="item.url" class="bl-height"><span>{{item.number}}</span></router-link>
                    <div class="bl-time"><span>> {{item.passTime}}</span></div>
                  </div>
                  <div class="hl-ii">
                    <div class="bl-txn"><span>Txn: </span><span>{{item.txns}}</span></div>
                    <div class="bl-utc"><span>{{item.createTime}}</span></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="h-r">
            <div class="h-up">
              <div class="h-t"><i class="h-logo hl-trans"></i><span>Transactions</span></div>
              <router-link tag="div" to="/transfer/transferlist/1" class="h-view"><span>View All</span></router-link>
            </div>
            <div class="hl-down">
              <ul class="hl-ul">
                <li class="hl-li" v-for="item in transList" :key="item.id">
                  <div class="hl-i">
                    <router-link tag="div" :to="item.url" class="tl-tx"><span style="color: #333;">TX#</span>&nbsp;<span>{{item.transactionHash}}</span></router-link>
                    <div class="tl-time"><span>> {{item.passTime}}</span></div>
                  </div>
                  <div class="hl-ii">
                    <div class="tl-type"><span>Transfer</span></div>
                    <div class="tl-fee"><span>Fee: </span><span>{{item.fee}}</span><span> INT</span></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import BigNumber from 'bignumber.js'
  export default {
    name: "Home",
    data() {
      return {
        blockInfo: {},
        current: '0',
        INTPrice: '0.0000',
        INTPTime: '',
        avgTime: '0',
        votePower: '0',
        voteStake: '0',
        tokens: '0',
        blockList: [],
        transList: [],
        max: '0',
        votingPower: '',
        validators: '',
        totalValidators: '',
        bondStake: '',
        bondTotal: '',
        bondPer: '',
        maxYTxn: 0,
        maxYPrice: 0,
        minYPrice: 0,
        timer: '',
        option: {
          title: {
            textAlign: 'center'
          },
          legend: {
            type: 'plain',
            // orient: 'horizontal', // 'vertical'
            right: 100,
            top: '5%',
            // bottom: 20,
            data: ['Transaction(Txs)','Price($)'],
            z: 100
          },
          tooltip: {
            trigger: 'axis' // tooltip出现悬浮的解释框
          },
          xAxis: {
            type: 'category',
            data: [],
            // data: ['2018-08-22','2018-08-22', '2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22','2018-08-22',],
            axisLabel: {
              rotate: 45, //倾斜度 -90 至 90 默认为0
              margin: 12, // 刻度标签与轴线的距离
              fontWeight: 500
            },
            axisTick: {
              // alignWithLabel: true // 刻度和标签对齐
              show: false
            }
          },
          yAxis: [
            {
              type: 'value',
              name: 'Transaction(Txs)',
              nameGap: 20, // 坐标轴的名称与轴线之间的距离
              // min: 0,
              // max: 250000,
              // interval: 250000/5,
              axisLine: {
                lineStyle: {
                  color: '#333'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                margin: 5 // 刻度标签与轴线的距离
              },
              splitLine: {
                show: false
              }
            },
            {
              type: 'value',
              name: 'Price($)',
              nameGap: 20, // 坐标轴的名称与轴线之间的距离
              // min: 0.018,
              // max: 0.025,
              // interval: (0.025 - 0.018)/5,
              axisLine: {
                lineStyle: {
                  color: '#333'
                }
              },
              axisLabel: {
                formatter: '{value} ',
                margin: 10 // 刻度标签与轴线的距离
              }
            }
          ],
          series: [
            {
              name: 'Transaction(Txs)', // 这个name必须与legend data中的name一致
              data: [],
              type: 'line',
              smooth: true,
              label: {
                position: [10, 60]
              },
              itemStyle: {
                color: '#ed303b', // 线的颜色
                borderWidth: 5 // 线的宽度
              }
            },
            {
              name: 'Price($)', // 这个name必须与legend data中的name一致
              data: [],
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              label: {
                position: [10, 60]
              },
              itemStyle: {
                color: '#3C31D7', // 线的颜色
                borderWidth: 5 // 线的宽度
              }
            }
          ]
        },
        optionPie:{
          // title : {
          //   text: '某站点用户访问来源',
          //   subtext: '纯属虚构',
          //   x:'center'
          // },
          tooltip : {
            trigger: 'item',
            formatter: "{b} <br/>Voting Power: {d}%"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series : [
            {
              type: 'pie',
              radius : '85%',
              center: ['60%', '50%'],
              data:[],
              label: {
                normal: {
                  show: false
                }
              },
              // labelLine: {
              //   normal: {
              //     show: false
              //   }
              // },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: (params) => {
                    let colorList = [];
                    for (let i = 0; i < 10; i++) {
                      colorList.push('rgba(237,48,59,' + (10-i/1.3)/10 +')');
                    }
                    colorList.push('rgba(237,48,59,0.2)');
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        }
      }
    },
    created() {
      this.getHomePageInfo();
      this.getVoteStake();
      this.getAccountBond();
      this.getTxHistory();
      this.echartPie();
      this.blockListTimer();
    },
    mounted() {
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      getHeight() {
        this.$axios.get('/api/block/height').then(res => {
          this.blockInfo = res.data;
          this.blockInfo.name = res.data.nodeName ? res.data.nodeName : res.data.miner;
          this.blockInfo.addrUrl = '/stats/statsdetail/' + res.data.miner;
          this.blockInfo.blockUrl = '/blockchain/blockdetail/' + res.data.number
        }).catch(err => {
          console.log(err);
        })
      },
      getVoteStake() {
        this.$axios.get('/api/node/votedStake').then(res => {
          this.voteStake = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      getAccountBond() {
        this.$axios.get('/api/account/bond').then(res => {
          this.bondStake = res.data.stake;
          this.bondTotal = res.data.balance + res.data.stake;
          this.bondPer = new BigNumber(this.bondStake).div(new BigNumber(this.bondTotal)).toNumber();
          this.bondPer = toDecimal4NoZero(this.bondPer) * 100 + '%';
          this.bondStake = nFormatter(this.bondStake,2);
          this.bondTotal = nFormatter(this.bondTotal,2);
        }).catch(err => {
          console.log(err);
        })
      },
      getTps() { //获取当前区块高度
        this.$axios.get('/api/block/tps').then(res => {
          this.current = res.data.current;
          this.max = res.data.max;
        }).catch(err => {
          console.log(err);
        })
      },
      getINTPrice() { //获取当前INT价格
        this.INTPTime = this.$moment().utc().format('YYYY-MM-DD hh:mm:ss') + '+UTC';
        this.$axios.get('https://api.coinmarketcap.com/v2/ticker/2399/').then(res => {
          this.INTPrice = res.data.data.quotes.USD.price;
          this.INTPrice = toDecimal4NoZero(this.INTPrice);
        }).catch(err => {
          console.log(err);
        })
      },
      getTxHistory() { //获取近14天每天交易数量
        this.$axios.get('/api/tx/txsByDay').then(res => {
          res.data.forEach(item => {
            this.option.xAxis.data.push(item.time);
            this.option.series[0].data.push(item.txCount);
          });
          let max = getMax(this.option.series[0].data,'trans');
          this.option.yAxis[0].min = 0;
          this.option.yAxis[0].max = max.maxy;
          this.option.yAxis[0].interval = max.maxy/5;
          this.$axios.get('/api/tx/getPriceTrend').then(res1 => {
            res1.data.forEach(item => {
              // this.option.xAxis.data.push(item.time);
              this.option.series[1].data.push(item.price);
            });
            let param = getMax(this.option.series[1].data,'price');
            this.option.yAxis[1].min = +param.miny;
            this.option.yAxis[1].max = +param.maxy;
            this.option.yAxis[1].interval = (param.maxy - param.miny).toFixed(4)/5;
            var myChart = echarts.init(this.$refs.history);// 减少dom的消耗
            myChart.setOption(this.option)
          }).catch(err1 => {
            console.log(err1);
          });
        }).catch(err => {
          console.log(err);
        })
      },
      getAvgBlockTime() { //获取平均出块时间
        this.$axios.get('/api/block/avgBlockTime').then(res => {
          this.avgTime = toDecimal4NoZero(res.data/1000);
        }).catch(err => {
          console.log(err);
        })
      },
      echartPie() {
        this.$axios.get('/api/node/list').then(res => {
          let top10Power = 0;
          for (let i in res.data) {
            res.data[i].addr = res.data[i].address.slice(0,5) + '...' + res.data[i].address.slice(-5);
            res.data[i].name = res.data[i].name ? res.data[i].name: res.data[i].addr;
            res.data[i].power = res.data[i].voting_power / this.voteStake;
            res.data[i].param = {
              value: res.data[i].power,
              name: res.data[i].name
            };
            if (i <= 9) {
              top10Power += res.data[i].power;
              this.optionPie.legend.data.push(res.data[i].name);
              this.optionPie.series[0].data.push(res.data[i].param);
            } else if (i > 9) {
              let other = {
                value: 1-top10Power,
                name: 'Others'
              };
              this.optionPie.legend.data.push(other.name);
              this.optionPie.series[0].data.push(other);
              break;
            }
          }
          var PieChart = echarts.init(this.$refs.top10);// 减少dom的消耗
          PieChart.setOption(this.optionPie)
        }).catch(err => {
          console.log(err);
        });
      },
      getBlockList() { //获取出块列表
        this.$axios.get('/api/block/list').then(res => {
          this.blockList = res.data.list;
          this.votingPower = toDecimal4NoZero(this.blockList[0].votingPower/this.blockList[0].totalVotingPower);
          this.votingPower = new BigNumber(this.votingPower).times(100).toNumber() + '%';
          this.validators = this.blockList[0].validators;
          this.totalValidators = this.blockList[0].totalValidators;
          this.blockList.forEach(item => {
            item.createTime = this.$moment(item.timestamp).format('YYYY/MM/DD hh:mm:ss') + '+UTC';
            item.passTime = formatPassTime(item.timestamp,Date.now());
            item.url = '/blockchain/blockdetail/' + item.number;
          });
        }).catch(err => {
          console.log(err);
        })
      },
      getTransactionList() { //获取交易列表
        this.$axios.get('/api/tx/list').then(res => {
          this.transList = res.data.list;
          this.transList.forEach(item => {
            item.passTime = formatPassTime(item.timestamp,Date.now());
            item.fee = item.gasUsed * item.gasPrice;
            item.fee = new BigNumber(item.fee).dividedBy(Math.pow(10, 18)).toNumber();
            item.url = '/transfer/transferdetail/'+ item.transactionHash;
          })
        }).catch(err => {
          console.log(err);
        })
      },
      blockListTimer() {
        this.timer = setInterval(() => {
          this.getHomePageInfo();
        },5000)
      },
      getHomePageInfo() {
        this.getTps();
        this.getINTPrice();
        this.getAvgBlockTime();
        this.getBlockList();
        this.getTransactionList();
        this.getHeight();
      },
    }
  }
</script>

<style scoped>
  .home {
    padding: 40px 0 60px;
  }

  .home .h-block {
    display: flex;
    justify-content: space-between;
    padding: 32px 40px;
    /*width: 100%;*/
    box-shadow:0 4px 8px 0 rgba(230,230,230,0.6);
    border-radius:4px;
    border:1px solid #e6e6e6;
    background-color: #fff;
  }

  .home .h-block .hb-box {
    padding-top: 18px;
    padding-left: 20px;
    width: 180px;
    height: 120px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    transition: all .3s;
  }

  .home .h-block .hb-box:hover {
    box-shadow:0 0 8px 0 rgba(230,230,230,1);
  }

  .h-block .hb-box .hb-t {
    font-size: 14px;
    color: #333;
  }

  .h-block .hb-height .hb-data {
    color: #ed303b!important;
    cursor: pointer;
  }

  .h-block .hb-height .hb-data:hover {
    text-decoration: underline;
  }

  .h-block .hb-height .hb-num {
    cursor: pointer;
  }

  .h-block .hb-height .hb-num:hover {
    text-decoration: underline;
  }

  .hb-box .hb-t .hb-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .hb-box .hb-t span {
    vertical-align: middle;
  }

  .h-block .hb-box .hb-num {
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 20px;
    color: #ed303b;
  }

  .h-block .hb-box .hb-data {
    width: 145px;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .home .h-chart,
  .home .h-list {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }

  .home .h-l,
  .home .h-r {
    width: 620px;
    background-color: #fff;
    box-shadow:0 4px 8px 0 rgba(230,230,230,0.6);
    border-radius:4px;
    border:1px solid #e6e6e6;
  }

  .home .h-chart .h-l,
  .home .h-chart .h-r {
    padding: 20px 40px;
  }

  .home .h-list .h-l,
  .home .h-list .h-r {
    padding: 20px 0 0;
  }

  .home .h-up {
    padding-bottom: 20px;
  }

  .home .h-list .h-up {
    padding: 0 40px 20px;
  }

  .home .h-t {
    font-size: 16px;
    font-weight: bold;
  }

  .home .h-t .h-logo {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 8px;
  }

  .home .h-t .hl-top {
    background: url("../assets/ValidatorsTop.png") no-repeat center/contain;
  }

  .home .h-t .hl-history {
    background: url("../assets/TransactionHistory.png") no-repeat center/contain;
  }

  .home .h-t .hl-block {
    background: url("../assets/Blocks.png") no-repeat center/contain;
  }

  .home .h-t .hl-trans {
    background: url("../assets/Transactions.png") no-repeat center/contain;
  }

  .home .hc-t span {
    vertical-align: middle;
  }

  .home .h-up {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .home .h-up .h-view {
    padding: 0 8px;
    line-height: 28px;
    background-color: #fdeaeb;
    border: 1px solid #ed303b;
    border-radius: 4px;
    color: #ed303b;
    font-size: 14px;
    cursor: pointer;
  }

  .home .h-up .h-view:hover {
    background-color: #ed303b;
    color: #fff;
  }

  .home .h-chart .echarts {
    width: 100%;
    height: 330px;
    color: #666;
  }

  .home .h-chart .h-r .echarts {
    margin-top: -20px;
  }

  .home .h-list .hl-down {
    border-top: 1px solid #e6e6e6;
  }

  .home .h-list .hl-ul {
    width: 100%;
  }

  .home .h-list .hl-li {
    padding: 10px 40px;
    font-size: 14px;
    color: #666;
    border-top: 1px solid #f3f3f3;
  }

  .home .h-list .hl-li:first-of-type {
    border-top: none;
  }

  .h-list .hl-li:hover {
    background-color: #faf7f8;
  }

  .h-list .hl-li .hl-i,
  .h-list .hl-li .hl-ii {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .h-list .hl-li .hl-i {
    margin-bottom: 5px;
  }

  .hl-li .hl-i .bl-height {
    font-weight: bold;
    color: #ed303b;
  }

  .hl-li .hl-i .bl-height:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .hl-li .hl-i .tl-tx {
    width: 180px;
    color: #ed303b;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .hl-li .hl-i .tl-tx:hover {
    text-decoration: underline;
  }
</style>
