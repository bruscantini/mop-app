import React from 'react';
import { Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AntDesign } from '@expo/vector-icons';
import { PLACES_API_KEY } from '../Api';

export default class NewAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Address'
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>Add a new address!</Text>
        <GooglePlacesAutocomplete
          placeholder='Address'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
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
            }
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => {}}
          renderRightButton={() => {}}
        />
      </View>
    );
  }
}
