import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return <View style={styles.containerSyle}>{props.children}</View>;
};

const styles = {
  containerSyle: {
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    color: 'transparent'
  }
};

export { CardSection };
