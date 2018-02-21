import React from 'react';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';


export default class AddCity extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input type="text" name="name" placeholder="name"/>
                <input type="text" name="description" placeholder="description"/>
                <input type="text" name="latitude" placeholder="latitude"/>
                <input type="text" name="longitude" placeholder="longitude"/>
            </div>
        )
    }

};