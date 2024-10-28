"use client"
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from '../../../../../../firebaseConfig'
import FileShareForm from './_components/FileShareForm'
import { useParams, useRouter } from 'next/navigation'
function FilePreview() {
  const router = useRouter()
  const db = getFirestore(app)
  const params = useParams();
  const [file,setFile] = useState()
  useEffect(()=>{
    params?.fileId && getFileInfo()
  },[])
  const getFileInfo =async () => {
    const docRef = doc(db,"uploadedFile",params?.fileId)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      setFile(docSnap.data());
    } else{
      console.log("No such Document")
    }
  }
  // const onPasswordSave= async(password)=>{
  //   const docRef = doc(db,"uploadedFile",params?.fileId)
  //   await updateDoc(docRef,{
  //     password:password
  //   })
  //   alert("Passord set successfully")
  //   router.push('/download');
  // }
  return (
    <div>
      <FileShareForm  file={file}  /> 
    </div>
  )
}

export default FilePreview