import { useState } from 'react'

function MultiSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
  ])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [newItemText, setNewItemText] = useState('')

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  const handleAddNewItem = () => {
    if (newItemText.trim() && !options.includes(newItemText.trim())) {
      setOptions([...options, newItemText.trim()])
      setNewItemText('')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:border-gray-500"
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(', ')
          : 'Select Options'}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelect(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
            <div className="p-2 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Add new item"
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  onClick={handleAddNewItem}
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelect