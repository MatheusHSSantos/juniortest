<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'connection.php';

$query_products = "SELECT id ,productSku, productName, productPrice, productSize,productWeight, productHeight, productWidth, productLength FROM products ORDER BY id DESC";
$result_products = $conn->prepare($query_products);
$result_products->execute();

if(($result_products) AND ($result_products->rowCount() != 0)){
    while($row_product = $result_products->fetch(PDO::FETCH_ASSOC)){
      extract($row_product);

      $product_list["records"][$id] = [
        'id' => $id,
        'productSku' => $productSku,
        'productName' => $productName,
        'productPrice' => $productPrice,
        'productSize' => $productSize,
        'productWeight' => $productWeight,
        'productHeight' => $productHeight,
        'productWidth' => $productWidth,
        'productLength' => $productLength
      ];
    }

    http_response_code(200);

    echo json_encode($product_list);
}