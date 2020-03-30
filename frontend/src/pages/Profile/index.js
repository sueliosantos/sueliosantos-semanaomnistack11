import React, { useState,useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';



export default function Profile() {
    const [casos, setCasos] = useState([]);
    const history =  useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() =>{
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then( response => {
            setCasos(response.data);
        })

    }, [ongId] );

    async function handleDeleteCaso(id){
        try{
            await api.delete(`casos/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            }
        );

        setCasos(casos.filter(caso => caso.id !== id ));
        }catch (err) {
            alert("Erro ao deletar caso");
        }
    }


    function handleLagout(){
        localStorage.clear();
        history.push('/');


    }
    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>   
                <span>Bem vinda { ongName }</span>


                <Link className="button" to="/casos/novo">
                        Cadastrar novo caso
                </Link>

                <button onClick={handleLagout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {casos.map(casos =>(
                    <li key={casos.id}>
                        <strong>CASO:</strong>
                        <p>{casos.titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{casos.descricao}</p>


                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format( casos.valor)}</p>
                        <button onClick={() => handleDeleteCaso(casos.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}