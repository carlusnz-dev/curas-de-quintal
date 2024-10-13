import AppRoutes from "./routes/index.routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
     return (
          <Router>
               <Navbar />
               <AppRoutes />
               <Footer />
          </Router>
     )
}