import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar, Image } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getHistorial } from '../database';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <--- IMPORTANTE

const primaryBlue = '#1976D2';
const dangerRed = '#E53935';
const lightBackground = '#F5F5F5';

const referenciaImagen = 'file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png';
const USER_ID = 1; 

export default function HistorialScreen({ navigation }) {
  const insets = useSafeAreaInsets(); // <--- Obtener medidas seguras
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const cargarDatos = () => {
    try {
      const data = getHistorial(USER_ID);
      setReservas(data);
    } catch (e) {
      console.error("Error cargando historial:", e);
    }
  };

  const filtered = reservas.filter(r => {
    const matchesFiltro = filtro === 'Todos' ? true : r.estado.toLowerCase() === filtro.toLowerCase();
    const searchText = search.toLowerCase();
    const matchesSearch =
      search.trim() === '' ||
      (r.espacio_nombre && r.espacio_nombre.toLowerCase().includes(searchText)) ||
      (r.ubicacion && r.ubicacion.toLowerCase().includes(searchText));
    return matchesFiltro && matchesSearch;
  });

  const renderStars = (n) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign key={i} name={i <= n ? 'star' : 'staro'} size={18} color={i <= n ? '#FFD700' : '#DDD'} />
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={primaryBlue} barStyle="light-content" />

      {/* Header con Safe Area Dinámico */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
                <Text style={styles.headerTitle}>Historial de Reservas</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconBtn}>
                    <Feather name="download" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconBtn, { marginLeft: 8 }]}>
                    <AntDesign name="filter" size={18} color="white" />
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <Image source={{ uri: referenciaImagen }} style={[styles.referenceImage, { top: 60 + insets.top }]} resizeMode="cover" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Buscador */}
        <View style={styles.searchRow}>
          <Feather name="search" size={18} color="#777" />
          <TextInput
            placeholder="Buscar sala, edificio..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
        </View>

        {/* Resumen Estadístico */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <AntDesign name="check-circle" size={22} color={primaryBlue} />
            <Text style={styles.statNumber}>{reservas.filter(r => r.estado === 'Completada').length}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>

          <View style={styles.statCard}>
            <AntDesign name="close-circle" size={22} color={dangerRed} />
            <Text style={styles.statNumber}>{reservas.filter(r => r.estado === 'Cancelada').length}</Text>
            <Text style={styles.statLabel}>Canceladas</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="clock" size={22} color="#444" />
            <Text style={styles.statNumber}>{reservas.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filters}>
          {['Todos', 'Completada', 'Cancelada'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFiltro(f)}
              style={[styles.pill, filtro === f && styles.pillActive]}>
              <Text style={[styles.pillText, filtro === f && styles.pillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista */}
        {filtered.length === 0 ? (
            <Text style={styles.emptyText}>No hay historial disponible.</Text>
        ) : (
            filtered.map((r) => (
            <View key={r.id} style={styles.card}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.salaText}>{r.espacio_nombre}</Text>
                        <Text style={styles.buildingText}>{r.ubicacion}</Text>
                    </View>
                    <View style={[styles.statusBadge, r.estado === 'Completada' && { backgroundColor: '#E6F4EA' }]}>
                        <Text style={[styles.statusText, r.estado === 'Cancelada' && { color: dangerRed }]}>
                        {r.estado}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="calendar-today" size={16} color="#777" />
                    <Text style={styles.infoText}>{r.fecha}</Text>
                </View>
                <View style={styles.infoRow}>
                    <AntDesign name="clockcircleo" size={16} color="#777" />
                    <Text style={styles.infoText}>{r.hora}</Text>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.leftFooter}>
                        {r.rating > 0 ? renderStars(r.rating) : <Text style={styles.noRating}>Sin calificación</Text>}
                    </View>
                    <View style={styles.rightFooter}>
                        <TouchableOpacity 
                            style={styles.ghostBtn}
                            onPress={() => navigation.navigate('DetallesReserva', { item: r, tipo: 'historial' })}
                        >
                            <Text style={styles.ghostBtnText}>Ver detalles</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: lightBackground },
  header: {
    backgroundColor: primaryBlue,
    paddingHorizontal: 16,
    paddingBottom: 15,
    // paddingTop se maneja dinámicamente arriba
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50, // Altura fija para el contenido del header
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row' },
  iconBtn: { marginLeft: 8, padding: 6 },

  referenceImage: {
    width: '100%',
    height: 90,
    opacity: 0.12,
    position: 'absolute',
    zIndex: -1
  },

  container: { padding: 16 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
    marginBottom: 15
  },
  searchInput: { flex: 1, marginLeft: 8 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2
  },
  statNumber: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  statLabel: { color: '#666', fontSize: 12 },

  filters: { flexDirection: 'row', marginBottom: 15 },
  pill: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    elevation: 1
  },
  pillActive: { backgroundColor: primaryBlue },
  pillText: { color: '#333', fontWeight: '600' },
  pillTextActive: { color: 'white' },

  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salaText: { color: primaryBlue, fontSize: 16, fontWeight: '700', maxWidth:'70%' },
  buildingText: { color: '#666', fontSize: 13 },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#FFF5E6'
  },
  statusText: { color: '#BE8700', fontWeight: '700', fontSize: 12 },

  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  infoText: { marginLeft: 8, color: '#555' },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  leftFooter: { flexDirection: 'row', alignItems: 'center' },
  noRating: { color: '#999', fontSize: 12, fontStyle: 'italic' },
  starsRow: { flexDirection: 'row' },

  rightFooter: { flexDirection: 'row', alignItems: 'center' },
  ghostBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  ghostBtnText: { color: '#444', fontWeight: '600', fontSize: 13 },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#999' }
});