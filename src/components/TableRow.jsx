import { useState } from 'react'
import SingleSelect from './SingleSelect'
import MultiSelect from './MultiSelect'

function TableRow({ usedOptions, onOptionSelect, onOptionUnselect, rowId }) {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSingleSelect = (option) => {
    if (selectedOption) {
      onOptionUnselect(selectedOption)
    }
    setSelectedOption(option)
    onOptionSelect(option, rowId)
  }

  return (
    <tr className="border-b">
      <td className="px-6 py-4">
        <SingleSelect
          usedOptions={usedOptions}
          onSelect={handleSingleSelect}
          selectedOption={selectedOption}
        />
      </td>
      <td className="px-6 py-4">
        <MultiSelect />
      </td>
    </tr>
  )
}

export default TableRow