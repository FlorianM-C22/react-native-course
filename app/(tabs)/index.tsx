import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    width: 100,
    height: 20,
    backgroundColor: 'coral',
    borderRadius: 10,
    textAlign: 'center',
  },
});
