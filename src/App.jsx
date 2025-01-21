import { useState } from 'react'
import TableRow from './components/TableRow'

function App() {
  const [rows, setRows] = useState([{ id: 1 }])
  const [usedOptions, setUsedOptions] = useState(new Set())

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now() }])
  }

  const handleOptionSelect = (option, rowId) => {
    setUsedOptions(prev => new Set([...prev, option]))
  }

  const handleOptionUnselect = (option) => {
    setUsedOptions(prev => {
      const newSet = new Set(prev)
      newSet.delete(option)
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-gray-900">Label 1</th>
                <th className="px-6 py-4 text-left text-gray-900">Label 2</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  usedOptions={usedOptions}
                  onOptionSelect={handleOptionSelect}
                  onOptionUnselect={handleOptionUnselect}
                  rowId={row.id}
                />
              ))}
            </tbody>
          </table>
          <div className="p-4 flex justify-end">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="mr-2">+</span>
              Add New Row
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App