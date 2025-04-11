define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Details";
    translation["email.attachment.collabel.transactiontype"] =
        "Transaktionstyp";
    translation["email.attachment.collabel.internalid"] = "Interne ID";
    translation["email.attachment.collabel.vendor"] = "Lieferant";
    translation["email.conversionerrornotification.subject"] =
        "Bei der Konvertierung des eingehenden E-Dokuments ist ein Fehler aufgetreten";
    translation["email.conversionerrornotification.body"] =
        "Bei der Konvertierung des eingehenden E-Dokuments sind Fehler aufgetreten.<br/>In der angehängten Datei finden Sie eine Liste der fehlerhaften Datensätze und ihrer Details.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Hinweis: Wenn Sie möchten, dass ein anderer Benutzer und nicht Ihr Kontoadministrator die Benachrichtigungen erhält, geben Sie die E-Mail-Adresse des Benutzers in Ihrem Datensatz für die übergeordnete Tochtergesellschaft in das Feld &quot;Empfänger von E-Dokument-Benachrichtigungen&quot; ein.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID des eingehenden E-Dokuments";
    translation["email.table.collabel.details"] = "Details";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Fehler bei der Lizenzprüfung des Kontos aufgetreten";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung.</br>Wenn Sie E-Dokumente in großen Mengen verarbeiten möchten, müssen Sie die Option für das kostenlose Senden von E-Dokumenten für ein Land auf der Unternehmensinformationsseite konfigurieren.";
    translation["inboundedocument.logforconversion"] =
        "Das eingehende E-Dokument ist bereit für die Konvertierung.";
    translation["inboundedocument.logincomplete"] =
        "Das eingehende E-Dokument ist unvollständig. Es wurde kein {FIELD} ausgewählt.";
    translation["inboundedocument.deletenotallowed"] =
        "Das Löschen eines eingehenden E-Dokuments ist nicht zulässig.";
    translation["inboundedocument.copynotallowed"] =
        "Das Kopieren eines eingehenden E-Dokuments ist nicht zulässig.";
    translation["inboundedocument.contextunsupported"] =
        "Das eingehende E-Dokument unterstützt nur UI- und SuiteScript-Kontexte.";
    translation["inboundedocument.invalidxmlfile"] =
        "Die ausgewählte XML-Dateireferenz ist keine gültige XML-Datei. Stellen Sie sicher, dass die von Ihnen ausgewählte Datei die Dateierweiterung &quot;.xml&quot; aufweist.";
    translation["inboundedocument.invalidpdffile"] =
        "Die ausgewählte PDF-Datei ist keine gültige PDF-Datei. Stellen Sie sicher, dass die Datei, die Sie auswählen, über die Dateierweiterung (.pdf) verfügt.";
    translation["inboundedocument.invalidxml"] =
        "Die ausgewählte XML-Dateireferenz ist kein wohlgeformtes XML-Dokument.";
    translation["inboundedocument.convert.button"] = "Konvertieren";
    translation["inboundedocument.convert.information"] =
        "Konvertierung dieses eingehenden E-Dokuments ist in Bearbeitung.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Konvertierung dieses eingehenden E-Dokuments ist bereits in Bearbeitung.";
    translation["inboundedocument.cancel.button"] = "E-Dokument stornieren";
    translation["inboundedocument.cancel.confirmation"] =
        "Möchten Sie wirklich dieses eingehende E-Dokument stornieren?";
    translation["inboundedocument.cancel.failed"] =
        "Die Stornierung ist fehlgeschlagen, da der Status des eingehenden E-Dokuments &quot;{STATUS}&quot; ist";
    translation["inboundedocument.cancel.defaulterror"] =
        "Während der Stornierung ist ein Fehler aufgetreten. Im E-Dokument-Audittrail auf der Unterregisterkarte &quot;E-Dokument&quot; finden Sie weitere Details.";
    translation["inboundedocument.cancel.complete"] =
        "Das E-Dokument wurde storniert.";
    translation["inboundedocument.preview.button"] = "XML anzeigen";
    translation["inboundedocument.msg.nofreecountry"] =
        "Für dieses Konto liegt keine aktive Lizenz zur Verwendung der Electronic Invoicing SuiteApp in mehreren Ländern vor. Um dieses E-Dokument in eine Transaktion konvertieren zu können, kontaktieren Sie Ihren Kontoadministrator, um in der Option für E-Dokument-Länder für die kostenlose Verwendung auf der Unternehmensinformationsseite ein Land festzulegen.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Für dieses Konto liegt keine aktive Lizenz zur Verwendung der Electronic Invoicing SuiteApp in mehreren Ländern vor. Um dieses E-Dokument in eine Transaktion konvertieren zu können, kontaktieren Sie Ihren NetSuite-Kontoadministrator, um eine Lizenz zu erwerben.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Für dieses Konto liegt keine aktive Lizenz zur Verwendung der Electronic Invoicing SuiteApp in mehreren Ländern vor. Um dieses E-Dokument in eine Transaktion konvertieren zu können, richten Sie die Standardrechnungsadresse des ausgewählten Lieferanten ein.";
    translation["validationplugin.contextunsupported"] =
        "Das Plug-in zur Validierung eingehender E-Dokumente unterstützt nur UI- und SuiteScript-Kontexte.";
    translation["validationplugin.pluginimplementation"] =
        "Plug-in-Implementierung Validierung eingehender E-Dokumente";
    translation["validationplugin.pluginimplementationhelp"] =
        "Wählen Sie eine Plug-in-Implementierung Validierung eingehender E-Dokumente aus.";
    translation["validationplugin.scriptbannermessage"] =
        "Die Validierung eingehender E-Dokumente sollte über benutzerdefinierte Plug-in-Implementierungen erfolgen. Erstellen Sie vorhandene Validierungsskripte als neue benutzerdefinierte Plug-in-Implementierungen des Typs &quot;Plug-in für Eingangsvalidierung&quot; neu.";
    translation["ei.conversion.defaulterror"] =
        "Während der Konvertierung ist ein Fehler aufgetreten. Im E-Dokument-Audittrail auf der Unterregisterkarte &quot;E-Dokument&quot; finden Sie weitere Details.";
    translation["ei.conversion.inactivevendor"] =
        "Dieses eingehende E-Dokument kann nicht konvertiert werden, da der ausgewählte Lieferant inaktiv ist. Das Feld &quot;E-Dokument-Status&quot; wurde nicht aktualisiert, und es wurde kein Audittrail erstellt. Deaktivieren Sie das Kontrollkästchen &quot;Inaktiv&quot; im Lieferantendatensatz, und versuchen Sie dann, das E-Dokument erneut zu konvertieren.";
    translation["ei.conversion.inactivecustomer"] =
        "Dieses eingehende E-Dokument kann nicht konvertiert werden, da der ausgewählte Kunde inaktiv ist. Das Feld &quot;E-Dokument-Status&quot; wurde nicht aktualisiert, und es wurde kein Audittrail erstellt. Deaktivieren Sie das Kontrollkästchen &quot;Inaktiv&quot; im Kundendatensatz, und versuchen Sie dann, das E-Dokument erneut zu konvertieren.";
    translation["ei.conversion.conversioncomplete"] =
        "Das E-Dokument wurde konvertiert.";
    translation["ei.conversion.conversionlogbulk"] =
        "Das eingehende E-Dokument war Teil einer Massenkonvertierung und wurde mit interner ID {INTERNALID} in eine Transaktion vom Typ &quot;{TYPE}&quot; konvertiert.";
    translation["ei.conversion.conversionlog"] =
        "Das eingehende E-Dokument wurde mit interner ID {INTERNALID} in die Transaktion vom Typ &quot;{TYPE}&quot; konvertiert";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Massenkonvertierungsprozess\nverwendete E-Dokument-Vorlage: {TEMPLATENAME}\nFehlergeltungsbereich: {ERRORSCOPE}\nFehlerdetails: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Verwendete E-Dokument-Vorlage: {TEMPLATENAME}Fehlergeltungsbereich: {ERRORSCOPE}\nFehlerdetails: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Parsing-Fehler. Prüfen Sie das Feldmapping für eingehende E-Dokumente.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Konvertierungsfehler.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Validierungsfehler.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Die Konvertierung ist fehlgeschlagen, da der Status des eingehenden E-Dokumentdatensatzes &quot;{STATUS}&quot; ist";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Die Konvertierung eingehender E-Dokumente mit inaktiven Kunden wird nicht unterstützt.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Die Konvertierung eingehender E-Dokumente mit inaktiven Lieferanten wird nicht unterstützt.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Die folgenden Lieferantencodes: {ITEMLIST} sind keinen Artikeldatensätzen zugeordnet.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Die folgenden Lieferantennamen/-codes: {ITEMLIST} sind keinen Artikeldatensätzen zugeordnet.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Die folgenden Lieferantencodes: {ITEMLIST} sind mehreren Artikeldatensätzen zugeordnet. Ändern Sie die Artikeldatensätze und stellen Sie sicher, dass die Lieferantencodes für jeden Artikel pro Lieferant eindeutig sind.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Die folgenden Lieferantennamen/-codes: {ITEMLIST} sind mehreren Artikeldatensätzen zugeordnet. Ändern Sie die Artikeldatensätze und stellen Sie sicher, dass Lieferantenname und -codes für jeden Artikel pro Lieferant eindeutig sind.";
    translation["ei.conversion.refnumnotfound"] =
        "Die erforderliche Referenznummer fehlt im eingehenden E-Dokument. Stornieren Sie dieses E-Dokument, und senden Sie ein neues E-Dokument mit einem XML-Element als Referenznummer, das dem Feld &quot;tranid &quot; der Transaktion zugeordnet ist.";
    translation["ei.conversion.refnumexists"] =
        "Es ist bereits eine Lieferantenrechnung mit derselben Referenznummer vorhanden. Stornieren Sie dieses E-Dokument und übermitteln Sie ein neues E-Dokument mit der richtigen Referenznummer für das XML-Element, das dem Feld &quot;tranid &quot; zugeordnet ist.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Das Feld &quot;vendorcode&quot; fehlt bei dieser E-Dokument-Vorlage. Modifizieren Sie die E-Dokument-Vorlage, oder wählen Sie eine neue Vorlage aus, die ein &quot;vendorcode&quot;-Feldmapping enthält.";
    translation["ei.conversion.novendorcodevalue"] =
        "Mindestens einer der Artikel hat keinen Lieferantencode. Stornieren Sie dieses E-Dokument und übermitteln Sie ein neues E-Dokument mit dem richtigen Wert für das XML-Element, das dem Feld &quot;vendorcode&quot; zugeordnet ist.";
    translation["ei.conversion.vendornamenotfound"] =
        "Das Feld &quot;vendorname&quot; fehlt bei dieser E-Dokument-Vorlage. Modifizieren Sie die E-Dokument-Vorlage, oder wählen Sie eine neue Vorlage aus, die ein &quot;vendorname&quot;-Feldmapping enthält.";
    translation["ei.conversion.novendornamevalue"] =
        "Mindestens einer der Artikel hat keinen Lieferantennamen/-code. Stornieren Sie dieses E-Dokument und übermitteln Sie ein neues E-Dokument mit dem richtigen Wert für das XML-Element, das dem Feld &quot;Lieferantenname&quot;/&quot;Lieferantencode&quot; zugeordnet ist.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Datensatz ({TRANSTYPE} Nr. {TRANSID}) konnte im System nicht gefunden werden. Stornieren Sie dieses E-Dokument und senden Sie ein neues E-Dokument mit dem richtigen Wert für das dem Erstellt-aus-Feld zugeordnete XML-Element.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Datensatz ({TRANSTYPE} Nr. {TRANSID}) ist einer anderen Entität zugewiesen. Wählen Sie die richtige Entität aus, und konvertieren Sie dieses E-Dokument.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Der Lieferant hat kein Standard-Aufwendungskonto. Dieses wird benötigt, um Rechnungen mit Aufwendungen zu konvertieren. Legen Sie im Lieferantendatensatz im Feld &quot;Standard-Aufwendungskonto&quot; einen Wert fest, um mit der Konvertierung fortzufahren.";
    translation["ei.conversion.nolinktopo"] =
        "Für das eingehende E-Dokument sind weder Artikel noch Ausgaben vorhanden, die in der referenzierten Bestellung aufgeführt sind. Prüfen Sie, ob der Status der referenzierten Bestellung konvertiert werden kann. Wenn ja, stornieren Sie dieses E-Dokument, und senden Sie ein neues E-Dokument mit dem richtigen Wert für das dem Erstellt-aus-Feld zugeordnete XML-Element.";
    translation["inbound.formtitle"] = "Eingehende E-Dokumente konvertieren";
    translation["inbound.search"] = "Suchen";
    translation["inbound.convert"] = "Konvertieren";
    translation["inbound.return"] = "Zurück zu Kriterien";
    translation["inbound.vendor"] = "Lieferant";
    translation["inbound.datefrom"] = "Erstellungsdatum von";
    translation["inbound.dateto"] = "Erstellungsdatum bis";
    translation["inbound.vendorhelp"] =
        "Wählen Sie den Lieferanten aus, dessen fehlgeschlagene eingehende E-Dokumente in die Suchergebnisse aufgenommen werden sollen.";
    translation["inbound.datefromhelp"] =
        "Wählen Sie ein Startdatum aus, um die Periode zu definieren, aus der fehlgeschlagene eingehende E-Dokumente, die in dieser Periode erstellt wurden, in die Suchergebnisse aufgenommen werden sollen.";
    translation["inbound.datetohelp"] =
        "Wählen Sie ein Enddatum aus, um die Periode zu definieren, aus der fehlgeschlagene eingehende E-Dokumente, die in dieser Periode erstellt wurden, in die Suchergebnisse aufgenommen werden sollen.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filter für Suche nach fehlgeschlagenem eingehenden E-Dokument";
    translation["inbound.sublist.sublistname"] =
        "Ergebnisse für Suche nach fehlgeschlagenem eingehenden E-Dokument";
    translation["inbound.sublist.internalid"] = "Interne ID";
    translation["inbound.sublist.vendor"] = "Lieferant";
    translation["inbound.sublist.refnum"] = "Referenznummer";
    translation["inbound.sublist.ponum"] = "Bestellnummer";
    translation["inbound.sublist.datecreated"] = "Erstellungsdatum";
    translation["inbound.sublist.edoctemplate"] = "E-Dokument-Vorlage";
    translation["inbound.msg.conversionongoing"] =
        "Das E-Dokument wird zurzeit konvertiert. Sie erhalten eine E-Mail, wenn der Prozess abgeschlossen ist.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Die Suche mit den ausgewählten Kriterien ist nicht möglich, da die Konvertierung des eingehenden E-Dokuments für den Datumsbereich ({DATECREATED_FROM} - {DATECREATED_TO}) bereits in Bearbeitung ist. Ändern Sie Ihre Suchkriterien, oder versuchen Sie es nach der Konvertierung dieses E-Dokuments erneut.";
    translation["inbound.invaliddates"] =
        "Das &quot;Erstellungsdatum von&quot; darf nicht nach dem &quot;Erstellungsdatum bis&quot; liegen. Ändern Sie die Daten, sodass das &quot;Erstellungsdatum von&quot; vor dem &quot;Erstellungsdatum bis&quot; liegt.";
    translation["inbound.configurefreecountry"] =
        "Für dieses Konto liegt keine aktive Lizenz zur Verwendung der Electronic Invoicing SuiteApp in mehreren Ländern vor. Wenn Sie E-Dokumente in großen Mengen konvertieren möchten, kontaktieren Sie Ihren Kontoadministrator, um die Option für das kostenlose Senden von E-Dokumenten für ein Land auf der Unternehmensinformationsseite zu konfigurieren.";
    translation["portlet.title"] = "Elektronische Dokumente";
    translation["portlet.outboundforgeneration"] =
        "Ausgehende E-Dokumente für Generierung";
    translation["portlet.outboundforsending"] =
        "Ausgehende E-Dokumente zum Senden";
    translation["portlet.outboundwitherrors"] =
        "Ausgehende E-Dokumente mit Fehlern";
    translation["portlet.outboundsendinglink"] =
        "Fehlgeschlagene ausgehende E-Dokumente senden";
    translation["portlet.inboundforconversion"] =
        "Eingehende E-Dokumente für Konvertierung";
    translation["portlet.inboundconvertfailed"] =
        "Fehlgeschlagene eingehende E-Dokumente konvertieren";
    translation["portlet.inboundincomplete"] =
        "Unvollständige eingehende E-Dokumente";
    translation["portlet.inbounduploadlink"] =
        "Eingehendes E-Dokument hochladen";
    translation["portlet.outboundforcertification"] =
        "Ausgehende E-Dokumente für Zertifizierung";
    translation["portlet.outboundcertifiedforsending"] =
        "Ausgehende E-Dokumente zum Senden";
    translation["inbound.webservice.response.success"] =
        "Das eingehende E-Dokument mit der ID {ID} wurde erfolgreich erstellt.";
    translation["inbound.webservice.response.novendor"] =
        "Der folgenden Webservice-ID ist kein Lieferant zugeordnet: {IDENTIFIER}. Stellen Sie sicher, dass Sie die richtige Webservice-ID verwenden.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Das eingehende E-Dokument mit der ID {ID} wurde erfolgreich erstellt. Mehrere Lieferanten sind jedoch der folgenden Webservice-ID zugeordnet: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Das eingehende E-Dokument ist unvollständig, da die richtige Vorlage nicht bestimmt werden kann. Wählen Sie entweder eine Vorlage im eingehenden E-Dokumentdatensatz aus oder richten Sie die XSD im E-Dokumentdatensatz so ein, dass die automatische Vorlagenauswahl aktiviert ist.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Das eingehende E-Dokument ist unvollständig, da der richtige Lieferant nicht bestimmt werden kann. Wählen Sie entweder einen Lieferanten im eingehenden E-Dokumentdatensatz aus oder richten Sie die Webservice-ID im zugeordneten Lieferantendatensatz ein.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Es fehlen die folgenden Schlüssel: {KEYS}, die Sie in der Webservice-Anforderung bereitstellen müssen.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Der Textkörper der Webserviceaanforderung muss ein JSON-Objekt oder ein JSON-Objekt-Array sein, das den folgenden Inhaltstyp verwendet: &quot;application/json&quot;.";
    translation["transaction.contactnoemail"] =
        "Für die folgenden E-Dokument-Empfänger ist keine E-Mail-Adresse in ihrem Kontaktdatensatz angegeben: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Es gibt keine E-Dokument-Empfänger für diese Transaktion. Um E-Dokumente per E-Mail zu senden, muss mindestens ein Kontakt zur Liste von E-Dokument-Empfängern hinzugefügt werden.";
    translation["transaction.maxrecipientexceeded"] =
        "Sie haben das Limit für die Anzahl von E-Mail-Empfängern überschritten. Sie können höchstens 10 E-Mail-Empfänger hinzufügen.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Nur folgende Transaktionstypen werden verarbeitet:";
    translation["ei.prefs.formtitle"] = "Voreinstellungen für E-Dokumente";
    translation["ei.prefs.information.about.certify.skip"] =
        "Der Zertifizierungsschritt wird übersprungen, wenn die Sendemethode für die Zertifizierung nicht definiert oder nicht auf die Transaktion anwendbar ist.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automatisches E-Invoicing";
    translation["ei.prefs.label.automatic.type.selected"] =
        "E-Dokument-Automatisierungstyp";
    translation["ei.prefs.text.option.comb.disabled"] = "Deaktivieren";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Generieren, Zertifizieren, Senden";
    translation["ei.prefs.text.option.comb.gc"] = "Generieren, Zertifizieren";
    translation["ei.prefs.text.option.comb.cs"] = "Zertifizieren, Senden";
    translation["ei.prefs.btn.label.cancel"] = "Abbrechen";
    translation["ei.prefs.btn.label.save"] = "Speichern";
    translation["ei.prefs.msg.confirm.save"] =
        "Möchten Sie die Änderungen der Voreinstellungen für E-Dokumente speichern?";
    translation["ei.prefs.msg.success.save"] =
        "Speichern der Voreinstellungen für E-Dokumente war erfolgreich.";
    translation["ei.prefs.msg.failed.save"] =
        "Speichern der Voreinstellungen für E-Dokumente fehlgeschlagen.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Die Berechtigung zum Zugriff auf diese Seite ist eingeschränkt. Wenden Sie sich an den Administrator, um Zugriff anzufordern.";
    translation["ei.eip.msg.completed"] =
        "E-Dokument-Verarbeitung abgeschlossen.";
    translation["ei.eip.msg.failed"] =
        "E-Dokument-Verarbeitung fehlgeschlagen. Siehe den E-Dokument-Audittrail für weitere Details.";
    translation["ei.eip.msg.processing"] = "Das E-Dokument wird verarbeitet.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Das E-Dokument wird bereits verarbeitet.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps License Client ist für Ihr Konto nicht verfügbar. Installieren Sie diese SuiteApp, um Zugriff auf alle Features der elektronischen Rechnungsstellung zu erhalten.";
    translation["outbound.formtitle"] = "Fehlgeschlagene E-Dokumente senden";
    translation["outbound.search"] = "Suchen";
    translation["outbound.send"] = "Senden";
    translation["outbound.return"] = "Zurück zu Kriterien";
    translation["outbound.customer"] = "Kunde";
    translation["outbound.vendor"] = "Lieferant";
    translation["outbound.subsidiary"] = "Tochtergesellschaft";
    translation["outbound.type"] = "Transaktionstyp";
    translation["outbound.datefrom"] = "Von Transaktionsdatum";
    translation["outbound.dateto"] = "Bis Transaktionsdatum";
    translation["outbound.subshelp"] =
        "Wählen Sie eine Tochtergesellschaft aus, um nur die Transaktionen für diese Tochtergesellschaft anzuzeigen.";
    translation["outbound.custhelp"] =
        "Wählen Sie einen Kunden aus, um nur die Transaktionen für diesen Kunden anzuzeigen. Wenn kein Kunde ausgewählt ist, werden in den Suchergebnissen alle Transaktionen für die Tochtergesellschaft angezeigt, unabhängig vom Kunden.";
    translation["outbound.vendorhelp"] =
        "Wählen Sie einen Lieferanten aus, um nur die Transaktionen für diesen Lieferanten anzuzeigen. Wenn kein Lieferant ausgewählt ist, werden in den Suchergebnissen alle Transaktionen für die Tochtergesellschaft angezeigt, unabhängig vom Lieferanten.";
    translation["outbound.entitytypehelp"] =
        "Wählen Sie als Entitätstyp entweder Kunde oder Lieferant aus. Dadurch wird unten die entsprechende Dropdown-Liste angezeigt.";
    translation["outbound.typehelp"] =
        "Wählen Sie einen oder mehrere Transaktionstypen für jedes E-Dokument aus, das Sie senden möchten. Um mehrere Transaktionstypen auszuwählen, halten Sie die Strg-Taste gedrückt, während Sie die einzelnen Transaktionstypen auswählen.<br /><br />Wird kein Transaktionstyp ausgewählt, werden in den Suchergebnissen unabhängig vom Transaktionstyp alle sendbaren E-Dokumente angezeigt.";
    translation["outbound.datefromhelp"] =
        "Wenn Sie eine Liste der Transaktionen anzeigen möchten, die in einem bestimmten Datumsbereich erstellt wurden, wählen Sie ein Datum aus, um den Anfang des Datumsbereichs zu definieren.";
    translation["outbound.datetohelp"] =
        "Wenn Sie eine Liste der Transaktionen anzeigen möchten, die in einem bestimmten Datumsbereich erstellt wurden, wählen Sie ein Datum aus, um das Ende des Datumsbereichs zu definieren.";
    translation["outbound.entityfieldgroup"] = "Filter für die Entitätssuche";
    translation["outbound.filtersfieldgroup"] =
        "Filter für die Transaktionssuche";
    translation["outbound.entitytypeinlinehelp"] = "Entitätstyp auswählen:";
    translation["outbound.invalidtypetitle"] = "Ungültige Transaktionstypen";
    translation["outbound.invalidtype"] =
        "Die folgenden Transaktionstypen werden derzeit nicht unterstützt: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Die folgenden Transaktionstypen sind für die ausgewählte Entität nicht gültig: {TRANSACTIONTYPES}. Wählen Sie für die gewählte Entität die passenden Transaktionstypen aus.";
    translation["outbound.invaliddates"] =
        "Das Datum für &quot;Von Transaktionsdatum&quot; darf nicht nach dem Datum für &quot;Bis Transaktionsdatum&quot; liegen. Ändern Sie die Datumsangaben, sodass &quot;Von Transaktionsdatum&quot; vor &quot;Bis Transaktionsdatum&quot; liegt.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Die Suche mit den ausgewählten Kriterien ist nicht möglich, da das Senden des E-Dokuments für Transaktionen im Datumsbereich({TRANDATE_FROM} - {TRANDATE_TO}) für Tochtergesellschaft ({SUBSIDIARY}) bereits in Bearbeitung ist. Ändern Sie Ihre Suchkriterien, oder versuchen Sie es nach dem Senden dieses E-Dokuments erneut.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Die Suche mit den ausgewählten Kriterien ist nicht möglich, da das Senden des E-Dokuments für Transaktionen im Datumsbereich ({TRANDATE_FROM} - {TRANDATE_TO}) bereits in Bearbeitung ist. Ändern Sie Ihre Suchkriterien, oder versuchen Sie es nach dem Senden dieses E-Dokuments erneut.";
    translation["outbound.sublist.trannum"] = "Transaktionsnummer";
    translation["outbound.sublist.trantype"] = "Transaktionstyp";
    translation["outbound.sublist.customer"] = "Kunde";
    translation["outbound.sublist.vendor"] = "Lieferant";
    translation["outbound.sublist.subsidiary"] = "Tochtergesellschaft";
    translation["outbound.sublist.trandate"] = "Transaktionsdatum";
    translation["outbound.sublist.memo"] = "Vermerk";
    translation["outbound.sublist.template"] = "Vorlage";
    translation["outbound.sublist.sendingmethod"] = "Sendemethode";
    translation["outbound.sublist.sublistname"] =
        "Ergebnisse für fehlgeschlagene zu sendende ausgehende E-Dokumente";
    translation["outbound.msg.sendingongoing"] =
        "Das E-Dokument wird zurzeit gesendet. Sie erhalten eine E-Mail, wenn der Prozess abgeschlossen ist.";
    translation["outbound.configurefreecountry"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung. Wenn Sie E-Dokumente in großen Mengen senden möchten, kontaktieren Sie Ihren Kontoadministrator, um die Option für das kostenlose Senden von E-Dokumenten für ein Land auf der Unternehmensinformationsseite zu konfigurieren.";
    translation["outbound.entitysend"] = "An Entität senden";
    translation["outbound.certifysend"] = "Zur Zertifizierung senden";
    translation["outbound.sendingtypehelp"] =
        "Wählen Sie entweder &quot;An Entität senden&quot; oder &quot;Zur Zertifizierung senden&quot; aus. Es werden die zugehörigen Sendetransaktionen angezeigt.";
    translation["customer.noemail"] =
        "Es gibt keine E-Mail-Adresse für diesen Kunden. Geben Sie eine gültige E-Mail-Adresse für den Kundendatensatz ein, um E-Dokumente per E-Mail senden zu können.";
    translation["customer.contactnoemail"] =
        "Für die folgenden E-Dokument-Empfänger ist keine E-Mail-Adresse in ihrem Kontaktdatensatz angegeben: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Es gibt keine E-Dokument-Empfänger für diesen Kunden. Um elektronische Dokumente per E-Mail an diesen Kunden zu senden, muss mindestens ein Kontakt zur Liste von E-Dokument-Empfängern hinzugefügt werden.";
    translation["customer.arrayrequired"] =
        "Kontakte-Array für Validierung erforderlich.";
    translation["customer.parameternotarray"] =
        "Kontakteparameter ist kein Array.";
    translation["customer.maxrecipientexceeded"] =
        "Sie haben die maximale Anzahl von E-Mail-Empfängern überschritten. Wählen Sie maximal 10 E-Mail-Empfänger aus.";
    translation["vendor.noemail"] =
        "Es gibt keine E-Mail-Adresse für diesen Lieferanten. Geben Sie eine gültige E-Mail-Adresse für den Lieferantendatensatz ein, um E-Dokumente per E-Mail senden zu können.";
    translation["vendor.contactnoemail"] =
        "Für die folgenden E-Dokument-Empfänger ist keine E-Mail-Adresse in ihrem Kontaktdatensatz angegeben: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Es gibt keine E-Dokument-Empfänger für diesen Lieferanten. Um elektronische Dokumente per E-Mail an diesen Lieferanten zu senden, muss mindestens ein Kontakt zur Liste von E-Dokument-Empfängern hinzugefügt werden.";
    translation["vendor.maxrecipientexceeded"] =
        "Sie haben die maximale Anzahl von E-Mail-Empfängern überschritten. Wählen Sie maximal 10 E-Mail-Empfänger aus.";
    translation["vendor.nosenders"] =
        "Es gibt keinen E-Mail-Absender des E-Dokuments für diesen Lieferanten. Um von diesem Lieferanten per E-Mail E-Dokumente zu empfangen, müssen Sie in die Liste der E-Mail-Absender für Lieferanten-E-Dokumente mindestens eine E-Mail-Adresse eintragen.";
    translation["vendor.existingsender"] =
        "Die Absender-E-Mail-Adresse ist bereits vorhanden.";
    translation["vendor.existingdomain"] =
        "Die Absender-E-Mail-Domain wird bereits von einem anderen Lieferanten verwendet.";
    translation["vendor.existingidentifier"] =
        "Die Webservice-ID wird bereits von einem anderen Lieferanten verwendet. Geben Sie eine andere Webservice-ID ein.";
    translation["customeremailrecipient.contextunsupported"] =
        "E-Mail-Empfänger des Kunden-E-Dokuments unterstützt nur die folgenden Kontexte: UI, CSV, SuiteScript und Web Services.";
    translation["vendoremailrecipient.contextunsupported"] =
        "E-Mail-Empfänger des Lieferanten-E-Dokuments unterstützt nur die folgenden Kontexte: UI, CSV, SuiteScript und Web Services.";
    translation["vendoremailsender.contextunsupported"] =
        "E-Mail-Absender des Lieferanten-E-Dokuments unterstützt nur die folgenden Kontexte: UI, CSV, SuiteScript und Web Services.";
    translation["template.incorrectregex"] =
        "Das REGEX-Feld enthält einen inkorrekten regulären Ausdruck. Es muss korrekte Syntax verwendet werden.";
    translation["template.invalidjson"] =
        "Sie haben keine wohlgeformte JSON im Feld &quot;Vorlage für ausgehende E-Dokumente&quot; verwendet. Klicken Sie auf &quot;OK&quot;, um fortzufahren, oder auf &quot;Abbrechen&quot;, um auf der aktuellen Seite zu bleiben.";
    translation["template.invalidxml"] =
        "Die XML-Vorlage enthält Fehler. Das XML-Format muss wohlgeformt sein.";
    translation["template.templaterequired"] =
        "Der Vorlageninhalt für den ausgewählten ausgehenden Transaktionstyp fehlt. Geben Sie im Feld &quot;Ausgehende E-Dokumente&quot; einen gültigen XML- oder JSON-Vorlageninhalt an, und versuchen Sie es erneut.";
    translation["template.mappingrequired"] =
        "Sie haben einen eingehenden Transaktionstyp ausgewählt, aber der JSON-Inhalt des Feldmappings fehlt. Geben Sie den JSON-Inhalt in das Feld &quot;Feldmapping für eingehende E-Dokumente&quot; ein.";
    translation["template.templateorjsonrequired"] =
        "Es fehlen Feldwerte. Geben Sie für eine ausgehende Transaktion einen gültigen XML- oder JSON-Inhalt im Feld &quot;Vorlage für ausgehende E-Dokumente&quot; an. Geben Sie für eine eingehende Transaktion den JSON-Inhalt im Feld &quot;Feldmapping für eingehende E-Dokumente&quot; ein.";
    translation["template.invalidxsdfile"] =
        "Die ausgewählte XSD-Datei ist keine gültige XSD-Datei. Stellen Sie sicher, dass die ausgewählte Datei die Dateierweiterung &quot;.xsd&quot; aufweist.";
    translation["template.contextunsupported"] =
        "Die E-Dokument-Vorlage unterstützt nur UI- und SuiteScript-Kontexte.";
    translation["template.supportedtranstypefldhelp"] =
        "Wählen Sie einen oder mehrere Transaktionstypen aus, die von dieser Vorlage unterstützt werden sollen. Um mehrere Transaktionstypen auszuwählen, halten Sie die Strg-Taste gedrückt, während Sie die Transaktionstypen auswählen.<br /><br />Wenn keine Transaktionstypen ausgewählt werden können, wurde die Vorlage bereits einem oder mehreren Transaktionsdatensätzen dieses Transaktionstyps zugewiesen. Um die Auswahl eines Transaktionstyps zu aktivieren, entfernen Sie die Vorlage aus dem Transaktionsdatensatz.<br /><br />Sie können diese Vorlage auch eingehenden E-Dokumenten zuweisen; dadurch wird das Feld &quot;Transaktionstyp&quot; deaktiviert.";
    translation["template.eistatus"] =
        "Bearbeitung von Transaktionen mit E-Dokument-Status beschränken";
    translation["template.supportedeistatusfieldhelp"] =
        "Transaktionen mit dem ausgewählten E-Dokument-Status können nicht bearbeitet werden, wenn ihnen diese Vorlage zugeordnet ist. Sie können mehrere E-Dokument-Statuswerte auswählen.";
    translation["template.invalidschemaordependency"] =
        "Schema ist eine falsch strukturierte XSD, oder das abhängige Schema wurde nicht gefunden.";
    translation["template.xmldoesnotconformtoschema"] =
        "Die XML der Vorlage entspricht nicht der bereitgestellten XSD bzw. dem bereitgestellten Schema.";
    translation["template.xmldomexception"] =
        "Der Eingabe-XML-String ist nicht wohlgeformt.";
    translation["template.missingreqdargument"] =
        "Die XSD für die Validierung ausgehender Dokumente fehlt.";
    translation["template.xsdvalidationexception"] =
        "Während der XSD-Validierung ist eine unbekannte Ausnahme aufgetreten.";
    translation["template.xsdmissingdependencyfolder"] =
        "Der XSD-Schemaordner ist ungültig oder nicht vorhanden.";
    translation["invoice.generatebtn"] = "E-Dokument generieren";
    translation["invoice.sendbtn"] = "E-Dokument senden";
    translation["invoice.sendcertifybtn"] = "E-Dokument zertifizieren";
    translation["invoice.eipbtn"] = "E-Dokument verarbeiten";
    translation["invoice.loguntagged"] =
        "E-Dokument-Vorlage wurde entfernt. Für die Transaktion wurde das Tag für die E-Dokument-Generierung entfernt.";
    translation["invoice.logforgenerate"] =
        "Transaktion ist bereit für die E-Dokument-Generierung.";
    translation["invoice.invalidtemplatesub"] =
        "Die Tochtergesellschaft dieser Transaktion ist für die ausgewählte E-Dokument-Vorlage nicht gültig. Wählen Sie eine andere E-Dokument-Vorlage aus.";
    translation["invoice.templateremovalerror"] =
        "Das Entfernen der E-Dokument-Vorlage für gesendete E-Dokumente ist nicht zulässig.";
    translation["ei.sending.currentlysending"] =
        "Das E-Dokument wird zurzeit gesendet. Es kann einige Minuten dauern, bis dieser Vorgang abgeschlossen ist. Unterbrechen Sie den Vorgang nicht, indem Sie erneut auf die Schaltfläche &quot;E-Dokument senden&quot; klicken. Nachdem das E-Dokument gesendet wurde, wird die Seite erneut geladen.";
    translation["ei.sending.notready"] =
        "Dieses E-Dokument ist nicht versandbereit. Sie müssen zunächst auf &quot;E-Dokument generieren&quot; klicken, um ein E-Dokument zu generieren.";
    translation["ei.sending.alreadysent"] =
        "Diese Transaktion wurde bereits gesendet.";
    translation["ei.sending.norecipients"] =
        "Das E-Dokument kann nicht gesendet werden, da keine E-Dokument-Empfänger für den Kunden vorhanden sind. Bevor Sie dieses E-Dokument per E-Mail senden können, müssen zuerst E-Dokument-Empfänger im Kundendatensatz ausgewählt werden.";
    translation["ei.sending.indivcustnoemail"] =
        "Das E-Dokument kann nicht gesendet werden, da keine E-Mail-Adresse für den Kunden vorhanden ist. Bevor Sie dieses E-Dokument per E-Mail senden können, muss zuerst eine E-Mail-Adresse im Kundendatensatz angegeben werden.";
    translation["ei.sending.norecipients.vendor"] =
        "Das E-Dokument kann nicht gesendet werden, da keine E-Dokument-Empfänger für den Lieferanten vorhanden sind. Bevor Sie dieses E-Dokument per E-Mail senden können, müssen zuerst E-Dokument-Empfänger im Lieferantendatensatz ausgewählt werden.";
    translation["ei.sending.indivvendnoemail"] =
        "Das E-Dokument kann nicht gesendet werden, da keine E-Mail-Adresse für den Lieferanten vorhanden ist. Bevor Sie dieses E-Dokument per E-Mail senden können, muss zuerst eine E-Mail-Adresse im Lieferantendatensatz angegeben werden.";
    translation["ei.sending.invalidmethod"] =
        "Wählen Sie eine gültige Sendemethode für {TYPE} Nr. {INVOICENUMBER} aus.";
    translation["ei.sending.sentdetails"] =
        "Absender: {SENDER}\nEmpfänger: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Der E-Dokument-Absender ({EMPLOYEENAME}) weist keine E-Mail-Adresse auf. Geben Sie eine gültige E-Mail-Adresse im Mitarbeiterdatensatz ein.";
    translation["ei.sending.recipientnoemail"] =
        "Ein oder mehrere Empfänger des E-Dokuments, das dieser Transaktion zugeordnet ist, weisen keine E-Mail-Adresse auf. Überprüfen Sie, ob die Empfänger für diesen Kunden gültige E-Mail-Adressen aufweisen.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Ein oder mehrere Empfänger des E-Dokuments, das dieser Transaktion zugeordnet ist, weisen keine E-Mail-Adresse auf. Überprüfen Sie, ob die Empfänger für diesen Lieferanten gültige E-Mail-Adressen aufweisen.";
    translation["ei.sending.defaulterror"] =
        "Beim Senden des E-Dokuments ist ein Fehler aufgetreten. Im E-Dokument-Audittrail auf der Unterregisterkarte &quot;E-Dokument&quot; finden Sie weitere Details.";
    translation["ei.sending.inactivecustomer"] =
        "Das E-Dokument für diese Transaktion konnte nicht gesendet werden, da der ausgewählte Kunde inaktiv ist. Das Feld &quot;E-Dokument-Status&quot; wurde nicht aktualisiert, und es wurde kein Audittrail erstellt. Deaktivieren Sie das Kontrollkästchen &quot;Inaktiv&quot; im Kundendatensatz, und versuchen Sie dann, das E-Dokument erneut zu senden.";
    translation["ei.sending.inactivevendor"] =
        "Das E-Dokument für diese Transaktion konnte nicht gesendet werden, da der ausgewählte Lieferant inaktiv ist. Das Feld &quot;E-Dokument-Status&quot; wurde nicht aktualisiert, und es wurde kein Audittrail erstellt. Deaktivieren Sie das Kontrollkästchen &quot;Inaktiv&quot; im Lieferantendatensatz, und versuchen Sie dann, das E-Dokument erneut zu senden.";
    translation["ei.sending.msg.processcomplete"] =
        "Das E-Dokument wurde gesendet.";
    translation["ei.sending.configurefreecountry"] =
        "Dieses Konto muss über eine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung verfügen. Wenn Sie E-Dokumente in großen Mengen an ein einzelnes Land senden möchten, müssen Sie das Land im Feld &quot;Land für kostenloses Senden von E-Dokumenten&quot; auf der Unternehmensinformationsseite auswählen.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transaktionen mit inaktiven Kunden werden nicht von E-Dokument unterstützt.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transaktionen mit inaktiven Lieferanten werden nicht von E-Dokument unterstützt.";
    translation["ei.sending.certification.defaulterror"] =
        "Bei der Zertifizierung des E-Dokuments ist ein Fehler aufgetreten. Im E-Dokument-Audittrail auf der Unterregisterkarte &quot;E-Dokument&quot; finden Sie weitere Details.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Das E-Dokument wurde zur Zertifizierung gesendet.";
    translation["ei.generation.generationlogbulk"] =
        "Das E-Dokument wurde im Massenverfahren mit der E-Dokument-Vorlage &quot;{TEMPLATENAME}&quot; generiert.";
    translation["ei.generation.generationlog"] =
        "Das E-Dokument wurde mit der E-Dokument-Vorlage &quot;{TEMPLATENAME}&quot; generiert.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Das E-Dokument und die PDF-Datei wurden im Massenverfahren mit der E-Dokument-Vorlage &quot;{TEMPLATENAME}&quot; generiert.";
    translation["ei.generation.generationwithpdflog"] =
        "Das E-Dokument und die PDF-Datei wurden mit der E-Dokument-Vorlage &quot;{TEMPLATENAME}&quot; generiert.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Das E-Dokument wurde im Massenverfahren mit der E-Dokument-Vorlage &quot;{TEMPLATENAME}&quot; generiert. Die zuvor generierte PDF-Datei für diese Transaktion wurde gelöscht.";
    translation["ei.generation.generationremovedpdflog"] =
        "Das E-Dokument wurde mit der E-Dokument-Vorlage &quot;{TEMPLATENAME}&quot; generiert. Die zuvor generierte PDF-Datei für diese Transaktion wurde gelöscht.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Massengenerierungsprozess\nverwendete E-Dokument-Vorlage: {TEMPLATENAME}\nFehlerdetails: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Verwendete E-Dokument-Vorlage: {TEMPLATENAME}\nFehlerdetails: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Während der Generierung ist ein Fehler aufgetreten. Im E-Dokument-Audittrail auf der Unterregisterkarte &quot;E-Dokument&quot; finden Sie weitere Details.";
    translation["ei.generation.inactivecustomer"] =
        "Das E-Dokument für diese Transaktion konnte nicht generiert werden, da der ausgewählte Kunde inaktiv ist. Das Feld &quot;E-Dokument-Status&quot; wurde nicht aktualisiert, und es wurde kein Audittrail erstellt. Deaktivieren Sie das Kontrollkästchen &quot;Inaktiv&quot; im Kundendatensatz, und versuchen Sie dann erneut, das E-Dokument zu generieren.";
    translation["ei.generation.inactivevendor"] =
        "Das E-Dokument für diese Transaktion konnte nicht generiert werden, da der ausgewählte Lieferant inaktiv ist. Das Feld &quot;E-Dokument-Status&quot; wurde nicht aktualisiert, und es wurde kein Audittrail erstellt. Deaktivieren Sie das Kontrollkästchen &quot;Inaktiv&quot; im Lieferantendatensatz, und versuchen Sie dann erneut, das E-Dokument zu generieren.";
    translation["ei.generation.msg.processcomplete"] =
        "Das E-Dokument wurde generiert.";
    translation["ei.generation.configurefreecountry"] =
        "Dieses Konto muss über eine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung verfügen. Wenn Sie E-Dokumente in großen Mengen für ein einzelnes Land generieren möchten, müssen Sie das Land im Feld &quot;Land für kostenloses Senden von E-Dokumenten&quot; auf der Unternehmensinformationsseite auswählen.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transaktionen mit inaktiven Kunden werden nicht von E-Dokument unterstützt.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transaktionen mit inaktiven Lieferanten werden nicht von E-Dokument unterstützt.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Das E-Dokument wurde generiert und erfolgreich digital signiert.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Die Generierung ist fehlgeschlagen, da das resultierende E-Dokument weder eine wohlgeformte XML noch eine wohlgeformte JSON aufweist.";
    translation["notify.batchownersubject"] =
        "Senden des E-Dokuments abgeschlossen";
    translation["notify.batchownerbody"] =
        "Hallo, <br/><br/>die Bearbeitung Ihrer Anforderung zum Senden von E-Dokumenten ist abgeschlossen.<br/>Es wurden {SENT} von {TOTAL} gesendet. In der angehängten Datei finden Sie weitere Details. <br/><br/>Vielen Dank,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "E-Dokument generiert für Bestellung Nr. {PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-Dokument generiert von {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Hallo! <br /><br />{MESSAGE}<br />Die E-Dokument-Datei finden Sie im Anhang.<br /><br />Vielen Dank,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Bei der Generierung des E-Dokuments ist ein Fehler aufgetreten";
    translation["notify.generationerrorbody"] =
        "Bei der Generierung des E-Dokuments sind Fehler aufgetreten.<br/>In der angehängten Datei finden Sie eine Liste der Transaktionen und Fehlerdetails.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Für diese Transaktion wurde bereits ein E-Dokument gesendet. Durch Generieren eines neuen Dokuments wird das vorherige E-Dokument überschrieben. Möchten Sie wirklich ein neues E-Dokument generieren?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Das Entfernen der E-Dokument-Vorlage für gesendete E-Dokumente ist nicht zulässig.";
    translation["transaction.msg.generate.information"] =
        "Generierung dieses E-Dokuments ist in Bearbeitung.";
    translation["transaction.msg.send.information"] =
        "Senden dieses E-Dokuments ist in Bearbeitung.";
    translation["transaction.msg.send.certify.information"] =
        "Zertifizierung dieses E-Dokuments ist in Bearbeitung.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Generierung dieses E-Dokuments ist bereits in Bearbeitung.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Senden dieses E-Dokuments ist bereits in Bearbeitung.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Zertifizierung dieses E-Dokuments ist bereits in Bearbeitung.";
    translation["transaction.msg.uncheckpdf"] =
        "Während der letzten Generierung eines E-Dokuments wurde eine PDF-Datei für diese Transaktion erstellt. Wenn Sie dieses Kontrollkästchen deaktivieren, wird diese PDF-Datei bei der nächsten E-Dokument-Generierung gelöscht.";
    translation["transaction.msg.nofreecountry"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung. Wenn Sie ein E-Dokument für diese Transaktion generieren möchten, kontaktieren Sie Ihren Kontoadministrator, um im Feld &quot;Land für kostenloses Senden von E-Dokumenten&quot; auf der Unternehmensinformationsseite ein Land festzulegen.";
    translation["transaction.msg.otherbillingcountry"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung. Um ein E-Dokument für diese Transaktion generieren zu können, kontaktieren Sie Ihren NetSuite-Kontoadministrator, um eine Lizenz zu erwerben.";
    translation["transaction.msg.nobillingcountry"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung. Um ein E-Dokument für diese Transaktion generieren zu können, geben Sie die Rechnungsadresse für diese Transaktion an.";
    translation["transaction.msg.noshippingcountry"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung. Um ein E-Dokument für diese Transaktion generieren zu können, geben Sie die Versandadresse für diese Transaktion an.";
    translation["transaction.msg.nocustomercountry"] =
        "Dieses Konto verfügt über keine aktive Lizenz für die Verwendung mehrerer Länder bei der elektronischen Rechnungsstellung. Um ein E-Dokument für diese Transaktion generieren zu können, geben Sie eine Standardrechnungsadresse für den Kunden dieser Transaktion an.";
    translation["transaction.msg.blockededittransaction"] =
        "Die Bearbeitung der Transaktion ist für den aktuellen E-Dokument-Status blockiert. Weitere Informationen erhalten Sie in der angehängten EI-Vorlage.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Wenn Sie den Wert im Feld &quot;Inhaltstyp&quot; von &quot;XML&quot; in einen anderen Typ ändern, werden alle XML-Validatoren entfernt. Möchten Sie wirklich den Inhaltstyp ändern?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Nur Validatoren für den XML-Inhaltstyp können hinzugefügt werden.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Dieser Validator ist bereits in der Liste enthalten.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Die E-Dokument-Vorlage-Validatoren unterstützen nur UI- und SuiteScript-Kontexte.";
    translation["standarddocument.default.alreadyexist"] =
        "Der Datensatz {DEFAULT_DOCUMENT_STANDARD} ist bereits vorhanden. Sie können keinen Dokumentpaket-Datensatz mit demselben Namen erstellen. Benennen Sie Ihren Dokumentpaket-Datensatz um, und versuchen Sie es erneut.";
    translation["standarddocument.default.editnotallowed"] =
        "Die Bearbeitung von Name oder Beschreibung des Datensatzes {DEFAULT_DOCUMENT_STANDARD} ist nicht zulässig.";
    translation["standarddocument.default.deletenotallowed"] =
        "Das Löschen des Datensatzes {DEFAULT_DOCUMENT_STANDARD} ist nicht zulässig.";
    translation["standarddocument.contextunsupported"] =
        "Das E-Dokument-Paket unterstützt nur UI-, CSV- und SuiteScript-Kontexte.";
    translation["sendingmethod.default.alreadyexist"] =
        "Die Sendemethode {DEFAULT_SENDING_METHOD_NAME} ist bereits vorhanden. Sie können keinen Sendemethode-Datensatz mit dem gleichen Namen erstellen. Benennen Sie Ihren Sendemethode-Datensatz um, und versuchen Sie es erneut.";
    translation["sendingmethod.default.editnotallowed"] =
        "Das Bearbeiten des Sendemethode-Datensatzes {DEFAULT_SENDING_METHOD_NAME} ist nicht zulässig.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Das Löschen des Sendemethode-Datensatzes {DEFAULT_SENDING_METHOD_NAME} ist nicht zulässig.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Das Feld &quot;Transaktionstyp&quot; wurde deaktiviert, weil diese Sendemethode einem oder mehr Transaktionsdatensätzen zugewiesen ist. Um diese Sendemethode zu bearbeiten, entfernen Sie sie aus dem Transaktionsdatensatz, um das Feld &quot;Transaktionstyp&quot; zu aktivieren, und versuchen Sie es erneut.";
    translation["sendingmethod.contextunsupported"] =
        "Die E-Dokument-Sendemethode unterstützt nur UI- und SuiteScript-Kontexte.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Wählen Sie einen oder mehrere Transaktionstypen aus, die von dieser Sendemethode unterstützt werden sollen. Um mehrere Transaktionstypen auszuwählen, halten Sie die Strg-Taste gedrückt, während Sie die Transaktionstypen auswählen.<br /><br />Wenn einer oder mehrere Transaktionstypen nicht ausgewählt werden können, wurde die Sendemethode einem oder mehreren Transaktionsdatensätzen dieses Transaktionstyps zugewiesen. Sie müssen zuerst diese Sendemethode von dem Transaktionsdatensatz entfernen, um die Auswahl des Transaktionstyps zu ermöglichen.";
    translation["sendingmethod.pluginimplementation"] =
        "Plug-in-Implementierung E-Dokument-Sendemethode";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Plug-in-Implementierung für Sendemethode auswählen";
    translation["sendingmethod.scriptbannermessage"] =
        "Sendemethoden sollten benutzerdefinierte Plug-in-Implementierungen sein. Erstellen Sie vorhandene Sendemethodenskripte als neue benutzerdefinierte Plug-in-Implementierungen des Typs &quot;Sende-Plug-in&quot; neu.";
    translation["customdatasource.pluginimplementation"] =
        "Plug-in-Implementierung benutzerdefinierte Datenquelle";
    translation["customdatasource.pluginimplementationhelp"] =
        "Wählen Sie die Plug-in-Implementierung benutzerdefinierte Datenquellen aus.";
    translation["digitalsignature.pluginimplementation"] =
        "Plug-in-Implementierung digitale Signatur";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Wählen Sie eine Plug-in-Implementierung aus. Dies ist ein Pflichtfeld, wenn Sie E-Dokumente digital signieren möchten.";
    translation["digitalsignature.identifierlabel"] =
        "Das E-Dokument ist digital signiert";
    translation["digitalsignature.successlog"] =
        "Das generierte E-Dokument ist digital signiert.";
    translation["digitalsignature.failurelog"] =
        "Das generierte E-Dokument ist nicht digital signiert.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Die Plug-in-Implementierung digitale Signatur hat den Status &quot;Fehlgeschlagen&quot; zurückgegeben.";
    translation["digitalsignature.plugininvalidresult"] =
        "Das von der Plug-in-Implementierung digitale Signatur zurückgegebene Ergebnis ist ungültig.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Plug-in-Implementierung eingehende benutzerdefinierte Datenquelle";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Wählen Sie eine Plug-in-Implementierung eingehende benutzerdefinierte Datenquelle aus.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Das Ergebnis der Plug-in-Implementierung eingehende benutzerdefinierte Datenquelle ist ungültig.";
    translation["outboundvalidation.pluginimplementation"] =
        "Plug-in-Implementierung ausgehende Validierung";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Wählen Sie eine Plug-in-Implementierung ausgehende E-Dokument-Validierung aus. Dadurch werden ausgehende E-Dokumente validiert.";
    translation["outboundvalidation.successlog"] =
        "Ausgehende Validierung erfolgreich.";
    translation["outboundvalidation.failurelog"] =
        "Ausgehende Validierung fehlgeschlagen";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Die Plug-in-Implementierung ausgehende Validierung hat den Status &quot;Fehlgeschlagen&quot; zurückgegeben.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Das Ergebnis der Plug-in-Implementierung ausgehende Validierung ist ungültig.";
    translation["template.msg.cannotedittransactiontype"] =
        "Das Feld &quot;Transaktionstyp&quot; wurde deaktiviert, weil diese Vorlage bereits einem oder mehr Transaktionsdatensätzen zugeordnet ist. Um diese Vorlage zu bearbeiten, entfernen Sie sie aus dem Transaktionsdatensatz, um das Feld &quot;Transaktionstyp&quot; zu aktivieren, und versuchen Sie es erneut. Sie können diese Vorlage auch eingehenden E-Dokumenten zuweisen; dadurch wird das Feld &quot;Transaktionstyp&quot; deaktiviert.";
    translation["template.msg.forcetocopymessage"] =
        "Sie können die Standardvorlage für E-Dokumente nicht bearbeiten. Sie können die Vorlage über die Option &quot;Kopie erstellen&quot; unter &quot;Aktionen&quot; kopieren oder eine neue Vorlage erstellen.";
    translation["template.msg.warningoneditmessage"] =
        "Dies ist eine Standardvorlage für E-Dokumente. Alle an dieser Vorlage vorgenommenen Änderungen gehen verloren oder werden überschrieben, wenn die SuiteApp aktualisiert wird.";
    translation["email.batchownernotification.subject"] =
        "Senden des E-Dokuments abgeschlossen";
    translation["email.batchownernotification.body"] =
        "Hallo, <br/><br/>Ihre E-Dokumente wurden gesendet.<br/>Es wurden {SENT} von {TOTAL} E-Dokumenten gesendet. In der angehängten Datei finden Sie weitere Details. <br/><br/>Vielen Dank,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Konvertierung des E-Dokuments abgeschlossen";
    translation["email.batchownerconvertnotification.body"] =
        "Hallo, <br/><br/>Ihre E-Dokumente wurden konvertiert.<br/>Es wurden {CONVERTED} von {TOTAL} E-Dokumenten konvertiert. In der angehängten Datei finden Sie weitere Details. <br/><br/>Vielen Dank,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-Dokument generiert für Bestellung Nr. {PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-Dokument von {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "E-Dokument generiert für Bestellung Nr. {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Hallo! <br /><br />Das E-Dokument für Bestellung Nr. {PONUM} wurde generiert.<br />In der angehängten E-Dokument-Datei finden Sie weitere Details.<br /><br />Vielen Dank,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Hallo! <br /><br />Das E-Dokument für {TYPE} Nr. {TRANID} wurde generiert.<br />In der angehängten E-Dokument-Datei finden Sie weitere Details.<br /><br />Vielen Dank,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Bei der Generierung des E-Dokuments ist ein Fehler aufgetreten";
    translation["email.generationerrornotification.body"] =
        "Bei der Generierung des E-Dokuments sind Fehler aufgetreten.<br/>In der angehängten Datei finden Sie eine Liste der Transaktionen und Fehlerdetails.";
    translation["email.sendingerrornotification.subject"] =
        "Beim Senden des E-Dokuments ist ein Fehler aufgetreten";
    translation["email.sendingerrornotification.body"] =
        "Beim Senden des E-Dokuments sind Fehler aufgetreten.<br/>In der angehängten Datei finden Sie eine Liste der Transaktionen und Fehlerdetails.";
    translation["email.webserviceerror.subject"] =
        "Benachrichtigung des Webservice für eingehende E-Dokumente";
    translation["email.webserviceerror.body"] =
        "<p>Hi,</p><p>bei der Verarbeitung des eingehenden E-Dokuments mithilfe des Webservices sind Fehler aufgetreten.<br/>Beachten Sie die folgenden Details.</p>{DETAIL_TABLE}<p>Vielen Dank,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Transaktionsnummer";

    return translation;
});
