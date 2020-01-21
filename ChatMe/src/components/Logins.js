import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Container, Label} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from '../config/config';
import {
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';
import React, {Component, Fragment} from 'react';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
  TextInput,
  Text,
  Image,
  StyleSheet,
  View,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
const Toast = props => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      1,
      800,
    );
    return null;
  }
  return null;
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      errorMessage: null,
      visible: false,
    };
  }
  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            this.setState({latitude, longitude});
          },
          error => {
            this.setState(
              {
                errorMessage: 'Check youre GPS',
                visible: true,
              },
              () => {
                this.hideToast();
              },
            );
            return;
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              this.setState({latitude, longitude});
            },
            error => {
              this.setState(
                {
                  errorMessage: 'Check your GPS',
                  visible: true,
                },
                () => {
                  this.hideToast();
                },
              );
              return;
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          this.setState(
            {
              errorMessage: 'location denied',
              visible: true,
            },
            () => {
              this.hideToast();
            },
          );
          return;
        }
      }
    } catch (err) {
      this.setState(
        {
          errorMessage: err,
          visible: true,
        },
        () => {
          this.hideToast();
        },
      );
      return;
    }
  }
  getLogin = values => {
    console.log(this.state);

    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        console.log(response.user.uid);
        firebase
          .database()
          .ref('user/' + response.user.uid)
          .update({
            online: 'true',
            latitude: this.state.latitude || -6.226407,
            longitude: this.state.longitude || 106.852069,
          });
        Alert.alert(
          'Success',
          'Welcome to Chatme',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => this.props.navigation.push('Chat'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        //error callback
        alert('Account not found');
        console.log('error ', error.message);
      });
  };
  hideToast = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => this.getLogin(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .label('email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
          password: Yup.string()
            .label('password')
            .required()
            .min(6, 'Password must have more than 6 characters '),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          setFieldValue,
          handleSubmit,
        }) => (
          <Fragment>
            <ScrollView>
              <Container style={style.Login}>
                <Toast
                  visible={this.state.visible}
                  message={this.state.errorMessage}
                />
                <View style={style.logo}>
                  <Image
                    source={require('../assets/136590391.png')}
                    style={style.image}
                  />
                </View>
                <View style={style.form}>
                  <Label style={style.label}>Sign In</Label>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                  <View>
                    <Divider style={{backgroundColor: 'black'}} />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={style.erremail}>{errors.email}</Text>
                  )}
                  <PasswordInputText
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={style.errpass}>{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }>
                    <Text style={style.forgot}>Forgot password ?</Text>
                  </TouchableOpacity>
                  <Button
                    full
                    title="Sign In"
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={style.signin}>
                    <Text style={style.signintext}>Sign In</Text>
                  </Button>
                  <Button
                    full
                    title="Sign Up"
                    onPress={() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({routeName: 'Register'}),
                        ],
                      });
                      this.props.navigation.dispatch(resetAction);
                    }}
                    style={style.signup}>
                    <Text style={style.signuptext}>Sign Up</Text>
                  </Button>
                </View>
              </Container>
            </ScrollView>
          </Fragment>
        )}
      </Formik>
    );
  }
}

export default withNavigation(Login);

const style = StyleSheet.create({
  Login: {
    justifyContent: 'center',
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#f0f8ff',
  },
  textSignUp: {
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('-20%'),
  },
  signup: {
    backgroundColor: '#ffffff',
    borderRadius: wp('3%'),
    borderWidth: wp('0.5%'),
    marginTop: hp('3%'),
    borderColor: '#6184f2',
  },
  signuptext: {
    color: '#6184f2',
  },
  signintext: {
    color: '#ffffff',
  },
  signin: {
    backgroundColor: '#6184f2',
    borderRadius: wp('3%'),
    marginTop: hp('3%'),
  },
  forgot: {textAlign: 'right', color: 'grey'},
  image: {resizeMode: 'contain', width: wp('60%'), marginTop: hp('-20%')},
  label: {fontSize: 30, textAlign: 'center'},
  errpass: {fontSize: 10, color: 'red'},
  erremail: {fontSize: 10, color: 'red'},
  errrole: {fontSize: 10, color: 'red'},
  login: {
    flex: 1,
  },
  form: {
    marginTop: hp('-30%'),
  },
});
