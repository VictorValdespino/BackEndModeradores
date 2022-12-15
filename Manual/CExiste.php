<?php
/*
SmartSoft
Componente: CExiste.
Fecha de creacion: 03/11/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Verifica si existe el manual de moderacion dentro del servidor.

Numero de metodos: 1
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");

if (file_exists("./Manual.pdf")) {
    print_r(json_encode(array("status"=>200,"info"=>'true')));
}else{
    print_r(json_encode(array("status"=>200,"info"=>'false')));
}

