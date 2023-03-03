import { View, StyleSheet } from "react-native";

import { LIGHT, PURPLE } from "../../constants";

const ListItemSeperator = () => {
  return <View style={styles.seperator} />;
};

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 2,
    backgroundColor: LIGHT,
  },
});

export default ListItemSeperator;
