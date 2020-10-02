import React, {Component } from 'react';
import './App.css';

class DisplayCampaign extends Component {


    render(){
        return(
            <div id='content'>
                <h1>All Campaigns</h1>
                <table className='table'>
                    <thead>
                        <tr >
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
                                <tr key = {key}>
                                    <th scope="row" className="cell">{ campaign.id.toString()}</th>
                                    <td className="cell">{campaign.name}</td>
                                    <td className="cell">{campaign.description}</td>
                                    <td className="cell">{campaign.cause}</td>
                                    <td className="cell">{window.web3.utils.fromWei(campaign.fundingGoal.toString(),'Ether')}</td>
                                    <td className="cell">{campaign.recipient}</td>
                                    <td className="cell">{campaign.donor}</td>
                                    <td className="cell">
                                        {
                                            !campaign.completed
                                            ? <button 
                                                id = {campaign.id }
                                                amount = {campaign.fundingGoal}
                                                className='donateButton' 
                                                onClick={(event) => {
                                                    this.props.donate(event.target.id, event.target.amount)
            
                                                } } 
                                                >
                                                    Donate
                                            </button>
                                            : null
                                        }
                                    </td>
                                </tr>
                             )
                         })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default DisplayCampaign;