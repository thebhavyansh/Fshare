"use client"
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import app from '../../../../../../../firebaseConfig';
import { useRouter } from 'next/navigation';
function FileShareForm({file}) {
    const [isEnable, setIsEnable] = useState(false);
    const db = getFirestore(app);
    const [password, setPassword] = useState("");
  const router = useRouter()
    const onPasswordSave = async (e) => {
      e.preventDefault(); // Prevents form submission and page reload
      const docRef = doc(db, "uploadedFile", file?.id);
      await updateDoc(docRef, {
        password: password
      });
      alert("Password set successfully");
      router.push('/download')
    }
    return (
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className='text-[20px] text-center m-5'>Make your file More <strong className='text-primary'>Secure</strong></h2>
          </div>
          <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={onPasswordSave}>
            <div>
              <label htmlFor="email" className="m-1">Document Id</label>
              <div className="relative">
                <input
                  type="text" value={file?.id} disabled
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {file?.password ? (
  <div>
    <label htmlFor="password" className="sr-only">Password</label>
    <div className="relative">
      <input
        type="password"
        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
        placeholder="Change password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </span>
    </div>
  </div>
) : (
  <div>
    <div className='flex gap-2'>
      <input
        type="checkbox" onChange={(e) => setIsEnable(!isEnable)}
        className=""
      />
      <label htmlFor="enable" className="">Set Password</label>
    </div>
    {isEnable && (
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>
    )}
  </div>
)}

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Please note the Document Id
              </p>
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                onClick={()=>onPasswordSave()}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default FileShareForm;
