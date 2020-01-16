import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from '../config/config';
import {useNavigation} from 'react-navigation-hooks';
import {Bubbles} from 'react-native-loader';
const Splash = () => {
  const {navigate} = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigate(user ? 'Chat' : 'Start');
    });
  });
  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={style.bg}>
      <View style={style.loader}>
        <Bubbles size={15} color="rgb(245, 66, 161)" />
      </View>
    </ImageBackground>
  );
};

export default Splash;

const style = StyleSheet.create({
  loader: {marginTop: hp('80%')},
  bg: {
    width: wp('100%'),
    height: hp('100%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: hp('50%'), resizeMode: 'contain'},
  slogan: {
    color: 'blue',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginTop: wp('-10%'),
  },
});
