import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input'
const SelectOption = () => {
  return (
    <div className='mx-10  lg:mx-20'>
        <div className='mt-10 grid grid-cols-2 gap-2 md:gap-6'>
        <div>
            <label htmlFor="" className='text-sm'> Difficulty Level</label>
            <Select>
  <SelectTrigger className="">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Bigginer">Bigginer</SelectItem>
    <SelectItem value="Intermidiate">Intermidiate</SelectItem>
    <SelectItem value="Expert">Expert</SelectItem>
  </SelectContent>
</Select>
        </div>
        <div>
            <label className='text-sm' htmlFor=""> Duration</label>
            <Select>
  <SelectTrigger className="">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1 Hour">1 Hour</SelectItem>
    <SelectItem value="2 Hours">2 Hours</SelectItem>
    <SelectItem value="More than 3 Hours<">More than 3 Hours</SelectItem>
  </SelectContent>
</Select>
        </div>
        <div>
            <label htmlFor="" className='text-sm'> Include Video</label>
            <Select>
  <SelectTrigger className="">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Yes">Yes</SelectItem>
    <SelectItem value="No">No</SelectItem>
    </SelectContent>
</Select>
        </div>
        <div>
            <label htmlFor="" className='text-sm'> No of Chapter</label>
            <Input  type='number'/>
        </div>

        </div>
    </div>
  )
}

export default SelectOption