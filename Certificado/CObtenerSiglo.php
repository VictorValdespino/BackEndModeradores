<?php
/*
SmartSoft
Componente: CGuardarSiglo.
Fecha de creacion: 08/12/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Guarda el siglo enviado por el front-end para ser usado en los certificados

Numero de metodos: 1
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000" || $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");



mMostrar("Siglo.ini");

function mMostrar($vArchivo)
{
    try {
        $data = array(
            'estado' => '200',
            'info' => strtoupper(parse_ini_file(__DIR__ . "/Siglo.ini")["Siglo"])
        );
        echo json_encode($data);
    } catch (\Throwable $th) {
        echo $th;
    }
}
