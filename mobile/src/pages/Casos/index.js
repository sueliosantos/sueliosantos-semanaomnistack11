import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png'
import styles from './styles';
import api from '../../services/api';


export default function Casos(){
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDelail(caso){
        navigation.navigate('Detalhe', { caso })
    }

    async function loadCasos(){
        if (loading){
            return;
        }

        if (total > 0 && casos.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('casos', {
            params: { page }
        });

        setLoading(false);

        setCasos([...casos, ...response.data]);
        setPage(page + 1);
        setTotal(response.headers['X-Total-Count']);

    }
    useEffect(() => {
        loadCasos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>.
                </Text>
            </View>
            <Text style={styles.title} >Bem Vindo!</Text>
            <Text style={styles.description} >Escolha um dos casos abaixo e salve vidas.</Text>


            <FlatList
                style={styles.casosLista }
                data={casos}
                keyExtractor={ caso => String(caso.id) }
                showsVerticalScrollIndicator={false}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.2}
                renderItem={({ item: caso }) => (
                <View style={styles.casos} >
                    <Text style={styles.casosPropriedade} >ONG:</Text>
                    <Text style={styles.casosValor}>{caso.nome}</Text>

                    <Text style={styles.casosPropriedade} >CASO:</Text>
                    <Text style={styles.casosValor}>{caso.titulo}</Text>

                    <Text style={styles.casosPropriedade} >VALOR:</Text>
                    <Text style={styles.casosValor}>{Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL'}
                        ).format(caso.valor)}</Text>

                    <TouchableOpacity style={styles.botaoDetalhe} 
                            onPress ={() => navigateToDelail(caso)}>
                        <Text style={styles.botaoDetalheTexto} > Ver mais detalhes </Text>
                        <Feather name="arrow-right" size ={16} color="#E02041"/>
                    </TouchableOpacity>
                    
                </View>

                )}
            />
        </View>
    );
}