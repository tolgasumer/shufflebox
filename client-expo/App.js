import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, I18nManager } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';
import firebase from 'firebase';
import {
  Header,
  Button,
  CardSection,
  Spinner,
  Card
} from './components/common';
import LoginForm from './components/LoginForm';
import Vote from './Vote';
import Chart from './Chart';
import AlbumList from './components/AlbumList';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
//styles

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Listen What You Want',
    text:
      'With ShuffleBox You Can Easily Vote for The Song You Want to Listen at Your Best Place',
    icon: 'md-musical-notes',
    colors: ['#1ed761', '#000000']
  },
  {
    key: 'somethun1',
    title: 'Vote for Your Song',
    text:
      'All You Need to Do is Vote for the Song from Random List of The Playlist at Your Best Place',
    icon: 'ios-stats',
    colors: ['#A3A1FF', '#3A3897']
  },
  {
    key: 'somethun3',
    title: 'Vote in Time',
    text: 'Vote Before Next Song',
    icon: 'ios-stopwatch',
    colors: ['#ff0000', '#000000']
  },
  {
    key: 'somethun2',
    title: 'Uplift Your Mood',
    text: 'Enjoy Your Best Time at Your Best Place With Your Best Song',
    icon: 'ios-pulse',
    colors: ['#29ABE2', '#4F00BC']
  }
];
//</styles>

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAPHj8TIYK1NnSMHJmo-pyHsz1yrE2TfYA',
      authDomain: 'shufflebox-7001b.firebaseapp.com',
      databaseURL: 'https://shufflebox-7001b.firebaseio.com',
      projectId: 'shufflebox-7001b',
      storageBucket: 'shufflebox-7001b.appspot.com',
      messagingSenderId: '824005874220'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <ScrollView>
            <Card>
              <CardSection>
                <Vote />
              </CardSection>
              <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                  Log Out
                </Button>
              </CardSection>
            </Card>
          </ScrollView>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size='large' />
          </CardSection>
        );
    }
  }
  renderChart() {
    return (
      <ScrollView>
        <Chart />
      </ScrollView>
    );
  }

  //render slides
  _renderItem = (props) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height
        }
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: 'transparent' }}
        name={props.icon}
        size={200}
        color='white'
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  //introslides
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
      //To show the main page of the app
    };
  }
  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };

  viewStyle() {
    return {
      flex: 1,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  render() {
    /* 

    if (this.state.showRealApp) {
    */

    if (this.state.showRealApp) {
      return (
        <Swiper loop={false} showsPagination={false} index={0}>
          <Swiper
            horizontal={false}
            loop={false}
            showsPagination={false}
            index={0}
          >
            <View style={{ flex: 1 }}>{this.renderContent()}</View>
          </Swiper>
          <View style={{ flex: 1 }}>{this.renderChart()}</View>
          
        </Swiper>
      );
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          // bottomButton
          showPrevButton
          showSkipButton={true}
          onDone={this._onDone}
          // hideNextButton
          // hideDoneButton
          onSkip={this._onSkip}
        />
      );
    }
  }
}
class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: 'white' }}>{this.props.label}</Text>
    );
  }
}

export default App;
