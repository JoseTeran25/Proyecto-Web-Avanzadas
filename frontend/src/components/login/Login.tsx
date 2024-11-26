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
              {/* SVG icon */}
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
              {/* SVG icon */}
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

            {/* Resto del código del formulario */}
          </div>
        </form>
      </div>
    </section>
  )
}
