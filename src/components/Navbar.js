import React, {Component} from 'react';
import {Button, Menu} from "antd";
import {Layout} from "antd";
import {Typography, Space} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DisplayCampaign from "./DisplayCampaign";
import NewCampaign from "./NewCampaign";
import UserAccount from "./UserAccount";
import StaticLayout from "./layout";
import Web3 from 'web3';
import FundraisingDapp from '../abis/FundraisingDapp.json';

const {Header} = Layout;

const {Text} = Typography;

class Navbar extends Component {

    async componentWillMount() {
        document.title = "Fundraiser"
        await this.loadWeb3()
        await this.loadBlockchainData()
    }


    async loadWeb3() {
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!")
        }
      }

      async loadBlockchainData() {
        const web3 = window.web3
        //load accounts
        const accounts = await web3.eth.getAccounts()
        // console.log(accounts)
        this.setState({ account: accounts[0]})

        const accountBalance = await web3.eth.getBalance(accounts[0])
        this.setState({balance : web3.utils.fromWei(accountBalance,'Ether')})
        // console.log(balances)
        // this.web3.eth.getBalance(this.account, (err, balance) => {
        //   this.setState ({ balance: this.web3.fromWei(balance, "ether") + " ETH"})
        // });
        const networkId = await web3.eth.net.getId()
        const networkData = FundraisingDapp.networks[networkId]
        // console.log(FundraisingDapp.abi, networkData.address)

        if(networkData) {
          const fundraisingDapp = new web3.eth.Contract(FundraisingDapp.abi, networkData.address)
          console.log(fundraisingDapp)
          this.setState({ fundraisingDapp  })
          // const balance = web3.eth.getBalance(this.account)
          // console.log(balance)

          // const newTempCampaign = await fundraisingDapp.methods.createCampaign('Student Care','For students from 1st to 12th Std','Education',web3.utils.toWei('10','Ether')).send({from: this.state.account})
          // console.log(newTempCampaign)
          const campaignCount = await fundraisingDapp.methods.campaignCount().call()
          // console.log(campaignCount.toString())
          this.setState({ campaignCount})
          for(var i=1; i<=campaignCount;i++){
            const campaign = await fundraisingDapp.methods.campaigns(i).call()
            this.setState({
              campaigns : [...this.state.campaigns,campaign]
            })
          }
          // console.log(this.state.campaigns)

          // var createdCampaign = await fundraisingDapp.propo
          // console.log(createdCampaign)

          this.setState({ loading: false})
        } else {
          window.alert('FundraisingDapp contract is not deployed on the detected network')
        }
    }

    async loadAccounts() {
      if(window.ethereum){
        window.ethereum.on('accountsChanged',function(accounts){
          console.log(accounts[0])
          this.setState({ account: accounts[0]})
          console.log(this.balance)
        })
      }
    }


      constructor(props) {
        super(props)
        this.state = {
          account: '',
          balance: 0,
          campaignCount: 0,
          campaigns: [],
          loading: true
        }
        this.createCampaign = this.createCampaign.bind(this)
        this.donate = this.donate.bind(this)
      }


    createCampaign(name, description, cause, fundingGoal) {
        this.setState({ loading: true})
        this.state.fundraisingDapp.methods.createCampaign(name, description, cause, fundingGoal).send({ from: this.state.account })
        .on('confirmation', (reciept) => {
          this.setState({ loading: false })
          window.location.reload()
        })
    }

    donate(id, amount) {
        this.setState({loading: true})
        this.state.fundraisingDapp.methods.donate(id).send({from: this.state.account, value: amount})
            .on('confirmation', (reciept) => {
              this.setState({ loading: false })
              window.location.reload()
            })
    }

    
    render() {
        return (


            <Router>
                <Header className="main-navigation">
                    <div className="logo"/>
                    <Menu theme={'dark'} mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to={"/"}>Dashboard</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={"/new-campaign"}>Register Campigns</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={"/campaigns"} >View Campaings</Link></Menu.Item>
                        <Menu.Item key="4" style={{float: 'right'}}><Link to={"/user-account"} >Account Address : {this.state.account}</Link></Menu.Item>
                        {/* <Text keyboard style={{marginLeft: '55%'}}>Account Address : {this.state.account}</Text> */}

                    </Menu>

                    <Route exact path="/" component={StaticLayout}/>
                    {/* <Route exact path="/new-campaign/" component={NewCampaign }/> */}
                    <Route exact path="/new-campaign/">
                        <NewCampaign createCampaign={this.createCampaign}/>
                    </Route>
                    {/* <Route exact path="/campaign-list/" component={Listings} /> */}
                    <Route exact path="/campaigns/">
                        <DisplayCampaign campaigns={this.state.campaigns} 	
                                          donate = {this.donate} />
                    </Route>
                    <Route exact path="/user-account" >
                        {/* render={this.loadAccounts}  */}
                        <UserAccount account= {this.state.account} balance= {this.state.balance}/>
                    </Route>

                    {/*<Route path="/lend-money/" component={MoneyDonation} />*/}
                </Header>
            </Router>

        );
    }
}
export default Navbar;