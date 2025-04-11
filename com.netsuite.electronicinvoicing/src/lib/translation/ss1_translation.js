/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * This file is used for Translating strings for SS1 scripts in E-Invoicing bundle.
 *
 * Version    Date            Author           Remarks
 * 1.00       29 Nov 2016     ssantiago
 *
 */
var SS1Translator = function (locale) {
    var translation = {
        "inbound.emailcapture.error.xmlattachment":
            "The email must have one XML file attachment.",
        "inbound.emailcapture.error.pdfattachment":
            "The email can have only one PDF file attachment.",
        "inbound.emailcapture.error.vendorerror":
            "No vendor is associated to the email sender.",
        "inbound.emailcapture.error.multiplevendorerror":
            "The correct vendor cannot be identified in the inbound e-document.",
        "inbound.emailcapture.error.notemplate":
            "The correct template cannot be identified in  the inbound e-document.",
        "inbound.emailcapture.notification.subject":
            "Inbound E-Document Email Capture Notification",
        "inbound.emailcapture.notification.body":
            "<p>Hi,</p>" +
            "<p>An error occurred while processing the inbound e-document email with the following details:</p>" +
            "Sender: {SENDER}<br />" +
            "Subject: {SUBJECT}<br />" +
            "Error details: {ERROR}<br />" +
            "<p>Thank you,<br />NetSuite</p>",

        "inbound.emailcapture.notification.bodywithlink":
            "<p>Hi,</p>" +
            "<p>An error occurred while processing the inbound e-document email with the following details:</p>" +
            "Sender: {SENDER}<br />" +
            "Subject: {SUBJECT}<br />" +
            "Error details: {ERROR}<br />" +
            '<p>Click this <a href="{LINK}">link</a> to view the Inbound E-document.</p>' +
            "<p>Thank you,<br />NetSuite</p>",

        "email.adminwarningmsg.body":
            "Note: If you want a different user to receive the notifications instead of your account administrators, enter the email address of the user in the Recipient of E-Document Notifications field under the parent company record in Electronic Invoicing Preferences page.",
    };

    // Commented for future reference when implementing translation
    if (locale) {
        switch (locale) {
            case "cs_CZ":
            case "cs-CZ":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "E-mail musí mít jednu přílohu se souborem XML.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "S odesílatelem e-mailu není spojen žádný dodavatel.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "V příchozím elektronickém dokumentu nelze identifikovat správného dodavatele.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "V příchozím elektronickém dokumentu nelze identifikovat správnou šablonu.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Oznámení o zachycení e-mailu příchozího elektronického dokumentu";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Dobrý den,</p>" +
                    "<p>při zpracovávání e-mailu s příchozím elektronickým dokumentem došlo k chybě, která má následující detaily:</p>" +
                    "Odesílatel: {SENDER}<br />" +
                    "Předmět: {SUBJECT}<br />" +
                    "Detaily chyby: {ERROR}<br />" +
                    "<p>Děkujeme,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Dobrý den,</p>" +
                    "<p>při zpracovávání e-mailu s příchozím elektronickým dokumentem došlo k chybě, která má následující detaily:</p>" +
                    "Odesílatel: {SENDER}<br />" +
                    "Předmět: {SUBJECT}<br />" +
                    "Detaily chyby: {ERROR}<br />" +
                    '<p>Kliknutím na tento <a href="{LINK}">odkaz</a> zobrazíte příchozí elektronický dokument.' +
                    "<p>Děkujeme,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Poznámka: Pokud chcete, aby byla oznámení namísto vašim správcům účtu zasílána jinému uživateli, zadejte e-mailovou adresu tohoto uživatele do pole Příjemce oznámení elektronického dokumentu v záznamu nadřazené pobočky.";
                break;

            case "da_DK":
            case "da-DK":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "E-mailen skal have en vedhæftet XML-fil.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Der er ikke knyttet nogen leverandør til denne e-mailafsender.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Den korrekte leverandør kan ikke identificeres i det indgående e-dokument.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Den korrekte skabelon kan ikke identificeres i det indgående e-dokument.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Meddelelse om e-mailopsamling af indgående e-dokument";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Hej</p>" +
                    "<p>Der er opstået en fejl under behandling af e-mailen med det indgående e-dokument med følgende oplysninger:</p>" +
                    "Afsender: {SENDER}<br />" +
                    "Emne: {SUBJECT}<br />" +
                    "Detaljer om fejl: {ERROR}<br />" +
                    "<p>Tak,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Hej</p>" +
                    "<p>Der er opstået en fejl under behandling af e-mailen med det indgående e-dokument med følgende oplysninger:</p>" +
                    "Afsender: {SENDER}<br />" +
                    "Emne: {SUBJECT}<br />" +
                    "Detaljer om fejl: {ERROR}<br />" +
                    '<p>Klik på dette <a href="{LINK}">link</a> for at se det indgående e-dokument.</p>' +
                    "<p>Tak,br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Bemærk: Hvis du ønsker, at en anden bruger skal modtage notifikationer i stedet for dine kontoadministratorer, skal du indtaste brugerens e-mailadresse i feltet Modtager af e-dokumentnotifikationer i din overordnede datterselskabspost.";
                break;

            case "de_DE":
            case "de-DE":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "Die E-Mail muss einen oder mehr XML-Dateianhänge haben.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Dem E-Mail-Absender wurde kein Lieferant zugeordnet.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Der richtige Lieferant kann im eingehenden E-Dokument nicht identifiziert werden.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Die richtige Vorlage kann im eingehenden E-Dokument nicht identifiziert werden.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Benachrichtigung zur Erfassung einer E-Mail mit eingehendem E-Dokument";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Hallo,</p>" +
                    "<p>bei der Verarbeitung der E-Mail mit eingehendem E-Dokument ist ein fehler mit folgenden Details aufgetreten:</p>" +
                    "Absender: {SENDER}<br />" +
                    "Betreff: {SUBJECT}<br />" +
                    "Fehlerdetails: {ERROR}<br />" +
                    "<p>Vielen Dank,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Hallo,</p>" +
                    "<p>bei der Verarbeitung der E-Mail mit eingehendem E-Dokument ist ein fehler mit folgenden Details aufgetreten:</p>" +
                    "Absender: {SENDER}<br />" +
                    "Betreff: {SUBJECT}<br />" +
                    "Fehlerdetails: {ERROR}<br />" +
                    '<p>Klicken Sie auf diesen <a href="{LINK}">Link</a>, um das eingehende E-Dokument anzuzeigen.</p>' +
                    "<p>Vielen Dank,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Anmerkung: Wenn Sie möchten, dass ein anderer Nutzer und nicht Ihr Konto-Administrator die Benachrichtigungen empfängt, geben Sie die E-Mail-Adresse des Nutzer in Ihrem Datensatz für die übergeordnete Niederlassung in das Feld für den Empfänger von E-Dokument-Benachrichtigungen ein.";
                break;

            case "es_AR":
            case "es-AR":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "El correo electrónico debe tener un archivo XML adjunto.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "No hay ningún proveedor asociado con el remitente del correo electrónico.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "No se puede identificar al proveedor correcto en el documento electrónico entrante.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "No se puede identificar a la plantilla correcta en el documento electrónico entrante.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Notificación de captura de correo electrónico con documentos electrónicos entrantes";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Hola,</p>" +
                    "<p>Se produjo un error cuando se procesaba un correo entrante con documentos electrónicos, que presenta los siguientes detalles:</p>" +
                    "Remitente: {SENDER}<br />" +
                    "Asunto: {SUBJECT}<br />" +
                    "Detalles del error: {ERROR}<br />" +
                    "<p>Gracias.<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Hola,</p>" +
                    "<p>Se produjo un error cuando se procesaba un correo entrante con documentos electrónicos, que presenta los siguientes detalles:</p>" +
                    "Remitente: {SENDER}<br />" +
                    "Asunto: {SUBJECT}<br />" +
                    "Detalles del error: {ERROR}<br />" +
                    '<p>Haga clic en este <a href="{LINK}">enlace</a> para ver el documento electrónico entrante.</p>' +
                    "<p>Gracias.<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Nota: Si desea que otro usuario reciba las notificaciones en lugar de los administradores de su cuenta, introduzca la dirección de correo electrónico del usuario en el campo Destinatario de notificaciones de documentos electrónicos en el registro de su empresa matriz.";
                break;

            case "es_ES":
            case "es-ES":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "El correo electrónico debe tener un archivo XML adjunto.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "No hay ningún proveedor asociado con el remitente del correo electrónico.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "No se puede identificar al proveedor correcto en el documento electrónico entrante.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "No se puede identificar a la plantilla correcta en el documento electrónico entrante.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Notificación de captura de correo electrónico con documentos electrónicos entrantes";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Hola,</p>" +
                    "<p>Se produjo un error cuando se procesaba un correo entrante con documentos electrónicos, que presenta los siguientes detalles:</p>" +
                    "Remitente: {SENDER}<br />" +
                    "Asunto: {SUBJECT}<br />" +
                    "Detalles del error: {ERROR}<br />" +
                    "<p>Gracias.<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Hola,</p>" +
                    "<p>Se produjo un error cuando se procesaba un correo entrante con documentos electrónicos, que presenta los siguientes detalles:</p>" +
                    "Remitente: {SENDER}<br />" +
                    "Asunto: {SUBJECT}<br />" +
                    "Detalles del error: {ERROR}<br />" +
                    '<p>Haga clic en este <a href="{LINK}">enlace</a> para ver el documento electrónico entrante.</p>' +
                    "<p>Gracias.<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Nota: Si desea que otro usuario reciba las notificaciones en lugar de los administradores de su cuenta, introduzca la dirección de correo electrónico del usuario en el campo Destinatario de notificaciones de documentos electrónicos en el registro de su empresa matriz.";
                break;

            case "fr_CA":
            case "fr-CA":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "Cet e-mail doit avoir un fichier XML en pièce jointe.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Aucun fournisseur n’est associé à l’expéditeur de l’e-mail.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Le bon fournisseur ne peut pas être identifié dans le document électronique entrant.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Le bon modèle ne peut pas être identifié dans le document électronique entrant.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Notification de capture d’e-mail de document électronique entrant";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Bonjour,</p>" +
                    "<p>Une erreur s’est produite pendant le traitement de l’e-mail de document électronique entrant dont les détails sont les suivants :</p>" +
                    "Expéditeur : {SENDER}<br />" +
                    "Objet : {SUBJECT}<br />" +
                    "Détails de l’erreur : {ERROR}<br />" +
                    "<p>Merci, <br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Bonjour,</p>" +
                    "<p>Une erreur s’est produite pendant le traitement de l’e-mail de document électronique entrant dont les détails sont les suivants :</p>" +
                    "Expéditeur : {SENDER}<br />" +
                    "Objet : {SUBJECT}<br />" +
                    "Détails de l’erreur : {ERROR}<br />" +
                    '<p>Cliquez sur ce <a href="{LINK}">lien</a> pour afficher le document électronique entrant.</p>' +
                    "<p>Merci, <br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Remarque : Si vous voulez qu’un autre utilisateur reçoive les notifications au lieu des administrateurs de votre compte, entrez l’adresse électronique de l’utilisateur dans le champ Destinataire des notifications de documents électroniques dans votre dossier société mère-filiale.";
                break;

            case "fr_FR":
            case "fr-FR":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "Cet e-mail doit avoir un fichier XML en pièce jointe.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Aucun fournisseur n’est associé à l’expéditeur de l’e-mail.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Le bon fournisseur ne peut pas être identifié dans le document électronique entrant.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Le bon modèle ne peut pas être identifié dans le document électronique entrant.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Notification de capture d’e-mail de document électronique entrant";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Bonjour,</p>" +
                    "<p>Une erreur s’est produite pendant le traitement de l’e-mail de document électronique entrant dont les détails sont les suivants :</p>" +
                    "Expéditeur : {SENDER}<br />" +
                    "Objet : {SUBJECT}<br />" +
                    "Détails de l’erreur : {ERROR}<br />" +
                    "<p>Merci, <br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Bonjour,</p>" +
                    "<p>Une erreur s’est produite pendant le traitement de l’e-mail de document électronique entrant dont les détails sont les suivants :</p>" +
                    "Expéditeur : {SENDER}<br />" +
                    "Objet : {SUBJECT}<br />" +
                    "Détails de l’erreur : {ERROR}<br />" +
                    '<p>Cliquez sur ce <a href="{LINK}">lien</a> pour afficher le document électronique entrant.</p>' +
                    "<p>Merci, <br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Remarque : Si vous voulez qu’un autre utilisateur reçoive les notifications au lieu des administrateurs de votre compte, entrez l’adresse électronique de l’utilisateur dans le champ Destinataire des notifications de documents électroniques dans votre dossier société mère-filiale.";
                break;

            case "it_IT":
            case "it-IT":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "L'e-mail deve avere un allegato file XML.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Nessun fornitore associato al mittente dell'e-mail.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Impossibile identificare il fornitore corretto nel documento elettronico in entrata.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Impossibile identificare il modello corretto nel documento elettronico in entrata.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Notifica acquisizione e-mail documento elettronico in entrata";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Salve,</p>" +
                    "<p>Si è verificato un errore durante l'elaborazione di un documento elettronico in entrata con i seguenti dettagli:</p>" +
                    "Mittente: {SENDER}<br />" +
                    "Oggetto: {SUBJECT}<br />" +
                    "Dettagli errore: {ERROR}<br />" +
                    "<p>Grazie,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Salve,</p>" +
                    "<p>Si è verificato un errore durante l'elaborazione di un documento elettronico in entrata con i seguenti dettagli:</p>" +
                    "Mittente: {SENDER}<br />" +
                    "Oggetto: {SUBJECT}<br />" +
                    "Dettagli errore: {ERROR}<br />" +
                    '<p>Per visualizzare il documento elettronico in entrata, fare clic su questo <a href="{LINK}">collegamento</a>.</p>' +
                    "<p>Grazie,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Nota: se si desidera che le notifiche vengano inviate a un utente diverso invece che agli amministratori dell'account, inserire l'indirizzo e-mail dell'utente nel campo Destinatario notifiche e-mail all'interno del record filiale padre.";
                break;

            case "ja_JP":
            case "ja-JP":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "電子メールには1つのXMLファイルが添付されている必要があります。";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "電子メール送信者に関連付けられている仕入先はありません。";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "受信電子ドキュメントで正しい仕入先を識別することができません。";
                translation["inbound.emailcapture.error.notemplate"] =
                    "受信電子ドキュメントで正しいテンプレートを識別することができません。";
                translation["inbound.emailcapture.notification.subject"] =
                    "受信電子ドキュメントの電子メールキャプチャ通知";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>こんにちは、</p>" +
                    "<p>受信電子ドキュメントの電子メールの処理中に、次のようなエラーが発生しました。</p>" +
                    "送信者：{SENDER}<br />" +
                    "件名：{SUBJECT}<br />" +
                    "エラー詳細：{ERROR}<br />" +
                    "<p>ご利用ありがとうございました。<br />Netsuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>こんにちは、</p>" +
                    "<p>受信電子ドキュメントの電子メールの処理中に、次のようなエラーが発生しました。</p>" +
                    "送信者：{SENDER}<br />" +
                    "件名：{SUBJECT}<br />" +
                    "エラー詳細：{ERROR}<br />" +
                    '<p>この<a href="{LINK}">リンク</a>をクリックして受信電子ドキュメントを参照してください。</p>' +
                    "<p>ご利用ありがとうございました。<br />Netsuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "注意：アカウント管理者ではなく別のユーザーに通知を受信させる場合は、親連結子会社レコードの[電子ドキュメント通知の受信者]フィールドにユーザーの電子メールアドレスを入力します。";
                break;

            case "ko_KR":
            case "ko-KR":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "이메일에 XML 첨부 파일이 하나 있어야 합니다.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "공급업체가 이메일 발송자에게 연결되지 않았습니다.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "인바운드 E-문서에서 올바른 공급업체를 식별할 수 없습니다.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "인바운드 E-문서에서 올바른 템플릿을 식별할 수 없습니다.";
                translation["inbound.emailcapture.notification.subject"] =
                    "인바운드 E-문서 이메일 캡처 알림";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>안녕하세요?</p>" +
                    "<p>인바운드 E-문서 이메일을 처리하는 동안 오류가 발생했으며 세부사항은 다음과 같습니다.</p>" +
                    "발송자: {SENDER}<br />" +
                    "제목: {SUBJECT}<br />" +
                    "오류 상세정보: {ERROR}<br />" +
                    "<p>감사합니다.<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>안녕하세요?</p>" +
                    "<p>인바운드 E-문서 이메일을 처리하는 동안 오류가 발생했으며 세부사항은 다음과 같습니다.</p>" +
                    "발송자: {SENDER}<br />" +
                    "제목: {SUBJECT}<br />" +
                    "오류 상세정보: {ERROR}<br />" +
                    '<p>인바운드 E-문서를 보려면 이 <a href="{LINK}">링크</a>를 클릭하십시오.</p>' +
                    "<p>감사합니다.<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "참고: 계정 관리자 대신 다른 사용자가 알림을 수신하도록 설정하려면, 상위 자회사 레코드에 있는 E-문서 알림의 수취인 필드에 사용자의 이메일 주소를 입력하십시오.";
                break;

            case "nl_NL":
            case "nl-NL":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "De e-mail moet één xml-bestand als bijlage hebben.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Geen leverancier gekoppeld aan de e-mailafzender.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "De juiste leverancier kan niet worden geïdentificeerd in het inkomende e-document.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "De juiste sjabloon kan niet worden geïdentificeerd in het inkomende e-document.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Melding over vastleggen in e-mail van inkomend e-document";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Hallo,</p>" +
                    "<p>Er is een fout opgetreden tijden de verwerking van de inkomende e-documentmail met de volgende details:</p>" +
                    "Afzender: {SENDER}<br />" +
                    "Onderwerp: {SUBJECT}<br />" +
                    "Details van fout: {ERROR}<br />" +
                    "<p>Hartelijk dank,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Hallo,</p>" +
                    "<p>Er is een fout opgetreden tijden de verwerking van de inkomende e-documentmail met de volgende details:</p>" +
                    "Afzender: {SENDER}<br />" +
                    "Onderwerp: {SUBJECT}<br />" +
                    "Details van fout: {ERROR}<br />" +
                    '<p>Klik op deze <a href="{LINK}">koppeling</a> om het inkomende e-document te bekijken.</p>' +
                    "<p>Hartelijk dank,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Opmerking: Als u wilt dat een andere gebruiker dan uw accountbeheerders de meldingen ontvangt, geeft u het e-mailadres op van de gebruiker in het veld Ontvanger van e-documentmeldingen in het bovenliggende dochterondernemingsrecord.";
                break;

            case "pt_BR":
            case "pt-BR":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "O e-mail deve ter um anexo de arquivo XML.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Nenhum fornecedor foi associado ao remetente do e-mail.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "O fornecedor correto não pode ser identificado no documento eletrônico de entrada.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "O modelo correto não pode ser identificado no documento eletrônico de entrada.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Notificação de captura do e-mail do documento eletrônico de entrada";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Olá,</p>" +
                    "<p>Ocorreu um erro ao processar o e-mail do documento eletrônico de entrada com os seguintes detalhes:</p>" +
                    "Remetente: {SENDER}<br />" +
                    "Assunto: {SUBJECT}<br />" +
                    "Detalhes do erro: {ERROR}<br />" +
                    "<p>Obrigado,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Olá,</p>" +
                    "<p>Ocorreu um erro ao processar o e-mail do documento eletrônico de entrada com os seguintes detalhes:</p>" +
                    "Remetente: {SENDER}<br />" +
                    "Assunto: {SUBJECT}<br />" +
                    "Detalhes do erro: {ERROR}<br />" +
                    '<p>Clique neste <a href="{LINK}">link</a> para exibir o documento eletrônico de entrada.</p>' +
                    "<p>Obrigado,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Observação: Para que as notificações sejam enviadas para um usuário diferente (em vez dos administradores da sua conta), digite o endereço de e-mail do usuário no campo Destinatário de notificações de documentos eletrônicos do seu registro de subsidiárias primárias.";
                break;

            case "ru_RU":
            case "ru-RU":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "К сообщению эл. почты должен быть приложен один файл XML.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "С этим отправителем не связан ни один поставщик.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Во входящем документе не удается определить правильного поставщика.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Во входящем документе не удается определить правильный шаблон.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Уведомление о сборе входящего электронного документа";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Здравствуйте,</p>" +
                    "<p>При обработке входящего электронного документа со следующими данными произошла ошибка:</p>" +
                    "Отправитель: {SENDER}<br />" +
                    "Тема: {SUBJECT}<br />" +
                    "Подробности ошибки: {ERROR}<br />" +
                    "<p>Спасибо,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Здравствуйте,</p>" +
                    "<p>При обработке входящего электронного документа со следующими данными произошла ошибка:</p>" +
                    "Отправитель: {SENDER}<br />" +
                    "Тема: {SUBJECT}<br />" +
                    "Подробности ошибки: {ERROR}<br />" +
                    '<p>Нажмите <a href="{LINK}">ссылку</a>, чтобы просмотреть входящий электронный документ.</p>' +
                    "<p>Спасибо,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Примечание. Если вы хотите, чтобы вместо администратора учетной записи уведомления получал другой пользователь, введите адрес эл. почты пользователя в поле «Получатель уведомлений об электронных документах» в записи родительского филиала.";
                break;

            case "sv_SE":
            case "sv-SE":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "E-postmeddelandet måste ha en XML-fil i bilaga.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "Ingen leverantör är associerad med e-postavsändaren.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Rätt leverantör kan inte identifieras i det inkommande e-dokumentet.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Rätt mall kan inte identifieras i det inkommande e-dokumentet.";
                translation["inbound.emailcapture.notification.subject"] =
                    "E-post hämtningsnotis för inkommande e-dokument";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Hej,</p>" +
                    "<p>Ett fel uppstod vid behandling av inkommande e-dokument-e-post med följande uppgifter:</p>" +
                    "Avsändare: {SENDER}<br />" +
                    "Ämne: {SUBJECT}<br />" +
                    "Felinformation: {ERROR}<br />" +
                    "<p>Tack!<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Hej,</p>" +
                    "<p>Ett fel uppstod vid behandling av inkommande e-dokument-e-post med följande uppgifter:</p>" +
                    "Avsändare: {SENDER}<br />" +
                    "Ämne: {SUBJECT}<br />" +
                    "Felinformation: {ERROR}<br />" +
                    '<p>Klicka på den här <a href="{LINK}">länken</a> för att visa det inkommande e-dokumentet.</p>' +
                    "<p>Tack!<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Obs! Om du vill att en annan användare ska ta emot notifieringarna istället för dina kontoadministratörer, ange användarens e-postadress i fältet Mottagare av e-dokumentmeddelanden i posten för ditt moderdotterbolag.";
                break;

            case "th_TH":
            case "th-TH":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "อีเมล์ต้องมีหนึ่งไฟล์แนบ XML";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "ไม่มีการเชื่อมโยงผู้ขายกับผู้ส่งอีเมล์";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "ไม่สามารถระบุผู้ขายที่ถูกต้องใน E-Document ขาเข้า";
                translation["inbound.emailcapture.error.notemplate"] =
                    "ไม่สามารถระบุเท็มเพลตที่ถูกต้องใน E-Document ขาเข้า";
                translation["inbound.emailcapture.notification.subject"] =
                    "การแจ้งเตือนการบันทึกอีเมล์ E-Document";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>สวัสดีค่ะ/ครับ</p>" +
                    "<p>เกิดข้อผิดพลาดขึ้นในขณะประมวลผลอีเมล์ E-Document ขาเข้า โดยมีรายละเอียดดังต่อไปนี้:</p>" +
                    "ผู้ส่ง: {SENDER}<br />" +
                    "หัวข้อ: {SUBJECT}<br />" +
                    "รายละเอียดข้อผิดพลาด: {ERROR}<br />" +
                    "<p>ขอบคุณค่ะ/ครับ,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>สวัสดีค่ะ/ครับ</p>" +
                    "<p>เกิดข้อผิดพลาดขึ้นในขณะประมวลผลอีเมล์ E-Document ขาเข้า โดยมีรายละเอียดดังต่อไปนี้:</p>" +
                    "ผู้ส่ง: {SENDER}<br />" +
                    "หัวข้อ: {SUBJECT}<br />" +
                    "รายละเอียดข้อผิดพลาด: {ERROR}<br />" +
                    '<p>คลิก <a href="{LINK}">ลิงก์</a> นี้เพื่อดู E-document ขาเข้า</p>' +
                    "<p>ขอบคุณค่ะ/ครับ,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "หมายเหตุ: หากคุณต้องการให้ผู้ใช้อื่นรับการแจ้งเตือนแทนผู้ดูแลบัญชีของคุณ ให้ป้อนที่อยู่อีเมล์ของผู้ใช้ในฟิลด์ผู้รับการแจ้งเตือน E-Document ในเร็กคอร์ดบริษัทในเครือหลักของคุณ";
                break;

            case "tr_TR":
            case "tr-TR":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "E-postada bir XML dosyası eki olmalı.";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "E-posta göndereniyle ilişkilendirilmiş satıcı yok.";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "Gelen e-belgede doğru satıcı tanımlanamıyor.";
                translation["inbound.emailcapture.error.notemplate"] =
                    "Gelen e-belgede doğru şablon tanımlanamıyor.";
                translation["inbound.emailcapture.notification.subject"] =
                    "Gelen E-Belge E-postası Alma Bildirimi";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>Merhaba,</p>" +
                    "<p>Gelen e-belge e-postası işlenirken ayrıntıları aşağıdaki gibi olan bir hata oluştu:</p>" +
                    "Gönderen: {SENDER}<br />" +
                    "Konu: {SUBJECT}<br />" +
                    "Hata ayrıntıları: {ERROR}<br />" +
                    "<p>Teşekkür ederiz,<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>Merhaba,</p>" +
                    "<p>Gelen e-belge e-postası işlenirken ayrıntıları aşağıdaki gibi olan bir hata oluştu:</p>" +
                    "Gönderen: {SENDER}<br />" +
                    "Konu: {SUBJECT}<br />" +
                    "Hata ayrıntıları: {ERROR}<br />" +
                    '<p>Gelen E-Belgeyi görüntülemek için bu <a href="{LINK}">bağlantı</a>ya tıklayın.</p>' +
                    "<p>Teşekkür ederiz,<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "Not: Bildirimleri hesap yöneticileriniz yerine farklı bir kullanıcının almasını istiyorsanız ana bağlı kuruluş kaydınızdaki E-Belge Bildirimleri Alıcısı alanına bu kullanıcının e-posta adresini girin.";
                break;

            case "zh_CN":
            case "zh-CN":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "电子邮件必须有一个 XML 文件附件。";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "没有供应商与电子邮件发件人关联。";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "入站电子文档中无法识别正确的供应商。";
                translation["inbound.emailcapture.error.notemplate"] =
                    "入站电子文档中无法识别正确的模板。";
                translation["inbound.emailcapture.notification.subject"] =
                    "入站电子文档电子邮件捕获通知";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>您好，</p>" +
                    "<p>处理入站电子文档电子邮件时发生了错误，详情如下：</p>" +
                    "发件人：{SENDER}<br />" +
                    "主题：{SUBJECT}<br />" +
                    "错误详情：{ERROR}<br />" +
                    "<p>谢谢，<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>您好，</p>" +
                    "<p>处理入站电子文档电子邮件时发生了错误，详情如下：</p>" +
                    "发件人：{SENDER}<br />" +
                    "主题：{SUBJECT}<br />" +
                    "错误详情：{ERROR}<br />" +
                    '<p>单击此<a href="{LINK}">链接</a>查看入站电子文档。</p>' +
                    "<p>谢谢，<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "注：如果要另一用户接收通知，而不是账户管理员，请在上级子公司记录的“电子文档通知的收件人”字段中输入该用户的电子邮件地址。";
                break;

            case "zh_TW":
            case "zh-TW":
                translation["inbound.emailcapture.error.xmlattachment"] =
                    "電子郵件必須有一個 XML 檔案附件。";
                translation["inbound.emailcapture.error.vendorerror"] =
                    "沒有與電子郵件寄件者相關聯的廠商。";
                translation["inbound.emailcapture.error.multiplevendorerror"] =
                    "無法在內送電子文件中識別正確的廠商。";
                translation["inbound.emailcapture.error.notemplate"] =
                    "無法在內送電子文件中識別正確的範本。";
                translation["inbound.emailcapture.notification.subject"] =
                    "內送電子文件電子郵件擷取通知";
                translation["inbound.emailcapture.notification.body"] =
                    "<p>嗨，</p>" +
                    "<p>在處理內送電子文件電子郵件時發生錯誤，詳細資料如下：</p>" +
                    "寄件者：{SENDER}<br />" +
                    "主旨︰{SUBJECT}<br />" +
                    "錯誤詳細資料：{ERROR}<br />" +
                    "<p>感謝您，<br />NetSuite</p>";

                translation["inbound.emailcapture.notification.bodywithlink"] =
                    "<p>嗨，</p>" +
                    "<p>在處理內送電子文件電子郵件時發生錯誤，詳細資料如下：</p>" +
                    "寄件者：{SENDER}<br />" +
                    "主旨︰{SUBJECT}<br />" +
                    "錯誤詳細資料：{ERROR}<br />" +
                    '<p>點選此<a href="{LINK}">連結</a>以檢視內送電子文件。</p>' +
                    "<p>感謝您，<br />NetSuite</p>";

                translation["email.adminwarningmsg.body"] =
                    "註：如果要讓不同的使用者接收通知，而非由帳戶管理員接收通知，請在母子公司記錄的「電子文件通知的收件者」欄位中輸入使用者的電子郵件地址。";
                break;
        }
    }

    this.getString = function (string) {
        return translation[string] || "";
    };
};
