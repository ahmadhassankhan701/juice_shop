import { StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { Sizes, colors } from "../../utils/theme";

const InputText = ({ title, name, handleChange, value }) => {
	return (
		<TextInput
			label={""}
			placeholder={title}
			mode="outlined"
			style={{
				backgroundColor: "#ffffff",
				width: Sizes.width - 50,
				marginVertical: 10,
				fontSize: 12,
			}}
			theme={{ roundness: 10 }}
			outlineColor="transparent"
			activeOutlineColor={"transparent"}
			selectionColor={colors.desc}
			onChangeText={(text) => handleChange(name, text)}
			value={value}
			keyboardType={"default"}
		/>
	);
};

export default InputText;

const styles = StyleSheet.create({});
