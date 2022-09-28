# koibanx-frontend-challenge
[DEPLOY EN GITHUB PAGES](https://guzhiregem.github.io/koibanx-frontend-challenge/)
(no conectado a API)
## Iniciar:
```
  > npm i
  > npm start
```
Configuraciones disponibles en archivo *.env* :
|config|default|desc|
|-|-|-|
|PORT|5000|Puerto de la app
REACT_APP_HOST_URL|http://0.0.0.0:3000|URL de la API
REACT_APP_USE_AUTH|1|Bool(1 o 0) para definir si se usa autenticacion en la API, en caso de que si, la autenticacion seria BasicAuth con las siguientes variables
REACT_APP_AUTH_USER|test@koibanx.com|BasicAuth username
REACT_APP_AUTH_PASS|admin|BasicAuth password

## Aclaraciones:
- las configuraciones por defecto estan colocadas de manera que la app pueda ser usada en conjunto con [koibanx-backend-challenge](https://github.com/GuzhiRegem/koibanx-backend-challenge).
- para ordenar los resultados clickear el header corresponiente en la tabla.
- la busqueda con el filtro de ID es exacta por las limitaciones de mongoose en la API, el resto de filtros cuentan con busqueda por similitud.
- cada filtro tiene que activarse para ser aplicado (izquierda).
- al realizar una busqueda la url generada se imprime en la consola.
