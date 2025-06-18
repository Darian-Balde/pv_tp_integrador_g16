import './Footer.css';
/* Los # Es para agregar informacion, no supe que ocupar ahi*/
/*Agregue el Repositorio como un acceso rapido */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Agregar</h4>
                    <ul>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Agregar</h4>
                    <ul>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Agregar</h4>
                    <ul>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                        <li><a href="#">#</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Git Hub</h4>
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
