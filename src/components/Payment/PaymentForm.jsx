import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { CardField } from "@stripe/stripe-react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Sizes, colors } from "../../utils/theme";
import { Button } from "react-native-paper";

const PaymentForm = ({
	email,
	setEmail,
	amount,
	setAmount,
	setCardDetails,
	handlePayPress,
}) => {
	return (
		<View>
			<View>
				<TextInput
					autoCapitalize="none"
					placeholder="E-mail *"
					keyboardType="email-address"
					onChange={(value) => setEmail(value.nativeEvent.text)}
					value={email}
					style={styles.input}
				/>
				<TextInput
					placeholder="Amount (usd) *"
					keyboardType="numeric"
					onChange={(value) => setAmount(value.nativeEvent.text)}
					value={amount}
					style={styles.input}
				/>
				<CardField
					postalCodeEnabled={false}
					placeholder={{
						number: "4242 4242 4242 4242",
					}}
					cardStyle={styles.card}
					style={styles.cardContainer}
					onCardChange={(cardDetails) => {
						setCardDetails(cardDetails);
					}}
				/>
				<Button
					onPress={handlePayPress}
					// disabled={loading}
					textColor="#ffffff"
					style={{
						backgroundColor: colors.primary,
						borderRadius: 10,
					}}
				>
					Pay Now
				</Button>
			</View>
		</View>
	);
};
export default PaymentForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
	},
	wrapper: {
		width: Sizes.width - 20,
	},
	input: {
		backgroundColor: "#ffffff",
		borderRadius: 8,
		fontSize: 20,
		height: 60,
		padding: 10,
		marginVertical: 10,
	},
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 10,
	},
	cardContainer: {
		height: 60,
		marginVertical: 20,
	},
});
