import React from'react';
import{StyleSheet,Text,View} from 'react-native';
import Mapview from 'react-native-maps';

export default class App extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <MapView style={styles.map}
                         region={{latitude:59,
                         longitude:18,
                         latitudeDelta:0.1,
                         longitudeDelta:0.1}}
                         >
                </MapView>
            </View>

        );


    }

}
const style=StyleSheet.create({container: {
        position: 'absolute',
        top: 0,
        left: 0

    },
    map:{position: 'absolute',
        top: 0,
        left: 0}
});