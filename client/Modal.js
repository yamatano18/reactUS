import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'


export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.isOpen);

        if (this.props.isOpen == false)
            return null;


        return (
            <div className="row modaltest">
                <div id="myModal" className="col-md-12">

                    <div className="modal-content">
                        <span onClick={(e)=>this.props.toggle(e)} className="close">&times;</span>
                        {this.props.children}
                    </div>

                </div>
            </div>
        );

    }
}
