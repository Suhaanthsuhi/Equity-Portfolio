import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
  Dimensions,
  Share,
} from "react-native";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import PortfolioVsNifty from "./PortfolioVsNifty";
import HoldingsDistribution from "./PieChart";
import Stocks from "./Stocks";
import BottomBar from "./BottomBar";
import About from "./About";
import { SubscriptionProvider } from "./SubscriptionContext"

const screenWidth = Dimensions.get("window").width;

export default function Profile() {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      title: "Equity Portfolio",
      headerRight: () => (
        <TouchableHighlight
          underlayColor="#e0e0e0"
          onPress={handleShare}
          style={styles.shareButton}
        >
          <Icon name="share-alt" size={20} color="#555" />
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out this amazing Equity Portfolio for Railways & Defence investments!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const headerContent = () => (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/railway.png")}
          style={styles.icon}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Railway & Defence</Text>
          <Text style={styles.subtitle}>Moderate</Text>
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          A portfolio of high growth stocks benefited by increase in Govt.
          spend towards Railways & Defence.
        </Text>
        <TouchableHighlight
          style={styles.touchable}
          underlayColor="#e0e0e0"
          onPress={() => Alert.alert("Read More Pressed!")}
        >
          <View style={styles.touchableContent}>
            <Text style={styles.touchableText}>Read more</Text>
            <Icon name="angle-down" color="#555" size={20} />
          </View>
        </TouchableHighlight>
      </View>

      {/* CAGR Section */}
      <View style={styles.cagrContainer}>
        <View style={styles.cagrTextContainer}>
          <Text style={styles.cagrTitle}>CAGR</Text>
          <Text style={styles.cagrSubtitle}>(Annualized return)</Text>
        </View>
        <TouchableHighlight
          style={styles.yearButton}
          underlayColor="#f3e5f5"
          onPress={() => Alert.alert("3 years selected!")}
        >
          <View style={styles.yearButtonContent}>
            <Text style={styles.yearButtonText}>3 years</Text>
            <Icon name="angle-down" color="purple" size={20} />
          </View>
        </TouchableHighlight>
      </View>

      {/* CAGR Value */}
      <Text style={styles.cagrValue}>+23.98 %</Text>

      {/* Min Amount, Rebalance Frequency, Risk Profile */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Min.Amount</Text>
          <Text style={styles.infoValue}>₹12,000</Text>
        </View>
        <View style={styles.infoBox1}>
          <Text style={styles.infoTitle}>Rebalance Frequency</Text>
          <Text style={styles.infoValue}>Weekly</Text>
        </View>
        <View style={[styles.infoBox, { marginRight: 5 }]}>
          <Text style={styles.infoTitle}>Risk Profile</Text>
          <Text style={styles.infoValue}>Low Risk</Text>
        </View>
      </View>

      <View style={styles.hr} />
    </>
  );

  const footerContent = () => (
    <>
      {/* PortfolioVsNifty Section */}
      <PortfolioVsNifty />
      <View style={styles.hr} />

      {/* Holdings Distribution */}
      <HoldingsDistribution />
      <View style={styles.hr} />

      {/* Stocks */}
      <Stocks />
      <View style={styles.hr} />

      <About />
    </>
  );

  return (
    <SubscriptionProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]} // Empty data as the list is only used for non-list content
        keyExtractor={() => "dummy"} // Avoid key errors
        ListHeaderComponent={headerContent}
        ListFooterComponent={footerContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
      <BottomBar />
    </SafeAreaView>
    </SubscriptionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 16,
  },
  shareButton: {
    marginRight: 2,
    padding: 4,
    borderRadius: 4,
  },
  icon: {
    marginRight: 10,
    width: 60,
    height: 60,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.7,
    color: "#555",
  },
  descriptionContainer: {
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 3,
    borderRadius: 4,
  },
  touchableContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginRight: 4,
  },
  cagrContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  cagrTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cagrTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  cagrSubtitle: {
    fontSize: 15,
    color: "#555",
    opacity: 0.7,
    marginLeft: 8,
  },
  yearButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 36,
    minWidth: 100,
  },
  yearButtonText: {
    fontSize: 16,
    color: "purple",
    fontWeight: "600",
    marginRight: 8,
  },
  yearButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
  },
  cagrValue: {
    fontSize: 25,
    fontWeight: "600",
    color: "#4CAF50",
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  infoBox1: {
    flex: 1.4,
  },
  infoTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  hr: {
    width: "95%",
    borderBottomWidth: 0.4,
    borderBottomColor: "#000",
    marginVertical: 30,
    alignSelf: "center",
  },
});
