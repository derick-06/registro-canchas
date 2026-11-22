// Lógica de reservas, separada de la interfaz para poder probarla.

export function hayConflicto(reservas, nueva) {
  return reservas.some(
    (r) => r.cancha === nueva.cancha && r.fecha === nueva.fecha && r.hora === nueva.hora
  );
}

export function validarReserva(reservas, nueva) {
  if (!nueva.nombre || !nueva.nombre.trim()) {
    return "Escribe el nombre de quien reserva.";
  }
  if (hayConflicto(reservas, nueva)) {
    return `${nueva.cancha} ya está reservada ese día a las ${nueva.hora}. Elige otra hora.`;
  }
  return "";
}

export function ordenarReservas(reservas) {
  return [...reservas].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
}
