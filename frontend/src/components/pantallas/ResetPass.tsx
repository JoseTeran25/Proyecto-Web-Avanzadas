'use client'

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');
        setError('');

        try {
            const respuesta = await fetch('http://26.70.60.63:4000/auth/recover-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (!respuesta.ok) {
                throw new Error('Hubo un error al enviar el enlace de recuperación.');
            }

            setMensaje('Se ha enviado un enlace de recuperación a tu correo electrónico.');

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Error inesperado.');
            } else {
                setError('Error inesperado.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="bg-white">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md" onSubmit={handleResetPassword}>
                    <Image
                        className="w-auto h-7 sm:h-8"
                        src="https://merakiui.com/images/logo.svg"
                        alt=""
                        width={50}
                        height={50}
                    />

                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
                        Recuperar Contraseña
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </p>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            {/* SVG icon */}
                        </span>

                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Correo electrónico"
                        />
                    </div>

                    {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
                    {error && <p className="mt-4 text-red-600">{error}</p>}

                    <div className="mt-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-3 text-base font-bold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Enviando...' : 'Enviar Enlace'}
                        </button>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-sm text-blue-500 hover:underline">
                                Volver al inicio de sesión
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ResetPass;
