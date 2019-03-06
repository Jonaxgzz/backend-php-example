<?php

$data = file_get_contents("data-1.json");
$products = json_decode($data, true);
$tipos = array();

foreach ( $products as $product ) {
  array_push ( $tipos, $product["Tipo"] );
  }
$tipos_disponibles = array_unique($tipos);

echo json_encode($tipos_disponibles);

?>
