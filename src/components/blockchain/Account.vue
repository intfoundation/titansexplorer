<template>
  <div class="sDetail">
    <div id="box">
      <div class="sd-t">{{isContract ? "Contract " + addr : "Address " + addr}}</div>
      <div class="sd-c">
        <div class="sc-asset">
          <div class="sa-t">
            <div class="sa-tab" v-for="(item,index) in tabList" :class="{'sa-tab-choose': choose === index}" @click="choose = index"><span>{{item}}</span></div>
          </div>
          <div class="sa-c">
            <div class="sa-block sa-asset" v-if="choose === 0" v-loading="isInfoLoading">
              <div class="sa-group">
                <div class="sg-i"><span>{{isContract ? "Contract :" : "Address :"}}</span></div>
                <div class="sg-ii"><span>{{addrInfo.address}}</span></div>
              </div>
              <div class="sa-group">
                <div class="sg-i"><span>Balance :</span></div>
                <div class="sg-ii"><span>{{addrInfo.balance}}</span></div>
              </div>
              <template v-if="isContract">
                <div class="sa-group">
                  <div class="sg-i"><span>Contract Creator :</span></div>
                  <div class="sg-ii">
                    <span>
                      {{addrInfo.delegated}}
                    </span>
                    <span @click="toAddrDetail(addrInfo.creatorAddrUrl)" class="sc-url">{{addrInfo.creatorAddr}}</span>
                    at tx
                    <router-link tag="span" :to="addrInfo.creatHashUrl" type="text" class="sc-url">{{addrInfo.creatHash}}</router-link>
                  </div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Token Tracker :</span></div>
                  <div class="sg-ii">
                    <router-link tag="span" :to="addrInfo.tokenTrackerUrl" type="text" class="sc-url">{{addrInfo.tokenTracker}}</router-link>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="sa-group">
                  <div class="sg-i"><span>Delegate :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.delegated}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Reward :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.reward}}</span></div>
                </div>
                <div class="sa-group">
                  <div class="sg-i"><span>Pending Refund :</span></div>
                  <div class="sg-ii"><span>{{addrInfo.pendingRefund}}</span></div>
                </div>
              </template>
              <div class="sa-group">
                <div class="sg-i"><span>Token :</span></div>
                <div class="sg-ii">
                  <template>
                    <el-select
                      v-model="tokenCount"
                      placeholder="请选择"
                      class="sg-sl"
                      @change="onTokenChange">
                      <el-option-group
                        v-for="group in tokenList"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.tokens"
                          :key="item.address"
                          :label="item.name + ' (' + item.balance + ' ' + item.symbol + ')'"
                          :value="item.address">
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </template>
                </div>
              </div>
              <!--              <div class="sa-group">-->
              <!--                <div class="sg-i"><span>Create Time :</span></div>-->
              <!--                <div class="sg-ii"><span>{{addrInfo.time}}</span></div>-->
              <!--              </div>-->
            </div>
            <div class="sa-block sa-del" v-if="choose === 1">
              <el-table :data="delList" max-height="800" v-loading="isDelLoading">
                <el-table-column label="Address" align="left">
                  <template slot-scope="scope">
                    <span v-if="scope.row.candidate.toLowerCase() === addr.toLowerCase()">{{scope.row.candidate}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.addUrl)">{{scope.row.candidate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount" ></el-table-column>
                <!--                <el-table-column prop="shares" label="Shares" align="left">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <span>{{scope.row.shares}}</span>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="Block" align="left">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.block}}</router-link>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
              </el-table>
              <div class="sa-r" v-if="delPage.isPageShow">
                <el-pagination
                  @current-change="handleDelCurrentChange"
                  :current-page.sync="delPage.currentPage"
                  :page-size="delPage.size"
                  :total="delPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="sa-block sa-undel" v-if="choose === 2">
              <el-table :data="unDelList" max-height="800" v-loading="isUnDelLoading">
                <el-table-column label="Address" align="left" width="450">
                  <template slot-scope="scope">
                    <span v-if="scope.row.candidate.toLowerCase() === addr.toLowerCase()">{{scope.row.candidate}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.addUrl)">{{scope.row.candidate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Amount"  align="left"></el-table-column>
                <el-table-column label="Block" align="left">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.block}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="Timestamp" align="left"></el-table-column>
              </el-table>
              <div class="sa-r" v-if="unDelPage.isPageShow">
                <el-pagination
                  @current-change="handleUnDelCurrentChange"
                  :current-page.sync="unDelPage.currentPage"
                  :page-size="unDelPage.size"
                  :total="unDelPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="sa-block sa-reward" v-if="choose === 3">
              <el-table :data="delRewardList" max-height="800" v-loading="isReWardLoading">
                <el-table-column label="Address" align="left">
                  <template slot-scope="scope">
                    <span v-if="scope.row.candidate.toLowerCase() === addr.toLowerCase()">{{scope.row.candidate}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.addUrl)">{{scope.row.candidate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="reward" label="Reward" align="left"></el-table-column>
              </el-table>
              <div class="sa-r" v-if="delRewardPage.isPageShow">
                <el-pagination
                  @current-change="handleDelRewardCurrentChange"
                  :current-page.sync="delRewardPage.currentPage"
                  :page-size="delRewardPage.size"
                  :total="delRewardPage.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-tx">
          <div class="stx-t">
            <div class="st-l">
              <div class="st-tab" v-for="(item,index) in txTagList" :class="{'st-tab-choose': activeName === index}" @click="activeName = index"><span>{{item}}</span></div>
            </div>
          </div>
          <div class="stx-c">
            <div class="stx-pane" v-show="activeName === 0">
              <div class="st-r" v-if="isPageShow">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="size"
                  :total="total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
              <el-table :data="txList" v-loading="isTxLoading">
                <el-table-column label="TxHash" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.txUrl" type="text" class="sc-url">{{scope.row.transactionHash}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column label="Block" align="left" width="100">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.blockNumber}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>
                <el-table-column label="From" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <span v-if="scope.row.fromAddress.toLowerCase() === addr.toLowerCase()">{{scope.row.fromAddr}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddr}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <template v-if="scope.row.toAddress === null">
                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress.toLowerCase() === addr.toLowerCase()">{{scope.row.toAddr}}</span>
                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">
                    {{scope.row.toAddr}}
                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Value" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
                <!--                <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>-->
                <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
                <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
              </el-table>
              <div class="st-r" v-if="isPageShow">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="size"
                  :total="total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="stx-pane" v-show="activeName === 1">
              <div class="st-r" v-if="IIP20Page.isIIP20TxPageShow">
                <el-pagination
                  @current-change="handleIIP20Change"
                  :current-page.sync="IIP20Page.currentPage"
                  :page-size="IIP20Page.size"
                  :total="IIP20Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
              <el-table :data="iip20Txs" v-loading="isTxLoading">
                <el-table-column label="TxHash" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.txUrl" type="text" class="sc-url">{{scope.row.tx_hash}}</router-link>
                  </template>
                </el-table-column>
                <!--                <el-table-column label="Block" align="left" width="100">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.block_number}}</router-link>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <el-table-column label="From" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <span v-if="scope.row.fromAddress.toLowerCase() === addr.toLowerCase()">{{scope.row.fromAddr}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddr}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <template v-if="scope.row.toAddress === null">
                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress.toLowerCase() === addr.toLowerCase()">{{scope.row.toAddr}}</span>
                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">
                    {{scope.row.toAddr}}
                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Value" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
                <el-table-column label="Token" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.tokenUrl" type="text" class="sc-url">{{scope.row.name + '('+ scope.row.symbol +')'}}</router-link>
                  </template>
                </el-table-column>
                <!--                <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>-->
                <!--                <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>-->
                <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
                <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
              </el-table>
              <div class="st-r" v-if="IIP20Page.isIIP20TxPageShow">
                <el-pagination
                  @current-change="handleIIP20Change"
                  :current-page.sync="IIP20Page.currentPage"
                  :page-size="IIP20Page.size"
                  :total="IIP20Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="stx-pane" v-show="activeName === 2">
              <div class="st-r" v-if="IIP721Page.isIIP721TxPageShow">
                <el-pagination
                  @current-change="handleIIP721Change"
                  :current-page.sync="IIP721Page.currentPage"
                  :page-size="IIP721Page.size"
                  :total="IIP721Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
              <el-table :data="iip721Txs" v-loading="isTxLoading">
                <el-table-column label="TxHash" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.txUrl" type="text" class="sc-url">{{scope.row.tx_hash}}</router-link>
                  </template>
                </el-table-column>
                <!--                <el-table-column label="Block" align="left" width="100">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <router-link tag="span" :to="scope.row.blockUrl" type="text" class="sc-url">{{scope.row.blockNumber}}</router-link>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <el-table-column label="From" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <span v-if="scope.row.fromAddress.toLowerCase() === addr.toLowerCase()">{{scope.row.fromAddr}}</span>
                    <span v-else class="sc-url" @click="toAddrDetail(scope.row.fAddrUrl)">{{scope.row.fromAddr}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="To" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <template v-if="scope.row.toAddress === null">
                      <span class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">{{"Contract Creation"}}</span>
                    </template>
                    <template v-else>
                      <span v-if="scope.row.toAddress.toLowerCase() === addr.toLowerCase()">{{scope.row.toAddr}}</span>
                      <span v-else class="sc-url" @click="toAddrDetail(scope.row.tAddrUrl)">
                    {{scope.row.toAddr}}
                  </span>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Value" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
                <el-table-column prop="token_id" label="TokenId" align="left" width="120" :show-overflow-tooltip="over"></el-table-column>
                <el-table-column label="Token" align="left" :show-overflow-tooltip="over">
                  <template slot-scope="scope">
                    <router-link tag="span" :to="scope.row.tokenUrl" type="text" class="sc-url">{{scope.row.name + '('+ scope.row.symbol +')'}}</router-link>
                  </template>
                </el-table-column>
                <!--                <el-table-column prop="type" label="TxType" align="left" :show-overflow-tooltip="over"  width="120"></el-table-column>-->
                <!--                <el-table-column prop="fromAddr" label="Signer" :show-overflow-tooltip="over" align="left"></el-table-column>-->
                <el-table-column prop="status" label="Status" align="left" width="100"></el-table-column>
                <el-table-column prop="time" label="Timestamp" align="right" width="220"></el-table-column>
              </el-table>
              <div class="st-r" v-if="IIP721Page.isIIP721TxPageShow">
                <el-pagination
                  @current-change="handleIIP721Change"
                  :current-page.sync="IIP721Page.currentPage"
                  :page-size="IIP721Page.size"
                  :total="IIP721Page.total"
                  layout="prev, pager, next, jumper"
                  background>
                </el-pagination>
              </div>
            </div>
            <div class="stx-pane" v-if="activeName === 3">
              <div v-if="showContent">
                <el-container class="el-contract">
                  <el-header style="height:50px">
                    <div>
                      <i class="el-icon-warning"></i>
                      <span> Are you the contract creator?

                      <!-- <router-link style="color:#3498db ; font-weight: bolder" :to="verifyUrl">Verify and Publish</router-link>
                      your contract source code today!</span> -->
                      <a :href="`https://blockscout.explorer.intchain.io/address/${addrInfo.address}/contract_verifications/new`" style="color:#3498db ; font-weight: bolder">Verify and Publish</a>
                      your contract source code today!</span>
                    </div>
                    <!-- <el-row class="c-row">
                      <el-button type="warning" class="c-button">Decompile ByteCode </el-button>
                      <el-button type="warning" class="c-button">Switch to Opcodes View</el-button>
                      <el-button type="info" class="c-button">Similar Contracts</el-button>
                    </el-row> -->
                  </el-header>
                  <el-main class="c-main">
                  <textarea name="text" rows="10" cols="141" class="wordwrap">{{byteCode}}</textarea>
                  </el-main>
                </el-container>
              </div>

              <div v-show="showVerify">
                <el-container class="contract-body">
                  <el-header class="con-header">
                    <div class="csc-t">
                      <el-row style="margin-top: 6px">
                        <el-button class="con-button" @click="cur = 0" :class="{iscur : cur == 0}">Code</el-button>
                        <el-button class="con-button" @click="cur = 1" :class="{iscur : cur == 1}">Read Contract</el-button>
                        <el-button class="con-button" @click="cur = 2" :class="{iscur : cur == 2}">Write Contract</el-button>
                      </el-row>
                    </div>
                  </el-header>
                  <el-main>
                    <div class="blocks blocks1" v-show=" cur == 0">
                      <template>
                        <div class="csc-v">
                          <p><i class="el-icon-success" style="font-size: 14px ; color: #00c9a7 ; margin-right: 4px"></i><strong>Contract Source Code Verified<span style="color: #77838f ; margin-left: 4px">(Exact Match)</span></strong></p>
                          <!-- <i class="el-icon-warning" style="font-size: 22px ; color: #db9a04"></i> -->
                        </div>

                        <div class="exact">
                          <div class="exact-l">
                            <span style="margin-right: 58px">Contract Name:</span>
                            <strong>{{addrInfo.name}}</strong>
                            <el-divider></el-divider>
                            <span style="margin-right: 50px">Compiler Version</span>
                            <strong>{{addrInfo.compiler_name}}</strong>
                          </div>
                          <div class="exact-r">
                            <span style="margin-right: 50px">Optimization Enabled:</span>
                            <span class="exact-span"><strong style="margin-right: 4px">{{addrInfo.contract.optimization}}</strong>with<strong style="margin:0 4px">{{addrInfo.contract.optimizer}}</strong>runs</span>
                            <el-divider></el-divider>
                            <span style="margin-right: 86px">Compiler Version</span>
                            <span class="exact-span"><strong>default </strong>evmVersion, <strong style="margin-right: 4px">None</strong>license</span>
                          </div>
                        </div>
                      </template>

                      <template>
                        <p style="margin: 40px 0 -25px 0"><i class="far fa-file-code text-secondary mr-1" style="margin-right: 4px"></i><strong>Contract Source Code</strong><span style="color: #77838f ; margin-left: 4px"><strong>(Solidity)</strong></span></p>
                        <div v-for="(item, index) in contractCodeList">
                          <div class="csc-s">
                            <p><span style="color: #77838f"><strong v-if="contractCodeList.length > 1">File {{index + 1}} of {{contractCodeList.length}} : {{item.name}}</strong></span></p>
                            <!-- 隐藏 -->
                            <div style="display:none; margin-top: 10px">
                              <el-dropdown class="csc-i">
                                <el-button type="primary" style="background-color: #77838f">
                                  Outline<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" class="csc-m">
                                  <el-dropdown-item>a</el-dropdown-item>
                                  <el-dropdown-item>b</el-dropdown-item>
                                  <el-dropdown-item>c</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                              <el-dropdown class="csc-i" style="margin-left: 5px">
                                <el-button type="primary" style="background-color: #77838f">
                                  More Options<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" class="csc-m">
                                  <el-dropdown-item>a</el-dropdown-item>
                                  <el-dropdown-item>b</el-dropdown-item>
                                  <el-dropdown-item>c</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                            <!-- If the hidden part is displayed, delete these codes and let go of the comment part below -->
                            <div class="c-icon">
                              <!-- Copy textarea content -->
                              <el-tooltip content="Copy source code to clipboaed" placement="top">
                                <a class="rep-text" @click="replicate(index)" :data-clipboard-text="item.text"><i class="el-icon-copy-document"></i></a>
                              </el-tooltip>
                              <!-- Copy the link to the address bar -->
                              <el-tooltip content="Generate Permalink" placement="top">
                                <a class="copy-url" @click="copyUrl" :data-clipboard-text="url"><i class="el-icon-link"></i></a>
                              </el-tooltip>
                              <!-- Switch text field size -->
                              <el-tooltip  content="Toggle Fullscrent" placement="top">
                                <a @click="changeIts(index)" :style="{display:iconsDisplay}"><i class="el-icon-full-screen" ></i></a>
                              </el-tooltip>
                              <a @click="changeIts(index)" :style="{display:activesDisplay}"><i class="fa fa-compress" ></i></a>
                            </div>
                          </div>
                          <!-- <div class="c-icon"></div> -->
                          <textarea v-model="item.text" :class="[item.isActives? 'active':'actives']">{{item.text}}</textarea>
                        </div>
                      </template>

                      <!-- Export ABI -->
                      <template>
                        <div class="csc-s">
                          <p><i class="fa fa-tasks text-secondary mr-1" style="margin-right: 4px"></i><strong>Contract ABI</strong></p>
                          <div  style="margin-top: 10px" class="cab-a">
                            <el-dropdown style="csc-i">
                              <el-button  class="export-b" type="primary" style="background-color: #77838f !important; colorl:#fff !important">
                                Export ABI<i class="el-icon-arrow-down el-icon--right"></i>
                              </el-button>
                              <el-dropdown-menu slot="dropdown" class="csc-m-abi">
                                <el-dropdown-item>
                                  <router-link :to='jsonUrl'><span>JSON Format</span></router-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                  <router-link :to='rawUrl'><span>RAW/Text Format</span></router-link>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                            <div class="ca-icon">
                              <!-- Copy text content -->
                              <el-tooltip content="Copy source code to clipboaed" placement="top">
                                <a :plain="true" class="copy-text" @click="copy" data-clipboard-target="#foo"><i class="el-icon-copy-document"></i></a>
                              </el-tooltip>
                              <!-- Switch text field size -->
                              <el-tooltip content="Toggle Fullscrent" placement="top">
                                <a @click="changeIt" :style="{display:iconDisplay}"><i class="el-icon-full-screen" ></i></a>
                              </el-tooltip>
                              <a @click="changeIt" :style="{display:activeDisplay}"><i class="fa fa-compress" ></i></a>
                            </div>
                          </div>
                        </div>
                        <textarea id="foo" v-model="addrInfo.contract.abi" :class="[isActive? 'change':'changes']" >{{addrInfo.contract.abi}}</textarea>
                      </template>

                      <!-- Contract Creation Code -->
                      <template>
                        <div class="csc-s">
                          <p><i class="fa fa-code text-secondary mr-1" style="margin-right: 4px"></i><strong>Contract Creation Code</strong></p>
                          <div style="margin-top: 10px" class="code-s">
                            <div style="display:none"><a href="/">Decompile ByteCode<i class="el-icon-share" style="margin-left: 4px"></i></a></div>
                            <div style="display:none"><a href="/" style="margin-left: 5px">Switch To Opcodes View</a></div>
                          </div>
                        </div>
                        <textarea class="ace-dawn" style="margin-top: 5px; height:200px">{{addrInfo.byte_code}}</textarea>
                      </template>

                      <!-- Deployed ByteCode Sourcemap -->
                      <!-- <template>
                        <div class="csc-s">
                          <p><i class="far fa-map text-secondary mr-1" style="margin-right: 4px"></i><strong>Deployed ByteCode Sourcemap</strong></p>
                        </div>
                        <textarea class="ace-dawn" style="margin-top: 5px; height:200px">{{addrInfo.source_map}}</textarea>
                      </template>
                      <template>
                        <div class="s-s" style="display: none;">
                          <p><i class="fas fa-chess-board text-secondary mr-1" style="margin-right: 4px"></i><strong>Swarm Source</strong></p>
                        </div>
                        <pre  class="ace-dawn" style="margin-top: 5px; height:64px; display: none;"></pre>
                      </template> -->
                    </div>
                    <!-- Read Contract -->
                    <div class="read-contract" v-show=" cur == 1">
                      <div class="read-flex">
                        <p>
                          <i class="far fa-file-alt text-secondary mr-1"></i>
                          Read Contract Information
                        </p>
                        <a @click="readReset" style="color: #3498db">[Reset]</a>
                      </div>
                      <el-collapse v-model="activeNames"  @change="handleChange" v-for="(read, r) in reads" :key="r">
                        <el-collapse-item :title="read.full_name" :name="r" >
                          <div v-if="read.inputs == '' ? true : false">{{read.value}}<i><span style="margin-left:5px;padding-top: 10px; ">{{read.type}}</span></i></div>
                          <div v-if="read.inputs == '' ? false : true" >
                            <div v-for="(item,index) in read.inputs" :key='index'>
                              <div class="all-flex">
                                <label>{{item.name}}</label>
                                <input autocomplete="off" type="text" v-model="item.value" :placeholder="item.name" class="from-control" id="input">
                              </div>
                            </div>
                            <button class="all-btn" @click="spanshow(r)">Query</button>
                            <div class="warning-info">
                              <span  style="margin-right:5px" v-if='read.value !== undefined ? true : false '>{{read.value}}</span>
                              <i>{{read.type}}</i>
                              <span v-if="read.spanInfo" style="color: #ed303b; margin-left:5px">{{msg}}</span>
                            </div>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </div>

                    <div class="write-contract" v-show=" cur == 2">
                      <div class="write-flex">
                        <p>
                          <i v-if="greenIcon" class="fa fa-circle mr-1 text-success"></i>
                          <i v-if="redIcon" class="fa fa-circle text-danger mr-1"></i>
                          <button class="sub-btn" id="connectButton" @click=requestAccount>Connect to Web3 </button>
                          <span v-if="addrShow">{{this.address}}</span>
                        </p>
                        <a style="color: #3498db" @click="resetWrite">[Reset]</a>
                      </div>
                      <el-collapse  v-model="writeNames" @change="handleChange" v-for="(write,n) in writes" :key="n">
                        <el-collapse-item :title="write.full_name" :name="n">
                          <div v-for="(items,index) in write.inputs" :key="index">
                            <div class="all-flex">
                              <label>{{items.name}}</label>
                              <input autocomplete="off" v-model="items.value" :placeholder="items.name" class="from-control">
                            </div>
                          </div>
                          <button class="all-btn" @click="writeSub(n)">Write</button>
                          <div class="warning-info">
                            <span v-if="write.spanInfo" style="color: #ed303b;">{{message}}</span>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </div>
            <div class="stx-pane" v-show="activeName === 4">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import Clipboard from 'clipboard'
import int4 from "int4.js"
import _ from 'underscore'
const cfg = require('../../../config')
export default {
  name: "StatsDetail",
  data() {
    return {
      addr: this.$route.params.addr,
      choose: 0,
      addrInfo: {},
      isContract: false,
      tabList: [],
      delList: [],
      unDelList: [],
      delRewardList: [],
      txList: [],
      isInfoLoading: true,
      isDelLoading: false,
      isUnDelLoading: false,
      isReWardLoading: false,
      isTxLoading: false,
      isIIP20TokenTxLoading: false,
      isIIP721TokenTxLoading: false,
      over: true,
      currentPage: 1,
      page: 1,
      size: 25,
      total: 0,
      isPageShow: false,
      delPage: {
        currentPage: 1,
        page: 1,
        size: 5,
        total: 0,
        isPageShow: false,
      },
      unDelPage: {
        currentPage: 1,
        page: 1,
        size: 5,
        total: 0,
        isPageShow: false,
      },
      delRewardPage: {
        currentPage: 1,
        page: 1,
        size: 5,
        total: 0,
        isPageShow: false,
      },
      tokenList: [{
        label: 'IIP-20 Tokens',
        tokens: []
      }, {
        label: 'IIP-721 Tokens',
        tokens: []
      }],
      tokenCount: 0,
      txTagList: ['Transactions', 'IIP20 Token Txs', 'IIP721 Token Txs'],
      activeName: 0,
      tokenTxList: [],
      iip20Txs: [],
      iip721Txs: [],
      IIP20Page: {
        currentPage: 1,
        page: 1,
        size: 25,
        total: 0,
        isIIP20TxPageShow: false,
      },
      IIP721Page: {
        currentPage: 1,
        page: 1,
        size: 25,
        total: 0,
        isIIP721TxPageShow: false,
      },
      // verifyUrl: "",
      showContent:false,
      showVerify:false,
      // isActive: true,
      activeDisplay: 'none',
      iconDisplay:'block',
      isActive: true,
      activesDisplay: 'none',
      iconsDisplay:'block',
      isActives: true,
      url:'',
      jsonUrl:'',
      rawUrl:'',
      cur: 0,
      activeNames: [],
      writeNames:[],
      currentChainId: '',
      chainId: '0x7ff',
      testChainId: '0x800',
      reads:[],
      inputs:[],
      // invalidAddr:false,
      message: '',
      address: '', //Little Fox Address
      addrShow:false,
      greenIcon:false,
      redIcon:true,
      msg:'',
      contractCodeList: [],
      byteCode:""
    }
  },
  created() {
    this.currentPage = +this.page;
    this.getAddrDetail();
    this.getAddrTx();
    this.getIIP20TokenTx();
    this.getIIP721TokenTx();
    this.getTokens(this.addr);
    this.url = window.location.href;
  },
  mounted() {
    this.initialize();
  },
  computed: {

  },
  watch: {
    choose(val) {
      switch (val) {
        case 0:
          this.getAddrDetail();
          break;
        case 1:
          this.getDel();
          break;
        case 2:
          this.getUnDel();
          break;
        case 3:
          this.getDelReward();
          break;
      }
    }
  },
  methods: {
    getAddrDetail() {
      this.isInfoLoading = true;
      this.$axios.get('/api/account/detail',{params:{address:this.addr}}).then(res => {
        this.addrInfo = res.data;
        // console.log(res.data.byteCode);
        let keys = Object.keys(res.data);
        if (keys.length === 0) {
          this.addrInfo.address = this.addr;
          this.addrInfo.name = this.addrInfo.name === '' ? "/" : this.addrInfo.name;
          this.addrInfo.balance = 0 + ' INT';
          this.addrInfo.delegated = 0 + ' INT';
          this.addrInfo.pendingRefund = 0 + ' INT';
          this.addrInfo.reward = 0 + ' INT';
          this.addrInfo.time = '/';
        } else {
          this.byteCode = res.data.byteCode;
          if (res.data.isContract) {
            this.isContract = true;
            this.tabList = ['Overview'];
            this.txTagList.push('Contract');
            this.addrInfo.address = this.addrInfo.contract_address;
            this.addrInfo.balance = this.addrInfo.balance ? transAmount(this.addrInfo.balance) + ' INT' : 0 + ' INT';
            this.addrInfo.creatorAddr = hideEnd(this.addrInfo.creator_address);
            this.addrInfo.creatorAddrUrl = `/address/${this.addrInfo.creator_address}`;
            this.addrInfo.creatHash = hideEnd(this.addrInfo.hash);
            this.addrInfo.creatHashUrl = `/tx/${this.addrInfo.hash}`;
            this.addrInfo.tokenTracker = this.addrInfo.contract_type !== 0 ? `${this.addrInfo.name}(${this.addrInfo.symbol})` : "";
            this.addrInfo.tokenTrackerUrl = this.addrInfo.contract_type !== 0 ? `/token/${this.addrInfo.address}` : "";
            //
            // this.verifyUrl = `/verifyContract/${this.addrInfo.address}`;
            this.jsonUrl = `/exportAbi/${this.addrInfo.address}/json`;
            this.rawUrl = `/exportAbi/${this.addrInfo.address}/raw`;
            this.addrInfo.name = this.addrInfo.name ? this.addrInfo.name : '';
            this.addrInfo.compiler_name = this.addrInfo.contract.compiler ? this.addrInfo.contract.compiler.name : '';
            this.addrInfo.contract.optimization = this.addrInfo.contract.optimization === 0? 'no' : 'yes' ;
            this.addrInfo.contract.abi = this.addrInfo.contract.abi ? this.addrInfo.contract.abi : '';
            // this.addrInfo.contract_code = this.addrInfo.contract.contract_code ? this.addrInfo.contract.contract_code : '';
            this.contractCodeList = this.addrInfo.contract.contract_code ? this.addrInfo.contract.contract_code : [];
            this.addrInfo.byte_code = this.addrInfo.contract.code ? this.addrInfo.contract.code.byte_code : '';
            this.addrInfo.source_map = this.addrInfo.contract.code ? this.addrInfo.contract.code.source_map : '';
            this.reads = this.addrInfo.contract.read_contract ? this.addrInfo.contract.read_contract : '';
            this.writes = this.addrInfo.contract.write_contract ? this.addrInfo.contract.write_contract : '';
            if (this.reads.length > 0) { 
              for (let read_num = 0; read_num < this.reads.length; read_num ++) {
                this.activeNames.push(read_num);
              }
            }

            if (this.writes.length > 0) {  
              for (let write_num = 0; write_num < this.writes.length; write_num ++) {
                this.writeNames.push(write_num);
              }
            }
            // this.noParamReadContract(); //无参数的read contract获取

            if(res.data.contract.verify === 1){
              // this.showContent = true;
              this.showVerify = true
            }else{
              // this.showVerify = true
              this.showContent = true;
            }

            //Get the path of the previous page
            if (document.referrer) {
              let arrurl = document.referrer.split('/');
              // console.log(arrurl[3]);
              //If it is the tab coming from the verification contract page, you need to directly locate the contract
              if (arrurl[3] === 'verifyContractSolc') {
                this.activeName = 3;
              }
            }
          }else {
            this.tabList = ['Assets','Delegations','UnDelegations','Delegate Rewards'];
            this.addrInfo = res.data;
            this.addrInfo.name = this.addrInfo.name === '' ? "/" : this.addrInfo.name;
            this.addrInfo.balance = transAmount(this.addrInfo.balance) + ' INT';
            this.addrInfo.delegated = transAmount(this.addrInfo.delegate_balance) + ' INT';
            this.addrInfo.pendingRefund = transAmount(this.addrInfo.pending_refund_balance) + ' INT';
            this.addrInfo.reward = transAmount(this.addrInfo.reward_balance) + ' INT';

            // this.addrInfo.time = this.$moment(this.addrInfo.createtime).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          }
        }
        this.isInfoLoading = false;
      }).catch(err => {
        console.log(err);
      })
    },
    getAddrTx() {
      this.isTxLoading = true;
      this.$axios.get('/api/tx/addresstx',{params:{address:this.addr, pageNo:this.currentPage, pageSize:this.size}}).then(res => {
        this.total = res.data.count;
        this.isPageShow = this.total > 25;
        this.txList = res.data.list;
        this.txList.forEach(item => {
          item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          item.status = statusType(item.status);
          item.amount = toDecimal4NoZero(item.value);
          item.amount = transAmount(item.amount) + " INT";
          item.txUrl = `/tx/${item.hash}`;
          item.blockUrl =  `/block/${item.block_number}/1`;
          item.fAddrUrl = `/address/${item.fromAddress}`;
          item.tAddrUrl =  item.toAddress === null ? `/address/${item.contractAddress}` : `/address/${item.toAddress}`;
          item.fromAddr = item.fromAddress;
          item.toAddr = item.toAddress === null ? item.contractAddress : item.toAddress;
        });
        this.isTxLoading = false;
      }).catch(err => {
        console.log(err);
      })
    },

    getIIP20TokenTx() {
      this.isIIP20TokenTxLoading = true;
      this.$axios.get('/api/tx/tokentx',{params:{address:this.addr, type:1, pageNo:this.IIP20Page.currentPage, pageSize:this.IIP20Page.size}}).then(res => {
        this.IIP20Page.total = res.data.count;
        this.IIP20Page.isIIP20TxPageShow = res.data.count > 25;
        this.iip20Txs = res.data.list;
        this.iip20Txs.forEach(item => {
          item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          item.status = statusType(item.status);
          item.amount = toDecimal4NoZero(item.value);
          item.amount = transAmount(item.amount);
          item.txUrl = `/tx/${item.tx_hash}`;
          item.blockUrl =  `/block/${item.block_number}/1`;
          item.fAddrUrl = `/address/${item.fromAddress}`;
          item.tAddrUrl = `/address/${item.toAddress}`;
          item.fromAddr = item.fromAddress;
          item.toAddr = item.toAddress;
          item.tokenUrl = `/token/${item.token_address}`;
        });
        this.isIIP20TokenTxLoading = false;
      }).catch(err => {
        console.log(err);
      })
    },

    getIIP721TokenTx() {
      this.isIIP721TokenTxLoading = true;
      this.$axios.get('/api/tx/tokentx',{params:{address:this.addr, type:2, pageNo:this.IIP20Page.currentPage, pageSize:this.IIP20Page.size}}).then(res => {
        this.IIP20Page.total = res.data.count;
        this.IIP721Page.isIIP721TxPageShow = res.data.count > 25;
        this.iip721Txs = res.data.list;
        this.iip721Txs.forEach(item => {
          item.time = this.$moment(item.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + '+UTC';
          item.status = statusType(item.status);
          item.amount = toDecimal4NoZero(item.value);
          item.amount = transAmount(item.amount);
          item.txUrl = `/tx/${item.tx_hash}`;
          item.blockUrl =  `/block/${item.block_number}/1`;
          item.fAddrUrl = `/address/${item.fromAddress}`;
          item.tAddrUrl = `/address/${item.toAddress}`;
          item.fromAddr = item.fromAddress;
          item.toAddr = item.toAddress;
          item.tokenUrl = `/token/${item.token_address}`;
        });
        this.isIIP721TokenTxLoading = false;
      }).catch(err => {
        console.log(err);
      })
    },


    handleCurrentChange(val) {
      this.isTxLoading = true;
      this.currentPage = val;
      this.page = val;
      this.getAddrTx()
    },

    handleIIP20Change(val) {
      this.isIIP20TokenTxLoading = true;
      this.IIP20Page.currentPage = val;
      this.IIP20Page.page = val;
      this.getIIP20TokenTx()
    },

    handleIIP721Change(val) {
      this.isIIP721TokenTxLoading = true;
      this.IIP721Page.currentPage = val;
      this.IIP721Page.page = val;
      this.getIIP721TokenTx()
    },

    toAddrDetail(url) {
      this.$router.push(url);
      this.addr = this.$route.params.addr;
      this.page = 1;
      this.currentPage = this.page;
      this.isContract = false;
      this.tabList = ['Assets','Delegations','UnDelegations','Delegate Rewards'];
      this.getAddrDetail();
      this.getAddrTx();
      this.getTokens(this.addr);
      // this.getDel();
      // this.getUnDel();
      // this.getDelReward();
    },
    getDel() {
      this.isDelLoading = true;
      this.$axios.get('/api/account/delegations', {params: {address: this.addr, pageNo:this.delPage.currentPage, pageSize:this.delPage.size}}).then( res => {
        this.delPage.total = res.data.count;
        this.delPage.isPageShow = this.delPage.total > this.delPage.size;
        this.delList = res.data.list;
        this.delList.forEach((v, i) => {
          v.addUrl = `/address/${v.candidate}`;
          v.amount = v.active === 1 ? transAmount(v.proxied_balance) : transAmount(v.deposit_proxied_balance);
        });
      }).catch(err => {
        console.log(err);
      });
      this.isDelLoading = false;
    },
    handleDelCurrentChange(val) {
      this.isDelLoading = true;
      this.delPage.currentPage = val;
      this.delPage.page = val;
      this.getDel();
    },
    getUnDel() {
      this.isUnDelLoading = true;
      this.$axios.get('/api/account/undelegations', { params: {address: this.addr, pageNo:this.unDelPage.currentPage, pageSize:this.unDelPage.size}}).then( res => {
        this.unDelPage.total = res.data.count;
        this.unDelPage.isPageShow = this.unDelPage.total > this.unDelPage.size;
        this.unDelList = res.data.list;
        this.unDelList.forEach( v => {
          let input = JSON.parse(v.unlockInput);
          v.amount = new BigNumber(input.amount, 16).div(new BigNumber(Math.pow(10, 18))).toString();
          v.blockUrl = `/block/${v.block}/1`;
          v.addUrl = `/address/${v.candidate}`;
          v.time = this.$moment(v.timestamp).utc().format('YYYY/MM/DD HH:mm:ss') + 'UTC';
        });
      }).catch(err => {
        console.log(err);
      });
      this.isUnDelLoading = false;
    },
    handleUnDelCurrentChange(val) {
      this.isUnDelLoading = true;
      this.unDelPage.currentPage = val;
      this.unDelPage.page = val;
      this.getUnDel();
    },
    getDelReward() {
      this.isReWardLoading = true;
      this.$axios.get('/api/account/delrewards', {params: {address: this.addr, pageNo:this.delRewardPage.currentPage, pageSize:this.delRewardPage.size}}).then( res => {
        this.delRewardPage.total = res.data.count;
        this.delRewardPage.isPageShow = this.delRewardPage.total > this.delRewardPage.size;
        this.delRewardList = res.data.list;
        this.delRewardList.forEach((v, i) => {
          v.addUrl = `/address/${v.candidate}`;
        });
      }).catch(err => {
        console.log(err);
      });
      this.isReWardLoading = false;
    },
    handleDelRewardCurrentChange(val) {
      this.isReWardLoading = true;
      this.delRewardPage.currentPage = val;
      this.delRewardPage.page = val;
      this.getDelReward();
    },

    getTokens() {
      this.$axios.get('/api/token/tokens', { params: {holderAddress: this.addr}}).then(res => {
        let r = res.data.list;
        this.tokenCount = res.data.count;
        r.forEach( val => {
          if (val.type === 1) {
            this.tokenList[0].tokens.push({
              name: val.name,
              symbol: val.symbol,
              balance: transAmount(val.amount),
              address: val.token_address
            });
          }

          if (val.type === 2) {
            this.tokenList[1].tokens.push({
              name: val.name,
              symbol: val.symbol,
              balance: transAmount(val.amount),
              address: val.token_address
            });
          }
        });
      })
    },

    onTokenChange(val) {
      this.$router.push(`/token/${val}`);
    },

    // Click to select all textarea content
    copy(){
      let _this = this;
      var clipboard = new Clipboard('.copy-text')
      clipboard.on('success', function(e) {
        _this.$message.success("Copy Contract ABI successfully")
        e.clearSelection();
        clipboard.destroy();
      });
      //Failure callback
      clipboard.on('error', function(e) {
        _this.$message.error("This browser does not support automatic copy")
        clipboard.destroy();
      });
    },

    // Zoom in and zoom out
    changeIt: function() {
      this.isActive = !this.isActive;
      if (this.isActive == true) {
        this.activeDisplay = 'none';
        this.iconDisplay = 'block'
      } else {
        this.activeDisplay = 'block';
        this.iconDisplay = 'none'
      }
    },

    replicate(index){
      let _this = this;
      var clipboard = new Clipboard('.rep-text')
      clipboard.on('success', function(e) {
        _this.$message.success("Copy Contract Source Code successfully")
        e.clearSelection();
        clipboard.destroy();
      });
      //Failure callback
      clipboard.on('error', function(e) {
        _this.$message.error("This browser does not support automatic copy")
        clipboard.destroy();
      });
    },

    // Copy browser address
    copyUrl(){
      let _this = this;
      let clipboard = new Clipboard(".copy-url");
      clipboard.on("success", e => {
        _this.$message.success("Copy link successfully")
        //Release memory
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // Does not support copying, prompt to write according to the UI actually used by your project
        _this.$message.error("This browser does not support automatic copy")
        // Release memory
        clipboard.destroy();
      });
    },

    changeIts: function(index) {
      this.contractCodeList[index].isActives = !this.contractCodeList[index].isActives;
      if (this.contractCodeList[index].isActives == true) {
        this.contractCodeList[index].activesDisplay = 'none';
        this.contractCodeList[index].iconsDisplay = 'block'

      } else {
        this.contractCodeList[index].activesDisplay = 'block';
        this.contractCodeList[index].iconsDisplay = 'none'
      }
    },


    handleChange(val) {
      console.log(val);
    },

    // read
    async spanshow(r){
      if(this.reads && this.reads.length > 0){
        for(let read of this.reads){
          read.spanInfo = false;
        }
      }
      if (this.reads[r].inputs && this.reads[r].inputs.length > 0) { //有值
        // this.reads[r].spanInfo = false;
        let params = [];
        for (let input of this.reads[r].inputs) {
          params.push(input.value);
          let num = input.value;
            let flag = false;
            switch(input.type) {
              case 'address':
                flag = int4.utils.isAddress(num);
                this.msg = "Error:Invalid address";
                break;
              case 'string':
                // flag = _.isString(num);
                // this.msg = "Error:Invalid string";
                // break;
                if (!num) {
                  flag = false;
                } else {
                  flag = _.isString(num);
                }
                this.message = "Error:Invalid string";
                break;
              case 'bool':
                // flag = _.isBool(num);
                // this.msg = "Error:Invalid bool";
                // break;
                if (num === 'true' || num === 'num') {
                  // Convert to boolean
                  inputBox.value = JSON.parse(num);
                }
                flag = _.isBoolean(num);
                this.message = "Error:Invalid bool";
                break;
              case 'uint256':
                if (num && parseFloat(num).toString() == num) {
                  // Get the bignumber type of the maximum value of uint256
                  let max = Math.pow(2, 256) - 1;
                  max = new BigNumber(max);
                  // Convert the value of the input box to bignumber type
                  num = new BigNumber(num);
                  // Satisfy if you don't exceed it
                  if (num.lte(max)) {
                    flag = true;
                  } else {
                    flag = false;
                  }
                }
                this.msg = "Error:Invalid uint256";
                break;
              case 'uint8':
                if (num && num < 255) {
                  flag = true;
                }
                this.msg = "Error:Invalid uint8";
                break;
              case 'bytes4':
                if (num.length == 10 && num.substring(0, 2) == '0x') {
                  flag = int4.utils.isHex(num);
                }
                this.msg = "Error:Invalid bytes4";
                break;
              case 'bytes':
                if (num.substring(0, 2) == '0x') {
                  flag = int4.utils.isHex(num);
                }
                this.msg = "Error:Invalid bytes";
                break;
              default:
                flag = false;
                this.msg = "Error:No match type";
            }
            if(!flag) {
              this.msg = ''+this.msg+' of parameters for "' + this.reads[r].name + '". expected ' + this.reads[r].inputs.length + '!'
              this.reads[r].spanInfo = true; //显示提示
              this.reads[r].value = "";
              return;
            }

        }
        //If this.spanInfo is still false after the loop, the input has a value
        if (this.reads[r].spanInfo === false) {
          let contractAbi = this.reads[r].abi;
          let result = await this.withParamReadContract(contractAbi, this.addrInfo.address, params);
          if (result.data !== undefined) {
            this.reads[r].value = result.data;
          } else {
            this.message = result.message;
          }
        }
        //Determine whether the input corresponding to the button has a value
      }
    },

    readReset(){
      for(let values of this.reads){
        if (values.inputs && values.inputs.length > 0) {
          values.value = '';
          for (let input of values.inputs) {
            input.value = '';
          }
        }
      }
    },

    // write
    async writeSub(n){
      //The outermost loop hide all prompt information
      if(this.writes && this.writes.length > 0){
        for(let write of this.writes){
          write.spanInfo = false;
        }
      }
      // First judge whether the address is connected and after the connection is successful, judge whether there is a value
      if(this.address){
        let params = [];
        let payable_value;
        // Determine whether there is an input box
        if(this.writes[n].inputs && this.writes[n].inputs.length > 0){
          // Get the value of input, determine the data type
          for(let inputBox of this.writes[n].inputs){
            if (inputBox.payable && inputBox.payable === true){
              payable_value = inputBox.value;
            } else {
              params.push(inputBox.value);
            }
            //1. Judgment type: address/uint256/uint8/string/bool
            // console.log(this.writes[n].inputs,'input');

            let flag = false;
            switch(inputBox.type) {
              case 'address':
                flag = int4.utils.isAddress(inputBox.value);
                this.message = "Error:Invalid address";
                break;
              case 'string':
                if (!inputBox.value) {
                  flag = false;
                } else {
                  flag = _.isString(inputBox.value);
                }
                this.message = "Error:Invalid string";
                break;
              case 'bool':
                if (inputBox.value === 'true' || inputBox.value === 'false') {
                  // Convert to boolean
                  inputBox.value = JSON.parse(inputBox.value);
                }
                flag = _.isBoolean(inputBox.value);
                this.message = "Error:Invalid bool";
                break;
              case 'uint256':
                // Get the bignumber type of the maximum value of uint256
                if (inputBox.value && parseFloat(inputBox.value).toString() == inputBox.value) {
                  // Get the bignumber type of the maximum value of uint256
                  let max = Math.pow(2, 256) - 1;
                  max = new BigNumber(max);
                  // Convert the value of the input box to bignumber type
                  inputBox.value = new BigNumber(inputBox.value);
                  // console.log(num)
                  // Satisfy if you don't exceed it
                  if (inputBox.value.lte(max)) {
                    flag = true;
                  } else {
                    flag = false;
                  }
                }
                this.message = "Error:Invalid uint256";
                break;
              case 'uint8':
                if (inputBox.value && inputBox.value < 255) {
                  flag = true;
                }
                this.message = "Error:Invalid uint8";
                break;
              case 'bytes4':
                if (inputBox.value.length == 10 && inputBox.value.substring(0, 2) == '0x') {
                  flag = int4.utils.isHex(inputBox.value);
                }
                this.message = "Error:Invalid bytes4";
                break;
              case 'bytes':
                if (inputBox.value.substring(0, 2) == '0x') {
                  flag = int4.utils.isHex(inputBox.value);
                }
                this.message = "Error:Invalid bytes";
                break;
              case 'number':
                // Multiply 10 to the 18th power to determine whether it is a positive integer
                if (inputBox.value > 0 && /^[+]{0,1}(\d+)$/.test(inputBox.value * Math.pow(10, 18))) {
                  flag = true;
                }
                this.message = "Error:Invalid number";
                break;
              default:
                flag = false;
                this.message = "Error:No match type";
            }
            if(!flag) {
              this.writes[n].spanInfo = true;
              return;
            }
          }
        }
        // If the error message is not displayed (inputs have values) and the address data is rendered to the page, call the interface
        if(this.writes[n].spanInfo === false && this.addrShow === true){
          let contractAbi = this.writes[n].abi;
          let result = await this.WriteContract(contractAbi, this.addrInfo.address, params, payable_value);
          if (result) {
            this.message = result.message;
            this.writes[n].spanInfo = true;
          }
        }
      }else{
        this.message = 'Please connect to your Web3 provider!';
        this.writes[n].spanInfo = true;
      }
    },

    resetWrite(){
      for(let values of this.writes){
        if (values.inputs && values.inputs.length > 0) {
          for (let input of values.inputs) {
            input.value = '';
          }
        }
      }
    },

    //Get the read contract without parameters
    async noParamReadContract() {
      if (this.reads && this.reads.length > 0) {
        for (let read of this.reads) {
          if (read.inputs.length === 0) {
            let functionSig = int4.abi.methodID(read.abi.name, []).substr(2, 8);
            let tx = {
              to: this.addr,
              data: "0x" + functionSig,
            }
            let body = `{"jsonrpc":"2.0","method":"int_call","params":[` + JSON.stringify(tx) + `,"latest"],"id":1}`;
            let result;
            try {
              result = await this.run(body);
              if (result) {
                let decodeData = int4.abi.decodeParams([""], [read.type], result);
                if (read.type === 'uint256' || read.type === 'uint8' || read.type === 'string') {
                  read.value = decodeData['0'].toString();
                } else if (read.type === 'bool' || read.type === 'address') {
                  read.value = decodeData["0"];
                } else {
                  read.value = result;
                }
              }
            } catch (e) {
              console.log("error", e);
            }
          }
        }
      }
    },

    //Get the read contract with parameters
    async withParamReadContract(contractAbi, contractAddr, params) {
      let inputs = contractAbi.inputs;
      let outputs = contractAbi.outputs;
      let inputTypes = [];
      let outputObj = {
        names: [],
        types: []
      };
      if (inputs && inputs.length > 0) {
        for (let input of inputs) {
          inputTypes.push(input.type)
        }
      }

      if (outputs && outputs.length > 0) {
        for (let output of outputs) {
          outputObj.names.push(output.name);
          outputObj.types.push(output.type);
        }
      }
      let data = int4.abi.encodeParams(inputTypes, params);
      let functionSig = int4.abi.methodID(contractAbi.name, inputTypes).substr(2, 8);
      let tx = {
        to: contractAddr,
        data: "0x" + functionSig + data.substring(2)
      }
      // Calling RPC practices
      // let body = `{"jsonrpc":"2.0","method":"int_call","params":[` + JSON.stringify(tx) + `,"latest"],"id":1}`
      // try {
      //   let result = await this.run(body);
      //   let r = int4.abi.decodeParams(outputObj.names, outputObj.types, result);
      //   if (outputObj.types && outputObj.types.length > 0) {
      //     for (let i = 0; i < outputObj.types.length; i++) {
      //       if (outputObj.types[i] === 'uint256' || outputObj.types[i] === 'uint8') {
      //         r[i] = r[i].toString();
      //       }
      //     }
      //   }
      //   return {
      //     data: r[0],
      //     message: 'Success'
      //   };
      // } catch (e) {
      //   console.log("Failed to call contract， error:" + e);
      //   return {
      //     message: 'Fail',
      //   }
      // }

      //Call the little fox
      try {
        return await ethereum.request({
          method: 'eth_call',
          params: [tx],
        }).then((result) => {
          // console.log('hash', result);
          let r = int4.abi.decodeParams(outputObj.names, outputObj.types, result);
          if (outputObj.types && outputObj.types.length > 0) {
            for (let i = 0; i < outputObj.types.length; i++) {
              if (outputObj.types[i] === 'uint256' || outputObj.types[i] === 'uint8' || outputObj.types[i] === 'string') {
                r[i] = r[i].toString();
              }
            }
          }
          return {
            data: r[0],
            message: 'Success',
          }
        }).catch((error) => {
          console.log('tx error', error);
          return {
            message: 'Fail',
          }
        });
      } catch (e) {
        console.log("Failed to call contract， error:" + e);
        return {
          message: 'Fail',
        }
      }
    },

    //write contract
    async WriteContract(contractAbi, contractAddr, params, payable_value) {
      let inputs = contractAbi.inputs;
      let outputs = contractAbi.outputs;
      let inputTypes = [];
      let outputObj = {
        names: [],
        types: []
      };
      if (inputs && inputs.length > 0) {
        for (let input of inputs) {
          inputTypes.push(input.type)
        }
      }
      if (outputs && outputs.length > 0) {
        for (let output of outputs) {
          outputObj.names.push(output.name);
          outputObj.types.push(output.type);
        }
      }
      //If it is a transfer, it is necessary to judge whether the balance is sufficient
      if (contractAbi.name === 'transfer' || contractAbi.name === 'transferFrom') {
        let balance_abi = {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          };
        let param1 = '';
        if (contractAbi.name === 'transfer') {
          //Get the contract address balance
          param1 = this.address;
        } else if (contractAbi.name === 'transferFrom') {
          //Get the contract address balance of the first parameter
          param1 = params[0];
        }
        let balanceOf = await this.withParamReadContract(balance_abi, this.addrInfo.address, [param1]);
        let balance = 0;
        if (balanceOf.data) {
          balance = balanceOf.data;
        }
        // console.log('balance ' + balance);
        // console.log('amount: ' + params[params.length - 1]);
        //Compare the balance with the transfer amount, the last object of the params array is the transfer amount
        if (parseInt(balance) < parseInt(params[params.length - 1])) {
          // console.log('Insufficient balance');
          return {
            message: 'Insufficient balance'
          }
        }
      }
      for (let input in inputTypes) {
        if (inputTypes[input] === 'uint8' || inputTypes[input] === 'uint256') { //Is the amount and needs to be converted
          params[input] = new BigNumber(params[input]);
        }
      }
      let data = int4.abi.encodeParams(inputTypes, params);
      let functionSig = int4.abi.methodID(contractAbi.name, inputTypes);
      if (payable_value) {
        payable_value = '0x' + new BigNumber(payable_value * Math.pow(10, 18)).toString(16);
      } else {
        payable_value = '0x0';
      }
      let tx = {
        from: this.address,
        to: contractAddr,
        value: payable_value,
        data: functionSig + data.substring(2)
      }
      // console.log(tx);
      let gasPrice = await this.getGasPrice();
      if (gasPrice) {
        tx.gasPrice = gasPrice;
      }
      let gas = await this.getGas(tx);
      if (gas) {
        tx.gas = gas;
      }
      return await ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
        }).then((result) => {
          // console.log('hash', result);
          return {
            message: 'Success',
          }
          // this.$alert("hash:" + result, "success", {
          //   confirmButtonText: this.$t("confirm"),
          //   type: "success",
          // });
        }).catch((error) => {
          console.log('tx error', error);
          return {
            message: 'Fail',
          }
        });
    },

    //get gasprice
    async getGasPrice() {
      return await ethereum.request({
          method: 'eth_gasPrice',
          params: []
        }).then((result) => {
          // console.log('gasprice', result);
          return result;
        }).catch((error) => {
            console.log('error', error)
          }

        )
    },

    //get gas
    async getGas(params) {
      // console.log(params);
      return await ethereum.request({
          method: 'eth_estimateGas',
          params: [params],
        }).then((result) => {
          // console.log('gas', result);
          return result;
        }).catch((error) => {
            console.log('error', error)
          }

        )
    },

    async run(body){
      let url = `http://${cfg.configs.rpcHost}:${cfg.configs.rpcPort}`;
      let options = {
        url: url,
        method: 'POST',
        headers: { "content-type": "application/json" },
        data: body,
      };
      return await this.$axios(options).then((res)=> {
        let data = res.data;
        if (data.result) {
          // console.log("data", data)
          return data.result;
        } else {
          console.log("error", data)
        }
      }).catch((err) => {
        console.log('err ' + err);
      })
    },

    async initialize () {
      this.currentChainId = await ethereum.request({ method: 'eth_chainId' });

      ethereum.on('chainChanged', (_chainId) => {
        this.connectAccount(_chainId)
      });

      ethereum.on('accountsChanged', (_accounts) => {
        this.requestAccount()
      });
    },

    async requestAccount () {
      this.currentChainId = await ethereum.request({ method: 'eth_chainId' });
      try {
        if (this.currentChainId !== this.chainId && this.currentChainId !== this.testChainId && this.currentChainId !== '0x1' && this.currentChainId !== '0x38') {
          // console.log('navbar request account', this.currentChainId)
          this.connectAccount();
        } else {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          // this.address = `${accounts[0].substr(0, 6)}...${accounts[0].slice(-4)}`;
          this.address = `${accounts[0]}`;
          // console.log('连接1');
        }
        // console.log('address' + this.address);
          // Hide address
          if(this.address === ''){
            this.redIcon = true;
            this.greenIcon = false;

            this.addrShow = false;
            // console.log(this.addrShow);
          }else{
            this.addrShow = true;
            this.redIcon = false;
            this.greenIcon = true;
          }
      } catch (e) {
        console.log('request accounts error:', e);
      }
    },

    async connectAccount () {
      // console.log("navbar connect account", this.currentChainId)
      try {
        if (this.currentChainId !== this.chainId  && this.currentChainId !== this.testChainId && this.currentChainId !== "0x1" && this.currentChainId !== "0x38") {
          this.address = this.$t('wrongNetwork');
        }else {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          // this.address = `${accounts[0].substr(0, 6)}...${accounts[0].slice(-4)}`;
          this.address = `${accounts[0]}`;
          // console.log('连接2');
        }
        // console.log('address' + this.address);
      } catch (e) {
        console.log('request accounts error:', e);
      }
    },
  }
}
</script>

<style scoped>
.sDetail #box {
  padding: 30px 0 50px;
}

.sDetail .sd-t {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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

.sDetail .sc-asset .sa-c {
  width: 100%;
  background-color: #fff;
}

.sc-asset .sa-c .sa-block {
  padding: 20px 15px 40px;
  border-radius: 0 0 4px 4px;
}

.sc-asset .sa-c .sa-block .sa-r {
  height: 45px;
  padding: 10px 0 10px;
  text-align: right;
}

.sc-asset .sa-c .sa-asset {
  padding: 25px;
}

.sc-asset .sa-c .sa-group {
  display: flex;
  align-items: center;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 14px;
}

.sa-group .sg-i {
  width: 150px;
  font-weight: 700;
}

.sDetail .sc-tx {
  margin-bottom: 30px;
}

.sDetail .sc-tx .stx-t {
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: flex-end;*/
  /*margin-bottom: 10px;*/
}

.sc-tx .stx-t .st-l {
  background-color: #fff;
  box-shadow: 0 4px 8px 0 #e6e6e6;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid #e6e6e6;
  /*height: 45px;*/
}

.sc-tx .stx-t .st-l .st-tab {
  display: inline-block;
  padding: 0 20px;
  height: 45px;
  line-height: 45px;
  border-bottom: 2px solid transparent;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: .3s;
}

.sc-tx .stx-t .st-l .st-tab:hover {
  color: #ed303b;
}

.sc-tx .stx-t .st-l .st-tab-choose {
  color: #ed303b;
  border-bottom-color: #ed303b;
  background-color: #fff;
}

.sDetail .sc-tx .stx-c {
  padding: 0 15px 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 #e6e6e6;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid rgb(230,230,230);
  border-top: 0;
}

.sDetail .sc-tx .stx-c .st-r {
  float: right;
  margin: 15px 0;
}

.sDetail .sc-tx .stx-c:after {
  content:'';
  display: block;
  clear: both;
}

.sc-url {
  color: #ed303b;
  cursor: pointer;
}

.sc-url:hover {
  text-decoration: underline;
}

.sg-ii .sg-sl {
  width: 350px;
}

.el-contract{
  color: #12161c;
  line-height: 60px;
  font-size: 14px;
}

.c-button{
  padding: 6px 12px !important;

}
.c-row{
  margin-top: -10px;
}

.c-main {
  color: #333;
  line-height: 160px;
  margin-top: -10px;
}

.wordwrap{
  height: 240px;
  color: #12161c;
  background-color: #f8f9fa;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
}

.con-header{
  color: #333;
  line-height: 60px;
}

.con-button{
  padding: 6px 12px !important;
  border: 1px solid #d5dae2;
}

.el-main {
  color: #12161c;
  font-size: 14px;
}

.csc-v{
  display: flex;
  justify-content: space-between;
}

.exact{
  display: flex;
  justify-content: space-around;
  margin-top: 26px;

}

.exact-l , .exact-r{
  width: 579px;
}

.exact-l{
  margin-right: 50px ;
}

.csc-s{
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
}

.el-dropdown {
  vertical-align: top;
}
.csc-s .el-button{
  padding: 6px 12px !important;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.csc-i{
  position: relative;
  margin-left: 5px;
}

.csc-m-abi{
  width: 156px;
  height: 74px;
  padding: 16px 0;
  /* animation-duration: 300ms; */
}

.csc-m-abi span{
  font-size: 12px;
  color: #6c757e;
}

.c-icon{
  display: flex;
  justify-content: flex-end!important
}

.c-icon a{
  width: 26px;
  height: 26px;
  background-color: #77838f;
  margin-right: 5px;
  border-radius: 5px;
}

.c-icon a i{
  color: #fff;
  font-size: 16px;
  margin: 5px 0 0 5px ;
}
.ace-dawn{
  background-color: #F9F9F9;
  color: #080808;
  margin-top: 5px;
}

.cab-a{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.ca-icon{
  /* margin-left: 5px; */
  display: flex;
}

.ca-icon a{
  width: 26px;
  height: 26px;
  background-color: #77838f;
  border-radius: 4px;
}

.ca-icon .copy-text{
  margin: 0 5px;
}

.ca-icon a i{
  color: #fff;
  font-size: 16px;
  margin: 5px 0 0 5px ;
}

.code-s{
  display: flex;
  justify-content: space-between;
}

.code-s a{
  color: #fff;
  background-color: #db9a04;
  border-radius: 4px;
  padding: 6px 12px;
}

textarea{
  width: 1208px;
  border: none;
}

.active{
  height: 200px;
  background-color: #F9F9F9;
  color: #080808;
  margin-top: 5px;
}

.actives{
  /* display: inline-block; */
  height: 1000px;
  background-color: #F9F9F9;
  color: #080808;
  margin-top: 5px;
}

.change{
  background-color: #F9F9F9;
  color: #080808;
  margin-top: 5px;
  height: 200px;
}

.changes{
  background-color: #F9F9F9;
  color: #080808;
  margin-top: 5px;
  height: 400px;
}

/* read-contract */

.read-contract .el-collapse, .write-contract .el-collapse{
  border: none;
}
.read-contract .el-collapse .el-collapse-item, .write-contract .el-collapse .el-collapse-item{
  border: 1px solid rgba(0,0,0,.125);
  margin: 10px;
  border-radius: 5px;
}
.read-flex, .write-flex{
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
}

.all-flex{
  display: flex;
  flex-direction: column;
  padding-right: 15px;
}

.from-control{
  height: 20px;
  padding: 5px 10px;
  margin: 6px 0 13px 0;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.all-btn{
  background-color: #f8f9fa;
  /* opacity: .9; */
  border: 1px solid #ced4da;
  padding: 5px 10px;
  border-radius: 5px;
  cursor:pointer;
}

.warning-info{
  margin-top: 10px;
}

.all-btn:hover{
  background-color: #ced4da;
  color: #fff;
}

.all-btn:focus{
  background-color: #ced4da;
  color: #fff;
}

/* .write-contract .all-btn:hover {
  background-color: #ed303b !important;
  color: #fff !important;
}
.write-contract .all-btn:focus {
  background-color: #ed303b !important;
  opacity: 0.7;
  color: #fff !important;
}

.write-contract .all-btn{
  background-color: #ed303b;
  color: #fff;
  opacity: .9;
} */

.iscur{
  color: #ed303b !important;
  border: 1px solid #ed303b !important;
}
.sub-btn{
  border: none;
  background-color: #fff;
  color: #3498db;
}

.sub-btn span{
  margin-left: 4px;
  color: #000;
}

a i:hover{
  opacity: .5;
  cursor:pointer
}

.export-b:hover{
  color: #fff !important;
}

.export-b:focus{
  color: #fff !important;
}



</style>
