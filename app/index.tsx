import { View,SafeAreaView,Text } from "react-native";
import React from "react";
import { Link ,router} from "expo-router";

const Welcome = () => {
    return (
        <SafeAreaView>
            <View className="bg-green-500 h-48">
            <Text className="text-red-600 text-2xl">welcom to app </Text>
            <Link href="/(auth)/sign-up" className="text-blue-600">Sign In</Link>
            <Link href="/home" className="text-red-600">Sign go to home</Link>
            </View>
        </SafeAreaView>
    );
}

export default Welcome;