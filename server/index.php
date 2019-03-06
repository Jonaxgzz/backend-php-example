<?php

$data = file_get_contents("data-1.json");
$products = json_decode($data, true);

// var_dump('<pre>');
// foreach ($products as $product) {
//     var_dump($product);
// }
// var_dump('</pre>');

// echo json_encode($products);


?>

<ul>
<?php foreach($products as $product) : ?>

  <li class= "card horizontal">
    <div class="row ">
      <div class="col m5 card-image">
        <img src="img/home.jpg" width="100%" alt="casa">
      </div>
      <div class="col m7 card-content">
        <p><b>Direccion: </b><?php echo $product["Direccion"]; ?></p>
        <p><b>Ciudad: </b><?php echo $product["Ciudad"]; ?></p>
        <p><b>Telefono: </b><?php echo $product["Telefono"]; ?></p>
        <p><b>Codigo Postal: </b><?php echo $product["Codigo_Postal"]; ?></p>
        <p><b>Tipo: </b><?php echo $product["Tipo"]; ?></p>
        <p><b>Precio: </b><h4 class="yellow-text text-darken-1"><?php echo $product["Precio"]; ?></h4></p>
        <p class="right-align">VER MAS</p>
      </div>
    </div>
  </li>

<?php endforeach; ?>
</ul>
