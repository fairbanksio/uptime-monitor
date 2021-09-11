import React, { createContext, useEffect, useMemo, useState } from 'react'
import useIsMountedRef from '../util/isMountedRef'
import pageService from '../services/page'
import { createStandaloneToast } from '@chakra-ui/react'
import { friendlyToast } from '../components/Util/FriendlyError'
export const PageContext = createContext()

const PageProvider = ({ user, children }) => {
  const isMountedRef = useIsMountedRef()
  const [pages, setPages] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const toast = createStandaloneToast()

  const refreshPages = (cb) => {
    pageService
      .getPages()
      .then((pages) => {
        if (isMountedRef.current) {
          setPages(pages.data)
        }
      })
      .catch((_error) => {})
      .finally(() => {
        cb()
      })
  }
  // refresh pages
  useEffect(() => {
    if (user) {
      setLoadingInitial(true)
      refreshPages(() => {
        if (isMountedRef.current) {
          setLoadingInitial(false)
        }
      })
    } else {
      if (isMountedRef.current) {
        setLoadingInitial(false)
      }
    }
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (error) {
      const id = 'page-context-toast'
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'There was a problem with your request',
          description: friendlyToast(error),
          status: 'error',
          variant: 'subtle',
          duration: 2000,
          isClosable: true,
        })
      }
    }
    setError(undefined) // eslint-disable-next-line
  }, [error])

  // Create Page
  const createPage = (payload, cb) => {
    setLoading(true)
    pageService
      .createPage(payload)
      .then((page) => {
        // update pages state with new page
        setPages((pages) => [...pages, page.data])
        cb({ result: page.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // Update
  const updatePage = (payload, cb) => {
    setLoading(true)
    pageService
      .updatePage(payload)
      .then((page) => {
        // update individuals page state
        setPages(
          pages.map((item, index) => {
            return item._id === payload._id ? page.data : item
          })
        )
        cb({ result: page.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // Delete
  const deletePage = (payload, cb) => {
    setLoading(true)
    pageService
      .deletePage(payload)
      .then((page) => {
        // update pages state with new page
        setPages(pages.filter((page) => page._id !== payload._id))
        cb({ result: page.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // useMemo for peformance/rendering
  const memoedValue = useMemo(
    () => ({
      pages,
      loading,
      error,
      createPage,
      deletePage,
      updatePage,
      refreshPages,
    }), // eslint-disable-next-line
    [pages, loading, error]
  )

  return (
    <PageContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </PageContext.Provider>
  )
}
export default PageProvider
