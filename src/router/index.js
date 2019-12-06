import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layouts/Layout'
import Home from '@/components/Home'
import Blocks from '@/components/blockchain/Blocks'
import BlocksDetail from '@/components/blockchain/BlockDetail'
import Asset1 from '@/components/asset/Asset1'
import Staking1 from '@/components/staking/Staking1'
import StatsList from '@/components/stats/StatsList'
import StatsDetail from '@/components/stats/StatsDetail'
import Validators from '@/components/stats/Validators'
import ValidatorDetail from '@/components/stats/ValidatorDetail'
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
          path: '/blockchain/blockdetail/:height/:page',
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
          path: '/stats/statslist',
          name: 'StatsList',
          component: StatsList
        },
        {
          path: '/stats/statsdetail/:addr',
          name: 'StatsDetail',
          component: StatsDetail
        },
        {
          path: '/staking/validators',
          name: 'Validators',
          component: Validators
        },
        {
          path: '/staking/validatorDetail/:addr',
          name: 'ValidatorDetail',
          component: ValidatorDetail
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
