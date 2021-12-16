import { createStore } from 'vuex'
import { Store } from 'vuex/dist/vuex.cjs'

export default createStore({
  state: {
    tarefa: {
      titulo: '',
      descricao: ''
    },
    currentList: '',
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
      state.posEdit = null
      state.currentList = ''
    },
    showForm(state) {
      state.form = true
    },
    closeForm(state) {
      state.form = false
      this.commit('clear')
    },
    create(state) {
      state.tarefasToDo.push({ ...state.tarefa })
      this.commit('save')
      this.commit('closeForm')
      this.commit('clear')
    },
    setProgress(state, { tarefa, currentList }) {
      if (currentList == 'ToDo') {
        var pos = state.tarefasToDo.indexOf(tarefa)
        var registro = state.tarefasToDo[pos]
        state.tarefasProgress.push({ ...registro })
        state.tarefasToDo.splice(pos, 1)
      } else {
        var pos = state.tarefasDone.indexOf(tarefa)
        var registro = state.tarefasDone[pos]
        state.tarefasProgress.push({ ...registro })
        state.tarefasDone.splice(pos, 1)
      }
      this.commit('save')
    },
    setDone(state, tarefa) {
      var pos = state.tarefasProgress.indexOf(tarefa)
      var registro = state.tarefasProgress[pos]
      state.tarefasDone.push({ ...registro })
      state.tarefasProgress.splice(pos, 1)
      this.commit('save')
    },
    setToDo(state, tarefa) {
      var pos = state.tarefasProgress.indexOf(tarefa)
      var registro = state.tarefasProgress[pos]
      state.tarefasToDo.push({ ...registro })
      state.tarefasProgress.splice(pos, 1)
      this.commit('save')
    },
    closeFormEdit(state, {currentList, pos}){
      if(state.currentList === currentList && pos === state.posEdit){
        this.commit('clear')
        state.form = false
        return
      }

      if(state.currentList === currentList && state.posEdit > pos){
          state.posEdit--
      }
    },
    delete(state, {tarefa, currentList}){
      if(currentList == 'ToDo'){
        var pos = state.tarefasToDo.indexOf(tarefa)
        state.tarefasToDo.splice(pos, 1)
        this.commit('closeFormEdit', {currentList, pos})
      } else if(currentList == 'Progress'){
        var pos = state.tarefasProgress.indexOf(tarefa)
        state.tarefasProgress.splice(pos, 1)
        this.commit('closeFormEdit', {currentList, pos})
      } else {
        var pos = state.tarefasDone.indexOf(tarefa)
        state.tarefasDone.splice(pos, 1)
        this.commit('closeFormEdit', {currentList, pos})
      }

      this.commit('save')
    },
    edit(state, {tarefa, currentList}){
      state.form  = true
      if(currentList == 'ToDo'){
        var pos = state.tarefasToDo.indexOf(tarefa)
        var registro = state.tarefasToDo[pos]
        state.currentList = 'ToDo'
        state.posEdit = pos
        state.tarefa.titulo = registro.titulo
        state.tarefa.descricao = registro.descricao
      } else if(currentList == 'Progress'){
        var pos = state.tarefasProgress.indexOf(tarefa)
        var registro = state.tarefasProgress[pos]
        state.currentList = 'Progress'
        state.posEdit = pos
        state.tarefa.titulo = registro.titulo
        state.tarefa.descricao = registro.descricao
      } else {
        var pos = state.tarefasDone.indexOf(tarefa)
        var registro = state.tarefasDone[pos]
        state.currentList = 'Done'
        state.posEdit = pos
        state.tarefa.titulo = registro.titulo
        state.tarefa.descricao = registro.descricao
      }
    },
    update(state){
      if(state.currentList === 'ToDo'){
        state.tarefasToDo[state.posEdit].titulo = state.tarefa.titulo
        state.tarefasToDo[state.posEdit].descricao = state.tarefa.descricao
      } else if(state.currentList === 'Progress'){
        state.tarefasProgress[state.posEdit].titulo = state.tarefa.titulo
        state.tarefasProgress[state.posEdit].descricao = state.tarefa.descricao
      } else {
        state.tarefasDone[state.posEdit].titulo = state.tarefa.titulo
        state.tarefasDone[state.posEdit].descricao = state.tarefa.descricao
      }

      this.commit('save')
      this.commit('closeForm')
      this.commit('clear')
    }
  },
  actions: {
  },
  modules: {
  }
})
