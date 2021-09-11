import axiosClient from '../http-common'

const createPage = (page) => {
  return axiosClient.post('/pages', page)
}

const updatePage = (page) => {
  //extract changes (omit unnecessary extras)
  const { _id, name, type, slug, monitors } = page

  return axiosClient.post('/pages/' + _id, {
    _id,
    name,
    type,
    monitors,
    slug,
  })
}

const deletePage = ({ _id }) => {
  return axiosClient.delete('/pages/' + _id)
}

const getPages = () => {
  return axiosClient.get('/pages')
}

const getPageBySlug = (slug) => {
  return axiosClient.get('/pages/bySlug/'+slug)
}

const exports = {
  createPage,
  getPages,
  deletePage,
  updatePage,
  getPageBySlug
}
export default exports
