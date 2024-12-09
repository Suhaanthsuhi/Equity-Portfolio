import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SubscriptionContext } from "./SubscriptionContext";

export default function BottomBar() {
  const { subscribed, setSubscribed } = useContext(SubscriptionContext);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>
          {subscribed ? "Subscription Active" : "Subscription fees"}
        </Text>
        <Text style={styles.subtitle}>
  {subscribed ? (
    "till 24 Oct 2024"
  ) : (
    <View style={styles.priceTag}>
      <Text style={styles.bold}>₹299/</Text>
      <Text>month</Text>
    </View>
  )}
</Text>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          subscribed
            ? Alert.alert("Invest Now Pressed!")
            : setSubscribed(true)
        }
      >
        <Text style={styles.buttonText}>
          {subscribed ? "Invest now" : "Subscribe Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  leftContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 17,
    opacity: 0.85,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#666",
  },
  button: {
    backgroundColor: "#7b28b1",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  bold: {
    fontSize: 14,
    fontWeight: "bold",
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
  }
});
