import React, {Component} from 'react';
import {Button, Menu} from "antd";
import {Layout} from "antd";
import {Typography, Space} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DisplayCampaign from "./DisplayCampaign";
import NewCampaign from "./NewCampaign";
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
            window.alert('Non-ethereum browser detected. Consider trying Metamask!')
        }
      }

      async loadBlockchainData() {
        const web3 = window.web3
        //load accounts
        const accounts = await web3.eth.getAccounts()
        // console.log(accounts)
        this.setState({ account: accounts[0]})
        const networkId = await web3.eth.net.getId()
        const networkData = FundraisingDapp.networks[networkId]
        // console.log(FundraisingDapp.abi, networkData.address)

        if(networkData) {
          const fundraisingDapp = new web3.eth.Contract(FundraisingDapp.abi, networkData.address)
          console.log(fundraisingDapp)
          this.setState({ fundraisingDapp  })

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


      constructor(props) {
        super(props)
        this.state = {
          account: '',
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
                    <Menu defaultSelectedKeys={[window.location.pathname]} theme={'dark'} mode="horizontal">
                        <Menu.Item key="/"><Link to={"/"}>Home</Link></Menu.Item>
                        <Menu.Item key="/new-campaign"><Link to={"/new-campaign"}>Create</Link></Menu.Item>
                        <Menu.Item key="/campaign-list"><Link to={"/campaign-list"}>List</Link></Menu.Item>
                        <Text keyboard style={{marginLeft: '58%'}}>{this.state.account}</Text>
                    </Menu>

                    <Route exact path="/" component={StaticLayout}/>
                    {/* <Route exact path="/new-campaign/" component={NewCampaign }/> */}
                    <Route exact path="/new-campaign/">
                        <NewCampaign createCampaign={this.createCampaign}/>
                    </Route>
                    {/* <Route exact path="/campaign-list/" component={Listings} /> */}
                    <Route exact path="/campaign-list/">
                        <DisplayCampaign campaigns={this.state.campaigns} 	
                                          donate = {this.donate} />
                    </Route>

                    {/*<Route path="/lend-money/" component={MoneyDonation} />*/}
                </Header>
            </Router>

        );
    }
}
export default Navbar;