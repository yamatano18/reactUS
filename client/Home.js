import React from 'react';
import {Link} from 'react-router';
import Container from './Container.js';
import Footer from './Footer.js';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';

class CityLaconic extends React.Component {
    render() {
        return (
            <div className='card'>
                <img src={this.props.cities.picture}/>
                <Link to={`/city/${this.props.cities._id}`} activeClassName="active">{this.props.cities.name}</Link>
            </div>
        )
    }
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            events: [{
                _id : 1,
                name: 'Le festival de BD',
                picture: '/images/Aix/festival1.jpg'
            },
                {
                _id : 1,
                name: 'Le festival de canne',
                picture: '/images/Aix/festival2.jpg'
            }]
        }

    };

    loadData() {
        fetch('/cities')                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({cities: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
    }

        addCity(e) {
        e.preventDefault();
        const cityName = this.state.name;
        const cityLatitude = this.state.lat;
        const cityLongitude = this.state.long;
        const countryName = this.state.country;

        fetch('/cities/addCity', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cityName, cityLatitude, cityLongitude, countryName})
        }).then(res => {
            if (res.ok) {
                res.json().then(id => console.log("City added with id " + id));
                this.loadData();
            }
            else
                res.json().then(err => alert("Failed to add city: " + err.message));
        }).catch(err => alert("Error in sending data to server: " + err.message));

        this.setState({name: "", lat: null, long: null});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleLatChange(e) {
        this.setState({lat: e.target.value});
    }

    handleLongChange(e) {
        this.setState({long: e.target.value});
    }

    handleCountryChange(e) {
        this.setState({country: e.target.value});
    }

    componentDidMount() {
        this.loadData();
    }

    // render() {
    //     const mappedCities = this.state.cities.map(p => <CityLaconic cities={p}/>)
    //     return (
    //         <div>
    //             <h1>My Cities... </h1>
    //             <p>You can find in this website many cities with beautiful places, events (festivals, concerts and so on).
    //                Please, join us, and you will have the possibilities to participate to this new social network.
    //                <br/>
    //                Enjoy!!
    //             </p>
    //             {mappedCities}
    //         </div>
    //     );
    // }

    render() {
        const mappedCities = this.state.cities.map(p => <BestPlace cities={p}/>)
        return (
            <div>

                <Header title="WORDLWIDE"/>

                <Container nameClass="city" subTitle="The place to be in the" colorTitle="world">

                    {mappedCities}

                    <div className="col-md-12 boutton-violet">
                        <button>Add your city</button>
                    </div>

                </Container>

                <CityForm/>

                <Container nameClass="best-event" subTitle="Best event in the" colorTitle="world">

                    {this.state.events.map((e,i) => <BestEvent key={i} event={e} />)}

                    <div className="col-md-12 boutton-violet">
                        <button>See more</button>
                    </div>

                </Container>

                <Container nameClass="howitwork" colorTitle="How it works ?">

                    <HowItWorks
                        iconSrc="images/figures/earth.png"
                        stepName="1. Choose a city"
                        stepDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />

                    <HowItWorks
                        iconSrc="images/figures/directions.png"
                        stepName="2. Choose your activity"
                        stepDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />

                    <HowItWorks
                        iconSrc="images/figures/fly-icon.png"
                        stepName="3. Take the road !"
                        stepDesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />

                </Container>

                <Container nameClass="feedbackSection" colorTitle="Feedback">

                    <FeedBack
                        name="Martin.M"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />

                    <FeedBack
                        name="Martin.M"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />

                    <FeedBack
                        name="Martin.M"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                    />

                </Container>

                <Footer/>

            </div>
        );
    }
};

class Header extends React.Component {
    render() {

        var bgHeader = {
            backgroundImage : "url('images/figures/background.jpg')"
        }

        return(

            <header className="header" style={ bgHeader }>

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

                        <a href="/" className="active">Home</a>
                        <a href="#">City</a>
                        <a href="#">About</a>
                        <a href="#"><i className="fa fa-user"> </i>&#32;Login</a>

                    </nav>

                </section>

                <div className="container">

                    <strong>DISCOVER THE WORLD WITH {this.props.title}</strong>

                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </small>

                    <button>SEE CITIES</button>

                </div>

            </header>

        )
    }
};

class BestPlace extends React.Component{
    render(){

        var stylebg = {
            backgroundImage : "url("+this.props.cities.picture+")"
        }


        return(
            <div className="col-md-4">
                <div className="card">
                    <Link to={`/city/${this.props.cities._id}`}>
                    <div className="card-img-top" style={ stylebg }>
                    </div>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title"><strong>{this.props.cities.name}</strong></h5>
                        <p className="card-text">{this.props.cities.description}</p>
                        <ul>
                            <li><i className="fa fa-heart"> </i>&#32;{this.props.cities.likers}</li>
                            <li><i className="fa fa-comment"> </i>&#32;{this.props.commentNb}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

class BestEvent extends React.Component{
    render(){

        var stylebg = {
            backgroundImage : "url("+this.props.event.picture+")"
        }

        return(
            <div className="col-md-12 best-event_content" style={stylebg}>

                <strong>{this.props.event.name}</strong>

                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small>

            </div>
        )
    }
};

class HowItWorks extends React.Component{
    render(){
        return(
            <div className="col-md-4">

                <img src={this.props.iconSrc} alt="logo" />
                <h6 className="howSubTitle">Step {this.props.stepName}</h6>
                <p>{this.props.stepDesc}</p>

            </div>
        )
    }
};

class FeedBack extends React.Component{
    render(){
        return(
            <div className="col-md-4 ">

                <div className="carte">

                    <img src="images/figures/default.jpg" alt="logo" />
                    <h6 className="feedbackTitle">{this.props.name}</h6>
                    <p>{this.props.description}</p>


                </div>

            </div>
        )
    }
};


class CityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const city = {
            name: data.get('name'),
            coordinates: {
                long: data.get('long'),
                lat: data.get('lat')
            },
            activities:[],
            picture:this.state.picture,
            description:data.get('description')
        }
        console.log(city);
        fetch('/api/cities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ("json", JSON.stringify( city )),
        }).then(data => alert("Sucess"))
            .catch(error => console.error(error));

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">City name</label>
                <input id="name" name="name" type="text" />

                <label htmlFor="long">Longitude</label>
                <input id="long" name="long" type="text" />

                <label htmlFor="lat">Latitude</label>
                <input id="lat" name="lat" type="text" />

                <textarea id="description" name="description" />
                <ImagesUploader
                    url={"http://localhost:9090/images"}
                    optimisticPreviews={true}
                    multiple={false}
                    onLoadEnd={(err, result) =>{
                        if (err)
                            console.error(err);
                        else
                            this.setState({picture: result})
                    }}
                    label="Attach image"/>
                <button>Add city</button>
            </form>
        );
    }
}