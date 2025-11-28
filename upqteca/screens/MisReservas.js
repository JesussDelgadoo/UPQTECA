import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getMisReservasActivas, cancelarReserva } from '../database';

export default function MisReservasScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [reservas, setReservas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const cargarDatos = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const data = getMisReservasActivas(parseInt(userId));
        setReservas(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelar = (id) => {
    Alert.alert(
      "Cancelar Reserva",
      "¿Estás seguro que deseas cancelar?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Sí, cancelar", 
          style: 'destructive',
          onPress: () => {
            cancelarReserva(id);
            cargarDatos();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerText}>Mis Reservas</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <Text style={styles.sectionHeader}>Reservas Activas ({reservas.length})</Text>
        </View>

        {reservas.length === 0 ? (
            <View style={styles.emptyContainer}>
                <MaterialIcons name="event-busy" size={50} color="#ccc" />
                <Text style={styles.emptyText}>No tienes reservas activas.</Text>
            </View>
        ) : (
            reservas.map((reserva) => (
                <View key={reserva.id} style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Text style={styles.cardTitle}>{reserva.espacio_nombre}</Text>
                        <View style={styles.badgeActive}>
                            <Text style={styles.badgeActiveText}>Activa</Text>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        {/* FECHA */}
                        <View style={styles.infoRow}>
                            <MaterialIcons name="calendar-today" size={18} color="#666" style={styles.icon} />
                            <Text style={styles.infoText}>{reserva.fecha}</Text>
                        </View>

                        {/* HORA */}
                        <View style={styles.infoRow}>
                            <AntDesign name="clock-circle" size={18} color="#666" style={styles.icon} />
                            <Text style={styles.infoText}>{reserva.hora}</Text>
                        </View>

                        {/* UBICACIÓN */}
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={18} color="#666" style={styles.icon} />
                            <Text style={styles.infoText}>{reserva.ubicacion}</Text>
                        </View>
                    </View>

                    <View style={styles.btnRow}>
                        <TouchableOpacity 
                            style={styles.detailsBtn}
                            onPress={() => navigation.navigate('DetallesReserva', { item: reserva, tipo: 'reserva' })}
                        >
                            <Text style={styles.detailsBtnText}>Ver detalles</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.cancelBtn} 
                            onPress={() => handleCancelar(reserva.id)}
                        >
                            <MaterialIcons name="cancel" size={20} color="#dc2626" />
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f6fa' },
  
  header: { 
    paddingHorizontal: 20, 
    paddingBottom: 15,
    backgroundColor: '#1976D2', // <--- Hex directo
  },
  headerText: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#fff' 
  },

  sectionHeader: { fontSize: 18, fontWeight: '700', color: '#333' },

  card: { padding: 20, backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, elevation: 2 },
  
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#333', flex: 1 },
  
  badgeActive: { 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  badgeActiveText: { color: '#166534', fontWeight: '700', fontSize: 12 },

  infoContainer: { marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  icon: { marginRight: 8, width: 20, textAlign: 'center' }, 
  infoText: { color: '#555', fontSize: 15 },

  btnRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center' 
  },

  detailsBtn: { 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    backgroundColor: '#f3f4f6', 
    borderRadius: 8 
  },
  detailsBtnText: { fontWeight: '600', color: '#333' },

  cancelBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 8 
  },
  cancelText: { color: '#dc2626', fontWeight: '600', marginLeft: 4 },

  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 10, fontSize: 16 }
});