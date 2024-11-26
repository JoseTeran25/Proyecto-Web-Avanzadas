'use client';

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const Cabecera = () => {
  const [datosTabla, setDatosTabla] = useState<any>(null);

  useEffect(() => {
    const datosCookie = getCookie("cookie");
    if (datosCookie) {
      const parsedDatos = JSON.parse(datosCookie as string);
      setDatosTabla(parsedDatos.user);
      console.log("Datos obtenidos de la cookie:", parsedDatos);
    } else {
      console.warn("No hay datos disponibles en las cookies.");
    }
  }, []);

  if (!datosTabla) {
    // Mientras `datosTabla` no esté disponible, se muestra un mensaje de carga o similar
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-bold text-gray-800">{datosTabla.name}</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
              240 Alumnos
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{datosTabla.email}</p>
        </div>
      </div>

      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse"></div>

        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mx-3 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
          />
        </div>
      </div>
    </>
  );
};
