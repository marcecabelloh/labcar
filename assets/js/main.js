
// función que permite generar el mapa y trazar las rutas de inicio y termino
function initMap(){
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5, 
    center: {lat: -9.1191427, lng: -77.0349046},
    mapTypeControl: false,
    zoomControl: false, 
    streetViewControl: false
  });

  
  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }
  addEventListener("load", buscar);//enlazo el boton ruta con su id para que al hacer click el boton ejecute la ruta
  var latitud,longitud;

  //se obtiene latitud o longitud
  var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map,
    });

    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }

 
  var funcionError = function(error){
    alert("Tenemos un problema con encontrar tu ubicación");
  }

  //Librería gmps.
  //Librería gmps necesaria para que los input reconozcan lugares al momento de tipear
  var inputOrigen =(document.getElementById("start"));    
  var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
  autocompleteOrigen.bindTo('bounds', map);

  var inputDestino = document.getElementById("end");
  var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
  autocompleteDestino.bindTo('bounds', map);


  //expresa coordenadas
  //var que ubican el espacio y el lugar en donde estamos y a donde nos dirigimos
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true}); 
  directionsDisplay.setMap(map);

  //al igual que var directionService y Display fue sacada de la documentacion
  //https://developers.google.com/maps/documentation/javascript/examples/directions-simple?hl=es-419
  //esto se llama Direction services, acá llama a los id de mis inputs
  var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
 
  document.getElementById("start").addEventListener('change', onChangeHandler);
  document.getElementById("end").addEventListener('change', onChangeHandler);



  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById("start").value,
            destination: document.getElementById("end").value,
            travelMode: 'DRIVING'
        },  
        function(response, status) {
             if (status === 'OK') {
                document.getElementById("ruta").addEventListener("click", function(){
                directionsDisplay.setDirections(response);
            })
              }
         });
    }
}

//MAPA FUNCIONA. HAY QUE DARLE DOS CLICK Y NO HAY PROBLEMA- A VECES SE QUEDA PEGADO, PERO FUNCIONA