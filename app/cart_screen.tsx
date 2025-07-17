// app/cart_screen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import imageMap from './imageMap'; // 🔁 Importamos el mapa de imágenes
import { RootStackParamList } from './navigation/navigation';

type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

const initialCart: Product[] = [
    {
        id: '1',
        name: 'Tocobo Sunscreen',
        price: 15.99,
        quantity: 2,
        image: 'prod1.jpg', // nombre del archivo de imagen
    },
    {
        id: '2',
        name: 'Tocobo Lip Plumper',
        price: 18.99,
        quantity: 1,
        image: 'prod2.jpg',
    },
];

const CartScreen = () => {
    const [cartItems, setCartItems] = useState<Product[]>(initialCart);
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const increment = (id: string) => {
        setCartItems(prev =>
        prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
        );
    };

    const decrement = (id: string) => {
        setCartItems(prev =>
        prev.map(item =>
            item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        );
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.item}>
        <Image
            source={imageMap[item.image]} // 🔁 Usamos el mapa de imágenes
            style={styles.image}
        />
        <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <View style={styles.quantityBox}>
            <TouchableOpacity
                onPress={() => decrement(item.id)}
                style={styles.qtyButton}
            >
                <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
                onPress={() => increment(item.id)}
                style={styles.qtyButton}
            >
                <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Shopping Cart</Text>
        <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 120 }}
        />
        <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => navigation.navigate('ConfirmBill')}
            >
            <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

export default CartScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 24,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
        image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    price: {
        fontSize: 14,
        color: '#777',
        marginVertical: 4,
    },
    quantityBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    qtyButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#EEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 18,
        fontWeight: '600',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6',
    },
    totalText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    confirmButton: {
        backgroundColor: '#7A4E24',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
});
