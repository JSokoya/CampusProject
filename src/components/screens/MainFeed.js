import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import config from '../../config';
import { PostFeed } from '../container/index.js';

import Firebase from '../../config/Firebase';

import { connect } from 'react-redux';

//Action
import {
  saveImages,
  setCurrentUser,
  saveAllUsers,
  increaseImageIndex
} from '../../../actions/user';

class InstaClone extends Component {
  render() {
    return (
      <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
        <View style={styles.tempNav}>
          <Text> Campus </Text>
        </View>
        <PostFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tempNav: {
    width: 100 + '%',
    height: 70,
    marginTop: 30,
    backgroundColor: 'rgb(245,245,245)',
    borderBottomColor: 'rgb(233,233,233)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center'
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
  increaseImageIndex: index => dispatch(increaseImageIndex(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstaClone);
