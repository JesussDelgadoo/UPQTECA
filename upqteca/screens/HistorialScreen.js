import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar, Image } from 'react-native';
import { AntDesign, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getHistorial } from '../database';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const primaryBlue = '#1976D2';
const dangerRed = '#E53935';
const lightBackground = '#F5F5F5';

const referenciaImagen = 'file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png';
const USER_ID = 1; 

export default function HistorialScreen({ navigation }) {
  const insets = useSafeAreaInsets();
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

  // Helper para colores de estado
  const getStatusStyle = (estado) => {
      switch(estado) {
          case 'Completada': return { bg: '#E6F4EA', text: '#166534' }; // Verde
          case 'Cancelada': return { bg: '#FEE2E2', text: '#991B1B' }; // Rojo
          case 'En Curso': return { bg: '#E0F2FE', text: '#0284C7' };  // Azul
          default: return { bg: '#FFF5E6', text: '#BE8700' }; // Naranja (Por defecto)
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
        <FontAwesome key={i} name={i <= n ? 'star' : 'star-half-empty'} size={18} color={i <= n ? '#FFD700' : '#DDD'} />
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={primaryBlue} barStyle="light-content" />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
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

        {/* Filtros (Agregamos 'En Curso' al filtro si quieres que aparezca como opción) */}
        <View style={styles.filters}>
          {['Todos', 'En Curso', 'Completada', 'Cancelada'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFiltro(f)}
              style={[styles.pill, filtro === f && styles.pillActive]}>
              <Text style={[styles.pillText, filtro === f && styles.pillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 ? (
            <Text style={styles.emptyText}>No hay historial disponible.</Text>
        ) : (
            filtered.map((r) => {
              const styleStatus = getStatusStyle(r.estado);
              return (
                <View key={r.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.salaText}>{r.espacio_nombre}</Text>
                            <Text style={styles.buildingText}>{r.ubicacion}</Text>
                        </View>
                        
                        {/* Badge con color dinámico */}
                        <View style={[styles.statusBadge, { backgroundColor: styleStatus.bg }]}>
                            <Text style={[styles.statusText, { color: styleStatus.text }]}>
                            {r.estado}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialIcons name="calendar-today" size={16} color="#777" />
                        <Text style={styles.infoText}>{r.fecha}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <AntDesign name="clock-circle" size={16} color="#777" />
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
              );
            })
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
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
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
  salaText: { color: primaryBlue, fontSize: 16, fontWeight: '700', maxWidth:'65%' },
  buildingText: { color: '#666', fontSize: 13 },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    // El color de fondo se define dinámicamente en el componente
  },
  statusText: { fontWeight: '700', fontSize: 12 },

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