<template>
  <q-page padding>

    <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
      <q-input outlined v-model="form.title" label="Título" class="col-lg-6 col-xs-12" lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']" />

      <q-input outlined v-model="form.author" label="Autor" class="col-lg-6 col-xs-12" lazy-rules
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']" />
      <div class="col-lg-12 col-xs-12">
        <q-editor v-model="form.content" min-height="5rem" />
      </div>

      <div class="col-lg-12 q-gutter-sm">
        <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit" />
        <q-btn label="Cancelar" color="white" text-color="black" class="float-right" :to="{ name: 'home' }" />
      </div>

    </q-form>
  </q-page>
</template>

<script setup>
import postsService from 'src/services/post'
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const { post, getById, update } = postsService()
const $q = useQuasar()
const $router = useRouter()
const $route = useRoute()

const form = ref({
  title: '',
  author: '',
  content: ''
})

onMounted(async () => {
  if ($route.params.id) {
    await getPost($route.params.id)
  }
})

const getPost = async (id) => {
  try {
    const data = await getById(id)
    form.value = data
  } catch (error) {
    $q.notify({ message: 'Erro ao buscar postagem', color: 'negative' })
  }
}

const onSubmit = async () => {
  try {
    if ($route.params.id) {
      await update(form.value)
    } else {
      await post(form.value)
    }
    $q.notify({ message: 'Postagem salva com sucesso', icon: 'done', color: 'positive' })
    $router.push({ name: 'home' })
  } catch (error) {
    $q.notify({ message: 'Erro ao salvar postagem', color: 'negative' })
  }
}

defineOptions({ name: 'FormPost' })
</script>
