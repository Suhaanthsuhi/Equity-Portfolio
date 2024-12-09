import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;

export default function PortfolioVsNifty() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1Y");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState({ portfolio: 0, nifty: 0 });

  const options = ["3M", "6M", "1Y", "3Y", "MAX", "SIP"];
  const dropDowns = ["Stock 1", "Stock 2", "Stock 3"]

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        data: [128, 125, 130, 129, 135, 138, 134, 140, 145], // Portfolio prices with realistic fluctuations
        color: () => "#800080", // Purple color for portfolio
        strokeWidth: 2,
      },
      {
        data: [122, 120, 118, 123, 125, 127, 124, 128, 130], // Nifty 50 prices with realistic fluctuations
        color: () => "#008000", // Green color for Nifty 50
        strokeWidth: 2,
      },
    ],
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const closeDropdown = () => setDropdownVisible(false);

  const handleDataPointClick = (data) => {
    const { index, value } = data;

    // Calculate x and y positions
    const xPos = Math.min(
      index * (screenWidth / chartData.labels.length) + 16,
      screenWidth - 150 // Ensure tooltip stays within screen width
    );
    const yPos = Math.max(220 - value, 0); // Prevent tooltip from going above graph

    setTooltipPosition({ x: xPos, y: yPos });
    setTooltipData({
      portfolio: chartData.datasets[0].data[index],
      nifty: chartData.datasets[1].data[index],
    });

    setShowTooltip(true);

    // Hide tooltip after 5 seconds
    setTimeout(() => setShowTooltip(false), 6000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>This portfolio vs </Text>
          <TouchableOpacity onPress={toggleDropdown} style={styles.linkWrapper}>
            <Text style={styles.link}>Nifty 50</Text>
            <Icon name="angle-down" size={16} color="#8C3CC0" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal */}
        <Modal
          transparent={true}
          visible={dropdownVisible}
          animationType="fade"
          onRequestClose={closeDropdown}
        >
          <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={styles.modalOverlay}>
              <View style={styles.dropdownMenu}>
                {dropDowns.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedOption(option);
                      closeDropdown();
                    }}
                  >
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Portfolio and Nifty Prices */}
        <View style={styles.pricesRow}>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceLabel, { color: "#9A42D3" }]}>
              This Portfolio
            </Text>
            <Text style={styles.priceValue}>₹128</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceLabel, { color: "#E5AC59" }]}>
              Nifty 50
            </Text>
            <Text style={styles.priceValue}>₹122</Text>
          </View>
        </View>
      </View>

      {/* Line Chart */}
      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "3",
            stroke: "#800080",
          },
        }}
        bezier
        style={styles.graph}
        onDataPointClick={handleDataPointClick}
      />

      {/* Tooltip */}
      {showTooltip && (
        <View
          style={[
            styles.tooltip,
            {
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            },
          ]}
        >
          <Text style={styles.tooltipText}>
            Portfolio: ₹{tooltipData.portfolio}
          </Text>
          <Text style={styles.tooltipText}>Nifty 50: ₹{tooltipData.nifty}</Text>
        </View>
      )}

      {/* Options Buttons */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.optionButtonSelected,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: 16,
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 5,
    color: "#333",
  },
  linkWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    fontSize: 18,
    color: "#8C3CC0",
    fontWeight: "500",
    textDecorationLine: "underline",
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  pricesRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 15,
    marginLeft: 16,
    marginRight: 16,
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 40,
  },
  priceLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  graph: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  optionButtonSelected: {
    borderColor: "#8C3CC0",
    backgroundColor: "#f5ecfb",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  optionTextSelected: {
    color: "#8C3CC0",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tooltipText: {
    fontSize: 14,
    color: "#333",
  },
});
