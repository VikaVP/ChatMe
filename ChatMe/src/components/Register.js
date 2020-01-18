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
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {Divider, CheckBox} from 'react-native-elements';
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
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      errorMessage: null,
      visible: false,
    };
    this.getSignUp = this.getSignUp.bind(this);
  }
  hideToast = () => {
    this.setState({
      visible: false,
    });
  };
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
  getSignUp = values => {
    let rootRef = firebase.database().ref();
    rootRef
      .child('user')
      .orderByChild('email')
      .equalTo(values.email)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          let userData = snapshot.val();
          console.log(userData);
          Alert.alert('email is taken');
          return userData;
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
              const id = firebase.auth().currentUser.uid;
              firebase
                .database()
                .ref('user/' + id)
                .set({
                  name: values.email.split('@')[0],
                  email: values.email,
                  status: '',
                  phone: '',
                  latitude: this.state.latitude || null,
                  longitude: this.state.longitude || null,
                  online: true,
                })
                .then(data => {
                  //success callback
                  Alert.alert(
                    'Success',
                    'Welcome to ChatMe',
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
                  alert(error);
                  console.log('error ', error);
                });
            })
            .catch(error => {
              return alert(error);
            });
        }
      })
      .catch(error => {
        return alert(error);
      });
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
        }}
        onSubmit={values => this.getSignUp(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .label('email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
          password: Yup.string()
            .label('password')
            .required()
            .min(6, 'Password must have more than 6 characters '),
          confirmPassword: Yup.string()
            .required()
            .label('Confirm password')
            .test('passwords-match', 'Passwords must match ', function(value) {
              return this.parent.password === value;
            }),
          agreeToTerms: Yup.boolean().oneOf(
            [true],
            'Please check the agreement',
          ),
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
                  <Label style={style.label}>Sign Up</Label>
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
                  <PasswordInputText
                    value={values.confirmPassword}
                    placeholder="Confirm your password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={() => setFieldTouched('confirmPassword')}
                    secureTextEntry={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={style.errpass}>{errors.confirmPassword}</Text>
                  )}
                  <CheckBox
                    // containerStyle={styles.checkBoxContainer}
                    checkedIcon="check-box"
                    iconType="material"
                    uncheckedIcon="check-box-outline-blank"
                    title="Agree to terms and conditions"
                    checkedTitle="You agreed to our terms and conditions"
                    checked={values.agreeToTerms}
                    onPress={() =>
                      setFieldValue('agreeToTerms', !values.agreeToTerms)
                    }
                  />

                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <Text style={style.textError}>{errors.agreeToTerms}</Text>
                  )}
                  <Button
                    full
                    title="Sign Up"
                    disabled={!isValid}
                    style={style.signin}
                    onPress={handleSubmit}>
                    <Text style={style.signintext}>Sign Up</Text>
                  </Button>
                  <Button
                    full
                    title="Sign In"
                    onPress={() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({routeName: 'Login'}),
                        ],
                      });
                      this.props.navigation.dispatch(resetAction);
                    }}
                    style={style.signup}>
                    <Text style={style.signuptext}>Sign In</Text>
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

export default withNavigation(SignUp);

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
    marginTop: hp('-10%'),
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
