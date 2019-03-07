<?php

$data = file_get_contents("data-1.json");
$products = json_decode($data, true);

$buscarCiudad = $_POST["ciudad"];
$buscarTipo = $_POST["tipo"];
$buscarPrecioMin = $_POST["precioMin"];
$buscarPrecioMax = $_POST["precioMax"];

$filtered_houses = array();

foreach ( $products as $product ) {
  if ($buscarCiudad !== $product["Ciudad"]){
    continue;
  }
  if ($buscarTipo !== $product["Tipo"] ){
    continue;
  }
  if ("$".$buscarPrecioMin > $product["Precio"] ){
    continue;
  }
  if ("$".$buscarPrecioMax < $product["Precio"] ){
    continue;
  }

  array_push ( $filtered_houses, $product );

}


echo json_encode( $filtered_houses );


die();









 ?>
