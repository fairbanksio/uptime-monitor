import React, { createContext, useEffect, useMemo, useState } from 'react'
import useIsMountedRef from '../util/isMountedRef'
import pageService from '../services/page'
import { createStandaloneToast } from '@chakra-ui/react'
import { friendlyToast } from '../components/Util/FriendlyError'
export const PublicPageContext = createContext()

const PublicPageProvider = ({ slug, children }) => {
  const isMountedRef = useIsMountedRef()
  const [page, setPage] = useState([])
  const [error, setError] = useState()
  const [loadingInitial, setLoadingInitial] = useState(true)
  const toast = createStandaloneToast()

  const refreshPage = (cb) => {
    pageService
        .getPageBySlug(slug)
        .then((page) => {
          if (isMountedRef.current) {
            setPage(page.data)
          }
        })
        .catch((_error) => {})
        .finally(() => {
          cb()
        })
  }

  // refresh pages
  useEffect(() => {
    if (slug) {
      setLoadingInitial(true)
      refreshPage(() =>{
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
  }, [slug])

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

  // useMemo for peformance/rendering
  const memoedValue = useMemo(
    () => ({
      page,
      error,
      refreshPage,
    }), // eslint-disable-next-line
    [page, error]
  )

  return (
    <PublicPageContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </PublicPageContext.Provider>
  )
}
export default PublicPageProvider
