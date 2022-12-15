<?php
/*
SmartSoft
Componente: CGuardar.
Fecha de creacion: 03/11/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Se creo el script para poder guardar el manual de calidad

Numero de metodos: 1
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

$vManual=$_FILES["manual"];
if (move_uploaded_file($vManual['tmp_name'],"./Manual.pdf")) {
    print_r(json_encode(array("status"=>200,"info"=>'Se guardo correctamente el manual')));
}else{
    print_r(json_encode(array("status"=>500,"info"=>'No se guardo correctamente el manual')));
}

