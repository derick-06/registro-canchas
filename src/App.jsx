import { useEffect, useState } from "react";

const CANCHAS = ["Fútbol 5", "Básquet", "Pádel", "Tenis","Voley"];
const HORAS = Array.from({ length: 14 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

function hoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function formatearFecha(fecha) {
  return new Date(`${fecha}T00:00`).toLocaleDateString("es-EC", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function cargar() {
  try {
    return JSON.parse(localStorage.getItem("reservas")) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [reservas, setReservas] = useState(cargar);
  const [form, setForm] = useState({ nombre: "", cancha: CANCHAS[0], fecha: hoy(), hora: HORAS[0] });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }, [reservas]);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = (e) => {
    e.preventDefault();
    const nombre = form.nombre.trim();
    if (!nombre) return setError("Escribe el nombre de quien reserva.");

    const ocupada = reservas.some(
      (r) => r.cancha === form.cancha && r.fecha === form.fecha && r.hora === form.hora
    );
    if (ocupada) {
      return setError(`${form.cancha} ya está reservada ese día a las ${form.hora}. Elige otra hora.`);
    }

    setReservas([...reservas, { id: Date.now(), ...form, nombre }]);
    setForm({ ...form, nombre: "" });
    setError("");
  };

  const cancelar = (id) => setReservas(reservas.filter((r) => r.id !== id));

  const ordenadas = [...reservas].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

  return (
    <main className="app">
      <header className="encabezado">
        <h1>Reserva de canchas</h1>
        <p>Elige cancha, día y hora. Cada horario dura una hora.</p>
      </header>

      <div className="contenido">
        <form className="cancha" onSubmit={guardar} noValidate>
          <h2>Nueva reserva</h2>

          <label>
            Nombre
            <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Ej. Carlos Mera" />
          </label>

          <label>
            Cancha
            <select name="cancha" value={form.cancha} onChange={cambiar}>
              {CANCHAS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <div className="fila">
            <label>
              Fecha
              <input type="date" name="fecha" min={hoy()} value={form.fecha} onChange={cambiar} />
            </label>
            <label>
              Hora
              <select name="hora" value={form.hora} onChange={cambiar}>
                {HORAS.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button type="submit">Guardar reserva</button>
        </form>

        <section className="lista">
          <h2>Reservas ({ordenadas.length})</h2>

          {ordenadas.length === 0 ? (
            <p className="vacio">Todavía no hay reservas. Completa el formulario para crear la primera.</p>
          ) : (
            <ul>
              {ordenadas.map((r) => (
                <li key={r.id}>
                  <span className="hora">{r.hora}</span>
                  <div className="datos">
                    <strong>{r.nombre}</strong>
                    <span>
                      {r.cancha}, {formatearFecha(r.fecha)}
                    </span>
                  </div>
                  <button className="cancelar" onClick={() => cancelar(r.id)}>
                    Cancelar reserva
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
