import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Modal from './Modal.js';
import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'
import City from "./City";

class Comment extends React.Component {
    render(){
        const d = new Date(this.props.comm.date);
        const today = new Date();
        return(
            <div className='comment'>
                <p>{this.props.comm.user.email}</p>
                <p>{this.props.comm.text}</p>
                <p>{d.getFullYear()}, {d.getMonth()+1}, {d.getDate() }</p>
            </div>
        )
    }
}

class Picture extends React.Component {
    render(){
        return(
            <div className='picture'>
                <img src= {this.props.picture} width="150px" height="150px"/>
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
                <label htmlFor="long">Email</label>
                <input id="email" name="email" type="email" />
                <textarea id="text" name="text" />
                <button>Share</button>
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
        else {
            return (
                <div className='activity'>
                    {this.state.activity.picture.map((a,i) => <Picture picture={a}/> )}
                    <p>{this.state.activity.name}</p>
                    <p>{this.state.activity.description}</p>
                    <p><a id="open" onClick={(e)=>this.toggle(e)}><button>Add your comment</button></a></p>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                        <ActivFrom type="activities" parent={this.state.activity._id}/>
                    </Modal>
                    {this.state.activity.comments.map((a,i) => <Comment comm={a}/> )}

                </div>
            )
        }
    }
}

