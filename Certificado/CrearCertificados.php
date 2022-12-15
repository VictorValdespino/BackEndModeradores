<?php
/*
SmartSoft
Componente: CrearCertificados.
Fecha de creacion: 01/12/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Crea un zip con todos los certificados de los moderadores.

Numero de metodos: 2
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");
require __DIR__ . "/vendor/autoload.php";

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api2.moderadores.tecnologinc.com/api/salas/obtener-salas",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Accept: */*",
        "User-Agent: Thunder Client (https://www.thunderclient.com)"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    \PhpOffice\PhpWord\Settings::setPdfRendererPath(__DIR__ . '/vendor/tcpdf');
    \PhpOffice\PhpWord\Settings::setPdfRendererName('TCPDF');

    $vDatosSalas = json_decode($response, true);

    $adarchivos = array();

    foreach ($vDatosSalas as $vSala) {
        if ($vSala["estado"] == "Cerrada") {
            $vModerador = mSacarModerador($vSala["moderador"]);
            $vNombreModerador = $vModerador["nombre"] . " " . $vModerador["apellido_paterno"] . " " . $vModerador["apellido_materno"];

            $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(__DIR__ . "/Plantilla.docx");
            $templateProcessor->setValue('nombre', $vNombreModerador);
            $templateProcessor->setValue('siglo', strtoupper(parse_ini_file(__DIR__ . "/Siglo.ini")["Siglo"]));
            $vFechaInicial=explode(" ",$vSala["fecha"]);
            $vFechaFinal=explode(" ",$vSala["fecha_cierre"]);
            $templateProcessor->setValue('fechaInicio', $vFechaInicial[0]." de ".$vFechaInicial[2]);
            $templateProcessor->setValue('fechaFinal', $vFechaFinal[0]." de ".$vFechaFinal[2]);
            $templateProcessor->setValue('anio', explode(" ",$vSala["fecha"])[count(explode(" ",$vSala["fecha_cierre"]))-1]);

            $file = __DIR__ . '/CertificadosTmp/Certificado-sala-' . $vSala["_id"];
            $templateProcessor->saveAs($file . '.docx');

            //Load temp file
            $phpWord = \PhpOffice\PhpWord\IOFactory::load($file . '.docx');

            //Save it
            $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'PDF');
            $xmlWriter->save($file . '.pdf');
            array_push($adarchivos, $file . '.docx');
            //array_push($adarchivos, $file . '.pdf');
        }
    }
    // Declaramos el nombre del archivo comprimido
    $nombre_zip = 'Certificados.zip';
    // Agregamos los archivos a comprimir
    $zip = new ZipArchive();
    //$zip->open($nombre_zip, ZipArchive::CREATE);
    if (!$zip->open($nombre_zip, ZipArchive::CREATE | ZipArchive::OVERWRITE)) {
        exit("Error abriendo ZIP en $nombreArchivoZip");
    }
    foreach ($adarchivos as $nuevo) {
        $zip->addFile($nuevo, basename($nuevo));
    }
    $zip->close();

    echo "true";
}

function mSacarModerador($vIdModerador)
{
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api2.moderadores.tecnologinc.com/api/usuarios/obtener-datos-moderador/" . $vIdModerador,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "Accept: */*",
            "User-Agent: Thunder Client (https://www.thunderclient.com)"
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        return json_decode($response, true)["vConsultaDataModerador"];
    }
}
