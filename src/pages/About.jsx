import React, {useEffect} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/About.css";

export default function About() {

     // Animações com GSAP
     useEffect(() => {
          gsap.registerPlugin(ScrollTrigger);

          gsap.utils.toArray(".fade-in").forEach((section) => {
               gsap.fromTo(section,
                    { opacity: 0, y: 100 },
                    {
                         opacity: 1,
                         y: 0,
                         duration: 1,
                         scrollTrigger: {
                              trigger: section,
                              start: "top 70%",
                              end: "bottom 20%",
                              toggleActions: "play none none reset", // O reset garante que a animação seja reiniciada ao sair da viewport
                              // markers: true // Remova essa linha para esconder os marcadores de debug
                         }
                    }
               );
          });
     }, []);

     return (
          <div className="about p-3" style={{ marginTop: "8rem" }}>
               <div className="container-fluid" id="titleContainer" style={{ margin: "10rem 0 15rem 0" }}>
                    <h1 className="title display-1 text-center">Sobre nós</h1>
                    <h3 className="subtitle text-center">Conheça mais um pouquinho sobre o projeto e nossa missão com as plantas medicinais!</h3>
               </div>

               <div className="container my-5">
                    {/* Apresentação inicial */}
                    <div className="row fade-in">
                         <div className="col-md-6">
                              <h2 className="display-4">Quem somos?</h2>
                              <p>Somos um grupo apaixonado por conhecimento natural e saúde. O projeto Curas de Quintal nasceu da vontade de redescobrir os segredos das plantas medicinais usadas por gerações.</p>
                         </div>
                         <div className="col-md-6">
                              <h2 className="display-4">O que nos motivou?</h2>
                              <p>Vimos a importância de valorizar os remédios naturais que vêm do nosso próprio quintal. Nosso objetivo é compartilhar conhecimento e facilitar o acesso a esses recursos incríveis.</p>
                         </div>
                         <div className="col-12" id="fotoGrupoMUV">
                              <img src="https://placehold.co/1000x500" alt="Sobre nós" className="img-fluid rounded-5 w-100" />
                         </div>
                    </div>

                    {/* Fotos */}
                    <div className="row mt-5 fade-in">
                         <div className="col-md-6 col-12 align-self-center">
                              <h2 className="display-4">O que nos diferencia?</h2>
                              <p>Nosso diferencial é o cuidado com a curadoria das informações e o respeito às tradições populares. Queremos garantir que o conhecimento seja passado de maneira clara e acessível.</p>
                         </div>
                         <div className="col-md-6 col-12">
                              <img src="https://placehold.co/500x250" alt="Sobre nós" className="img-fluid rounded-5 w-100" />
                         </div>
                    </div>

                    {/* Missão */}
                    <div className="row mt-5 fade-in">
                         <div className="col-md-6 col-12 d-none d-md-block">
                              <img src="https://placehold.co/500x250" alt="Sobre nós" className="img-fluid rounded-5 w-100" />
                         </div>
                         <div className="col-md-6 col-12 align-self-center">
                              <h2 className="display-4">Nossa missão</h2>
                              <p>Nossa missão é trazer de volta o conhecimento sobre as plantas medicinais que nossos antepassados usavam, e permitir que todos tenham a oportunidade de usufruir desse saber natural.</p>
                         </div>
                    </div>

                    <hr />

                    {/* Foto final */}
                    <div className="row mt-5 fade-in">
                         <div className="col-12">
                              <img src="https://placehold.co/1000x500" alt="Sobre nós" className="img-fluid rounded-5 w-100" />
                         </div>
                    </div>
               </div>
          </div>
     );
}
