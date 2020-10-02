import React, {Component } from 'react';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar text-white navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            
            SGP Project : A Fundraising Decentralised Application
            
            <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="account">{this.props.account}</span></small>
            </li>
            </ul>
        </nav>
        );
    }
}
export default Navbar;