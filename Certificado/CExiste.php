<?php
/*
SmartSoft
Componente: CExiste.
Fecha de creacion: 01/12/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Verifica si la plantilla de certificados existe dentro del servidor.

Numero de metodos: 2
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");

if (file_exists("./Plantilla.pdf")) {
    print_r(json_encode(array("status"=>200,"info"=>'true')));
}else{
    print_r(json_encode(array("status"=>200,"info"=>'false')));
}

