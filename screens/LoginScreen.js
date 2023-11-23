import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleLogin = () => {
    // Validar se os campos de usuário e senha estão preenchidos
    if (username.trim() === '' || password.trim() === '') {
      // Campos em branco, exibir mensagem de erro
      setError('Por favor, preencha todos os campos.');
      // Exibir o Modal de erro
      setIsErrorModalVisible(true);
    } else {
      // Limpar mensagem de erro e fechar o Modal
      setError('');
      setIsErrorModalVisible(false);
      // Campos preenchidos, continuar com a lógica de autenticação
      // Navegar para a tela de menu após o login
      navigation.navigate('Menu');
    }
  };

  const closeErrorModal = () => {
    // Fechar o Modal de erro
    setIsErrorModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#FFD700', '#FFA500']} // Gradiente de amarelo para laranja
      style={styles.container}
    >
      <Text style={styles.title}>TrackFlow</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Modal de Erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isErrorModalVisible}
        onRequestClose={closeErrorModal}
      >
        <View style={styles.errorModal}>
          <View style={styles.errorModalContent}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.okButton} onPress={closeErrorModal}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingLeft: 12,
    borderRadius: 8,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos para o Modal de Erro
  errorModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  okButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
