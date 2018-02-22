import React from 'react';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">

                <img src="images/figures/logo-grey.png"/>
                <small>COPYRIGHT ReactUS 2018</small>

            </footer>
        )
    }
};

export default Footer;