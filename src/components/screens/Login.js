import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import config from '../../config';
import Firebase from '../../config/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';

//Action
import { saveImages } from '../../../actions/user';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  async componentWillMount() {
    Firebase.init();

    // const user = await Firebase.auth.currentUser;
    const user = await AsyncStorage.getItem('signedIn');

    if (user === 'true') {
      this.props.navigation.navigate('camera');
    }

    // Firebase.auth.onAuthStateChanged(user => {
    //   this.setState({
    //     authStatusReported: true,
    //     isUserAuthenticated: !!user
    //   });
    //   if (user) {
    //     this.props.navigation.navigate('camera');
    //   }
    // });
  }

  componentDidMount() {
    this.listener = Firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
      console.log('called to check the state of user', authUser);
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  setValue(key, value) {
    this.setState({ [key]: value });
  }

  async login() {
    const email = this.state.email.toLowerCase();

    const { password } = this.state;
    console.log('called.........', email, password);
    try {
      await Firebase.auth.signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('signedIn', 'true');
      this.props.navigation.navigate('camera');
    } catch (error) {
      console.log('called.....', error);
    }

    // doSignOut = () => this.auth.signOut();
  }

  render() {
    const isInvalid = this.state.password === '' || this.state.email === '';

    return (
      <View
        style={{
          height: 100 + '%',
          width: 100 + '%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>LOGIN PAGE</Text>
        <TextInput
          value={this.state.email}
          onChangeText={text => this.setValue('email', text)}
          autoCorrect={false}
          placeholder="Email Address"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={text => this.setValue('password', text)}
          secureTextEntry
          placeholder="Password"
          autoCorrect={false}
          style={styles.input}
        />
        <Button
          disabled={isInvalid}
          onPress={() => {
            this.login();
          }}
          title="Login"
        />
        <Button
          title="Need an Account? Sign Up Here!"
          onPress={() => this.props.navigation.navigate('register')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 70 + '%',
    borderColor: 'gray',
    marginTop: 10,
    borderWidth: 1
  }
});

const mapDispatchToProps = dispatch => ({
  saveImages: value => dispatch(saveImages(value))
});

export default Login;
