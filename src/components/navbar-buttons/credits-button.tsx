import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function CreditsButton() {
  return (
    <Link className="my-btn nes-btn" to={"/Credits"}>
      <div className="navbar-button-inner">
        <FontAwesomeIcon icon={faUsers} />
        <p className="navbar-text">Credits</p>
      </div>
    </Link>
  )
}
