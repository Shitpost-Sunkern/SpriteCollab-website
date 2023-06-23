import "nes.css/css/nes.min.css"
import "./style/app.css"
import "./style/navbar.css"
import PokemonCarousel from "./components/pokemon-carousel"
import Search from "./components/search"
import { useState } from "react"
import Buttons from "./components/buttons"
import { RankMethod, SpriteFilterMethod } from "./types/enum"
import DisplayParameters from "./components/display-parameters"
import PokemonRanking from "./components/pokemon-ranking"
import { Meta } from "./generated/graphql"
import PokemonFilter from './components/pokemon-filter'

export default function Home(props: { ids: number[]; meta: Meta }) {
  const [currentText, setCurrentText] = useState("")
  const [filterBy, setFilterBy] = useState<SpriteFilterMethod>(SpriteFilterMethod.ALL)
  const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER)
  const [showPortraitAuthor, setPortraitAuthor] = useState<boolean>(false)
  const [showSpriteAuthor, setSpriteAuthor] = useState<boolean>(false)
  const [showIndex, setShowIndex] = useState<boolean>(false)
  const [showLastModification, setShowLastModification] =
    useState<boolean>(false)
  const [showPortraitBounty, setShowPortraitBounty] = useState<boolean>(false)
  const [showSpriteBounty, setShowSpriteBounty] = useState<boolean>(false)
  return (
    <div className="App">
      <Buttons />
      <div
        className="main-box nes-container"
      >
        <div>
          <h1>PMDCollab Sprite&nbsp;Project</h1>
          <h5>
            Free to use with credit for ROMhacks, fangames, etc. Don't use for
            commercial projects.
          </h5>
        </div>

        <div className="options">
          <DisplayParameters
            setSpriteAuthor={setSpriteAuthor}
            setPortraitAuthor={setPortraitAuthor}
            setShowIndex={setShowIndex}
            setShowLastModification={setShowLastModification}
            setShowPortraitBounty={setShowPortraitBounty}
            setShowSpriteBounty={setShowSpriteBounty}
            showPortraitAuthor={showPortraitAuthor}
            showSpriteAuthor={showSpriteAuthor}
            showIndex={showIndex}
            showLastModification={showLastModification}
            showPortraitBounty={showPortraitBounty}
            showSpriteBounty={showSpriteBounty}
          />

          <Search currentText={currentText} setCurrentText={setCurrentText} />

          <PokemonFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
          <PokemonRanking
            setSpriteAuthor={setSpriteAuthor}
            setPortraitAuthor={setPortraitAuthor}
            setShowIndex={setShowIndex}
            setShowLastModification={setShowLastModification}
            setShowPortraitBounty={setShowPortraitBounty}
            setShowSpriteBounty={setShowSpriteBounty}
            setRankBy={setRankBy}
            rankBy={rankBy}
          />
        </div>
        <PokemonCarousel
          currentText={currentText}
          rankBy={rankBy}
          filterBy={filterBy}
          showPortraitAuthor={showPortraitAuthor}
          showSpriteAuthor={showSpriteAuthor}
          showIndex={showIndex}
          showLastModification={showLastModification}
          showPortraitBounty={showPortraitBounty}
          showSpriteBounty={showSpriteBounty}
          ids={props.ids}
        />
        <div className="footer">
          <p>
            Last update:{" "}
            {new Date(props.meta.assetsUpdateDate).toLocaleString()}
          </p>
          <p>
            Last check for updates:{" "}
            {new Date(props.meta.updateCheckedDate).toLocaleString()}
          </p>
          <a
            target="_blank"
            href={`https://github.com/PMDCollab/SpriteCollab/commit/${props.meta.assetsCommit}`}
          >
            Last Commit
          </a>
        </div>
      </div>
    </div>
  )
}
