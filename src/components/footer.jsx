import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export function Footer(){
    return (
        <footer>
            <div className="footer-wrapper">
                <p>Jayendra Lal Joshi</p>
                <a href="https://github.com/JayendraJoshi/Memory-Card" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
            </div>
        </footer>
    )
}