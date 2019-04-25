import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Firebase config file
import Firebase from '../../config/Firebase';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  setValue(key, value) {
    this.setState({ [key]: value });
  }

  async register() {
    const email = this.state.email.toLowerCase();

    const { password, firstName, lastName } = this.state;
    console.log('called.........', email, password);
    try {
      await Firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          return Firebase.database.ref(`users/${authUser.user.uid}`).set({
            username: firstName + ' ' + lastName,
            email
          });
        })
        .then(async authUser => {
          await AsyncStorage.setItem('signedIn', 'true');
          console.log('called to check the authUser', authUser);
          this.props.navigation.navigate('camera');
          // this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          console.log('called to check the error', error);
        });
    } catch (error) {
      console.log('called.....', error);
    }

    // doSignInWithEmailAndPassword = (email, password) =>
    //   this.auth.signInWithEmailAndPassword(email, password);

    // doSignOut = () => this.auth.signOut();
  }

  render() {
    const isInvalid =
      this.state.password === '' ||
      this.state.email === '' ||
      this.state.firstName === '' ||
      this.state.lastName === '';

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
        <Text>REGISTER PAGE</Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={value => {
            this.setValue('firstName', value);
          }}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={value => {
            this.setValue('lastName', value);
          }}
        />
        <TextInput
          value={this.state.email}
          onChangeText={value => {
            this.setValue('email', value);
          }}
          autoCorrect={false}
          placeholder="Email Address"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={value => {
            this.setValue('password', value);
          }}
          secureTextEntry
          placeholder="Password"
          autoCorrect={false}
          style={styles.input}
        />
        <Button
          disabled={isInvalid}
          onPress={() => {
            this.register();
          }}
          title="Signup"
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

export default Register;
