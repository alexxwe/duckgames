<script lang="ts">
    import Box from '$lib/Box.svelte'
    import type { GameDataDTO, MatrioshkaDTO } from 'src/interfaces/Matrioshka'
    import MatrioshkasList from './matrioshkasList.svelte'

    const game: GameDataDTO = {
        player1: [],
        player2: [],
        selectToken: (id: number) => game.selectedToken = id,
        selectedToken: 0
    }

    const opts: Array<1 | 2 | 3> = [1, 1, 1, 2, 2, 2, 3, 3, 3]

    opts.forEach((value, idx) => {
        game.player1.push({
            id: idx + 1,
            value,
            position: 0,
        })
        game.player2.push({
            id: idx + 10,
            value,
            position: 0,
        })
    })

    const gameStates = {
        0: 'Player1, move!',
        1: 'Player2, move!',
        3: 'Player1 won!',
        4: 'Player2 won!',
    }

</script>

<div class="flex flex-col items-center justify-center">
    <Box title="Tic Tac Toe">The game you already know BUT this time with matrioshkas!</Box>
    <br/>

    <div class="grid grid-cols-3 gap-4">
        <MatrioshkasList {game} blueTeam={true} isTurn={true} />

        <div>
            <h2>Selected matrioshka <br/>(on hand)</h2>
            <div class="">
                {game.selectedToken}
            </div>
        </div>
        
        <MatrioshkasList {game} blueTeam={false} isTurn={false} />
    </div>

</div>
