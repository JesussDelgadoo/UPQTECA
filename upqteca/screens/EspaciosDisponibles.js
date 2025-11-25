import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EspaciosDisponibles() {
return (
<View style={styles.container}>
<Text style={styles.header}>Espacios Disponibles</Text>


<TextInput style={styles.search} placeholder="Buscar espacios..." />


<View style={styles.filterRow}>
<TouchableOpacity style={[styles.filterBtn, styles.filterActive]}>
<Text style={styles.filterTextActive}>Todos</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.filterBtn}>
<Text style={styles.filterText}>Individual</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.filterBtn}>
<Text style={styles.filterText}>Grupal</Text>
</TouchableOpacity>
</View>


<View style={styles.statusRow}>
<View style={styles.statusBox}>
<Text style={styles.statusNum}>4</Text>
<Text>Disponibles</Text>
</View>
<View style={styles.statusBox}>
<Text style={styles.statusNum}>1</Text>
<Text>Ocupados</Text>
</View>
<View style={styles.statusBox}>
<Text style={styles.statusNum}>5</Text>
<Text>Total</Text>
</View>
</View>


<ScrollView style={styles.list}>
<View style={styles.card}>
<Text style={styles.cardTitle}>Cubículo Individual A1</Text>
<Text style={styles.cardLocation}>Biblioteca - Planta Baja</Text>
<Text style={styles.available}>● Disponible</Text>
<Text style={styles.detail}>1 persona</Text>


<Text style={styles.sectionLabel}>Equipamiento:</Text>
<View style={styles.tagRow}>
{['Mesa', 'Silla', 'Lámpara', 'Toma corriente'].map((item) => (
<View key={item} style={styles.tag}><Text>{item}</Text></View>
))}
</View>


<View style={styles.btnRow}>
<TouchableOpacity style={styles.detailsBtn}><Text>Ver detalles</Text></TouchableOpacity>
<TouchableOpacity style={styles.reserveBtn}><Text style={styles.reserveText}>Reservar</Text></TouchableOpacity>
</View>
</View>


<View style={styles.card}>
<Text style={styles.cardTitle}>Sala Grupal B2</Text>
<Text style={styles.cardLocation}>Biblioteca - Primer Piso</Text>
<Text style={styles.available}>● Disponible</Text>
<Text style={styles.detail}>6 personas</Text>
</View>
</ScrollView>

<View style={styles.bottomTabs}>
  <TouchableOpacity style={styles.tab}>
    <Ionicons name="home-outline" size={22} color="#555" />
    <Text style={[styles.tabLabel, styles.tabActive]}>Inicio</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab}>
    <Ionicons name="calendar-clear-outline" size={22} color="#555" />
    <Text style={styles.tabLabel}>Reservas</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab}>
    <Ionicons name="business-outline" size={22} color="#2563eb" />
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  search: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },

  filterActive: {
    backgroundColor: '#2563eb',
  },

  filterTextActive: {
    color: '#fff',
  },

  filterText: {
    color: '#333',
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statusBox: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },

  statusNum: {
    fontSize: 22,
    fontWeight: '700',
  },

  list: {
    marginTop: 5,
  },

  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  cardLocation: {
    color: '#666',
    marginBottom: 5,
  },

  available: {
    color: 'green',
    marginBottom: 5,
  },

  detail: {
    marginBottom: 10,
  },

  sectionLabel: {
    fontWeight: '700',
    marginBottom: 5,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  tag: {
    padding: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 5,
  },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailsBtn: {
    padding: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },

  reserveBtn: {
    padding: 10,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },

  reserveText: {
    color: '#fff',
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

tabIcon: {
  fontSize: 20,
  marginBottom: 3,
  color: '#555',
},

tabLabel: {
  fontSize: 13,
  color: '#555',
},

tabActive: {
  color: '#2563eb',
  fontWeight: '600',
},
});