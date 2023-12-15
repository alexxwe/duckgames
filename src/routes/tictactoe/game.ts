import { writable } from 'svelte/store'

export type Piece = {
    id: number
    player: 1 | 2
    value: number
}

const gameData = writable({
    isWhiteTurn: true,
    pieceSelected: null,
})

export class TicTacToe {
    isWhiteTurn = true
    selectedPiece: Piece | null = null
    player1: Piece[] = Array.from({ length: 9 }, (_, i) => ({ id: i, player: 1, value: Math.floor(i / 3) + 1 }))
    player2: Piece[] = Array.from({ length: 9 }, (_, i) => ({ id: i, player: 2, value: Math.floor(i / 3) + 1 }))
    board: Array<Array<0 | Piece>> = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]

    icon(piece: Piece) {
        const icons: Record<number, string> = {
            1: '🐣',
            2: '🐥',
            3: '🦆',
        }
        return icons[piece.value]
    }

    selectPiece(piece: Piece): void {
        // Check if the piece selected is yours
        if ((this.isWhiteTurn && piece.player === 2) || (!this.isWhiteTurn && piece.player === 1)) {
            return alert('Please, select one of YOUR pieces')
        }

        console.log(piece)
        this.selectedPiece = piece
    }

    move(x: number, y: number, piece: number) {
        // if (this.board[x][y]) {
        //     if (piece > this.board[x][y]) {
        //         this.board[x][y] = piece
        //     }
        // } else {
        //     this.board[x][y] = piece
        // }
    }
}
