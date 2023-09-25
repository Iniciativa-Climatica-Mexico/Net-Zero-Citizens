import { SERVER_BASE_URL } from '@/utils/constants'
import { recoverSession } from '@/utils/sessionHooks'
import axios from 'axios'

export const authAxios = () => {
  const session = recoverSession()
  if (!session) {
    window.location.href = '/'
  }
  return axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
      Authorization: `Bearer ${session?.authToken}`,
    },
  })
}
