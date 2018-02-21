import React, { Component } from 'react';
import {Link} from 'react-router';
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Map from './Map.js';



import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'


class Activity extends React.Component {

    render() {
        return (
            <div className='activityClass'>
                <img src={this.props.activity.picture} height="200" width="auto" />
                <p>{this.props.activity.name}</p>
            </div>
        )
    }
};


export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: void 0
        }
    };


    loadData() {

        fetch('/city/' + this.props.params.id)             // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({city: data}))     // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!

    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let city = this.state.city;
        if (city == undefined) {
            return (<div>Loading data from DB</div>)
        } else {

            return (
                <div className='city'>
                    <p>{this.state.city.name}</p>
                    <img src={this.state.city.picture}/>
                    <p>Description: {this.state.city.description}</p>
                    <p>Element _Id: {this.state.city._id}</p>
                    <div className='map'>
                        <ul>
                      <Map></Map>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <h1>Places</h1>
                            {this.state.city.activities.filter(a => a.nature=='place').map((a,i) => <Activity activity={a}/> )}
                        </div>
                        <div>
                        <h1>Events</h1>
                        {this.state.city.activities.filter(a => a.nature=='event').map((a,i) => <Activity activity={a}/>)}
                        </div>
                    </div>
                </div>
            )

        }
    }
}