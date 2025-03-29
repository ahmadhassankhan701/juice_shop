import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Sizes } from "../../utils/theme";
import Footer from "../../components/Footer";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Image } from "react-native";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { QrCodeSvg } from "react-native-qr-svg";
const Home = () => {
	const { state } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [pointsData, setPointsData] = useState(null);
	const [scanned, setScanned] = useState(true);
	useEffect(() => {
		const getUserPoints = async () => {
			try {
				setLoading(true);
				const pointsRef = doc(db, "Points", state.user.id);
				onSnapshot(pointsRef, (docSnap) => {
					if (docSnap.exists()) {
						setLoading(false);
						setPointsData(docSnap.data());
					} else {
						setLoading(false);
						setPointsData(null);
					}
				});
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		state && state.user && getUserPoints();
	}, [state && state.user]);

	return (
		<View style={styles.container}>
			{loading && (
				<View
					style={{
						position: "absolute",
						backgroundColor: "#000000",
						opacity: 0.5,
						zIndex: 999,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../../assets/loader.gif")}
						style={{
							alignSelf: "center",
							width: 200,
							height: 200,
						}}
					/>
				</View>
			)}
			{/* <Text>{JSON.stringify(pointsData, null, 4)}</Text> */}
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
										{pointsData && pointsData.total ? pointsData.total : 0}
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
										{pointsData && pointsData.used ? pointsData.used : 0}
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
									{pointsData && pointsData.remaining
										? pointsData.remaining
										: 0}
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
									width: "100%",
								}}
							>
								{pointsData && (
									<View>
										{/* <Barcode
											value={`${state.user.id},${pointsData.total},${pointsData.used},${pointsData.remaining}`}
											format="CODE128"
											width={1.5}
											height={80}
											textStyle={{
												fontSize: 12,
												fontWeight: "700",
											}}
											textMargin={2}
											backgroundColor="#ffffff"
											lineColor="#000000"
											lineWidth={1}
										/> */}
										<View style={{ alignItems: "center" }}>
											<QrCodeSvg
												value={`${state.user.id},${pointsData.total},${pointsData.used},${pointsData.remaining}`}
												frameSize={200}
											/>
										</View>
									</View>
								)}
							</View>
						</View>
					</ScrollView>
				</View>
				<View style={styles.footer}>
					<Footer />
				</View>
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 50,
		marginBottom: 15,
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
