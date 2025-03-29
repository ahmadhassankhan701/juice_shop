import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Privacy = () => {
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20 }}>Privacy</Text>
		</View>
	);
};

export default Privacy;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
});
