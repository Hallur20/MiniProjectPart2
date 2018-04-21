import React from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
      };

    constructor(props) {
        super(props);
        this.state = {userName: "", passWord: "", distance: 0, lat: 62.007864, lon: -6.790981699999975 }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((successfully, error) => {
            this.setState({
                lat: parseFloat(successfully.coords.latitude), lon: parseFloat(successfully.coords.longitude)
            });
        })
    }

    returnTrue = () =>{
        //plan is to send mobile data to react somehow... fetch maybe?, and then with express use the addlocationwithphone method.
        var sendThis = {uname: this.state.userName,
        password: this.state.passWord,
        radius: this.state.radius,
        lat: this.state.lat,
        lon: this.state.lon
        }
        var data = new FormData();
        data.append("json", JSON.stringify( sendThis ));
        fetch('http://301c7655.ngrok.io/phoneLogin',{
            method: "POST",
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
            body: data
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            JSON.stringify( data )
        })

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: this.state.lat, longitude: this.state.lon }}
                        title="you"
                        description="this is your position"
                    />
                </MapView>

                <TextInput
                placeholder="enter username"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(username) => this.setState({userName: username})}
                    value={this.state.userName}
                />
                <TextInput
                placeholder="enter password"
                onChangeText={(password) => this.setState({passWord: password})}
                value={this.state.passWord}
                />
                <TextInput
                placeholder="enter maximum km"
                keyboardType = 'numeric'
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(radius) => this.setState({radius: radius})}
                    value={this.state.radius}
                />
                <Button onPress={()=>
                    
                    {
                        var bool = this.returnTrue();
                        if(bool === true){
                        navigate('Profile')
                    }
                    }} title="change scene"/>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    map: {
        flex: 2
    },
    container: {
        flex: 1
    }
});