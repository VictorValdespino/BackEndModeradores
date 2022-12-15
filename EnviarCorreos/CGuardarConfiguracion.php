<?php
/*
SmartSoft
Componente: CGuardarConfiguracion.
Fecha de creacion: 10/10/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Guarda el contenido de los correos dentro del servidor.

Numero de metodos: 2
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

$vTipo = $_POST['tipo'];
$vAsunto = $_POST['asunto'];
$vCuerpo = $_POST['cuerpo'];

if (isset($vTipo) && isset($vAsunto) && isset($vCuerpo)) {
    switch ($vTipo) {
        case '1':
            mGuardar("NuevoRegistro.ini");
            break;
        case '2':
            mGuardar("NuevoRegistroEmergente.ini");
            break;
        case '3':
            mGuardar("NuevoRegistroConfirmado.ini");
            break;
        case '4':
            mGuardar("NuevoRegistroDenegado.ini");
            break;
        case '5':
            mGuardar("ModeradorSobrante.ini");
            break;
        case '6':
            mGuardar("ModeradorAsignado.ini");
            break;
        case '9'://Registro Coordinador
            mGuardar("RegistroCoordinador.ini");
            break;

        default:
            echo "{error: 'No existente'}";
            break;
    }
} else {
    echo "{error: 'Error de solicitud'}";
}

function mGuardar($vArchivo)
{
    try {
        global $vAsunto;
    global $vCuerpo;

    $vRutaArchivo = dirname(__FILE__) . "/InfoCorreos/";

    $vFile = fopen($vRutaArchivo . $vArchivo, "w");
    $vContenido = "[parameters]
Subject='" . $vAsunto . "';
Content='" . $vCuerpo . "';";

echo $vContenido;

    fwrite($vFile, $vContenido);
    fclose($vFile);
    echo "{estado: '200'}";
    } catch (\Throwable $th) {
        echo $th;
    }
}
