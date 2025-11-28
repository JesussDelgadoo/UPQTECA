import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../database';

const primaryBlue = '#1976D2';

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [carrera, setCarrera] = useState('');
    const [cuatrimestre, setCuatrimestre] = useState(''); // <--- NUEVO ESTADO
    const [password, setPassword] = useState('');

    const handleRegistro = () => {
      if (!nombre || !matricula || !email || !carrera || !cuatrimestre || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }

      // Pasamos cuatrimestre a la función
      const result = registerUser(matricula, password, nombre, carrera, cuatrimestre, email);

      if (result.success) {
        Alert.alert(
            '¡Registro Exitoso!', 
            'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
            [{ text: 'Ir al Login', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Error', 'La matrícula ya está registrada o hubo un problema.');
      }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
             <StatusBar barStyle="light-content" backgroundColor={primaryBlue} />
        
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crear Cuenta</Text>
                <Text style={styles.subTitleApp}>Únete a UPQTECA</Text>
            </View>
            
            <View style={styles.recuadro}>
                <Text style={styles.inputLabel}>Nombre Completo</Text>
                <TextInput style={styles.input} placeholder='Ej. Juan Pérez' value={nombre} onChangeText={setNombre} />

                <Text style={styles.inputLabel}>Matrícula</Text>
                <TextInput style={styles.input} placeholder='Ej. 122041657' keyboardType='numeric' value={matricula} onChangeText={setMatricula} />

                <Text style={styles.inputLabel}>Correo Institucional</Text>
                <TextInput style={styles.input} placeholder='ejemplo@upq.edu.mx' keyboardType='email-address' autoCapitalize='none' value={email} onChangeText={setEmail} />

                <Text style={styles.inputLabel}>Carrera</Text>
                <TextInput style={styles.input} placeholder='Ej. Sistemas Computacionales' value={carrera} onChangeText={setCarrera} />

                {/* NUEVO CAMPO CUATRIMESTRE */}
                <Text style={styles.inputLabel}>Cuatrimestre</Text>
                <TextInput style={styles.input} placeholder='Ej. 4°' value={cuatrimestre} onChangeText={setCuatrimestre} />

                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput style={styles.input} placeholder="********" secureTextEntry={true} value={password} onChangeText={setPassword} />
                
                <TouchableOpacity style={styles.registerButton} onPress={handleRegistro}>
                    <Text style={styles.registerButtonText}>Registrarse</Text>
                </TouchableOpacity>

                <View style={styles.loginLinkContainer}>
                    <Text style={styles.loginLinkText}>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Inicia Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: primaryBlue, paddingTop: 50 },
    headerSection: { paddingHorizontal: 20, marginBottom: 20 },
    backButton: { marginBottom: 10 },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: 'white' },
    subTitleApp: { fontSize: 16, color: 'rgba(255,255,255,0.8)' },
    recuadro:{ backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, flex: 1 },
    inputLabel: { fontSize: 16, color: '#333', marginBottom: 8, fontWeight: '600' },
    input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#f9f9f9', fontSize: 16 },
    registerButton: { backgroundColor: primaryBlue, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, marginBottom: 20, elevation: 3 },
    registerButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    loginLinkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 30 },
    loginLinkText: { color: '#666', fontSize: 16 },
    loginLink: { color: primaryBlue, fontWeight: 'bold', fontSize: 16 }
});