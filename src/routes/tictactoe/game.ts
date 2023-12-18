/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writable, type Writable } from 'svelte/store'

export type Piece = {
    id: number
    player: 1 | 2
}

// Initial data and type
const initial_data = {
    isWhiteTurn: true,
    selectedPiece: null as Piece | null,
    player1: Array.from({ length: 9 }, (_, i) => ({ id: i, player: 1 })) as Piece[],
    player2: Array.from({ length: 9 }, (_, i) => ({ id: i, player: 2 })) as Piece[],
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ] as Array<Array<0 | Piece>>,
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

        if (this.board[y]![x]) {
            return alert('There is already a piece there')
        }

        // Remove piece from player
        const player = this.isWhiteTurn ? this.player1 : this.player2
        const index = player.findIndex(p => p.id === this.selectedPiece!.id)
        player.splice(index, 1)

        // Update board
        this.board[y]![x] = this.selectedPiece
        this.selectedPiece = null
        gameData.update(data => ({ ...data, board: this.board, selectedPiece: null, player1: this.player1, player2: this.player2 }))
    }
}
