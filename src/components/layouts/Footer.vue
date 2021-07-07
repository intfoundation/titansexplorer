<template>
    <div class="footer">
      <div id="box">
        <div class="foot-c">
          <div class="contact">
            <div class="f-t"><span>Contact Us</span></div>
            <div class="f-f">
              <div class="f-line">
                <div class="group"><a target="_blank" href="https://t.me/INTChainOfficial"><i class="f-icon fi-tel"></i><span>Telegram</span></a></div>
                <div class="group"><a target="_blank" href="https://twitter.com/intchain"><i class="f-icon fi-twi"></i><span>Twitter</span></a></div>
                <div class="group"><a target="_blank" href="https://www.facebook.com/INTchainINT"><i class="f-icon fi-fb"></i><span>FaceBook</span></a></div>
                <div class="group"><a target="_blank" href="https://www.reddit.com/r/INT_Chain/"><i class="f-icon fi-red"></i><span>Reddit</span></a></div>
              </div>
              <div class="f-line">
                <div class="group"><a href="javascript:void(0)"><div class="fi-qr"><div class="qr-wc"></div></div><i class="f-icon fi-wc"></i><span>WeChat</span></a></div>
                <div class="group"><a target="_blank" href="https://weibo.com/u/6358909246"><i class="f-icon fi-wb"></i><span>Weibo</span></a></div>
                <div class="group"><a target="_blank" href="mailto:intfoundation@intchain.io"><i class="f-icon fi-yx"></i><span>Email</span></a></div>
                <div class="group"><a href="javascript:void(0)"><div class="fi-qr"><div class="qr-sb"></div></div><i class="f-icon fi-sb"></i><span>Subscription</span></a></div>
              </div>
            </div>
          </div>
          <div class="link">
            <div class="f-t"><span>Link</span></div>
            <div class="f-f">
              <div class="f-line">
                <div class="group"><a target="_blank" href="http://tech.intchain.io/"><i class="f-icon fi-sq"></i><span>Community</span></a></div>
                <div class="group"><a target="_blank" :href="`https://${isTestNetwork ? 'test.' : ''}titanswallet.intchain.io`"><i class="f-icon fi-qb"></i><span>Wallet</span></a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="foot-right">
          <span>Copyright © 2019-{{year}} INT.</span>
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
            isTestNetwork: true
          }
        },
        mounted() {
          this.getLocaction();
        },
        methods: {
          getLocaction() {
            this.isTestNetwork = window.location.hostname.substr(0, 4) === "test";
          }
        }
    }
</script>

<style scoped>
  .footer {
    width: 100%;
    padding: 80px 0 45px;
    background-color: #4d4d4d;
    color: #ffffff;
  }

  .footer .foot-c {
    display: flex;
  }

  .foot-c .contact {
    margin-right: 180px;
  }

  .foot-c .f-t {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 45px;
  }

  .foot-c .f-f .f-line {
    display: flex;
    margin-bottom: 30px;
  }

  .f-f .f-line .group {
    width: 170px;
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

  .f-line .group .fi-tel {
    background-image: url("../../assets/telegram.png");
  }

  .f-line .group a:hover .fi-tel {
    background-image: url("../../assets/telegram-xz.png");
  }

  .f-line .group .fi-twi {
    background-image: url("../../assets/twitter.png");
  }

  .f-line .group a:hover .fi-twi {
    background-image: url("../../assets/twitter.png");
  }

  .f-line .group .fi-fb {
    background-image: url("../../assets/facebook.png");
  }

  .f-line .group a:hover .fi-fb {
    background-image: url("../../assets/facebook-xz.png");
  }

  .f-line .group .fi-red {
    background-image: url("../../assets/reddit.png");
  }

  .f-line .group a:hover .fi-red {
    background-image: url("../../assets/reddit-xz.png");
  }

  .f-line .group .fi-wc {
    background-image: url("../../assets/wechat.png");
  }

  .f-line .group a:hover .fi-wc {
    background-image: url("../../assets/wechat-xz.png");
  }

  .f-line .group .fi-wb {
    background-image: url("../../assets/weibo.png");

  }

  .f-line .group a:hover .fi-wb {
    background-image: url("../../assets/weibo-xz.png");
  }

  .f-line .group .fi-yx {
    background-image: url("../../assets/youxiang.png");
  }

  .f-line .group a:hover .fi-yx {
    background-image: url("../../assets/youxiang-xz.png");
  }

  .f-line .group .fi-sb {
    background-image: url("../../assets/subscription.png");
  }

  .f-line .group a:hover .fi-sb {
    background-image: url("../../assets/subscription-xz.png");
  }

  .f-line .group .fi-sq {
    background-image: url("../../assets/shequ.png");
  }

  .f-line .group a:hover .fi-sq {
    background-image: url("../../assets/shequ-xz.png");
  }

  .f-line .group .fi-qb {
    background-image: url("../../assets/qianbao.png");
  }

  .f-line .group a:hover .fi-qb {
    background-image: url("../../assets/qianbao-xz.png");
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
    margin-top: 100px;
    font-size: 12px;
    text-align: center;
  }
</style>
