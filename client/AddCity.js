import React from 'react';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';


export default class Addm extends React.Component {
    constructor(props) {
        super(props);

    }
    loadData() {
        fetch('/cities')                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({cities: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
    }
    addCity(e){
e.pre
        const name = this.state.name;
        const lat = this.state.lat;
        const long = this.state.long;

        fetch('/cities/addcity', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, long, lat})
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
        this.setState({lat: e.value});
    }

    handleLongChange(e) {
        this.setState({long: e.value});
    }

    componentDidMount() {
        this.loadData();
    }




    render(){
        return (
            <form onSubmit={(e) => this.addCity(e)} method="post">
                <label>CityName:</label>
                <input type="text" name="name"  value={this.state.name}onChange={(e) => {
                    this.handleNameChange(e)
                }} id="city_name"/><br/>
                <label>long:</label>
                <input type="text" name="long"  value={this.state.long}  onChange={(e) => {
                    this.handleLongChange()
                }} id="city_longitude"/><br/>
                <label>citylat:</label>
                <input type="text" name="lat"  value={this.state.lat} onChange={(e) => {
                    this.handleLatChange()
                }}id="city_latitude"/><br/>

                <input type="submit" value="addCity"/>
            </form>
        )
    }

}

