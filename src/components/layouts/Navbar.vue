<template>
  <div class="navbar">
    <div id="box" class="clearfix">
      <router-link tag="div" to="/" class="logo">
        <img src="../../assets/int-logo.png" alt="">
      </router-link>
      <div class="menu">
        <ul class="m-ul">
          <li class="m-li">
            <router-link tag="div" to="/" class="nav-item-f" :class="{'nav-active-f': $route.path === '/'}"><span>Home</span></router-link>
          </li>
          <li class="m-li">
            <div class="nav-item-f" :class="{'nav-active-f': (/(blocks|block|txs|tx|accounts|address)/g).test($route.path)}"><span>Blockchain</span><i class="nav-icon fas fa-angle-down"></i></div>
            <div class="nav-block">
              <router-link v-for="(item,index) in blockNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>
            </div>
          </li>
          <li class="m-li">
            <div class="nav-item-f" :class="{'nav-active-f': (/staking/g).test($route.path)}"><span>Staking</span><i class="nav-icon fas fa-angle-down"></i></div>
            <div class="nav-block">
              <router-link v-for="(item,index) in stakingNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>
            </div>
          </li>
          <li class="m-li">
            <div class="nav-item-f" :class="{'nav-active-f': (/tokens/g).test($route.path)}"><span>Tokens</span><i class="nav-icon fas fa-angle-down"></i></div>
            <div class="nav-block">
              <router-link v-for="(item,index) in tokensNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>
            </div>
          </li>
<!--          <li class="m-li">-->
<!--            <div class="nav-item-f" :class="{'nav-active-f': (/txs/g).test($route.path)}"><span>Transfer</span><i class="nav-icon fas fa-angle-down"></i></div>-->
<!--            <div class="nav-block">-->
<!--              <router-link v-for="(item,index) in transferNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="m-li">-->
<!--            <div class="nav-item-f" :class="{'nav-active-f': (/asset/g).test($route.path)}"><span>Asset</span><i class="nav-icon fas fa-angle-down"></i></div>-->
<!--            <div class="nav-block">-->
<!--              <router-link v-for="(item,index) in assetNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>-->
<!--            </div>-->
<!--          </li>-->
          <li class="m-li">
            <div class="nav-item-f" :class="{'nav-active-f': (/stats/g).test($route.path)}"><span>Stats</span><i class="nav-icon fas fa-angle-down"></i></div>
            <div class="nav-block">
              <router-link v-for="(item,index) in statsNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>
            </div>
          </li>
          <li class="m-li">
            <div class="nav-item-f" :class="{'nav-active-f': (/more/g).test($route.path)}"><span>More</span><i class="nav-icon fas fa-angle-down"></i></div>
              <!-- <router-link tag="div" to="/more" class="nav-item-f"><span>More</span></router-link> -->
            <div class="nav-block">
              <router-link v-for="(item,index) in moreNavList" :key="index" tag="div" :to="item.url" class="nav-item-s">{{item.name}}</router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="search">
        <div class="s-input"><input type="text" placeholder="Search by Address / TxHash / Block" v-model="keyword" @keyup.enter="search"></div>
        <div class="s-btn" @click="search">
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Navbar",
      data() {
        return {
          blockNavList: [
            {
              name: 'Blocks',
              url: '/blocks/1'
            },
            {
              name: 'Transactions',
              url: '/txs/1'
            },
            {
              name: 'Accounts',
              url: '/accounts'
            },
          ],
          stakingNavList: [
            {
              name: 'Validators',
              url: '/staking/validators'
            },
            {
              name: 'Epochs',
              url: '/staking/epochs/1'
            },
          ],
          tokensNavList: [
            {
              name: 'IIP20 Tokens',
              url: '/tokens/list/1'
            },
            {
              name: 'IIP721 Tokens',
              url: '/tokens-nft/list/1'
            }
          ],
          // transferNavList: [
            // {
            //   name: 'Transactions',
            //   url: '/transfer/transferlist/1'
            // },
            // {
            //   name: 'Transfer2',
            //   url: '/transfer/transfer1'
            // },
            // {
            //   name: 'Transfer3',
            //   url: '/transfer/transfer1'
            // },
            // {
            //   name: 'Transfer4',
            //   url: '/transfer/transfer1'
            // },
            // {
            //   name: 'Transfer5',
            //   url: '/transfer/transfer1'
            // }
          // ],
          // assetNavList: [
          //   {
          //     name: 'Asset1',
          //     url: '/asset/asset1'
          //   },
          //   {
          //     name: 'Asset2',
          //     url: '/asset/asset1'
          //   },
          //   {
          //     name: 'Asset3',
          //     url: '/asset/asset1'
          //   },
          //   {
          //     name: 'Asset4',
          //     url: '/asset/asset1'
          //   },
          //   {
          //     name: 'Asset5',
          //     url: '/asset/asset1'
          //   }
          // ],
          statsNavList: [
            // {
            //   name: 'Accounts',
            //   url: '/stats/statslist'
            // },
            // {
            //   name: 'MiningRank',
            //   url: '/stats/miningrank'
            // },
            // {
            //   name: 'MappingList',
            //   url: '/stats/mappinglist/1'
            // },
            {
              name: 'Bridge',
              url: '/stats/bridgelist/1'
            },
            // {
            //   name: 'Stats4',
            //   url: '/stats/stats1'
            // },
            // {
            //   name: 'Stats5',
            //   url: '/stats/stats1'
            // }
          ],
          moreNavList: [
            {
              name: "Verify Contract",
              url: '/verifyContract'
            }
          ],
          keyword: '',
        };
      },
      created() {
      },
      methods: {
        search() {
          let txRex = /^(0x)?[0-9a-f]{64}$/i;
          let addrRex = /^(0x)?[0-9a-f]{40}$/i;
          if (this.keyword.trim()) {
            this.$axios.get('/api/search/querySearchType', { params: { input: this.keyword} }).then( res => {
              // console.log("search type", res)
              if (res.data) {
                switch (res.data.searchType) {
                  case "address":
                    this.$router.push('/address/' + this.keyword);
                    break;
                  case "height":
                  case "blockHash":
                    this.$router.push('/block/' + this.keyword + '/1');
                    break;
                  case "txHash":
                    this.$router.push('/tx/' + this.keyword);
                    break;
                  default:
                    this.$router.push('/result/' + this.keyword)
                }
              } else {
                this.$router.push('/result/' + this.keyword)
              }
              this.keyword = '';
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.keyword = '';
          }
        },
      }
    }
</script>

<style scoped>
  .navbar {
    width: 100%;
    height: 80px;
    /* background-color: #fff; */
    box-shadow:0 4px 8px 0 rgba(230,230,230,0.6);
  }

  .navbar #box > div {
    float: left;
  }

  .navbar .logo {
    height: 80px;
  }

  .navbar .logo img {
    height: 100%;
  }

  .navbar .menu {
    margin-left: 30px;
    height: 80px;
  }

  .navbar .menu .m-ul {
    display: flex;
    height: 100%;
    cursor: pointer;
  }

  .navbar .menu .m-li {
    position: relative;
    margin-right: 30px;
  }

  .navbar .menu .nav-item-f {
    font-weight: bold;
    font-size: 16px;
    line-height: 80px;
    color: #6c757e;
  }

  .navbar .menu .nav-icon {
    display: inline-block;
    /*width: 0;*/
    /*height: 0;*/
    /*border-width: 7px 7px 0;*/
    /*border-style: solid;*/
    /*border-color: #999 transparent transparent;*/
    margin-left: 8px;
    vertical-align: middle;
    transition: all .3s;
  }

  .navbar .menu .m-li:hover .nav-item-f span{
    padding-bottom: 2px;
    border-bottom: 2px solid #ed303b;
    color: #ed303b;
  }

  .navbar .menu .m-li:hover .nav-item-f .nav-icon {
    transform: rotate(180deg);
    color: #ed303b;
  }

  .menu .m-li .nav-block {
    position: absolute;
    top: 60px;
    left: -20px;
    width: 150px;
    height: 0;
    overflow: hidden;
    border-radius: 3px;
    background-color: #fff;
    box-shadow:0 0 8px 0 rgb(230,230,230);
    transition: all .3s;
    z-index: 10000;
  }

  .navbar .menu .m-li:hover .nav-block {
    height: auto;
    padding: 20px 0;
  }

  .menu .m-li .nav-block .nav-item-s {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
  }

  .menu .m-li .nav-block .nav-item-s:hover {
    background-color: rgb(243,243,243);
    color: #ed303b;
  }

  .menu .m-li .nav-block .nav-item-f {
    background-color: rgb(243,243,243);
    color: #ed303b;
  }

  .navbar .menu .m-ul .nav-active-f span {
    padding-bottom: 2px;
    border-bottom: 2px solid #ed303b;
    color: #ed303b;
  }

  .menu .m-li .nav-block .nav-active-s {
    background-color: #fff;
    color: #ed303b;
  }

  .navbar #box .search {
    display: flex;
    align-items: center;
    float: right;
    height: 36px;
    margin-top: 20px;
  }

  .navbar .search .s-input {
    background-color: #fff;
    border: 1px solid #f3f3f3;
    border-radius: 4px 0 0 4px;
    width: 360px;
  }

  .search .s-input input {
    line-height: 36px;
    font-size: 14px;
    background-color: transparent;
    border: none;
    outline: none;
    width: calc(100% - 40px);
    margin-left: 22px;
  }

  .search .s-btn {
    width: 56px;
    height: 38px;
    border-radius: 0 4px 4px 0;
    background-color: #ed303b;
    text-align: center;
    cursor: pointer;
  }

  .search .s-btn i {
    display: inline-block;
    margin-top: 8px;
    width: 20px;
    height: 20px;
    background: url("../../assets/search.png") no-repeat center/contain;
  }



</style>
