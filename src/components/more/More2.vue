<template>
  <div class="more">
    <div class="container">
      <form action="post">
        <div class="text-center">
          <div class="w-md">
            <h1 style="font-size: 24px">
              Verify & Publish Contract Source Code
            </h1>
            <small class="text-muted"
              >COMPILER TYPE AND VERSION SELECTION</small
            >
          </div>
        </div>
        <div class="border-top">
          <div class="row">
            <img :src="picUrl" alt="" style="width: 115px; height: 96px" />
            <p>
              Source code verification provides transparency for users
              interacting with smart contracts. By uploading the source code,
              Bscscan will match the compiled code with that on the
              blockchain. Just like contracts, a "smart contract" should
              provide end users with more information on what they are
              "digitally signing" for and give users an opportunity to audit
              the code to independently verify that it actually does what it
              is supposed to do.
            </p>
          </div>

          <div class="mx-md">
            <el-form>
              <el-form-item
                label="Please enter the Contract Address you would like to verify"
              >
                <el-input  v-model="address" type="search"  class="md-input"/>
              </el-form-item>

              <el-form-item  label="Please select Compiler Type" prop="region">
                <el-select class="md-select"
                  v-model="compilerType"
                  placeholder="[Please Select]"
                  @change="changeCompilerType"
                >
                  <el-option
                    label="Solidity (Single file)"
                    value="0"
                  ></el-option>
                  <el-option
                    label="Solidity (Multi-Part files)"
                    value="1"
                  ></el-option>
                  <el-option
                    label="Solidity (Standard-Json-Input)"
                    value="2"
                  ></el-option>
<!--                  <el-option-->
<!--                    label="Vyper (Experimental)"-->
<!--                    value="3"-->
<!--                  ></el-option>-->
                </el-select>
              </el-form-item>

              <el-form-item
                label="Please select Compiler Version"
                prop="name"
                v-if="showCompileVersion"
              >
                <el-select class="md-select"
                  v-model="compilerVersion"
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
              </el-form-item>

              <el-form-item
                label="Please select Open Source License Type"
                prop="data"
              >
                <el-select class="md-select"
                  v-model="licenseType"
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
              </el-form-item>
             
              <el-form-item>
                <div style="margin-left: -26px;">
                  <input type="checkbox" @click="checkbox()"> I agree to the terms of service
                </div>               
                <el-button class="sub" type="primary" :disabled = "!dis" @click="verifyContract()"
                  >Continue</el-button>
                <el-button class="reset" @click="resetForm()">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import pic from "../../../static/i.jpg";
export default {
  name: "More",
  data() {
    return {
      picUrl: pic,
      compiler: [],
      license: [],
      address: this.$route.params.address,
      compilerType: "",
      compilerVersion: "",
      licenseType: "",
      showCompileVersion: false,
      dis:false
    };
  },

  created() {
    this.getDate();
  },

  methods: {
    getDate() {
      this.$axios
        .get("/api/contract/getContractInfo")
        .then((res) => {
          this.compiler = res.data.compiler,
          this.license = res.data.license,
            console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeCompilerType(type) {
      console.log("[Please Select]", type);
      this.showCompileVersion = true;
      this.compilerType = type;
    },
    
    // Checked is true, unchecked is false
    checkbox(){
        this.dis = event.target.checked
        // console.log(event.target.checked)
    },


    verifyContract() {
      if(!this.address){
        console.log(this.address,'address');
        this.$message({
          message: 'Please enter the address',
          type: 'warning'
        });
        return;
      }

      if (this.compilerType === "") {
        this.$message({
          message: 'Please select Compiler Type',
          type: 'warning'
        });
        return;
      }

      if (this.compilerVersion === "") {
        this.$message({
          message: 'Please select Compiler Version',
          type: 'warning'
        });
        return;
      }

      if (this.licenseType === "") {
        this.$message({
          message: 'Please select Open Source License Type',
          type: 'warning'
        });
        return;
      }

      const data ={
        contract_address:this.address
      }
      this.$axios.post('/api/contract/verifyStatus',data).then((res)=>{
        console.log(res.data);
        if( res.data.status === 0 ){
          const url = `/verifyContractSolc/${this.address}/${this.compilerType}/${this.compilerVersion}/${this.licenseType}/${res.data.data}`;
          this.$router.push(url);
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          });
          return;
        }
      }).catch((err)=>{
        console.log(err);
      })
    },

    resetForm() {
      this.address="";
      this.compilerType = "";
      this.compilerVersion = "";
      this.licenseType = "";
    }
  },
};
</script>

<style scoped>
#box {
  width: 1280px;
  margin: auto;
  height: 100%;
}
.container {
  margin: 32px 15px 52px;
}
.text-center {
  text-align: center;
  margin-bottom: 12px;
}
h1 {
  margin: 0 0 8px;
  color: #4a4f55;
}

.text-muted {
  color: #8c98a4;
  font-size: 14px;
}

.border-top {
  border-top: 1px solid #e7eaf3;
  padding: 20px 0;
}
.row {
  display: flex;
  justify-content: space-around;
}

.row img {
  vertical-align: middle;
  margin: -15px 10px 10px 0;
}

.row p {
  color: #6c757e;
  font-size: 16px;
  text-align: start;
}

.mx-md {
  width: 685px;
  margin: auto;
  margin-top: 20px;
}

.sub{
  background-color: #409eff;
}
.sub:hover{
  background-color: #409eff !important;
  color: #fff !important;
}
.sub:focus{
  background-color: #409eff !important;
  opacity: 0.8;
  color: #fff !important;
}

/* .sub{
  background-color: #ed303b;
}
.sub:hover{
  background-color: #ed303b !important;
  opacity: 0.8;
  color: #fff !important;
}
.sub:focus{
  background-color: #ed303b !important;
  opacity: 0.8;
  color: #fff !important;
} */

</style>
