
# Proyecto 3 - Mail :exclamation:

Este proyecto tiene como objetivo desarrollar el frontend para un cliente de correo electrónico que utiliza llamadas API para enviar y recibir correos.

## Función para enviar correos

La implementación de la función para enviar correos se realizó en el archivo `inbox.js`. Se tomó como referencia la documentación proporcionada para construir el cuerpo de la llamada a la API. Esta función maneja tanto el caso de éxito como el caso de error de la petición.

## Función Mailbox()

Esta función se encarga de desplegar en pantalla el buzón seleccionado por el usuario. Dentro de esta función se realizan las siguientes acciones:

- Aseguramos que se despliegue en pantalla el bloque adecuado.
- Definimos estilos según nuestra preferencia.
- Realizamos una petición que se encargará de desplegar el buzón indicado y definir cómo se verá nuestra estructura HTML interna.
- Verificamos los estados del correo y definimos el evento `click` que nos permitirá redirigirnos al correo electrónico seleccionado.

## Función VER_EMAIL()

Esta función contiene los componentes que nos permiten ver el contenido del correo, archivar y desarchivar un correo, responder y actualizar su estado de lectura. Todo se realiza dentro de la misma petición.

- **Ver cuerpo del correo**: Decidí construir el cuerpo de los correos con tarjetas de Bootstrap, lo que me permitió desplegar mi información de manera estética y ordenada. Además, desplegué una función que cambiará según el estado del correo.
- **Archivar y desarchivar**: Implementé un par de botones que cubren cada una de estas funciones. Mediante el uso del operador ternario, creé una condición simple que nos permite definir si un botón se va a ocultar o mostrar.
- **Responder**: Definí el evento click del botón de respuesta, en el cual desplegaremos el bloque `Compose()` y luego verificaremos si este correo ya era una respuesta. También se rellenarán automáticamente los campos especificados si el usuario decide responder a un correo determinado.
- **Actualizar estado**: La lógica de esto se basa en una pequeña comprobación que verifica si el correo ya fue leído y si no es así, haremos uso de una llamada a la API que nos permita actualizar el estado de este cambio por medio del método `PUT`.
***En esta funcion se llevo a cabo***
-> El manejo en caso del exito de la peticion
-> El manejo del caso de error de esta misma

## Mailbox()
Funcion encargada de desplegar en pantalla el mailbox adecuado y/o seleccionado por el usuario.

***En esta funcion se llevo a cabo***
-> Nos aseguramos de desplegar en pantalla el bloque adecuado
-> Definimos estilos segun nuestra preferencia
-> Partiendo de las referencias brindadas, damos lugar a nuestra peticion, la cual, se va encargar de desplegar el mailbox indicado, definir como se vera nuestra estructura HTML interna.
-> Verificar los estados del correo y a su vez defininimos el evento  ***click*** que nos permitira redirigirnos al email seleccionado. 

## VER_EMAIL()
Dentro de esta funcion se encuentran los componentes que nos permiten ver el contenido del email, archivar y desarchivar un email, responder y actualizar su estado leido.
***Todo se realiza dentro de la misma peticion***

-> Ver cuerpo del email: En base a las pisas brindadas de como agregar contenido a elementos HTML, decidi que el cuerpo de estos se construyan con cards de bootstrap, esto me permitio desplegar mi informacion de manera estetica y ordenada, ademas de desplegar una funcion que voy a desplegar segun el estado del correo.

-> Archivar y desarchivar: Se implementaron 1 par de botones que nos permitian cubrir cada uno de estas funciones en especifico, mediante el uso del operador ternario se creo una condicion simple que nos permite definir si un boton se va ocultar o mostrar.

-> Responder: Se define el evento click del boton de respuesta, en el cual desplegaremos el bloque *** Compose() *** y luego verificaremos si este email ya era una respuesta. Tambien se rellenaran automaticamente los campos especificados si el usuario decide responder a determinado mail.

-> Actualizar estado: La logica de esto se basa en una pequeña comprobacion qye verifica si el correo ya fue leido y si no es asi, haremos uso de una llamada a la API que nos permita actualizar el estado de este cambio por medio del metodo ***PUT***.


