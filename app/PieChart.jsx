import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function HoldingsDistribution() {
  const holdingsData = [
    {
      name: "Largecap",
      population: 50,
      color: "#8d79f6", // Green
    },
    {
      name: "Midcap",
      population: 25,
      color: "#febd38", // Purple
    },
    {
      name: "Smallcap",
      population: 25,
      color: "#7ad3ff", // Orange
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Holdings Distribution</Text>
      <View style={styles.holdingsContainer}>
        {/* Pie Chart Container */}
        <View style={styles.pieChartContainer}>
          <PieChart
            data={holdingsData}
            width={screenWidth * 0.9} // Adjust width to be smaller
            height={200} // Fixed height
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            hasLegend={false}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </View>

        {/* Legend Container */}
        <View style={styles.legendContainer}>
          {holdingsData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColorBox,
                  { borderLeftWidth: 5, borderLeftColor: item.color },
                ]}
              />
              <View style={styles.legendCol}>
                <Text style={styles.legendText}>{item.name}</Text>
                <Text style={{ fontWeight: "bold" }}>{item.population}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 16,
    marginBottom: 16,
  },
  holdingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  pieChartContainer: {
    width: "58%",
    alignItems: "center",
    marginLeft: 20,
  },
  legendContainer: {
    width: "40%",
    marginLeft: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendColorBox: {
    height: 40,
    marginRight: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 15,
    marginBottom: 3,
    color: "#333",
  },
  legendCol: {
    flexDirection: "column",
  },
});
