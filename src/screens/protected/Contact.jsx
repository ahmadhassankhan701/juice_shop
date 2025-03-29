import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Contact = () => {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20 }}>Contact</Text>
		</View>
	);
};

export default Contact;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
});
