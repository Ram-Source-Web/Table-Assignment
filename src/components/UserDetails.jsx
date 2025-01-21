import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await axios.get(`https://reqres.in/api/users/${id}`)
      return response.data.data
    }
  })

  if (isLoading) return <div className="text-center">Loading...</div>
  
  if (error) {
    toast.error('Failed to load user details')
    return <div>Error loading user details</div>
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-500 hover:text-blue-700"
      >
        ← Back to Users
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-32 h-32 rounded-full"
        />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">
            {user.first_name} {user.last_name}
          </h1>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">ID:</span> {user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails