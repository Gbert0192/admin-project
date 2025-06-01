'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from './dialog'
import { Button } from './button'
import { Input } from './input'
import { useState } from 'react'

export function CreateForm() {
  const [formName, setFormName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    console.log('Form Created:', { formName, description })
    setFormName('')
    setDescription('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Form Title"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
