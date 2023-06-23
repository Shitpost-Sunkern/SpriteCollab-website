/* eslint-disable no-case-declarations */
import { useEffect, useState } from "react"
import { Monster, useCarrouselQuery } from "../generated/graphql"
import { RankMethod, REQUEST_ITEMS_SIZE } from "../types/enum"
import { getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from "../util"
import PokemonThumbnail from "./pokemon-thumbnail"

const rankMethodToRankFunction: Record<RankMethod, (a: Monster, b: Monster) => number> = {
  [RankMethod.POKEDEX_NUMBER]: (a, b) => a.id - b.id,
  [RankMethod.LAST_MODIFICATION]: (a, b) => {
    const dap = new Date(a.manual?.portraits.modifiedDate);
    const dbp = new Date(b.manual?.portraits.modifiedDate);
    const das = new Date(a.manual?.sprites.modifiedDate);
    const dbs = new Date(b.manual?.sprites.modifiedDate);
    return Math.max(dbp.getTime(), dbs.getTime()) -
      Math.max(dap.getTime(), das.getTime());
  },
  [RankMethod.NAME]: (a, b) => a.name?.localeCompare(b.name),
  [RankMethod.PORTRAIT_AUTHOR]: (a, b) => {
    const aName = a.manual?.portraits.creditPrimary?.name;
    const bName = b.manual?.portraits.creditPrimary?.name;
    if (!aName || !bName)return aName ? -1 : 1;
    return aName?.localeCompare(bName);
  },
  [RankMethod.SPRITE_AUTHOR]: (a, b) => {
    const aName = a.manual?.sprites.creditPrimary?.name;
    const bName = b.manual?.sprites.creditPrimary?.name;
    if (!aName || !bName)return aName ? -1 : 1;
    return aName?.localeCompare(bName);
  },
  [RankMethod.PORTRAIT_BOUNTY]: (a, b) =>
    getMonsterMaxPortraitBounty(b) - getMonsterMaxPortraitBounty(a),
  [RankMethod.SPRITE_BOUNTY]: (a, b) =>
    getMonsterMaxSpriteBounty(b) - getMonsterMaxSpriteBounty(a),
}

export default function PokemonCarousel(props: {
  currentText: string
  rankBy: RankMethod
  showIndex: boolean
  showPortraitAuthor: boolean
  showSpriteAuthor: boolean
  showLastModification: boolean
  showPortraitBounty: boolean
  showSpriteBounty: boolean
  ids: number[]
}) {
  const [index, setIndex] = useState<number>(0)
  const [monsters, setMonsters] = useState<Monster[]>([])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data, refetch, fetchMore } = useCarrouselQuery({
    variables: {
      ids: props.ids.slice(index, index + REQUEST_ITEMS_SIZE)
    }
  })

  useEffect(() => {
    if (data && data.monster.length > 0) {
      const ms = [...monsters];
      (data?.monster as Monster[]).forEach(monster => ms.push(monster))
      setMonsters(ms)
    }

    if (data?.monster && index <= props.ids.length) {
      setIndex(index + REQUEST_ITEMS_SIZE)
      fetchMore({
        variables: {
          ids: props.ids.slice(index, index + REQUEST_ITEMS_SIZE)
        }
      })
    }
  }, [data, index, props.ids, fetchMore])

  if (loading && !monsters.length) return <p>loading...</p>;
  if (error) return <p>Error</p>;

  const lowerCaseText = props.currentText.toLowerCase()
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        overflowY: "scroll",
        overflowX: "hidden"
      }}
    >
      {monsters.filter(k =>
        k?.name?.toLowerCase().includes(lowerCaseText) ||
        k?.manual?.portraits?.creditPrimary?.name
          ?.toLowerCase()
          .includes(lowerCaseText) ||
        k?.id.toString().includes(lowerCaseText)
      )
        .sort((a, b) => rankMethodToRankFunction[props.rankBy]?.(a as Monster, b as Monster) ?? 0)
        .map((k) => (
          <PokemonThumbnail
            key={k.id}
            infoKey={k.rawId}
            info={k as Monster}
            showIndex={props.showIndex}
            showPortraitAuthor={props.showPortraitAuthor}
            showSpriteAuthor={props.showSpriteAuthor}
            showLastModification={props.showLastModification}
            showPortraitBounty={props.showPortraitBounty}
            showSpriteBounty={props.showSpriteBounty}
          />
        ))}
    </div>
  )
}