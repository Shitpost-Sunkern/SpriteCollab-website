import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function CreditsButton() {
  return (
    <Link className="my-btn nes-btn" to={"/Credits"}>
      <div className="navbar-button-inner">
        <FontAwesomeIcon icon={faCircleInfo} />
        <p className="navbar-text">Credits</p>
      </div>
    </Link>
  )
}
