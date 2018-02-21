import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'


export default class AddCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: void 0
        }
    };

}
