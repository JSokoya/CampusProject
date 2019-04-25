import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from "../../config";

class Post extends Component {

  constructor(){
    super();
    this.state = {
      liked: false,
      screenWidth: Dimensions.get("window").width
    };
  }

  likeToggled(){
    this.setState({
      liked: !this.state.liked
    })
  }
  render(){
    const imageHeight = Math.floor(this.state.screenWidth * 1.1);
    const imageSelection = (this.props.item % 2===0) ? "https://lh3.googleusercontent.com/sZl-o9TGNYXucrPNHesxaMLXajhcPYqw43zojzHJ-y1yYYeQaNtJMrPUQImKgak3paKOMbEm0Av0e5bKG8_z31m1xVGN8J3x-EIAfgeETIhrLxwsw7xWEGstIuwyKYuHjOLFPCcvqIBY944PWFHBhgSEsVERXJljVEwPTD1xpJHhi5gHieiZcjl-rJ734bFiDxG1GzTxkX5nRc9lkRhtNHMdHDOSswMU-dgp8itMF8lTdEztOYz_bE_8H2FxN5NtCBmeOvxTi7f31wM2zrAE7oOzzeVy1_hYLFAWuXJ0CNqDfc-J-Ui9HY1RILj9Z1nYvEKGGDSTiT3tzysWHO9Vn6rXDFKE9TUGNE1_Z9_EaQ7B_HIU_z7oq2Hmmikl1Ap5t7N_pEI44ZhUGbIVirHKJyvc2LgtJgczCeNEgH7SnvvYBCM-OMWX5MnB949rXYn678iZyz7Q16wjPMevr1IQU4zfdOE2xoJQi8x3FhpD2-3moUoilZRBR5OQi-KII4hRYrEaRFnAiGqYeFz3Rqwx_Yw97kROwh2AnfhT03700AHkFqmYobTXjq0Q3IQpjcYQZ3vbtw=s0"
    : "https://lh3.googleusercontent.com/9XANu0kkl94p8G9WgLUL14Ot1ROi1a1Hbw1Tpzb78Z9HaMsxywAA0sbLm0cwWt15PIfIHxUmds_7QONbYkowaWAMXbBSKFCb6SwfyKOWRV4FfHqJOXdqCVvwEPfEJiIRRmCf5frq8W8YcLbi9fj5dvFJezbcTpgqz-OKcWh9MaI0Pj6IaKgrQPkTq6dgjSQIpkqhdbJYWPMLvWrHxiyPWDZEmMGRIzd8cidTCVQHG3uPk8MowwnBpgy2Ptr3U_PU8JtuN3u90Xnp-noeGSYOMOmgRWBFig1rokY9AQjAPp6-e40OTGSjdpmJhomrVDyLZIBtPvOwS9_5TlNmtLG2x5i23rBQmuVyqSAJsshervLggFikmPGHx4VxfaRbiih2pH47F6mvjbY5U14yKCGFEO8PqdYmBpAS2hWjme5evNuN8Uj6fbvXMAAQ1KCOVfPHEtjz0LPJrntsGj_cy0RiVvN2YV6CMe2c0YPadHRDbKUbwQdod99HB6q6nSzzm8qWXmpaY8QSe9A0wdm7Uf5mNE8vNNGMLIg4UBgxZNfrGeom_Rvubt2SOufPsV8-RT7ZCsumOg=w400"
    const imageUri = imageSelection
    const heartIconColor = this.state.liked ? "rgb(252,61,57)" : null;
      return(
          <View style={{flex: 1, width: 100 + "%"}}>
            <View style={styles.userBar}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Image
                  style={styles.userPic}
                  source={{
                    uri:
                    "https://lh3.googleusercontent.com/sZl-o9TGNYXucrPNHesxaMLXajhcPYqw43zojzHJ-y1yYYeQaNtJMrPUQImKgak3paKOMbEm0Av0e5bKG8_z31m1xVGN8J3x-EIAfgeETIhrLxwsw7xWEGstIuwyKYuHjOLFPCcvqIBY944PWFHBhgSEsVERXJljVEwPTD1xpJHhi5gHieiZcjl-rJ734bFiDxG1GzTxkX5nRc9lkRhtNHMdHDOSswMU-dgp8itMF8lTdEztOYz_bE_8H2FxN5NtCBmeOvxTi7f31wM2zrAE7oOzzeVy1_hYLFAWuXJ0CNqDfc-J-Ui9HY1RILj9Z1nYvEKGGDSTiT3tzysWHO9Vn6rXDFKE9TUGNE1_Z9_EaQ7B_HIU_z7oq2Hmmikl1Ap5t7N_pEI44ZhUGbIVirHKJyvc2LgtJgczCeNEgH7SnvvYBCM-OMWX5MnB949rXYn678iZyz7Q16wjPMevr1IQU4zfdOE2xoJQi8x3FhpD2-3moUoilZRBR5OQi-KII4hRYrEaRFnAiGqYeFz3Rqwx_Yw97kROwh2AnfhT03700AHkFqmYobTXjq0Q3IQpjcYQZ3vbtw=w400"
                  }}
                />
                  <Text style={{marginLeft: 10}}>Joshua Sokoya</Text>
              </View>
              <View style={{alignItems: "center"}}>
              <Text style={{fontSize: 30}}>...</Text>
              </View>
            </View>

            <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{
            this.likeToggled();
          }}>
            <Image
            style={{ width: this.state.screenWidth, height: imageHeight}}
            source={{
              uri: imageUri
            }}
          />
            </TouchableOpacity>
            <View style={styles.iconBar}>
              <Image
              style={[styles.icon, {width: 40, height: 40, tintColor: heartIconColor}]}
              source={config.images.heartIcon} />
              <Image
              style={[styles.icon, {width: 34, height: 34}]}
              source={config.images.commentIcon} />
            </View>
            <View style={styles.commentBar}>
              <Image
                style={[styles.icon, {width: 25, height: 25}]}
                source={config.images.heartIcon} />
              <Text>128 Likes</Text>
            </View>
          </View>
    )
  }

}

const styles = StyleSheet.create({
  tempNav: {
   width: 100 + "%",
   height: 70,
   marginTop: 30,
   backgroundColor: "rgb(245,245,245)",
   borderBottomColor: "rgb(233,233,233)",
   borderBottomWidth: StyleSheet.hairlineWidth,
   justifyContent: "center",
   alignItems: "center"
 },

  userBar: {
    width: 100 + "%",
    height: config.styleConstants.rowHeight,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  userPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  iconBar: {
    height: config.styleConstants.rowHeight,
    width: 100 + "%",
    borderColor: "rgb(233,233,233)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginLeft: 5,
  },

  commentBar: {
    height: config.styleConstants.rowHeight,
    width: 100 + "%",
    borderColor: "rgb(233,233,233)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  }
})

export default Post;
