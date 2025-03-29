import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
	query,
	collection,
	where,
	orderBy,
	onSnapshot,
	updateDoc,
	doc,
} from "firebase/firestore";
import { Button, IconButton } from "react-native-paper";
import { db } from "../../../firebase";
import { Image } from "react-native";
import { Sizes } from "../../utils/theme";
import BookingCard from "../../components/Card/BookingCard";
import Footer from "../../components/Footer";
import { AuthContext } from "../../context/AuthContext";
const Booking = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [bookings, setBookings] = useState(null);
	useEffect(() => {
		const getBookings = async () => {
			try {
				setLoading(true);
				const bookRef = query(
					collection(db, "Bookings"),
					where("id", "==", state.user.id),
					orderBy("createdAt", "desc")
				);
				onSnapshot(bookRef, (querySnapshot) => {
					if (querySnapshot.size == 0) {
						setLoading(false);
						setBookings(null);
					} else {
						const data = querySnapshot.docs.map((doc) => ({
							key: doc.id,
							...doc.data(),
						}));
						setBookings(data);
						setLoading(false);
					}
				});
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		state && state.user && getBookings();
	}, [state && state.user]);
	const handleCancel = async (docId) => {
		try {
			setLoading(true);
			await updateDoc(doc(db, "Bookings", docId), {
				status: "cancelled",
			});
			setLoading(false);
			alert("Booking Cancelled");
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
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
			<View style={{ display: "flex", alignItems: "center" }}>
				{/* <Text>{JSON.stringify(state.user.id, null, 4)}</Text> */}
				<View style={styles.wrapper}>
					<View
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexDirection: "row",
							width: "100%",
							alignSelf: "center",
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "700",
							}}
						>
							My Bookings
						</Text>
						<IconButton
							size={30}
							icon={"plus-box-outline"}
							onPress={() => navigation.navigate("Menu")}
						/>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							flexGrow: 1,
						}}
					>
						{bookings ? (
							bookings.map((booking) => (
								<View key={booking.key}>
									<BookingCard
										status={booking.status}
										data={booking?.products}
										docId={booking.key}
										handleCancel={handleCancel}
									/>
								</View>
							))
						) : (
							<View
								style={{
									flex: 1,
								}}
							>
								<View
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										flex: 1,
									}}
								>
									<Image
										source={require("../../assets/basket.png")}
										style={{ width: 80, height: 80 }}
									/>
									<Text
										style={{
											fontSize: 23,
											fontWeight: "700",
											marginVertical: 20,
											letterSpacing: 0.5,
										}}
									>
										No Bookings Found
									</Text>
									<Button
										buttonColor="#000"
										textColor="#fff"
										contentStyle={{
											paddingHorizontal: 10,
										}}
										labelStyle={{
											fontSize: 15,
											fontWeight: "700",
										}}
										onPress={() => navigation.navigate("Menu")}
									>
										Book Now
									</Button>
								</View>
							</View>
						)}
					</ScrollView>
				</View>
				<View style={styles.footer}>
					<Footer />
				</View>
			</View>
		</View>
	);
};

export default Booking;

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
		paddingBottom: 10,
	},
	footer: {
		width: Sizes.width,
	},
});
