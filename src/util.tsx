import { Monster } from "./generated/graphql";

export function formatDate(n: number | undefined): string {
    if (n == undefined) return "";
    const date = new Date(n);
    return `${pad(date.getDate())}/${pad(date.getMonth())}/${date.getFullYear()}`;
}

const pad = (number: number): string => number < 10 ? "0" + number : number.toString();

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