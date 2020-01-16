import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ListItem} from 'react-native-elements';
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.wrapper}>
        <ScrollView>
          <View style={style.imageWrapper}>
            <Image
              source={require('../assets/disney2.jpg')}
              style={style.image}
            />
          </View>
          <View style={style.data}>
            <ListItem title="Help" bottomDivider chevron />
            <ListItem title="FAQ" bottomDivider chevron />
            <ListItem title="About App" bottomDivider chevron />
            <TouchableOpacity onPress={this.handleLogout}>
              <ListItem title="Deactivated" bottomDivider chevron />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  data: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    height: hp('50%'),
    width: wp('100%'),
  },
  wrapper: {
    flex: 1,
  },
});
