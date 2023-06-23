import AboutButton from "./navbar-buttons/about-button"
import DiscordButton from "./navbar-buttons/discord-button"
import TwitterButton from "./navbar-buttons/twitter-button"
import HomeButton from "./navbar-buttons/home-button"
import GithubButton from "./navbar-buttons/github-button"
import CreditsButton from './navbar-buttons/credits-button'

export default function Navbar() {
  return (
    <nav style={{ display: "flex", flexWrap: "wrap"}}>
      <HomeButton />
      <AboutButton />
      <CreditsButton />
      <DiscordButton />
      <TwitterButton />
      <GithubButton />
    </nav>
  )
}
