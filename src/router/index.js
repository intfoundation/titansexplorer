import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layouts/Layout'
import Home from '@/components/Home'
import Blocks from '@/components/blockchain/Blocks'
import BlocksDetail from '@/components/blockchain/BlockDetail'
import Asset1 from '@/components/asset/Asset1'
import Staking1 from '@/components/staking/Staking1'
import Stats1 from '@/components/stats/Stats1'
import TransferList from '@/components/transfer/TransferList'
import TransferDetail from '@/components/transfer/TransferDetail'
import Result from '@/components/Oops'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Layout',
      component: Layout,
      children:[
        {
        path: '/',
        name: 'Home',
        component: Home,
        },
        {
          path: '/blockchain/blocks/:page',
          name: 'Blocks',
          component: Blocks
        },
        {
          path: '/blockchain/blockdetail/:height',
          name: 'BlockDetail',
          component: BlocksDetail
        },
        {
          path: '/asset/asset1',
          name: 'Asset1',
          component: Asset1
        },
        {
          path: '/staking/staking1',
          name: 'Staking1',
          component: Staking1
        },
        {
          path: '/stats/stats1',
          name: 'Stats1',
          component: Stats1
        },
        {
          path: '/transfer/transferlist/:page',
          name: 'TransferList',
          component: TransferList
        },
        {
          path: '/transfer/transferdetail/:hash',
          name: 'TransferDetail',
          component: TransferDetail
        },
        {
          path: '/result/:result',
          name: 'Result',
          component: Result
        }
      ]
    }
  ]
})
