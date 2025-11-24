// HistorialScreen.js
import React, { useState } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput,StatusBar,Image} from 'react-native';
import {AntDesign,Ionicons,MaterialIcons,Feather,MaterialCommunityIcons} from '@expo/vector-icons';

const primaryBlue = '#1976D2';
const secondaryBlue = '#2196F3';
const successGreen = '#22C55E';
const dangerRed = '#E53935';
const lightBackground = '#F5F5F5';

// Referencia de imagen subida por ti
const referenciaImagen = 'file:///mnt/data/c8c9d5d4-23cd-4139-a4bc-b2ae41821912.png';

export default function HistorialScreen() {
  const [filtro, setFiltro] = useState('Todos');
  const [search, setSearch] = useState('');

  const reservas = [
    {
      id: 1,
      sala: 'Cubículo Individual A1',
      fecha: 'Hoy, 23 Nov 2025',
      hora: '14:00 - 16:00',
      duracion: 'Duración real: 1h 48m',
      estado: 'Confirmada',
      rating: 0,
      edificio: 'Biblioteca - Planta Baja'
    },
    {
      id: 2,
      sala: 'Sala Grupal B2',
      fecha: '21 Nov 2025',
      hora: '10:00 - 12:00',
      duracion: 'Duración real: 2h 00m',
      estado: 'Completada',
      rating: 5,
      edificio: 'Edificio C - 2do piso'
    },
    {
      id: 3,
      sala: 'Laboratorio de Cómputo C1',
      fecha: '18 Nov 2025',
      hora: '16:00 - 18:00',
      duracion: 'Cancelada',
      estado: 'Cancelada',
      rating: 0,
      edificio: 'Laboratorios'
    }
  ];

  const filtered = reservas.filter(r => {
    const matchesFiltro =
      filtro === 'Todos' ? true : r.estado.toLowerCase() === filtro.toLowerCase();
    const matchesSearch =
      search.trim() === '' ||
      r.sala.toLowerCase().includes(search.toLowerCase()) ||
      r.edificio.toLowerCase().includes(search.toLowerCase());
    return matchesFiltro && matchesSearch;
  });

  const renderStars = (n) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= n ? 'staro' : 'staro'}
          size={18}
          color={i <= n ? '#FFD700' : '#DDD'}
        />
      );
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={primaryBlue} barStyle="light-content" />

      {/* Header: usa tu imagen de referencia como mini-banner opcional */}
      <View style={styles.header}>
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

      {/* Optional image reference shown under header to match la imagen */}
      <Image
        source={{ uri: referenciaImagen }}
        style={styles.referenceImage}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Search */}
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

        {/* Stats row (combinado con la imagen en el diseño original) */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <AntDesign name="checkcircleo" size={22} color={primaryBlue} />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>

          <View style={styles.statCard}>
            <AntDesign name="closecircleo" size={22} color={dangerRed} />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Canceladas</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="clock" size={22} color="#444" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Filtros tipo pills */}
        <View style={styles.filters}>
          {['Todos', 'Confirmada', 'Completada', 'Cancelada'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFiltro(f)}
              style={[styles.pill, filtro === f && styles.pillActive]}>
              <Text style={[styles.pillText, filtro === f && styles.pillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de reservas (tarjetas) */}
        {filtered.map((r) => (
          <View key={r.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.salaText}>{r.sala}</Text>
                <Text style={styles.buildingText}>{r.edificio}</Text>
              </View>

              <View style={[styles.statusBadge, r.estado === 'Confirmada' && { backgroundColor: '#E6F4EA' }]}>
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

            <View style={styles.infoRow}>
              <MaterialIcons name="timer" size={16} color="#777" />
              <Text style={styles.infoText}>{r.duracion}</Text>
            </View>

            {/* Rating / acciones */}
            <View style={styles.cardFooter}>
              <View style={styles.leftFooter}>
                {r.rating > 0 ? renderStars(r.rating) : <Text style={styles.noRating}>Sin calificación</Text>}
              </View>

              <View style={styles.rightFooter}>
                {/* Si está confirmada, mostrar check-in y detalles */}
                {r.estado === 'Confirmada' && (
                  <TouchableOpacity style={styles.primaryBtn}>
                    <AntDesign name="checkcircle" size={16} color="white" />
                    <Text style={styles.primaryBtnText}>Check-in</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.ghostBtn}>
                  <Text style={styles.ghostBtnText}>Ver detalles</Text>
                </TouchableOpacity>

                {r.estado === 'Confirmada' && (
                  <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}

        {/* espacio para bottom nav */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom navigation (igual que Dashboard) */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Ionicons name="home" size={24} color="#666" />
          <Text style={styles.navText}>Inicio</Text>
        </View>

        <View style={styles.navItem}>
          <MaterialCommunityIcons name="calendar-check-outline" size={24} color="#666" />
          <Text style={styles.navText}>Reservas</Text>
        </View>

        <View style={[styles.navItem, styles.navItemActive]}>
          <MaterialCommunityIcons name="history" size={24} color={primaryBlue} />
          <Text style={[styles.navText, styles.navTextActive]}>Historial</Text>
        </View>

        <View style={styles.navItem}>
          <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="#666" />
          <Text style={styles.navText}>Espacios</Text>
        </View>

        <View style={styles.navItem}>
          <AntDesign name="user" size={24} color="#666" />
          <Text style={styles.navText}>Perfil</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: lightBackground },
  header: {
    backgroundColor: primaryBlue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row' },
  iconBtn: { marginLeft: 8, padding: 6 },

  referenceImage: {
    width: '100%',
    height: 90,
    opacity: 0.12
  },

  container: { padding: 16, paddingBottom: 120 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: -30 // para superponer ligeramente sobre la imagen como en la referencia
  },
  searchInput: { flex: 1, marginLeft: 8 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
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

  filters: { flexDirection: 'row', marginTop: 14 },
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
    marginTop: 14,
    elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salaText: { color: primaryBlue, fontSize: 16, fontWeight: '700' },
  buildingText: { color: '#666', fontSize: 13 },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#FFF5E6'
  },
  statusText: { color: '#BE8700', fontWeight: '700' },

  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  infoText: { marginLeft: 8, color: '#555' },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  leftFooter: { flexDirection: 'row', alignItems: 'center' },
  noRating: { color: '#999' },
  starsRow: { flexDirection: 'row' },

  rightFooter: { flexDirection: 'row', alignItems: 'center' },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: successGreen,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8
  },
  primaryBtnText: { color: 'white', fontWeight: '700', marginLeft: 8 },
  ghostBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8
  },
  ghostBtnText: { color: '#444', fontWeight: '600' },
  cancelBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  cancelText: { color: dangerRed, fontWeight: '700' },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 80,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navItemActive: { borderTopWidth: 2, borderTopColor: primaryBlue, paddingTop: 6 },
  navText: { fontSize: 12, color: '#666', marginTop: 6 },
  navTextActive: { color: primaryBlue, fontWeight: '700' }
});
