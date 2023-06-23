import AboutButton from "./button/about-button"
import DiscordButton from "./button/discord-button"
import TwitterButton from "./button/twitter-button"
import HomeButton from "./button/home-button"
import GithubButton from "./button/github-button"
import CreditsButton from './button/credits-button'

export default function Buttons() {
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
