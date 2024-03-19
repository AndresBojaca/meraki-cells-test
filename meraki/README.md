¿De qué se trata este proyecto?
Este proyecto tiene como objetivo ser una aplicación de ejemplo que muestra las capacidades de la Plataforma, así como un proyecto/base inicial para tu proyecto, y una guía rápida sobre cómo construir aplicaciones con la Plataforma Cells.

¿Qué contiene?
Muestra una aplicación de ejemplo funcional construida con LitElement y páginas declarativas, utilizando nuestra última pila tecnológica (Cells Cli 4.0 & Cells Bridge), y cubre: internacionalización de la aplicación, publicación/suscripción de datos entre páginas, enrutamiento, gestores de datos (¡imitando un servicio real!), ¡y mucho más!

Construido íntegramente con componentes del Catálogo Cells - BBVA Experience & Cells Architecture.

Si la aplicación se creó con la opción e2e, tendrá una estructura para pruebas e2e con Cells Pepino V2 (WebdriverIO 6.0) y el Marco de Pruebas Global QE, que servirá como punto de partida para tus requisitos y casos de uso personalizados.

Para profundizar, consulta nuestra Documentación de la Plataforma.

CELLS (cells-cli)
cells-cli es la herramienta de línea de comandos que te proporciona tareas y comandos comunes para trabajar en un proyecto cells.

Instalación
Para instalar la aplicación, simplemente ejecuta:

sh
Copy code
npm -g install @cells/cells-cli
Una vez instalado, el comando cells estará disponible para ti.

Uso
Iniciando la aplicación en modo de desarrollo
r
Copy code
$ cells app:serve -c dev.js
Iniciando la aplicación en modo de producción
r
Copy code
$ cells app:serve -c dev.js -b
<a name="e2e"></a>Pruebas e2e
Si deseas ejecutar pruebas e2e con Cells Pepino V2, debes instalarlo. Ve a la carpeta test/e2e, instala las dependencias y luego ejecútalo desde la raíz de tu proyecto e2e.

Instalación (dentro de tu proyecto de prueba e2e)
yarn
Ejecución (desde la raíz de tu proyecto e2e)
./node_modules/@cells-pepino/cli/bin/cli.js -c ./config/wdio5.local.conf.js
o simplemente, a través del script npm proporcionado en el proyecto scaffold e2e:

npm run test
Sigue la documentación proporcionada y el archivo README.md del proyecto e2e para obtener más información sobre cómo hacerlo (el archivo se encuentra en la carpeta test/e2e).

Si vas a ejecutar tus pruebas e2e contra una aplicación local (la estás alojando en tu espacio de trabajo local), recuerda servirla primero - de lo contrario, el corredor de pruebas e2e no podrá ejecutar las pruebas contra ella - Consulta más información sobre el comando cells app:serve arriba.

¡RECUERDA! Debes instalar primero todas las dependencias npm requeridas dentro de tu proyecto E2E

yarn
Parámetros:

url: url para las pruebas. Requerido
config_file: archivo de configuración JavaScript. Esta configuración debe existir en la ruta ./app/config/{environment}.js. Requerido.
ADVERTENCIA:

Para ejecutar la prueba debes moverte a una carpeta de proyecto e2e. Puedes crearlo respondiendo 'Y' a la pregunta
¿Quieres que se cree un proyecto E2E? (Y/n) en el proceso de creación de la aplicación.
Consulta cells app:create --help.