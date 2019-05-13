import React, { Component } from 'react';
import { Text, ImageBackground, Image, marginTop } from 'react-native';
import firebase from 'firebase';
import { CardSection } from './common';
import {
  Content,
  Container,
  Card,
  CardItem,
  Form,
  Item,
  Label,
  View,
  Spinner,
  Button,
  Input
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    return (
      <Button full info onPress={this.onButtonPress.bind(this)} danger>
        <Text>Login</Text>
      </Button>
    );
  }

  render() {
    /*let pic = {
      uri:
        'https://image.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-260nw-1039858453.jpg'
    };*/

    return (
      <ImageBackground
        source={require('./img/image.png')}
        style={styles.backgroundImage}
      >
        <KeyboardAwareScrollView
          style={{ backgroundColor: 'transparent' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <Card style={styles.cardStyle}>
            <Form>
              <Item floatingLabel>
                <Label>User@email.com</Label>
                <Input
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                />
              </Item>

              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                />
              </Item>
            </Form>
          </Card>
          <Card>
            <View>{this.renderButton()}</View>
          </Card>
        </KeyboardAwareScrollView>

        <View>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'transparent'
  },
  errorTextStyle: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'yellow'
  },
  cardStyle: {
    marginTop: '75%',
    backgroundColor: 'pink',
    opacity: 0.5,
    height: 180
  },
  backgroundImage: {
    flex: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'center' // or 'stretch'
  }
};

export default LoginForm;
