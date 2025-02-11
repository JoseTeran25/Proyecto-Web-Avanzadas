import { Suspense } from "react";
import RecuperarContraseña from "@/components/recuperar-contraseña/RecuperarContraseña";

export default function RecuperarPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RecuperarContraseña />
    </Suspense>
  );
}
