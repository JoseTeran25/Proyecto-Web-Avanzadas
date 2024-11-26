"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RecuperarContraseña() {
    // Obtener el query parameter `id` de la URL
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError('');

        // Enviar solicitud al backend para actualizar la contraseña
        try {
            const response = await fetch('http://26.70.60.63:4000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: id, newPassword: password }),
            });

            if (!response.ok) {
                throw new Error('Hubo un error al actualizar la contraseña.');
            }

            setSuccess(true);
            
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Error inesperado.');
            } else {
                setError('Error inesperado.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">Recuperar contraseña</h1>

                {success ? (
                    <p className="text-green-600 text-center">¡Contraseña actualizada con éxito! Ahora puedes iniciar sesión.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p className="mb-4 text-gray-600 text-center">
                            Por favor, ingresa tu nueva contraseña para continuar.
                        </p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Actualizar Contraseña
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
