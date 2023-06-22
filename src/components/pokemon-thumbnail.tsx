import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty, formatDate } from "../util"

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
    <h1 style={{ height: "80px", margin: "0px" }}>?</h1>;

  const date: ReactElement | null = props.showLastModification ?
    <p style={{ fontSize: "0.45em", margin: "0px" }}>
      {formatDate(Math.max(
        new Date(props.info.manual?.portraits.modifiedDate).getTime(),
        new Date(props.info.manual?.sprites.modifiedDate).getTime()
      ))}
    </p> : null;

  const index: ReactElement | null = props.showIndex ?
    <p style={{ fontSize: "0.55em", margin: "0px" }}>{props.infoKey}</p> : null;

  const portraitAuthor: ReactElement | null = props.showPortraitAuthor ?
    <p style={{ fontSize: "0.55em", margin: "0px" }}>
      {props.info?.manual?.portraits?.creditPrimary?.name}
    </p> : null;

  const spriteAuthor: ReactElement | null = props.showSpriteAuthor ?
    <p style={{ fontSize: "0.55em", margin: "0px" }}>
      {props.info.manual?.sprites.creditPrimary?.name}
    </p> : null;

  const portraitBounty: ReactElement | null = props.showPortraitBounty ?
    <div style={{ display: "flex" }}>
      <p style={{ margin: "0px", fontSize: "0.55em", marginRight: "2px" }}>
        {
          getMonsterMaxPortraitBounty(props.info)
        }
      </p>
      <FontAwesomeIcon icon={faCoins} size="xs" />
    </div> : null;

  const spriteBounty: ReactElement | null = props.showSpriteBounty ?
    <div style={{ display: "flex" }}>
      <p style={{ margin: "0px", fontSize: "0.55em", marginRight: "2px" }}>
        {getMonsterMaxSpriteBounty(props.info)}
      </p>
      <FontAwesomeIcon icon={faCoins} size="xs" />
    </div> : null;

  return (
    <Link to={props.infoKey.toString()} className="my-link">
      <div
        className="nes-container nes-pointer grow my-container"
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: "100px",
          margin: "10px"
        }}
      >
        {image}
        <p style={{ fontSize: "0.55em", margin: "0px" }}>{props.info.name}</p>
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

