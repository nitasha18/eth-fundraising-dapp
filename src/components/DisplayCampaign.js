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
                    <table className='ttable' >
                        <thead className="tthead">
                        <tr className="ttr"
                            // style={{display: 'block',
                            // bordercollapse: 'collapse',
                            // marginbottom: '24px',
                            // padding: '16px 8px 8px 16px',
                            // backgroundcolor: 'white' }}
                            >
                            <th scope='col' className="ttd">Sr no.</th>
                            <th scope='col' className="ttd">Name</th>
                            <th scope='col' className="ttd">Description</th>
                            <th scope='col' className="ttd">Cause</th>
                            <th scope='col' className="ttd">Funding Goal</th>
                            <th scope='col' className="ttd">Campaign Holder</th>
                            <th scope='col' className="ttd">Recent Donor</th>
                                <th scope='col' className="ttd"></th>
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
                                    <tr key = {key} className="ttr">
                                        <th scope="row" data-label="id" className="ttd">{campaign.id.toString()}</th>
                                        <td data-label="campaignName" className="ttd">{campaign.name}</td>
                                        <td data-label="cause" className="ttd">{campaign.cause}</td>
                                        <td data-label="description" className="ttd">{campaign.description}</td>
                                        <td data-label="amount" className="ttd">{window.web3.utils.fromWei(campaign.fundingGoal.toString(),'Ether')} Ether</td>
                                        <td data-label="recipient" className="ttd">{campaign.recipient}</td>
                                        <td data-label="donor" className="ttd">{campaign.donor}</td>
                                        
                                            <td data-label="create" className="ttd">
                                                {
                                                    !campaign.completed
                                                        ?
                                                        // <center> 
                                                            <Button
                                                                type={"primary"}
                                                                // id={campaign.id}
                                                                // amount={campaign.fundingGoal}
                                                                className='donateButton'
                                                                onClick={(event) => {
                                                                    event.preventDefault()
                                                                    console.log(campaign.id, campaign.fundingGoal)
                                                                    this.props.donate(campaign.id, campaign.fundingGoal)

                                                                }}
                                                            >
                                                                Donate
                                                            </Button>
                                                        // </center>
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