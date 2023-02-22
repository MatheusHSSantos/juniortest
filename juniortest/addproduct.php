<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once 'connection.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);


if($dados){

  $query_product = "INSERT INTO products (productSku, productName, productPrice, productSize, productWeight, productHeight, productWidth, productLength)
   VALUES (:productSku, :productName, :productPrice, :productSize, :productWeight, :productHeight, :productWidth, :productLength)";
  $save_product = $conn->prepare($query_product);

  $save_product->bindParam(':productSku', $dados['product']['productSku'], PDO::PARAM_STR);
  $save_product->bindParam(':productName', $dados['product']['productName'], PDO::PARAM_STR);
  $save_product->bindParam(':productPrice', $dados['product']['productPrice']);
  $save_product->bindParam(':productSize', $dados['product']['productSize']);
  $save_product->bindParam(':productWeight', $dados['product']['productWeight']);
  $save_product->bindParam(':productHeight', $dados['product']['productHeight']);
  $save_product->bindParam(':productWidth', $dados['product']['productWidth']);
  $save_product->bindParam(':productLength', $dados['product']['productLength']);

  $save_product->execute();

  if($save_product->rowCount()){
    $response = [
        "erro" => false,
        "mensagem" => "Product saved!"
    ];
  }else{
    $response = [
        "erro" => true,
        "mensagem" => "Product not saved!"
    ];
  }

}else{
    $response = [
        "erro" => true,
        "mensagem" => "Product not saved!"
    ];
}

http_response_code(200);
echo json_encode($response);



