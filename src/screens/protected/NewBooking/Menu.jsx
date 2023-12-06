import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Sizes } from "../../../utils/theme";
import { Button, IconButton } from "react-native-paper";
import BookingCard from "../../../components/Card/BookingCard";
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { Image } from "react-native";
import Products from "../../../components/Modal/Products";
import ProductSizeDetails from "../../../components/Modal/ProductSizeDetails";
import * as Location from "expo-location";
import haversineDistance from "haversine-distance";
import { AuthContext } from "../../../context/AuthContext";
const Menu = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [productNames, setProductNames] = useState(null);
	const [productSizes, setProductSizes] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [modalVisible, setModalVisible] = useState(false);
	const [sizeModalVisible, setSizeModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({
		title: "",
		size: "",
		quantity: "",
		price: "",
		points: "",
	});
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const getShopItems = async () => {
			try {
				setLoading(true);
				const itemsRef = query(collection(db, "ShopItems"));
				onSnapshot(itemsRef, (querySnapshot) => {
					if (querySnapshot.size == 0) {
						setLoading(false);
						setProductNames(null);
						setProductSizes(null);
					} else {
						setLoading(false);
						let items = [];
						querySnapshot.forEach((doc) => {
							items.push(doc.data().title);
						});
						setProductNames(items);
					}
				});
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};

		getShopItems();
	}, []);
	const handleNameAction = async (title) => {
		try {
			setModalVisible(false);
			setSelectedProduct({
				...selectedProduct,
				title: title,
				size: "",
				points: "",
				price: "",
			});
			setLoading(true);
			const sizesRef = query(
				collection(db, "ShopItems"),
				where("title", "==", title)
			);
			const querySnapshot = await getDocs(sizesRef);
			if (querySnapshot.size == 0) {
				setLoading(false);
				setProductSizes(null);
			} else {
				setLoading(false);
				const pricing = querySnapshot.docs[0].data().pricing;
				setProductSizes(pricing);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleSizeAction = (data) => {
		setSelectedProduct({
			...selectedProduct,
			size: data.size,
			price: data.price,
			points: data.points,
		});
		setSizeModalVisible(false);
	};
	const handleIncrement = () => {
		setQuantity(quantity + 1);
	};
	const handleDecrement = () => {
		if (quantity === 1) {
			alert("Quantity cannot be less than 1");
		} else {
			setQuantity(quantity - 1);
		}
	};
	const handleAddProduct = () => {
		if (
			selectedProduct.title === "" ||
			selectedProduct.size === "" ||
			selectedProduct.price === "" ||
			selectedProduct.points === ""
		) {
			alert("Please complete all details");
			return;
		}
		setSelectedProducts([
			...selectedProducts,
			{
				title: selectedProduct.title,
				size: selectedProduct.size,
				price: selectedProduct.price,
				points: selectedProduct.points,
				quantity: quantity,
			},
		]);
		setSelectedProduct({
			title: "",
			size: "",
			price: "",
			points: "",
		});
		setProductSizes(null);
		setQuantity(1);
		alert("Product added to cart");
	};
	const handleDelivery = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			alert("Please grant location permissions");
			return;
		}
		let currentLocation = await Location.getCurrentPositionAsync({});
		checkDistance(
			currentLocation.coords.latitude,
			currentLocation.coords.longitude
		);
	};
	const checkDistance = async (lat, lng) => {
		setLoading(true);
		let kmRange = 1 * 1000;
		let distance = haversineDistance(
			{
				latitude: "31.44422552800293",
				longitude: "74.25751611902803",
			},
			{
				latitude: lat,
				longitude: lng,
			}
		);
		if (distance <= kmRange) {
			const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
				longitude: lng,
				latitude: lat,
			});
			const address =
				reverseGeocodedAddress[0]?.name +
				", " +
				reverseGeocodedAddress[0]?.city +
				", " +
				reverseGeocodedAddress[0]?.country;
			const cartData = {
				products: selectedProducts,
				mode: "delivery",
				address: address,
			};
			setLoading(false);
			navigation.navigate("Payment", {
				cartData: cartData,
				uid: state && state.user && state.user.id,
				userName: state && state.user && state.user.name,
			});
		} else {
			setLoading(false);
			alert("Home Delivery Available in 1km radius only");
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
						source={require("../../../assets/loader.gif")}
						style={{
							alignSelf: "center",
							width: 200,
							height: 200,
						}}
					/>
				</View>
			)}
			<Products
				visible={modalVisible}
				setVisible={setModalVisible}
				titles={productNames}
				handleAction={handleNameAction}
			/>
			<ProductSizeDetails
				visible={sizeModalVisible}
				setVisible={setSizeModalVisible}
				titles={productSizes}
				handleAction={handleSizeAction}
			/>
			<View style={{ display: "flex", alignItems: "center" }}>
				{/* <Text>{JSON.stringify(productSizes, null, 4)}</Text> */}
				<View style={styles.wrapper}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<TouchableOpacity
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								borderWidth: 0,
								borderColor: "#fff",
								borderRadius: 20,
								paddingHorizontal: 10,
								backgroundColor: "#ffffff",
								height: 70,
								marginTop: 10,
							}}
							onPress={() => setModalVisible(true)}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "400",
								}}
							>
								{selectedProduct.title === ""
									? "Product Name"
									: selectedProduct.title}
							</Text>
							<IconButton icon={"chevron-down"} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								borderWidth: 0,
								borderColor: "#fff",
								borderRadius: 20,
								paddingHorizontal: 10,
								backgroundColor: "#ffffff",
								height: 70,
								marginTop: 10,
							}}
							onPress={() => {
								if (selectedProduct.title === "") {
									alert("Please select a product first");
								} else {
									if (productSizes === null) {
										alert("No sizes available for this product");
									} else {
										setSizeModalVisible(true);
									}
								}
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "400",
								}}
							>
								{selectedProduct.size === ""
									? "Product Size"
									: `Size:${selectedProduct.size} Price:${selectedProduct.price} Points:${selectedProduct.points}`}
							</Text>
							<IconButton icon={"chevron-down"} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								borderWidth: 0,
								borderColor: "#fff",
								borderRadius: 20,
								paddingHorizontal: 10,
								backgroundColor: "#ffffff",
								height: 70,
								marginVertical: 10,
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "400",
								}}
							>
								Product Quantity
							</Text>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<IconButton
									icon={"chevron-left"}
									mode="contained"
									containerColor="lightgray"
									iconColor="gray"
									style={{ borderRadius: 10 }}
									onPress={handleDecrement}
								/>
								<Text>{quantity}</Text>
								<IconButton
									icon={"chevron-right"}
									mode="contained"
									containerColor="lightgray"
									iconColor="gray"
									style={{ borderRadius: 10 }}
									onPress={handleIncrement}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleAddProduct}
							style={{
								height: 60,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 20,
								backgroundColor: "gray",
							}}
						>
							<Text style={{ color: "#fff" }}>Add Product</Text>
						</TouchableOpacity>
						{selectedProducts && selectedProducts.length > 0 && (
							<View>
								<View>
									<BookingCard data={selectedProducts} />
								</View>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										marginTop: 10,
										gap: 10,
									}}
								>
									<Button
										buttonColor="blue"
										textColor="#ffffff"
										onPress={handleDelivery}
									>
										Home Delivery
									</Button>
									<Button
										onPress={() => {
											const cartData = {
												products: selectedProducts,
												mode: "self",
												address: "",
											};
											navigation.navigate("Payment", {
												cartData: cartData,
												uid: state && state.user && state.user.id,
												userName: state && state.user && state.user.name,
											});
										}}
										buttonColor="green"
										textColor="#ffffff"
									>
										Next
									</Button>

									<Button
										buttonColor="red"
										textColor="#ffffff"
										onPress={() => setSelectedProducts([])}
									>
										Empty Cart
									</Button>
								</View>
							</View>
						)}
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

export default Menu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	wrapper: {
		flex: 1,
		width: Sizes.width - 20,
		paddingBottom: 20,
	},
});
