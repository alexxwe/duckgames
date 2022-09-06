<script lang="ts">
    import Box from '$lib/Box.svelte'
    import type { MatrioshkaDTO } from 'src/interfaces/Matrioshka.dto'
    import MatrioshkasList from './matrioshkasList.svelte'

    const player1: MatrioshkaDTO[] = []
    const player2: MatrioshkaDTO[] = []

    const opts: Array<1 | 2 | 3> = [1, 1, 1, 2, 2, 2, 3, 3, 3]

    for (const num of opts) {
        player1.push({
            value: num,
            position: 0,
        })
        player2.push({
            value: num,
            position: 0,
        })
    }
</script>

<div class="flex flex-col items-center justify-center">
    <Box title="Tic Tac Toe">The game you already know BUT this time with matrioshkas!</Box>
    <br/>

    <div class="grid grid-cols-3 gap-4">
        <MatrioshkasList playerMatrioshkas={player1} name='Player 1' />
        <div>
            Central map (grid)
        </div>
        <MatrioshkasList playerMatrioshkas={player2} name='Player 2' />
    </div>

</div>
