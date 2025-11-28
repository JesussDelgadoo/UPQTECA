import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { loginUser } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [matricula, setMatricula] = useState('122041657');
    const [password, setPassword] = useState('123456');

    const handleLogin = async () => {
      if (!matricula || !password) {
        Alert.alert('Error', 'Por favor ingresa matrícula y contraseña');
        return;
      }

      const user = loginUser(matricula, password);

      if (user) {
        try {
            await AsyncStorage.setItem('userId', user.id.toString());
            navigation.replace('Main');
        } catch (e) {
            Alert.alert('Error', 'No se pudo guardar la sesión');
        }
      } else {
        Alert.alert('Error', 'Credenciales incorrectas.');
      }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
             <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
        
            <View style={styles.headerSection}>
                <View style={styles.logoCircle}>
                    <AntDesign name="user" size={40} color="#1976D2" /> 
                </View>
                <Text style={styles.appName}>upqteca</Text>
                <Text style={styles.subTitleApp}>Sistema de Reservas UPQ</Text>
            </View>
            
            <View style={styles.recuadro}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Base de datos Local (SQLite)</Text>
            
            <Text style={styles.inputLabel}>Matrícula</Text>
            <TextInput 
                style={styles.input}
                placeholder='Matrícula'
                keyboardType='numeric'
                value={matricula}
                onChangeText={setMatricula}
            />

            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput 
                style={styles.input}
                placeholder="Contraseña" 
                secureTextEntry={true} 
                value={password}
                onChangeText={setPassword} 
            />
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                  <Text style={styles.registerLink}>Regístrate</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 0,
        backgroundColor: '#1976D2', 
        paddingTop: 50, 
    },
    headerSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '42%',
        paddingTop: 20,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    subTitleApp: {
        fontSize: 16,
        color: 'white',
        opacity: 0.8,
        marginBottom: 30,
    },
    recuadro:{
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
        width: '100%',
        minHeight: 450,
        elevation: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'left',
        marginBottom: 25,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 24,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    registerText: {
        color: '#666',
        fontSize: 15,
    },
    registerLink: {
        color: '#1976D2',
        fontWeight: 'bold',
        fontSize: 15,
    },
});