import React from 'react';
import { Text, View } from 'react-native';


const Header = (probs) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{probs.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        paddingTop: 30,
        shadowColor: '#111',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
    },

    textStyle: {
        fontSize: 30
    }
};
export { Header };