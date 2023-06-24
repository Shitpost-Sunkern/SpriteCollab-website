import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty, formatDate } from "../util"
import { formatPokemonName } from "../util"

export default function PokemonThumbnail(props: {
  info: Monster
  infoKey: string
  showIndex: boolean
  showSpriteAuthor: boolean
  showPortraitAuthor: boolean
  showLastModification: boolean
  showPortraitBounty: boolean
  showSpriteBounty: boolean
}) {
  const image: ReactElement | null = props.info.manual?.portraits.previewEmotion?.url ?
    <img
      className="my-img"
      alt=""
      src={props.info.manual.portraits.previewEmotion?.url}
    /> :
    <h1 className="my-img" style={{ fontSize: "4em" }}>?</h1>;

  const date: ReactElement | null = props.showLastModification ?
    <p>
      {formatDate(Math.max(
        new Date(props.info.manual?.portraits.modifiedDate).getTime(),
        new Date(props.info.manual?.sprites.modifiedDate).getTime()
      ))}
    </p> : null;

  const index: ReactElement | null = props.showIndex ?
    <p>{props.infoKey}</p> : null;

  const portraitAuthor: ReactElement | null = props.showPortraitAuthor ?
    <p>
      {props.info?.manual?.portraits?.creditPrimary?.name}
    </p> : null;

  const spriteAuthor: ReactElement | null = props.showSpriteAuthor ?
    <p>
      {props.info.manual?.sprites.creditPrimary?.name}
    </p> : null;

  const portraitBounty: ReactElement | null = props.showPortraitBounty ?
    <div style={{ display: "flex" }}>
      <p style={{ marginRight: "2px" }}>
        {getMonsterMaxPortraitBounty(props.info)} GP
      </p>
    </div> : null;

  const spriteBounty: ReactElement | null = props.showSpriteBounty ?
    <div style={{ display: "flex" }}>
      <p style={{ marginRight: "2px" }}>
        {getMonsterMaxSpriteBounty(props.info)} GP
      </p>
      
    </div> : null;

  return (
    <Link to={props.infoKey.toString()} className="my-link">
      <div className="nes-container nes-pointer grow my-container thumbnail">
        {image}
        <p>{formatPokemonName(props.info.name)}</p>
        {index}
        {portraitAuthor}
        {spriteAuthor}
        {date}
        {portraitBounty}
        {spriteBounty}
      </div>
    </Link>
  )
}

