import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}) => <div>{text}</div>;

export default class Map extends Component {

    constructor(props) {
        super();
        this.state = {
            markers: [{
                position: {
                    lat: 25,
                    lng: 121,
                }
            }]
        }
    }

    render() {
        const style = {
            width: '10%',
            height: '10%'
        };

        return (
                <div style={{height: 400, width: 500}}>
                    <GoogleMapReact styles={{height: 10, width: 10}}
                                    bootstrapURLKeys={{key: ['AIzaSyAVo0Woy8NwYN07-8Zpz5cq2tVzi4WPtEI']}}
                                    defaultCenter={this.props.center}
                                    defaultZoom={this.props.zoom}>
                    </GoogleMapReact>

                </div>

        );
    }
}

Map.defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 10,
 };
