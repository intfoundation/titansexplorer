<template>
    <div class="footer">
      <div id="box">
        <div class="foot-c">
          <div class="foot-icon">
            <img src="../../assets/blockscout_logo.png" alt="">
            <p>Titans explorer is a Block Explorer and Analytics Platform for INT Chain</p>
            <div>
              <button @click=switchToEtheruemChain> <img src="../../assets/metamask.svg" alt=""> Add INT Chain Network</button>
            </div>
          </div>
          <div class="contact">
            <div class="f-t"><span>Company</span></div>
            <hr>
            <div class="f-f">
              <div class="f-line">
                <div class="group"><a target="_blank" href="https://intchain.io/#/"><span>About Us</span></a></div>
                <!-- <div class="group"><a target="_blank" href=""><span>Contact Us</span></a></div>
                <div class="group"><a target="_blank" href=""><span>Brand Assets</span></a></div>
                <div class="group"><a target="_blank" href=""><span>Careers</span></a></div>
                <div class="group"><a target="_blank" href=""><span>Terms of Service</span></a></div> -->
              </div>
            </div>
          </div>

          <div class="contact">
            <div class="f-t"><span>Resources</span></div>
            <hr>
            <div class="f-f">
              <div class="f-line">
                <div class="group"><a target="_blank" href="https://blockscout.explorer.intchain.io"><span>Blockscout Explorer</span></a></div>
              </div>
            </div>
          </div>

          <div class="link">
            <div class="f-t"><span>Link</span></div>
            <hr>
            <div class="f-f">
              <div class="f-line">
                <div class="group"><a target="_blank" href="http://tech.intchain.io/"><span>Community</span></a></div>
                <div class="group"><a target="_blank" :href="`https://${isTestNetwork ? 'test.' : ''}titanswallet.intchain.io`"><span>Wallet</span></a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="foot-right">
          <hr>
          <div class="foot-bottom">
              <span>Copyright © 2019-{{year}} INT.</span>
            <div>
              <a target="_blank" href="https://t.me/INTChainOfficial"><i class="f-icon fi-tel"></i></a>
              <a target="_blank" href="https://twitter.com/intchain"><i class="f-icon fi-twi"></i></a>
              <a target="_blank" href="https://www.facebook.com/INTchainINT"><i class="f-icon fi-fb"></i></a>
              <a target="_blank" href="https://www.reddit.com/r/INT_Chain/"><i class="f-icon fi-red"></i></a>
              <a target="_blank" href="mailto:intfoundation@intchain.io"><i class="f-icon fi-yx"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>


</template>

<script>
    export default {
      name: "Footer",
      data() {
        return {
          year: new Date().getFullYear(),
          isTestNetwork: true,
          currentChainId: '',
          chainId: '0x7ff',
          testChainId: '0x800',
        }
      },
      mounted() {
        this.getLocaction();
      },
      methods: {
        getLocaction() {
          this.isTestNetwork = window.location.hostname.substr(0, 4) === "test" || window.location.hostname.substr(0, 4) === "loca";
        },

        async switchToEtheruemChain () {
          let chainIds = '0x800';
          let rpc = 'https://testnet.titansrpc.intchain.io';
          let browser = 'https://test.titansexplorer.intchain.io/';
          let chainName = 'INT Chain Testnet';
          if (!this.isTestNetwork) {
            chainIds = '0x7ff';
            rpc = 'https://titansrpc.intchain.io';
            browser = 'https://titansexplorer.intchain.io';
            chainName = 'INT Chain Mainnet';
          }
          try {
            if (this.currentChainId !== this.chainId  && this.currentChainId !== this.testChainId) {
              await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainIds}]
              })

              this.currentChainId = await ethereum.request({ method: 'eth_chainId' });
            }
          } catch (e) {
            if (e.code === 4902) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: chainIds,
                    chainName: chainName,
                    nativeCurrency: {
                      name: "INT",
                      symbol: "INT",
                      decimals: 18
                    },
                    rpcUrls: [rpc],
                    blockExplorerUrls: [browser]
                  }]
                })

                this.currentChainId = await ethereum.request({ method: 'eth_chainId' });
              } catch (e) {
                console.log('add network error', e)
              }
            }
          }
        }
      }
    }
</script>

<style scoped>
  .footer {
    width: 100%;
    padding: 60px 0 30px;
    background-color: #4d4d4d;
    color: #ffffff;
  }

  .foot-icon{
    width: 400px;
    margin-right: 20px;
  }
  .footer .foot-c {
    display: flex;
    justify-content: space-around;
  }

  .foot-icon img{
    width: 60px;
    vertical-align: middle;
  }

  .foot-icon button{
    background-color: #ed303b;
    opacity: .9;
    border: none;
    padding: 6px;
    border-radius: 4px;
    color: #fff;
  }

  .foot-icon button:hover{
    cursor: pointer;
    opacity: .6;
  }

  .foot-icon button:focus{
    cursor: pointer;
    opacity: .6;
  }

  .foot-icon button img{
    width: 15px;
    height: 15px;
  }

  .foot-c .contact {
    margin-right: 150px;
  }

  .foot-c .f-t {
    font-size: 14px;
    font-weight: bold;
    /* margin-bottom: 16px; */
  }

  .foot-c .f-f .f-line {
    display: flex;
    flex-direction: column;
    /* margin-bottom: 30px; */
  }

  .f-f .f-line .group {
    width: 150px;
    margin: 6px 0;
  }

  .f-line .group .f-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: contain;
    background-size: contain;
  }


  .f-line .group a {
    display: inline-block;
    color: #fff;
  }

  .f-line .group a:hover span {
    color: #ed303b;
  }

  .f-line .group span {
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
  }

  .contact .f-line:last-of-type .group:first-of-type a,
  .contact .f-line:last-of-type .group:last-of-type a {
    position: relative;
  }

  .contact .group .fi-qr {
    position: absolute;
    top: 35px;
    left: 20px;
    width: 80px;
    height: 0;
    transition: all .3s;
    overflow: hidden;
  }

  .contact .f-line:last-of-type .group:first-of-type a:hover .fi-qr,
  .contact .f-line:last-of-type .group:last-of-type a:hover .fi-qr{
    height: 80px;
  }

  .contact .group .qr-wc {
    width: 80px;
    height: 80px;
    background: url("../../assets/wechat-kefu.jpg") no-repeat 0 0/contain;
  }

  .contact .group .qr-sb {
    width: 80px;
    height: 80px;
    background: url("../../assets/wechat-gongzhong.jpg") no-repeat 0 0/contain;
  }

  .footer .foot-right {
    margin-top: 32px;
    font-size: 12px;
  }

  .foot-bottom{
    display: flex;
    justify-content: space-between;
  }

  .footer hr{
    margin: 10px 0;
    opacity: .2;
  }
  .f-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    /* margin-right: 5px; */
    margin: 0 6px;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .fi-tel {
    background-image: url("../../assets/telegram.png");
  }

  .fi-tel:hover {
    background-image: url("../../assets/telegram-xz.png");
  }

  .fi-twi {
    background-image: url("../../assets/twitter.png");
  }

  .fi-twi:hover {
    background-image: url("../../assets/twitter2.png");
  }

  .fi-fb {
    background-image: url("../../assets/facebook.png");
  }

  .fi-fb:hover {
    background-image: url("../../assets/facebook-xz.png");
  }

  .fi-red {
    background-image: url("../../assets/reddit.png");
  }

  .fi-red:hover {
    background-image: url("../../assets/reddit-xz.png");
  }

  .fi-yx {
    background-image: url("../../assets/youxiang.png");
  }

  .fi-yx:hover {
    background-image: url("../../assets/youxiang-xz.png");
  }
</style>
