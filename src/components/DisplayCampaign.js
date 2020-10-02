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
                        <tr>
                            <th scope="row" className="cell">1</th>
                            <td className="cell">Project Funding</td>
                            <td className="cell">For Building freelancing projects</td>
                            <td className="cell">Education</td>
                            <td className="cell">1 Eth</td>
                            <td className="cell">0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
                            <td className="cell">0x0000000000000000000000000000000000000000</td>
                            <td className="cell"><button className='donateButton'>Donate</button></td>
                        </tr>
{/*                         
                         {this.props.products.map((product,key) => {
                             return(
                                 <tr key={key}>
                                     <th scope="row">{product.id.toString()}</th>
                                     <td>product.name</td>
                                     <td>{window.web3.utils.fromWei(product.price.toString(),'Ether')}</td>
                                    <td>{product.owner}</td>
                                    <td>
                                        { !product.purchased
                                        ? <button
                                            name={product.id}
                                            value={product.price}
                                            onClick={(event)=>{
                                                this.props.purchaseProduct(event.target.name, event.target.value)
                                            }}
                                            >Buy
                                            </button>
                                            :null
                                        }
                                    </td>
                                 </tr>
                             )
                         })} */}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default DisplayCampaign;