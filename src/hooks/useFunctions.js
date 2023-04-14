import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import { useRouter } from "next/router";

import { useAuth } from "@/context/AuthContext";

export const useFunctions = ({data} = {data: null}) => {
    const { currentUser } = useAuth()

    const router = useRouter()

    const userCredentials = data?.find((user) => user.userId === currentUser?.uid)

    let loaded = false

    if (userCredentials) {
        const secondaryFirebaseApp = userCredentials && firebase.initializeApp(userCredentials?.config, 'secondaryFirebaseApp');
        const db = secondaryFirebaseApp.firestore();

        if (db) {
            loaded = true
        }

        const fetchProducts = () => {
            return db
            .collection("prueba")
            .get()
            .then(({ docs }) => {
                return docs.map((doc) => {
                const data = doc.data()
                const id = doc.id
        
                return {
                    ...data,
                    id
                }
                }
            )
        })}

        const redirect = (url) => {
            router.push(url)
        }

        const handleRegisterProduct = (form, url) => {
            db.collection('prueba').add(form)
                .then((res) => {
                    console.log(res)
                    redirect(url)
                })
                .catch(err => console.log(err))
        }

        const getStorage = () => secondaryFirebaseApp.storage()

        return {
            loaded,
            fetchProducts,
            handleRegisterProduct,
            getStorage
        }

    } else {
        return {
            loaded
        }
    }

}