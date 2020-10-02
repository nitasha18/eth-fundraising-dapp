import React, { Component } from 'react';
import Web3 from 'web3';
import { render } from 'react-dom';
import FundraisingDapp from '../abis/FundraisingDapp.json';

class Config extends Component { 
    
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
        
      async loadBlockchainData() {
          const web3 = window.web3
          //load accounts
          const accounts = await web3.eth.getAccounts()
          console.log(accounts)
          this.setState({ account: accounts[0]})
          
      }

      async loadWeb3() {
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if(window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else { 
          window.alert('Non-ethereum browser detected. Consider trying Metamask!')
        }
      }

    
    //   purchaseProduct(id,price) {
    //     this.setState({ loading:true})
    //     this.state.fundraisingDapp.methods.purchaseProduct(id).send({from: this.state.account, value:price})
    //       .once('receipt',(receipt)=> {
    //         this.setState({loading:false})
    //       })
    //   }
    
    //   createProduct(name, price) {
    //     this.setState({ loading:true})
    //     this.state.fundraisingDapp.methods.createProduct(name,price).send({from: this.state.account})
    //       .once('receipt',(receipt)=> {
    //         this.setState({loading:false})
    //       })
    //   }
    
      constructor(props) {
        super(props)
        this.state = {
          account: '',
        //   productCount: 0,
        //   products: [],
        //   loading: true
        }
        // this.createProduct = this.createProduct.bind(this)
        // this.purchaseProduct = this.purchaseProduct.bind(this)
      }

    render() {
        return(
        <div></div>
        );
    }
}

export default Config;
