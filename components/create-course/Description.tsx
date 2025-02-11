import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Description = () => {
  return (
    <div className='mx-20  lg:mx-32'>
        <div  className='mt-6'>
            <label htmlFor=""> Write topic you want to generte (i.e Python, Sports, Politics)</label>
            <Input placeholder={'Topic'}/>
        </div>
        <div className='mt-6'>
            <label htmlFor="">Tell us more about your topic</label>
            <Textarea placeholder='Description of your topic'/>
        </div>

    </div>
  )
}

export default Description