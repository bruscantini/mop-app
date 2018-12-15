import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapView } from 'expo';
import { Formik, Field } from 'formik';
import { database } from 'firebase';
import { connect } from 'react-redux';
import { setAuthentication, setAddress } from '../redux/reducer';
import FKTextInput from '../forms/FKTextInput';
import { PLACES_API_KEY } from '../Api';
import colors from '../utils/colors';

// we could eventually make this based on users last known location?
const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const validate = ({ nickName }) => {
  const errors = {};
  if (nickName === undefined) {
    errors.nickName = 'Required';
  } else if (nickName.trim() === '') {
    errors.nickName = 'Must not be blank';
  }
};

const NewAddressForm = (props) => (
  <Formik
    onSubmit={props.onSubmit}
    validate={validate}
    render={({
      handleSubmit,
      isValid,
    }) => (
      <View>
        <Text style={styles.heading}>Nickname</Text>
        <Field
          component={FKTextInput}
          name='nickName'
          placeholder='e.g. Home'
        />
        <Button
          title="Save"
          disabled={!isValid}
          onPress={handleSubmit}
        />
      </View>
    )}
  />
);

class NewAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Address'
  }
  state = {
    region: initialRegion
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onSubmit({ nickName }) {
    const addresssDescription = this.state.address.description;
    const userId = this.props.state.authentication.userId;

    database().ref('users/' + userId).set({
      address: {
        description: addresssDescription,
        nickName
      }
    });
    this.props.setAddress(nickName, addresssDescription);
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
          onRegionChangeComplete={() => {}}
        />
        <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 20 }}>
          {this.state.address ?
            <NewAddressForm onSubmit={(props) => (this.onSubmit(props))} /> : null}
        </View>
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

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    margin: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAddressScreen);
