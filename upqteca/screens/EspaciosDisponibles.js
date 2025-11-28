import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Modal } from 'react-native';
import { getEspacios, crearReserva } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EspaciosDisponibles({ navigation }) {
  const [espacios, setEspacios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  
  // Lista de horarios disponibles (estáticos para este ejemplo)
  const horarios = [
    "07:00 - 08:40",
    "08:40 - 10:20",
    "10:20 - 12:00",
    "12:00 - 13:40",
    "14:00 - 15:40",
    "15:40 - 17:20",
    "17:20 - 19:00",
    "19:00 - 20:40",
  ];

  useEffect(() => {
    try {
        const data = getEspacios();
        setEspacios(data);
    } catch (e) { console.error(e); }
  }, []);

  const abrirModalReserva = (espacio) => {
    setSelectedEspacio(espacio);
    setModalVisible(true);
  };

  const confirmarReserva = async (hora) => {
    setModalVisible(false);
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            Alert.alert("Error", "Debes iniciar sesión nuevamente");
            return;
        }

        crearReserva(parseInt(userId), selectedEspacio.nombre, selectedEspacio.ubicacion, "Hoy", hora);
        
        Alert.alert(
            "¡Reserva Exitosa!", 
            `Reservaste ${selectedEspacio.nombre} para las ${hora}`,
            [{ text: "OK", onPress: () => navigation.navigate('Reservas') }]
        );
    } catch (e) {
        Alert.alert("Error", "No se pudo crear la reserva");
    }
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text style={styles.cardLocation}>{item.ubicacion}</Text>
      <Text style={[styles.available, { color: item.estado === 'disponible' ? 'green' : 'red' }]}>
        ● {item.estado ? item.estado.toUpperCase() : 'DESCONOCIDO'}
      </Text>
      <Text style={styles.detail}>Capacidad: {item.capacidad}</Text>

      <View style={styles.btnRow}>
        <TouchableOpacity 
            style={styles.detailsBtn}
            onPress={() => navigation.navigate('DetallesReserva', { item: item, tipo: 'espacio' })}
        >
            <Text>Ver detalles</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={[styles.reserveBtn, {backgroundColor: item.estado === 'ocupado' ? '#ccc' : '#2563eb'}]}
            onPress={() => item.estado !== 'ocupado' && abrirModalReserva(item)}
            disabled={item.estado === 'ocupado'}
        >
            <Text style={styles.reserveText}>
                {item.estado === 'ocupado' ? 'Ocupado' : 'Reservar'}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Espacios Disponibles</Text>
      <TextInput style={styles.search} placeholder="Buscar espacios..." />
      <FlatList 
        data={espacios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        contentContainerStyle={{paddingBottom: 20}}
      />

      {/* MODAL PARA SELECCIONAR HORARIO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona un Horario</Text>
                <Text style={styles.modalSubtitle}>{selectedEspacio?.nombre}</Text>
                
                {horarios.map((hora, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.timeSlot} 
                        onPress={() => confirmarReserva(hora)}
                    >
                        <Text style={styles.timeText}>{hora}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity 
                    style={styles.cancelModalBtn} 
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 10, marginTop: 30 },
  search: { padding: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 15 },
  card: { padding: 15, backgroundColor: '#fff', borderRadius: 15, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardLocation: { color: '#666', marginBottom: 5 },
  available: { marginBottom: 5, fontWeight: 'bold' },
  detail: { marginBottom: 10, color: '#555' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailsBtn: { padding: 10, backgroundColor: '#e5e7eb', borderRadius: 10, width: '45%', alignItems: 'center' },
  reserveBtn: { padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
  reserveText: { color: '#fff', fontWeight: 'bold' },
  
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1976D2',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  timeSlot: {
    padding: 15,
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  cancelModalBtn: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  }
});