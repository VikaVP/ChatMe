import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import firebase from '../config/config';
import {
  Header,
  Left,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Thumbnail,
  Button,
} from 'native-base';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import {withNavigation, ScrollView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {ListItem} from 'react-native-elements';
class Chat extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      currentUser: null,
    };
    this.logout = this.logout.bind(this);
  }
  logout = () => {
    firebase.auth().signOut();
  };
  componentDidMount() {
    console.log(this.props);
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }
  render() {
    const {currentUser} = this.state;
    return (
      <>
        <Header style={style.header}>
          <Left>
            <TouchableOpacity>
              <Image
                source={require('../assets/136590391.png')}
                style={style.image}
              />
              <Text style={style.logoText}>ChatMe</Text>
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={style.title}>Chat History</Title>
          </Body>
          <Right style={style.headerRight}>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('MyProfile')}>
              <View style={style.topIcon}>
                <Icon2 name="user" style={style.actionButtonIcon1} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.logout}>
              <View style={style.topIcon}>
                <Icon name="md-log-out" style={style.actionButtonIcon1} />
              </View>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={style.outer}>
          <View style={style.SearchBar}>
            <TextInput
              // onChangeText={props.onChangeText}
              placeholder="Type here for search"
            />
            <Icon
              name="md-search"
              size={30}
              color="#194d33"
              style={style.icon1}
            />
          </View>
        </View>
        <View style={style.body}>
          <View style={style.list}>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../assets/disney5.jpg')} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>
                    Doing what you like will always keep you happy . .
                  </Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
            </List>
          </View>
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Chat"
              onPress={() => alert('notes tapped!')}>
              <Icon name="ios-chatbubbles" style={style.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Add friend"
              onPress={() => alert('add dong')}>
              <Icon name="md-person-add" style={style.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="deeppink"
              title="Contacts"
              onPress={() => alert('add dong')}>
              <Icon2 name="user-friends" style={style.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="Maps"
              onPress={() => alert('maps yaa')}>
              <Icon name="md-map" style={style.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </>
    );
  }
}
export default withNavigation(Chat);
const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffebcd',
  },
  header: {
    backgroundColor: '#6495ed',
  },
  image: {
    width: wp('8%'),
    height: hp('4%'),
  },
  logoText: {
    color: 'white',
  },
  title: {
    alignSelf: 'center',
  },
  icon: {
    color: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: hp('3%'),
    color: 'white',
  },
  actionButtonIcon1: {
    fontSize: 20,
    height: hp('4%'),
    color: 'yellow',
  },
  topIcon: {
    marginRight: wp('5%'),
  },
  SearchBar: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp('10%'),
    height: hp('6%'),
    fontSize: wp('5%'),
    paddingLeft: wp('10%'),
    paddingRight: wp('3%'),
    backgroundColor: 'white',
    marginHorizontal: wp('3%'),
  },
  outer: {
    backgroundColor: '#ffebcd',
  },
  icon1: {
    position: 'absolute',
    left: 12,
  },
  list: {
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    backgroundColor: '#ffebcd',
  },
  item: {
    backgroundColor: '#ffebcd',
  },
});
