import { Monster } from "./generated/graphql";
import { SpriteFilterMethod } from './types/enum';

const pad = (number: number): string => number < 10 ? "0" + number : number.toString();

export function formatPokemonName(name: string | undefined): string | undefined {

    if (name == undefined)
        return undefined

    // This could be more compact by matching with regex but I can't be bothered

    name = name.replace("fetch_d", "fetch'd") // Farfetch'd, Sirfetch'd
    name = name.replace("Flabebe", "Flabébé")
    name = name.replace("Mr_", "Mr. ") // Mr. Mime, Mr. Rime
    name = name.replace("Jr_", "Jr.") // Mime Jr.
    name = name.replace("mo_o", "mo-o") // Jangmo-o, Hakamo-o, Kommo-o
    name = name.replace("Ho_Oh", "Ho-Oh")
    name = name.replace("Type_Null", "Type: Null")
    name = name.replace("Wo_Chien", "Wo-Chien")
    name = name.replace("Chien_Pao", "Chien-Pao")
    name = name.replace("Ting_Lu", "Ting-Lu")
    name = name.replace("Chi_Yu", "Chi-Yu")
    name = name.replace("Porygon_Z", "Porygon-Z")
    name = name.replace("Missingno_", "Missingno.")
    name = name.replace("Nidoran_F", "Nidoran♀")
    name = name.replace("Nidoran_M", "Nidoran♂")
    
    return name.replace("_", " ") // Whatever other underscores should be spaces
}

export function formatDate(n: number): string {
    if (n == undefined) return "";
    const date = new Date(n);
    return `${pad(date.getDate())}/${pad(date.getMonth())}/${date.getFullYear()}`;
}

export const getMonsterMaxPortraitBounty = (monster: Monster) => monster.forms.reduce((a, b) => Math.max(
    a,
    b.portraits.bounty.exists || 0,
    b.portraits.bounty.full || 0,
    b.portraits.bounty.incomplete || 0
), 0)

export const getMonsterMaxSpriteBounty = (monster: Monster) => monster.forms.reduce((a, b) => Math.max(
    a,
    b.sprites.bounty.exists || 0,
    b.sprites.bounty.full || 0,
    b.sprites.bounty.incomplete || 0
), 0)

export const getLastModification = (ts: Date | undefined): string => ts ? `Modified at ${formatDate(ts.getTime())}` : "";


export function isFiltered(monster: Monster, filterBy: SpriteFilterMethod): boolean {
    switch(filterBy) {
        case SpriteFilterMethod.COMPLETE:
            return monster.forms.some(form => form.sprites.phase == "FULL" || form.sprites.phase == "EXISTS");
        case SpriteFilterMethod.FULLY_FEATURED:
            return monster.forms.some(form => form.sprites.phase == "FULL");
        case SpriteFilterMethod.INCOMPLETE:
            return monster.forms.some(form => form.sprites.phase == "INCOMPLETE");
        default:
            return true;
    }
}