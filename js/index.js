$(document).ready(function() {
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
// playVideoOnScroll();

$("select").material_select();


//Funcion para Mostrar todas casas disponibles
$("#mostrarTodos").click(function(event) {
		event.preventDefault()
		$.ajax({
			url: 'http://192.168.64.2/Backend_Jonatan_Gonzalez/server/index.php',
			type: 'post',
			success: function(data) {
				$('.ContenidoPrincipal').html(data);
			},
			error: function(e) {
				alert(e);
			}
		})
	})

//Funcion para agregar las ciudades al selector

  $.ajax({
    url:'server/cityselector.php',
    method:"GET",
    data:{},
    success:function(data){
      var ciudades=JSON.parse(data);
        $("#selectCiudad").append("<option value='"+ciudades["0"]+"' selected>"+ciudades["0"]+"</option>");
        $("#selectCiudad").append("<option value='"+ciudades["1"]+"' selected>"+ciudades["1"]+"</option>");
        $("#selectCiudad").append("<option value='"+ciudades["2"]+"' selected>"+ciudades["2"]+"</option>");
        $("#selectCiudad").append("<option value='"+ciudades["4"]+"' selected>"+ciudades["4"]+"</option>");
        $("#selectCiudad").append("<option value='"+ciudades["7"]+"' selected>"+ciudades["7"]+"</option>");
        $("#selectCiudad").append("<option value='"+ciudades["10"]+"' selected>"+ciudades["10"]+"</option>");
        $('select').material_select();
    },
    error: function(e) {
      console.log("Hay un error");
    }
  })


  //Funcion para agregar los Tipos de casas al selector

    $.ajax({
      url:'server/typeselector.php',
      method:"GET",
      data:{},
      success:function(data){
        var tipos=JSON.parse(data);
          $("#selectTipo").append("<option value='"+tipos["0"]+"' selected>"+tipos["0"]+"</option>");
          $("#selectTipo").append("<option value='"+tipos["1"]+"' selected>"+tipos["1"]+"</option>");
          $("#selectTipo").append("<option value='"+tipos["7"]+"' selected>"+tipos["7"]+"</option>");
          $('select').material_select();
      },
      error: function(e) {
        console.log("Hay un error");
      }
    })



});


//Funcion para buscar por Ciudades

function filtrar() {
  var precio = $("#rangoPrecio").val().split(";");
  $.ajax({
    url:'./server/buscador.php',
    type: 'POST',
    data: {
      ciudad: $('#selectCiudad').val(),
      tipo: $('#selectTipo').val(),
      precioMin: precio[0],
      precioMax: precio[1]
    },
    dataType: 'json',
    success: function (result){
      console.log(result);
      $('.ContenidoPrincipal').html('');
        var ul = $('<ul>');
        result.forEach(function (currentValue) {
            var li = $('<li class= "card horizontal">');
            var div = $('<div class="row">');
            var divImg = $('<div class="col m5 card-image">')
            var img = $('<img/>', {'src' : 'img/home.jpg','width' : '100%','alt' : 'casa'});
            var divCont = $('<div class="col m7 card-content">')
            var d = $('<p>').html("<b>Direccion: </b>"+currentValue.Direccion);
            var c = $('<p>').html("<b>Ciudad: </b>"+currentValue.Ciudad);
            var t = $('<p>').html("<b>Telefono: </b>"+currentValue.Telefono);
            var cp = $('<p>').html("<b>Codigo Postal: </b>"+currentValue.Codigo_Postal);
            var ti = $('<p>').html("<b>Tipo de Casa: </b>"+currentValue.Tipo);
            var p = $('<p>').html("<b>Precio: </b>");
            var h4 = $('<h4 class="yellow-text text-darken-1">').html(currentValue.Precio);
            var pf = $('<p class="right-align">').html("VER MAS");
            img.appendTo(divImg);
            d.appendTo(divCont);
            c.appendTo(divCont);
            t.appendTo(divCont);
            cp.appendTo(divCont);
            ti.appendTo(divCont);
            h4.appendTo(p);
            p.appendTo(divCont);
            pf.appendTo(divCont);

            divImg.appendTo(div);
            divCont.appendTo(div);
            div.appendTo(li);
            li.appendTo(ul);
          });
        ul.appendTo($('.ContenidoPrincipal'));
    }
  })
}
