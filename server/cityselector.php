<?php

$data = file_get_contents("data-1.json");
$products = json_decode($data, true);
$ciudades = array();

foreach ( $products as $product ) {
  array_push ( $ciudades, $product["Ciudad"] );
  }
$ciudades_disponibles = array_unique($ciudades);

echo json_encode($ciudades_disponibles);

?>
