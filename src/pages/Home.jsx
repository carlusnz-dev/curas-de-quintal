import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import { Link } from "react-router-dom";
import logo from "../logo - CDC.png";
import plantasData from "../data/plantas.json";
import "../styles/Home.css";
import Fuse from "fuse.js";
import { Modal, Button } from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../components/Scene";

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

     const el = useRef();
     const tl = useRef();

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
          try {
               return require(`../assets/imgs/plantas/${formatarNomeParaCaminho(nomePopular)}.jpg`);
          }
          catch (error) {
               return require("../logo - CDC.png");
          }
     }

     // Animações com GSAP
     useLayoutEffect(() => {
          gsap.registerPlugin(ScrollTrigger);

          gsap.to("#titleRow", {
               y: 0,
               opacity: 1,
          });

          return () => {
               ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
     }, []);

     const cardRefs = useRef([]); // Array de referências para cada card
     useLayoutEffect(() => {
          gsap.registerPlugin(ScrollTrigger);

          cardRefs.current.forEach((card, index) => {
               if (card) {
                    gsap.fromTo(card, {
                         opacity: 0,
                         y: 50,
                    }, {
                         opacity: 1,
                         y: 0,
                         duration: 1,
                         scrollTrigger: {
                              trigger: card,
                              start: "top 80%", // Inicia quando o card estiver 80% dentro da viewport
                              end: "bottom 20%", // Termina quando o card estiver 20% fora da viewport
                              toggleActions: "play none none reverse", // Reproduzir ao entrar, reverter ao sair
                              markers: false,
                         },
                    });
               }
          });

          return () => {
               ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Remove todos os ScrollTriggers ao desmontar o componente
          };
     }, [plantasExibidas]);


     return (
          <div>
               <div className="container" id="titleContainer" style={{ height: "80vh", marginTop: "5rem" }}>
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
                                   <p>Busque por plantas da fauna nordestina e descubra as propriedades medicinais de cada um.</p>
                              </div>
                              <div className="col-md-6 align-self-center">
                                   <form onSubmit={realizarBusca}>
                                        <div className="input-group mb-3">
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Digite o nome da planta"
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
                              <div className="col-lg-4 mx-auto col-md-6 mb-4" key={planta.id} ref={el => cardRefs.current[index] = el}>
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
                                        Curas de quintal é um projeto sobre o conhecimento tradicional de plantas medicinais da Caatinga.
                                        Nesse vasto quintal, fomentamos o conhecimento sobre plantas medicinais no Território da Cidadania
                                        Serra da Capivara. Os alunos autores Tatiane Nunes, Carlos Alberto Antunes e Luis Miguel Sousa
                                        pretendem abordar sobre plantas medicinais, conhecimento tradicional e Caatinga e o que tem de
                                        ciência nisso tudo. Esse projeto foi desenvolvido para a Feira de Ciências do Instituto Federal
                                        do Piauí - Campus São Raimundo Nonato, II MUV - Ciência em Movimento, e é orientado pela professora
                                        e bióloga Laís Neri. Vamos colher boas curas nesse quintal?
                                   </p>
                                   <Link to="/sobre" className="btn btn-link">Saiba mais</Link>
                              </div>
                              <div className="col-md-6 col-12">
                                   <div className="plant">
                                        <Canvas camera={{ position: [10, 3, 0], fov: 11 }} style={{ height: "650px" }}>
                                             <ambientLight intensity={0.5}/>
                                             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                                             <pointLight position={[-10, -10, -10]}/>
                                             <Scene/>
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
