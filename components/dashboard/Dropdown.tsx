import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  
function Dropdown({children, handleOnDelete}){
    const [openAlert , setOpenAlert]=useState()
  return (
  <div>
  

    <DropdownMenu>
  <DropdownMenuTrigger onclick={()=>setOpenAlert(true)}>{children}</DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem>
    <AlertDialog open={openAlert}>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your course from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onclick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onclick={()=>handleOnDelete(), setOpenAlert(false)}  className="bg-red-600">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  </div>

  )
}

export default Dropdown 
