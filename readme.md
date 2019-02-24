# spike integration 3ds-server n&ts

esempio di implementazione mixed step by Ivan L.B.
lo spike simula interazione tra i seguenti web-server

|app | port|
|-|-|
|merchant-website  |  3000|
|phoenix  |  3001|
|3DS-server  |  3002|
|ACS |  3003|

## Installation

```
npm install
```

## Usage

```
npm start
```

## note

gdiURL: 'http://localhost:3002/3ds-server/frame'

authURL: 'http://localhost:3003/acs/auth'

gdiNotifyURL: 'http://localhost:3001/phoenix/gdiNotify'

AuthNotifyUrl: http://localhost:3001/phoenix/authNotify


preso spunto da:

![SequenceDiagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=Q2FyZGhvbGRlci0-TWVyY2hhbnQ6IHN0YXJ0IGVjb21tZXJjZSBwYXltZW50Cm5vdGUgbGVmdCBvZiAAJwgKICAgcmVkaXJlY3QgbmVjZXNzYXJpYSBwZXIgcGFzc2FyZQogICBsYSBzZXNzaW9uZSBhIFBob2VuaXgKZW5kIG5vdGUKAHUILS0-AIEKCjoATwphbnRpZ3VhLzNEUzIvaW5pdCAocGFuLCB0ZXJtaW5hbElkKQoAgUEMKwBbBzoAFSUAgQgHLT4rTkVUUyAzRFM6IC8zZHMAZQUvYnJ3AGYIeElkLCBnZGlOb3RpZnlVcmwpCgAqCC0tPi0AbAkzZHMgdmVyc2lvbgArBVVybABcCS0-LQCBVwxIVE1MIGNvbiBpZnJhbWUABgVzcmM9AC8HAIFIDQCBFAoATgYgKGJyb3dzZXIgaW5mbwB-DgCCMhV0bwCBMQ0AghwXLwCCYQ0AgWYJICgAgmQKLHRyeACCHR1hdXRoAII0BgCCLwZhdXRoAIIvB1JMAIIfF2VzaXRvPSdDJwApBgCCGhsAgUUMACMIAINyDUFDUzogY2hhbGxlbmdlAEYJQUMAgX8dAIEaC3JsAIMQBQCBDgUAggIlAIFXCgCCGw0gAIIJIHZlcmlmeQCCJAcAgk8GAIQ-FQAiBiByZXN1bHQgKGVjaQCFLgoAg1QbbQCHTwcgdG8gY29tbXVuaWNhdACCDAYARgcAhiwNAId8CmZpbmFsaXplAId2EwCHJQkAhBwZcGF5AIZLC0F1dGhvcml6YXRpb25HYXRld2F5OiBwYXkAgUEHAAwUAIZDDXJlc3BvbnNlQ29kZQCGPQwAiSoKAIkdByBvdXRjb20AiDkYCgo&s=earth)



Uno degli scopi principale dello spike è saggiare l'interazione con l'iframe nascosto utilizzato per raccogliere le informazioni aggiuntive del dispositivo sui cui avverrà la transazione.

riporto le specifiche dei fornitori.


_il gdiURL va aperto in un iframe sul sito che sta inizializzando la transazione 3DS.
Una volta conclusa la parte di acquisizione dati, 
**l'iframe browser verrà rediretto sul gdiNotifyURL e a quel punto potrete chiudere l'iframe**._

_Terminata questa fase sarà necessario invocare il metodo auth()_

_- Se non è prevista challenge la transazione 3DS si conclude_

_- Se prevista una challenge sarà necessario aprire redirigere il browser(o aprire un altro iframe) verso l'authURL.
Terminata la fase di challenge, il browser verrà rediretto sul authNotifyURL.
A questo punto dovrete invocare il metodo verify()_



l'implementazione del passo in grassetto è stata realizzata rispondendo alla gdiNotify con un html contenente un javascript che imposti l'href location della finestra padre su un indirizzo che prosegue con la auth.

occorrerebbe aggiornare le chiamate del diagramma con quelle dello spike


[![browser log](https://drive.google.com/file/d/13QGR0bT_bt0MzD2sy-5klU40tILwSzUO/view?usp=sharing)](https://drive.google.com/file/d/13QGR0bT_bt0MzD2sy-5klU40tILwSzUO/view?usp=sharing)


log prodotto


```

Request: POST /3ds-server/api/init at Fri Feb 22 2019 08:43:42 GMT+0100, User Agent: -
Request Body:
{
        "pan": ""
}
Response Body:
{
        "gdiURL": "http://localhost:3002/3ds-server/frame"
}
Response: 200 3007.310 ms - 51
Request: POST /phoenix/init at Fri Feb 22 2019 08:43:42 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Request Body:
{
        "pan": ""
}
Response Body:
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Start 3D-Secure authentication</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
 
    </head>
<body style="background-color: lightgreen" >
    <h1>
        Phoenix Domain: Start 3D-Secure authentication
    </h1>
<p>gdiURL:http://localhost:3002/3ds-server/frame</p>
</body>
<p>qui sotto c'è un hidden iFrame</p>
<iframe src="http://localhost:3002/3ds-server/frame" frameborder="1" height="600px" width="600px"></iframe>

</html>
Response: 200 3056.087 ms - 591
Request: GET /3ds-server/frame at Fri Feb 22 2019 08:43:42 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response Body:
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>gather browser information/device</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="/static/scripts/index.js"></script>
</head>

<body style="background-color:royalblue" >
    <h1>
        3ds-server domain: hidden iframe for send browser information
    </h1>
    <script>
        window.setTimeout(sendBrowserInformation, 5000);

        function sendBrowserInformation() {

            console.log("send browser info:" + httpPost('/3ds-server/api/browserInformation'))
            // non si pò elminiare questo "redirect" perchè occorre attendere 
            // un evento lato client:la fine della chiamata
            // httpPost '/3ds-server/api/browserInformation'
            window.location.href = "http://localhost:3001/phoenix/gdiNotify"; // passata dalla init
        }

    </script>
</body>


</html>
Response: 304 3.928 ms - -
Request: POST /3ds-server/api/browserInformation at Fri Feb 22 2019 08:43:47 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response Body:
OK
Response: 200 0.408 ms - 2
Request: GET /phoenix/gdiNotify at Fri Feb 22 2019 08:43:47 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response Body:
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Notify</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body style="background-color: lightgreen" onload="parentRedirect()">
    <h1>
        Phoenix domain: Notify
    </h1>
    <p>
        reimposto lato client la href location della finestra padre
        per permettere di eseguire un redirect (visibile) all'utente.
    </p>
</body>

<script>
    function parentRedirect() {
        setTimeout(function () {
            console.log('gdiNotify recived');
            window.top.location.href = "/phoenix/waitingAuth";
        }, 3000);
    }
</script>

</html>
Response: 304 1.408 ms - -
Request: POST /3ds-server/api/auth at Fri Feb 22 2019 08:43:53 GMT+0100, User Agent: -
Response Body:
{
        "tranStatus": "CHALLENGE",
        "authURL": "http://localhost:3003/acs/auth"
}
Response: 200 3003.681 ms - 69
Request: GET /phoenix/waitingAuth at Fri Feb 22 2019 08:43:53 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response: 302 3015.442 ms - 104
Request: GET /acs/auth at Fri Feb 22 2019 08:43:53 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response Body:
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>challenge Auth form</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="background-color:chocolate"> 
    <h1>
        ACS domain: challenge Auth form
    </h1>
    <form action="/ACS/checkOTP" method="post">
        <p>
            <label for="otpValue">inerisci il valore ricevuto via SMS (quello giusto è 123456)</label>
        </p>
        <p>
            <input type="number" name="otpValue" id="otpValue"></input>
        </p>
        <p>
            
        </p>
        <p>
            <input type="submit" value="sendOTP">
            </input>
        </p>
    </form>
</body>

</html>
Response: 304 1.155 ms - -
Request: POST /3ds-server/api/ResultRequest at Fri Feb 22 2019 08:44:08 GMT+0100, User Agent: -
Request Body:
{
        "checkOtpResponse": "AUTHENTICATED"
}
Response Body:
OK
Response: 200 0.359 ms - 2
Request: POST /ACS/checkOTP at Fri Feb 22 2019 08:44:08 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Request Body:
{
        "otpValue": "123456"
}
Response: 302 5.836 ms - 124
Request: GET /phoenix/authNotify at Fri Feb 22 2019 08:44:08 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response: 302 0.288 ms - 74
Request: GET /3ds-server/api/verify at Fri Feb 22 2019 08:44:08 GMT+0100, User Agent: -
Response Body:
{
        "status": "AUTHENTICATED"
}
Response: 200 0.222 ms - 26
Request: GET /phoenix/verify at Fri Feb 22 2019 08:44:08 GMT+0100, User Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
Response: 302 4.106 ms - 192


```