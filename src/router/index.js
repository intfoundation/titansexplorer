import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layouts/Layout'
import Home from '@/components/Home'
import Blocks from '@/components/blockchain/Blocks'
import Block from '@/components/blockchain/Block'
import Transactions from '@/components/blockchain/Transactions'
import Transaction from '@/components/blockchain/Transaction'
import Accounts from '@/components/blockchain/Accounts'
import Account from '@/components/blockchain/Account'
import Asset1 from '@/components/asset/Asset1'
import Staking1 from '@/components/staking/Staking1'
import StatsList from '@/components/stats/StatsList'
import StatsDetail from '@/components/stats/StatsDetail'
import Validators from '@/components/stats/Validators'
import ValidatorDetail from '@/components/stats/ValidatorDetail'
import Epochs from '@/components/staking/Epoch'
import MiningRank from '@/components/stats/MiningRank'
import MappingList from '@/components/stats/MappingList'
import BridgeList from '@/components/stats/BridgeList'
import Result from '@/components/Oops'
import Tokens from '@/components/tokens/Tokens'
import NFT from '@/components/tokens/NFT'
import Token from '@/components/tokens/Token'
import More from '@/components/more/More'
import Verify from '@/components/more/Verify'
import Format from '@/components/more/Format'
// import RawFormat from '@/components/more/RawFormat'

Vue.use(Router);

export default new Router({
  mode: 'history',
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
          path: '/blocks/:page',
          name: 'Blocks',
          component: Blocks
        },
        {
          path: '/block/:heightOrHash/:page',
          name: 'Block',
          component: Block
        },
        {
          path: '/txs/:page',
          name: 'Transactions',
          component: Transactions
        },
        {
          path: '/tx/:hash',
          name: 'Transaction',
          component: Transaction
        },
        {
          path: '/accounts',
          name: 'Accounts',
          component: Accounts
        },
        {
          path: '/address/:addr',
          name: 'Account',
          component: Account
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
          path: '/stats/miningrank',
          name: 'MiningRank',
          component: MiningRank
        },
        // {
        //   path: '/stats/mappinglist/:page',
        //   name: 'MappingList',
        //   component: MappingList
        // },
        {
          path: '/stats/bridgelist/:page',
          name: 'BridgeList',
          component: BridgeList
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
          path: '/staking/epochs/:page',
          name: 'Epochs',
          component: Epochs
        },


        {
          path: '/tokens/list/:page',
          name: 'Tokens',
          component: Tokens
        },
        {
          path: '/tokens-nft/list/:page',
          name: 'Tokens-nft',
          component: NFT
        },
        {
          path: '/token/:address',
          name: 'Token',
          component: Token
        },
        // {
        //   path: '/transfer/transferlist/:page',
        //   name: 'TransferList',
        //   component: TransferList
        // },
        // {
        //   path: '/transfer/transferdetail/:hash',
        //   name: 'TransferDetail',
        //   component: TransferDetail
        // },


        {
          path: '/result/:result',
          name: 'Result',
          component: Result
        },

        {
          path: '/verifyContract',
          name: 'More',
          component: More,
        },
        {
          path: '/verifyContract/:address',
          name: 'More',
          component: More,
        },
        {
          path: '/verifyContractSolc/:address/:compileType/:compileVersion/:linceseType',
          name: 'Verify',
          component: Verify
        },
        {
          path:'exportAbi/:address/:format',
          name: 'format',
          component: Format
        }
      ]
    }
  ]
})
