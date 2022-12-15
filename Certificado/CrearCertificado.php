<?php
/*
SmartSoft
Componente: CrearCertificado.
Fecha de creacion: 01/12/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Crea un certificado de un moderador.

Numero de metodos: 1
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000" || $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");
require __DIR__ . "/vendor/autoload.php";

$vNombreModerador = $_GET['nombre'];

\PhpOffice\PhpWord\Settings::setPdfRendererPath(__DIR__ . '/vendor/tcpdf');
\PhpOffice\PhpWord\Settings::setPdfRendererName('TCPDF');

$templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor(__DIR__ . "/Plantilla.docx");
$templateProcessor->setValue('nombre', $vNombreModerador);
$templateProcessor->setValue('siglo', strtoupper(parse_ini_file(__DIR__ . "/Siglo.ini")["Siglo"]));
$vFechaInicial = explode(" ", $vSala["fecha"]);
$vFechaFinal = explode(" ", $vSala["fecha_cierre"]);
$templateProcessor->setValue('fechaInicio', $vFechaInicial[0] . " de " . $vFechaInicial[2]);
$templateProcessor->setValue('fechaFinal', $vFechaFinal[0] . " de " . $vFechaFinal[2]);
$templateProcessor->setValue('anio', explode(" ", $vSala["fecha"])[count(explode(" ", $vSala["fecha_cierre"])) - 1]);

$file = __DIR__ . '/CertificadosTmp/certificado -' . $vNombreModerador . '.docx';
$templateProcessor->saveAs(__DIR__ . '/CertificadosTmp/certificado -' . $vNombreModerador . '.docx');

//Load temp file
$phpWord = \PhpOffice\PhpWord\IOFactory::load($file);

//Save it
$xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'PDF');

header('Content-Type: application/pdf');
header('Content-Disposition: attachment;filename="certificado -' . $vNombreModerador . '.pdf"');
header('Cache-Control: max-age=0');
///readfile($file);
$xmlWriter->save('php://output');

unlink($file); //elimino el fichero
