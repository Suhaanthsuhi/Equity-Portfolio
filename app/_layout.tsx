import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "back" }}
      />
    </Stack>
  );
};

export default RootLayout;