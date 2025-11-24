// PerfilScreen.js
import React, { useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,StatusBar,Image,Switch,} from "react-native";
import {AntDesign,Ionicons,MaterialCommunityIcons,Feather,} from "@expo/vector-icons";

/**
 * Ruta local de la imagen que subiste (se usará como banner/referencia)
 * El sistema la transforma a URL cuando sea necesario:
 * file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png
 */
const referenciaImagen = "file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png";

const primaryBlue = "#1976D2";
const white = "#FFFFFF";
const dangerRed = "#D32F2F";
const surface = "#F5F6FA";

export default function PerfilScreen({ navigation }) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorios, setRecordatorios] = useState(false);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={primaryBlue} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Feather name="more-vertical" size={22} color={white} />
        </TouchableOpacity>
      </View>

      {/* BANNER (imagen de referencia, baja opacidad) */}
      <Image
        source={{ uri: referenciaImagen }}
        style={styles.banner}
        resizeMode="cover"
      />

     

      <ScrollView contentContainerStyle={styles.container}>
        {/* PERFIL - tarjeta principal (sobre fondo morado suave) */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <AntDesign name="user" size={44} color={primaryBlue} />
          </View>

          <Text style={styles.name}>Jesus Ramirez Delgado</Text>
          <Text style={styles.matricula}>122041657</Text>
          <Text style={styles.email}>122041657@upq.edu.mx</Text>

          {/* Datos carrera / cuatri */}
          <View style={styles.profileInfoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Carrera</Text>
              <Text style={styles.infoValue}>Ingeniería en Sistemas Computacionales</Text>
            </View>

            <View style={[styles.infoBox, { marginLeft: 12 }]}>
              <Text style={styles.infoLabel}>Cuatrimestre</Text>
              <Text style={styles.infoValue}>6°</Text>
            </View>
          </View>

          {/* Edit profile button */}
          <TouchableOpacity style={styles.editButton}>
            <AntDesign name="edit" size={16} color={white} />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* MÉTRICAS */}
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
            <AntDesign name="staro" size={22} color="#FBBF24" />
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
        <TouchableOpacity style={styles.logoutButton} onPress={() => alert("Sesión cerrada")}>
          <MaterialCommunityIcons name="logout" size={18} color={white} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* espacio para la barra inferior */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* BOTTOM NAV (idéntica a la del Dashboard) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate?.("Inicio")}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate?.("Reservas")}
        >
          <MaterialCommunityIcons name="calendar-check-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => navigation?.navigate?.("Perfil")}
        >
          <AntDesign name="user" size={24} color={primaryBlue} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate?.("Espacios")}
        >
          <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Espacios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation?.navigate?.("Historial")}
        >
          <MaterialCommunityIcons name="history" size={24} color="#666" />
          <Text style={styles.navLabel}>Historial</Text>
        </TouchableOpacity>
      </View>
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

  /* RECUADRO SUPERIOR (blanco) */
  topBox: {
    backgroundColor: white,
    marginHorizontal: 18,
    marginTop: -10,
    borderRadius: 12,
    padding: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
  },
  topBoxTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  topBoxSubtitle: { fontSize: 13, color: "#666", marginTop: 4 },

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

  /* BOTTOM NAV */
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: white,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center" },
  navItemActive: { alignItems: "center" },
  navLabel: { fontSize: 12, color: "#666", marginTop: 4 },
  navLabelActive: { fontSize: 12, color: primaryBlue, fontWeight: "700", marginTop: 4 },
});

