<?php
/*
SmartSoft
Componente: CGuardarTmp.
Fecha de creacion: 01/12/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Guarda la plantilla de certificados, de forma temporal para ser visualizado en front-end.

Numero de metodos: 1
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");
//require_once './phpdocx-master/classes/CreateDocx.php';
//$docx = new TransformDocAdvNative();

$vManual=$_FILES["plantilla"];
$vTiempo=time();

$files = glob('./Tmp/*'); //obtenemos todos los nombres de los ficheros
foreach($files as $file){
    if(is_file($file))
    unlink($file); //elimino el fichero
}

if (move_uploaded_file($vManual['tmp_name'],"./Tmp/P".$vTiempo.".docx")) {
    //$docx->transformDocument("./Tmp/P".$vTiempo.".docx", "P".$vTiempo.".pdf");
    print_r(json_encode(array("status"=>200,"info"=>'Se guardo correctamente la plantilla del certificado.',"nombre"=>"/Tmp/P".$vTiempo.".docx")));
}else{
    print_r(json_encode(array("status"=>500,"info"=>'No se guardo correctamente la plantilla del certificado.')));
}



