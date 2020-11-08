# RateCartoonApp

Este proyecto es generado con  [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0, emplando SASS y empaquetando la aplicación mediante webpack.

A continuación explicaré las diferentes formas como podemos observar la aplicación desarrollada, tanto desde un entorno local como uno productivo (GitPages)

### Tabla de contenido
 * [Servidor de desarrollo](#Servidor%20de%20Desarrollo)
 * [Construcción y Despliegue ](#Construcción)



## Servidor de Desarrollo

Ejecutar `ng serve --proxy-config proxy.conf.json` el proxy se debió configurar para poder acceder a los recursos de la API solicitada, ya que este genera un error de CORS, ya que se genera un consumo de recursos de origenes cruzados, el servidor se depliega localmente en: `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

Si usamos esta opción como despliegue es necesario acceder al archivo `cartoon.service.ts` y habilitar la URL comentada que permite el uso del proxy local (linea 35).

## Construcción

Ejecutar `ng build --base-href ./ --prod`, Angular compila todos los archivos en extensiones conocidas por un navegador y las aloja en la carpera `dist/ratecartoon`, con una base-href en ./, luego ejecutamos `npx ngh --dir=dist/rate-cartoon-app/` con el fin de hacer un despliegue web dentro de mi repositorio de git usando **GitPages** 
de esta manera podemos consultar `https://yhyenifer.github.io/ratecartoon` para ver la aplicación en un entorno productivo

**_Nota importante_**
Como la **API** que se está consumiendo presenta problemas de restricción de acceso a sus recursos, para que desde gitpage funcione, debemos tener instalada y activa la extensión de Google Chrome llamada _Allow CORS: Access-Control-Allow-Origin_, aquí dejo URL para que la puedan instalar **_https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=es_**

### Otra forma de desplegar rel proyecto

Pueden acceder a la carpeta `dist/rate-cartoon-app` mediante consola e instalar `npm install -g static-server` (se debe contar con **nodejs** instalado), y luego ejecutamos `static-server`, esto nos proporciona una URL local donde estará la app desplegada (se debe activar la extensión anteriormente mencionada).
