<template>
  <div class="txDetail">
    <div id="box">
      <div class="tx-info">
        <div class="td-t"><span>Transaction Information</span></div>
        <div class="td-c" v-loading="isInfoLoading">
          <div class="tc-t"><span>TxHash : </span><span>{{hash}}</span></div>
          <div class="tc-c">
            <div class="tc-group">
              <div class="tg-i">Block :</div>
              <div class="tg-ii text-url"><router-link tag="span" :to="blockUrl">{{txDetail.blockNumber}}</router-link></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Status :</div>
              <div class="tg-ii"><span v-bind:class="{'text-success': txDetail.status === 1, 'text-danger': txDetail.status === 0}">{{txDetail.txStatus}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Timestamp :</div>
              <div class="tg-ii"><span>{{txDetail.passTime}} ({{txDetail.createTime}})</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Fee :</div>
              <div class="tg-ii"><span>{{txDetail.fee}}</span></div>
            </div>
            <div class="tc-group tc-gas">
              <div class="tg-i">Gas Used :</div>
              <div class="tg-ii">
                <div><span>{{txDetail.gasUsed}}</span></div>
                <div class="tg-tip">
                  <div class="tgt-icon"></div>
                  <div class="tgt-tx">
                    <div><span>Gas Limit: </span><span>{{txDetail.gas}}</span></div>
                    <div><span>Gas Price: </span><span>{{txDetail.gasPrice}} INT</span></div>
                    <div><span>Gas Used: </span><span>{{txDetail.gasUsed}}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Signer :</div>
              <div class="tg-ii"><span>{{txDetail.fromAddress}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tx-msg">
        <div class="td-t">Transaction Message</div>
        <div class="td-c" v-loading="isInfoLoading">
          <div class="tc-c">
            <div class="tc-group">
              <div class="tg-i">TxType :</div>
              <div class="tg-ii"><span>{{txDetail.type}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">From :</div>
              <router-link tag="div" :to="fromUrl" class="tg-ii text-url"><span>{{txDetail.fromAddress}}</span></router-link>
            </div>
            <div class="tc-group">
              <div class="tg-i">To :</div>
              {{txDetail.toAddress === null ? "[Contract&nbsp&nbsp" : ""}}
              <router-link tag="div" :to="toUrl" class="tg-ii text-url">
                <span>{{txDetail.toAddress === null ? txDetail.contractAddress : txDetail.toAddress}}</span>
              </router-link>
              {{txDetail.toAddress === null ? "&nbsp&nbspCreated]" : ""}}
            </div>
            <div class="tc-input" v-if="isTokensShow">
              <div class="tg-i">Tokens Transferred :</div>
              <div class="tg-ii">
                <ul>
                  <li v-for="(t, j) in tokenTxs" :key="j">
                    <span><b>From </b></span>
                    <el-tooltip class="text-url" effect="dark" :content="t[0]" placement="top">
                      <router-link tag="span" :to="'/address/' + t[0]" ><span>{{t[0].toLowerCase().slice(0, 20) + "..."}}</span></router-link>
                    </el-tooltip>
                    <span><b>To </b></span>
                    <el-tooltip class="text-url" effect="dark" :content="t[1]" placement="top">
                      <router-link tag="span" :to="'/address/' + t[1]"><span>{{t[1].toLowerCase().slice(0, 20) + "..."}}</span></router-link>
                    </el-tooltip>
                    <span><b>For </b></span>
                    <template v-if="txDetail.contractType === 2">
                      <span><b>IIP721 TokenId</b></span>
                      <span>{{"[" + t[2] + "]"}}</span>
                    </template>
                    <template v-else>
                      <span>{{t[2]}}</span>
                    </template>
                    <el-tooltip class="text-url" effect="dark" :content="t.token" placement="top">
                      <router-link tag="span" :to="'/address/' + t.token" class="text-url"><span>{{t.name + ' (' + t.symbol + ')'}}</span></router-link>
                    </el-tooltip>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Value :</div>
              <div class="tg-ii"><span>{{txDetail.value}}</span></div>
            </div>
            <div class="tc-group">
              <div class="tg-i">Nonce :</div>
              <div class="tg-ii"><span>{{txDetail.nonce}}</span></div>
            </div>
            <div class="tc-input" v-if="isTxInputShow">
              <div class="tg-i">Input Data :</div>
              <div class="tg-ii">
                <textarea v-if="showUnlockInput" class="tg-input" name="unlockinputdata" id="unlockinputdata" rows="10">{{txDetail.unlockInput}}</textarea>
                <textarea  v-else class="tg-input" name="inputdata" id="inputdata" rows="10">{{txDetail.input}}</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tx-logs" v-if="isEventLogsShow" v-loading="isInfoLoading">
        <div class="td-t">Transaction Event Logs</div>
        <div class="td-c">
          <template v-for="(val, i) in txDetail.logs">
            <div class="event-log" >
              <div class="event-index">
                <span>{{parseInt(val.logIndex, 16)}}</span>
              </div>
              <div class="event-body">
                <ul>
                  <li class="event-item">
                    <div class="event-t">
                      <b>Address</b>
                    </div>
                    <div class="event-c">
                      <router-link tag="span" :to="'/address/' + val.address" class="text-url"><span>{{val.address}}</span></router-link>
                    </div>
                  </li>
                  <li class="event-item">
                    <div class="event-t">
                      Name
                    </div>
                    <div class="event-c">
                      <template v-if="val.name">
                        <span>{{val.name + " ("}}</span>
                        <template v-for="(v, j) in val.inputs">
                          <span class="text-success">{{v.type}}</span>
                          <span class="text-danger">{{v.name}}</span>
                          <span v-if="j < (val.inputs.length - 1)">, </span>
                        </template>
                        <span> )</span>
                      </template>
                    </div>
                  </li>
                  <li class="event-item">
                    <div class="event-t">
                      Topics
                    </div>
                    <div class="event-c">
                      <ul>
                        <li v-for="(item, index) in val.topics" :key="index">
                          <div class="topic-t">
                            <span>{{index}}</span>
                          </div>
                          <div class="topic-c">
                            <span>{{item}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="event-item">
                    <div class="event-t">
                      Data
                    </div>
                    <div class="event-c">
                      <span>{{val.data}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <hr v-if="(i < txDetail.logs.length - 1)">
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    name: "Transaction",
    data() {
      return {
        hash: this.$route.params.hash,
        txDetail: {
          type: "",
        },
        tokenTxs: [],
        blockUrl: '',
        fromUrl: '',
        toUrl: '',
        isTxInputShow: true,
        isInfoLoading: true,
        isTokensShow: false,
        isEventLogsShow: true,
        status: 1,
      }
    },
    created() {
      this.getTxDetail();
    },
    mounted() {

    },
    watch:{
      tokenTxs: function () {
        this.isTokensShow = this.tokenTxs.length !== 0;
      }
    },
    computed: {
      showUnlockInput: {
        get: function () {
          return this.txDetail.type === "Delegate" || this.txDetail.type === "UnDelegate" || this.txDetail.type === "Register" || this.txDetail.type === "UnRegister" || this.txDetail.type === "EditValidator" || this.txDetail.type === "WithdrawReward" || this.txDetail.type === "SetCommission"
        },
        set: function () {

        }
      }
    },
    methods: {
      getTxDetail() {
        this.isInfoLoading = true;
        this.$axios.get('/api/tx/detail',{params:{hash:this.hash}}).then(res => {
          this.txDetail = Object.assign(this.txDetail, res.data);
          this.txDetail.logs = JSON.parse(this.txDetail.logs);
          this.txDetail.txStatus = statusType(this.txDetail.status);
          this.txDetail.fee = new BigNumber(this.txDetail.gasPrice).times(this.txDetail.gasUsed) + ' INT';
          this.txDetail.value = transAmount(this.txDetail.value) + ' INT';
          this.txDetail.createTime = this.$moment(this.txDetail.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          this.txDetail.passTime = formatPassTime(this.txDetail.timestamp,Date.now());
          this.blockUrl = '/block/' + this.txDetail.blockNumber + '/1';
          this.fromUrl = '/address/' + this.txDetail.fromAddress;
          this.toUrl = this.txDetail.toAddress === null ? '/address/' + this.txDetail.contractAddress : '/address/' + this.txDetail.toAddress;
          this.isTxInputShow = this.txDetail.input !== '0x';
          this.isEventLogsShow = this.txDetail.logs.length !== 0;
          this.txDetail.events.forEach(async (val, index) => {
            this.txDetail.abi.forEach((v, i) => {
              if (v.type === "event" && v.name === val.event) {
                this.txDetail.logs[index] = Object.assign(this.txDetail.logs[index], {inputs: v.inputs, name: v.name});
              }
            });

            if (val.event === "Transfer") {
              let address = this.txDetail.toAddress === null ? this.txDetail.contractAddress : this.txDetail.toAddress;
              let result = await this.$axios.get('/api/token/list', { params: { pageNo: 1, pageSize: 10, contract: address }});
              // console.log('result', result);
              let data = result.data.list[0];
              let tokenTx = {};
              tokenTx.name = data.name;
              tokenTx.symbol = data.symbol;
              tokenTx.token = data.contract_address;
              val.returnValues[2] = new BigNumber(val.returnValues[2]).div(new BigNumber(Math.pow(10, data.decimals))).toString() || 0;
              tokenTx = Object.assign(tokenTx, val.returnValues);
              this.tokenTxs.push(tokenTx);
            }
          });

          this.isInfoLoading = false
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .txDetail #box {
    padding: 30px 0 50px;
  }

  .txDetail .td-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .txDetail .td-c {
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6
  }

  .txDetail .td-c .tc-t {
    height: 70px;
    line-height: 70px;
    padding-left: 25px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #e6e6e6;
  }

  .txDetail .td-c .tc-c {
    padding-left: 25px;
  }

  .td-c .tc-c .tc-group {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
  }

  .td-c .tc-c .tc-group:last-of-type {
    border-bottom: none;
  }

  .tc-c .tc-group .tg-i {
    width: 150px;
    font-weight: 500;
  }

  .tc-c .tc-gas .tg-ii > div {
    display: inline-block;
    vertical-align: middle;
  }

  .td-c .tc-c .tc-input {
    /*display: flex;*/
    padding: 10px 0;
    /*align-items: center;*/
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
  }

  .td-c .tc-c .tc-input:after {
    content: '';
    display: block;
    clear: both;
  }

  .tc-c .tc-input .tg-i {
    float: left;
    width: 150px;
    font-weight: 500;
  }

  .tc-c .tc-input .tg-ii {
    /*float: left;*/
    margin-left: 150px;
  }

  .tg-input {
    display: block;
    width: 97%;
    height: 100%;
    padding: 10px;
    color: #1e2022;
    background-color: #f8f9fa;
    border: 1px solid #d5dae2;
    border-radius: 5px;
  }

  .tg-input:focus {
    box-shadow: 0 0 25px rgba(52,152,219,.1);
    border-color: #ed303b;
    outline: 0;
  }

  .tc-gas .tg-tip {
    position: relative;
    margin-left: 10px;
    width: 300px;
    height: auto;
  }

  .tc-gas .tg-tip .tgt-icon {
    width: 18px;
    height: 18px;
    background: url("../../assets/gasTip.png") no-repeat center/contain;
    cursor: pointer;
  }

  .tc-gas .tg-tip .tgt-tx {
    position: absolute;
    line-height: 20px;
    top: -36px;
    left: 35px;
    padding: 15px 20px;
    background-color: #333;
    border-radius: 5px;
    color: #fff;
    opacity: 0;
    filter: Alpha(opacity = 0);
    transition: all 0.3s ease-in-out;
  }

  .tc-gas .tg-tip .tgt-tx:before {
    content: '';
    position: absolute;
    top: 35px;
    left: -19px;
    border: 10px solid transparent;
    border-right-color: #333;
    z-index: 100;
  }

  .tc-gas .tg-tip .tgt-icon:hover+.tgt-tx{
    opacity: 1;
    filter: Alpha(opacity = 100);
  }

  .txDetail .text-url span {
    color: #ed303b;
    cursor: pointer;
  }

  .txDetail .text-url span:hover {
    text-decoration: underline;
  }

  .txDetail .tx-info {
    margin-bottom: 30px;
  }

  .txDetail .tx-msg {
    margin-bottom: 30px;
  }

  .txDetail .tx-input {
    margin-bottom: 30px;
  }

  .txDetail .tx-logs .td-c {
    padding: 10px 25px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 #e6e6e6;
    font-size: 14px;
    line-height: 30px;
    word-break: break-word;
  }

  .tx-logs .td-c .event-log {
    display: flex;
    align-items: flex-start;
  }

  .td-c .event-log .event-index {
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    text-align: center;
    color: #00c9a7;
    background: rgba(0,201,167,.1);
    border-color: transparent;
  }

  .event-body .event-item:after {
    content: "";
    display: block;
    clear: both;
  }

  .event-body .event-item .event-t {
    display: inline-block;
    width: 100px;
    margin: 0 5px;
    text-align: right;
    vertical-align: top;
    float: left;
  }

  .event-body .event-item .event-c {
    /*display: inline-block;*/
    /*margin: 0 5px;*/
    /*float: left;*/
    margin-left: 120px;
  }

  .event-c .topic-t {
    display: inline-block;
    text-align: center;

  }

  .event-c .topic-t span {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    color: #77838f;
    background-color: rgba(119,131,143,.1);
  }

  .event-c .topic-c {
    display: inline-block;
  }

</style>
