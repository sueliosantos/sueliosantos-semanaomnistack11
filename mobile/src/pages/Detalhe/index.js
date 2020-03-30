import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import * as MailComposer from 'expo-mail-composer';



export default function Detalhe(){
    
    const navigation =  useNavigation();
    const route = useRoute();
    const caso = route.params.caso;


    const messege = `Olá ${caso.nome}, estou entrando em contato pois gostaria de ajudar no caso ${caso.titulo} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'} ).format(caso.valor)}`;

    function navigateBack(){
        navigation.goBack();
    }


    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${caso.titulo}`,
            recipients: [caso.email],
            body: messege,

        })

    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${caso.watsapp}&text=${messege}`)

    }

    return (
        <View style={styles.container}>
           			<View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size ={28} color="#E02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.casos}>
				<Text style={styles.casosPropriedade, {marginTop: 0} } >ONG:</Text>
                    <Text style={styles.casosValor}>{caso.nome} de {caso.cidade}/{caso.uf}</Text>

                    <Text style={styles.casosPropriedade} >CASO:</Text>
                    <Text style={styles.casosValor}>{caso.titulo}</Text>

                    <Text style={styles.casosPropriedade} >VALOR:</Text>
                    <Text style={styles.casosValor}>{Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL'}
                        ).format(caso.valor)}</Text>
            </View>
            <View style={styles.contato}>
                <Text style={styles.heroTitle} >Salve o dia</Text>
                <Text style={styles.heroTitle} >Seja o herói desse caso!</Text>
                <Text style={styles.heroDescricao} >Entre em contato:</Text>

                <View style={styles.acoes}>
                    <TouchableOpacity style={styles.acao} onPress={sendWhatsapp}>
                        <Text style={styles.textoAcao}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acao} onPress={sendMail}>
                        <Text style={styles.textoAcao}>E-mail</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}