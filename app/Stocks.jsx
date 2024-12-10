import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import { SubscriptionContext } from "./SubscriptionContext";

const Stocks = () => {
  const { subscribed, setSubscribed } = useContext(SubscriptionContext);

  const stockGroups = [
    { name: "UTI Asset Management Company", abbr: "UAMC", percentage: "6.5 %" },
    { name: "Time Technoplast Ltd", abbr: "TTL", percentage: "3.5 %" },
    { name: "HDFC Bank", abbr: "HDFC", percentage: "12 %" },
    { name: "Time Technoplast Ltd", abbr: "TTL", percentage: "3.5 %" },
    { name: "Time Technoplast Ltd", abbr: "TTL", percentage: "3.5 %" },
    { name: "Time Technoplast Ltd", abbr: "TTL", percentage: "3.5 %" },
    { name: "Time Technoplast Ltd", abbr: "TTL", percentage: "3.5 %" },
  ];

  const handleSubscribe = () => {
    setSubscribed(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stocks</Text>
      <View style={styles.listContainer}>
        {!subscribed && (
          <BlurView
            intensity={25}
            style={styles.blurView}
            experimentalBlurMethod="gpu"
          >
            <View style={styles.subscribeContainer}>
              <Image
                source={require("../assets/images/lock.jpeg")}
                style={styles.icon}
              />
              <Text style={styles.subscribeText}>
                Subscribe to see the stocks/ETFs in this portfolio
              </Text>
              <TouchableOpacity
                style={styles.subscribeButton}
                onPress={handleSubscribe}
              >
                <Text style={styles.subscribeButtonText}>Subscribe now</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        )}
        <FlatList
          data={stockGroups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.stockGroup}>
              <View style={styles.stockHeader}>
                <Text style={styles.stockName}>{item.name}</Text>
                <Text style={styles.stockPercentage}>{item.percentage}</Text>
              </View>
              <Text style={styles.stockDetails}>{item.abbr}</Text>
              <View style={styles.separator} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 16,
    color: "#333",
  },
  listContainer: {
    flex: 1,
    position: "relative",
    marginTop: 10,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  subscribeContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "85%",
    height: "80%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0c4c1",
    borderRadius: 15,
  },
  subscribeText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: "#7b28b1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  subscribeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  stockGroup: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
    width: 60,
    height: 60,
  },
  stockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  stockPercentage: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  stockDetails: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  separator: {
    marginTop: 8,
    height: 1,
    backgroundColor: "#ddd",
  },
});

export default Stocks;
