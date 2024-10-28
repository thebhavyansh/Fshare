"use client";
import React, { useEffect, useState } from "react";
import app from "../../../../../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

function Download() {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const db = getFirestore(app);
  const router = useRouter()

  const onPasswordSave = async () => {
    const docRef = doc(db, "uploadedFile", url);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (password === docSnap.data().password) {
          console.log("Authentication successful");
          router.push(docSnap.data().fileUrl)
        } else {
          console.log("Incorrect password");
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    if (check) {
      onPasswordSave();
      setCheck(false); // Reset to prevent repeated calls
    }
  }, [check]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setCheck(false);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <p className="mt-4 text-gray-500">Document Id</p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="url" className="sr-only">
            Short URL
          </label>
          <div className="relative">
            <input
              type="text"
              id="url"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter document ID"
              onChange={handleInputChange(setUrl)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              onChange={handleInputChange(setPassword)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            onClick={() => setCheck(true)}
          >
            Download
          </button>
        </div>
      </form>
    </div>
  );
}

export default Download;
