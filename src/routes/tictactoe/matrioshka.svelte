<script lang="ts">
    export let player1: boolean
    const bgColor = player1 ? 'bg-blue-400' : 'bg-red-400'

    export let type: 1 | 2 | 3
    const emojis = {
        1: 'bi-emoji-frown text-lg',
        2: 'bi-emoji-neutral text-2xl',
        3: 'bi-emoji-smile text-4xl',
    }
</script>

<div class="w-12 h-12 {bgColor} m-1 flex items-center justify-center hover:bg-zinc-500 cursor-pointer animate-pulse-fast">
    <i class="bi {emojis[type]}"></i>
</div>
