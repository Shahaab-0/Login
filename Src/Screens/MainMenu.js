import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';

const MainMenu = () => {
  const data = useSelector(state => state.userDetail);
  return (
    <View style={styles.container}>
      <Text style={styles.textHead}>Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2ebda',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  textHead: {
    fontSize: 30,
    marginBottom: 30,
    color: '#0f974f',
  },
});

export default MainMenu;
