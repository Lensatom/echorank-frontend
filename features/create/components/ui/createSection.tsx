"use client"

import { Container } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui'
import { Plus, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { CreatePollContext, IPollSection } from '../../context'

interface ISectionProps {
  index: number
}

export function Section({
  index,
}: ISectionProps) {

  const context = useContext(CreatePollContext)
  
  if (!context) {
    throw new Error('CreatePollForm must be used within CreatePollProvider')
  }

  const { pollData, setPollData } = context
  const [isFocused, setIsFocused] = useState(false)

  const currentSection = pollData?.sections?.[index]

  const handleSectionChange = (field: keyof IPollSection, value: string | boolean) => {
    if (!pollData || !pollData.sections) return
    
    const updatedSections = [...pollData.sections]
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    }
    
    setPollData({
      ...pollData,
      sections: updatedSections
    })
  }

  const handleOptionChange = (optionIndex: number, field: 'name', value: string) => {
    if (!pollData || !pollData.sections || !currentSection?.options) return
    
    const updatedSections = [...pollData.sections]
    const updatedOptions = [...currentSection.options]
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [field]: value
    }
    
    updatedSections[index] = {
      ...updatedSections[index],
      options: updatedOptions
    }
    
    setPollData({
      ...pollData,
      sections: updatedSections
    })
  }

  const handleAddOption = () => {
    if (!pollData || !pollData.sections || !currentSection) return
    
    const newOption = { name: ''}
    const updatedSections = [...pollData.sections]
    const updatedOptions = [...(currentSection.options || []), newOption]
    
    updatedSections[index] = {
      ...updatedSections[index],
      options: updatedOptions
    }
    
    setPollData({
      ...pollData,
      sections: updatedSections
    })
  }

  const handleRemoveOption = (optionIndex: number) => {
    if (!pollData || !pollData.sections || !currentSection?.options) return
    
    const updatedSections = [...pollData.sections]
    const updatedOptions = currentSection.options.filter((_, i) => i !== optionIndex)
    
    updatedSections[index] = {
      ...updatedSections[index],
      options: updatedOptions
    }
    
    setPollData({
      ...pollData,
      sections: updatedSections
    })
  }

  const handleRemoveSection = () => {
    if (!pollData || !pollData.sections || !Array.isArray(pollData.sections)) return
    // Prevent removing the last remaining section
    if (pollData.sections.length <= 1) return
    const updatedSections = pollData.sections.filter((_, i) => i !== index)
    setPollData({
      ...pollData,
      sections: updatedSections
    })
  }

  return (
    <Container className={`border mt-6 rounded-lg w-[60%] ${isFocused ? "!border-blue-500" : "border-gray-300"}`}>
      <form>
        <div className='flex flex-col'>
          <input
            value={currentSection?.name || ''}
            onChange={(e) => handleSectionChange('name', e.target.value)}
            placeholder={`Section ${index + 1}`}
            className='text-lg font-semibold outline-none'
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <input
            value={currentSection?.description || ''}
            onChange={(e) => handleSectionChange('description', e.target.value)}
            placeholder='Enter sub text here'
            className='text-sm outline-none'
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {currentSection?.options?.map((option, optionIndex) => (
          <Container key={optionIndex} className='mt-4 border rounded-lg !p-4'>
            <div className='flex justify-between items-center'>
              <h4 className='text-sm font-medium'>Option {optionIndex + 1}</h4>
              {currentSection.options && currentSection.options.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className='text-xs text-red-600 border-red-200 hover:bg-red-50'
                  onClick={() => handleRemoveOption(optionIndex)}
                >
                  <X size={14} />
                </Button>
              )}
            </div>
            <input
              value={option.name || ''}
              onChange={(e) => handleOptionChange(optionIndex, 'name', e.target.value)}
              placeholder='Enter option text'
              className='text-sm mt-1 outline-none w-full'
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {/* <div className='flex items-center gap-2 mt-3'>
              <ImageUpIcon size={18} className='text-gray-600' />
              <input
                value={option.imageUrl || ''}
                onChange={(e) => handleOptionChange(optionIndex, 'imageUrl', e.target.value)}
                placeholder='Image URL (optional)'
                className='text-xs outline-none flex-1'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div> */}
          </Container>
        ))}
        
        <div className='flex gap-4 items-center justify-between mt-6'>
          <Button 
            type="button"
            size="sm" 
            variant="outline" 
            className='text-xs text-gray-700'
            onClick={handleAddOption}
          >
            <Plus />
            Add new Option
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className={`text-xs cursor-pointer ${pollData?.sections && pollData.sections.length <= 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700'}`}
            disabled={!!pollData?.sections && pollData.sections.length <= 1}
            onClick={handleRemoveSection}
          >
            <X />
            Remove this section
          </Button>
        </div>
      </form>
    </Container>
  )
}