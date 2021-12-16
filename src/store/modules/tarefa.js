export default {
    namespaced: true,
    state: {
        tarefa: {
            titulo: '',
            descricao: ''
        },
        posEdit: null,
        form: false,
        tarefasToDo: JSON.parse(localStorage.getItem('tarefasToDo')) ?? [],
        tarefasProgress: JSON.parse(localStorage.getItem('tarefasProgress')) ?? [],
        tarefasDone: JSON.parse(localStorage.getItem('tarefasDone')) ?? []

    },
    mutations: {
        save(state) {
            localStorage.setItem('tarefasToDo', JSON.stringify(state.tarefasToDo))
            localStorage.setItem('tarefasProgress', JSON.stringify(state.tarefasProgress))
            localStorage.setItem('tarefasDone', JSON.stringify(state.tarefasDone))
        },
        clear(state) {
            state.tarefa.titulo = ''
            state.tarefa.descricao = ''
        },
        showForm(state) {
            state.form = true
        },
        closeForm(state) {
            state.form = false
        },
        create(state) {
            state.tarefasToDo.push(state.tarefa)
            this.commit('tarefa/save')
            this.commit('tarefa/closeForm')
            this.commit('tarefa/clear')
        }
    },
    actions: {
    }
}