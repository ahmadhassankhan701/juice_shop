import { StyleSheet, Text, View } from "react-native";
import React from "react";

const About = () => {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20 }}>About</Text>
		</View>
	);
};

export default About;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
});
