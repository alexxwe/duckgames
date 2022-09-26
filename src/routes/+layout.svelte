<script lang="ts">
    import '../app.css'
    import logo from '$lib/assets/svelte.png'
    const date = new Date().getFullYear()
</script>

<div class="lg:h-screen bg-zinc-900 text-white">
    <header class="">
        <nav class="bg-zinc-800 p-4 flex justify-between items-center border border-x-0 border-t-0 ">
            <div class="flex items-center">
                <a href="/">
                    <img class="w-12" src={logo} alt="Svelte Logo" />
                </a>
                <h1 class="text-xl ml-5">Svelte App</h1>
            </div>

            <div class="text-2xl hover:text-yellow-300">
                <a title="See project" href="https://github.com/dawichi/duckgames" target="_blank" rel="noreferrer">
                    <i class="bi bi-github" />
                </a>
            </div>
        </nav>
    </header>

    <main class="mt-10 px-2">
        <slot />
    </main>

    <footer class="bg-zinc-800 lg:absolute bottom-0 left-0 right-0 text-center">
        <div class="container m-auto flex flex-col md:flex-row justify-around items-center">
            <a href="/">
                <section class="flex flex-col hover:text-yellow-300">
                    <span class="text-xl">다 위 치</span>
                    <span>DuckGames © {date}</span>
                </section>
            </a>

            <a target="_blank" href="https://www.buymeacoffee.com/dawichi" rel="noreferrer">
                <img
                    class="w-64 h-24"
                    src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=dawichi&button_colour=fde047&font_colour=000&font_family=Cookie&outline_colour=000000&coffee_colour=fff"
                    alt="Coffee"
                />
            </a>
        </div>
    </footer>
</div>

<style>
    nav {
        position: sticky;
        top: 0;
        z-index: 1;
    }
</style>
