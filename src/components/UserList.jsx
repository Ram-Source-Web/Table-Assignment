import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function UserList() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
      return response.data
    }
  })

  if (error) {
    toast.error('Failed to load users')
    return <div>Error loading users</div>
  }

  const filteredUsers = data?.data?.filter(user => 
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <Link
                key={user.id}
                to={`/user/${user.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!data?.total_pages || page >= data.total_pages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserList