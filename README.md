## Guía para Levantar esta aplicación Gestor de documentos

Esta guía te mostrará cómo levantar la aplicación usando Docker que incluye una aplicación React, una aplicación Django REST Framework y una base de datos PostgreSQL utilizando Docker Compose.

## Requisitos Previos
Asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estructura de Directorios

```plaintext
gestor-documentos/
│
├── api/
│   └── (archivos de la aplicación Django)
│
├── app/
│   └── (archivos de la aplicación React)
│
├── gestordocumentosproject/
│   └── (archivos del projecto Django)
│ 
├── docker/
│   └── (archivos con imagenes de DOCKER)
│ 
├── django.sh
│  
├── docker-compose.yml
│  
├── manage.py
│  
├── README.md
│
└── requirements.txt
```

## Instrucciones para Levantar la Aplicación

Abre una terminal y navega hasta la carpeta raíz del proyecto.

Ejecuta el siguiente comando para construir y levantar los contenedores:

```
docker-compose up
```

Una vez que los contenedores estén en funcionamiento, puedes acceder a la aplicación React en 

    http://localhost:3000 
    
y a la API Django en

    http://localhost:8000/api/v1

Para detener los contenedores, puedes presionar Ctrl+C en la terminal donde se están ejecutando.

## Usuario de prueba

usuario: admin
clave: admin
