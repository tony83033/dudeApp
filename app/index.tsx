import { View, SafeAreaView, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Welcome = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView className="flex-1">
      {/* Gradient Background */}
      <LinearGradient
        colors={["#6EE7B7", "#3B82F6"]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 justify-center items-center"
        style={{ width, height }}
      >
      
        <View className="px-6 w-full">
    
          <View className="items-center mb-6">
            <Text className="text-white text-6xl font-bold">🛍️</Text> 
          </View>

          {/* Welcome Message */}
          <Text className="text-white text-4xl font-bold text-center mb-4">
            Welcome to Dude!
          </Text>
          <Text className="text-white text-lg text-center mb-8">
            Your one-stop destination to buy and sell anything. Discover amazing deals and connect with sellers worldwide.
          </Text>

          
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up")}
            className="bg-white py-3 rounded-lg shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-green-600 text-lg font-semibold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Welcome;