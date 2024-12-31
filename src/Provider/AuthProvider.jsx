import { createContext, useState, useEffect, useRef } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth'
import { Spin } from 'antd'
import axios from 'axios'
import app from '../firebase/firebase.config'

export const AuthContext = createContext()

function AuthProvider ({ children }) {
  const auth = useRef(getAuth(app))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const provider = new GoogleAuthProvider()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth.current, email, password)
      .then(result => {
        setUser(result.user)
        return result.user
      })
      .finally(() => setLoading(false))
  }

  const googleSignIn = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth.current, provider)
      setUser(result.user)
      return result.user
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth.current, email, password)
      .then(result => {
        setUser(result.user)
        return result.user
      })
      .finally(() => setLoading(false))
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth.current)
      .then(() => setUser(null))
      .finally(() => setLoading(false))
  }

  const updateUserProfile = async updatedData => {
    try {
      await updateProfile(auth.current.currentUser, {
        displayName: updatedData.displayName,
        photoURL: updatedData.photoURL
      })

      setUser(prev => ({
        ...prev,
        displayName: updatedData.displayName || prev.displayName,
        photoURL: updatedData.photoURL || prev.photoURL
      }))
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth.current, async currentUser => {
      setUser(currentUser || null)
      if (currentUser?.email) {
        try {
          const user = { email: currentUser.email }
          await axios.post('http://localhost:5000/jwt', user, {
            withCredentials: true
          })
        } catch (error) {
          console.error('Error fetching login token:', error)
        } finally {
          setLoading(false)
        }
      } else {
        try {
          await axios.post(
            '',
            {},
            {
              withCredentials: true
            }
          )
        } catch (error) {
          console.error('Error during logout:', error)
        } finally {
          setLoading(false)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  const userInfo = {
    user,
    createUser,
    loginUser,
    logOut,
    googleSignIn,
    loading,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={userInfo}>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className='loader'>
            <Spin></Spin>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
