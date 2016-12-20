<?php

    $from = 'veydodur@yroid.com';
    $sendTo = 'veydodur@yroid.com';
    $asuntoMensaje = 'Nuevo mensaje del formulario de Contacto';
    $campos = array('name' => 'Nombre', 'email' => 'Correo electrónico', 'asunto' => 'Asunto', 'mensaje' => 'Mensaje'); // array variable name => Text to appear in email
    $mensajeOk = 'Mensaje enviado correctamente. En breve nos pondremos en contacto con usted.';
    $mensajeErr = 'Error al enviar el mensaje. Por favor, intentelo de nuevo más tarde.';


    try
    {
        $emailTexto = "Nuevo mensaje del formulario de Contacto\n=============================\n";

        //Iterar sobre los campos del mensaje POST
        foreach ($_POST as $key => $value) {

            if (isset($campos[$key])) {
                $emailTexto .= "$campos[$key]: $value\n";
            }
        }

        mail($sendTo, $asuntoMensaje, $emailTexto, "De: " . $from);
        
        //Variable para enviar mediante una JSON response de vuelta a contacto.html
        //para que lo pueda recibir el script _contacto.js
        $responseArray = array('type' => 'success', 'message' => $mensajeOk);
    }
    catch (\Exception $e)
    {
        $responseArray = array('type' => 'danger', 'message' => $mensajeErr);
    }

    //Si la petición viene de Ajax enviamos una JSON response
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $encoded = json_encode($responseArray);

        header('Content-Type: application/json');

        echo $encoded;
    }
    else {
        echo $responseArray['message'];
    }

?>