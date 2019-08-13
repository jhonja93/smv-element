<template>
    <div class="my-3">
        <h2>TextAnalysis</h2>
        <div v-for="(viz, index) in data.viz" :key="index">
            <component v-bind:is="viz.type"></component>
        </div>
    </div>
</template>

<script>
import WordCloud from '~/components/graphics/WordCloud'
export default {
    name: 'TextAnalysis',
    props: ['data'],
    components: {
        wordcloud: WordCloud
    },
    data() {
        return {
        }
    }
}
</script>

<style>

</style>
