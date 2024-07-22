import useApi from 'src/composables/UseApi'

export default function postService () {
  const { getById, list, post, update, remove } = useApi('posts')
  return { getById, list, post, update, remove }
}
