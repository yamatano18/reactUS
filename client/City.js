import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'


export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [undefined]
        }
    };

    loadData() {

        fetch('/city/' + this.props.params.id)                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({city: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!

    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let city = this.state.city;
        if (city == undefined) {
            return (<div>loading</div>)
        } else {
            return (
                <div className='city'>
                    <img src={this.state.city.picture}/>
                </div>

            )
        }
    }
}