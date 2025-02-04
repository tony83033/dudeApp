import React from "react";
import { View } from "react-native";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import ProductCard from "../ProductCard";
import { router } from 'expo-router';
const ProductOfTheDay = ()=>{
    const IMAGES = {
        masala: { uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" },
        sugar: { uri: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=500&q=80" },
        salt: { uri: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80" },
        atta: { uri: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
        rice: { uri: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80" },
        oil: { uri: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80" },
        fruits: { uri: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=80" },
      };

      const handleProductPress = (productId: string) => {
          router.push(`/product/${productId}`);
        };
      
       
    return (
        <>
          <View className="p-4">
                  <Card className="bg-yellow-50 p-4 rounded-lg">
                    <Text className="text-lg font-bold">Prodect's of the Day</Text>
                    <View className="flex-row mt-4 justify-between">
                      <ProductCard
                        image={IMAGES.sugar}
                        name="Sugar"
                        price="₹51/kg"
                        onPress={() => handleProductPress('sugar')}
                      />
                      <ProductCard
                        image={IMAGES.salt}
                        name="Salt"
                        price="₹9/kg"
                        onPress={() => handleProductPress('salt')}
                      />
                    </View>
                  </Card>
                </View>
        </>
    )

}
export default ProductOfTheDay;