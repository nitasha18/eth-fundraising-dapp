import React, {Component} from 'react';
import './App.css';
import { Descriptions, Badge, Card } from 'antd';

class UserAccount extends Component {

    render() {
        return (
            <center>
                <br />
                <div class="container">
                    <Card style={{ width: 800}}>
                        <div class="user" >
                            <br />
                            <Descriptions title="Account Details" bordered>
                                <Descriptions.Item label="System" span={3}>Windows</Descriptions.Item>
                                <Descriptions.Item label="Ethereum Wallet" span={3}>MetaMask</Descriptions.Item>
                                <Descriptions.Item label="Account Address" span={3}>{this.props.account}</Descriptions.Item>
                                <Descriptions.Item label="Balance" span={3}>100 Ethers</Descriptions.Item>
                                <Descriptions.Item label="Status" span={3}>
                                <Badge status="processing" text="Running" />
                                </Descriptions.Item>
                            </Descriptions>
                            
                        </div>
                    </Card>
                </div>
            </center>
        );
    }
}

export default UserAccount;