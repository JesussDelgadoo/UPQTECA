import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetallesScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  
  const params = route.params || {};
  const item = params.item || {};
  const tipo = params.tipo || 'espacio';

  // Helpers de estado
  const getStatusColor = (status) => {
      if (!status) return { bg: '#eee', text: '#666' };
      const s = String(status).toLowerCase();
      if (s === 'disponible' || s === 'activa' || s === 'completada') return { bg: '#DCFCE7', text: '#166534' };
      if (s === 'ocupado' || s === 'cancelada') return { bg: '#FEE2E2', text: '#991B1B' };
      return { bg: '#eee', text: '#666' };
  };

  const statusStyle = getStatusColor(item.estado);

  // Validaciones seguras
  const tieneCapacidad = item.capacidad !== undefined && item.capacidad !== null && Number(item.capacidad) > 0;
  const tieneEquipamiento = !!item.equipamiento && item.equipamiento !== '';
  const esReserva = !!(item.fecha || item.hora);
  const tieneRating = item.rating !== undefined && item.rating !== null && Number(item.rating) > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          
          {/* Título e Icono Principal */}
          <View style={styles.cardHeader}>
             <MaterialIcons 
                name={tipo === 'espacio' ? "business" : "event-note"} 
                size={48} 
                color="#1976D2" 
                style={{marginBottom:10}} 
             />
             <Text style={styles.title}>
               {item.nombre || item.espacio_nombre || "Sin Nombre"}
             </Text>
             
             {!!item.estado && (
                <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                        {String(item.estado).toUpperCase()}
                    </Text>
                </View>
             )}
          </View>
          
          <View style={styles.divider} />

          {/* Ubicación */}
          <View style={styles.row}>
            <Ionicons name="location-outline" size={22} color="#666" style={styles.icon} />
            <Text style={styles.text}>{item.ubicacion || "Ubicación no disponible"}</Text>
          </View>

          {/* Capacidad */}
          {tieneCapacidad && (
            <View style={styles.row}>
              <Ionicons name="people-outline" size={22} color="#666" style={styles.icon} />
              <Text style={styles.text}>Capacidad: {item.capacidad} personas</Text>
            </View>
          )}

          {/* Equipamiento */}
          {tieneEquipamiento && (
            <View style={styles.section}>
                <View style={styles.rowHeader}>
                    <Feather name="box" size={18} color="#333" />
                    <Text style={styles.sectionTitle}>Equipamiento</Text>
                </View>
                <Text style={styles.descriptionText}>{item.equipamiento}</Text>
            </View>
          )}

          {/* Información de Reserva */}
          {esReserva && (
             <View style={styles.section}>
                <View style={styles.rowHeader}>
                    <AntDesign name="clock-circle" size={18} color="#333" />
                    <Text style={styles.sectionTitle}>Información de Reserva</Text>
                </View>
                
                <View style={{ marginTop: 10 }}>
                    {/* Fila Fecha */}
                    <View style={styles.rowInfo}>
                        <MaterialIcons name="calendar-today" size={18} color="#666" />
                        <Text style={styles.textInfo}>{item.fecha || '--'}</Text>
                    </View>
                    
                    {/* Fila Hora */}
                    <View style={styles.rowInfo}>
                        <AntDesign name="clock-circle" size={18} color="#666" />
                        <Text style={styles.textInfo}>{item.hora || '--'}</Text>
                    </View>

                    {/* Estado */}
                    {!!item.estado && (
                        <View style={styles.rowInfo}>
                            <Text style={[styles.textInfo, {
                                color: String(item.estado) === 'Activa' ? 'green' : 'red', 
                                fontWeight:'bold',
                                marginLeft: 0 
                            }]}>
                                Estado: {item.estado}
                            </Text>
                        </View>
                    )}
                </View>
             </View>
          )}
          
          {/* Calificación */}
          {tieneRating && (
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Tu Calificación</Text>
                  <View style={{flexDirection:'row', marginTop: 5}}>
                      {[1,2,3,4,5].map((i) => (
                          <FontAwesome 
                            key={i} 
                            name={i <= Number(item.rating) ? "star" : "star-half-empty"} 
                            size={24} 
                            color="#FFD700" 
                          />
                      ))}
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
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  
  header: { 
    backgroundColor: '#1976D2', // <--- Hex directo
    paddingHorizontal: 20, 
    paddingBottom: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  backBtn: { padding: 5 },
  
  content: { padding: 20 },
  
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  cardHeader: { alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
  
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 5 },
  badgeText: { fontWeight: '700', fontSize: 12 },
  
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  
  // Filas generales 
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  icon: { marginRight: 12, width: 24, textAlign: 'center' },
  text: { fontSize: 16, color: '#444', flex: 1 },

  // Filas Reserva
  rowHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  rowInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  textInfo: { fontSize: 16, color: '#444', marginLeft: 10, flex: 1 },
  
  section: { marginTop: 20, backgroundColor: '#F9FAFB', padding: 15, borderRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginLeft: 8 },
  descriptionText: { color: '#555', lineHeight: 22, fontSize: 15 },
  
  actionBtn: { backgroundColor: '#1976D2', padding: 15, borderRadius: 10, alignItems: 'center' }, // <--- Hex directo
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});