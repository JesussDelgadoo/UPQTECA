import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Modal, StatusBar } from 'react-native';
import { getEspacios, crearReserva } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EspaciosDisponibles({ navigation }) {
  const insets = useSafeAreaInsets();
  const [espacios, setEspacios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEspacio, setSelectedEspacio] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const todosLosHorarios = [
    "07:00 - 08:40", "08:40 - 10:20", "10:20 - 12:00", "12:00 - 13:40", 
    "14:00 - 15:40", "15:40 - 17:20", "17:20 - 18:00"
  ];

  useEffect(() => {
    try {
        const data = getEspacios();
        setEspacios(data);
    } catch (e) { console.error(e); }
  }, []);

  const abrirModalReserva = (espacio) => {
    setSelectedEspacio(espacio);
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutoActual = ahora.getMinutes();

    const horariosValidos = todosLosHorarios.filter(horario => {
        const horaInicioStr = horario.split(' - ')[0];
        const [hora, minuto] = horaInicioStr.split(':').map(Number);
        if (hora > horaActual) return true;
        if (hora === horaActual && minuto > minutoActual) return true;
        return false;
    });

    if (horariosValidos.length === 0) {
        Alert.alert("Sin Disponibilidad", "Ya no hay horarios disponibles hoy (Cierre: 18:00).");
        return;
    }

    setHorariosDisponibles(horariosValidos);
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
        Alert.alert("¡Reserva Exitosa!", `Reservaste ${selectedEspacio.nombre} para las ${hora}`,
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
            <Text style={{fontWeight:'600', color:'#333'}}>Ver detalles</Text>
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
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.headerTitle}>Espacios Disponibles</Text>
      </View>

      <View style={styles.contentContainer}>
          <TextInput style={styles.search} placeholder="Buscar espacios..." />
          <FlatList 
            data={espacios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCard}
            contentContainerStyle={{paddingBottom: 20}}
          />
      </View>

      {/* MODAL */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona un Horario</Text>
                <Text style={styles.modalSubtitle}>{selectedEspacio?.nombre}</Text>
                {horariosDisponibles.map((hora, index) => (
                    <TouchableOpacity key={index} style={styles.timeSlot} onPress={() => confirmarReserva(hora)}>
                        <Text style={styles.timeText}>{hora}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.cancelModalBtn} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  
  header: { 
    backgroundColor: '#1976D2', // <--- Hex directo
    paddingBottom: 15, 
    paddingHorizontal: 20,
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  contentContainer: { padding: 20, flex: 1 },

  search: { padding: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, marginHorizontal: 20, marginTop: 15, elevation: 2 },
  
  card: { padding: 15, backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, marginHorizontal: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  cardLocation: { color: '#666', marginBottom: 5 },
  available: { marginBottom: 5, fontWeight: 'bold' },
  detail: { marginBottom: 10, color: '#555' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailsBtn: { padding: 10, backgroundColor: '#e5e7eb', borderRadius: 10, width: '45%', alignItems: 'center' },
  reserveBtn: { padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
  reserveText: { color: '#fff', fontWeight: 'bold' },
  
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#1976D2' },
  modalSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  timeSlot: { padding: 15, backgroundColor: '#F5F6FA', borderRadius: 10, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  timeText: { fontSize: 16, color: '#333', fontWeight: '500' },
  cancelModalBtn: { marginTop: 10, alignItems: 'center', padding: 10 },
  cancelText: { color: 'red', fontSize: 16, fontWeight: 'bold' }
});