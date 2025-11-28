import React, { useState, useCallback } from 'react';
import { Text, TouchableOpacity, StatusBar, StyleSheet, View, ScrollView, Alert, Image } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'; // Agregamos MaterialIcons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserById, getEspacios, getMisReservasActivas, performCheckIn, performCheckOut } from '../database';

export default function HomeScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState(null);
    const [activeRes, setActiveRes] = useState(null);
    const [availableCount, setAvailableCount] = useState(0);
    const [notificationCount, setNotificationCount] = useState(2);

    // Función para cargar datos
    const loadData = async () => {
        try {
            const id = await AsyncStorage.getItem('userId');
            if (id) {
                const userData = getUserById(parseInt(id));
                setUser(userData);

                // Busca reservas Activas O En Curso
                const reservas = getMisReservasActivas(parseInt(id));
                setActiveRes(reservas.length > 0 ? reservas[0] : null);
            }

            const espacios = getEspacios();
            const libres = espacios.filter(e => e.estado === 'disponible').length;
            setAvailableCount(libres);

        } catch (e) {
            console.error("Error cargando Home:", e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );
    
    // LÓGICA: CHECK-IN
    const handleCheckIn = () => {
        Alert.alert(
            'Confirmar Check-in', 
            `¿Estás en ${activeRes?.espacio_nombre}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sí, hacer Check-in", 
                    onPress: () => {
                        performCheckIn(activeRes.id);
                        loadData(); // Recargar para actualizar botón
                    }
                }
            ]
        );
    };

    // LÓGICA: CHECK-OUT (LIBERAR)
    const handleCheckOut = () => {
        Alert.alert(
            'Liberar Espacio', 
            '¿Ya terminaste de usar el espacio?',
            [
                { text: "Seguir aquí", style: "cancel" },
                { 
                    text: "Sí, Liberar", 
                    style: 'destructive',
                    onPress: () => {
                        performCheckOut(activeRes.id);
                        Alert.alert("¡Listo!", "Espacio liberado. Se ha guardado en tu historial.");
                        loadData(); // La reserva desaparecerá del home
                    }
                }
            ]
        );
    };

    // Determina si la reserva ya está iniciada
    const isCheckedIn = activeRes?.estado === 'En Curso';

    return(
        <View style={styles.main}>
            <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

            {/* HEADER */}
            <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
                <Text style={styles.headerTitle}>UPQTECA</Text>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={26} color="white" />
                    {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                
                {/* TARJETA DE BIENVENIDA */}
                <View style={styles.welcomeCard}>
                    <View style={styles.userInfoRow}>
                        {user && user.foto ? (
                            <Image source={{ uri: user.foto }} style={styles.profileImage} />
                        ) : (
                            <AntDesign name="user" size={40} color="#1976D2" style={styles.userIcon} />
                        )}

                        <View style={{flex: 1}}>
                            <Text style={styles.greetingText}>
                                ¡Hola, {user ? user.nombre.split(' ')[0] : 'Estudiante'}!
                            </Text>
                            <Text style={styles.matriculaText}>
                                {user ? user.matricula : 'Cargando...'}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.availabilityRow}>
                        <Ionicons name="information-circle-outline" size={16} color="#4A90E2" />
                        <Text style={styles.availabilityText}>
                            {availableCount} espacios disponibles en biblioteca
                        </Text>
                    </View>
                </View>

                {/* TARJETA DE RESERVA ACTIVA / EN CURSO */}
                {activeRes ? (
                    <View style={[
                        styles.activeReservationCard,
                        isCheckedIn && styles.cardEnCurso // Cambia estilo si está en curso
                    ]}>
                        <View style={styles.reservationHeader}>
                            <Text style={styles.reservationTitle}>
                                {isCheckedIn ? 'Espacio en Uso' : 'Reserva Próxima'}
                            </Text>
                            <Text style={[
                                styles.reservationConfirmed,
                                isCheckedIn && styles.badgeEnCurso
                            ]}>
                                {isCheckedIn ? 'En Curso' : 'Confirmada'}
                            </Text>
                        </View>

                        <Text style={styles.cubicleName}>{activeRes.espacio_nombre}</Text>

                        <View style={styles.reservationDetailRow}>
                            <AntDesign name="clock-circle" size={14} color="#666" />
                            <Text style={styles.detailText}>{activeRes.fecha}, {activeRes.hora}</Text>
                        </View>
                        <View style={styles.reservationDetailRow}>
                            <Ionicons name="location-outline" size={16} color="#666" />
                            <Text style={styles.detailText}>{activeRes.ubicacion}</Text>
                        </View>

                        <View style={styles.reservationActionRow}>
                            
                            {/* BOTÓN DE ACCIÓN PRINCIPAL */}
                            <TouchableOpacity 
                                style={[
                                    styles.checkInButton,
                                    isCheckedIn && styles.checkOutButton // Cambia a rojo
                                ]} 
                                onPress={isCheckedIn ? handleCheckOut : handleCheckIn}
                            >
                                <MaterialIcons 
                                    name={isCheckedIn ? "logout" : "check-circle-outline"} 
                                    size={18} 
                                    color="white" 
                                />
                                <Text style={styles.checkInButtonText}>
                                    {isCheckedIn ? "Liberar Espacio" : "Check-in"}
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.detailsButton}
                                onPress={() => navigation.navigate('DetallesReserva', { item: activeRes, tipo: 'reserva' })}
                            >
                                <Text style={styles.detailsButtonText}>Ver detalles</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.noReservaCard}>
                        <Text style={styles.noReservaText}>No tienes reservas activas.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Espacios')}>
                            <Text style={styles.linkText}>Reservar ahora</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.quickActionsTitle}>Acciones Rápidas</Text>

                <View style={styles.quickActionsRow}>
                    <TouchableOpacity 
                        style={styles.quickActionButton}
                        onPress={() => navigation.navigate('Espacios')}
                    >
                        <AntDesign name="search" size={30} color="#1976D2" />
                        <Text style={styles.quickActionText}>Buscar Espacios</Text>
                        <Text style={styles.quickActionSubtitle}>Encuentra lugar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.quickActionButton}
                        onPress={() => navigation.navigate('Reservas')}
                    >
                        <AntDesign name="calendar" size={30} color="#1976D2" />
                        <Text style={styles.quickActionText}>Mis Reservas</Text>
                        <Text style={styles.quickActionSubtitle}>Gestiona tus citas</Text> 
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{ flex: 1, backgroundColor: '#F5F5F5' },
    container:{ flexGrow: 1, paddingHorizontal: 15, paddingTop: 0, paddingBottom: 20 },
    
    topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 15, backgroundColor: '#1976D2' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
    notificationButton: { position: 'relative', padding: 5 },
    badge: { position: 'absolute', top: 0, right: 0, backgroundColor: 'red', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    
    welcomeCard: { backgroundColor: 'white', borderRadius: 15, padding: 20, marginTop: 15, marginBottom: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
    userInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    userIcon: { padding: 8, backgroundColor: '#E6F0FF', borderRadius: 25, marginRight: 15 },
    profileImage: { width: 56, height: 56, borderRadius: 28, marginRight: 15, borderWidth: 1, borderColor: '#eee' },
    greetingText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    matriculaText: { fontSize: 14, color: '#666' },
    availabilityRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
    availabilityText: { marginLeft: 8, fontSize: 14, color: '#1976D2', fontWeight: '500' },
    
    // ESTILOS TARJETA RESERVA
    activeReservationCard: { backgroundColor: '#DCFCE7', borderRadius: 15, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#22C55E30' },
    cardEnCurso: { backgroundColor: '#E0F2FE', borderColor: '#0284C730' }, // Azul claro cuando está en curso

    noReservaCard: { backgroundColor: 'white', borderRadius: 15, padding: 20, marginBottom: 20, alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderStyle: 'dashed' },
    noReservaText: { color: '#666', marginBottom: 5 },
    linkText: { color: '#1976D2', fontWeight: 'bold' },
    
    reservationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    reservationTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    
    reservationConfirmed: { fontSize: 14, fontWeight: 'bold', color: '#22C55E', backgroundColor: '#22C55E30', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
    badgeEnCurso: { color: '#0284C7', backgroundColor: '#0284C730' }, // Badge azul

    cubicleName: { fontSize: 22, fontWeight: 'bold', color: '#1976D2', marginBottom: 10 },
    reservationDetailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    detailText: { marginLeft: 8, fontSize: 15, color: '#666' },
    reservationActionRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start', alignItems: 'center' },
    
    // BOTONES CHECK-IN / CHECK-OUT
    checkInButton: { flexDirection: 'row', backgroundColor: '#22C55E', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginRight: 15, elevation: 3 },
    checkOutButton: { backgroundColor: '#D32F2F' }, // Botón rojo para liberar

    checkInButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
    detailsButton: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' },
    detailsButtonText: { color: '#666', fontSize: 16, fontWeight: '500' },
    
    quickActionsTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    quickActionButton: { flex: 1, backgroundColor: 'white', borderRadius: 15, padding: 20, alignItems: 'center', marginHorizontal: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    quickActionText: { fontSize: 16, fontWeight: 'bold', color: '#1976D2', marginTop: 10 },
    quickActionSubtitle: { fontSize: 12, color: '#999', textAlign: 'center' },
});