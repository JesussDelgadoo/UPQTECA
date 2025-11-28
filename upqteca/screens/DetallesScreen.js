import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

export default function DetallesScreen({ route, navigation }) {
  const item = route.params?.item || {};
  const tipo = route.params?.tipo || 'espacio';

  const tieneCapacidad = item.capacidad !== null && item.capacidad !== undefined && item.capacidad !== 0;
  const tieneEquipamiento = item.equipamiento && item.equipamiento !== '';
  // Validamos si debe mostrarse la sección de reserva
  const esReserva = item.fecha || item.hora;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {item.nombre || item.espacio_nombre || "Sin Nombre"}
          </Text>
          
          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <Text style={styles.text}>{item.ubicacion || "Ubicación no disponible"}</Text>
          </View>

          {tieneCapacidad && (
            <View style={styles.row}>
              <Ionicons name="people-outline" size={20} color="#666" style={styles.icon} />
              <Text style={styles.text}>Capacidad: {item.capacidad} personas</Text>
            </View>
          )}

          {tieneEquipamiento && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Equipamiento:</Text>
                <Text style={styles.text}>{item.equipamiento}</Text>
            </View>
          )}

          {esReserva && (
             <View style={styles.section}>
                <View style={styles.sectionHeaderBox}>
                    <AntDesign name="clockcircleo" size={18} color="#333" />
                    <Text style={styles.sectionTitle}>Información de Reserva</Text>
                </View>
                
                {/* --- SECCIÓN MODIFICADA CON TUS ICONOS --- */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.textWithIcon}>
                        <MaterialIcons name="calendar-today" size={18} color="#666" />
                        <Text>  {item.fecha || '--'}</Text>
                    </Text>
                    
                    <Text style={[styles.textWithIcon, { marginTop: 8 }]}>
                        {/* Corregido: 'clock-circle' -> 'clockcircleo' para AntDesign */}
                        <AntDesign name="clockcircleo" size={18} color="#666" />
                        <Text>  {item.hora || '--'}</Text>
                    </Text>

                    {item.estado ? (
                        <Text style={[styles.text, {color: item.estado === 'Activa' ? 'green' : 'red', fontWeight:'bold', marginTop: 10}]}>
                            Estado: {item.estado || 'Desconocido'}
                        </Text>
                    ) : null}
                </View>
             </View>
          )}
        </View>

        <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.actionBtnText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { 
    backgroundColor: '#1976D2', 
    padding: 20, 
    paddingTop: 50, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  backBtn: { marginRight: 15 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginBottom: 20, elevation: 3 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1976D2', marginBottom: 15 },
  
  // Estilos generales de fila
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { marginRight: 10 }, // Margen para separar icono del texto
  
  text: { fontSize: 16, color: '#444' },
  textWithIcon: { fontSize: 16, color: '#444', textAlignVertical: 'center' }, // Nuevo estilo para alinear texto e icono
  
  section: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#eee' },
  sectionHeaderBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, color: '#333' },
  
  actionBtn: { backgroundColor: '#1976D2', padding: 15, borderRadius: 10, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});