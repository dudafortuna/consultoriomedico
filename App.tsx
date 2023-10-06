import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const pacientesAgendados = [

];

export default function App() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [pacientes, setPacientes] = useState(pacientesAgendados);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const agendarConsulta = () => {
    const novoPaciente = {
      id: Math.random().toString(),
      nome,
      dataNascimento,
      cpf,
      endereco,
      dataConsulta,
      valorCobrado: '450.00', 
    };

    setPacientes([...pacientes, novoPaciente]);
    setModalVisible(false);

    console.log('Dados do paciente', novoPaciente);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marcar Consulta</Text>

      <Button
        title="Agendar Consulta"
        onPress={() => setModalVisible(true)}
        color="#67B634"
      />

      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pacienteItem}
            onPress={() => setSelectedPatient(item)}
          >
            <Text style={styles.pacienteInfo}>Nome: {item.nome}</Text>
            {}
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Agendar Consulta</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            onChangeText={(text) => setDataNascimento(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={(text) => setCpf(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            onChangeText={(text) => setEndereco(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Data da Consulta (AAAA-MM-DD)"
            onChangeText={(text) => setDataConsulta(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Agendar" onPress={agendarConsulta} 
             color="#67B634"
             />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="#D64323"
            />
          </View>
        </View>
      </Modal>

      {selectedPatient && (
        <Modal visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalhes do Paciente</Text>
            <Text>Nome: {selectedPatient.nome}</Text>
            <Text>Data de Nascimento: {selectedPatient.dataNascimento}</Text>
            <Text>CPF: {selectedPatient.cpf}</Text>
            <Text>Endereço: {selectedPatient.endereco}</Text>
            <Text>Data da Consulta: {selectedPatient.dataConsulta}</Text>
            <Text>Valor Cobrado: R$ {selectedPatient.valorCobrado}</Text>
            <Button
              title="Fechar"
              onPress={() => setSelectedPatient(null)}
              color= '#900A0A'
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  pacienteItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  pacienteInfo: {
    marginBottom: 8,
  },
});