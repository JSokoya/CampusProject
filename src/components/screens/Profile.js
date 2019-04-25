import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';

//Action
import {
  saveImages,
  setCurrentUser,
  saveAllUsers
} from '../../../actions/user';

import Firebase from '../../config/Firebase';

class Profile extends Component {
  componentDidMount() {
    this.listener = Firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.props.setCurrentUser(authUser)
        : this.props.setCurrentUser(null);
    });
  }

  componentDidMount() {
    let storedImages = AsyncStorage.getItem('userImages');
    if (storedImages) {
    //   let userImages = JSON.parse(storedImages).images;
      console.log('called.........', JSON.parse(storedImages)); //Try to run and see if we can get value in console. Okay!
    //
    }
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { images } = this.props;
    return (
      <View
        style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}
      >
        {images &&
          images.map((image, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
              >
                <Image
                  source={{ uri: image['i'] }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>{image['i']}</Text>
              </View>
            );
          })}
        <Button
          title="SIGN OUT"
          onPress={async () => {
            await Firebase.auth.signOut();
            await AsyncStorage.setItem('signedIn', 'false');
            this.props.navigation.navigate('login');
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    images: user.images
  };
};

const mapDispatchToProps = dispatch => ({
  saveImages: value => dispatch(saveImages(value)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  saveAllUsers: users => dispatch(saveAllUsers(users))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
