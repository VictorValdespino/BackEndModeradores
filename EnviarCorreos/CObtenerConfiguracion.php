<?php
/*
SmartSoft
Componente: CObtenerConfiguracion.
Fecha de creacion: 10/10/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Obtiene el contenido de los correos y es enviado a front-end

Numero de metodos: 1
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");

$vTipo = $_GET['tipo'];

if (isset($vTipo)) {

    switch ($vTipo) {
        case '1': //Nuevo registro por el moderador
            $vInfoCorreo = parse_ini_file("InfoCorreos/NuevoRegistro.ini");
            break;
        case '2': //Nuevo registro emergente
            $vInfoCorreo = parse_ini_file("InfoCorreos/NuevoRegistroEmergente.ini");
            break;
        case '3': //nuevo registro confirmado
            $vInfoCorreo = parse_ini_file("InfoCorreos/NuevoRegistroConfirmado.ini");
            break;
        case '4': //uevo registro denegado
            $vInfoCorreo = parse_ini_file("InfoCorreos/NuevoRegistroDenegado.ini");
            break;
        case '5': //Moderador sobrante
            $vInfoCorreo = parse_ini_file("InfoCorreos/ModeradorSobrante.ini");
            break;
        case '6': //Moderador asigado
            $vInfoCorreo = parse_ini_file("InfoCorreos/ModeradorAsignado.ini");
            break;
        case '7': //Reconocimiento del moderador
            #mCrearArchivo();
            $vInfoCorreo = parse_ini_file("InfoCorreos/ModeradorReconocimiento.ini");
            break;
        case '8': //Recuperar contraseña
            $vMailTmp = "example@exam.ex";
            $vPasswodTmp = "1234";
            $vInfoCorreo = parse_ini_file("InfoCorreos/RecuperarContraseña.ini");
            $vInfoCorreo["Content"] = str_replace("{mail}", $vMailTmp, $vInfoCorreo["Content"]);
            $vInfoCorreo["Content"] = str_replace("{passwod}", $vPasswodTmp, $vInfoCorreo["Content"]);
            break;
        case '9': //Registro Coordinador
            $vInfoCorreo = parse_ini_file("InfoCorreos/RegistroCoordinador.ini");
            break;
        default:
            echo "{error: 'No existente'}";
            break;
    }

    $vContenidoHTML = $vInfoCorreo['Content'];
    $vSubject = $vInfoCorreo['Subject'];

    //json_encode ('{estado:"200",info:{asunto:"' . $vSubject . '",contenido:"' . trim($vContenidoHTML) . '"}}');
    echo json_encode(array('estado' => "200", "info" => array("asunto" => $vSubject, "contenido" => trim($vContenidoHTML))));
} else {
    echo "{error: 'Error de solicitud'}";
}
