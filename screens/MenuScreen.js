import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  const [deliveries, setDeliveries] = useState([
    {
      id: 'AA123456789BR',
      title: 'Entrega 1',
      description: 'Notebook Gamer - Valor: R$ 5.000,00',
      statusHistory: [
        { status: 'Em trânsito', location: 'Centro de Distribuição 1' },
        { status: 'Chegou na cidade', location: 'Centro de Distribuição 2' },
        { status: 'Saiu para entrega', location: 'Rua A, 123' },
        { status: 'Entregue', location: 'Rua A, 123' },
        { status: 'Avaliação do cliente', location: 'Cliente satisfeito' },
        { status: 'Concluído', location: 'Entrega finalizada' },
      ],
    },
    {
      id: 'BB987654321BR',
      title: 'Entrega 2',
      description: 'Smartphone Top de Linha - Valor: R$ 3.000,00',
      statusHistory: [
        { status: 'Em trânsito', location: 'Centro de Distribuição 1' },
        { status: 'Chegou na cidade', location: 'Centro de Distribuição 2' },
        { status: 'Saiu para entrega', location: 'Rua B, 456' },
        { status: 'Entregue', location: 'Rua B, 456' },
        { status: 'Avaliação do cliente', location: 'Cliente satisfeito' },
        { status: 'Concluído', location: 'Entrega finalizada' },
      ],
    },
    {
      id: 'CC111223344BR',
      title: 'Entrega 3',
      description: 'Console de Videogame - Valor: R$ 1.500,00',
      statusHistory: [
        { status: 'Em trânsito', location: 'Centro de Distribuição 1' },
      ],
    },
    {
      id: 'DD555667788BR',
      title: 'Entrega 4',
      description: 'Monitor UltraWide - Valor: R$ 1.200,00',
      statusHistory: [
        { status: 'Em trânsito', location: 'Centro de Distribuição 1' },
        { status: 'Chegou na cidade', location: 'Centro de Distribuição 4' },
      ],
    },
    {
      id: 'EE987654321BR',
      title: 'Entrega 5',
      description: 'Placa de Vídeo GTX 3080 - Valor: R$ 2.500,00',
      statusHistory: [
        { status: 'Em trânsito', location: 'Centro de Distribuição 1' },
        { status: 'Chegou na cidade', location: 'Centro de Distribuição 5' },
        { status: 'Verificação de qualidade', location: 'Depósito 2' },
        { status: 'Saiu para entrega', location: 'Rua E, 1213' },
      ],
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newTrackingCode, setNewTrackingCode] = useState('');

  const fadeOutAnimations = useRef(
    deliveries.reduce((acc, delivery) => {
      acc[delivery.id] = new Animated.Value(1);
      return acc;
    }, {})
  );

  useEffect(() => {
    // Atualizar as animações quando as entregas mudam
    const newAnimations = deliveries.reduce((acc, delivery) => {
      acc[delivery.id] = new Animated.Value(1);
      return acc;
    }, {});

    fadeOutAnimations.current = newAnimations;
  }, [deliveries]);
  

  const handleDelete = (id, index) => {
    const updatedDeliveries = deliveries.filter((delivery) => delivery.id !== id);
    setDeliveries(updatedDeliveries);
  };

  const handleConsult = (delivery) => {
    navigation.navigate('Consultar pedido', { delivery });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddDelivery = () => {
    // Verifica se o código de rastreamento tem o comprimento correto
    if (newTrackingCode.length !== 13) {
      console.log("O código de rastreamento deve ter 13 caracteres.");
      return;
    }
  
    // Verifica se o ID já existe
    const idAlreadyExists = deliveries.some((delivery) => delivery.id === newTrackingCode);
    if (idAlreadyExists) {
      console.log("Já existe uma entrega com esse código de rastreamento.");
      return;
    }
  
    // Cria a nova entrega
    const newDelivery = {
      id: newTrackingCode,
      title: `Entrega ${deliveries.length + 1}`,
      description: 'Nova Entrega',
      statusHistory: [{ status: 'Em trânsito', location: 'Centro de Distribuição 1' }],
    };
  
    // Adiciona a nova entrega ao estado
    setDeliveries((prevDeliveries) => [...prevDeliveries, newDelivery]);
  
    // Fecha o modal e limpa o estado do código de rastreamento
    setNewTrackingCode('');
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['#FFD500', '#FFA000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.header}>Suas Entregas</Text>
        </LinearGradient>

        {deliveries.map((delivery, index) => (
            <Card style={[styles.card, index === deliveries.length - 1 && { marginBottom: 100 }]}>
              <Card.Content>
                <Title style={styles.cardTitle}>{delivery.title}</Title>
                <Paragraph style={styles.cardDescription}>{delivery.description}</Paragraph>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailText}>Status: {delivery.statusHistory[delivery.statusHistory.length - 1].status}</Text>
                  <Text style={styles.detailText}>Local: {delivery.statusHistory[delivery.statusHistory.length - 1].location}</Text>
                </View>
                <Text style={styles.trackingCode}>{delivery.id}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleConsult(delivery)} style={styles.button}>
                    <Text style={styles.buttonText}>Consultar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(delivery.id, index)} style={styles.button}>
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton, { bottom: 36, right: 25 }]}
        onPress={toggleModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Digite o código de rastreamento</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Exemplo: AA123456789BR"
            maxLength={13}
            onChangeText={(text) => setNewTrackingCode(text)}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleAddDelivery}
            disabled={newTrackingCode.length !== 13}
          >
            <Text style={styles.modalButtonText}>Adicionar Entrega</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFD500',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    borderRadius: 8,
    marginBottom: 24,
  },
  header: {
    fontSize: 32,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },
  card: {
    marginVertical: 8,
    elevation: 4,
    backgroundColor: '#FFFFF0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#1E1E1E',
    fontFamily: 'Arial',
    fontSize: 18,
  },
  cardDescription: {
    color: '#757575',
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  trackingCode: {
    color: '#00796B',
    marginTop: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#00796B',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#00796B',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MenuScreen;