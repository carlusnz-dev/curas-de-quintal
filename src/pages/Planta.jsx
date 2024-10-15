import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import plantasData from '../data/plantas.json';
import '../styles/Planta.css';

const formatarNomeParaCaminho = (nome) => {
     return nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
          .toLowerCase()
          .replace(/\s+/g, "_") // Substitui espaços por underscore
          .replace(/-/g, "_");
};

const Planta = () => {
     const { id } = useParams();
     const [planta, setPlanta] = useState(null);

     useEffect(() => {
          const plantaEncontrada = plantasData.find(planta => planta.id === parseInt(id));
          setPlanta(plantaEncontrada);
     }, [id]);

     if (!planta) {
          return <div>Planta não encontrada</div>;
     }

     const carregarImagem = (nomePopular) => {
          try {
               return require(`../assets/imgs/plantas/${formatarNomeParaCaminho(nomePopular)}.jpg`);
          }
          catch (error) {
               return require("../logo - CDC.png");
          }
     }

     return (
          <div className="plant-container text-center">
               <h1>{planta.nomePopular}</h1>
               <h3>({planta.nomeCientifico})</h3>
               <img src={carregarImagem(planta.nomePopular)} alt={planta.nomePopular} />
               <p><strong>Indicações:</strong> {planta.indicacoes}</p>
               <p><strong>Formas de uso:</strong> {planta.formasUso}</p>
               <p><strong>Origem:</strong> {planta.origem}</p>
          </div>
     );
};

export default Planta;
