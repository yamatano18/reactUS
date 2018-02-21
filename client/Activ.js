import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Modal from './Modal.js';
import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'


class Comment extends React.Component{
    render(){
        const d = new Date(this.props.comm.date);
        const today = new Date();
        return(
            <div className='comment'>
                <p>{this.props.comm.text}</p>
                <p>{d.getFullYear()}, {d.getMonth()+1}, {d.getDate() }</p>
            </div>
        )
    }
}

class Picture extends React.Component{
    render(){
        return(
            <div className='picture'>
                <img src= {this.props.picture} width="150px" height="150px"/>
            </div>
        )
    }
}

export default class Activ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: void 0,
            isOpen:false

        };
        this.toggle=this.toggle.bind(this);
    };

    loadData() {

        fetch('/activity/'+this.props.params.id)                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({activity: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!

    }

    componentDidMount() {
        this.loadData();
    }

    toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    addComment(){
        this.setState({isOpen: !this.state.isOpen});

    }


    render() {
        let activity = this.state.activity;
        if(activity == undefined){
            return ( <div>loading</div>)
        }
        else {
            return (
                <div className='activity'>
                    {this.state.activity.pictures.map((a,i) => <Picture picture={a}/> )}
                    <p>{this.state.activity.name}</p>
                    <p>{this.state.activity.description}</p>
                    <p><a id="open" onClick={(e)=>this.toggle(e)}><button>Add your comment</button></a></p>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                        <form onSubmit={(e) => this.addCity(e)}>
                        <input type="text" name="name" placeholder="Your name"/><br/>
                        <input type="text" name="description" placeholder="Your comment"/><br/>
                        <submit>Send comment!</submit>
                        </form>
                    </Modal>
                    {this.state.activity.comments.map((a,i) => <Comment comm={a}/> )}

                </div>

            )
        }
    }
}
