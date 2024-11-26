'use client';

import { Cabecera, Paginacion, Tabla } from "@/components";
import { getCookie } from "cookies-next";
import Chat from "../chat/Chat";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    // Leer la cookie directamente en el cliente

    const userCookie = getCookie("cookie") ? JSON.parse(getCookie("cookie") as string) : null;
    const role = userCookie?.user.role;
    const router = useRouter();
    console.log('role:', role);
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
                {role === "student" && <Chat />}
                {role === "professor" && (
                    <>
                        <h1>Tabla de estudiantes</h1>
                        <Tabla />
                        <Paginacion />
                    </>

                )}
            </>

        </section>
    );
}
