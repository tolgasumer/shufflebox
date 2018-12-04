import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    votesJson = "VOTES";
    playlistJson = "playlist";
    this.state = {
      Button1Text: "Song1",
      Button2Text: "Song2",
      Button3Text: "Song3",
      Button4Text: "Song4",
      Button5Text: "Song5",
      Button6Text: "VOTES"
    };
  }

  _onPressButton(event, buttonID) {
    Alert.alert("Voted for song " + buttonID)
    fetch('http://192.168.1.110:3000/sendvote', {
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
    fetch('http://192.168.1.110:3000/getinfo')
      .then(function (response) {
        return response.json();
      })
      .then(function (receivedJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson.votesForSong1);
        //this.setState({titleText: myJson.votesForSong1});
        votesJson = receivedJson;
      });
      this.setState({Button6Text: JSON.stringify(votesJson)});
      //this.setState({titleText: ""+votesJson.votesForSong1});
      console.log(votesJson.votesForSong1);
  }

  getPlaylistFromServer() {
    fetch('http://192.168.1.110:3000/getplaylist')
      .then(function (response) {
        return response.json();
      })
      .then(function (receivedJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson.votesForSong1);
        //this.setState({titleText: myJson.votesForSong1});
        playlistJson = receivedJson;
      });
      //var trackname = playlistJson[0].track.name; 
      //this.setState({titleText: ""+trackname});
      //console.log("TRACKNAME:"+trackname);
  }

  setButtonTexts() {
    try {
      var trackname = playlistJson[0].track.name;
      this.setState({Button1Text: ""+trackname});

      trackname = playlistJson[1].track.name;
      this.setState({Button2Text: ""+trackname});

      trackname = playlistJson[2].track.name;
      this.setState({Button3Text: ""+trackname});

      trackname = playlistJson[3].track.name;
      this.setState({Button4Text: ""+trackname});

      trackname = playlistJson[4].track.name;
      this.setState({Button5Text: ""+trackname});

    }
    catch(err) {
      console.log("ERROR!!!!!!!!!!!!!!!!")
    }

  }

  componentDidMount() {
    this.timer = setInterval(() => this.getVotesFromServer(), 1000)
    this.timer = setInterval(() => this.getPlaylistFromServer(), 1000)
    this.timer = setInterval(() => this.setButtonTexts(), 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '1')}
            title={this.state.Button1Text}
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '2')}
            title={this.state.Button2Text}
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '3')}
            title={this.state.Button3Text}
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '4')}
            title={this.state.Button4Text}
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={(event) => this._onPressButton(event, '5')}
            title={this.state.Button5Text}
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={this.state.Button6Text}
            color="#841584"
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

