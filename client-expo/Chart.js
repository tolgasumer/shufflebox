import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Button
} from 'react-native';
import { Card } from './components/common/Card';
import { CardSection } from './components/common/CardSection';

import * as Progress from 'react-native-progress';

import {
  Image,
  ImageBackground,
  ListView,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Screen,
  Divider,
  Icon,
  View
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui';

import { Font, AppLoading } from 'expo';

/* https://github.com/oblador/react-native-progress/blob/master/README.md*/
class Chart extends Component {
  constructor(props) {
    playlists = [
      {
        "name": "Gaspar Brasserie (Slow Rock)",
        "address": "185 Sutter St, San Francisco, CA 94109",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        "id": "296W1tgCGPvAjyCSSdiUsG",
        "similarity": false
      },
      {
        "name": "Chalk Point Kitchen (Dance Pop)",
        "address": "527 Broome St, New York, NY 10013",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        "id": "37i9dQZF1DXcZDD7cfEKhW",
        "similarity": false
      },
      {
        "name": "Kyoto Amber Upper East (Rock Classics)",
        "address": "225 Mulberry St, New York, NY 10012",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        "id": "37i9dQZF1DWXRqgorJj26U",
        "similarity": false
      },
      {
        "name": "Sushi Academy (Jazz Classics)",
        "address": "1900 Warner Ave. Unit A Santa Ana, CA",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" },
        "id": "37i9dQZF1DXbITWG1ZJKYt",
        "similarity": false
      },
      {
        "name": "Sushibo (90s Metal)",
        "address": "35 Sipes Key, New York, NY 10012",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        "id": "37i9dQZF1DX08jcQJXDnEQ",
        "similarity": false
      },
      {
        "name": "Mastergrill (Classical Essentials)",
        "address": "550 Upton Rue, San Francisco, CA 94109",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
        "id": "37i9dQZF1DWWEJlAGA9gs0",
        "similarity": false
      }
    ];
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {

      fontsAreLoaded: false,
    };
  }

  getSimilarityFromServer(userplaylistid, targetplaylistid, i) {
    fetch('https://shufflebox.herokuapp.com/getsimilarity', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        user_playlistid: userplaylistid,
        target_playlistid: targetplaylistid
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log("response from fetch:", result);
        playlists[i].similarity = result;
        return result;
      });
  }

  setSimilarityOfAllPlaylists() {
    for (let i = 0; i < playlists.length; i++) {
      this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', playlists[i].id, i);
      console.log("setSimilarityOfAllPlaylists:", playlists[i].similarity);

    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),

    });
    await this.setSimilarityOfAllPlaylists();
    /*for (let i = 0; i < this.state.playlists.length; i++) {
      this.state.playlists[i].similarity = getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', this.state.playlists[i].id);
    }*/
    //this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', this.state.playlists[0].id);
    this.setState({ fontsAreLoaded: true });
    

    //this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', this.state.playlists[0].id);
    //this.state.playlists[0].similarity = getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', this.state.playlists[0].id);
    //this.setState({playlists[0].similarity: getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', this.state.playlists[0].id)});
    //this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', this.state.playlists[0].id);
    //this.timer = setInterval(() => this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', playlists[0].id), 1000);
    //this.timer = setInterval(() => this.setSimilarityOfAllPlaylists(), 1000);
    //this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', playlists[0].id);
    //this.timer = setInterval(() => console.log("prop:", playlists[0].similarity), 1000);

  }


  renderRow(restaurant) {
    return (
      <View>
        <ImageBackground
          styleName="large-banner"
          source={{ uri: restaurant.image.url }}
        >
          <Tile>
            <Title styleName="md-gutter-top">{restaurant.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{restaurant.similarity}</Subtitle>
            <Progress.Circle size={60} indeterminate={false} progress={restaurant.similarity/100} showsText={true} animated={true}/>
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </View>
    );
  }
  render() {
    //fontlar yuklenmeden once exponun default loading ekranini goster
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    console.log("logic:",!playlists[0].similarity && !playlists[1].similarity && !playlists[2].similarity && !playlists[3].similarity && !playlists[4].similarity && !playlists[5].similarity);
    if (!playlists[0].similarity && !playlists[1].similarity && !playlists[2].similarity && !playlists[3].similarity && !playlists[4].similarity && !playlists[5].similarity) {
      return null;

    }
    this.getSimilarityFromServer('37i9dQZF1DX08jcQJXDnEQ', playlists[0].id);
    return (
      <Screen>
        <NavigationBar
          title="Places"
          styleName="inline"
        />
        <ListView
          data={playlists}
          renderRow={this.renderRow}
        />
      </Screen>
    );

  }





}
export default Chart;
