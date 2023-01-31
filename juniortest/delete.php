<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'connection.php';

$id = filter_input(INPUT_GET, "id", FILTER_DEFAULT);
var_dump($id);

$response = "";

    $query_product = "DELETE  FROM products WHERE id=:id";
    $delete_product = $conn->prepare($query_product);
    $delete_product->bindParam(':id', $id);

    if ($delete_product->execute()) {
        $response = [
            "erro" => false,
            "mensagem" => "Product deleted! $id"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "Product not deleted! "
        ];
    }


http_response_code(200);
echo json_encode($response);