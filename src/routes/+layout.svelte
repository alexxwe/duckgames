<script lang="ts">
    import '../app.css'
    import Header from '$lib/Header.svelte'
    import Footer from '$lib/Footer.svelte'
</script>

<div class="lg:h-screen bg-zinc-900 text-white">
    <header class="bg-zinc-800">
        <Header />
    </header>
    
    <main class="mt-10 px-2">
        <slot />
    </main>
    
    
    <div class="bg-zinc-800 lg:absolute bottom-0 left-0 right-0 text-center">
        <Footer />
    </div>
</div>