import React, {PropTypes,Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {greatPlaceStyle} from './mapstyle.js';

class Marker extends React.Component {
    constructor(props) {
        super();
    }


    render() {
        return (
            <div style={greatPlaceStyle}>
                {this.props.text}
            </div>
        );
    }
}
export default class Map extends Component {

    constructor(props) {
        super();

    }


    render()
    {
        const style = {
            width: '10%',
            height: '10%'
        };



        const obj ={
            lat:parseFloat(this.props.lat),
            lng:parseFloat(this.props.long)
        }
        const onClickMarker =(<div>this is a marker</div>);
        //console.log(obj);
        return (

            <div style={{height: 400, width: 500}}>
                <GoogleMapReact styles={{height: 10, width: 10}}
                                bootstrapURLKeys={{key: ['AIzaSyAVo0Woy8NwYN07-8Zpz5cq2tVzi4WPtEI']}}
                                defaultCenter={obj}
                                defaultZoom={this.props.zoom}>
                    <Marker lat={this.props.lat} lng={this.props.long} onClick={{onClickMarker}}text={'@'}/>

                </GoogleMapReact>

            </div>

        );
    }
}

Map.defaultProps = {
    center: {lat:111, lng: 30.33},
    zoom: 13,
};
