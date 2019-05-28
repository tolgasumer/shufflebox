import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Image,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucces.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucces.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginSucces() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
  onLoginFail() {
    this.setState({
      error: 'Authantication Failed.',
      loading: false
    });
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <ImageBackground
        source={require('./img/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./img/mail.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder='user@shufflebox.com'
              placeholderTextColor='#fff'
              keyboardType='email-address'
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./img/key.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder='Password'
              placeholderTextColor='#fff'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <View style={styles.buttonContainer}>{this.renderButton()}</View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 80
  },
  backgroundImage: {
    flex: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'center' // or 'stretch'
  },
  inputContainer: {
    color: '#ffffff',
    borderBottomColor: '#F5FCFF',
    backgroundColor: 'transparent',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color: '#fff'
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: '#845F70',
    borderRadius: 15
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    color: '#1ed761'
  },

  loginButton: {
    backgroundColor: '#00b5ec'
  },
  loginText: {
    color: 'white'
  },
  formstyle: {
    marginTop: '75%'
  },
  errorTextStyle: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
/*  return (
      <Card>
        <View style={styles.formstyle}>
          <CardSection>
            <Input
              placeholder='user@gmail.com'
              label='Email: '
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder='password'
              label='Password: '
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <CardSection>{this.renderButton()}</CardSection>
        </View>
      </Card>
    );
    */
