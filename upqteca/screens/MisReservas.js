import React from 'react';
import {View,Text,TouchableOpacity,ScrollView,StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function MisReservasScreen() {
  // Datos de ejemplo 
  const reserva = {
    title: 'Cubículo Individual A1',
    status: 'Activa',
    dateLabel: 'domingo, 14 de enero de 2024',
    timeLabel: '14:00 - 16:00',
    location: 'Biblioteca - Planta Baja',
    checkInPending: true,
  };

  return (
    <View style={styles.screen}>
    
      <View style={styles.header}>
        <Text style={styles.headerText}>Mis Reservas</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
    
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryNumber}>1</Text>
              <Text style={styles.summaryLabel}>Activas</Text>
            </View>

            <View style={styles.summaryBox}>
              <Text style={[styles.summaryNumber, { color: '#2563eb' }]}>1</Text>
              <Text style={styles.summaryLabel}>Total hoy</Text>
            </View>
          </View>
        </View>

    
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.sectionHeader}>Reservas Activas</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>+ Nueva reserva</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
      
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{reserva.title}</Text>
            <View style={styles.badgeActive}>
              <Text style={styles.badgeActiveText}>{reserva.status}</Text>
            </View>
          </View>

     
          <View style={{ marginBottom: 8 }}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📅</Text>
              <Text style={styles.infoText}>{reserva.dateLabel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>⏰</Text>
              <Text style={styles.infoText}>{reserva.timeLabel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoText}>{reserva.location}</Text>
            </View>
          </View>

          {reserva.checkInPending && (
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Pendiente de check-in</Text>
              <Text style={styles.alertText}>Recuerda hacer check-in al llegar al espacio</Text>
            </View>
          )}

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.checkInBtn}>
              <Text style={styles.checkInText}>Check-in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={{ fontWeight: '600' }}>Ver detalles</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
            <TouchableOpacity>
              <Text style={styles.deleteIcon}>✖</Text>
            </TouchableOpacity>
          </View>
        </View>

     
        <View style={{ height: 120 }} />
      </ScrollView>

 
     <View style={styles.bottomTabs}>
  <TouchableOpacity style={styles.tab}>
    <Ionicons name="home-outline" size={22} color="#555" />
    <Text style={styles.tabLabel}>Inicio</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab}>
    <Ionicons name="calendar-clear-outline" size={22} color="#2563eb" />
    <Text style={[styles.tabLabel, styles.tabActive]}>Reservas</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab}>
    <Ionicons name="business-outline" size={22} color="#555" />
    <Text style={styles.tabLabel}>Espacios</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab}>
    <Ionicons name="time-outline" size={22} color="#555" />
    <Text style={styles.tabLabel}>Historial</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab}>
    <Ionicons name="person-outline" size={22} color="#555" />
    <Text style={styles.tabLabel}>Perfil</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  header: {
    padding: 20,
    backgroundColor: '#2563eb',
  },

  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  section: {
    padding: 0,
  },

  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
  },

  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  badgeActive: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#22c55e20',
    borderRadius: 20,
  },

  badgeActiveText: {
    color: '#22c55e',
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  infoIcon: {
    marginRight: 8,
    color: '#6b7280',
  },

  infoText: {
    color: '#444',
  },

  alertBox: {
    padding: 12,
    backgroundColor: '#fef9c3',
    borderRadius: 10,
    marginVertical: 10,
  },

  alertTitle: {
    fontWeight: '700',
    color: '#b45309',
    marginBottom: 3,
  },

  alertText: {
    color: '#b45309',
  },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  checkInBtn: {
    padding: 12,
    backgroundColor: '#22c55e',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },

  checkInText: {
    color: '#fff',
    fontWeight: '600',
  },

  detailsBtn: {
    padding: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },

  deleteIcon: {
    marginLeft: 10,
    color: '#dc2626',
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  sectionLink: {
    color: '#2563eb',
    fontWeight: '600',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  summaryBox: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '48%',
    alignItems: 'center',
  },

  summaryNumber: {
    fontSize: 26,
    fontWeight: '700',
    color: '#22c55e',
  },

  summaryLabel: {
    color: '#444',
  },

  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
  },

  tabLabel: {
    marginTop: 5,
    color: '#444',
  },

  tabActive: {
    color: '#2563eb',
  },
  bottomTabs: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 10,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderColor: '#e5e7eb',
},

tab: {
  flex: 1,
  alignItems: 'center',
},

tabLabel: {
  fontSize: 12,
  color: '#555',
  marginTop: 2,
},

tabActive: {
  color: '#2563eb',
  fontWeight: '600',
},
});
