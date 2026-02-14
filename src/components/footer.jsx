import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export function Footer(){
    return (
        <footer>
            <div className="footer-wrapper">
                <p>Jayendra Lal Joshi</p>
                <FontAwesomeIcon icon={faGithub} />
            </div>
        </footer>
    )
}