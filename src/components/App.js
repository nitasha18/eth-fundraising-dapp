import React, {Component} from 'react';
import './App.css';
import "antd/dist/antd.css";
// import Config from './Config';
import Web3 from 'web3';
import Navbar from './Navbar';
import FundraisingDapp from '../abis/FundraisingDapp.json';
import NewCampaign from './NewCampaign';
import DisplayCampaign from './DisplayCampaign';
import Fillform from "./fillform";
import NavBar from "./Navbar"

class App extends Component {
    

    render() {
        return (

            <div className="App">
                <NavBar />
            </div>
        );
    }


}
export default App;
