import React from 'react';
import {Link} from 'react-router';

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
                name: 'Le festival de BD',
                picture: '/images/Aix/festival1.jpg'
            }]
        }

    };

    loadData() {
        fetch('/cities')                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({cities: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
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

                </Container>

                <Container nameClass="best-event" subTitle="Best event in the" colorTitle="world">

                    {this.state.events.map((e,i) => <BestEvent key={i} event={e} />)}

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

            </div>
        );
    }

};

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

class Header extends React.Component {
    render() {
        return(

            <header className="header">

                <img className="fly-bg" src="images/figures/fly-bg.png" alt=""/>

                <section className="pre-header">

                    <strong><img src="images/figures/logo-white.png" alt="logo"/>&#32;{this.props.title}</strong>

                    <nav className="navbar">

                        <a href="#">Home</a>
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
        return(
            <div className="col-md-4">
                <div className="card">
                    <div className="card-img-top" style={this.props.picture}>
                        <Link to={`/city/${this.props.cities._id}`}>
                            <img src={this.props.cities.picture}  />
                        </Link>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"><strong>{this.props.name}</strong></h5>
                        <p className="card-text">{this.props.cities.name}</p>
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

        return(
            <div className="col-md-12 best-event_content">

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