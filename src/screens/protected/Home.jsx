import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Sizes } from "../../utils/theme";
import Footer from "../../components/Footer";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableOpacity } from "react-native";
const Home = () => {
	const [scanned, setScanned] = useState(true);
	const handleBarVisible = async () => {
		const { status: existingStatus } =
			await BarCodeScanner.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Need camera roll permissions to make this work!");
			return;
		}
		setScanned(false);
	};
	const handleBarCodeScanned = ({ type, data }) => {
		console.log("Data", data);
		console.log("Type", type);
		setScanned(true);
	};
	return (
		<View style={styles.container}>
			{scanned ? (
				<View style={{ display: "flex", alignItems: "center" }}>
					<View style={styles.wrapper}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									gap: 10,
								}}
							>
								<View
									style={{
										backgroundColor: "#ffffff",
										padding: 10,
										height: 100,
										borderRadius: 10,
										flex: 1,
									}}
								>
									<View
										style={{
											display: "flex",
											alignItems: "center",
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text>Total Points</Text>
									</View>
									<View
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Text
											style={{
												fontWeight: "700",
												fontSize: 48,
											}}
										>
											0
										</Text>
									</View>
								</View>
								<View
									style={{
										backgroundColor: "#ffffff",
										padding: 10,
										height: 100,
										borderRadius: 10,
										flex: 1,
									}}
								>
									<View
										style={{
											display: "flex",
											alignItems: "center",
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text>Points Used</Text>
									</View>
									<View
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Text
											style={{
												fontWeight: "700",
												fontSize: 48,
											}}
										>
											0
										</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									marginTop: 10,
									backgroundColor: "#ffffff",
									paddingHorizontal: 10,
									height: 100,
									borderRadius: 10,
									width: "100%",
								}}
							>
								<View style={{ marginTop: 10 }}>
									<Text>Remaining Points</Text>
								</View>
								<View
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontWeight: "700",
											fontSize: 48,
										}}
									>
										0
									</Text>
								</View>
							</View>
							<View>
								<View
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										marginTop: 30,
									}}
								>
									<TouchableOpacity
										onPress={handleBarVisible}
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											borderWidth: 0,
											borderColor: "transparent",
											shadowColor: "#000",
											shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.25,
											shadowRadius: 3.84,
											elevation: 5,
											borderRadius: 100,
											padding: 50,
											height: 200,
											width: 200,
											backgroundColor: "#ffffff",
										}}
									>
										<Text>Scan Code</Text>
									</TouchableOpacity>
								</View>
							</View>
						</ScrollView>
					</View>
					<View style={styles.footer}>
						<Footer />
					</View>
				</View>
			) : (
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
					// barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
				/>
			)}
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 50,
		marginBottom: 30,
	},
	wrapper: {
		flex: 1,
		width: Sizes.width - 20,
		marginTop: 10,
		paddingBottom: 10,
	},
	footer: {
		width: Sizes.width,
	},
});
