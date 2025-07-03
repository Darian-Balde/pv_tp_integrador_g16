# Trabajo Práctico Integrador – Programación Visual

*Carrera:* Analista Programador Universitario.
*Facultad de Ingeniería – Año:* 2025.
*Materia:* Programación Visual.
*Modalidad:* Trabajo grupal - Integrador Final.

## Índice

* 📌 Objetivo del proyecto
* ⚙ Tecnologías utilizadas
* 🗂 Estructura del proyecto
* ✅ Funcionalidades
* 🧩 Detalle técnico por módulo
* 🧪 Manual de pruebas
* 🧑‍💻 Convenciones de código
* 🖥 Instalación y ejecución local
* 👥 Integrantes del grupo
* 📝 Notas finales

## Objetivo del proyecto

El propósito de este trabajo integrador fue desarrollar una aplicación web moderna, dinámica y funcional, aplicando los conocimientos adquiridos a lo largo de la asignatura Programación Visual.

Nos planteamos construir una SPA (Single Page Application) utilizando React, que permita al usuario interactuar con productos obtenidos desde una API externa, integrando funcionalidades como marcado de favoritos, vistas detalladas y manejo eficiente del estado global.


Durante el desarrollo:

* Aplicamos conceptos clave de React como componentes, hooks y manejo de estado global.
* Implementamos rutas dinámicas con React Router DOM.
* Utilizamos herramientas modernas como Vite para desarrollo y Bootstrap para estilos.
* Respetamos buenas prácticas de código y modularización por features.
* El trabajo colaborativo en un entorno controlado con Git y GitHub.

## ⚙ Tecnologías utilizadas

* React (componentes funcionales y hooks como useEffect, useState, useParams)
* React Router DOM (navegación y rutas dinámicas)
* Fetch API (consumo de API externa)
* Vite (entorno de desarrollo y build optimizado)
* Bootstrap (estilos, grid, botones, responsividad)

## Estructura del proyecto

tp_integrador/
├── public/
│   ├── fondo.jpg
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── woman.png
│   ├── components/
│   │   ├── CarritoList.jsx
│   │   ├── FavoritosList.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.css
│   │   ├── Navbar.jsx
│   │   ├── ProductForm.css
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│   ├── pages/
│   │   ├── Carrito.jsx
│   │   ├── CrearProductos.jsx
│   │   ├── DetalleProductos.jsx
│   │   ├── EditarProductos.jsx
│   │   └── Favoritos.jsx
│   ├── style/
│   │   ├── Carrito.css
│   │   ├── DetalleProductos.css
│   │   ├── Favoritos.css
│   │   └── ProductList.css
│   ├── App.css
│   ├── App.jsx
│   ├── CarritoSlice.jsx
│   ├── FavoritosSlice.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── ProductsSlice.jsx
│   └── Store.jsx
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md

## Funcionalidades

* Página de inicio con cards de productos obtenidos desde una API externa.
* Visualización de imagen, nombre, precio, descripción y categoría.
* Marcado de productos como favoritos mediante icono o checkbox.
* Carrito de compras: permite agregar productos al carrito, ver el listado y eliminar productos del mismo.
* Navegación hacia una vista de detalle del producto.
* Página de favoritos con filtrado automático según estado global.
* Componente de formulario reutilizable para crear o editar productos (simulado en frontend).


## Detalle técnico por módulo

| Módulo     | Descripción                                                                                                                              |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Inicio     | Carga productos desde la API externa y renderiza en cards. Se permite marcar como favorito o ver detalle.                                 |
| Favoritos  | Filtra los productos marcados como favoritos y los muestra en una vista independiente.                                                   |
| Carrito    | Permite agregar productos al carrito, visualizar el listado de productos agregados y eliminarlos.                                        |
| Detalle    | Permite visualizar en detalle un producto individual, navegando por ID desde la URL.                                                     |
| Formulario | Utiliza un único componente para creación o edición, con campos dinámicos y validaciones mínimas.                                        |

## Manual de pruebas

| Componente | Prueba esperada                        | Método                        |
| :--------- | :------------------------------------- | :---------------------------- |
| Inicio     | Productos cargados desde la API        | Ver cards al iniciar app      |
| Favoritos  | Persistencia al marcar y desmarcar     | Verificación visual           |
| Carrito    | Agregar y eliminar productos del carrito | Agregar productos y verificar en la vista de carrito |
| Detalle    | Renderizado correcto por ID            | Ingreso desde botón Ver más   |
| Formulario | Renderizado dinámico de campos         | Crear/editar producto simulado |
| Redux      | Actualización de estado en tiempo real | Usar Redux DevTools           |


## Instalación y ejecución local

1.  Clonar el repositorio
    bash
    git clone [https://github.com/Darian-Balde/pv_tp_integrador_g16.git](https://github.com/Darian-Balde/pv_tp_integrador_g16.git)
    cd pv_tp_integrador_g16
    
2.  Instalar dependencias
    bash
    npm install
    
3.  Ejecutar en desarrollo
    bash
    npm run dev
    
4.  Acceder a la app desde el navegador
    
    http://localhost:5173

5.  Para acceder al contenido de esta página, es necesario registrarse e iniciar sesión

## Integrantes del grupo

| Nombre completo           | Nombre de usuario y enlace                                  |
| :--------------           | :----------------                                           |
| BALDELOMAR DARIAN         |  Darian-Balde (https://github.com/Darian-Balde)             |        
| SUILICE LUCA MAURICIO     |  MauricioSuilice19 (https://github.com/MauricioSuilice19)   |                          
| SURUGUAY JESUS IGNACIO    |  IgnacioJES (https://github.com/ignacioJES)                 |
| TEJERINA GUADALUPE ORIANA |  guadalupetejerina (https://github.com/guadalupetejerina)   |
| VALDEZ LARA MARIEL        |   LaraVldz (https://github.com/LaraVldz)                    |