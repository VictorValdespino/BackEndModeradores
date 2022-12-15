<?php
/*
SmartSoft
Componente: CCorreos.
Fecha de creacion: 10/10/2022, Autorizó: Leandro Gomez Flores, Revisó: Leandro Gomez Flores

Modificaciones:
    Fecha               Folio

Descripcion:
Envia los correos correspondientes cuando se invocan del lado del front-end

Numero de metodos: 2
Componentes relacionados: 
*/
$http_origin = $_SERVER["HTTP_ORIGIN"];
if ($http_origin == "http://moderadores.tecnologinc.com:3004" || $http_origin == "https://moderadores.tecnologinc.com" || $http_origin == "http://localhost:3000"|| $http_origin == "http://localhost:3004") {
    header("Access-Control-Allow-Origin: $http_origin");
}
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

require __DIR__ . "/PHPMailer/vendor/autoload.php";
//Apartado de enviar email
use PHPMailer\PHPMailer\PHPMailer;

function mInicio($vTo)
{
    $vCredencialesT = "credenciales.ini";
    $vCredenciales = parse_ini_file($vCredencialesT);

    $vTipoCorreo = $_POST['vTipoCorreo'];


    $vFrom = $vCredenciales["Mail"];
    $vFromName = $vCredenciales["Name"];

    $vSubject = "";
    $vContenidoHTML = '';

    $vArchivos = array();

    $vInfoCorreo = array();

    switch ($vTipoCorreo) {
        case '1': //Nuevo registro por el moderador
            $vInfoCorreo = parse_ini_file("InfoCorreos/NuevoRegistro.ini");
            break;
        case '2': //Nuevo registro emergente
            $vPasswodTmp = $_POST['vPassword'];
            $vInfoCorreo = parse_ini_file("InfoCorreos/NuevoRegistroEmergente.ini");
            $vInfoCorreo["Content"] = str_replace("{passwd}", $vPasswodTmp, $vInfoCorreo["Content"]);
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
        case '7': //Recuperar contraseña
            $vMailTmp = $_POST['vTo'];
            $vPasswodTmp = $_POST['vPassword'];
            $vInfoCorreo = parse_ini_file("InfoCorreos/RecuperarContraseña.ini");
            $vInfoCorreo["Content"] = str_replace("{mail}", $vMailTmp, $vInfoCorreo["Content"]);
            $vInfoCorreo["Content"] = str_replace("{passwd}", $vPasswodTmp, $vInfoCorreo["Content"]);

            break;
        case '8': //Reconocimiento del moderador
            #mCrearArchivo();
            $vInfoCorreo = parse_ini_file("InfoCorreos/ModeradorReconocimiento.ini");
            break;
        case '9': //Registro Coordinador
            $vInfoCorreo = parse_ini_file("InfoCorreos/RegistroCoordinador.ini");
            $vInfoCorreo["Content"] = str_replace("{passwd}", $_POST["vPassword"], $vInfoCorreo["Content"]);
            break;

        default:
            break;
    }
    $vContenidoHTML = $vInfoCorreo['Content'];
    $vSubject = $vInfoCorreo['Subject'];

    //Apartado para enviar y configurar los correos
    try {

        $vMail = new PHPMailer();
        #$vMail->SMTPDebug = SMTP::DEBUG_SERVER;                     //Sirve para ver informacio de evio del correo.
        $vMail->IsSMTP();
        $vMail->Host       = $vCredenciales["HostSMTP"];             //Configurar el servidor SMTP para enviar a través de
        $vMail->SMTPAuth   = true;                                   //Activar la autenticación SMTP
        $vMail->Username   = $vCredenciales["Mail"];                 //SMTP Mail
        $vMail->Password   = $vCredenciales["Password"];             //SMTP password
        $vMail->Port = $vCredenciales["Port"];
        $vMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Metodo de cifrado. (Depende de cada SMTP)

        $vMail->ClearAllRecipients();
        $vMail->CharSet = "UTF-8";

        $vMail->setFrom($vFrom, $vFromName);
        $vMail->AddAddress($vTo);

        $vMail->IsHTML(true);                                       //Podemos activar o desactivar HTML en mensaje
        $vMail->Subject = $vSubject;

        $vMensaje = $vContenidoHTML;

        //Verificamos si se eviara un archivo o no

        if (!empty($vArchivos) > 0) {
            for ($i = 0; $i < count($vArchivos); $i++) {
                if (is_file($vArchivos[$i])) {
                    $vMail->addAttachment($vArchivos[$i]);          //Añadir archivos adjuntos
                }
            }
        }

        $vMail->Body = $vMensaje;
        if (!$vMail->Send()) {
            echo 'Mailer Error: ' . $vMail->ErrorInfo;
        } else {
            echo "correo enviado De: " . $vFrom . " Para: " . $vTo;
        }
    } catch (Exception $e) {
        echo "No se ha podido enviar el mensaje. Error de correo: {$vMail->ErrorInfo}";
    }
}

function mCrearArchivo()
{
}

$vTos = explode(',', $_POST['vTo']);
for ($i = 0; $i < count($vTos); $i++) {
    echo $vTos[$i];
    mInicio($vTos[$i]);
}
