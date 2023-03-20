import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import 'firebase/compat/auth';
import { useEffect, useState } from 'react'
import { useFunctions } from "@/hooks/useFunctions";
import { useAuth } from "@/context/AuthContext";

export default function Home(props) {
  const { data } = props

  const { loginWithGoogle } = useAuth()

  const functions = useFunctions({data})

  const fetchProducts = functions?.fetchProducts;

  const [products, setProducts] = useState([])

  console.log(functions?.loaded)

  useEffect(() => {
    if (fetchProducts) {
      fetchProducts().then((data) => {
      setProducts(data)
    }
  )}}, [functions?.loaded])

console.log(products)
 return (
    <>
      <h1>hola</h1>
      <button 
        onClick={() => {
          functions?.handleRegisterProduct({
            name: 'prueba',
            price: 9000
          })
        }}
      >
        Subir datos
      </button>
      <button onClick={loginWithGoogle}>Login</button>
    </>
  )
}

export async function getServerSideProps(context) {
  // Conéctate al primer servidor de Firebase para obtener la información necesaria para conectarte al segundo servidor
  const response = await fetch('https://us-central1-back-plataform.cloudfunctions.net/function-2');
  const data = await response.json();

  return {
    props: {
      data
    }
  };
}