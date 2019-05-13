import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, I18nManager } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';

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

class Sliderender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
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

  render() {
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

export default Sliderender;
