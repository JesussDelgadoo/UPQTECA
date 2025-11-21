import React, {useState} from 'react'
import { Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, View, ScrollView, Switch, Alert, Platform } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
    const [matricula, setMatricula] = useState('122041657');
    const [contraseña, setContraseña] = useState('********');
    const [recordarme, setRecordarme] = useState(false);

    const MostrarAlerta = () => {
      if (matricula.trim() === '' || contraseña.trim() === '') {
        const message = 'Por favor, escribe tu matrícula y contraseña para continuar.';
        if (Platform.OS === 'web') {
          alert(message);
        } else {
          Alert.alert('Error', message, [
            { text: 'Aceptar' }
          ]);
        }
        return;
      }
      
      const successMessage = `Bienvenido a UPTECA, Matrícula: ${matricula}`;
      if (Platform.OS === 'web') {
        alert(successMessage);
      } else {
        Alert.alert(
          'Iniciar sesión exitoso',
          successMessage,
          [
            { text: 'Aceptar' }
          ]
        );
      }
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
      
        <StatusBar barStyle="light-content" backgroundColor={primaryBlue}></StatusBar>
        
        <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
                <AntDesign name="user" size={40} color={primaryBlue} /> 
            </View>
            <Text style={styles.appName}>upteca</Text>
            <Text style={styles.subTitleApp}>Sistema de Reservas UPQ</Text>
        </View>
        
        <View style={styles.recuadro}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Ingresa con tu cuenta institucional</Text>
          
          <Text style={styles.inputLabel}>Matrícula</Text>
          <TextInput 
          style={styles.input}
          placeholder='Matrícula'
          keyboardType='numeric'
          value={matricula}
          onChangeText={setMatricula}
          ></TextInput>

          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput 
          style={styles.input}
          placeholder="Contraseña" 
          secureTextEntry={true} 
          value={contraseña}
          onChangeText={setContraseña} >
          </TextInput>
          
          <View style={styles.optionsContainer}>
            <View style={styles.switchStyle}>
                <Text style={styles.recordarmeText}>Recordarme </Text>
                <Switch 
                    value={recordarme} 
                    onValueChange={setRecordarme} 
                    trackColor={{ false: "#767577", true: primaryBlue }}
                    thumbColor={recordarme ? 'white' : 'white'}
                />
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={MostrarAlerta}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          
          <View style={styles.supportContainer}>
            <Text style={styles.supportText}> ¿Problemas para acceder? </Text>
            <TouchableOpacity>
              <Text style={styles.contactSupportText}>Contactar soporte</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    );
}

const primaryBlue = '#1976D2';
const secondaryBlue = '#2196F3';
const lightGray = '#eee';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        backgroundColor: primaryBlue,
        paddingTop: 50, 
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 20,
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
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
        width: '100%',
        minHeight: 450,
        elevation: 10,
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
        borderColor: lightGray,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 0
    },
    switchStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordarmeText: {
        color: '#666',
        fontSize: 14,
        marginRight: 5,
    },
    forgotPasswordText: {
        color: secondaryBlue,
        fontWeight: '600',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: primaryBlue,
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
    supportContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    supportText: {
        color: '#666',
        fontSize: 14,
    },
    contactSupportText: {
        color: secondaryBlue,
        fontWeight: '500',
        fontSize: 14,
    }
})