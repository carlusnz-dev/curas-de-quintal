import React, {useState, useEffect, Suspense} from "react";
import { Link } from "react-router-dom";
import logo from "../logo - CDC.png";
import plantasData from "../data/plantas.json";
import "../styles/Home.css";
import Fuse from "fuse.js";
import { Modal, Button } from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import {OrbitControls, Environment, ContactShadows} from "@react-three/drei";
import Plant from "../components/Plant";

// Função para remover acentos, espaços e transformar em minúsculas e underscore
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

export default function Home() {
     const [plantasExibidas, setPlantasExibidas] = useState([]);
     const [contador, setContador] = useState(3); // Estado para controlar o número de plantas exibidas
     const [query, setQuery] = useState(""); // Estado para controlar a busca
     const [modalShow, setModalShow] = useState(false); // Estado para controlar a exibição do modal
     const [resultadosBusca, setResultadosBusca] = useState([]); // Estado para armazenar os resultados da busca
     const [errorModalShow, setErrorModalShow] = useState(false); // Estado para mostrar o modal de erro

     useEffect(() => {
          carregarPlantasAleatorias();
     }, []);

     const carregarPlantasAleatorias = () => {
          const plantasAleatorias = [];
          const plantasNaoExibidas = [...plantasData];

          while (plantasAleatorias.length < 3 && plantasNaoExibidas.length > 0) {
               const randomIndex = Math.floor(Math.random() * plantasNaoExibidas.length);
               plantasAleatorias.push(plantasNaoExibidas[randomIndex]);
               plantasNaoExibidas.splice(randomIndex, 1);
          }

          setPlantasExibidas(plantasAleatorias);
     };

     const mostrarMaisPlantas = () => {
          const plantasAleatorias = [];
          const plantasNaoExibidas = plantasData.filter(planta => !plantasExibidas.includes(planta));

          while (plantasAleatorias.length < 3 && plantasNaoExibidas.length > 0) {
               const randomIndex = Math.floor(Math.random() * plantasNaoExibidas.length);
               plantasAleatorias.push(plantasNaoExibidas[randomIndex]);
               plantasNaoExibidas.splice(randomIndex, 1);
          }

          setPlantasExibidas(prev => [...prev, ...plantasAleatorias]);
     };

     // Função de busca utilizando Fuse.js
     const realizarBusca = (e) => {
          e.preventDefault();
          if (query.trim() === "") {
               carregarPlantasAleatorias();
               return;
          }

          const resultados = fuse.search(query);
          const plantasEncontradas = resultados.map(result => result.item);

          if (plantasEncontradas.length > 0) {
               setResultadosBusca(plantasEncontradas);
               setModalShow(true); // Abre o modal com os resultados
               setErrorModalShow(false); // Fecha o modal de erro, se estiver aberto
          } else {
               setErrorModalShow(true); // Abre o modal de erro
          }
     };

     const carregarImagem = (nomePopular) => {
          const caminhoImagem = `/assets/imgs/plantas/${formatarNomeParaCaminho(nomePopular)}.jpg`;
          return caminhoImagem;
     }

     return (
          <div>
               <div className="container">
                    <div className="row" id="titleRow">
                         <div className="col-md-6 align-self-center text-center p-3">
                              <h1 className="display-1 fw-bold d-none d-md-block">Curas de Quintal</h1>
                              <img className="img-fluid d-block d-md-none" src={logo} alt="Logotipo do projeto Curas de Quintal" />
                              <h4>Dos terreiros da Caatinga ao mundo digital</h4>
                              <Link to="/sobre" className="btn btn-link mt-md-3">Saiba mais</Link>
                         </div>
                         <div className="col-md-6 d-none d-md-block">
                              <img className="img-fluid" src={logo} alt="Logotipo do projeto Curas de Quintal" height={300} />
                         </div>
                    </div>
               </div>

               <div className="container-fluid" id="searchContainer">
                    <div className="container">
                         <div className="row">
                              <div className="col-md-6 align-self-center text-center">
                                   <h2>Encontre a cura para o seu problema</h2>
                                   <p>Busque por plantas e animais da fauna nordestina e descubra as propriedades medicinais de cada um.</p>
                              </div>
                              <div className="col-md-6 align-self-center">
                                   <form onSubmit={realizarBusca}>
                                        <div className="input-group mb-3">
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Digite o nome da planta ou do animal"
                                                  value={query}
                                                  onChange={(e) => setQuery(e.target.value)} // Atualiza o estado da query
                                             />
                                             <button className="btn btn-link" type="submit">Buscar</button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>

               <div className="container" id="plantList">
                    <h1 className="display-5 fw-bold text-center">Plantas Disponíveis</h1>
                    <p className="text-center mb-3">Conheça algumas das plantas disponíveis em nosso acervo:</p>
                    <div className="row">
                         {plantasExibidas.map((planta, index) => (
                              <div className="col-lg-4 col-md-6 mb-4" key={planta.id}>
                                   <div className="card border-0 shadow-lg rounded-5">
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
                    {contador < plantasData.length && (
                         <div className="text-center mt-5">
                              <button className="btn btn-link" onClick={mostrarMaisPlantas}>Carregar mais plantas</button>
                         </div>
                    )}
               </div>

               <div className="container-fluid bg-light shadow-lg border border-5">
                    <div className="container" id="aboutContainer">
                         <div className="row">
                              <div className="col-md-6 col-12 align-self-center">
                                   <h2>Sobre o Projeto</h2>
                                   <p>
                                        O projeto Curas de Quintal é uma iniciativa que visa resgatar o conhecimento
                                        tradicional
                                        sobre as propriedades medicinais das plantas e animais da fauna nordestina.
                                        Através de um
                                        acervo digital, disponibilizamos informações sobre as espécies mais comuns da
                                        região,
                                        suas indicações terapêuticas e formas de uso.
                                        Este projeto é totalmente desenvolvido pelos alunos: Tatiane Nunes, Luís Miguel e Carlos Antunes,
                                        alunos do 3º Informática do Instituto Federal de Educação, Ciência e Tecnologia do Piauí,
                                        Campus São Raimundo Nonato.
                                   </p>
                                   <Link to="/sobre" className="btn btn-link">Saiba mais</Link>
                              </div>
                              <div className="col-md-6 col-12" style={{height: "50vh"}}>
                                   <div className="plant">
                                        <Canvas camera={{position: [10, 3, 0], fov: 60, rotation: [0, 1, 0.4]}}>
                                             <ambientLight intensity={0.5}/>
                                             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                                             <pointLight position={[-10, -10, -10]}/>
                                             <Plant/>
                                             <Environment preset="sunset"/>
                                        </Canvas>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Modal de resultados da busca */}
               <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                         <Modal.Title>Resultados da Busca</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         {resultadosBusca.length > 0 ? (
                              <div>
                                   {resultadosBusca.map(planta => (
                                        <div key={planta.id} className="mb-2">
                                             <h3 className="text-center">{planta.nomePopular}</h3>
                                             <p className="text-center">{planta.nomeCientifico}</p>
                                             <img src={carregarImagem(planta.nomePopular)} alt={planta.nomePopular}
                                                  className="img-fluid" style={{
                                                  height: "250px",
                                                  width: "100%",
                                                  borderRadius: "20px",
                                                  margin: "10px auto",
                                                  objectFit: "cover"
                                             }}/>
                                             <Link to={`/planta/${planta.id}`} className="btn btn-link"
                                                   style={{width: "100%"}}>Ver detalhes</Link>
                                        </div>
                                   ))}
                              </div>
                         ) : (
                              <p>Nenhum resultado encontrado.</p>
                         )}
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => setModalShow(false)}>
                              Fechar
                         </Button>
                    </Modal.Footer>
               </Modal>

               {/* Modal de erro */}
               <Modal show={errorModalShow} onHide={() => setErrorModalShow(false)}>
                    <Modal.Header closeButton>
                         <Modal.Title>Nenhum Resultado Encontrado</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <p>Desculpe, não encontramos nenhuma planta com esse nome. Tente novamente!</p>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={() => setErrorModalShow(false)}>
                              Fechar
                         </Button>
                    </Modal.Footer>
               </Modal>

          </div>
     );
}
