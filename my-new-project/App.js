import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Button, TextInput} from 'react-native';
//if i need api key: AIzaSyBVU_d985mj7MmTfP2Qe-H7oT1MIQ2ja78
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

export default class App extends React.Component { 

  constructor(props){
    super(props);
    this.state = {lat : 62.007864, lon : -6.790981699999975}

  }
  


  componentDidMount(){
    navigator.geolocation.getCurrentPosition((successfully, error)=>{
    this.setState({
      lat: parseFloat(successfully.coords.latitude), lon: parseFloat(successfully.coords.longitude)});
    })
  }

  render() {
    console.log(this.state)
    return (
      <View>
      <MapView style={styles.container}
      region={{
        latitude: this.state.lat,
        longitude: this.state.lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
 <Marker
      coordinate={{latitude: this.state.lat, longitude: this.state.lon}}
      title="you"
      description="this is your position"
    />
    </MapView>
    <Form type={User} /> {/* Notice the addition of the Form component */}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: 400,
    height: 400
  },
});
