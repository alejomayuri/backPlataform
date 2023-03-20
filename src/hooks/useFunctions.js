import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import 'firebase/compat/auth';
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export const useFunctions = ({data} = {data: null}) => {
    const { currentUser } = useAuth()

    const userCredentials = data.find((user) => user.userId === currentUser?.uid)
    let loaded = false

    if (userCredentials) {
        const secondaryFirebaseApp = userCredentials && firebase.initializeApp(userCredentials?.config, 'secondaryFirebaseApp');
        const db = secondaryFirebaseApp.firestore();

        if (db) {
            loaded = true
        }

        const fetchProducts = () => {
            return db
            .collection("products")
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

        const handleRegisterProduct = (form) => {
            db.collection('prueba').add(form)
                .then((res) => {
                    console.log(res)
                })
                .catch(err => console.log(err))
        }

        return {
            loaded,
            fetchProducts,
            handleRegisterProduct
        }
    } else {
        return {
            loaded
        }
    }

}