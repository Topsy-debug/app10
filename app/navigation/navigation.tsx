// app/navigation/navigation.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountInfo from '../accountInfo';
import CartScreen from '../cart_screen';
import ConfirmBill from '../confirm_bill';

export type RootStackParamList = {
    Cart: undefined;
    ConfirmBill: undefined;
    AccountInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Cart">
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="ConfirmBill" component={ConfirmBill} />
            <Stack.Screen name="AccountInfo" component={AccountInfo} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}
