'use client';

import { postCreaUsuario } from "@/peticiones";
import Link from "next/link";
import { useState } from "react";

export const SignUp = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const validateForm = (datos: any) => {
    const errors: Record<string, string> = {};
    if (!selectedRole) errors.role = "Debe seleccionar un rol.";
    if (!datos.email) errors.email = "El correo electrónico es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(datos.email))
      errors.email = "Debe ser un correo válido.";
    if (!datos.password) errors.password = "La contraseña es obligatoria.";
    else if (datos.password.length < 6)
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    if (!datos.confirmarPassword)
      errors.confirmarPassword = "La confirmación de contraseña es obligatoria.";
    else if (datos.password !== datos.confirmarPassword)
      errors.confirmarPassword = "Las contraseñas no coinciden.";

    return errors;
  };

  const handleRegistrarse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setIsSubmitting(true);

    const form = new FormData(e.currentTarget);
    const datosRegistro = {
      name: `${form.get("nombres")} ${form.get("apellidos")}`,
      email: form.get("email") as string,
      password: form.get("password") as string,
      confirmarPassword: form.get("confirmarPassword") as string, // Solo para validación
      role: selectedRole,
    };

    console.log("Datos ingresados:", datosRegistro);

    const errors = validateForm(datosRegistro);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      console.log("Errores de validación:", errors);
      return;
    }

    // Eliminar `confirmarPassword` antes de enviar al servidor
    const datosParaServidor = {
      name: datosRegistro.name,
      email: datosRegistro.email,
      password: datosRegistro.password,
      role: datosRegistro.role,
    };

    console.log("Datos enviados al servidor:", datosParaServidor);

    try {
      const response = await postCreaUsuario(datosParaServidor);
      console.log("Respuesta del servidor:", response);
      alert("Usuario registrado exitosamente.");
      e.currentTarget.reset();
      setSelectedRole(null); // Reinicia el rol seleccionado
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario. Intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
              Obtén tu cuenta gratis ahora.
            </h1>

            <p className="mt-4 text-gray-500">
              Vamos a configurar todo para que puedas verificar tu cuenta
              personal y comenzar a configurar tu perfil.
            </p>

            <div className="mt-6">
              <h1 className="text-gray-500">Selecciona tu rol</h1>

              <div className="mt-3 md:flex md:items-center md:-mx-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole("professor")}
                  className={`flex justify-center w-full px-6 py-3 ${selectedRole === "professor"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 border border-blue-500"
                    } rounded-lg md:w-auto md:mx-2 focus:outline-none`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="mx-2">Profesor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("student")}
                  className={`flex justify-center w-full px-6 py-3 mt-4 ${selectedRole === "student"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 border border-blue-500"
                    } rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="mx-2">Estudiante</span>
                </button>
              </div>
              {formErrors.role && (
                <p className="mt-2 text-sm text-red-500">{formErrors.role}</p>
              )}
            </div>

            <form onSubmit={handleRegistrarse} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              {[
                { name: "nombres", label: "Nombres", placeholder: "John" },
                { name: "apellidos", label: "Apellidos", placeholder: "Snow" },
                { name: "email", label: "Correo electrónico", placeholder: "johnsnow@example.com", type: "email" },
                { name: "password", label: "Contraseña", placeholder: "Ingresa tu contraseña", type: "password" },
                { name: "confirmarPassword", label: "Confirmar contraseña", placeholder: "Repite tu contraseña", type: "password" },
              ].map(({ name, label, placeholder, type = "text" }) => (
                <div key={name}>
                  <label className="block mb-2 text-sm text-gray-600">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${formErrors[name] ? "border-red-500" : "border-gray-200"} rounded-lg`}
                  />
                  {formErrors[name] && (
                    <p className="mt-2 text-sm text-red-500">{formErrors[name]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex font-bold items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>{isSubmitting ? "Registrando..." : "Registrarse"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd" />
                </svg>
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
