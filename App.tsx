import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import axios from 'axios';

type Endereco = {
  cep: string,
  logradouro: string,
  bairro: string,
  localidade: string,
  uf: string
}

export default function App() {
  const [contador, Setcontador] = useState(0);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState< Endereco | null>(null)

  useEffect(() => {
    carregarCepInicial()
  } , []);

  async function carregarCepInicial(){
    let resposta = await axios.get('https://viacep.com.br/ws/09341-350/json/')
    setEndereco(resposta.data)
    setCep((resposta.data).cep)
  }

  async function pesquisarCep(){
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let resposta = await fetch(url);
    let enderecoNovo = await resposta.json();
    setEndereco(enderecoNovo)
  

  }
  function adcionar(){
    Setcontador(contador + 1);
  };

  return (
    <View style={styles.container}>
      <Text> Contando : { contador }</Text>
      <Button title="Adicionar" onPress={ adcionar }/>
      <StatusBar style="auto"/>
      <Image source={{uri: "https://images.pexels.com/photos/31133725/pexels-photo-31133725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}} style={styles.imagem}/>
      <TextInput onChangeText={setCep} value={cep} style={styles.box}></TextInput>
      <Button onPress={pesquisarCep} title='Pesquisar'></Button>
      <Text> Cep : {cep} </Text>
      {endereco&& <Text>  Rua : { endereco.logradouro }</Text>}
      {endereco&& <Text>  Bairro : { endereco.bairro }</Text>}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {  
    width: 300,
    height: 80,
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',  
    textAlign: 'center',  
  },
  imagem: {
    width: 300,
    height: 200,
    borderRadius: 5, 
    margin: 10
  }
  
   
});
