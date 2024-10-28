"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../../../firebaseConfig"
import ProgressBar from './_components/ProgressBar';
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import { generateRandomStrin } from '@/app/_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';
function Upload() {
  const storage = getStorage(app)
  const db = getFirestore(app)
  const router = useRouter();
  const [progress,setProgress] = useState();
  const [fileId,setFileId] = useState();
  const[uploadCompleted,setUploadCompleted]= useState(false);
  const uploadFile=(file)=>{
    
    const storageRef = ref(storage,'file-upload/'+file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type)
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress)
        progress==100&&getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          console.log("working")
          saveInfo(file,downloadURL);
        });
      },)
  }
  const saveInfo = async (file,fileUrl) =>{
    const docId= generateRandomStrin().toString();
    try{
    await setDoc(doc(db, "uploadedFile", docId), {
      filename:file.name,
      fileSize:file.size,
      fileType:file.type,
      fileUrl:fileUrl,
      password:'',
      id:docId,
      shortUrl:process.env.NEXT_PUBLIC_BASE_URL+docId
    })
    setFileId(docId)
    setUploadCompleted(true);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    uploadCompleted && 
    setTimeout(() => {
      setUploadCompleted(false);
      router.push('/file-preview/'+fileId)
    }, 2000);
  })
  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>Start <strong className='text-primary
      '>Uploading</strong> File and <strong className='text-primary'>Share</strong> it</h2>
      <UploadForm uploadBtnClick={(file)=>uploadFile(file)} progress={progress} />
       
    </div>
  )
}

export default Upload