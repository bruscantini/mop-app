import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapView } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setAuthentication, setAddress } from '../redux/reducer';
import { PLACES_API_KEY } from '../Api';
import colors from '../utils/colors';
import NewAddressForm from '../forms/NewAddressForm';

// we could eventually make this based on users last known location?
const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class NewAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Address'
  }
  state = {
    region: initialRegion
  }

  onSubmit = ({ nickname }) => {
    const description = this.state.address.description;
    const userId = this.props.state.authentication.user.uid;
    // we have to add it to a list of addresses.
    // make a list of addresses.
    const db = firebase.firestore();
    console.log('saving address for userId: ', userId);
    db.collection(`users/${userId}/addresses`).add({
      nickname, description
    }).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
        console.error('Error adding document: ', error);
    });
    this.props.setAddress(nickname, description);
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
        />
        <KeyboardAwareScrollView enableOnAndroid scrollEnabled>
          <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 20 }}>
            {this.state.address ?
              <NewAddressForm onSubmit={this.onSubmit} /> : null}
          </View>
        </KeyboardAwareScrollView >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 5,
            right: 5
          }}
        >
          <GooglePlacesAutocomplete
            placeholder='Address'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed='false'    // true/false/undefined
            renderDescription={row => row.description} // custom description render
            fetchDetails
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log('data: ', data, 'details', details);
              const { geometry: { viewport, location } } = details;
              const region = {
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: Number(viewport.northeast.lat) - Number(viewport.southwest.lat),
                longitudeDelta: Number(viewport.northeast.lng) - Number(viewport.southwest.lng)
              };
              this.setState({ region, address: data });
            }}
            textInputProps={{
              onSubmitEditing: (data) => { console.log('this doesnt work: ', data); }
            }}
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: PLACES_API_KEY,
              language: 'en', // language of the results
              types: 'address'
            }}
            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              listView: {
                backgroundColor: colors.white
              }
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={500}
            renderLeftButton={() => {}}
            renderRightButton={() => {}}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = {
  setAuthentication,
  setAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAddressScreen);
