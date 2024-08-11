"use client"

import { useRouter } from "next/navigation"
import { createContext, useState, useRef, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";

export const AppContext = createContext(null)

export function AppContextProvider({ children }) {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [signedInUser, setSignedInUser] = useState(undefined);
    const [dialog, setDialog] = useState({
        message: null,
        isOpen: false,
    });
    const dialogRef = useRef(null);
    const router = useRouter()  

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setisLoggedIn(user ? true : false);
            setSignedInUser(() => user);
        });
    }, []);

    function openDialog() {
        setDialog((prevDialog) => ({ ...prevDialog, ["isOpen"]: true }));
        dialogRef.current?.showModal();
    }

    function closeDialog() {
        setDialog((prevDialog) => ({ ...prevDialog, message: "", isOpen: false }));
        dialogRef.current?.close();
    }
    
    useEffect(() => {
        if (signedInUser === null) {
          router.push("sign-in")
        }
    }, [signedInUser, router])

    return (
        <AppContext.Provider value={{ isLoggedIn, signedInUser, openDialog, setDialog }}>
            {children}
            <dialog
                className={`${dialog.isOpen ? "flex" : ""} fixed inset-0 m-auto flex-col gap-6 items-start w-[70%] max-w-[300px] p-5 backdrop:bg-zinc-900/40 backdrop-blur-md bg-red-800/40 border border-red-700/80 rounded-xl`}
                ref={dialogRef}>
                <p className="text-base text-zinc-100 font-normal">{dialog.message}</p>
                <button
                    className="self-end bg-red-700 hover:bg-red-800 text-zinc-100 font-medium tracking-wide rounded-lg px-[.5em] py-[.25em] ml-6"
                    onClick={closeDialog}>
                    Close
                </button>
            </dialog>
        </AppContext.Provider>
    )
}
