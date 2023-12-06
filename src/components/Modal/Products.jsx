import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { IconButton, Modal, Portal } from "react-native-paper";
import { Sizes } from "../../utils/theme";

const Products = ({ visible, setVisible, titles, handleAction }) => {
	const hideModal = () => setVisible(false);
	const containerStyle = {
		backgroundColor: "white",
		padding: 20,
	};
	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={hideModal}
				contentContainerStyle={containerStyle}
				scrollable={true}
			>
				<View>
					<Text style={{ fontSize: 20, fontWeight: "700" }}>Products</Text>
					<View style={{ marginTop: 30, marginBottom: 30 }}>
						<ScrollView showsVerticalScrollIndicator={false}>
							{titles &&
								titles.map((title, index) => (
									<TouchableOpacity
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											width: "100%",
											backgroundColor: "#efefef",
											borderRadius: 10,
											marginTop: 5,
											paddingLeft: 20,
											paddingVertical: 5,
										}}
										key={index}
										onPress={() => handleAction(title)}
									>
										<Text
											style={{
												fontSize: 20,
												fontWeight: "400",
												marginVertical: 5,
											}}
										>
											{title}
										</Text>
										<IconButton icon={"radiobox-blank"} iconColor="gray" />
									</TouchableOpacity>
								))}
						</ScrollView>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

export default Products;

const styles = StyleSheet.create({});
