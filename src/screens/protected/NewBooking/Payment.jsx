import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Sizes } from "../../../utils/theme";
import { Button } from "react-native-paper";
import { Image } from "react-native";
import BookingCard from "../../../components/Card/BookingCard";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";

const Payment = ({ route, navigation }) => {
	const { cartData, uid, userName } = route.params;
	const [actionLoading, setActionLoading] = useState(false);
	let TotalCost = 0;
	let TotalPoints = 0;
	if (cartData && cartData.products.length > 0) {
		cartData.products.map((item) => {
			TotalCost += item.price * item.quantity;
			TotalPoints += item.points * item.quantity;
		});
	}
	const ConfirmBooking = async (data) => {
		const bookData = {
			products: cartData.products,
			price: TotalCost,
			points: TotalPoints,
			mode: cartData.mode,
			address: cartData.address,
			status: "pending",
			id: uid,
			userName: userName,
			createdAt: new Date(),
		};
		try {
			setActionLoading(true);
			const bookRef = collection(db, "Bookings");
			await addDoc(bookRef, bookData);
			setActionLoading(false);
			navigation.navigate("Booking");
		} catch (error) {
			setActionLoading(false);
			alert("Something went wrong");
			console.log(error);
		}
	};
	return (
		<View style={styles.container}>
			{actionLoading && (
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
						source={require("../../../assets/loader.gif")}
						style={{
							alignSelf: "center",
							width: 200,
							height: 200,
						}}
					/>
				</View>
			)}
			<View style={styles.wrapper}>
				{cartData && cartData.products && cartData.products.length > 0 && (
					<View>
						<BookingCard data={cartData.products} />
					</View>
				)}
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginTop: 20,
						gap: 5,
						alignSelf: "center",
					}}
				>
					<Button
						mode="contained"
						buttonColor="orange"
						onPress={() => navigation.goBack()}
					>
						Back
					</Button>
					<Button
						mode="contained"
						buttonColor="red"
						onPress={() => navigation.navigate("Home")}
					>
						Cancel
					</Button>
					<Button mode="contained" buttonColor="green" onPress={ConfirmBooking}>
						Confirm
					</Button>
				</View>
			</View>
		</View>
	);
};

export default Payment;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	wrapper: {
		flex: 1,
		width: Sizes.width - 20,
	},
});
