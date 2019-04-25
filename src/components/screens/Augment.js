import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

class Augment extends Component {
  login(){
    this.props.navigation.navigate('main');
    //Navigate to main App
  }

  render(){
    return(
      <TouchableOpacity style={{height: 100 + "%",
       width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}
        onPress={()=>{this.login();}}
        >
        <Text>AR PAGE</Text>
      </TouchableOpacity>
    );
  }
}

export default Augment;
