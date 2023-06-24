import { Dispatch, SetStateAction } from "react"
import { RankMethod } from "../types/enum"

export default function PokemonRanking(props: {
  setShowIndex: Dispatch<SetStateAction<boolean>>
  setPortraitAuthor: Dispatch<SetStateAction<boolean>>
  setSpriteAuthor: Dispatch<SetStateAction<boolean>>
  setShowLastModification: Dispatch<SetStateAction<boolean>>
  setShowPortraitBounty: Dispatch<SetStateAction<boolean>>
  setShowSpriteBounty: Dispatch<SetStateAction<boolean>>
  setRankBy: Dispatch<SetStateAction<RankMethod>>
  rankBy: RankMethod
}) {
  const methodToSetCheckbox: Partial<Record<RankMethod, Dispatch<SetStateAction<boolean>>>> = {
    [RankMethod.LAST_MODIFICATION]: props.setShowLastModification,
    [RankMethod.POKEDEX_NUMBER]: props.setShowIndex,
    [RankMethod.PORTRAIT_AUTHOR]: props.setPortraitAuthor,
    [RankMethod.SPRITE_AUTHOR]: props.setSpriteAuthor,
    [RankMethod.PORTRAIT_BOUNTY]: props.setShowPortraitBounty,
    [RankMethod.SPRITE_BOUNTY]: props.setShowSpriteBounty,
  };
  return (
    <div
      className="nes-select is-inline sort"
      style={{ display: "flex", alignItems: "center", width: "initial" }}
    >
      <label style={{ fontSize: "0.7em", marginBottom: "0rem" }}>Sort by</label>
      <select
        value={props.rankBy}
        id="default_select"
        onChange={option => {
          const rankMethod = option.target.value as RankMethod
          methodToSetCheckbox[rankMethod]?.(true);
          props.setRankBy(rankMethod);
        }}
      >
        {(Object.values(RankMethod) as RankMethod[]).map(rankMethod => (
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
