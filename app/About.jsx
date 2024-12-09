import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function About() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>About the manager</Text>

      {/* Flex Row with Icon and Text */}
      <View style={styles.row}>
        <Image
          source={require("../assets/images/key.png")}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Lock N Key Advisors</Text>
          <Text style={styles.subtitle}>SEBI Registered 1NA02020123456</Text>
        </View>
      </View>

      {/* Paragraph */}
      <Text style={styles.paragraph} numberOfLines={4}>
        Description In detail about the portfolio manager, including their SEBI
        registration, their research thesis and strategies, Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Cupiditate facere fugit nam
        repudiandae perspiciatis rem numquam deleniti aut nostrum libero?
      </Text>

      {/* Read More */}
      <TouchableHighlight
        style={styles.touchable}
        underlayColor="#e0e0e0"
        onPress={() => Alert.alert("Read More Pressed!")}
      >
        <View style={styles.touchableContent}>
          <Text style={styles.readMoreText}>Read more</Text>
          <Icon name="angle-down" size={20} color="#555" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 16,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#000",
  },
  icon: {
    marginRight: 10,
    width: 60,
    height: 60,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.7,
    color: "#555",
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    marginLeft: 16,
    marginRight: 16,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    borderRadius: 4,
    marginBottom: 30,
  },
  touchableContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 16,
  },
  readMoreText: {
    fontSize: 16,
    color: "#555",
    marginRight: 4,
  },
});