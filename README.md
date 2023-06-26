# FrontEnd IntegraS3-ChatGPT
Es un chat para ayuda a los usuarios que tengan dudas sobre los modulos de integraS3
## Tecnologías utilizadas 🛠️
1. Framework QUASAR.
2. Vue 3 composition API.
3. NodeJS
4. TypeScript

## Comenzando 🚀
En el FrontEnd, se basa en dos secciones:
1. La sección del chat para los usuarios.
2. La sección de administración, que se encarga de cargar la información tanto el archivo txt y su logo.

## Sección administración
1. Para accesar en la sección de administracion, simplemente damos clic en accesar, en el sitio principal del chat
   ![imagen](https://github.com/BeerC0d3/FrontEnd-Integras3-ChatGPT/assets/117471209/810a7f1a-33d2-44fa-9ae0-c1925c7e76f4)
2. sera redirigido a la pantalla de login, con las siguientes credenciales:
   Usuario: integras3@lennken.com
   Pwd: Passw0rd
   
![imagen](https://github.com/BeerC0d3/FrontEnd-Integras3-ChatGPT/assets/117471209/7b8a18dc-e4c4-4348-9e60-7c03fa3d6411)

3. Al ingresar usuario y password, se reenviara a la administración, donde se carga el archivo y el logo de cada modulo.
   
![imagen](https://github.com/BeerC0d3/FrontEnd-Integras3-ChatGPT/assets/117471209/06dfa68c-3e88-4c4d-b2ea-fff4855d10c4)

## Sección chat
1. Al abrir o cargar la aplicación web, al inicio nos indica con que modulo deseamos realizar preguntas, podemos dar clic en uno de ellos. 

![imagen](https://github.com/BeerC0d3/FrontEnd-Integras3-ChatGPT/assets/117471209/4a67f218-76ac-4df6-845f-16b6fb304b5c)

2. Al dar clic en algunos de los modulos, empezara a cargar el contexto, y ensenguida ya podremos escribir preguntas.
   ![imagen](https://github.com/BeerC0d3/FrontEnd-Integras3-ChatGPT/assets/117471209/c62b7ac5-f01c-4063-ae75-6d452bfe9668)



# API IntegraS3-ChatGPT
Es una API expuesta para realizar peticiones del chat para ayuda a los usuarios que tengan dudas sobre los modulos de integraS3.

## /api/ContextoSoporte
### ChatSetup
Permite inicializar un chat considerando un contexto especifico, segun el tema indicado.

#### JSON de Entrada
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
    <tr><td>conversationId</td><td>Guid</td><td>Identificador de la nueva conversacion a inicializar</td></tr>
    <tr><td>contextId</td><td>Int</td><td>Identificador del contexto a usar en la conversacion, se provee de un catalogo el cual debe de estar previamente configurado</td></tr>
  </tbody></table>
	
#### JSON de Salida
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
    <tr><td>conversationId</td><td>Guid</td><td>Identificador de la nueva conversacion inicializada</td></tr>
    <tr><td>contextId</td><td>Int</td><td>Identificador del contexto a usar en la conversacion, se provee de un catalogo el cual debe de estar previamente configurado</td></tr>
    <tr><td>message</td><td>String</td><td>Mensaje en caso de haber tener error durante la inicializacion</td></tr>
  </tbody></table>
	
### Chat
Permite realizar una serie de preguntas de un chat considerando el contexto especificado con apoyo de ChatSetup.

#### JSON de Entrada
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
    <tr><td>conversationId</td><td>Guid</td><td>Identificador de la conversacion inicializada</td></tr>
    <tr><td>contextId</td><td>Int</td><td>Identificador del contexto a usar en la conversacion, se provee de un catalogo el cual debe de estar previamente configurado</td></tr>
    <tr><td>message</td><td>String</td><td>Pregunta realizada en el chat para que IA la procese con apoyo del contexto indicado</td></tr>
  </tbody></table>

#### JSON de Salida
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>id</td><td>Int</td><td>Identificador de la respuesta obtenida</td></tr>
    <tr><td>conversationId</td><td>Guid</td><td>Identificador de la conversacion inicializada</td></tr>    
    <tr><td>choices</td><td>Object</td><td>Objeto que contiene la respuesa de IA</td></tr>
		<tr><td>choices[0].message.content</td><td>String</td><td>Elemento que contiene la respuesta a la pregunta realizada</td></tr>
  </tbody></table>

### GetParents
Permite obtener el listado de todos los contextos guardados.

#### JSON de Entrada
No Aplica

#### JSON de Salida
Lista de
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>id</td><td>Int</td><td>Identificador del contexto</td></tr>
    <tr><td>name</td><td>String</td><td>Nombre del Contexto</td></tr>    
    <tr><td>logo</td><td>String</td><td>Ruta del logotipo</td></tr>
		<tr><td>file</td><td>String</td><td>Ruta del contexto</td></tr>
		<tr><td>contextSupportChildren</td><td>List</td><td>Listado de elementos con la misma estructura (id, name, logo, file, contextSupportChildren), en caso de que el contexto actual contenga contextos hijos</td></tr>
  </tbody></table>

### GetByParentId
Permite obtener un contexto especifico dentro de todos los contextos guardados.

#### JSON de Entrada
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
    <tr><td>parentId</td><td>Int</td><td>Identificador dedel contexto a buscar</td></tr>    
  </tbody></table>

#### JSON de Salida
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>id</td><td>Int</td><td>Identificador del contexto</td></tr>
    <tr><td>name</td><td>String</td><td>Nombre del Contexto</td></tr>    
    <tr><td>logo</td><td>String</td><td>Ruta del logotipo</td></tr>
		<tr><td>file</td><td>String</td><td>Ruta del contexto</td></tr>
  </tbody></table>

### GetAll
Permite obtener el listado de todos los contextos guardados.

#### JSON de Entrada
No Aplica

#### JSON de Salida
Lista de
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>id</td><td>Int</td><td>Identificador del contexto</td></tr>
    <tr><td>name</td><td>String</td><td>Nombre del Contexto</td></tr>    
    <tr><td>logo</td><td>String</td><td>Ruta del logotipo</td></tr>
		<tr><td>file</td><td>String</td><td>Ruta del contexto</td></tr>
		<tr><td>contextSupportChildren</td><td>List</td><td>Listado de elementos con la misma estructura (id, name, logo, file, contextSupportChildren), en caso de que el contexto actual contenga contextos hijos</td></tr>
  </tbody></table>

### GetById
Permite obtener un contexto especifico dentro de todos los contextos guardados.

#### JSON de Entrada
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
    <tr><td>id</td><td>Int</td><td>Identificador dedel contexto a buscar</td></tr>    
  </tbody></table>

#### JSON de Salida
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>id</td><td>Int</td><td>Identificador del contexto</td></tr>
    <tr><td>name</td><td>String</td><td>Nombre del Contexto</td></tr>    
    <tr><td>logo</td><td>String</td><td>Ruta del logotipo</td></tr>
		<tr><td>file</td><td>String</td><td>Ruta del contexto</td></tr>
  </tbody></table>

### Update
Permite realizar la actualizacion de un contexto especifico, la API no ofrece la creacion de contextos, ya que esta configuracion debe de estar precargada.

#### JSON de Entrada
<table>
  <thead><tr><th>Parametro</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>id</td><td>Int</td><td>Identificador del contexto a actualizar</td></tr>
    <tr><td>name</td><td>String</td><td>Nombre del Contexto</td></tr>    
    <tr><td>logo</td><td>String</td><td>En caso de requerir agregar/actualizar el logotipo debera de pasar el archivo en Base64 con extension jpg</td></tr>
		<tr><td>file</td><td>String</td><td>En caso de requerir agregar/actualizar el contexto debera de pasar el archivo en Base64 con extension txt</td></tr>
    <tr><td>nameLogo</td><td>String</td><td>En caso de requerir agregar/actualizar el logotipo debera de pasar el nombre del archivo</td></tr>
		<tr><td>nameFile</td><td>String</td><td>En caso de requerir agregar/actualizar el contexto debera de pasar el nombre del archivo</td></tr>
  </tbody></table>

#### Salida
<table>
  <thead><tr><th>Status Code</th><th>Tipo</th><th>Descripcion</th></tr></thead>
  <tbody>
		<tr><td>200</td><td>Int</td><td>En caso de haber realizado la actualizacion de forma correcta</td></tr>
    <tr><td>400</td><td>Int</td><td>En caso de haber realizado la peticion de forma incorrecta</td></tr>
  </tbody></table> 
