import { Dispatch, SetStateAction } from "react"
import { RankMethod, SpriteFilterMethod } from "../types/enum"

export default function PokemonFilter(props: {
  setFilterBy: Dispatch<SetStateAction<SpriteFilterMethod>>
  filterBy: string
}) {
  return (
    <div
      className="nes-select is-inline sort"
      style={{ display: "flex", alignItems: "center", width: "initial" }}
    >
      <label style={{ fontSize: "0.7em", marginBottom: "0rem" }}>Filter by</label>
      <select
        style={{ borderWidth: "2px", height: "40px", fontSize: "0.7em" }}
        value={props.filterBy}
        id="default_select"
        onChange={option => props.setFilterBy(option.target.value as SpriteFilterMethod)}
      >
        {(Object.values(SpriteFilterMethod) as SpriteFilterMethod[]).map(rankMethod => (
          <option
            style={{ fontSize: "1.5em", fontFamily: "Press Start 2P" }}
            key={rankMethod}
            value={rankMethod}
          >
            {rankMethod}
          </option>
        ))}
      </select>
    </div>
  )
}
