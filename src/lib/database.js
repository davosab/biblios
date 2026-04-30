import { supabase } from './supabaseClient'

export const bookQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('title')
    return { data, error }
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async create(book) {
    const { data, error } = await supabase
      .from('books')
      .insert([book])
      .select()
    return { data, error }
  },

  async update(id, book) {
    const { data, error } = await supabase
      .from('books')
      .update(book)
      .eq('id', id)
      .select()
    return { data, error }
  },

  async delete(id) {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
    return { error }
  },
}

export const loanQueries = {
  async getByStudent(studentId) {
    const { data, error } = await supabase
      .from('loans')
      .select(`
        *,
        book:books(*),
        issued_by:librarians(*),
        returns(*)
      `)
      .eq('student_id', studentId)
      .order('loan_date', { ascending: false })
    return { data, error }
  },

  async getPending() {
    const { data, error } = await supabase
      .from('loans')
      .select(`
        *,
        student:students(*),
        book:books(*)
      `)
      .eq('status', 'Pending')
      .order('loan_date', { ascending: false })
    return { data, error }
  },

  async getAll() {
    const { data, error } = await supabase
      .from('loans')
      .select(`
        *,
        student:students(*),
        book:books(*),
        issued_by:librarians(*)
      `)
      .neq('status', 'Pending')
      .order('loan_date', { ascending: false })
    return { data, error }
  },

  async create(loan) {
    const { data, error } = await supabase
      .from('loans')
      .insert([loan])
      .select()
    return { data, error }
  },

  async update(id, loan) {
    const { data, error } = await supabase
      .from('loans')
      .update(loan)
      .eq('id', id)
      .select()
    return { data, error }
  },

  async delete(id) {
    const { error } = await supabase
      .from('loans')
      .delete()
      .eq('id', id)
    return { error }
  },
}

export const studentQueries = {
  async getPending() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('status', 'Pending')
      .order('created_at')
    return { data, error }
  },

  async getApproved() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('status', 'Approved')
      .order('first_name')
    return { data, error }
  },

  async approve(studentId, librarianId) {
    const { data, error } = await supabase
      .from('students')
      .update({
        status: 'Approved',
        approved_by: librarianId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', studentId)
      .select()
    return { data, error }
  },

  async reject(studentId) {
    const { data, error } = await supabase
      .from('students')
      .update({ status: 'rejected' })
      .eq('id', studentId)
      .select()
    return { data, error }
  },
}

export const returnQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('returns')
      .select(`
        *,
        loan:loans(
          *,
          student:students(*),
          book:books(*)
        ),
        processed_by:librarians(*),
        reviewed_by:librarians(*)
      `)
      .order('return_date', { ascending: false })
    return { data, error }
  },

  async getPending() {
    const { data, error } = await supabase
      .from('returns')
      .select(`
        *,
        loan:loans(
          *,
          student:students(*),
          book:books(*)
        ),
        processed_by:librarians(*)
      `)
      .eq('status', 'Pending')
      .order('return_date')
    return { data, error }
  },

  async create(returnRecord) {
    const { data, error } = await supabase
      .from('returns')
      .insert([returnRecord])
      .select()
    return { data, error }
  },

  async approve(returnId, reviewerId) {
    const { data, error } = await supabase
      .from('returns')
      .update({
        status: 'Approved',
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', returnId)
      .select()
    return { data, error }
  },
}
