import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import config from '../../config';
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../../config/Firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';

//Action
import {
  saveImages,
  setCurrentUser,
  saveAllUsers,
  increaseImageIndex,
  newsFeed
} from '../../../actions/user';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: this.props.navigation.state.params.user
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.listener = Firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.props.setCurrentUser(authUser)
        : this.props.setCurrentUser(null);
      console.log('called to check the state of user', authUser);
    });

    Firebase.database.ref('users').on('value', snapshot => {
      this.props.saveAllUsers(snapshot.val());
      this.setState({
        // users: snapshot.val()
        loading: false
      });
      console.log('called to check all the snapshots....', snapshot.val());

      // let userKeys = Object.keys(this.props.allUsers);
      // let userValues = Object.values(this.props.allUsers);

      // return userKeys.map((k, index) => {
      //   try {
      //     const imageRef = Firebase.storage
      //       .ref('images')
      //       .child(`${k}:` + `${index}`);
      //     console.log('called........', imageRef.getDownloadURL());
      //     let url = imageRef.getDownloadURL();
      //     let object = { username: userValues[0].username, imageUrl: url };
      //     this.props.newsFeed(object);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // });
    });

    // Firebase.storage.ref('images').on('value', snapshot => {
    //   // this.props.saveAllUsers(snapshot.val());
    //   this.setState({
    //     users: snapshot.val()
    //     // loading: false
    //   });
    //   console.log('called to check all the snapshots....', snapshot.val());
    // });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          {!this.state.loading ? (
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Loading.... </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  takePicture = async function() {
    this.setState({ loading: true });
    const { user, index } = this.props;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log('called......', data);
      const mime = 'application/octet-stream';
      return new Promise((resolve, reject) => {
        const uploadUri =
          Platform.OS === 'ios' ? data.uri.replace('file://', '') : data.uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = Firebase.storage
          .ref('images')
          .child(`${user.uid}:` + `${index}`);

        fs.readFile(uploadUri, 'base64')
          .then(data => {
            return Blob.build(data, { type: `${mime};BASE64` });
          })
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, { contentType: mime });
          })
          .then(async () => {
            uploadBlob.close();
            await this.props.saveImages(imageRef.getDownloadURL());
            await this.props.increaseImageIndex(index + 1);
            await AsyncStorage.setItem('userImages', JSON.stringify({images: this.props.images}));
            console.log('called.....', imageRef.getDownloadURL());
          })
          .then(url => {
            resolve(url);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    this.setState({ loading: false });
  };
  //Guess you'll have to reset again. I have something else to show you as well! Of course
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

const mapStateToProps = ({ user }) => {
  return {
    images: user.images,
    user: user.currentUser,
    allUsers: user.users,
    index: user.index
  };
};

const mapDispatchToProps = dispatch => ({
  saveImages: value => dispatch(saveImages(value)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  saveAllUsers: users => dispatch(saveAllUsers(users)),
  increaseImageIndex: index => dispatch(increaseImageIndex(index)),
  newsFeed: object => dispatch(newsFeed(object))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera);
