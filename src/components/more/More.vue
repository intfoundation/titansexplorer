<template>
  <div class="more">
    <div class="container">
      <form action="post">
        <div class="text-center">
          <div class="w-md">
            <h1 style="font-size: 24px">
              Verify & Publish Contract Source Code
            </h1>
            <!-- <small class="text-muted"
              >COMPILER TYPE AND VERSION SELECTION</small
            > -->
          </div>
        </div>
        <div class="border-top">
          <div class="row">
            <img :src="picUrl" alt="" style="width: 115px; height: 96px" />
            <p>
              Source code verification provides transparency for users
              interacting with smart contracts. By uploading the source code,
              titans explorer will match the compiled code with that on the blockchain.
              Just like contracts, a "smart contract" should provide end users
              with more information on what they are "digitally signing" for and
              give users an opportunity to audit the code to independently
              verify that it actually does what it is supposed to do.
            </p>
          </div>

          <div class="mx-md">
            <el-form class="add-input">
              <el-form-item
                style="
                  display: flex;
                  flex-wrap: wrap;
                  align-content: center;
                  align-items: flex-start;
                "
                label="Please enter the Contract Address you would like to verify"
              >
                <div style="display: flex">
                  <el-input v-model="address" type="search" class="md-input" />
                  <el-button
                    style="width: 38px; height: 40px"
                    class="sub"
                    type="primary"
                    @click="verifyContract()"
                  >
                    <i class="el-icon-check"></i>
                  </el-button>
                </div>
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
      address: this.$route.params.address,
    };
  },

  methods: {
    verifyContract() {
      if (!this.address) {
        console.log(this.address, "address");
        this.$message({
          message: "Please enter the correct address",
          type: "warning",
        });
        return;
      } else {
        const data = {
          contract_address: this.address,
        };
        this.$axios
          .post(
            "/api/contract/verifyStatus",
            data
          )
          .then((res) => {
            if (res.data.status === 0) {
              console.log(this.address, "address");
              window.location.href =
                "https://blockscout.explorer.intchain.io/address/" + this.address +"/contract_verifications/new";
            } else {
              this.$message({
                message: res.data.message,
                type: "warning",
              });
              return;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
#box {
  width: 1280px;
  margin: auto;
  height: 100%;
}
.more {
  height: 600px;
}
.container {
  margin: 50px 90px;
}
.text-center {
  text-align: center;
  margin-bottom: 12px;
}
h1 {
  margin: 0 0 8px;
  color: #4a4f55;
}

/* .text-muted {
  color: #8c98a4;
  font-size: 14px;
} */

.border-top {
  border-top: 1px solid #e7eaf3;
  padding: 30px 0;
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
  margin-top: 60px;
}
.add-input {
  text-align: center;
}
.sub {
  border: none;
  border-radius: 4px;
  background-color: #ed303b;
  margin-left: 10px;
  height: 40px;
}

.sub i {
  font-size: 26px;
  color: #fff;
  display: block;
  margin-left: -8px;
  margin-top: -6px;
}
.sub:hover {
  background-color: #ed303b !important;
  color: #fff !important;
}
.sub:focus {
  background-color: #ed303b !important;
  opacity: 0.8;
  color: #fff !important;
}
</style>