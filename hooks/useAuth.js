"use client"

import { useState, useContext } from "react";
import { auth, db } from "@/libs/firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    reauthenticateWithCredential,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithPopup,
} from "firebase/auth";

import { usePathname, useRouter } from 'next/navigation'
import { AppContext } from "@/contexts/AppContext";

export function useAuth() {
    const provider = new GoogleAuthProvider();
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in";
    const isSignUp = pathname === "/sign-up";
    const isDeleteAccount = pathname === "/delete-account";
    const router = useRouter();
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [authError, setAuthError] = useState(() => ({
        isMessageShown: false,
        message: null,
    }));

    const { setDialog, openDialog } = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    function updateUserDataOnChange(e) {
        const input = e.target;
        const key = input.name;
        const value = input.value;

        setNewUser((prevUser) => ({ ...prevUser, [key]: value }));
    }

    function authenticateWithEmailAndPassword(e) {
        e.preventDefault();
        const form = e.target;
        const { email, password, confirmPassword } = newUser;
        const hasNumber = /\d/.test(password)

        if (isSignUp && password !== confirmPassword) {
            showErrorMessage(`Passwords do not match.`);
        } else if (isSignUp && password.split('').length < 8) {
            showErrorMessage(`Password must be at least 8 characters long.`);
        } else if (isSignUp && !hasNumber) {
            showErrorMessage(`Password must contain a number.`);
        } else {
            setLoading(true);
            if (isSignIn) {
                signIn(email, password, form);
            } else if (isSignUp) {
                createAccount(email, password, form);
            } else {
                const credential = EmailAuthProvider.credential(email, password);
                deleteAccount(auth.currentUser, "emailAndPassword", credential);
            }
        }
    }

    async function signIn(
        email,
        password,
        form,
    ) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            if (userCredential) {
                clearUserDetails(form);
                setLoading(() => false);
                router.replace("/");
            }
        } catch (error) {
            setLoading(() => false);
            showErrorMessage(error.message);
        }
    }

    async function authenticateWithGoogle() {
        try {
            setLoading(() => true);
            if (isDeleteAccount) {
                await deleteAccount(auth.currentUser, "google");
            } else {
                const userCredential = await signInWithPopup(auth, provider);
                if (userCredential) {
                    setLoading(() => false);
                    !isDeleteAccount && router.replace("/")
                }
            }
        } catch (error) {
            setLoading(() => false);
            setDialog((prevDialog) => ({ ...prevDialog, message: error.message }));
            openDialog();
        }
    }

    async function deleteAccount(
        user,
        method,
        credential,
    ) {
        try {
            let userCredential;
            if (method === "emailAndPassword") {
                userCredential = await reauthenticateWithCredential(
                    user,
                    credential,
                );
            } else {
                userCredential = await reauthenticateWithPopup(user, provider);
            }
            if (userCredential) {
                await deleteUser(user);
                setDialog((prevDialog) => ({
                    ...prevDialog,
                    message: `Account deleted successfully.`,
                }));
                openDialog();
                setLoading(() => false);
                router.replace("/")
            }
        } catch (error) {
            setDialog((prevDialog) => ({ ...prevDialog, message: error.message }));
            openDialog();
            setLoading(() => false);
        }
    }

    async function createAccount(
        email,
        password,
        form,
    ) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            if (userCredential) {
                clearUserDetails(form);
                setLoading(() => false);
                router.push("/");
            }
        } catch (error) {
            showErrorMessage(error.message);
        } finally {
            setLoading(() => false);
        }
    }

    function clearUserDetails(form) {
        setNewUser((prevUser) => {
            prevUser = { email: "", password: "", confirmPassword: "" };
            return prevUser;
        });
        form.reset();
    }

    function showErrorMessage(message) {
        setAuthError((prev) => ({
            ...prev,
            isMessageShown: true,
            message: message,
        }));
        setTimeout(
            () =>
                setAuthError((prev) => ({
                    ...prev,
                    isMessageShown: false,
                    message: null,
                })),
            6000,
        );
    }

    return { isDeleteAccount, isSignIn, isSignUp, newUser, authError, loading, updateUserDataOnChange, authenticateWithGoogle, authenticateWithEmailAndPassword }
}