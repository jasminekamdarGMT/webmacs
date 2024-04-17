import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
        <div className="container-fluid footer">
            <hr />
            <div className="productTitles">
                <div className="productTitle">WebMACS</div>
                <div className="productSubTitle">Modular Aeration</div>
                <div className="productSubTitle">Control System</div>
            </div>
            <div className="logoContainer">
                <a href="http://compostingtechnology.com" target="_blank" rel="noopener noreferrer"><div className="logoImage"></div></a>
            </div>
        </div>
    );
  }
}

export default Footer;
