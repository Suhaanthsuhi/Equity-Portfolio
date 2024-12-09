import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, User!</Text>
      <Link href="/EquityPortfolio" style={styles.link}>
        <Text style={styles.linkText}>Go to Equity portfolio</Text>
      </Link>
      {/* Camera Button */}
      <Link href="/Camera" style={styles.cameraButton}>
        <Text style={styles.buttonText}>Open camera</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "dodgerblue",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  cameraButton: {
    backgroundColor: "dodgerblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
