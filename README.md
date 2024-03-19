
# Prueba técnica


## Introducción

Esta aplicación es un proyecto diseñado con la finalidad de medir mis conocimientos técnicos en la arquitectura Cells, desarrollada por el banco BBVA, y en Lit Element. Siguiendo los lineamientos proporcionados, he creado esta aplicación con el objetivo de demostrar mi capacidad para aplicar los principios de diseño y desarrollo recomendados por Cells y Lit Element en un entorno práctico.

Cells es un marco de trabajo arquitectónico desarrollado por el banco BBVA que proporciona una serie de prácticas recomendadas y herramientas para la construcción de aplicaciones web modulares y escalables. Lit Element, por otro lado, es una biblioteca JavaScript para crear interfaces de usuario web reutilizables y componentes web personalizados utilizando Web Components.

En este proyecto, he aplicado los conceptos aprendidos sobre Cells y Lit Element para desarrollar una aplicación que cumpla con los requisitos especificados, manteniendo una arquitectura modular y siguiendo las mejores prácticas de diseño y desarrollo recomendadas por ambas tecnologías. La aplicación se centra en [breve descripción de la funcionalidad principal de la aplicación]..

  

## Requisitos

-   **Node.js v16.20.2**: Asegúrate de tener instalada esta versión de Node.js.
    
-   **Cells Framework (última versión)**: Utilizamos Cells Framework para [explicación breve de por qué se utiliza].
    
-   **JSON Server**: Se requiere JSON Server para levantar el mock de la API.
  



## Instalación

Para instalar la aplicación "meraki" y configurar el mock de la API, sigue estos pasos:

1.  **Clonar el Repositorio:** Clona este repositorio en tu máquina local utilizando el siguiente comando:

    `git clone https://github.com/AndresBojaca/meraki-cells-test.git` 
    
2.  **Navegar a la Carpeta de la Aplicación:** Accede a la carpeta de la aplicación "meraki" ejecutando el siguiente comando:

    `cd meraki-cells-test/meraki` 
    
3.  **Instalar Dependencias:** Una vez dentro de la carpeta de la aplicación, ejecuta el siguiente comando para instalar las dependencias:
    
    `npm install` 
    
4.  **Instalar JSON Server:** Si aún no has instalado JSON Server, puedes hacerlo globalmente utilizando el siguiente comando:

    `npm install -g json-server` 
    
5.  **Levantar el Mock de la API:** Después de instalar JSON Server, inicia el mock de la API con el siguiente comando:
    
    `json-server -w accionistas.json -p 3002` 
    
    Esto iniciará JSON Server y servirá los datos del archivo `accionistas.json` en el puerto 3002.
    
6.  **Iniciar la Aplicación:** Finalmente, puedes iniciar la aplicación con el siguiente comando:
    
    `cells app:serve -c "dev.js"; ` 
    
    Esto iniciará el servidor de la aplicación y podrás acceder a ella en tu navegador web utilizando la URL http://localhost:8001/dist/.
    

----------

Estos pasos actualizados guiarán a los usuarios a través del proceso de instalación de la aplicación "meraki" en tu repositorio, incluida la configuración del mock de la API utilizando JSON Server. Si tienes alguna pregunta adicional o necesitas más ayuda, no dudes en decirme.