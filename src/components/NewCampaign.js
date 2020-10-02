import React, {Component } from 'react';
import './App.css';

class NewCampaign extends Component {
    render(){
        return(
            <div id="content" className="card">
                <p></p>
                <h1>Create Campaign</h1>
                <p></p>
                <form className="container" onSubmit={(event) => {
                    event.preventDefault()
                    const name = this.campaignName.value
                    const description = this.campaignDescription.value
                    const cause = this.campaignCause.value
                    const fundingGoal = window.web3.utils.toWei(this.campaignFundingGoal.value.toString(), 'Ether')

                    console.log(name, description, cause, fundingGoal)
                    this.props.createCampaign(name, description, cause, fundingGoal)
                }}>
                <label>
                    <div className="form-group">
                        <input
                        id="campaignName"
                        type="text"
                        ref={(input) => { this.campaignName = input }}
                        className="form-control"
                        placeholder="Name"
                        required />
                    </div>
                    <div className="form-group">
                        <input
                        id="campaignDescription"
                        type="text"
                        ref={(input) => { this.campaignDescription = input }}
                        className="form-control"
                        placeholder="Description"
                        required />
                    </div>
                    <div className="form-group">
                        <input
                        id="campaignCause"
                        type="text"
                        ref={(input) => { this.campaignCause = input }}
                        className="form-control"
                        placeholder="Cause"
                        required />
                    </div>
                    <div className="form-group">
                        <input
                        id="campaignFundingGoal"
                        type="text"
                        ref={(input) => { this.campaignFundingGoal = input }}
                        className="form-control"
                        placeholder="FundingGoal"
                        required />
                    </div>
                
                <button type="submit" className="btn btn-primary">Create</button>
                </label>
                </form>
                
            </div>
        );
    }
}
export default NewCampaign;