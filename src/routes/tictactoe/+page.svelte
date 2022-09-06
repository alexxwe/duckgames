<script lang="ts">
    import Box from '$lib/Box.svelte'
    import type { MatrioshkaDTO } from 'src/interfaces/Matrioshka'
    import MatrioshkasList from './matrioshkasList.svelte'

    const player1Hand: MatrioshkaDTO[] = []
    const player2Hand: MatrioshkaDTO[] = []
    let selectedMatrioshkaId: number = 0

    const opts: Array<1 | 2 | 3> = [1, 1, 1, 2, 2, 2, 3, 3, 3]

    opts.forEach((value, idx) => {
        player1Hand.push({
            id: idx + 1,
            value,
            position: 0,
        })
        player2Hand.push({
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

    const selectToken = (id: number) => selectedMatrioshkaId = id

</script>

<div class="flex flex-col items-center justify-center">
    <Box title="Tic Tac Toe">The game you already know BUT this time with matrioshkas!</Box>
    <br/>

    <div class="grid grid-cols-3 gap-4">
        <MatrioshkasList playerMatrioshkas={player1Hand} blueTeam={true} isTurn={true} {selectToken} />

        <div>
            <h2>Selected matrioshka <br/>(on hand)</h2>
            <div class="">
                {selectedMatrioshkaId}
            </div>
        </div>
        
        <MatrioshkasList playerMatrioshkas={player2Hand} blueTeam={false} isTurn={false} {selectToken} />
    </div>

</div>
