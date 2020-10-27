import React, {Component} from 'react';
import './App.css';
import {Form, Input, Button, Card, InputNumber,  Typography, Divider } from 'antd';
import {UserOutlined} from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;

class NewCampaign extends Component {s

    render() {
        return (
            <div className='createCampaign'>
                <div className="intro" >
                    <center>
                        <p></p>
                        <h2>Create Campaign</h2>
                        <hr />
                        <p>In the process of internal desktop applications development, many different d</p>
                    </center>
                </div>
                <div className="body">
                    <center>
                        <p></p>
                    {/* <Card style={{marginTop: "10%", marginLeft: "37%"}} id="content" className="card"> */}
                        <Card style={{ width: 600}}>
                            <p></p>

                            <p></p>
                            
                        <form className="container" style={{textAlign: "center"}} 
                            onSubmit={(event) => {
                            event.preventDefault()
                            const name = this.campaignName.value
                            const description = this.campaignDescription.value
                            const cause = this.campaignCause.value
                            const fundingGoal = window.web3.utils.toWei(this.fundingGoal.value.toString(), 'Ether')

                            console.log(name, description, cause, fundingGoal)
                            this.props.createCampaign(name, description, cause, fundingGoal)
                            // window.location.reload();
                        }}>
                            <div>
                                <div className="form-group">
                                    <label for="campaignName">Campaign Name<span style={{color: 'red'}}>*</span></label>
                                    <input
                                    id="campaignName"
                                    type="text"
                                    ref={(input) => { this.campaignName = input }}
                                    className="form-control"
                                    placeholder="Enter the Campaign Name"
                                    required />
                                </div>
                                <div className="form-group">
                                    <label for="campaignCause">Purpose<span style={{color: 'red'}}>*</span></label>
                                    <input
                                    id="campaignCause"
                                    type="text"
                                    ref={(input) => { this.campaignCause = input }}
                                    className="form-control"
                                    placeholder="Enter the purpose of Campaign"
                                    required />
                                </div>
                                <div className="form-group">
                                    <label for="campaignDescription">Description<span style={{color: 'red'}}>*</span></label>
                                    <input
                                    style={{height: '80px'}}
                                    id="campaignDescription"
                                    type="text"
                                    ref={(input) => { this.campaignDescription = input }}
                                    className="form-control"
                                    placeholder="Provide few details"
                                    rows="5"
                                    required />
                                </div>
                                <div className="form-group">
                                    <label for="fundingGoal">Funding Goal<span style={{color: 'red'}}>*</span></label>
                                    <input
                                    id="fundingGoal"
                                    type="text"
                                    ref={(input) => { this.fundingGoal = input }}
                                    className="form-control"
                                    placeholder="Amount (In Ethers)"
                                    required />
                                </div>

                            <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                            </form>
                        </Card>
                    
                    </center>
                </div>
            </div>
        );
    }
}

export default NewCampaign;