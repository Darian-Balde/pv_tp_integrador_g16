import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
/* Los # Es para agregar informacion, no supe que ocupar ahi*/
/*Agregue el Repositorio como un acceso rapido */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Acerca De</h4>
                    <p>
                        Esta tienda de artículos en general ofrece una amplia
                        variedad de productos para todas tus necesidades.
                        ¡Explorá nuestro catálogo y encontrá lo que buscás!
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <ul>
                        <li><a href="#">Email: 42164099@fi.unju.edu.ar</a></li>
                        <li><a href="#">Teléfono: 123-456-7890</a></li>
                        <li><a href="#">Dirección: Jujuy,Argentina</a></li>

                    </ul>
                </div>

                <div className="footer-section footer-social">
                    <h4>Seguinos</h4>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Github</h4>
                    <div className="footer-links">
                        <a href="https://github.com/Darian-Balde/pv_tp_integrador_g16#">Repositorio Git Hub</a> 
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© Programación Visual 2025 - TP Integrador</p>
                <div className="footer-links">
                    <a href="#">Términos</a> |
                    <a href="#"> Política</a> |
                    <a href="#"> Reembolsos</a> |
                    <a href="#"> Accesibilidad</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;