import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner, Card } from './components/common';
import LoginForm from './components/LoginForm';
import Vote from './Vote';
import AlbumList from './components/AlbumList';


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
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <CardSection>
                        <Spinner size="large" />
                    </CardSection>
                );
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}> 
                <Header headerText="ShuffleBox" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
