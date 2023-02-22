<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'connection.php';

$sku = filter_input(INPUT_GET, "sku", FILTER_DEFAULT);
var_dump($sku);

$response = "";

    $query_product = "DELETE  FROM products WHERE productSku=:sku";
    $delete_product = $conn->prepare($query_product);
    $delete_product->bindParam(':sku', $sku);

    if ($delete_product->execute()) {
        $response = [
            "erro" => false,
            "mensagem" => "Product deleted! $sku"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "Product not deleted! "
        ];
    }


http_response_code(200);
echo json_encode($response);