'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { User } from 'src/payload-types'
import { rest } from './rest'
import { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()

  const create = useCallback<Create>(
    async (args) => {
      const user = await rest(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users`, args)

      setUser(user)
      return user
    },
    [setUser],
  )

  const login = useCallback<Login>(
    async (args) => {
      const user = await rest(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/login`, args)

      setUser(user)
      return user
    },
    [setUser],
  )

  const logout = useCallback<Logout>(async () => {
    await rest(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/logout`)
    setUser(null)
    return
  }, [])

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/me`,
        {},
        {
          method: 'GET',
        },
      )
      setUser(user)
    }
    fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/forgot-password`,
      args,
    )
    setUser(user)
    return user
  }, [])

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    const user = await rest(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/reset-password`, args)
    setUser(user)
    return user
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext // eslint-disable-line no-unused-vars

export const useAuth: UseAuth = () => useContext(Context)
