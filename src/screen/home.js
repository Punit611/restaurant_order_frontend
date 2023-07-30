// import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from './order';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import AddItemsForm from './AdditemForm';
const Stack = createNativeStackNavigator();

function Ordertab(navigator) {

  return (<OrderScreen {...navigator} />)
}

function Addtab(navigator) {

  return (<AddItemsForm {...navigator} />)
}




const HomeScreen = (navigator) => {
  console.log(navigator);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderScreen"
        options={{
          headerTitle: "Our Order's",
          headerTitleStyle: { color: "#1aa", alignSelf: "center", fontSize: 24 },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => Linking.openURL('https://resturant-ordering-backend.onrender.com')}>
              <View style={{}}>
                <Text style={{ color: '#14e' }}>Backend</Text>
              </View>
            </TouchableOpacity>
          ),

        }}
        component={Ordertab}
      />

      <Stack.Screen
        name="AddScreen"
        options={{ headerTitle: "Add order" }}
        component={Addtab}
      />

    </Stack.Navigator>
  );
};

export default HomeScreen;
