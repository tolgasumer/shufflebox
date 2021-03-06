import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    axios
      .get('https://shufflebox.herokuapp.com//playlist')
      .then((response) => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    return this.state.albums.map((album) => (
      <AlbumDetail key={album.name} album={album} />
    ));
  }

  render() {
    console.log(this.state);

    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}

export default AlbumList;
