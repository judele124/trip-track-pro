import { useState, useCallback, useLayoutEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

type Store = {
  [x: string]: any
}

export type UseAxiosRequestConfig = AxiosRequestConfig & {
  uuid?: string
  manual?: boolean
  immutable?: boolean
  keepPreviousData?: boolean
  purgeNull?: boolean
  onSuccess?: (res: { status: number; data?: any }) => void
  onError?: (res: { status?: number; error: AxiosError | Error; data?: any }) => void
}

export type UseAxiosResponse = {
  loading: boolean
  status?: number
  error?: any
  data?: any
  activate: (config?: UseAxiosRequestConfig) => Promise<{ status: number; error?: AxiosError | Error; data?: any }>
}

const store: Store = {}

const useAxios = ({
  uuid,
  manual,
  immutable,
  keepPreviousData,
  purgeNull,
  onSuccess: initialOnSuccess,
  onError: initialOnError,
  ...initialAxiosOptions
}: UseAxiosRequestConfig): UseAxiosResponse => {
  const [status, setStatus] = useState<number | undefined>()
  const [error, setError] = useState<number | undefined>()
  const [data, setData] = useState<any>(uuid ? store[uuid] : undefined)
  const [loading, setLoading] = useState(!manual && (!immutable || !data))

  useLayoutEffect(() => {
    if (!manual && (!immutable || !data)) fetchData()
  }, [manual, immutable])

  const fetchData = useCallback(
    async ({ onSuccess = initialOnSuccess, onError = initialOnError, ...axiosOptions } = {}) => {
      setLoading(true)
      setStatus(undefined)
      setError(undefined)

      if (!keepPreviousData && !uuid) setData(undefined)

      try {
        let { status, data } = await axios({
          ...initialAxiosOptions,
          ...axiosOptions,
        //   transformResponse: purgeNull ? res => res : undefined
        })

        if (purgeNull) data = JSON.parse(data, (_, value) => (value === null ? undefined : value))

        onSuccess?.({ status, data })

        batch(() => {
          setLoading(false)
          setStatus(status)
          setData(data)
        })

        if (uuid) store[uuid] = data

        return { status, data: data }
      } catch (error: any) {
        const status = error.response?.status

        onError?.({ status, error })

        batch(() => {
          setLoading(false)
          setStatus(status)
          setError(error)
        })

        return { status, error }
      }
    },
    []
  )

  return { loading, status, error, data, activate: fetchData }
}

export { useAxios as default, axios }