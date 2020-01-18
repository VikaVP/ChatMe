import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Container, Label} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component, Fragment} from 'react';
import {TextInput, Text, Image, StyleSheet, View, Alert} from 'react-native';
import firebase from '../config/config';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  sendEmail = values => {
    Alert.alert(
      'Are you sure to submit?',
      'You will be getting email for reset password',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            firebase
              .auth()
              .sendPasswordResetEmail(values.email)
              .then(() => {
                this.props.navigation.push('Login');
              })
              .catch(error => {
                Alert.alert('Email is not registered');
              });
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <Formik
        initialValues={{email: ''}}
        onSubmit={values => this.sendEmail(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .label('email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
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
              <Container style={style.container}>
                <View style={style.logo}>
                  <Image
                    source={require('../assets/136590391.png')}
                    style={style.image}
                  />
                </View>
                <View style={style.wrapper}>
                  <Label style={style.label}>Request Password Baru</Label>
                  <Text style={style.textNew}>
                    Kami akan mengirim kode OTP untuk mereset password anda
                    melalu email yang teregistrasi
                  </Text>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={style.erremail}>{errors.email}</Text>
                  )}
                  <Button
                    full
                    title="Submit"
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={style.submit}>
                    <Text style={style.submitText}>Submit</Text>
                  </Button>
                  <Button
                    full
                    title="Sign In"
                    onPress={() => this.props.navigation.navigate('Login')}
                    style={style.signin}>
                    <Text style={style.signintext}>Sign In</Text>
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

export default ForgotPassword;

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: wp('5%'),
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
  submit: {
    backgroundColor: '#ffffff',
    borderRadius: wp('3%'),
    borderWidth: wp('0.5%'),
    marginTop: hp('3%'),
    borderColor: '#6184f2',
  },
  submitText: {
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
  image: {resizeMode: 'contain', width: wp('60%'), marginTop: hp('-30%')},
  label: {fontSize: wp('5%'), textAlign: 'center'},
  wrapper: {marginTop: hp('-30%')},
  erremail: {fontSize: wp('3%'), color: 'red'},
  textNew: {
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('3%'),
    color: 'rgba(0,0,0,0.6)',
  },
});
// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Button} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import {Header, Left, Body, Title, Form, Item, Label, Input} from 'native-base';
// import firebase from '../config/config';
// import {Bubbles} from 'react-native-loader';
// export default class ForgotPassword extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit = () => {
//     const {email} = this.state;
//     return firebase.auth().sendPasswordResetEmail(email);
//   };
//   render() {
//     return (
//       <>
//         <Header style={style.header}>
//           <Left>
//             <TouchableOpacity
//               onPress={() => this.props.navigation.push('Login')}>
//               <Icon name="times" size={30} color="white" style={style.icon1} />
//             </TouchableOpacity>
//           </Left>
//           <Body>
//             <Title style={style.title}>Forgot Password</Title>
//           </Body>
//         </Header>
//         <View style={style.wrapper}>
//           <ScrollView>
//             <Form style={style.flex}>
//               <View style={style.form}>
//                 <Label style={style.label}>
//                   Enter your email for request new password, make sure you
//                   entered registered email
//                 </Label>
//                 <Item stackedLabel>
//                   <Label style={style.label}>Enter your email</Label>
//                   <Input
//                     type="text"
//                     id="email"
//                     name="email"
//                     value={this.state.email}
//                     onChangeText={value => {
//                       this.setState({
//                         email: value,
//                       });
//                     }}
//                     style={style.input}
//                   />
//                 </Item>
//                 <View style={style.buttonWrapper}>
//                   <Button
//                     onPress={this.handleSubmit}
//                     style={style.button}
//                     title="Submit"
//                   />
//                 </View>
//               </View>
//             </Form>
//           </ScrollView>
//           )}
//         </View>
//       </>
//     );
//   }
// }
// const style = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#ffebcd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: wp('8%'),
//   },
//   header: {
//     backgroundColor: '#6495ed',
//   },
//   button: {
//     width: wp('50%'),
//   },
//   form: {
//     marginTop: hp('3%'),
//     height: hp('50%'),
//   },
//   buttonWrapper: {
//     justifyContent: 'center',
//     marginTop: wp('3%'),
//     alignItems: 'center',
//   },
//   loader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('40%'),
//   },
//   loadBuble: {marginTop: hp('50%')},
//   flex: {height: hp('80%'), justifyContent: 'center', alignItems: 'center'},
//   input: {
//     borderWidth: wp('0.2%'),
//     borderColor: 'grey',
//     borderRadius: wp('50%'),
//     padding: wp('2%'),
//   },
//   label: {
//     marginTop: hp('-1%'),
//     marginBottom: hp('0.8%'),
//   },
// });
