'use client';

import { Cabecera, Paginacion, Tabla } from "@/components";
import { getCookie } from "cookies-next";
import Chat from "../chat/Chat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    // Leer la cookie directamente en el cliente
    const userCookie = getCookie("cookie") ? JSON.parse(getCookie("cookie") as string) : null;
    const role = userCookie?.user.role;
    const router = useRouter();

    // Estado para controlar el tab activo
    const [activeTab, setActiveTab] = useState("tabla"); // "tabla" o "chat"

    useEffect(() => {
        // Redirigir si no hay cookie
        if (!userCookie) {
            router.push('/login');
        }
    }, [userCookie, router]);

    // Renderizar según el rol
    return (
        <section className="container px-4 mx-auto">
            <>
                <Cabecera />

                {role === "professor" && (
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "tabla" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            onClick={() => setActiveTab("tabla")}
                        >
                            Tabla
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "chat" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                            onClick={() => setActiveTab("chat")}
                        >
                            Chat
                        </button>
                    </div>
                )}


                {/* Contenido según el tab activo */}
                {activeTab === "tabla" && role === "professor" && (
                    <>
                        <h1 className="text-xl font-bold mt-4">Tabla de estudiantes</h1>
                        <Tabla />
                    </>
                )}


                {activeTab === "chat" && role === "professor" && <Chat />}

                {role === "student" && (
                    <>
                        <h1 className="text-xl font-bold mt-4">Chatea con la clase</h1>
                        <Chat />
                    </>
                )}

            </>
        </section>
    );
}
