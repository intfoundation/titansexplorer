<template>
  <div class="verify">
    <div class="container">
      <div class="text-center">
        <div class="w-md">
          <h1 style="font-size: 24px">Verify & Publish Contract Source Code</h1>
          <span class="badge"
            >Compiler Type: SINGLE FILE / CONCATENANTED METHOD</span
          >
        </div>
      </div>
      <div class="boder-container">
        <div class="border-top">
          <p style="color: #6c757e; font-size: 14px">
            <span class="none">Info:</span> A simple and structured interface
            for verifying smart contracts that fit in a single file
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <ul class="nav">
            <li class="nav-item">
              <a href="/">Contract Source Code</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="alert">
              <button type="button" class="close">
                <span>x</span>
              </button>
              <ul>
                <li>
                  1. If the contract compiles correctly at
                  <a href="/">nofollow noopener</a>, it should also compile
                  correctly here.
                </li>
                <li>
                  2. We have limited support for verifying contracts created by
                  another contract and there is a timeout of up to 45 seconds
                  for each contract compiled.
                </li>
                <li>
                  3. For programatic contract verification, check out the
                  <a href="/">Contract API Endpoint</a>
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="js-from" style="width: 470px">
                <label for="txtContractAddress">Contract Address </label>
                <el-input class="ad-input" v-model="address" placeholder="请输入内容"></el-input>
              </div>
              <div class="js-from" style="width: 470px">
                <label for="txtContractAddress">Compiler </label>
                <!-- <el-input style="width: 470px ;" v-model="licenseType" disabled>
                </el-input> -->
                <el-select class="compiler-input"
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
              <div class="col-md">
                <div style="margin: 6px 0">
                  <i class="far fa-question-circle text-muted"></i>
                  <label for="txtContractAddress">Optimization </label>
                </div>
                <el-select
                  style="width: 223px"  class="op-selest" v-model="optimization"  placeholder="no">
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
            <div class="message">
              <label for="txtSourceCode" class="d-block">
                <b>Please select the Solidity (*.sol) files for upload</b>
                <span class="text-danger">*</span>
              </label>
              <div class="upload">Step 1: <input type="file" accept=".sol" @change="onFileSelected" value="请选择文件夹"></div>
              <div class="upload">Step 2: <input type="submit" @click="submitInfo" value="Click to Upload selected files"></div>       
            </div>

            <div id="basicsAccordion">
              <!-- ABI-encoded -->
              <div class="card-m">
                <el-collapse
                  class="card-item"
                  v-model="activeNames"
                  @change="handleChange"
                >
                  <el-collapse-item style="magrin-top: 15px ">
                    <template slot="title">
                      Constructor Arguments<a>ABI-encoded</a>
                      <span style="color: #77838f"
                        >(for contracts that were created with constructor
                        parameters)</span
                      >
                    </template>
                    <textarea name="" v-model="nododata" class="card-info"></textarea>
                    <p style="margin: 0 0 0 14px">
                      For additional information on Constructor Arguments
                      <a
                        >see Our KB Entry
                        <i class="fas fa-external-link-alt"></i>
                      </a>
                    </p>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <!-- Contract Library Address -->
              <div class="card-m" style="display: none;">
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
                            <i
                              class="fa fa-long-arrow-alt-right btn-icon__inner"
                            ></i>
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
                    <div class="ms-list" >
                      <div class="ms-col-md" >
                        <div style="margin: 6px 0">
                          <i class="far fa-question-circle text-muted"></i>
                          <label for="txtContractAddress"
                            >Runs (Optimizer)</label
                          >
                        </div>
                        <el-input
                          v-model="optimizer"
                          clearable
                          placeholder="200"
                        ></el-input>
                      </div>

                      <div class="ms-col-md">
                        <div style="margin: 6px 0">
                          <i class="far fa-question-circle text-muted"></i>
                          <label for="txtContractAddress"
                            >EVM Version to target</label
                          >
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
                          <label for="txtContractAddress">LicenseType</label>
                          <i
                            class="far fa-info-circle"
                            style="color: #3498db"
                          ></i>
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
              <input type="submit" @click="postInfo" value="Verify and Publish" />
              <input type="submit" @click="resetInfo" value="Reset" />
              <router-link to>
                <input type="submit" @click="$router.back(-1)" value="Return to Main" />
              </router-link>

            </div>
          </div>
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
      compileVersion: this.$route.params.compileVersion,
      licenseType: this.$route.params.licenseType,
      value:" ",
      activeNames: ["1"],
      // 
      input: "",
      // 
      optimizationType:[
        {
          id: 0,
          type: 'no'
        },
        {
          id: 1,
          type: 'yes'
        }
      ],
      id:"",
      compiler: [],
      license: [],
      evm:"",
      compilerItem: "",
      licenseTypeItem:"",
      optimization: 0,
      optimizer: "200",
      evmVersion:"",
      nododata:"",
      solFile:""
    };
  },

  created() {
    this.getDate();
  },

    methods: {
      handleChange(val) {
        console.log(val);
      },

    // 提交文件
      onFileSelected(event) {
        let that = this;
        var file = event.target.files[0];
        // console.log('file',file)
        var reader = new FileReader();
        reader.onload = function(event) {
          // 文件里的文本会在这里被打印出来
          console.log(event.target.result)
          that.solFile = event.target.result;
          // console.log(that.solFile)
        };
        reader.readAsText(file);
      },

      submitInfo(){
        // console.log(this.solFile,22222)
        if(this.solFile === ""){
          this.$message({
            message:'please select folder',
            type:"warning"
          })
        }
        this.$axios
          .post("http://192.168.0.99:6660/api/contract/uploadContract",{
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

     // 底部提交按钮
      postInfo() {
        if(this.nododata ===""){
          this.$message({
            message:"Please enter the ABI code",
            type:"warning"
          })
        }
        if(this.solFile===""){
          this.$message({
            message:"Please select file",
            type:"warning"
          })
        }
        if(this.evmVersion===""){
          this.$message({
            message:"Please select EVM Version",
            type:"warning"
          })
        }

        // 提交的数据
        const data = {
            contract_address: this.address,
            license_id: this.licenseTypeItem,
            compiler_id: this.compilerItem,
            evm_id:this.evmVersion,
            // contract_code: this.solFile,
            abi: this.nododata,
            optimization:this.optimization,
            optimizer: parseInt(this.optimizer)
        }
        this.$axios
          .post("http://192.168.0.99:6660/api/contract/saveLicenseAndCompiler",data)
          .then((res) => {
              console.log(res);
          })
          .catch((err) => {
            console.log(err);
        });
      },

      // 获取后台数据
      getDate() {
        this.$axios
          .get("http://192.168.0.99:6660/api/contract/getContractInfo")
          .then((res) => {
            this.compiler = res.data.compiler;
            this.license = res.data.license;
            this.evm = res.data.evm;

            // 设置compiler licenseType 的默认值
            let index = this.compiler.findIndex(item => item.id == this.$route.params.compileVersion);
            this.compilerItem = this.compiler[index].id;

            let e = this.license.findIndex(item => item.id == this.$route.params.licenseType);
            this.licenseTypeItem = this.license[e].id
          })
        .catch((err) => {
          console.log(err);
        });
      },
      resetInfo(){
        this.solFile = "",
        this.nododata =""
      }
    }
};
</script>

<style>
.verify{
  width: 1280px;
  margin: auto;
  height: 100%;
}
a{
  color: #3498db ;
  margin: 0 4px;
}

textarea{
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

.border-top{
  border-top: 1px solid #e7eaf3;
}

.none{
  display: inline-block;
  background-color: rgba(119,131,143,.05);
  border-radius: 5px;
}


.card{
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e7eaf3;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
}

.card-header{
  border-bottom: 1px solid #e7eaf3
}

.card-header ul{
  display: flex;
  /* justify-content: space-around; */
}

.card-header ul li a{
  display: block;
  height: 21px;
  line-height: 21px;
  color: #3498db;
  border-bottom: 2px solid transparent;
  border-bottom-color: #3498db;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;

}

.card-body{
  padding: 12px;
}

.tab-content{
  margin: 0 4px;
  padding: 4px 0;
}

.alert{
  background-color: #E9ECF1;
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


.close{
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

.js-from label, .form-inline label{
  display: block;
}

.js-from label, .col-md label, .ms-col-md label{
  font-size: 14px;
  margin: 8px 0;
}

.row, .ms-list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.ms-list{
  padding-right:18px;
}

.message{
  width: 1216px;
  border: 1px solid #e7eaf3;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  border-radius: 5px;
  padding: 20px 20px 10px 22px;
  /* margin-bottom: 12px; */
}
.message .d-block{
  font-size: 14px;
  color: #303133;
}

.upload{
  margin: 20px 0;
}

.card-m{
  border: 1px solid #e7eaf3;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 12px;
}

.card-m:nth-child(1){
  margin-top: 30px;
}



.card-info{
  width: 1130px;
  height: 84px;
  margin: 0 12px 8px;
}

.el-collapse-item__header.is-active {
  border-bottom: 1px solid #e7eaf3;
  border-bottom-color: #e7eaf3;
}

.card-flex{
  display: flex;
  margin-bottom: 20px;
}

.card-flex label{
  color: #77838f;
  font-size: 14px;
  font-weight: 600;
  margin: 0 12px 4px 0;
}

.form-inline input{
  width: 286px;
  height: 17px;
  padding: 3.2px 6.4px;
}

.form-inline:nth-child(2){
  width: 21px;
  height: 21px;
  margin: 31px 16px 0;
}

.form-inline:nth-child(2) span{
  color: #77838f;
  background: rgba(119,131,143,.1);
  border-color: transparent;
  padding: 4px 6px;
  border-radius: 50%;
}


.text-f{
  text-align: center;
  margin: 40px 0;
}

.text-f input{
  border: 0;
  color: #77838f;
  background: rgba(119,131,143,.1);
  border-color: transparent;
  height: 47px;
  border-radius: 5px;
  padding: 12px 16px;
  margin-right: 8px;
  font-size: 14px;
}

.text-f input:nth-child(1){
  color: #fff;
  background-color: #3498db;
  border-color: #3498db;
}
</style>