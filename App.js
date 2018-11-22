import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    votesJson = "VOTES";
    this.state = {
      titleText: "VOTES",
    };
  }

  //https://stackoverflow.com/questions/44423132/get-name-of-button-onpress-in-react-native
  _onPressButton(event, buttonID) {
    Alert.alert("Voted for song " + buttonID)
    /*var request = new XMLHttpRequest();

    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };

    request.open('POST', 'http://10.10.201.18:3000');
    request.send(buttonID);*/
    fetch('http://172.20.10.2:3000/sendvote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songid: buttonID,
      }),
    });
  }
  getVotesFromServer() {
    fetch('http://172.20.10.2:3000/getinfo')
      .then(function (response) {
        return response.json();
      })
      .then(function (receivedJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson.votesForSong1);
        //this.setState({titleText: myJson.votesForSong1});
        votesJson = receivedJson;
      });
      this.setState({titleText: JSON.stringify(votesJson)});
      //this.setState({titleText: ""+votesJson.votesForSong1});
      console.log(votesJson.votesForSong1);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getVotesFromServer(), 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '1')}
            title="Song1"
            color="#841584"
            testID="1"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '2')}
            title="Song2"
            color="#841584"
            testID="2"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '3')}
            title="Song3"
            color="#841584"
            testID="3"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '4')}
            title="Song4"
            color="#841584"
            testID="4"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '5')}
            title="Song5"
            color="#841584"
            testID="5"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={this.state.titleText}
            color="#841584"
            testID="6"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
});

