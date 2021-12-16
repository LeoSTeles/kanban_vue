<template>
  <section class="content pb-3">
    <div class="container-fluid h-100">
      <div class="card card-row card">
        <div class="card-header bg-danger">
          <h3 class="card-title">To Do</h3>
        </div>
        <div class="card-body">
          <div
            class="card card-light card-outline mt-3"
            v-for="(tarefa, index) in tarefasToDo"
            :key="index"
          >
            <div class="card-header d-flex justify-content-between">
              <h5 class="card-title">{{ tarefa.titulo }}</h5>
              <div>
                <span @click="del(tarefa, 'ToDo')"><i class="fas fa-trash"></i></span>
                <span class="mx-2"></span>
                <span @click="edit(tarefa, 'ToDo')"><i class="fas fa-edit"></i></span>
                <span class="mx-2"></span>
                <span @click="setProgress(tarefa, 'ToDo')"><i class="fas fa-arrow-right"></i></span>
              </div>
            </div>
            <div class="card-body">
              {{ tarefa.descricao }}
            </div>
          </div>
        </div>
      </div>
      <div class="card card-row card-default">
        <div class="card-header bg-warning">
          <h3 class="card-title">In Progress</h3>
        </div>
        <div class="card-body">
          <div
            class="card card-light card-outline mt-3"
            v-for="(tarefa, index) in tarefasProgress"
            :key="index"
          >
            <div class="card-header d-flex justify-content-between">
              <h5 class="card-title">{{ tarefa.titulo }}</h5>
              <div>
                <span @click="del(tarefa, 'Progress')"><i class="fas fa-trash"></i></span>
                <span class="mx-2"></span>
                <span @click="edit(tarefa, 'Progress')"><i class="fas fa-edit"></i></span>
                <span class="mx-2"></span>
                <span @click="setToDo(tarefa)"><i class="fas fa-arrow-left"></i></span>
                <span class="mx-2"></span>
                <span @click="setDone(tarefa)"><i class="fas fa-arrow-right"></i></span>
              </div>
            </div>
            <div class="card-body">
              {{ tarefa.descricao }}
            </div>
          </div>
        </div>
      </div>
      <div class="card card-row card-success">
        <div class="card-header bg-success">
          <h3 class="card-title">Done</h3>
        </div>
        <div class="card-body">
          <div
            class="card card-light card-outline mt-3"
            v-for="(tarefa, index) in tarefasDone"
            :key="index"
          >
            <div class="card-header d-flex justify-content-between">
              <h5 class="card-title">{{ tarefa.titulo }}</h5>
              <div>
                <span @click="del(tarefa, 'Done')"><i class="fas fa-trash"></i></span>
                <span class="mx-2"></span>
                <span @click="edit(tarefa, 'Done')"><i class="fas fa-edit"></i></span>
                <span class="mx-2"></span>
                <span @click="setProgress(tarefa, 'Done')"><i class="fas fa-arrow-left"></i></span>
              </div>
            </div>
            <div class="card-body">
              {{ tarefa.descricao }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      tarefasToDo: computed(() => store.state.tarefasToDo),
      tarefasProgress: computed(() => store.state.tarefasProgress),
      tarefasDone: computed(() => store.state.tarefasDone),
      setProgress: (tarefa, currentList) => store.commit('setProgress', {tarefa, currentList}),
      setDone: (tarefa) => store.commit('setDone', tarefa),
      setToDo: (tarefa) => store.commit('setToDo', tarefa),
      del: (tarefa, currentList) => store.commit('delete', {tarefa, currentList}),
      edit: (tarefa, currentList) => store.commit('edit', {tarefa, currentList})
    };
  },
};
</script>
