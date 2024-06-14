# Sistema gestor de meseros para un restaurante (Hosstess)

## Descripción
Hosstess es una innovadora aplicación web diseñada para optimizar la gestión de meseros en un restaurante. Utilizando un conjunto de tecnologías modernas y robustas como Vue.js para el frontend, Express.js para el backend y Amazon Web Services (AWS) para el alojamiento y servicios en la nube, Hosstess proporciona una solución integral y eficiente para la administración de tareas y personal en el entorno gastronómico.
(Proyecto de portafolio, se evita la venta o producción misma de este).

## Correr el programa
Ahora el proyecto funciona como mono repositorio. Por lo que, para correrlo, tienes que hacerlo TODO desde la raiz.

### Paso 1: Instalacion de dependencias
```bash
npm install
```
### Paso 2: Correr los scripts:
En el archivo package.json de la raiz, existen 3 comandos

> back:dev

> front:dev

> dev

Si quieres correr únicamente el backend, basta con realizar:
```bash
npm run back:dev
```

Si es el frontend únicamente:
```bash
npm run front:dev
```

Pero, si es ambas partes en conjunto:
```bash
npm run dev
```

## Todo se maneja desde la raiz ahora

### Notas extras
Si quieres agregar dependencias, paquetes, librerias, etc, a los directorios, se maneja desde la raiz de la siguiente manera:
```bash
npm install -workspace (frontend, backend) (dependencia)
```

Ejemplo
```bash
npm install -workspace frontend nodemon
```
Este comando instalara en las dependencias del frontend la libreria nodemon.

Tambien puedes acortar el anterior script de la siguiente forma:
```bash
npm install -w frontend nodemon
```
Funciona exactamente igual
