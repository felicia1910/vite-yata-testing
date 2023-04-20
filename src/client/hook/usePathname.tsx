import qs from 'qs'
import { useLocation, useNavigate } from 'react-router-dom'

const tryParseInt = (value: string) => {
  const result = parseInt(value)
  return isNaN(result) ? value : result
}

const parseObjectValues = (obj :any) => {
  Object.keys(obj).forEach(k => {
    obj[k] = tryParseInt(obj[k])
  })

  return obj
}

const useQuery = () => {
  const location = useLocation()
  const router = useNavigate()
  const value = parseObjectValues(
    qs.parse(location.search, { ignoreQueryPrefix: true }) || {}
  )

  return {
    value,
    set: (params: any) =>
    router({
        pathname: location.pathname,
        search: qs.stringify({ ...value, ...parseObjectValues(params) })
      })
  }
}

export default useQuery