import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../logo - CDC.png";

export default function Navbar() {
     return (
          <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
               <div className="container">
                    <Link className="navbar-brand d-block d-md-none" to="/">
                         <img src={logo} alt={"Logotipo do projeto Curas de Quintal"} height={70}/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegação">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                         <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                              <li className={"nav-item"}>
                                   <Link className="nav-link" to="/">Início</Link>
                              </li>
                              <li className={"nav-item"}>
                                   <Link className="nav-link" to="/sobre">Sobre</Link>
                              </li>
                              <li className={"nav-item d-none d-md-block"}>
                                   <Link className="nav-link" to="/">
                                        <img src={logo} alt={"Logotipo do projeto Curas de Quintal"} height={70}/>
                                   </Link>
                              </li>
                              <li className={"nav-item"}>
                                   <Link className="nav-link" to="/">Contato</Link>
                              </li>
                              <li className={"nav-item"}>
                                   <Link className="nav-link" to="/plantas">Plantas</Link>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
)
}