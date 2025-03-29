import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/protected/Home";
import About from "../../screens/protected/About";
import Contact from "../../screens/protected/Contact";
import Privacy from "../../screens/protected/Privacy";
import Booking from "../../screens/protected/Booking";
import Menu from "../../screens/protected/NewBooking/Menu";
import Payment from "../../screens/protected/NewBooking/Payment";

const Stack = createNativeStackNavigator();
const index = () => {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name="Home"
				component={Home}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="About"
				component={About}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="Booking"
				component={Booking}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="Menu"
				component={Menu}
				options={() => ({
					headerShown: true,
					headerTitle: "New Booking",
				})}
			/>
			<Stack.Screen
				name="Payment"
				component={Payment}
				options={() => ({
					headerShown: true,
					headerTitle: "Payment",
				})}
			/>
			<Stack.Screen
				name="Contact"
				component={Contact}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="Privacy"
				component={Privacy}
				options={() => ({
					headerShown: false,
				})}
			/>
		</Stack.Navigator>
	);
};

export default index;
