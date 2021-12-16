<template>
    <section class="content-header">
        <div class="container-fluid my-4">
            <h1 class="text-center">{{ title }}</h1>
            <p class="text-center my-4"><button class="btn btn-primary" v-if="!form" @click="showForm">Adicionar Tarefa</button></p>
        </div>
    </section>

</template>

<script>

import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default({
    props: {
        title: ''
    },
    setup() {
        const store = useStore()
        
        return {
            form: computed(() => store.state.form),
            showForm: () => store.commit('showForm')
        }
    },
})
</script>
