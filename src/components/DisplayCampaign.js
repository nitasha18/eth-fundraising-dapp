import React, {Component } from 'react';
import './App.css';
import {Button, Card} from "antd";
import './DisplayCampaign.css';

class DisplayCampaign extends Component {


    render(){
        return(
            <div id='content'>
                <h1 style={{textAlign: "center", marginTop: 10}}>List of All Campaigns</h1>
                {/* <Card> */}
                    <table className='table'>
                        <thead>
                        <tr>
                            <th scope='col' className="cell">Sr no.</th>
                            <th scope='col' className="cell">Name</th>
                            <th scope='col' className="cell">Description</th>
                            <th scope='col' className="cell">Cause</th>
                            <th scope='col' className="cell">Funding Goal</th>
                            <th scope='col' className="cell">Campaign Holder</th>
                            <th scope='col' className="cell">Recent Donor</th>
                                <th scope='col' className="cell"></th>
                            </tr>
                        </thead>
                        <tbody id="campaignList">
                            {/* <tr>
                                <th scope="row" className="cell">1</th>
                                <td className="cell">Project Funding</td>
                                <td className="cell">For Building freelancing projects</td>
                                <td className="cell">Education</td>
                                <td className="cell">1 Eth</td>
                                <td className="cell">0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
                                <td className="cell">0x0000000000000000000000000000000000000000</td>
                                <td className="cell"><button className='donateButton'>Donate</button></td>
                            </tr> */}
                            
                            { this.props.campaigns.map(( campaign, key) => {
                                return(
                                    <Card>
                                    <tr key = {key}>
                                        <th scope="row" data-label="id" className="cell">
                                            <span >Campaign  </span>{ campaign.id.toString()}
                                            </th>
                                        <td data-label="campaignName" className="cell">{campaign.name}</td>
                                        <td data-label="cause" className="cell">{campaign.cause}</td>
                                        <td data-label="description" className="cell">{campaign.description}</td>
                                        <td data-label="amount" className="cell">{window.web3.utils.fromWei(campaign.fundingGoal.toString(),'Ether')} Ether</td>
                                        <td data-label="recipient" className="cell">{campaign.recipient}</td>
                                        <td data-label="donor" className="cell">{campaign.donor}</td>
                                        
                                            <td data-label="create" className="cell">
                                                {
                                                    !campaign.completed
                                                        ?
                                                        <center> 
                                                            <Button
                                                                type={"primary"}
                                                                id={campaign.id}
                                                                amount={campaign.fundingGoal}
                                                                className='donateButton'
                                                                onClick={(event) => {
                                                                    this.props.donate(event.target.id, event.target.amount)

                                                                }}
                                                            >
                                                                Donate
                                                            </Button>
                                                        </center>
                                                    : null
                                                }
                                            </td>
                                        
                                    </tr>
                                    </Card>
                                )
                            })}
                        </tbody>
                    </table>
                {/* </Card> */}
            </div>
        );
    }
}
export default DisplayCampaign;