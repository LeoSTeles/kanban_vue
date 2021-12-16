<template>
  <div>
    <div class="content-wrapper kanban w-100" style="min-height: 543px;">
      <Header title="Kanban Petroeng"/>
      <Form v-if="form"/>
      <ContainerCards />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ContainerCards from '../components/ContainerCards.vue'
import Form from '../components/Form.vue'
import { Store, useStore } from 'vuex'
import { computed } from '@vue/reactivity'

export default {
  name: 'Home',
  components: {
    Header,
    ContainerCards,
    Form
  },
  setup(){
    const store = useStore()

    return {
      form: computed(() => store.state.form)
    }
  }
}
</script>

<style>
  .content-wrapper.kanban{height:1px}.content-wrapper.kanban .content{height:100%;overflow-x:auto;overflow-y:hidden}.content-wrapper.kanban .content .container,.content-wrapper.kanban .content .container-fluid,.content-wrapper.kanban .content .container-lg,.content-wrapper.kanban .content .container-md,.content-wrapper.kanban .content .container-sm,.content-wrapper.kanban .content .container-xl{width:-webkit-max-content;width:-moz-max-content;width:max-content;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}.content-wrapper.kanban .content-header+.content{height:calc(100% - ((2 * 15px) + (1.8rem * 1.2)))}.content-wrapper.kanban .card .card-body{padding:.5rem}.content-wrapper.kanban .card.card-row{width:340px;display:inline-block;margin:0 .5rem}.content-wrapper.kanban .card.card-row:first-child{margin-left:0}.content-wrapper.kanban .card.card-row .card-body{height:calc(100% - (12px + (1.8rem * 1.2) + .5rem));overflow-y:auto}.content-wrapper.kanban .card.card-row .card:last-child{margin-bottom:0;border-bottom-width:1px}.content-wrapper.kanban .card.card-row .card .card-header{padding:.5rem .75rem}.content-wrapper.kanban .card.card-row .card .card-body{padding:.75rem}.content-wrapper.kanban .btn-tool.btn-link{text-decoration:underline;padding-left:0;padding-right:0}
</style>