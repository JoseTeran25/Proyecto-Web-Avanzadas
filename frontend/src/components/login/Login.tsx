'use client'

import { postLogin } from "@/peticiones";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Login = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleIniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const datosInicioSesion = {
      email: form.get('email') as string,
      password: form.get('password') as string,
    }

    try {
      setLoading(true);
      const respuesta = await postLogin(datosInicioSesion);
      console.log('respuesta:', respuesta);

      if (respuesta) {
        setCookie("cookie", JSON.stringify(respuesta), {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });

        router.push('/');
      } else {
        alert("Correo electrónico o contraseña incorrectos.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }

  }

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleIniciarSesion}>
          <Image
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
            width={50}
            height={50}
          />

          <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
            Iniciar sesión
          </h1>

          <div className="relative flex items-center mt-8">
            <span className="absolute">

              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>

            <input
              type="email"
              name="email"
              required
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>

            <input
              type="password"
              name="password"
              required
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Contraseña"
            />
          </div>

          <Link href="/reset-password" className="inline-block mt-4 text-blue-500 hover:underline dark:text-blue-400">
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="mt-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 text-base font-bold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}

            </button>
            <p className="mt-4 text-center text-gray-600">or sign in with</p>


            <div className="mt-6 text-center ">
              <Link href="/signup" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                Aún no tienes una cuenta? Regístrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
