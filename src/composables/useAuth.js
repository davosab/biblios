import { ref, computed } from 'vue'
import { supabase } from '../lib/supabaseClient'

const user = ref(null)
const userRole = ref(null)
const loading = ref(false)
const error = ref(null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)

  const fetchUserRole = async (userId) => {
    try {
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('id', userId)

      if (student && student.length > 0) {
        userRole.value = 'student'
        return 'student'
      }

      const { data: librarian, error: librarianError } = await supabase
        .from('librarians')
        .select('*')
        .eq('id', userId)

      if (librarian && librarian.length > 0) {
        userRole.value = 'librarian'
        return 'librarian'
      }
    } catch (err) {
      console.error('Error fetching user role:', err)
    }
    return null
  }

  const signUp = async (email, password, fullName, role) => {
    loading.value = true
    error.value = null

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      const userId = authData.user.id
      const [firstName, ...lastNameParts] = fullName.split(' ')
      const lastName = lastNameParts.join(' ')

      if (role === 'librarian') {
        const { error: insertError } = await supabase.from('librarians').insert([
          {
            id: userId,
            first_name: firstName,
            last_name: lastName,
          },
        ])
        if (insertError) {
          console.error('Librarian insert error:', insertError)
          throw insertError
        }
      } else {
        const { error: insertError } = await supabase.from('students').insert([
          {
            id: userId,
            first_name: firstName,
            last_name: lastName,
            email,
            status: 'Pending',
          },
        ])
        if (insertError) {
          console.error('Student insert error:', insertError)
          throw insertError
        }
      }

      user.value = authData.user
      userRole.value = role
      return { success: true, user: authData.user, role }
    } catch (err) {
      console.error('SignUp error:', err)
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      user.value = data.user
      await fetchUserRole(data.user.id)
      return { success: true, user: data.user }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    error.value = null

    try {
      const { error: authError } = await supabase.auth.signOut()
      if (authError) throw authError

      user.value = null
      userRole.value = null
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      if (data.session) {
        user.value = data.session.user
        await fetchUserRole(data.session.user.id)
        return true
      }
      return false
    } catch (err) {
      console.error('Auth check failed:', err)
      return false
    }
  }

  return {
    user,
    userRole,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    checkAuth,
    fetchUserRole,
  }
}
