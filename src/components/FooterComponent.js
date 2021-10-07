import React, { Component } from 'react';

function Footer(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className='col-12 d-flex justify-content-center'>
                        <h2>Contact</h2>
                    </div>
                    <div className='col-12 col-md-6 d-flex justify-content-center'>

                        <a className='btn btn-social-icon btn-github m-2' href='https://github.com/Hazem-Gamall'>
                            <span className='fa fa-github'></span>
                        </a>
                        <a className='btn btn-social-icon btn-linkedin m-2' href='https://www.linkedin.com/in/hazem-gamall/'>
                            <span className='fa fa-linkedin'></span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;