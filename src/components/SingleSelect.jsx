import { useState } from 'react'

const OPTIONS = [
  'Option A',
  'Option B',
  'Option C',
  'Option D',
  'Option E',
]

function SingleSelect({ usedOptions, onSelect, selectedOption }) {
  const [isOpen, setIsOpen] = useState(false)

  const availableOptions = OPTIONS.filter(
    option => !usedOptions.has(option) || option === selectedOption
  )

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:border-gray-500"
      >
        {selectedOption || 'Select Option'}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {availableOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SingleSelect