import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            User Management
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar