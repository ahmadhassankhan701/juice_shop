import { StyleSheet, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import InputText from "../components/Input/InputText";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
const Login = () => {
	const { setState } = useContext(AuthContext);
	const [details, setDetails] = useState({
		name: "",
		phone: "",
	});
	const [loading, setLoading] = useState(false);
	const handleChange = async (name, value) => {
		setDetails({ ...details, [name]: value });
	};
	const handleSubmit = async () => {
		if (details.name == "" || details.phone == "") {
			alert("Please fill all the fields");
			return;
		}
		try {
			setLoading(true);
			const docRef = query(
				collection(db, "Users"),
				where("phone", "==", details.phone)
			);
			const docSnap = await getDocs(docRef);
			let addedUser = {};
			if (docSnap.size == 0) {
				const res = await addDoc(collection(db, "Users"), {
					name: details.name,
					phone: details.phone,
				});
				setLoading(false);
				addedUser = {
					name: details.name,
					phone: details.phone,
					id: res.id,
				};
				await SaveState(addedUser);
			} else {
				setLoading(false);
				addedUser = {
					name: details.name,
					phone: details.phone,
					id: docSnap.docs[0].id,
				};
				await SaveState(addedUser);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const SaveState = async (user) => {
		const stateData = { user };
		setState({
			user: stateData.user,
		});
		AsyncStorage.setItem("juice_auth", JSON.stringify(stateData));
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{
				flex: 1,
				alignItems: "center",
			}}
		>
			{loading && (
				<View
					style={{
						position: "absolute",
						backgroundColor: "#000000",
						opacity: 0.7,
						zIndex: 999,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../assets/loader.gif")}
						style={{
							alignSelf: "center",
							width: 200,
							height: 200,
						}}
					/>
				</View>
			)}
			<View style={{ marginTop: 20 }}>
				<ScrollView
					contentContainerStyle={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Avatar.Image
						size={100}
						style={{ marginBottom: 10 }}
						source={require("../../assets/logo.png")}
					/>
					<View>
						<InputText
							title={"Full Name"}
							name={"name"}
							handleChange={handleChange}
							value={details.name}
						/>
						<InputText
							title={"Phone"}
							name={"phone"}
							handleChange={handleChange}
							value={details.phone}
						/>
						<Button
							mode="contained"
							style={{
								backgroundColor: "#000000",
								color: "#ffffff",
								borderRadius: 10,
								marginVertical: 20,
							}}
							onPress={handleSubmit}
						>
							Submit
						</Button>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Login;

const styles = StyleSheet.create({});
