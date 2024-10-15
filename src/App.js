import AppRoutes from "./routes/index.routes";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

export default function App() {
     return (
          <Router>
               <ScrollTop />
               <Navbar />
               <AppRoutes />
               <Footer />
          </Router>
     )
}