import React, {Component} from 'react';
import {Button, Menu} from "antd";
import {Layout} from "antd";
import {Typography, Space} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DisplayCampaign from "./DisplayCampaign";
import NewCampaign from "./NewCampaign";
import StaticLayout from "./layout";

const {Header} = Layout;


const {Text} = Typography;

class Navbar extends Component {
    render() {
        return (


            <Router>
                <Header className="main-navigation">
                    <div className="logo"/>
                    <Menu theme={'dark'} mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to={"/"}>Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={"/new-campaign"}>Create Listing</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={"/campaign-list"}>Listings</Link></Menu.Item>
                        <Text keyboard style={{marginLeft: '60%'}}>{this.props.account}</Text>

                    </Menu>
                    <Route exact path="/" component={StaticLayout}/>
                    <Route exact path="/new-campaign/" component={NewCampaign}/>
                    <Route exact path="/campaign-list/" component={DisplayCampaign}/>

                    {/*<Route path="/lend-money/" component={MoneyDonation} />*/}
                </Header>
            </Router>

        );
    }
}
export default Navbar;