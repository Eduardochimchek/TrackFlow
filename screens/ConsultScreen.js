// ConsultScreen.js

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ConsultScreen = ({ route }) => {
  const { delivery } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={['#FFD500', '#FFA000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>Detalhes da Entrega</Text>
          
          {/* Utilize o novo componente de Card para os detalhes */}
          <View style={styles.cardItem}>
            <Text style={styles.cardItemTitle}>ID:</Text>
            <Text style={styles.cardItemValue}>{delivery.id}</Text>
          </View>
          
          <View style={styles.cardItem}>
            <Text style={styles.cardItemTitle}>Título:</Text>
            <Text style={styles.cardItemValue}>{delivery.title}</Text>
          </View>
          
          <View style={styles.cardItem}>
            <Text style={styles.cardItemTitle}>Descrição:</Text>
            <Text style={styles.cardItemValue}>{delivery.description}</Text>
          </View>
          
          {/* Adicione mais informações da entrega conforme necessário */}
        </LinearGradient>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Status:</Text>
          <View style={styles.statusScrollView}>
            {delivery.statusHistory.map((statusItem, index) => (
              <View key={index} style={styles.statusItem}>
                <Text style={styles.statusText}>{statusItem.status}</Text>
                <Text style={styles.locationText}>{statusItem.location}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 16,
    padding: 16,
    fontFamily: 'Roboto-Bold', // Substitua pela sua fonte desejada
  },
  cardItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  cardItemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: 'Roboto-Regular', // Substitua pela sua fonte desejada
  },
  cardItemValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto-Regular', // Substitua pela sua fonte desejada
  },
  statusContainer: {
    marginTop: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Roboto-Bold', // Substitua pela sua fonte desejada
  },
  statusScrollView: {
    marginTop: 8,
  },
  statusItem: {
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: 'Roboto-Regular', // Substitua pela sua fonte desejada
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Roboto-Regular', // Substitua pela sua fonte desejada
  },
});

export default ConsultScreen;
