import axiosClient from '../http-common'

const createPage = (page) => {
  return axiosClient.post('/pages', page)
}

const updatePage = (page) => {
  //extract changes (omit unnecessary extras)
  const { _id, name } = page

  return axiosClient.post('/pages/' + _id, {
    _id,
    name,
  })
}

const deletePage = ({ _id }) => {
  return axiosClient.delete('/pages/' + _id)
}

const getPages = () => {
  return axiosClient.get('/pages')
}

const exports = {
  createPage,
  getPages,
  deletePage,
  updatePage,
}
export default exports
