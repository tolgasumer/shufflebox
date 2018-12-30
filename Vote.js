import React, { Component } from 'react';
import { Alert, Button, Text, StyleSheet, View, Image, AppRegistry, ScrollView } from 'react-native';
import { CardSection, Card, } from './components/common';

class Vote extends Component {
  constructor(props) {
    super(props);
    votesJson = "VOTES";
    playlistJson = "playlist";
    votablesJson = " ";
    this.state = {
      Button1Text: "Song1",
      Button2Text: "Song2",
      Button3Text: "Song3",
      Button4Text: "Song4",
      Button5Text: "Song5",
      Button6Text: "VOTES",
      Button7Text: "Winner",
      Button8Text: "currentPlaying",
      img1url: "img1",
      img2url: "img2",
      img3url: "img3",
      img4url: "img4",
      img5url: "img5",
      img6url: "img6",
      img7url: "img7"
    };
  }
  
  
  _onPressButton(event, buttonID) {
    Alert.alert("Voted for song " + buttonID)
    fetch('http://192.168.0.128:3000/sendvote', {
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
    fetch('http://192.168.0.128:3000/getinfo')
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
    fetch('http://192.168.0.128:3000/getplaylist')
      .then(function (response) {
        return response.json();
      })
      .then(function (receivedJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson.votesForSong1);
        //this.setState({titleText: myJson.votesForSong1});
        playlistJson = receivedJson;
        console.log(playlistJson[0].track.album.images[0].url);
      });
      //var trackname = playlistJson[0].track.name; 
      //this.setState({titleText: ""+trackname});
      //console.log("TRACKNAME:"+trackname);
  }
  getVotablesFromServer() {
    fetch('http://192.168.0.128:3000/getvotables')
      .then(function (response) {
        return response.json();
      })
      .then(function (receivedJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson.votesForSong1);
        //this.setState({titleText: myJson.votesForSong1});
        votablesJson = receivedJson;
        console.log(votablesJson);
      });
      //var trackname = playlistJson[0].track.name; 
      //this.setState({titleText: ""+trackname});
      //console.log("TRACKNAME:"+trackname);
  }

  setButtonTexts() {
    try {
      var trackname = playlistJson[votablesJson[0]].track.name;
      this.setState({Button1Text: ""+trackname});

      trackname = playlistJson[votablesJson[1]].track.name;
      this.setState({Button2Text: ""+trackname});

      trackname = playlistJson[votablesJson[2]].track.name;
      this.setState({Button3Text: ""+trackname});

      trackname = playlistJson[votablesJson[3]].track.name;
      this.setState({Button4Text: ""+trackname});

      trackname = playlistJson[votablesJson[4]].track.name;
      this.setState({Button5Text: ""+trackname});

      trackname = playlistJson[votesJson.lastWinner].track.name;
      this.setState({Button7Text: ""+trackname});

      trackname = votesJson.currentlyPlayingName;
      this.setState({Button8Text: ""+trackname});
    }
    catch(err) {
      console.log("ERROR!!!!!!!!!!!!!!!!")
    }
  }

  setButtonImages() {
    try {
      var trackImage = playlistJson[votablesJson[0]].track.album.images[0].url;
      this.setState({img1url: ""+trackImage});

      var trackImage = playlistJson[votablesJson[1]].track.album.images[0].url;
      this.setState({img2url: ""+trackImage});

      var trackImage = playlistJson[votablesJson[2]].track.album.images[0].url;
      this.setState({img3url: ""+trackImage});

      var trackImage = playlistJson[votablesJson[3]].track.album.images[0].url;
      this.setState({img4url: ""+trackImage});

      var trackImage = playlistJson[votablesJson[4]].track.album.images[0].url;
      this.setState({img5url: ""+trackImage});

      var trackImage = playlistJson[votesJson.lastWinner].track.album.images[0].url;
      this.setState({img6url: ""+trackImage});

      var trackImage = votesJson.currentlyPlayingUrl;
      this.setState({img7url: ""+trackImage});
    }
    catch(err) {
      console.log("ERROR!!!!!!!!!!!!!!!!")
    }
  }
  

  componentDidMount() {
    this.timer = setInterval(() => this.getVotesFromServer(), 1000)
    this.timer = setInterval(() => this.getVotablesFromServer(), 1000)
    this.timer = setInterval(() => this.getPlaylistFromServer(), 1000)
    this.timer = setInterval(() => this.setButtonTexts(), 1000)
    this.timer = setInterval(() => this.setButtonImages(), 1000)
  }
 
  render() {
    return (
  <ScrollView>
      <Card>
        <CardSection>
          <Image 
            source={{ uri: this.state.img1url }} 
            style={{ width: 50, height: 58 }}
          />
          <Button 
            onPress={(event) => this._onPressButton(event, '1')}
            title={this.state.Button1Text}
            color="#841584"
            testID="1"
          />
         
        </CardSection>
  
        <CardSection>
          <Image 
            source={{ uri: this.state.img2url }} 
            style={{ width: 50, height: 58 }}
          />
          <Button
            onPress={(event) => this._onPressButton(event, '2')}
            title={this.state.Button2Text}
            color="#841584"
            testID="2"
          />
        </CardSection>
  
        <CardSection>
         <Image 
            source={{ uri: this.state.img3url }} 
            style={{ width: 50, height: 58 }}
         />
          <Button
            onPress={(event) => this._onPressButton(event, '3')}
            title={this.state.Button3Text}
            color="#841584"
            testID="3"
          />
        </CardSection>
  
        <CardSection>
          <Image 
            source={{ uri: this.state.img4url }} 
            style={{ width: 50, height: 58 }}
          />
          <Button
             onPress={(event) => this._onPressButton(event, '4')}
             title={this.state.Button4Text}
             color="#841584"
             testID="4"
          />
        </CardSection>
  
         <CardSection>
            <Image 
            source={{ uri: this.state.img5url }} 
            style={{ width: 50, height: 58 }}
            />
          <Button
              onPress={(event) => this._onPressButton(event, '5')}
              title={this.state.Button5Text}
              color="#841584"
              testID="5"
          />
        </CardSection>
        <CardSection>
          <Text style={{ fontSize: 50, textAlign: 'center', flex: 1, fontStyle: 'italic', color: 'pink' }}>
            Next song
          </Text>
        </CardSection>
        <CardSection>
            <Image 
            source={{ uri: this.state.img6url }} 
            style={{ width: 50, height: 58 }}
            />
          <Button
              title={this.state.Button7Text}
              color="#841584"
          />
        </CardSection>
        <CardSection>
        <Text style={{ fontSize: 25, textAlign: 'center', flex: 1, fontStyle: 'italic', color: 'pink' }}>
            Currently Playing...
          </Text>
        </CardSection>
          <CardSection>
          <Image 
            source={{ uri: this.state.img7url }} 
            style={{ width: 50, height: 58 }}
          />
          <Button
              title={this.state.Button8Text}
              color="#841584"
          />
          </CardSection>
      </Card>
    </ScrollView> 
    );
  }
}

export default Vote;

