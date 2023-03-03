import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LIGHT, MEDIUM, PURPLE, WHITE } from "../../constants";

const ListItem = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) => {
  return (
    <TouchableHighlight underlayColor={LIGHT} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && (
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        )}
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {subTitle && (
            <Text numberOfLines={2} style={styles.subTitle}>
              {subTitle}
            </Text>
          )}
        </View>
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          color={PURPLE}
          name="chevron-right"
          size={25}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: WHITE,
    alignItems: "flex-start",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 3,
    color: PURPLE,
  },
  subTitle: {
    color: MEDIUM,
  },
});

export default ListItem;
