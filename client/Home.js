import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';


class CityLaconic extends React.Component {
    handleClick(){
        console.log("test one two three four");
    }
    render() {
        return(
            <div className="card">
                <div className="container" o>
                    <a onClick={this.handleClick.bind(this)}>
                        <h4><b>{this.props.name}</b></h4>
                        <img src={this.props.picture} alt=""/>
                    </a>
                </div>
            </div>
        );
    }
};

class Activities extends React.Component {
    render() {
        return(
            <div className="card">
                <div className="container" o>
                    <a onClick={this.handleClick.bind(this)}>
                        <h4><b>{this.props.name}</b></h4>
                        <img src={this.props.picture} alt=""/>
                    </a>
                </div>
            </div>
        );
    }
};

class City extends React.Component {
    render() {
        return(
            <div className="card">
                <div className="container">
                    <h4><b>{this.props.name}</b></h4>
                </div>
            </div>
        );
    }
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cities: []};
    }

    loadData() {
        fetch('/api/cities')                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({cities: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        if (this.state.cities.length == 0) {
            return <div>"not loaded yet"</div>;
        }
        else {
            return (
                <div>
                    <h1>My Cities... The places to be!</h1>
                    <p> You can find in this website many cities with beautiful places, events (festivals, concerts and
                        so on).
                        Please, join us, and you will have the possibilities to participate to this new social
                        network. <br/>
                        Enjoy!!
                    </p>
                    {this.state.cities.map(ct =>
                        <CityLaconic key={ct._id} name={ct.name} picture={ct.picture} coordinates="{ct.coordinates}"
                                     description="{ct.description}" activities="{ct.activities}"></CityLaconic>
                    )
                    }
                </div>
            );
        }
    }
}


