import React from 'react';
import Container from './Container.js';
import Footer from './Footer.js';
import {Link} from 'react-router';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Map from './Map.js';
import Modal from './Modal.js';
import scrollToComponent from 'react-scroll-to-component';

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
                        <p className="card-text">{this.props.activity.description}</p>
                    </div>
                </div>
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
            let c = {lat : parseFloat(this.state.city.coordinates.lat), lng: parseFloat(this.state.city.coordinates.long)};

            let marginbotom = {
                marginBottom : 40
            }
            return (

                <div>
                    <header className="header" style={bgHeader}>

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
                                <a href="#"><i className="fa fa-user"> </i>&#32;Login</a>

                            </nav>

                        </section>

                        <div className="container">

                            <strong>{this.state.city.name}</strong>

                            <small>{this.state.city.description}</small>

                            <button  onClick={() => scrollToComponent(this.sectionPlaces, { offset: 0, align: 'top', duration: 1500})}>SEE MORE</button>

                        </div>

                    </header>

                    <div>
                        <div>

                            <section ref={(section) => { this.sectionPlaces = section; }}>

                                <Container nameClass="city" subTitle="Best places in" colorTitle={this.state.city.name}>

                                    {this.state.city.activities.filter(a => a.nature == 'place').map((a, i) => <Place
                                        activity={a}/>)}

                                </Container>

                            </section>


                            <Container nameClass="city" subTitle="Best event in" colorTitle={this.state.city.name}>

                                {this.state.city.activities.filter(a => a.nature == 'event').map((a, i) => <Place
                                    activity={a}/>)}

                            </Container>

                            <Container colorTitle="Localisation" logo="images/figures/map.png">

                                <Map center={c}/>

                            </Container>

                            <Modal title="First Modal" isOpen={this.state.isOpen} toggle={this.toggle}>
                                <ActivityForm cityId={this.state.city._id}/>
                            </Modal>

                        </div>
                    </div>

                    <div className="col-md-12 boutton-violet" style={marginbotom}>
                        <button onClick={(e) => this.toggle(e)} className=""
                                data-toggle="modal" data-target="#myModal">
                            ADD YOUR ACTIVITY
                        </button>
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
        });

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