import type { Card } from './Card'
import type { Player } from './Player'

export type Game = {
    players: Player[]
    deck: Card[]
    discarded: {
        cards: Card[]
        value: number
    }
}
