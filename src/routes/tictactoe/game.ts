type Piece = {
    id: number
    player: 1 | 2
    value: number
}

export class TicTacToe {
    whiteTurn = true
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
