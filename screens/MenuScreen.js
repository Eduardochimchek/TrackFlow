import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const MenuScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Lógica de logout (pode ser implementada conforme necessário)

    // Navegar de volta para a tela de login após o logout
    navigation.navigate('Login');
  };

  const deliveries = [
    {
      id: 1,
      title: 'Entrega 1',
      description: 'Descrição da entrega 1.',
    },
    {
      id: 2,
      title: 'Entrega 2',
      description: 'Descrição da entrega 2.',
    },
    // Adicione mais entregas conforme necessário
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Entregas</Text>
      {deliveries.map((delivery) => (
        <Card key={delivery.id} style={styles.card}>
          <Card.Content>
            <Title>{delivery.title}</Title>
            <Paragraph>{delivery.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginVertical: 8,
  },
});

export default MenuScreen;