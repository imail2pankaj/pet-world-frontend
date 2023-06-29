import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import axiosInstance from '@/store/api/axiosInstance';

const storageTokenKeyName = 'accessToken';

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(storageTokenKeyName)
      if (storedToken) {
        setLoading(true)

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          }
        }).then(async response => {
          setUser({ ...response.data })
          setLoading(false)
        }).catch(() => {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)

          if (router.asPath !== '/') {
            router.replace('/auth/login')
          }

        })

      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, params).then(async response => {
      window.localStorage.setItem(storageTokenKeyName, response.data.authorization.accessToken);
      const returnUrl = router.query.returnUrl
      setUser({ ...response.data.user })
      window.localStorage.setItem('userData', JSON.stringify(response.data.user))
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/account/profile'
      if (errorCallback) errorCallback(response)
      // router.replace(redirectURL)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const handleRegister = (params, errorCallback) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, params).then(async response => {
      if (errorCallback) errorCallback(response.data)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(storageTokenKeyName)
    router.push('/auth/login')
  }

  const setUserData = (userData) => {
    setUser(userData)
    window.localStorage.setItem('userData', userData);
  }

  const handleForgetPassword = (params, errorCallback) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`, params)
      .then(async response => {
        if (errorCallback) errorCallback(response)
      }).catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const validateResetPasswordToken = (params, errorCallback) => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-reset-password?token=${params}`).then(async response => {
      if (errorCallback) errorCallback(response)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }


  const handleResetPassword = (params, errorCallback) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, params).then(async response => {
      if (errorCallback) errorCallback(response)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const profileUpdate = (params, errorCallback) => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName);
    axiosInstance.put(`/profile`, params, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    }).then(async response => {
      setUser({ ...response.data.user })
      window.localStorage.setItem('userData', JSON.stringify(response.data.user))
      if (errorCallback) errorCallback(response)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const requestDoctorAppointed = (errorCallback) => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName);
    axiosInstance.get(`/profile/request-appointed`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    }).then(async response => {
      if (errorCallback) errorCallback(response)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const changePassword = (params, errorCallback) => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName);
    axiosInstance.put(`/profile/change-password`, params, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    }).then(async response => {
      if (errorCallback) errorCallback(response)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }

  const getProfileData = async () => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName)
    const response = await axiosInstance.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    });
    return response
  }

  const authMe = async () => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName)

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      }
    }).then(async response => {
      setUser({ ...response.data })
    }).catch(() => {
      localStorage.removeItem('userData')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      setUser(null)
      router.replace('/auth/login')
    })
  }

  const getAboutProfileData = async () => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName)
    const response = await axiosInstance.get(`/profile/about-profile`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    });
    return response
  }

  const aboutProfileUpdate = (params, errorCallback) => {
    const storedToken = window.localStorage.getItem(storageTokenKeyName);
    axiosInstance.put(`/profile/about-profile`, params, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }
    }).then(async response => {
      setUser({ ...response.data.user })
      window.localStorage.setItem('userData', JSON.stringify(response.data.user))
      if (errorCallback) errorCallback(response)
    }).catch(err => {
      if (errorCallback) errorCallback(err)
    })
  }


  const values = {
    isAuthenticated: !!user,
    user,
    loading,
    authMe,
    setUser,
    setLoading,
    setUserData,
    profileUpdate,
    getProfileData,
    changePassword,
    login: handleLogin,
    
    aboutProfileUpdate,
    getAboutProfileData,
    requestDoctorAppointed,
    register: handleRegister,
    validateResetPasswordToken,
    forgetPassword: handleForgetPassword,
    resetPassword: handleResetPassword,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
