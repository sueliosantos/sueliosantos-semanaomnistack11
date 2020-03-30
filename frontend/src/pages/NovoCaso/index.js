import React, { useState } from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NovoCaso(){
    const [ titulo, setTitulo] = useState('');
    const [ descricao, setDescricao] = useState('');
    const [ valor, setValor] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history =  useHistory();

   async function handleNovoCaso(e){
        e.preventDefault();


        const data ={
            titulo,
            descricao,
            valor,
        };
        
        try{
            await api.post('casos', data, {
                    headers:{
                        Authorization: ongId,
                    }

                }
            )
            history.push('/profile');

        }catch(err){
            alert("Erro ao cadastrar caso, tente novamente");
        }

    }
    return(
        <div className="novo-caso-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente oara encontrar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar
                </Link>
            </section>
            <form onSubmit={handleNovoCaso}>
                <input 
                    placeholder ="Título do caso"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    />
                <textarea  
                    placeholder ="E-Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />
                <input  
                    placeholder ="R$ Valor"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    />
                <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>
    </div>
    );  
}