import { describe, it, expect } from "vitest";
import { hayConflicto, validarReserva, ordenarReservas } from "./reservas.js";

const base = { id: 1, nombre: "Carlos", cancha: "Pádel", fecha: "2026-12-01", hora: "10:00" };

describe("HU-01: no reservar una cancha ocupada", () => {
  it("detecta conflicto en la misma cancha, día y hora", () => {
    expect(hayConflicto([base], { ...base, id: 2, nombre: "Ana" })).toBe(true);
  });

  it("permite la misma cancha el mismo día a otra hora", () => {
    expect(hayConflicto([base], { ...base, hora: "11:00" })).toBe(false);
  });

  it("permite otra cancha a la misma hora", () => {
    expect(hayConflicto([base], { ...base, cancha: "Tenis" })).toBe(false);
  });
});

describe("HU-02: validar el formulario", () => {
  it("rechaza un nombre vacío", () => {
    expect(validarReserva([], { ...base, nombre: "   " })).toBe("Escribe el nombre de quien reserva.");
  });

  it("acepta una reserva válida", () => {
    expect(validarReserva([], base)).toBe("");
  });

  it("explica el error cuando el horario está ocupado", () => {
    expect(validarReserva([base], { ...base, nombre: "Ana" })).toContain("ya está reservada");
  });
});

describe("HU-03: ver las reservas ordenadas", () => {
  it("ordena por fecha y hora", () => {
    const a = { ...base, id: 1, fecha: "2026-12-02", hora: "09:00" };
    const b = { ...base, id: 2, fecha: "2026-12-01", hora: "15:00" };
    const c = { ...base, id: 3, fecha: "2026-12-01", hora: "08:00" };
    expect(ordenarReservas([a, b, c]).map((r) => r.id)).toEqual([3, 2, 1]);
  });
});
