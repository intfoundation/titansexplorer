<template>
  <div class="verify">
    <div class="container">
      <div class="text-center">
        <div class="w-md">
          <h1 style="font-size: 24px">Verify & Publish Contract Source Code</h1>
          <span class="badge" v-if="compilerTyper === '0'"
            >Compiler Type: SINGLE FILE / CONCATENANTED METHOD</span
          >
          <span class="solbadge" v-if="compilerTyper === '1'"
            >Compiler Type: SOLIDITY MULTI-PART VERIFIER (IMPORTS)</span
          >
          <span class="jsonbadge" v-if="compilerTyper === '2'"
            >Compiler Type: STANDARD JSON-INPUT</span
          >
        </div>
      </div>
      <div class="boder-container">
        <div class="border-top">
          <p style="color: #6c757e; font-size: 14px"  v-if="compilerTyper === '0'">
            <span class="none">Info:</span> A simple and structured interface
            for verifying smart contracts that fit in a single file
          </p>
          <p style="color: #6c757e; font-size: 14px"  v-if="compilerTyper === '1'">
            <span class="none">Info:</span>  This is an experimental source code verifier which supports verification of
            multi-part solidity files  (imports).
          </p>
          <p style="color: #6c757e; font-size: 14px"  v-if="compilerTyper === '2'">
            <span class="none">Info:</span> Standard Json-Input is the recommended way to interface with the Solidity compiler especially for more complex and automated setups.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <ul class="nav">
            <li class="nav-item">
              <a @click="tab = 0" :class="{ isTab: tab == 0 }"
                >Contract Source Code</a
              >
              <a v-show="tabShow" @click="tab = 1" :class="{ isTab: tab == 1 }"
                >Compiler Output</a
              >
            </li>
          </ul>
        </div>
        <div class="card-body" v-show="tab == 0">
          <!--  合约已经认证 -->
          <div class="tab-content tab-err-content" v-if="status === '1' ">
            <p><i class="fa fa-angle-right"></i>  The Contract Source code for <a style="color: #ed303b">{{address}}</a>  has already been verified.</p>
            <p><i class="fa fa-angle-right"></i> Click here to view the <a style="color: #ed303b"  :href="verified_url">Verified Contract Source Code</a> </p>
          </div>

          <!-- 合约未认证 -->
          <div class="tab-content" v-if="status !== '1' ">
          <!-- <div class="tab-content" > -->
            <div class="alert" v-show="showBox">
              <button type="button" class="close">
                <span @click="closeBox">×</span>
              </button>
              <ul v-if="compilerTyper === '0' || compilerTyper === '1'">
                <li>
                  1. If the contract compiles correctly at
                  nofollow noopener, it should also compile correctly here.
                </li>
                <li>
                  2. We have limited support for verifying contracts created by
                  another contract and there is a timeout of up to 45 seconds
                  for each contract compiled.
                </li>
                <li>
                  3. For programatic contract verification, check out theContract API Endpoint
                </li>
              </ul>
              <ul v-if="compilerTyper === '2'">
                <li>
                  1. Contract sources in the json file must be formatted as Literal contents  and NOT as urls
                </li>
                <li>
                  2. Use multiple literal {"content": "", ...} for multi part contracts containing multiple source files
                </li>
                <li>
                  3. A serializing raw text tool  for converting objects to JSON string is also available.
                </li>
              </ul>
            </div>
            <div
              class="row"
              v-if="compilerTyper === '0' || compilerTyper === '1'"
            >
              <div class="js-from" style="width: 460px">
                <label>Contract Address </label>
                <el-input
                  class="ad-input"
                  v-model="address"
                  placeholder="请输入内容"
                ></el-input>
              </div>
              <div class="js-from" style="width: 470px">
                <label >Compiler </label>
                <!-- <el-input style="width: 470px ;" v-model="licenseType" disabled>
                  </el-input> -->
                <el-select
                  class="compiler-input"
                  v-model="compilerItem"
                  disabled
                  placeholder="[Please Select]"
                >
                  <el-option
                    v-for="item in compiler"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="col-md" style="margin-right: 2px">
                <div style="margin: 6px 0">
                  <i class="far fa-question-circle text-muted"></i>
                  <label>Optimization </label>
                </div>
                <el-select
                  style="width: 224px"
                  class="op-selest"
                  v-model="optimization"
                  placeholder="no"
                >
                  <el-option
                    v-for="item in optimizationType"
                    :key="item.id"
                    :label="item.type"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <!-- 单个合约 -->
            <!-- <div class="single-contract" @change="singContract" v-if='singMsg'> -->
            <div v-if="compilerTyper === '0'">
              <div class="single-contract">
                <label
                  for="txtSourceCode"
                  class="d-block"
                  style="display: block"
                >
                  <b>Enter the Solidity Contract Code below </b>
                  <span class="text-danger">*</span>
                </label>
                <textarea v-model="fileMsg"></textarea>
              </div>
            </div>

            <!-- 多个合约  Please select the Solidity (*.sol) files for upload -->
            <div v-if="compilerTyper === '1'">
              <div class="message">
                <label for="txtSourceCode" class="d-block">
                  <b>Please select the Solidity (*.sol) files for upload</b>
                  <span class="text-danger">*</span>
                </label>
                <div class="upload">
                  Step 1:
                  <input
                    type="file"
                    multiple="multiple"
                    accept=".sol"
                    @change="onFileSelected"
                    value="请选择文件夹"
                  />
                </div>
                <div class="upload">
                  Step 2:
                  <input
                    type="submit"
                    @click="submitInfo"
                    value="Click to Upload selected files"
                  />
                </div>
                <div v-if="fileInfo" class="m-files">
                  <div v-for="(item, index) in MulFiles" :key="index">
                    <span>{{ item.name }}</span>
                    <span>{{ item.size }} byte</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="compilerTyper === '2'">
              <div class="row">
                <div class="js-from" style="width: 600px">
                  <label>Contract Address </label>
                  <el-input
                    class="ad-input"
                    v-model="address"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="js-from json" style="width: 600px">
                  <label>Compiler </label>
                  <el-select
                    class="compiler-input"
                    v-model="compilerItem"
                    disabled
                    placeholder="[Please Select]"
                  >
                    <el-option
                      v-for="item in compiler"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>

              <div class="message" v-if="compilerTyper === '2'">
                <label for="txtSourceCode" class="d-block">
                  <b
                    >Please select the Standard-Input-Json (*.json) file to
                    upload</b
                  >
                  <span class="text-danger">*</span>
                </label>
                <div class="upload">
                  Step 1:
                  <input
                    type="file"
                    accept=".json"
                    @change="onFileJson"
                    value="请选择文件夹"
                  />
                </div>
                <div class="upload">
                  Step 2:
                  <input
                    type="submit"
                    @click="submitJson"
                    value="Click to Upload selected files"
                  />
                </div>
              </div>
            </div>

            <div id="basicsAccordion">
              <!-- ABI-encoded -->
              <div class="card-m">
                <el-collapse
                  class="card-item"
                  v-model="activeNames"
                  @change="handleChange"
                >
                  <el-collapse-item style="magrin-top: 15px">
                    <template slot="title">
                      Constructor Arguments<a
                        href="https://docs.soliditylang.org/en/develop/abi-spec.html"
                        >ABI-encoded</a
                      >
                      <span style="color: #77838f"
                        >(for contracts that were created with constructor
                        parameters)</span
                      >
                    </template>
                    <textarea
                      name=""
                      v-model="nododata"
                      class="card-info"
                    ></textarea>
                    <p style="margin: 0 0 0 14px">
                      For additional information on Constructor Arguments
                    </p>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <!-- Contract Library Address -->
              <div class="card-m" style="display: none">
                <el-collapse
                  class="card-item"
                  v-model="activeNames"
                  @change="handleChange"
                >
                  <el-collapse-item>
                    <template slot="title">
                      Contract Library Address
                      <span style="color: #77838f"
                        >(for contracts that were created with constructor
                        parameters)</span
                      >
                    </template>
                    <div class="card-table" style="margin: 0 0 0 14px">
                      <p>
                        <b
                          >Note: Library names are case sensitive and affects
                          the keccak library hash
                        </b>
                      </p>
                      <div class="card-flex">
                        <div class="form-inline">
                          <label>Library_1 Name:</label>
                          <input type="text" />
                        </div>
                        <div class="form-inline">
                          <span>
                            <i class="fa fa-long-arrow-alt-right btn-icon__inner"></i>
                          </span>
                        </div>
                        <div class="form-inline">
                          <label>Library_1 Contract Address:</label>
                          <input type="text" placeholder="ox.." />
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <!-- Misc Settings -->
              <div class="card-m">
                <el-collapse
                  class="card-item"
                  v-model="activeNames"
                  @change="handleChange"
                >
                  <el-collapse-item>
                    <template slot="title">
                      Misc Settings
                      <span style="color: #77838f"
                        >(Runs, EvmVersion & License Type settings)</span
                      >
                    </template>
                    <div class="ms-list">
                      <div class="ms-col-md" v-if="compilerTyper === '0' || compilerTyper === '1'">
                        <div style="margin: 6px 0">
                          <i class="far fa-question-circle text-muted"></i>
                          <label>Runs (Optimizer)</label>
                        </div>
                        <el-input
                          v-model="optimizer"
                          clearable
                          placeholder="200"
                        ></el-input>
                      </div>

                      <div class="ms-col-md" v-if="compilerTyper === '0' || compilerTyper === '1'">
                        <div style="margin: 6px 0">
                          <i class="far fa-question-circle text-muted"></i>
                          <label>EVM Version to target</label>
                        </div>
                        <el-select
                          v-model="evmVersion"
                          placeholder="default (compiler defaults)"
                        >
                          <el-option
                            v-for="item in evm"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </div>

                      <div class="ms-col-md">
                        <div style="margin: 6px 0">
                          <label>LicenseType</label>
                          <i class="far fa-info-circle" style="color: #3498db"></i>
                        </div>
                        <el-select
                          v-model="licenseTypeItem"
                          placeholder="[Please Select]"
                        >
                          <el-option
                            v-for="item in license"
                            :key="item.id"
                            :label="item.type"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div class="text-f">
              <input class="submit" type="submit" @click="postInfo" value="Verify and Publish" />
              <input type="submit" @click="resetInfo" value="Reset" />
              <router-link to>
                <input type="submit" @click="$router.back(-1)" value="Return to Main" />
              </router-link>
            </div>

          <div>
            <button @click="onSub">获取数据{{smart_contract.name}}</button>
          </div>
          </div>
        </div>

        <div class="card-body" v-show="tab == 1">
          <!-- 合约生成成功 -->
          <div class="tab-content c-all">
            <div class="c-put">
              <p><b>Compiler debug log:</b></p>
              <p>
                <i class="fa fa-check-circle"></i> Note: Contract was created
                during TxHash#
                <span>
                  <a>{{hash}}</a>
                </span>
              </p>
              <p>
                <i class="fa fa-thumbs-up mr-1"></i>
                <span style="color: #67c23a">Successfully generated ByteCode and ABI for Contract Address
                </span>
                <span>
                  <a :href="verified_url">[{{ address }}]</a>
                </span>
              </p>
            </div>

            <div class="tab-more">
              <ul>
                <li><strong>Compiler Version:</strong>{{ compilerName }}</li>
                <li><strong>Optimization Enabled:</strong> False</li>
                <li><strong>Runs:</strong>{{ optimizer }}</li>
              </ul>

              <strong>Constructor Arguments Used (ABI-encoded):</strong>
              <pre class="wordwrap">{{ nododata }}</pre>

              <strong>ContractName:</strong>
              <pre class="wordwrap">ContractName:11111</pre>

              <strong>ContractBytecode:</strong>
              <pre class="wordwrap">Constructor Arguments Used (ABI-encoded):11111</pre
              >

              <strong>Constructor Arguments Used (ABI-encoded):</strong>
              <pre class="wordwrap">Constructor Arguments Used (ABI-encoded):11111</pre
              >

              <strong>Compiler Warning(s):</strong>
              <pre class="wordwrap">Compiler Warning(s):11111</pre>
            </div>
          </div>

          <!-- 合约生成错误 -->
          <!-- <div class="tab-content c-all">
            <div class="error-put">
              <p><b>Compiler debug log:</b> </p>
              <p style="color:#de4437">
                <i class="fa fa-ban"></i> Error! Unable to generate Contract ByteCode and ABI
              </p>
              <p>
                <i class="fa fa-angle-double-right"></i>
                <span> Found the following ContractName(s) in source code: Context.sol: <b>Context</b>, IERC20.sol: <b>IERC20</b>, SafeMath.sol: <b>SafeMath</b>, erc20.sol: <b>ERC20</b> </span>
              </p>
               <p>
                <i class="fa fa-angle-double-right"></i>
                <span>But we were unable to locate a matching bytecode (err_code_2)</span>
              </p>
              <p>
                <i class="fa fa-info-circle text-secondary"></i>
                <span> For troubleshooting, you can try compiling your source code with the
                  <span> <a style="color: 3498db">Remix - Solidity IDE</a> </span>and check for exceptions
                </span>
              </p>
              <p style="margin:30px 0px 20px">
                <strong>Compiler Warning(s):</strong>
              </p>
            </div>

            <div class="tab-more error-more" style="margin-bottom: 20px">
              <pre class="wordwrap">erc20.sol:55:62: Warning: This declaration shadows an existing declaration.
                  constructor (string memory name_, string memory symbol_, uint256 totalSupply) public {
                                                                          ^-----------------^
              erc20.sol:97:5: The shadowed declaration is here:
                  function totalSupply() public view virtual override returns (uint256) {
                  ^ (Relevant source part starts here and spans across multiple lines).
              erc20.sol:55:5: Warning: Visibility for constructor is ignored. If you want the contract to be non-deployable, making it "abstract" is sufficient.
                  constructor (string memory name_, string memory symbol_, uint256 totalSupply) public {
                  ^ (Relevant source part starts here and spans across multiple lines).</pre>
            </div>

            <div class="tab-more">
              <ul>
                <li><strong>Compiler Version:</strong> v0.7.6+commit.7338295f</li>
                <li><strong>Optimization Enabled:</strong> False</li>
                <li><strong>Runs:</strong> 200</li>
              </ul>

              <pre class="nowrap"><strong>ByteCode (what we are looking for)</strong><br>60806040523480156200001157600080fd5b506040516200164238038062001642833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401f35b6102a46004803603604081101561026e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610691565b60405180821515815260200191505060405180910390f35b6102fe600480360360208110156102d257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610744565b6040518082815260200191505060405180910390f35b61031c61078c565b6040518080602001fffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610e3c816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020…</pre>
              <div style="margin:20px 0">
                - vs what we got -
              </div>
              <pre class="nowrap">We tried looking for a match from the list of compiled contract bytecode outputs (as listed below), but was unable to find an exact match.
                <br>
                <br>
                1) SafeMath.solb <b>:</b> <b>SafeMath</b>
                <br>
                60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfe{ipfs}64736f6c634300070600330000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000
                <br>
                <br>
                2) erc20.sol <b>:</b> <b>ERC20</b>
                <br>
                60806040523480156200001157600080fd5b506040516200165238038062001652833981810160405260608110156200003757600080fd5b81019080805160405193929190846401fffffff16815260200190815260200160002081905550610e3c816000808573ffffffffffffffffffffffffffffffffffffffff1673fffffffffffffffff</pre>
            </div>

            <div>
              <button class="statr-over" @click="startOver">Start Over</button>
            </div>
          </div> -->
          <!-- ceshi  -->
        </div>
      </div>
    </div>
  </div>


  
</template>


<script>
export default {
  name: "Verify",
  data() {
    return {
      address: this.$route.params.address,
      compilerTyper: this.$route.params.compilerType,
      compileVersion: this.$route.params.compileVersion,
      licenseType: this.$route.params.licenseType,
      status: this.$route.params.verifyStatus,
      value: " ",
      activeNames: ["1"],
      //
      input: "",
      //
      optimizationType: [
        {
          id: 0,
          type: "no",
        },
        {
          id: 1,
          type: "yes",
        },
      ],
      id: "",
      compiler: [],
      license: [],
      evm: "",
      compilerItem: "",
      compilerName: "",
      licenseTypeItem: "",
      optimization: 0,
      optimizer: "200",
      evmVersion: "",
      nododata: "",
      solFile: [],
      jsonFile: [],
      name: "",
      size: "",
      fileInfo: false,
      MulFiles: [],
      tab: 0,
      fileMsg: "",
      hash:"0xc6844c595254242eb870997a4b99fa90b2069f6253f115f03df528e9e725b860",
      verified_url: "/address/" + this.$route.params.address,
      showBox:true,
      tabShow:false,
      smart_contract:{
        address_hash:0xaAf244486784aBbb646b4C9505FA46C0a6Bbc265,
        name: 'INTBoxNFT',
        nightly_builds: "v0.8.0+commit.c7dfd78e",
        evm_version:"default",
        optimization: 200,
        contract_source_code: "// Sources flattened with hardhat v2.2.1 https://hardhat.org"
      }
    };
  },

  created() {
    this.getDate();
  },

  methods: {
    handleChange(val) {
      console.log(val);
    },

    closeBox(){
      this.showBox= false
    },

    //  选择sol文件夹
    onFileSelected(event) {
      let that = this;
      that.solFile = []; //先清空文件
      let files = event.target.files;
      // let MulFiles =[];
      for (let file of files) {
        that.MulFiles.push({
          name: file.name,
          size: file.size,
        });
        // 读取文件内的数据
        let reader = new FileReader();
        reader.onload = function (event) {
          // 文件里的文本会在这里被打印出来
          // console.log(event.target.result)
          // 将文件加入数组
          that.solFile.push(event.target.result);
          // console.log(that.solFile)
        };
        reader.readAsText(file);
      }
      // console.log(MulFiles);
    },

    // 提交sol文件夹
    submitInfo() {
      if (this.solFile.length === 0) {
          this.fileInfo = false,
          this.$message({
            message: "please select folder",
            type: "warning",
          });
      } else {
        this.fileInfo = true;
      }
      this.$axios
        .post("https://titansexplorer.intchain.io/api/contract/uploadContract", {
          contract_address: this.address,
          file: this.solFile,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //  选择json文件夹
    onFileJson(event) {
      let that = this;
      that.jsonFile = []; //先清空文件
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (event) {
        // 文件里的文本会在这里被打印出来
        // console.log(event.target.result)
        that.jsonFile.push(event.target.result);
      };
      reader.readAsText(file);
    },

    // 提交json文件夹
    submitJson() {
      if (this.jsonFile.length === 0) {
        this.$message({
          message: "please select folder",
          type: "warning",
        });
      }
      this.$axios
        .post("https://titansexplorer.intchain.io/api/contract/uploadContract", {
          contract_address: this.address,
          file: this.jsonFile,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 提交合约认证按钮
    postInfo() {
      //先验证数据为空
      if (this.compilerTyper === '0') {
        if (this.fileMsg === '') {
          this.$message({
            message: "Please enter the Solidity Contract Code",
            type: "warning"
          })
          return
        }
      }

      if (this.compilerTyper === '1') {
        if (this.solFile.length === 0) {
          this.$message({
            message: "Please select files",
            type: "warning"
          })
          return
        }
      }

      if (this.compilerTyper === '2') {
        if (this.jsonFile.length === 0) {
          this.$message({
            message: "Please select file",
            type: "warning"
          })
          return
        }
      }

      if (this.nododata === "") {
        this.$message({
          message: "Please enter the ABI code",
          type: "warning"
        })
        return
      }
      if (this.compilerTyper === '0' || this.compilerTyper === '1') {
        if (this.optimizer === "") {
          this.$message({
            message: "Please enter Runs (Optimizer)",
            type: "warning"
          })
          return
        }
        if (this.evmVersion === "") {
          this.$message({
            message: "Please select EVM Version",
            type: "warning"
          })
          return
        }
      }

      if (this.compilerTyper === '0') {
        console.log(this.fileMsg, 'this.fileMsg');
      }

      // 提交给后台数据，每种方式都需要以下参数
      const data = {
        contract_address: this.address,
        license_id: this.licenseTypeItem,
        compiler_id: this.compilerItem,
        abi: this.nododata,
      }
      // 单文件(.sol)和多文件(.sol)需要加上以下额外参数
      if (this.compilerTyper === '0' || this.compilerTyper === '1') {
        data.evm_id = this.evmVersion;
        data.optimization = this.optimization;
        data.optimizer = parseInt(this.optimizer);
      }
      // 只有单文件(.sol)才需要在验证时上传
      if (this.compilerTyper === '0') {
        data.contract_code = this.fileMsg;
      }
      this.$axios.post("https://titansexplorer.intchain.io/api/contract/saveLicenseAndCompiler", data).then((res) => {
        console.log(res);
        if (res.data.status === 0) {
          //成功
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          });
          return;
        }
      }).catch((err) => {
        console.log(err);
      });
      this.tabShow = true;
      this.tab = 1;
    },

    // 获取后台数据
    getDate() {
      this.$axios
        .get("https://titansexplorer.intchain.io/api/contract/getContractInfo")
        .then((res) => {
          this.compiler = res.data.compiler;
          this.license = res.data.license;
          this.evm = res.data.evm;

          // 设置compiler licenseType 的默认值
          let index = this.compiler.findIndex(item => item.id == this.$route.params.compileVersion);
          this.compilerItem = this.compiler[index].id;
          this.compilerName = this.compiler[index].name;

          let e = this.license.findIndex(item => item.id == this.$route.params.licenseType);
          this.licenseTypeItem = this.license[e].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 生成合约错误 　/start over 按钮/
    startOver(){
      this.tabShow = false;
      this.tab = 0;
    },

    resetInfo() {
      this.solFile = [],
      this.jsonFile = [],
      this.nododata = "",
      this.fileMsg = ""
    },

    //  nightly_builds: "v0.8.0+commit.c7dfd78e",
        // evm_version:"default",
        // optimization: 200,
        // contract_source_code: "// Sources flattened with hardhat v2.2.1 https://hardhat.org"

    onSub(){
      const datas = {
        address_hash: this.smart_contract.address_hash,
        name:this.smart_contract.name,
        evm_version:this.smart_contract.evm_version,
        optimization:this.smart_contract.optimization,
        contract_source_code:this.smart_contract.contract_source_code
      }
      //  console.log(datas,"datas");
      this.$axios.post("https://blockscout.explorer.intchain.io/verify_smart_contract/contract_verifications",datas).then((res)=>{
        console.log(datas,"datas");
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
};
</script>

<style>
.verify {
  width: 1280px;
  margin: auto;
  height: 100%;
}
a {
  color: #3498db;
  margin: 0 4px;
}

textarea {
  border: 1px solid #d5dae2;
  border-radius: 5px;
}

.container {
  margin: 32px 15px 52px;
}

.text-center {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0 0 8px;
  color: #4a4f55;
}

.badge {
  color: #fff;
  background-color: #00c9a7;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 15px;
  border-radius: 22px;
}
.solbadge{
  color: #fff;
  background-color: #3498db;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 15px;
  border-radius: 22px;
}

.jsonbadge{
  color: #fff;
  background-color: #77838f;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 15px;
  border-radius: 22px;
}

.border-top {
  border-top: 1px solid #e7eaf3;
}

.none {
  display: inline-block;
  background-color: rgba(119, 131, 143, 0.05);
  border-radius: 5px;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e7eaf3;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
}

.card-header {
  border-bottom: 1px solid #e7eaf3;
}

.card-header ul {
  display: flex;
  /* justify-content: space-around; */
}

.card-header ul li a {
  display: inline-block;
  height: 21px;
  line-height: 21px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #77838f;
}
.isTab {
  border-bottom: 2px solid transparent;
  border-bottom-color: #3498db;
  color: #3498db !important;
}

.card-body {
  padding: 12px;
}

.tab-content {
  margin: 0 4px;
  padding: 4px 0;
}
.tab-err-content p {
  margin: 5px 0;
  font-size: 14px;
  color: #6c757e;
}

.alert {
  background-color: #e9ecf1;
  border-color: #c0c1c1;
  color: #3e444a;
  font-size: 14px;
  line-height: 2;
  padding-top: 12px;
  padding-left: 12px;
  padding-bottom: 12px;
  position: relative;
  border-radius: 5px;
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: 0;
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  padding: 12px;
}

.js-from label,
.form-inline label {
  display: block;
}

.js-from label,
.col-md label,
.ms-col-md label {
  font-size: 14px;
  margin: 8px 0;
}

.row,
.ms-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.ms-list {
  padding-right: 18px;
}

.message {
  width: 1216px;
  border: 1px solid #e7eaf3;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  border-radius: 5px;
  padding: 20px 20px 10px 22px;
  /* margin-bottom: 12px; */
}
.message .d-block {
  font-size: 14px;
  color: #303133;
}

.upload {
  margin: 20px 0;
}

.card-m {
  border: 1px solid #e7eaf3;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 12px;
}

.card-m:nth-child(1) {
  margin-top: 20px;
}

.card-info {
  width: 1130px;
  height: 84px;
  margin: 0 12px 8px;
}

.card-flex {
  display: flex;
  margin-bottom: 20px;
}

.card-flex label {
  color: #77838f;
  font-size: 14px;
  font-weight: 600;
  margin: 0 12px 4px 0;
}

.form-inline input {
  width: 286px;
  height: 17px;
  padding: 3.2px 6.4px;
}

.form-inline:nth-child(2) {
  width: 21px;
  height: 21px;
  margin: 31px 16px 0;
}

.form-inline:nth-child(2) span {
  color: #77838f;
  background: rgba(119, 131, 143, 0.1);
  border-color: transparent;
  padding: 4px 6px;
  border-radius: 50%;
}

.text-f {
  text-align: center;
  margin: 40px 0;
}

.text-f input,.statr-over{
  border: 0;
  color: #77838f;
  background: rgba(119, 131, 143, 0.1);
  border-color: transparent;
  height: 47px;
  border-radius: 5px;
  padding: 12px 16px;
  margin-right: 8px;
  font-size: 14px;
  cursor:pointer;
}

.text-f .submit, .statr-over {
  color: #fff;
  background-color: #3498db;
  border-color: #3498db;
}
.statr-over{
  height: 40px;
  margin-top: 30px;
}


.m-files {
  background-color: #f5f7fa;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 24px;
}

.m-files span:nth-child(2) {
  margin-left: 10px;
}

/* Compiler Output */
.c-all {
  font-size: 14px;
}
.c-put,
.error-put {
  color: #6c757e;
  line-height: 1;
  margin-bottom: 30px;
  /* font-weight: bold; */
}

.c-put p span a {
  color: #ed303b;
}

.c-put p,
.error-put p {
  margin: 8px;
}

.tab-more {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 12px;
}

.tab-more ul {
  margin-bottom: 12px;
}

.wordwrap {
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #e7eaf3;
  margin: 0 0 8px;
  padding: 12px;
  border-radius: 5px;
}

.wordwrap pre {
  display: block;
  color: #12161c;
  background-color: #f8f9fa;
}

.single-contract textarea {
  height: 200px;
  width: 1188px;
  padding: 12px;
  margin-top: 16px;
}

/* error */
.error-more .wordwrap {
  border: none;
}

.nowrap {
  white-space: nowrap;
  overflow: scroll;
  border: 1px solid #e7eaf3;
  margin: 0 0 8px;
  padding: 12px;
  border-radius: 5px;
}
</style>
