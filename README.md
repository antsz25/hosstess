# minuta

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
