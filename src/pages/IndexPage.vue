<template>
  <q-page padding>
    <q-table title="Artigos" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)" />
          <q-btn icon="delete" color="negative" dense size="sm" @click="deletePost(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import postsService from 'src/services/post'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const posts = ref([])
const { list, remove } = postsService()
const $q = useQuasar()
const $router = useRouter()

const columns = [
  { name: 'id', field: 'id', label: 'ID', align: 'left' },
  { name: 'title', field: 'title', label: 'Titulo', align: 'left' },
  { name: 'author', field: 'author', label: 'Autor', align: 'left' },
  { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
]

onMounted(() => {
  getPosts()
})

const getPosts = async () => {
  try {
    const data = await list()
    posts.value = data
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (id) => {
  try {
    $q.dialog({
      title: 'Confirmação',
      message: 'Tem certeza que deseja excluir esta postagem?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove(id)
      $q.notify({ message: 'Postagem excluída com sucesso', color: 'positive' })
      await getPosts()
    })
  } catch (error) {
    $q.notify({ message: 'Erro ao excluir postagem', color: 'negative' })
  }
}

const handleEditPost = (id) => {
  $router.push({ name: 'formPost', params: { id } })
}

defineOptions({
  name: 'IndexPage'
})
</script>
