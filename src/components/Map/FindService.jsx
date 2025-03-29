import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { useRef } from "react";
import { useState } from "react";
import { Sizes, colors } from "../../utils/theme";
import { Button, IconButton } from "react-native-paper";
import * as Location from "expo-location";

const FindService = ({ location, handleChange }) => {
	const mapView = useRef();
	const initialRegion = {
		latitude: location.currentLocation.lat || 31.4809172029034,
		longitude: location.currentLocation.lng || 74.32941843381401,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};
	const [region, setRegion] = useState({
		latitude: initialRegion.latitude,
		longitude: initialRegion.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const getPermissions = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			alert("Please grant location permissions");
			return;
		}
		let currentLocation = await Location.getCurrentPositionAsync({});
		getAddress(
			currentLocation.coords.latitude,
			currentLocation.coords.longitude
		);
	};
	const getAddress = async (lat, lng) => {
		const pos = { lat, lng };
		const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
			longitude: lng,
			latitude: lat,
		});
		const city = reverseGeocodedAddress[0]?.city;
		const upperCaseCity = city?.toUpperCase();
		const address =
			reverseGeocodedAddress[0]?.name +
			", " +
			reverseGeocodedAddress[0]?.city +
			", " +
			reverseGeocodedAddress[0]?.country;
		handleChange(address, upperCaseCity, pos);
		setRegion({
			...region,
			latitude: lat,
			longitude: lng,
		});

		if (mapView.current) {
			mapView.current.animateToRegion(
				{
					latitude: lat,
					longitude: lng,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				},
				1000
			);
		}
	};

	const onRegionChange = (region) => {
		setRegion(region);
	};
	return (
		<View>
			<GooglePlacesAutocomplete
				placeholder="Search Location"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance",
				}}
				GooglePlacesDetailsQuery={{
					fields: ["formatted_address", "geometry"],
				}}
				textInputProps={{
					placeholderTextColor: "gray",
				}}
				onPress={(data, details = null) => {
					if (details == null) {
						return;
					}
					let city;
					for (let i = 0; i < details.address_components.length; i++) {
						for (
							let j = 0;
							j < details.address_components[i].types.length;
							j++
						) {
							switch (details.address_components[i].types[j]) {
								case "locality":
									city = details.address_components[i].long_name;
									break;
							}
						}
					}
					const upperCaseCity = city?.toUpperCase();
					const address = details.formatted_address;
					const pos = {
						lat: details.geometry.location.lat,
						lng: details.geometry.location.lng,
					};
					handleChange(address, upperCaseCity, pos);
					setRegion({
						...region,
						latitude: pos.lat,
						longitude: pos.lng,
					});

					if (mapView.current) {
						mapView.current.animateToRegion(
							{
								latitude: pos.lat,
								longitude: pos.lng,
								latitudeDelta: 0.01,
								longitudeDelta: 0.01,
							},
							1000
						);
					}
				}}
				query={{
					key: "",
					language: "en",
					types: "establishment",
					radius: 8000,
					location: `${initialRegion?.latitude},${initialRegion?.longitude}`,
				}}
				styles={{
					container: {
						flex: 0,
						zIndex: 1,
						width: "100%",
						position: "relative",
						marginVertical: 10,
						borderRadius: 5,
					},
					textInput: {
						fontSize: 15,
						paddingHorizontal: 10,
						borderWidth: 1,
						borderColor: "#000000",
					},
					poweredContainer: {
						display: "none",
					},
					listView: {
						// paddingHorizontal: 5,
						position: "absolute",
						top: 50,
					},
					row: {
						marginVertical: 2,
						borderBottomColor: `${colors.primary}`,
						backgroundColor: "yellow",
						borderBottomWidth: 2,
					},
				}}
			/>
		</View>
	);
};

export default FindService;

const styles = StyleSheet.create({});
