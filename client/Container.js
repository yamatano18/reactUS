import React from 'react';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class Container extends React.Component {
    render(){
        return(
            <section className={this.props.nameClass}>

                <div className="container">

                    <h2>{this.props.subTitle}<mark>{this.props.colorTitle}</mark></h2>

                    <div className="row">

                        {this.props.children}

                    </div>

                </div>

            </section>
        )
    }
};

export default Container;