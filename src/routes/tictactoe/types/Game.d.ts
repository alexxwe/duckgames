import type { MatrioshkaDTO } from './Matrioshka'

type Player = {
    name: string
    tokens: MatrioshkaDTO[]
    isTurn: boolean
}

export type GameDTO = {
    player1: Player
    player2: Player
    selectToken: (id: number) => void
    selectedToken: number
}
