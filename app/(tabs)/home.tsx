import react from "react";

import { View, Text, Button,SafeAreaView } from "react-native";
import { signOut } from "@/lib/handleAuth";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";
const Home = () => {
    const { loading, isLogged } = useGlobalContext();
    if (!loading && isLogged) return <Redirect href="/" />;
  return (
    <SafeAreaView>
      <Text className="text-red-500 text-2xl">Home</Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
}

export default Home;