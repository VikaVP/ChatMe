import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firebase from '../config/config';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Vika',
      email: 'gjh@jjj.com',
      profile_picture: 'gsgfjh.png',
    };
  }
  componentDidMount() {
    const {name, email, profile_picture} = this.state;
    firebase
      .database()
      .ref('user')
      .push({
        username: name,
        email: email,
        profile_picture: profile_picture,
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: -6.226407,
            longitude: 106.852069,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: -6.226407,
              longitude: 106.852069,
            }}
            title="Arkademy"
            description="ya"
          />
        </MapView>
      </View>
    );
  }
}
