import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import useAuthStore from '../store/authStore'

export default function RegisterPage() {
  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate  = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name, email: form.email, password: form.password,
      })
      login(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6 relative overflow-hidden py-16">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.1) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block">
            <p className="font-accent text-2xl tracking-[0.4em] text-silver-100 uppercase">Myreva</p>
            <p className="font-display text-xs tracking-[0.6em] text-gold-500 uppercase italic">Olfactives</p>
          </Link>
        </div>

        <div className="bg-dark-700 border border-silver-900 p-10">
          <div className="mb-8">
            <p className="font-accent text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-2">Join us</p>
            <h1 className="font-display text-4xl text-silver-100">Create Account</h1>
            <div className="gold-divider mt-4" />
          </div>

          {error && (
            <div className="mb-6 border border-maroon-700 bg-maroon-900/20 px-4 py-3">
              <p className="font-body text-xs text-maroon-400 tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'name',     label: 'Full Name',       type: 'text',     placeholder: 'Your name' },
              { name: 'email',    label: 'Email',           type: 'email',    placeholder: 'your@email.com' },
              { name: 'password', label: 'Password',        type: 'password', placeholder: '••••••••' },
              { name: 'confirm',  label: 'Confirm Password',type: 'password', placeholder: '••••••••' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="font-accent text-[10px] tracking-[0.3em] text-silver-600 uppercase block mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="input-luxury"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-silver-900 text-center">
            <p className="font-body text-xs text-silver-600 tracking-wide">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-500 hover:text-gold-400 transition-colors">Sign in</Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}
