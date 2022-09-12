<script lang="ts">
    import type { GameDataDTO, MatrioshkaDTO } from 'src/interfaces/Matrioshka'

    export let game: GameDataDTO
    export let matrioshka: MatrioshkaDTO
    export let blueTeam: boolean
    export let isAvailable: boolean

    const bgColor = blueTeam ? 'bg-blue-400' : 'bg-red-400'
    const animation = isAvailable ? '' : 'opacity-30'

    const selected = (token: number): string => token === matrioshka.id ? 'text-red-400' : ''

    const emojis = {
        1: 'bi-emoji-frown text-lg',
        2: 'bi-emoji-neutral text-2xl',
        3: 'bi-emoji-smile text-4xl',
    }
</script>

<div
    class="w-12 h-12 {bgColor} m-1 flex items-center justify-center hover:animate-pulse-fast cursor-pointer {animation} {selected(game.selectedToken)}"
    on:click={() => {
        game.selectToken(matrioshka.id)
        console.log(selected)
    }}
>
    <i class="bi {emojis[matrioshka.value]}" />
</div>
