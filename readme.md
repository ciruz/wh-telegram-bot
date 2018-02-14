# Simpler Telegram Response Bot

Simpler Telegram Bot der auf verschiedene Befehle antwortet, als "Pseudo Datenbank" wird der ein­fach­heits­hal­ber ein JSON-File verwendet.

## Vorrausetzungen

- node.js & npm
- Telegram Authoriziation Token ( https://telegram.me/botfather )

## Installation

- ``npm install``

## Konfiguration

- ``config.json.example`` umbennen zu ``config.json`` und Auth Token eintragen
- ``channels.json.example`` umbennen zu ``channels.json``

## Starten:

- ``node app.js``



## Demonstration

Man kann den Bot in Telegram hinzufügen, dort wird dann ganz automatisch der "Start" Button angezeigt.

Der Bot reagiert sofort wenn man den Button drückt und man spielt einen einfachen Prozess mit dem Bot durch, bei dem man dem Bot mitteilt, wo man zu Hause ist. (Ganz rudimentär ohne irgendwelche Abfragen oder Checks). Diesen kann man mithilfe von "Buttons" die man dem User anzeigt auch in eine gewünschte Richtung steuern.

<img src="https://i.imgur.com/85mZYDD.gif">


Diese Information wird in der Datenbank (derzeit nur ein JSON File) abgespeichert, inkl. der dazugehörigen Chat-ID:

<img src="https://i.imgur.com/imrilA4.png">

Danach hat man als "Bot Betreiber" über die Telegram Schnittstellen, die Möglichkeit gezielt an einzelne Chat-IDs Nachrichten zu senden.

Somit könnte man in der Realität in einer echten Datenbank nachsehen, welche Telegram User wohnen im Umkreis von einem "Gebiet" und kann diese automatisiert benachrichtigen.

Was ich hier vereinfacht als einfachen "URL Aufruf" darstelle.

<img src="https://i.imgur.com/JcSEIPa.gif">

(Links: Telegram Web / Rechts: Postman für URL Aufruf)