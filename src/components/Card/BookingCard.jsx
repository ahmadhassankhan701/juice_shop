import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Button, IconButton } from "react-native-paper";

const BookingCard = ({ data, status, handleCancel, docId }) => {
	let TotalCost = 0;
	let TotalPoints = 0;
	if (data && data.length > 0) {
		data.map((item) => {
			TotalCost += item.price * item.quantity;
			TotalPoints += item.points * item.quantity;
		});
	}
	return (
		<View
			style={{
				width: "100%",
				backgroundColor: "lightgray",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				borderRadius: 10,
				marginTop: 10,
			}}
		>
			<View
				style={{
					width: "30%",
					marginLeft: 5,
				}}
			>
				<Image
					source={require("../../../assets/logo.png")}
					style={{
						width: "100%",
						height: 100,
						borderRadius: 10,
					}}
				/>
				{status && (
					<Text
						style={[
							{
								fontSize: 15,
								fontWeight: "700",
								marginTop: 5,
								textAlign: "center",
							},
							{
								color:
									status === "pending"
										? "blue"
										: status === "ready"
										? "orange"
										: status === "cancelled"
										? "red"
										: "green",
							},
						]}
					>
						{status === "pending"
							? "In Progress"
							: status === "ready"
							? "Order Ready"
							: status === "cancelled"
							? "Cancelled"
							: "Complete"}
					</Text>
				)}
				{status && status === "pending" && (
					<IconButton
						icon={"delete"}
						size={20}
						iconColor="white"
						containerColor="red"
						mode="contained"
						style={{ alignSelf: "center" }}
						onPress={() => handleCancel(docId)}
					/>
				)}
			</View>
			<View style={{ width: "70%", padding: 10 }}>
				{data &&
					data.map((item, index) => (
						<View key={index}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "700",
								}}
							>
								{item.title}
							</Text>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "400",
									marginTop: 5,
								}}
							>
								Size : {item.size}
							</Text>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "400",
									marginTop: 5,
								}}
							>
								Points: {item.points}
							</Text>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "700",
										marginTop: 5,
										color: "red",
									}}
								>
									{item.price}
								</Text>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "700",
										marginTop: 5,
									}}
								>
									x {item.quantity}
								</Text>
							</View>
						</View>
					))}
				<View
					style={{
						display: "flex",
						alignItems: "flex-end",
					}}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "700",
							marginTop: 5,
							color: "red",
						}}
					>
						Total Price: {TotalCost}
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "700",
							marginTop: 5,
							color: "red",
						}}
					>
						Total Points: {TotalPoints}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default BookingCard;

const styles = StyleSheet.create({});
