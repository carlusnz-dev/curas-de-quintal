import React from "react";
import { Link } from "react-router-dom";
import plantasData from "../data/plantas.json";
import Fuse from "fuse.js";
import "../styles/Plantas.css";

const formatarNomeParaCaminho = (nome) => {
     return nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/-/g, "_");
};

// Configuração do Fuse.js para busca de nomes similares
const fuse = new Fuse(plantasData, {
     keys: ['nomePopular'],
     threshold: 0.3,
});

export default function Plantas() {
     const [plantas, setPlantas] = React.useState([]);
     React.useEffect(() => {
          setPlantas(plantasData);
     }, []);

     const carregarImagem = (nomePopular) => {
          try {
               return require(`../assets/imgs/plantas/${formatarNomeParaCaminho(nomePopular)}.jpg`);
          }
          catch (error) {
               return require("../logo - CDC.png");
          }
     }

     return (
          <div className="container">
               <div className="title" style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h1 className="display-3 fw-bold text-center mt-5">Acervo de plantas</h1>
                    <p className="lead text-center mb-5">
                         Conheça nosso acervo de plantas medicinais e suas propriedades.
                    </p>
               </div>
               <div className="row">
                    {plantas.map((planta, index) => (
                         <div className="col-lg-4 mx-auto col-md-6 mb-4" key={planta.id}>
                              <div className="card border-0 shadow-lg rounded-5" id="plantCard">
                                   <div className="card-body">
                                        <img
                                             src={carregarImagem(planta.nomePopular)}
                                             alt={planta.nomePopular}
                                             className="img-fluid rounded-5"
                                        />
                                        <h3 className="card-title text-center mt-3">{planta.nomePopular}</h3>
                                        <p className="card-text text-center">{planta.nomeCientifico}</p>
                                        <Link to={`/planta/${planta.id}`} className="btn btn-link">Ver detalhes</Link>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
}