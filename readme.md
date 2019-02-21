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

gdiUrl: 'http://localhost:3002/3ds-server/frame'

authUrl: 'http://localhost:3003/acs/auth'

gdiNotifyUrl: 'http://localhost:3001/phoenix/gdiNotify'

AuthNotifyUrl: http://localhost:3001/phoenix/authNotify


preso spunto da:

![SequenceDiagram](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=Q2FyZGhvbGRlci0-TWVyY2hhbnQ6IHN0YXJ0IGVjb21tZXJjZSBwYXltZW50Cm5vdGUgbGVmdCBvZiAAJwgKICAgcmVkaXJlY3QgbmVjZXNzYXJpYSBwZXIgcGFzc2FyZQogICBsYSBzZXNzaW9uZSBhIFBob2VuaXgKZW5kIG5vdGUKAHUILS0-AIEKCjoATwphbnRpZ3VhLzNEUzIvaW5pdCAocGFuLCB0ZXJtaW5hbElkKQoAgUEMKwBbBzoAFSUAgQgHLT4rTkVUUyAzRFM6IC8zZHMAZQUvYnJ3AGYIeElkLCBnZGlOb3RpZnlVcmwpCgAqCC0tPi0AbAkzZHMgdmVyc2lvbgArBVVybABcCS0-LQCBVwxIVE1MIGNvbiBpZnJhbWUABgVzcmM9AC8HAIFIDQCBFAoATgYgKGJyb3dzZXIgaW5mbwB-DgCCMhV0bwCBMQ0AghwXLwCCYQ0AgWYJICgAgmQKLHRyeACCHR1hdXRoAII0BgCCLwZhdXRoAIIvB1JMAIIfF2VzaXRvPSdDJwApBgCCGhsAgUUMACMIAINyDUFDUzogY2hhbGxlbmdlAEYJQUMAgX8dAIEaC3JsAIMQBQCBDgUAggIlAIFXCgCCGw0gAIIJIHZlcmlmeQCCJAcAgk8GAIQ-FQAiBiByZXN1bHQgKGVjaQCFLgoAg1QbbQCHTwcgdG8gY29tbXVuaWNhdACCDAYARgcAhiwNAId8CmZpbmFsaXplAId2EwCHJQkAhBwZcGF5AIZLC0F1dGhvcml6YXRpb25HYXRld2F5OiBwYXkAgUEHAAwUAIZDDXJlc3BvbnNlQ29kZQCGPQwAiSoKAIkdByBvdXRjb20AiDkYCgo&s=earth)


n.b. occorre aggiornare le chiamate del diagramma con quelle dello spike