import React, {Component} from 'react';
import {Badge, Descriptions , Card} from 'antd';

function getOperatingSystem(window) {
    let operatingSystem = 'Not known';
    if (window.navigator.appVersion.indexOf('Win') !== -1) {
        operatingSystem = 'Windows';
    }
    if (window.navigator.appVersion.indexOf('Mac') !== -1) {
        operatingSystem = 'MacOS';
    }
    if (window.navigator.appVersion.indexOf('X11') !== -1) {
        operatingSystem = 'UNIX OS';
    }
    if (window.navigator.appVersion.indexOf('Linux') !== -1) {
        operatingSystem = 'Linux';
    }

    return operatingSystem;
}

function getBrowser(window) {
    let currentBrowser = 'Not known';
    if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
        currentBrowser = 'Google Chrome';
    } else if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
        currentBrowser = 'Mozilla Firefox';
    } else if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
        currentBrowser = 'Internet Explorer';
    } else if (window.navigator.userAgent.indexOf('Edge') !== -1) {
        currentBrowser = 'Edge';
    } else if (window.navigator.userAgent.indexOf('Safari') !== -1) {
        currentBrowser = 'Safari';
    } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
        currentBrowser = 'Opera';
    } else if (window.navigator.userAgent.indexOf('Opera') !== -1) {
        currentBrowser = 'YaBrowser';
    } else {
        console.log('Others');
    }

    return currentBrowser;
}


class UserAccount extends Component {
    OS = (window) => getOperatingSystem(window);
    currentBrowser = (window) => getBrowser(window);

    render() {
        return (
            <center>
                <br />
                <div class="containerAcc">
                    {/* <Card style={{width: 800}}> */}
                        <div class="user" style={{width: 800}}>
                            
                            <h1>Account Details</h1>
                            {/* <br /> */}
                            <Descriptions bordered>
                                <Descriptions.Item label="System" span={3}>{this.OS(window)}</Descriptions.Item>
                                <Descriptions.Item label="Browser"
                                                   span={3}>{this.currentBrowser(window)}</Descriptions.Item>
                                <Descriptions.Item label="Ethereum Wallet" span={3}>MetaMask</Descriptions.Item>
                                <Descriptions.Item label="Account Address"
                                                   span={3}>{this.props.account}</Descriptions.Item>
                                <Descriptions.Item label="Account Balance"
                                                   span={3}>{this.props.balance} Ethers</Descriptions.Item>
                                <Descriptions.Item label="Status" span={3}>
                                    <Badge status="processing" text="Running"/>
                                </Descriptions.Item>
                            </Descriptions>
                            
                        </div>
                    {/* </Card> */}
                </div>
            </center>
        );
    }
}

export default UserAccount;