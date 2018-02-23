import React from 'react';
import {Link} from 'react-router';
import Container from './Container.js';
import Footer from './Footer.js';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Modal from './Modal.js';
import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'
import City from "./City";

class Comment extends React.Component {
    render(){
        var bar = {
            borderTop : "2px solid grey",
            padding: "30px 0"
        }
        const d = new Date(this.props.comm.date);
        const today = new Date();
        return(
            <div className='comment col-md-12' style={bar}>
                <div className="col-md-12 title-comment">
                <p>{this.props.comm.user.email}</p>
                </div>

                <div className="col-md-12 comment">
                <p>{this.props.comm.text}</p>
                </div>

                <div className="col-md-12 date-comment">
                <p>{d.getFullYear()}, {d.getMonth()+1}, {d.getDate() }</p>
                </div>
            </div>
        )
    }
}

class ActivFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const comment = {
            email: data.get('email'),
            userId: '5a8ab436726aea287ca8280b',
            text:data.get('text'),
            type: this.props.type,
            parentId: this.props.parent
        }

        fetch('/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: ("json", JSON.stringify(comment)),
        }).then(data => alert("Success"))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group" >
                <label htmlFor="name">Name</label>
                <input id="email" className="form-control" name="email" type="text" placeholder="Enter your name" required="required"/>

                <label htmlFor="name">Comment</label>
                <input id="text" className="form-control" name="text" type="text" placeholder="Enter your comment" required="required"/>

                <div className="boutton-violet">
                <button>Comment</button>
                </div>
            </div>
            </form>
        );
    }
}


export default class Activ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: void 0,
            city: void 0,
            isOpen:false

        };
        this.toggle=this.toggle.bind(this);
    };

    loadData() {

        fetch('/activity/' + this.props.params.id)                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({activity: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
    }

    componentDidMount() {
        this.loadData();
        return fetch('/city/' + this.props.params.id)                        // Ask the route /cities to the server
            .then(res => res.json())                                       // Retrieve the objects  in json
            .then(data => this.setState({isLoading: false, city: data}))   // Modify the state accordingly
            .catch(err => console.log(err));
        }

    toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        let activity = this.state.activity;
        if(activity == undefined){
            return ( <dv>loading data from DBase</dv>)
        }
        else {var bgHeader = {
            backgroundImage: "url(" + this.state.activity.pictures[0] + ")"
        };
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
                                <a href="#"><i className="fa fa-user"> </i>&#32;Login</a>

                            </nav>

                        </section>

                        <div className="container">

                            <strong>{this.state.activity.name}</strong>

                            <button  onClick={() => scrollToComponent(this.sectionAct, { offset: 0, align: 'top', duration: 1500})}>SEE MORE</button>

                        </div>

                    </header>

                    <section ref={(section) => { this.sectionAbout = section; }}>

                        <Container nameClass="city" colorTitle={this.state.activity.name}>

                            <p className='para col-md-12'>{this.state.activity.description}</p>

                        </Container>

                        <Container colorTitle="Comment">

                            {this.state.activity.comments.map((a,i) => <Comment comm={a}/> )}

                        </Container>

                    <p className="boutton-violet"><a id="open" onClick={(e)=>this.toggle(e)}><button>Add your comment</button></a></p>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                        <ActivFrom type="activities" parent={this.state.activity._id}/>
                    </Modal>

                    </section>

                    <Footer/>

                </div>
            )
        }
    }
}

