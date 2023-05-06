import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/PageLogin/LoginForm/LoginForm";
import { useRouter } from "next/router";

export default function Home() {
  const { login, register, currentUser } = useAuth()
  const router = useRouter()
  if (currentUser) {
    router.push("/products")
  }

  return (
    <>
      <LoginForm login={login} register={register} />
      {/* <button onClick={loginWithGoogle}>Login with Google</button> */}
    </>
  )
}
