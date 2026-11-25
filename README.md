# Reserva de canchas

Proyecto sencillo hecho con React + Vite. Guarda las reservas en el navegador (localStorage).

## Ejecutar en local

1. Instalar Node.js (versión 18 o superior): https://nodejs.org
2. Abrir una terminal en esta carpeta.
3. `npm install`
4. `npm run dev`
5. Abrir la dirección que aparece (normalmente http://localhost:5173).

## Compilar para producción

`npm run build` genera la carpeta `dist`, que es la que se publica en AWS Amplify.

## Estrategia de ramas

- `main`: versión estable. AWS Amplify la despliega automáticamente.
- `feature/*`: una rama por cambio. El CI (GitHub Actions) corre en cada push.
- Todo cambio llega a `main` mediante pull request, con el CI en verde y la revisión de un compañero.

## Pruebas

`npm test` ejecuta las pruebas de la lógica de reservas (Vitest). El workflow `.github/workflows/ci.yml` las corre junto con `npm run build`.

## Volver a una versión estable

En la consola de AWS Amplify, abrir la lista de compilaciones y usar «Redeploy this version» en la última compilación exitosa; o hacer `git revert <sha>` y `git push` a `main`.
