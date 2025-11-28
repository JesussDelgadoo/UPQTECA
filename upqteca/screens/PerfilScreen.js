import React, { useState, useCallback } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, 
  Image, Switch, Alert, Modal, TextInput, KeyboardAvoidingView, Platform 
} from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { getUserById, updateUserPhoto, updateUserInfo } from '../database'; // Importamos la función de update

const referenciaImagen = "file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png";
const primaryBlue = "#1976D2";
const white = "#FFFFFF";
const dangerRed = "#D32F2F";
const surface = "#F5F6FA";

export default function PerfilScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorios, setRecordatorios] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Estados para el Modal de Edición
  const [modalVisible, setModalVisible] = useState(false);
  const [editNombre, setEditNombre] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCarrera, setEditCarrera] = useState('');
  const [editCuatri, setEditCuatri] = useState('');
  const [editPassword, setEditPassword] = useState('');

  useFocusEffect(
    useCallback(() => {
        cargarDatos();
    }, [])
  );

  const cargarDatos = async () => {
    try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
            const user = getUserById(parseInt(id));
            setUserData(user);
        }
    } catch (e) { console.error(e); }
  };

  // Función para abrir el modal y precargar datos
  const abrirModalEdicion = () => {
    if (userData) {
        setEditNombre(userData.nombre);
        setEditEmail(userData.email);
        setEditCarrera(userData.carrera);
        setEditCuatri(userData.cuatrimestre);
        setEditPassword(userData.password);
        setModalVisible(true);
    }
  };

  // Función para guardar cambios del Modal
  const guardarCambios = () => {
      if (!editNombre || !editEmail || !editPassword) {
          Alert.alert("Error", "Nombre, Email y Contraseña son obligatorios");
          return;
      }

      const result = updateUserInfo(
          userData.id, 
          editNombre, 
          editEmail, 
          editPassword, 
          editCarrera, 
          editCuatri
      );

      if (result.success) {
          Alert.alert("¡Listo!", "Tus datos se actualizaron correctamente.");
          setModalVisible(false);
          cargarDatos(); // Recargar la info en pantalla
      } else {
          Alert.alert("Error", "No se pudo actualizar la información.");
      }
  };

  const handleEditProfilePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
        return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
    });

    if (!result.canceled) {
        const nuevaFotoUri = result.assets[0].uri;
        const exito = updateUserPhoto(userData.id, nuevaFotoUri);
        if (exito) {
            setUserData({ ...userData, foto: nuevaFotoUri });
            Alert.alert("Foto Actualizada", "Tu foto de perfil se ha guardado.");
        }
    }
  };

  const handleLogout = async () => {
      Alert.alert("Cerrar Sesión", "¿Salir de la aplicación?", [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Salir", 
            style: "destructive",
            onPress: async () => {
              await AsyncStorage.removeItem('userId');
              navigation.replace('Login');
            }
          }
        ]
      );
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={primaryBlue} barStyle="light-content" />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      <Image source={{ uri: referenciaImagen }} style={[styles.banner, {top: insets.top + 60}]} resizeMode="cover" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* TARJETA DE PERFIL */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
             {userData && userData.foto ? (
                 <Image source={{ uri: userData.foto }} style={styles.avatarImage} />
             ) : (
                 <View style={styles.avatarPlaceholder}>
                    <AntDesign name="user" size={44} color={primaryBlue} />
                 </View>
             )}
          </View>

          <Text style={styles.name}>{userData ? userData.nombre : '...'}</Text>
          <Text style={styles.matricula}>{userData ? userData.matricula : '...'}</Text>
          <Text style={styles.email}>{userData ? userData.email : '...'}</Text>

          <View style={styles.profileInfoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Carrera</Text>
              <Text style={styles.infoValue}>{userData ? userData.carrera : '...'}</Text>
            </View>
            <View style={[styles.infoBox, { marginLeft: 12 }]}>
              <Text style={styles.infoLabel}>Cuatrimestre</Text>
              <Text style={styles.infoValue}>{userData ? userData.cuatrimestre : '...'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePhoto}>
            <AntDesign name="camera" size={18} color={primaryBlue} />
            <Text style={styles.editButtonText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        {/* MÉTRICAS */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Ionicons name="calendar-outline" size={22} color={primaryBlue} />
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Reservas</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="time-outline" size={22} color="#FF6B6B" />
            <Text style={styles.metricNumber}>24h</Text>
            <Text style={styles.metricLabel}>Tiempo</Text>
          </View>
          <View style={styles.metricCard}>
            <AntDesign name="star" size={22} color="#FBBF24" />
            <Text style={styles.metricNumber}>4.8</Text>
            <Text style={styles.metricLabel}>Calif.</Text>
          </View>
        </View>

        {/* OPCIONES */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionRow} onPress={abrirModalEdicion}>
            <Ionicons name="person-outline" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Cuenta</Text>
              <Text style={styles.optionSubtitle}>Editar información personal</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#999" />
          </TouchableOpacity>

          <View style={styles.optionRow}>
            <Ionicons name="notifications-outline" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Notificaciones</Text>
              <Text style={styles.optionSubtitle}>Recibir alertas</Text>
            </View>
            <Switch value={notificaciones} onValueChange={setNotificaciones} trackColor={{ true: primaryBlue, false: "#ccc" }} thumbColor={white} />
          </View>
          
           {/* Resto de opciones... */}
           <View style={styles.optionRow}>
            <MaterialCommunityIcons name="bell-ring-outline" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Recordatorios</Text>
              <Text style={styles.optionSubtitle}>Antes de tus reservas</Text>
            </View>
            <Switch value={recordatorios} onValueChange={setRecordatorios} trackColor={{ true: primaryBlue, false: "#ccc" }} thumbColor={white} />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={18} color={white} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* --- MODAL DE EDICIÓN DE CUENTA --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Editar Cuenta</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <AntDesign name="close" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
                
                <ScrollView>
                    <Text style={styles.labelInput}>Nombre Completo</Text>
                    <TextInput style={styles.input} value={editNombre} onChangeText={setEditNombre} />

                    <Text style={styles.labelInput}>Correo Electrónico</Text>
                    <TextInput style={styles.input} value={editEmail} onChangeText={setEditEmail} keyboardType="email-address" />

                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flex:1, marginRight:10}}>
                            <Text style={styles.labelInput}>Carrera</Text>
                            <TextInput style={styles.input} value={editCarrera} onChangeText={setEditCarrera} />
                        </View>
                        <View style={{flex:0.5}}>
                            <Text style={styles.labelInput}>Cuatri</Text>
                            <TextInput style={styles.input} value={editCuatri} onChangeText={setEditCuatri} />
                        </View>
                    </View>

                    <Text style={styles.labelInput}>Contraseña</Text>
                    <TextInput style={styles.input} value={editPassword} onChangeText={setEditPassword} secureTextEntry />
                    
                    <TouchableOpacity style={styles.saveButton} onPress={guardarCambios}>
                        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: surface },
  header: { backgroundColor: primaryBlue, paddingBottom: 15, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { color: white, fontSize: 20, fontWeight: "700" },
  headerIcon: {},
  banner: { position: "absolute", left: 0, right: 0, height: 84, opacity: 0.08 },
  container: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 40 },
  
  profileCard: { marginTop: 10, backgroundColor: "#6D28D9", borderRadius: 14, paddingVertical: 18, paddingHorizontal: 16, alignItems: "center", elevation: 3 },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: white, justifyContent: "center", alignItems: "center", overflow: 'hidden', borderWidth: 3, borderColor: '#fff', marginBottom: 10 },
  avatarImage: { width: '100%', height: '100%' },
  avatarPlaceholder: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  
  name: { marginTop: 5, fontSize: 18, fontWeight: "700", color: white },
  matricula: { fontSize: 13, color: white, marginTop: 4 },
  email: { fontSize: 13, color: white, marginTop: 2 },
  profileInfoRow: { flexDirection: "row", marginTop: 12, width: "100%", justifyContent: "space-between" },
  infoBox: { flex: 1, backgroundColor: "rgba(255,255,255,0.12)", padding: 10, borderRadius: 10 },
  infoLabel: { color: "rgba(255,255,255,0.85)", fontSize: 12 },
  infoValue: { color: white, fontWeight: "700", marginTop: 6, fontSize: 13 },
  editButton: { marginTop: 14, backgroundColor: white, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, flexDirection: "row", alignItems: "center" },
  editButtonText: { color: primaryBlue, fontWeight: "700", marginLeft: 8 },
  
  metricsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 },
  metricCard: { backgroundColor: white, flex: 1, marginHorizontal: 6, paddingVertical: 14, borderRadius: 12, alignItems: "center", elevation: 2 },
  metricNumber: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  metricLabel: { fontSize: 12, color: "#666", marginTop: 6, textAlign: "center" },
  
  optionsSection: { marginTop: 18 },
  optionRow: { backgroundColor: white, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, flexDirection: "row", alignItems: "center", marginBottom: 12, elevation: 2 },
  optionTextBox: { flex: 1, marginLeft: 12 },
  optionTitle: { fontSize: 15, fontWeight: "700", color: "#222" },
  optionSubtitle: { fontSize: 12, color: "#666", marginTop: 3 },
  logoutButton: { marginTop: 6, marginHorizontal: 18, backgroundColor: dangerRed, paddingVertical: 12, borderRadius: 12, alignItems: "center", justifyContent: "center", flexDirection: "row", elevation: 2 },
  logoutText: { color: white, fontWeight: "700", marginLeft: 8 },

  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, paddingBottom: 40, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: primaryBlue },
  labelInput: { fontSize: 14, color: '#666', marginBottom: 5, fontWeight: '600' },
  input: { backgroundColor: '#F5F6FA', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 15, fontSize: 16, color: '#333' },
  saveButton: { backgroundColor: primaryBlue, padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});