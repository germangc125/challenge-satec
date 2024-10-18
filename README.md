Ejecutar

1. - Para inicializar el proyecto debemos descargar el codigo. 
  git clone https://github.com/germangc125/challenge-satec.git
- Ingresar a la carpeta app/ y ejecutar el comando npm npm install --force ->  el --force por que hay librerias aun no migradas a angular 17 sin embargo funcionan sin problema como lo son: 
  * @developer-partners/ngx-modal-dialog 
  * ngx-toastr
- Ejecutar ng serve 

2. Se creo dos apis uno para obtener las plantas y otro api para obtener las salas, cada sala tiene asociado el id de la planta.
el api esta en:  https://apimocha.com/room-manager
y tiene 5 endpoints:
  - Para obtener las plantas GET 	/plants
  - Para obtener las salas GET 	/rooms
  - Para crear una sala POST /rooms
  - para actualizar una sala PUT /rooms/1
  - para eliminar DELETE 	/rooms/1


  Este proyecto usa interceptores, servicios, componentes, entre otros, se considera que el api ya trae los datos procesados.
  Para el responsive se ha usado bootstrap.


  3. Dificultades - Uso de apimocha para actualizar/eliminar



