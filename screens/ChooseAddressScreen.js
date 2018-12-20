import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CardViewWithIcon } from 'react-native-simple-card-view';
import * as firebase from 'firebase';
import 'firebase/firestore';
import colors from '../utils/colors';

const miniCardStyle = { shadowColor: '#000000', shadowOffsetWidth: 2, shadowOffsetHeight: 2, shadowOpacity: 0.1, shadowRadius: 5, backgroundColor: '#ffffff', padding: 5, margin: 5, borderRadius: 3, elevation: 3, width: (Dimensions.get('window').width * (3 / 4)) - 10 };

class ChooseAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Address'
  }

  state = {
    addresses: [],
  }

  componentDidMount() {
    const db = firebase.firestore();
    const displayName = this.props.state.authentication.user.displayName;
    const userId = this.props.state.authentication.user.uid;
    const collectionRef = db.collection(`users/${userId}/addresses`);
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
        const addresses = [];
        querySnapshot.forEach((doc) => {
            addresses.push({ key: doc.id, ...doc.data() });
        });
        console.log(`Current addresses for: ${displayName}\n`,
          addresses.map((addy) => (JSON.stringify(addy))).join(', '));
        this.setState({ addresses });
    });
    this.dbListenerUnsubscribe = unsubscribe;
  }

  componentWillUnmount() {
    this.dbListenerUnsubscribe();
  }

  onAddButtonPress = () => {
    this.props.navigation.navigate('NewAddress');
  }

  // reference to firestore listener unsubscribe
  dbListenerUnsubscribe = null

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>
        {this.state.addresses.map((addy) => {
          const { key, nickname, description } = addy;
          return (
            <View style={{ alignItems: 'center', flexWrap: 'wrap', paddingBottom: 10 }} key={key}>
              <CardViewWithIcon
                withBackground={false}
                androidIcon={'ios-home'}
                iosIcon={'ios-home'}
                iconHeight={25}
                iconColor={'#333'}
                title={nickname}
                contentFontSize={16}
                titleFontSize={12}
                style={miniCardStyle}
                content={description}
                onPress={() => {}}
              />
            </View>
          );
        })}
        <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            backgroundColor: colors.white,
            borderRadius: 50,
            borderColor: colors.black,
            borderWidth: 1,
          }}
          onPress={this.onAddButtonPress}
        >
          <AntDesign name={'pluscircle'} size={99} color={colors.purple} />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(ChooseAddressScreen);
