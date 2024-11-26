import { Cabecera, Paginacion, Tabla } from "@/components";

export default function () {

  return (
    <section className="container px-4 mx-auto">
      <Cabecera />

      <Tabla />

      <Paginacion />
    </section>
  );
}
