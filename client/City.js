import React from 'react';
import Container from './Container.js';
import Footer from './Footer.js';
import {Link} from 'react-router';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Map from './Map.js';
import Modal from './Modal.js';

const AnyReactComponent = ({text}) => <div>{text}</div>;


class Place extends React.Component {
    render() {

        var stylebg = {
            backgroundImage: "url(" + this.props.activity.picture + ")"
        }


        return (
            <div className="col-md-4">
                <div className="card">
                    <Link to={`/activity/${this.props.activity._id}`}>
                        <div className="card-img-top" style={stylebg}>
                        </div>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title"><strong>{this.props.activity.name}</strong></h5>
                        <p className="card-text">1</p>
                    </div>
                </div>
            </div>
        )
    }
};

class Activity extends React.Component {

    render() {
        return (
            <div className='activityClass'>
                <img src={this.props.activity.pictures} height="200" width="auto"/>
                <p>{this.props.activity.name}</p>
            </div>
        )
    }
};


export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    };

    toggle(e) {
        this.setState({isOpen: !this.state.isOpen});
    }

    componentDidMount() {
        return fetch('/city/' + this.props.params.id)                        // Ask the route /cities to the server
            .then(res => res.json())                                       // Retrieve the objects  in json
            .then(data => this.setState({isLoading: false, city: data}))   // Modify the state accordingly
            .catch(err => console.log(err));
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

            {
                console.log("jed=" + this.state.city.cityId)
            }
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

                                {this.state.city.activities.filter(a => (a.nature == 'place')).map((a, i) => <Place
                                    activity={a}/>)}

                                <div className="col-md-12 boutton-violet">
                                    <button>Add place</button>
                                </div>

                            </Container>


                            <Container nameClass="city" subTitle="Best event in" colorTitle={this.state.city.name}
                                       logo="images/figures/event.png">

                                {this.state.city.activities.filter(a => a.nature == 'event').map((a, i) => <Place
                                    activity={a}/>)}

                                <div className="col-md-12 boutton-violet">
                                    <button onClick={(e) => this.toggle(e)} className="btn btn-primary btn-lg"
                                            data-toggle="modal" data-target="#myModal">
                                        ADD YOUR ACTIVITY
                                    </button>
                                </div>

                            </Container>
                            <div class="col-md-12 boutton-violet">

                            </div>
                            <Modal title="First Modal" isOpen={this.state.isOpen} toggle={this.toggle}>
                                <ActivityForm cityId={this.state.city._id}/>
                            </Modal>

                            <Container colorTitle="Localisation" logo="images/figures/map.png">

                                <Map lat={this.state.city.coordinates.long}
                                     long={this.state.city.coordinates.lat}></Map>
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
            isLoading: true,
            city: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const activity = {
            cityId: this.props.cityId,
            name: data.get('name'),
            nature: data.get('nature'),
            dateStart: data.get('startDate'),
            dateEnd: data.get('endDate'),
            comments: [],
            picture: this.state.pictures,
            description: data.get('description')
        }
        activity.picture.shift();
        JSON.stringify(<activity className="picture"></activity>);
        console.log(activity);
        fetch('/activities/addactivity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ("json", JSON.stringify(activity)),
        }).then(data => alert("Sucess"))
            .catch(error => console.error(error));

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Activity / Place name</label>
                <input id="name" name="name" type="text"/>

                <textarea id="description" name="description"/>

                <select id="nature" name="nature">
                    <option value="place">Place</option>
                    <option value="event">Event</option>
                </select>
                <input id="startDate" name="startDate" type="date"/>
                <input id="endDate" name="endDate" type="date"/>
                <ImagesUploader
                    url={"http://localhost:9090/images"}
                    optimisticPreviews={true}
                    multiple={true}
                    onLoadEnd={(err, result) => {
                        if (err)
                            console.error(err);
                        else
                            this.setState({pictures: [this.state.pictures, result]})
                    }}
                    label="Put image"/>
                <button>Add activity / place</button>
            </form>
        );
    }
}