<?php

$host = "192.168.43.180";
$user = "root";
$pass = "";
$dbname = "juniortest";
$port = "3306";

$conn = new PDO("mysql:host=$host;port=$port;dbname=" . $dbname, $user, $pass);