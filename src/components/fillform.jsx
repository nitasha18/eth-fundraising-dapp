import React, {Component} from 'react';
import './App.css';
import "antd/dist/antd.css";
// import Config from './Config';
import Web3 from 'web3';
import Navbar from './Navbar';
import FundraisingDapp from '../abis/FundraisingDapp.json';
import NewCampaign from './NewCampaign';
import DisplayCampaign from './DisplayCampaign';
import "./fillform.css"
import {Spin} from 'antd';
import {LoadingOutlined, UserOutlined} from '@ant-design/icons';
import {Input} from 'antd';


const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

class Fillform extends Component {
    async componentWillMount() {
        document.title = "Fundraiser"
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    refreshPage() {
        window.location.reload(false)
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
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
        this.setState({account: accounts[0]})
        const networkId = await web3.eth.net.getId()
        const networkData = FundraisingDapp.networks[networkId]
        // console.log(FundraisingDapp.abi, networkData.address)

        if (networkData) {
            const fundraisingDapp = new web3.eth.Contract(FundraisingDapp.abi, networkData.address)
            console.log(fundraisingDapp)
            this.setState({fundraisingDapp})

            // const newTempCampaign = await fundraisingDapp.methods.createCampaign('Student Care','For students from 1st to 12th Std','Education',web3.utils.toWei('10','Ether')).send({from: this.state.account})
            // console.log(newTempCampaign)

            const campaignCount = await fundraisingDapp.methods.campaignCount().call()
            console.log(campaignCount.toString())
            this.setState({campaignCount})
            for (var i = 1; i <= campaignCount; i++) {
                const campaign = await fundraisingDapp.methods.campaigns(i).call()
                this.setState({
                    campaigns: [...this.state.campaigns, campaign]
                })
            }
            // console.log(this.state.campaigns)

            // var createdCampaign = await fundraisingDapp.propo
            // console.log(createdCampaign)

            this.setState({loading: false})
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
        this.setState({loading: true})
        this.state.fundraisingDapp.methods.createCampaign(name, description, cause, fundingGoal).send({from: this.state.account})
            .once('receipt', (receipt) => {
                this.setState({loading: false})
            })
    }

    donate(id, amount) {
        this.setState({loading: true})
        this.state.fundraisingDapp.methods.donate(id).send({from: this.state.account, value: amount})
            .once('receipt', (receipt) => {
                this.setState({loading: false})
            })
    }


    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex text-center">
                            <div className='col'>
                                {this.state.loading
                                    ? <div id="loader" className="text-center"><p className="text-center"><Spin
                                        indicator={antIcon}/></p></div>
                                    : <NewCampaign createCampaign={this.createCampaign}/>
                                }
                            </div>
                        </main>
                    </div>
                </div>

            </div>
        );
    }
}

export default Fillform;