import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapView } from 'expo';
import { PLACES_API_KEY } from '../Api';

export default class NewAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Address'
  }
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  onRegionChange(region) {
    this.setState({ region });
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
              this.setState({ region });
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
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
              listView: {
                backgroundColor: 'rgba(255,255,255,1)'
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
