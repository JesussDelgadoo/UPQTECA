import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // <--- IMPORTANTE
import { initDB } from './database';

// Importa tus pantallas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MisReservasScreen from './screens/MisReservas';
import EspaciosDisponibles from './screens/EspaciosDisponibles';
import HistorialScreen from './screens/HistorialScreen';
import PerfilScreen from './screens/PerfilScreen';
import DetallesScreen from './screens/DetallesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración del Menú Inferior (Tabs)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Ionicons name="home-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Reservas" 
        component={MisReservasScreen} 
        options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="calendar-check-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Espacios" 
        component={EspaciosDisponibles} 
        options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="office-building-marker-outline" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Historial" 
        component={HistorialScreen} 
        options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="history" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <SafeAreaProvider> {/* <--- ESTO EVITA EL ERROR DE SAFE AREA */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="DetallesReserva" component={DetallesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}