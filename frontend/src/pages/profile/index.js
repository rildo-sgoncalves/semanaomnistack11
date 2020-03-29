import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    

    /**
     * userEffect
     * 1º parâmetro: função que deve ser executada na inicialização do componente.
     * 2º parâmetro: array de dependências. Isso é, toda vez que as informações que estiverem dentro desse array mudarem, 
     * a função informada no 1º parâmetro é executada. Se o array estiver vazio, a função só será executada uma única vez. 
     */
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert("Erro ao deletar caso, tente novamente.")
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Be the hero" />
                <span>Bem vinda, { ongName }</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                { incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}