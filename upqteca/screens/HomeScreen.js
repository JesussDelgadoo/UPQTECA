import React, {useState} from 'react';
import {Text,TouchableOpacity,StatusBar,StyleSheet,View,ScrollView,Switch,Alert} from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const primaryBlue = '#1976D2';
const secondaryBlue = '#2196F3';
const successGreen = '#22C55E';
const lightSuccessBackground = '#DCFCE7';

export default function DashboardScreen() {
    const [notificationCount, setNotificationCount] = useState(2);
    
    const handleCheckIn = () => {
        Alert.alert('Check-in', 'Realizando Check-in para Cubículo Individual A1...');
    };

    return(
        <View style={styles.main}>
        
            <StatusBar barStyle="light-content" backgroundColor={primaryBlue}/>

            <View style={styles.topHeader}>
                <Text style={styles.headerTitle}>UPTECA</Text>
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
                
                <View style={styles.welcomeCard}>
                    <View style={styles.userInfoRow}>
                        <AntDesign name="user" size={40} color={primaryBlue} style={styles.userIcon} />
                        <View>
                            <Text style={styles.greetingText}>¡Hola, Jesus!</Text>
                            <Text style={styles.matriculaText}>122041657</Text>
                        </View>
                    </View>
                    
                    <View style={styles.availabilityRow}>
                        <Ionicons name="information-circle-outline" size={16} color="#4A90E2" />
                        <Text style={styles.availabilityText}>4 espacios disponibles en biblioteca</Text>
                    </View>
                </View>

                <View style={styles.activeReservationCard}>
                    <View style={styles.reservationHeader}>
                        <Text style={styles.reservationTitle}>Reserva Activa</Text>
                        <Text style={styles.reservationConfirmed}>Confirmada</Text>
                    </View>

                    <Text style={styles.cubicleName}>Cubículo Individual A1</Text>

                    <View style={styles.reservationDetailRow}>
                        <AntDesign name="clockcircleo" size={14} color="#666" />
                        <Text style={styles.detailText}>Hoy, 14:00 - 16:00</Text>
                    </View>
                    <View style={styles.reservationDetailRow}>
                        <Ionicons name="location-outline" size={16} color="#666" />
                        <Text style={styles.detailText}>Biblioteca - Planta Baja</Text>
                    </View>

                    <View style={styles.reservationActionRow}>
                        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
                            <AntDesign name="checkcircle" size={18} color="white" />
                            <Text style={styles.checkInButtonText}>Check-in</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>Ver detalles</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.quickActionsTitle}>Acciones Rápidas</Text>

                <View style={styles.quickActionsRow}>
                    <TouchableOpacity style={styles.quickActionButton}>
                        <AntDesign name="search1" size={30} color={primaryBlue} />
                        <Text style={styles.quickActionText}>Buscar Espacios</Text>
                        <Text style={styles.quickActionSubtitle}>Encuentra el lugar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionButton}>
                        <AntDesign name="calendar" size={30} color={primaryBlue} />
                        <Text style={styles.quickActionText}>Mis Reservas</Text>
                        <Text style={styles.quickActionSubtitle}>Gestiona tus</Text> 
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.bottomNav}>
                <View style={[styles.navItem, styles.navItemActive]}>
                    <Ionicons name="home" size={24} color={primaryBlue} />
                    <Text style={[styles.navText, styles.navTextActive]}>Inicio</Text>
                </View>
                
                <View style={styles.navItem}>
                    <MaterialCommunityIcons name="calendar-check-outline" size={24} color="#666" />
                    <Text style={styles.navText}>Reservas</Text>
                </View>

                <View style={styles.navItem}>
                    <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="#666" />
                    <Text style={styles.navText}>Espacios</Text>
                </View>
                
                <View style={styles.navItem}>
                    <MaterialCommunityIcons name="history" size={24} color="#666" />
                    <Text style={styles.navText}>Historial</Text>
                </View>

                <View style={styles.navItem}>
                    <AntDesign name="user" size={24} color="#666" />
                    <Text style={styles.navText}>Perfil</Text>
                </View>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container:{
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 0,
        paddingBottom: 100,
    },

    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: primaryBlue,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    notificationButton: {
        position: 'relative',
        padding: 5,
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },

    welcomeCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginTop: 15,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    userIcon: {
        padding: 8,
        backgroundColor: '#E6F0FF', 
        borderRadius: 25,
        marginRight: 15,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    matriculaText: {
        fontSize: 14,
        color: '#666',
    },
    availabilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 10,
    },
    availabilityText: {
        marginLeft: 8,
        fontSize: 14,
        color: primaryBlue,
        fontWeight: '500',
    },

    activeReservationCard: {
        backgroundColor: lightSuccessBackground,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: successGreen + '30',
    },
    reservationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    reservationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    reservationConfirmed: {
        fontSize: 14,
        fontWeight: 'bold',
        color: successGreen,
        backgroundColor: successGreen + '30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    cubicleName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: primaryBlue,
        marginBottom: 10,
    },
    reservationDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#666',
    },
    reservationActionRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    checkInButton: {
        flexDirection: 'row',
        backgroundColor: successGreen,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 15,
        elevation: 3,
    },
    checkInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    detailsButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    detailsButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },

    quickActionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    quickActionButton: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    quickActionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: primaryBlue,
        marginTop: 10,
    },
    quickActionSubtitle: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },

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
        borderTopColor: '#eee',
        elevation: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        flex: 1,
    },
    navItemActive: {
        borderTopWidth: 2,
        borderTopColor: primaryBlue,
        paddingTop: 8,
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    navTextActive: {
        color: primaryBlue,
        fontWeight: 'bold',
    },
});