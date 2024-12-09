import PhotoPreviewSection from "@/components/PhotoPreviewSection";
import { AntDesign } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera() {
  const [facing, setFacing] = useState("back"); // CameraType is inferred here
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null); // Proper typing for the cameraRef

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takedPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  if (photo)
    return (
      <PhotoPreviewSection
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
      />
    );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
  {/* Guided View Area */}
  <View style={styles.guideArea} />

  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
      <AntDesign name="retweet" size={44} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
      <AntDesign name="camera" size={44} color="black" />
    </TouchableOpacity>
  </View>
</CameraView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  guideArea: {
    position: "absolute",
    top: "10%",
    left: "10%", 
    width: "80%",
    height: "70%",
    borderWidth: 2,
    borderColor: "white", // Use your preferred color for the guide
    borderRadius: 10, // Optional for rounded corners
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent overlay
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
