/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writable, type Writable } from 'svelte/store'

export type Piece = {
    id: number
    player: 1 | 2
    used: boolean
}

// Initial data and type
const initial_data: {
    isWhiteTurn: boolean
    selectedPiece: Piece | null
    player1: Array<Piece>
    player2: Array<Piece>
    board: Array<Array<0 | Piece>>
} = {
    isWhiteTurn: true,
    selectedPiece: null,
    player1: Array.from({ length: 9 }, (_, i) => ({ id: i, player: 1, used: false })),
    player2: Array.from({ length: 9 }, (_, i) => ({ id: i, player: 2, used: false })),
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
}

// The store itself
export const gameData: Writable<typeof initial_data> = writable(initial_data)

// The game class with logic, to make easier the implementations
export class TicTacToe {
    isWhiteTurn = initial_data.isWhiteTurn
    selectedPiece = initial_data.selectedPiece
    player1 = initial_data.player1
    player2 = initial_data.player2
    board = initial_data.board

    icon(piece: Piece): string | null {
        const icons: Record<number, string> = {
            1: '🐣',
            2: '🐥',
            3: '🦆',
        }
        return icons[this.pieceValue(piece)] ?? null
    }

    /**
     * From each [0..8] pieces from each player,
     * 3 of them have value 1 (small)
     * 3 of them have value 2 (medium)
     * 3 of them have value 3 (big)
     */
    pieceValue(piece: Piece): number {
        if (piece.id < 3) return 1
        if (piece.id < 6) return 2
        return 3
    }

    /**
     * Selecting a piece from the one availables for that player
     */
    selectPiece(piece: Piece): void {
        const is_your_piece = (this.isWhiteTurn && piece.player === 1) || (!this.isWhiteTurn && piece.player === 2)
        if (!is_your_piece) {
            return alert('Please, select one of YOUR pieces')
        }

        // If the piece was already selected, unselect it
        const newValue = piece.id === this.selectedPiece?.id ? null : piece

        // Update both, class and store
        this.selectedPiece = newValue
        gameData.update(data => ({ ...data, selectedPiece: newValue }))
    }

    movePiece(y: number, x: number): void {
        if (!this.selectedPiece) {
            return alert('Please, select a piece first')
        }

        // Is there already a piece there?
        const piece = this.board[y]![x]!
        if (piece) {
            if (this.pieceValue(piece) >= this.pieceValue(this.selectedPiece)) {
                return alert('You cannot move a piece to a place where the enemy is bigger than or equal to you')
            }
        }

        // Remove piece from player
        const player = this.isWhiteTurn ? this.player1 : this.player2
        const index = player.findIndex(p => p.id === this.selectedPiece!.id)
        player[index]!.used = true

        // Update board
        this.board[y]![x] = this.selectedPiece
        this.selectedPiece = null
        this.isWhiteTurn = !this.isWhiteTurn

        // Update store
        gameData.update(_ => ({
            board: this.board,
            selectedPiece: null,
            player1: this.player1,
            player2: this.player2,
            isWhiteTurn: this.isWhiteTurn,
        }))
    }
}
