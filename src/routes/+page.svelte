<script lang="ts">
    import type { GameDTO } from 'src/interfaces/Game'
    import BgImage from '$lib/components/BgImage.svelte'
    import Box from '$lib/components/Box.svelte'

    const games: GameDTO[] = [
        {
            name: 'Madness',
            description: 'Combine cards in groups to avoid the madness.',
            image: '/images/madness.jpg',
            link: '/madness',
        },
        {
            name: 'Parade',
            description: 'Parade the correct number to keep with the lowest score.',
            image: '/images/parade.jpg',
            link: '/parade',
        },
        {
            name: 'Tic Tac Toe',
            description: 'The classic, but this time a version with Matrioshkas!',
            image: '/images/tictactoe.jpg',
            link: '/tictactoe',
        },
        {
            name: 'Portal',
            description: 'Navigate through a maze of rooms to find the exit.',
            image: '/images/dark.jpg',
            link: '/portal',
        },
        {
            name: '6 Alive',
            description: 'Add each number of the cards up to a maximum of 21, if you go over you lose a life.',
            image:'/images/6lives.jpg',
            link:'/6alive',
        },
        {
            name: 'Connect 4',
            description: 'Connect 4 in a row like in the classic tic tac toe with this fantastic new big board.',
            image: '/images/connect4.png',
            link: '/connect4',
        },
    ]
</script>

<div class="flex flex-col items-center justify-center">
    <h2 class="text-4xl p-4">Welcome to DuckGames</h2>
    <br />

    <Box title="Games available 🦆">
        <ul class="container grid lg:grid-cols-4 gap-4 p-4">
            {#each games as game}
                <li class="bg-zinc-800 border p-4 cursor-pointer hover:bg-yellow-300 hover:text-black transition-transform hover:-rotate-3">
                    <a href={game.link} class="grid grid-cols-2 gap-4">
                        <div class="h-full">
                            <BgImage image={game.image} />
                        </div>
                        <header>
                            <h2 class="text-3xl mb-4">{game.name}</h2>
                            <p>{game.description}</p>
                        </header>
                    </a>
                </li>
            {/each}
        </ul>
    </Box>
</div>
