import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image, Switch, Alert } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getUserById } from '../database';

// Esta ruta es la referencia visual que tenías
const referenciaImagen = "file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png";

const primaryBlue = "#1976D2";
const white = "#FFFFFF";
const dangerRed = "#D32F2F";
const surface = "#F5F6FA";

export default function PerfilScreen({ navigation }) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorios, setRecordatorios] = useState(false);
  const [userData, setUserData] = useState(null);

  // Cargar datos reales del usuario cada vez que entras a la pantalla
  useFocusEffect(
    useCallback(() => {
        const loadUser = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    const user = getUserById(parseInt(id));
                    setUserData(user);
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadUser();
    }, [])
  );

  const handleLogout = async () => {
      Alert.alert(
        "Cerrar Sesión",
        "¿Estás seguro que quieres salir?",
        [
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
      </View>

      {/* BANNER (Imagen de fondo tenue) */}
      <Image
        source={{ uri: referenciaImagen }}
        style={styles.banner}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* TARJETA DE PERFIL (Datos Reales) */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <AntDesign name="user" size={44} color={primaryBlue} />
          </View>

          <Text style={styles.name}>{userData ? userData.nombre : 'Cargando...'}</Text>
          <Text style={styles.matricula}>{userData ? userData.matricula : '...'}</Text>
          <Text style={styles.email}>{userData ? userData.email : '...'}</Text>

          {/* Datos carrera / cuatri */}
          <View style={styles.profileInfoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Carrera</Text>
              <Text style={styles.infoValue}>{userData ? userData.carrera : '...'}</Text>
            </View>

            <View style={[styles.infoBox, { marginLeft: 12 }]}>
              <Text style={styles.infoLabel}>Cuatrimestre</Text>
              <Text style={styles.infoValue}>4°</Text>
            </View>
          </View>

          {/* Edit profile button */}
          <TouchableOpacity style={styles.editButton}>
            <AntDesign name="edit" size={16} color={primaryBlue} />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* MÉTRICAS (Estadísticas visuales) */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Ionicons name="calendar-outline" size={22} color={primaryBlue} />
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Reservas este mes</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="time-outline" size={22} color="#FF6B6B" />
            <Text style={styles.metricNumber}>24h</Text>
            <Text style={styles.metricLabel}>Tiempo total</Text>
          </View>

          <View style={styles.metricCard}>
            <AntDesign name="star" size={22} color="#FBBF24" />
            <Text style={styles.metricNumber}>4.8</Text>
            <Text style={styles.metricLabel}>Calificación</Text>
          </View>
        </View>

        {/* OPCIONES / AJUSTES */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionRow}>
            <Ionicons name="person-outline" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Cuenta</Text>
              <Text style={styles.optionSubtitle}>Información y seguridad</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#999" />
          </TouchableOpacity>

          <View style={styles.optionRow}>
            <Ionicons name="notifications-outline" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Notificaciones</Text>
              <Text style={styles.optionSubtitle}>Recibir notificaciones del sistema</Text>
            </View>
            <Switch
              value={notificaciones}
              onValueChange={setNotificaciones}
              trackColor={{ true: primaryBlue, false: "#ccc" }}
              thumbColor={white}
            />
          </View>

          <View style={styles.optionRow}>
            <MaterialCommunityIcons name="bell-ring-outline" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Recordatorios</Text>
              <Text style={styles.optionSubtitle}>Notificaciones antes de tus reservas</Text>
            </View>
            <Switch
              value={recordatorios}
              onValueChange={setRecordatorios}
              trackColor={{ true: primaryBlue, false: "#ccc" }}
              thumbColor={white}
            />
          </View>

          <TouchableOpacity style={styles.optionRow}>
            <Feather name="help-circle" size={20} color={primaryBlue} />
            <View style={styles.optionTextBox}>
              <Text style={styles.optionTitle}>Ayuda y soporte</Text>
              <Text style={styles.optionSubtitle}>Contacta al equipo de soporte</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={18} color={white} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: surface },

  /* HEADER */
  header: {
    backgroundColor: primaryBlue,
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: white, fontSize: 20, fontWeight: "700" },
  headerIcon: {},

  /* BANNER */
  banner: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    height: 84,
    opacity: 0.08,
  },

  /* CONTAINER */
  container: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 40,
  },

  /* PROFILE CARD */
  profileCard: {
    marginTop: 10,
    backgroundColor: "#6D28D9", // morado suave
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 46,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
  },
  name: { marginTop: 12, fontSize: 18, fontWeight: "700", color: white },
  matricula: { fontSize: 13, color: white, marginTop: 4 },
  email: { fontSize: 13, color: white, marginTop: 2 },

  profileInfoRow: {
    flexDirection: "row",
    marginTop: 12,
    width: "100%",
    justifyContent: "space-between",
  },
  infoBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 10,
    borderRadius: 10,
  },
  infoLabel: { color: "rgba(255,255,255,0.85)", fontSize: 12 },
  infoValue: { color: white, fontWeight: "700", marginTop: 6, fontSize: 13 },

  editButton: {
    marginTop: 14,
    backgroundColor: white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: { color: primaryBlue, fontWeight: "700", marginLeft: 8 },

  /* METRICS */
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  metricCard: {
    backgroundColor: white,
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  metricNumber: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  metricLabel: { fontSize: 12, color: "#666", marginTop: 6, textAlign: "center" },

  /* OPTIONS */
  optionsSection: { marginTop: 18 },
  optionRow: {
    backgroundColor: white,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  optionTextBox: { flex: 1, marginLeft: 12 },
  optionTitle: { fontSize: 15, fontWeight: "700", color: "#222" },
  optionSubtitle: { fontSize: 12, color: "#666", marginTop: 3 },

  /* LOGOUT */
  logoutButton: {
    marginTop: 6,
    marginHorizontal: 18,
    backgroundColor: dangerRed,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 2,
  },
  logoutText: { color: white, fontWeight: "700", marginLeft: 8 },
});