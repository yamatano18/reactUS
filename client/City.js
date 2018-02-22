import React, { Component } from 'react';
import Container from './Container.js';
import Footer from './Footer.js';
import {Link} from 'react-router';

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
            var bgHeader = {
                backgroundImage: "url(" + this.state.city.picture + ")"
            };
            let _url = `https://maps.google.com/maps?q=${this.state.city.coordinates.lat},${this.state.city.coordinates.long}&hl=es;z=14&amp;output=embed`;

            const dupa = this.state.city._id;

            console.log("DUAP1" + dupa);
            return (
                <div>
                    <header className="header" style={bgHeader}>

                        <img className="fly-bg" src="images/figures/fly-bg.png" alt=""/>

                        <section className="pre-header">

                            <strong><a href="/"><img src="images/figures/logo-white.png" alt="logo"/>&#32;WorldWide</a></strong>

                            <input id="burger" type="checkbox" className="hamburger"/>

                            <label htmlFor="burger">
                                <span> </span>
                                <span> </span>
                                <span> </span>
                            </label>

                            <nav className="navbar">

                                <a href="/">Home</a>
                                <a href="#" className="active">City</a>
                                <a href="#">About</a>
                                <a href="#"><i className="fa fa-user"> </i>&#32;Login</a>

                            </nav>

                        </section>

                        <div className="container">

                            <strong>{this.state.city.name}</strong>

                            <small>{this.state.city.description}</small>

                            <button>SEE MORE</button>

                        </div>

                    </header>

                    <div>
                        <div>

                            <Container nameClass="city" subTitle="Best places in" colorTitle={this.state.city.name}
                                       logo="images/figures/map.png">

                                {this.state.city.activities.filter(a => a.nature == 'place').map((a, i) => <Place
                                    activity={a}/>)}

                                <div className="col-md-12 boutton-violet">
                                    <button>Add place</button>
                                    <ActivityForm/>
                                </div>

                            </Container>


                            <Container nameClass="city" subTitle="Best event in" colorTitle={this.state.city.name}
                                       logo="images/figures/event.png">

                                {this.state.city.activities.filter(a => a.nature == 'event').map((a, i) => <Place
                                    activity={a}/>)}

                                <div className="col-md-12 boutton-violet">
                                    <button>Add event</button>
                                </div>

                            </Container>

                            <Container colorTitle="Localisation" logo="images/figures/map.png">

                                <Map/>

                            </Container>

                        </div>
                    </div>

                    <Footer/>

                </div>
            )
        }
    }
}

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const activity = {
            cityId: "5a8e8761b632768b101edbfd",
            name: data.get('name'),
            nature: data.get('nature'),
            startDate: data.get('startDate'),
            endDate: data.get('endDate'),
            comments:[],
            pictures:this.state.pictures,
            description:data.get('description')
        }
        console.log(activity);
        fetch('/activities/addactivity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ("json", JSON.stringify( activity )),
        }).then(data => alert("Sucess"))
            .catch(error => console.error(error));

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Activity / Place name</label>
                <input id="name" name="name" type="text" />

                <textarea id="description" name="description" />

                <select id="nature" name="nature">
                    <option value="place">Place</option>
                    <option value="event">Event</option>
                </select>
                <input id="startDate" name="startDate" type="date" />
                <input id="endDate" name="endDate" type="date" />
                <ImagesUploader
                    url={"http://localhost:9090/images"}
                    optimisticPreviews={true}
                    multiple={true}
                    onLoadEnd={(err, result) =>{
                        if (err)
                            console.error(err);
                        else
                            this.setState({pictures:[...this.state.pictures, result]})
                    }}
                    label="Put image"/>
                <button>Add activity / place</button>
            </form>
        );
    }
}