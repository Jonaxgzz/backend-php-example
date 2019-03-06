

<?php

$city = $_POST["ciudad"];
$filtered_houses = array();

foreach ( $products as $product ) {

  if ($city !== $product["Ciudad"] ){
    continue;
  }

  array_push ( $filtered_houses, $product );

}

echo json_encode( $products );

die();
