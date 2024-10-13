import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
     return (
          <footer className="footer">
               <div className="container">
                    <div className="row">
                         <div className="col-lg-4 col-md-6 col-sm-12 mb-5 mb-md-0">
                              <h3>Curas de Quintal</h3>
                              <p>Curas de Quintal é um projeto que visa trazer conhecimento sobre plantas medicinais e seus benefícios para a saúde.</p>
                         </div>
                         <div className="col-lg-4 col-md-6 col-sm-12 mb-5 mb-md-0">
                              <h3>Links Úteis</h3>
                              <ul className="list-unstyled">
                                   <li><Link to="/">Início</Link></li>
                                   <li><Link to="/">Sobre</Link></li>
                                   <li><Link to="/">Contato</Link></li>
                                   <li><Link to="/">Plantas</Link></li>
                              </ul>
                         </div>
                         <div className="col-lg-4 col-md-6 col-sm-12">
                              <h3>Contato</h3>
                              <div className="social">
                                   <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
                                   <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
                                   <a href="https://www.twitter.com/" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a>
                                   <a href="mailto:carlosantunes.dev@gmail.com" target="_blank" rel="noreferrer"><i className="bi bi-envelope"></i></a>
                              </div>
                         </div>
                    </div>
               </div>
          </footer>
     )
}