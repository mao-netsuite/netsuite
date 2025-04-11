define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detaljer";
    translation["email.attachment.collabel.transactiontype"] =
        "Transaktionstype";
    translation["email.attachment.collabel.internalid"] = "Intern id";
    translation["email.attachment.collabel.vendor"] = "Leverandør";
    translation["email.conversionerrornotification.subject"] =
        "Fejl fundet under konvertering af indgående e-dokument";
    translation["email.conversionerrornotification.body"] =
        "Fejl blev fundet under konvertering af indgående e-dokument.<br/>Se den vedhæftede fil for listen over records med fejl og deres detaljer.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Bemærk: Hvis du ønsker, at en anden bruger skal modtage underretninger i stedet for dine kontoadministratorer, skal du indtaste brugerens e-mailadresse i feltet Modtager af e-dokumentunderretninger i din overordnede datterselskabsrecord.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Indgående e-dokument-id";
    translation["email.table.collabel.details"] = "Detaljer";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Fejl fundet under licenstjek til kontoen";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande.</br>For at massebehandle e-dokumenter skal du konfigurere E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["inboundedocument.logforconversion"] =
        "Det indgående e-dokument er klar til konvertering.";
    translation["inboundedocument.logincomplete"] =
        "Det indgående e-dokument er ufuldstændigt. Intet {FIELD} blev valgt.";
    translation["inboundedocument.deletenotallowed"] =
        "Sletning af et indgående dokument er ikke tilladt.";
    translation["inboundedocument.copynotallowed"] =
        "Kopiering af et indgående dokument er ikke tilladt.";
    translation["inboundedocument.contextunsupported"] =
        "Indgående e-dokument understøtter kun UI- og SuiteScript-kontekster.";
    translation["inboundedocument.invalidxmlfile"] =
        "Den valgte XML-filreference er ikke en gyldig XML-fil. Sørg for, at den fil, som du vælger, har filtypenavnet .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Den valgte PDF-filreference er ikke en gyldig PDF-fil. Sørg for, at den fil, som du vælger, har filtypenavnet .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Den valgte XML-filreference er ikke et korrekt udformet XML-dokument.";
    translation["inboundedocument.convert.button"] = "Konverter";
    translation["inboundedocument.convert.information"] =
        "Konvertering af dette indgående e-dokument er i gang.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Konvertering af dette indgående e-dokument er allerede i gang.";
    translation["inboundedocument.cancel.button"] = "Annuller e-dokument";
    translation["inboundedocument.cancel.confirmation"] =
        "Er du sikker på, at du vil annullere dette indgående e-dokument?";
    translation["inboundedocument.cancel.failed"] =
        "Annullering fejlede, da statussen for den indgående e-dokumentrecord er '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Der opstod en fejl under annullering. Tjek e-dokumentrevisionssporet på underfanen E-dokument for at få detaljer.";
    translation["inboundedocument.cancel.complete"] =
        "E-dokumentet er blevet annulleret.";
    translation["inboundedocument.preview.button"] = "Se XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing SuiteApp i flere lande. For at konvertere dette e-dokument til en transaktion skal du kontakte kontoadministratoren for at få angivet et land i feltet E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing SuiteApp i flere lande. For at konvertere dette e-dokument til en transaktion skal du kontakte din NetSuite-kontoansvarlige for at få købt en licens.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing SuiteApp i flere lande. For at konvertere dette e-dokument til en transaktion skal du konfigurere standard regningsadressen for den valgte leverandør.";
    translation["validationplugin.contextunsupported"] =
        "Plug-in til validering af indgående e-dokument understøtter UI- og SuiteScript-kontekster.";
    translation["validationplugin.pluginimplementation"] =
        "Implementering af plug-in til validering af indgående e-dokument";
    translation["validationplugin.pluginimplementationhelp"] =
        "Vælg en implementering af plug-in til validering af indgående e-dokument.";
    translation["validationplugin.scriptbannermessage"] =
        "Validering af indgående e-dokument skal være tilpassede plug-in-implementeringer. Opret eksisterende valideringsscripts igen som nye tilpassede plug-in-implementeringer af typen &quot;Plug-in til indgående validering&quot;";
    translation["ei.conversion.defaulterror"] =
        "Der opstod en fejl under konvertering. Tjek e-dokumentrevisionssporet på underfanen E-dokument for at få detaljer.";
    translation["ei.conversion.inactivevendor"] =
        "Kan ikke konvertere dette indgående e-dokument, da den valgte leverandør er inaktiv. Feltet E-dokumentstatus er ikke blevet opdateret, og et revisionsspor er ikke blevet oprettet. Ryd feltet Inaktiv på leverandørrecorden, og prøv dernæst at konvertere e-dokumentet igen.";
    translation["ei.conversion.inactivecustomer"] =
        "Kan ikke konvertere dette indgående e-dokument, da den valgte kunde er inaktiv. Feltet E-dokumentstatus er ikke blevet opdateret, og et revisionsspor er ikke blevet oprettet. Ryd feltet Inaktiv på kunderecorden, og prøv dernæst at konvertere e-dokumentet igen.";
    translation["ei.conversion.conversioncomplete"] =
        "E-dokumentet er blevet konverteret.";
    translation["ei.conversion.conversionlogbulk"] =
        "Det indgående e-dokument blev medtaget i massekonverteringen og blev konverteret til transaktionen med intern id: {INTERNALID} af typen: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "Det indgående e-dokument blev konverteret til transaktionen med intern id: {INTERNALID} af typen: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Massekonverteringsproces\nE-dokumentskabelon anvendt: {TEMPLATENAME}\nFejlomfang: {ERRORSCOPE}\nFejldetaljer: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "E-dokumentskabelon anvendt: {TEMPLATENAME}\nFejlomfang: {ERRORSCOPE}\nFejldetaljer: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Analysefejl. Tjek feltmappingen til indgående e-dokumenter.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Konverteringsfejl.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Valideringsfejl.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Konvertering fejlede, da statussen for den indgående e-dokumentrecord er '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Indgående e-dokumenter med inaktive kunder understøttes ikke til konvertering.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Indgående e-dokumenter med inaktive leverandører understøttes ikke til konvertering.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Følgende leverandørkoder: {ITEMLIST} er ikke knyttet til nogen varerecords.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Følgende leverandørnavn/-koder: {ITEMLIST} er ikke knyttet til nogen varerecords.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Følgende leverandørkoder: {ITEMLIST} er knyttet til flere varerecords. Modificer varerecordene, og sørg for, at leverandørkoder er entydige til hver vare pr. leverandør.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Følgende leverandørnavn/-koder: {ITEMLIST} er knyttet til flere varerecords. Modificer varerecordene, og sørg for, at leverandørnavn/-koder er entydige til hver vare pr. leverandør.";
    translation["ei.conversion.refnumnotfound"] =
        "Det påkrævede referencenummer mangler i det indgående e-dokument. Annuller dette dokument, og afsend et andet e-dokument, der omfatter et XML-element for referencenummeret, som er mappet til tranid-feltet.";
    translation["ei.conversion.refnumexists"] =
        "En leverandørregning med det samme referencenummer findes allerede. Annuller dette dokument, og afsend et andet e-dokument med den korrekte referencenummerværdi for det XML-element, der er mappet til tranid-feltet.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Feltet vendorcode mangler i e-dokumentskabelonen. Modificer skabelonen, eller vælg en anden skabelon, der omfatter mapping af feltet vendorcode.";
    translation["ei.conversion.novendorcodevalue"] =
        "Mindst én af varerne har ingen leverandørkode. Annuller dette dokument, og afsend et andet e-dokument med den korrekte værdi for det XML-element, der er mappet til feltet for leverandørkode.";
    translation["ei.conversion.vendornamenotfound"] =
        "Feltet vendorname mangler i e-dokumentskabelonen. Modificer skabelonen, eller vælg en anden skabelon, der omfatter mapping af feltet vendorname.";
    translation["ei.conversion.novendornamevalue"] =
        "Mindst én af varerne har ingen leverandørnavn/-kode. Annuller dette dokument, og afsend et andet e-dokument med den korrekte værdi for det XML-element, der er mappet til feltet for leverandørnavn/-kode.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Recorden ({TRANSTYPE}#{TRANSID}) blev ikke fundet i systemet. Annuller dette dokument, og afsend et andet e-dokument med den korrekte værdi for det XML-element, der er mappet til feltet createdfrom.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Recorden ({TRANSTYPE}#{TRANSID}) er tildelt til en anden entitet. Vælg den korrekte entitet, og konverter dette e-dokument.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Leverandøren har ingen standard udgiftskonto, som er påkrævet for at konvertere regninger med udgifter. Sæt en værdi i feltet Standard udgiftskonto i leverandørrecorden for at fortsætte med konvertering.";
    translation["ei.conversion.nolinktopo"] =
        "Det indgående e-dokument har ingen vare eller udgift, der er medtaget i den refererede indkøbsordre. Tjek statussen for den refererede indkøbsordre for at se, om den kan konverteres. Hvis den kan konverteres, skal du annullere dette dokument og afsende et andet e-dokument med den korrekte værdi for det XML-element, der er mappet til feltet createdfrom.";
    translation["inbound.formtitle"] = "Konverter indgående e-dokumenter";
    translation["inbound.search"] = "Søg";
    translation["inbound.convert"] = "Konverter";
    translation["inbound.return"] = "Returner til Kriterier";
    translation["inbound.vendor"] = "Leverandør";
    translation["inbound.datefrom"] = "Dato oprettet fra";
    translation["inbound.dateto"] = "Dato oprettet til";
    translation["inbound.vendorhelp"] =
        "Vælg den leverandør, som skal have sine fejlede indgående e-dokumenter medtaget i søgeresultatet.";
    translation["inbound.datefromhelp"] =
        "Vælg en startdato for at definere en periode, hvor fejlede indgående e-dokumenter, der er oprettet inden for den periode, skal medtages i søgeresultatet.";
    translation["inbound.datetohelp"] =
        "Vælg en slutdato for at definere en periode, hvor fejlede indgående e-dokumenter, der er oprettet inden for den periode, skal medtages i søgeresultatet.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filtre til søgning efter fejlet indgående e-dokument";
    translation["inbound.sublist.sublistname"] =
        "Resultater af søgning efter fejlet indgående e-dokument";
    translation["inbound.sublist.internalid"] = "Intern id";
    translation["inbound.sublist.vendor"] = "Leverandør";
    translation["inbound.sublist.refnum"] = "Referencenummer";
    translation["inbound.sublist.ponum"] = "IO-nummer";
    translation["inbound.sublist.datecreated"] = "Dato oprettet";
    translation["inbound.sublist.edoctemplate"] = "E-dokumentskabelon";
    translation["inbound.msg.conversionongoing"] =
        "E-dokumentet konverteres i øjeblikket. Du modtager en e-mail, når processen er fuldført.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Du kan ikke udføre søgningen med de valgte kriterier, da konvertering af det indgående e-dokument allerede er i gang for datoområdet ({DATECREATED_FROM} - {DATECREATED_TO}). Du skal ændre dine søgekriterier eller prøve igen efter konvertering af dette e-dokument.";
    translation["inbound.invaliddates"] =
        "Dato oprettet fra må ikke ligge efter Dato oprettet til. Ændr datoerne, så Dato oprettet fra ligger før Dato oprettet til.";
    translation["inbound.configurefreecountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing SuiteApp i flere lande. For at massekonvertere e-dokumenter skal du kontakte kontoadministratoren for at få konfigureret E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["portlet.title"] = "Elektroniske dokumenter";
    translation["portlet.outboundforgeneration"] =
        "Udgående e-dokumenter til generering";
    translation["portlet.outboundforsending"] =
        "Udgående e-dokumenter til afsendelse";
    translation["portlet.outboundwitherrors"] =
        "Udgående e-dokumenter med fejl";
    translation["portlet.outboundsendinglink"] =
        "Send fejlede udgående e-dokumenter";
    translation["portlet.inboundforconversion"] =
        "Indgående e-dokumenter til konvertering";
    translation["portlet.inboundconvertfailed"] =
        "Konverter fejlede indgående e-dokumenter";
    translation["portlet.inboundincomplete"] =
        "Ufuldstændige indgående e-dokumenter";
    translation["portlet.inbounduploadlink"] = "Upload indgående e-dokument";
    translation["portlet.outboundforcertification"] =
        "Udgående e-dokumenter til certificering";
    translation["portlet.outboundcertifiedforsending"] =
        "Udgående e-dokumenter til afsendelse";
    translation["inbound.webservice.response.success"] =
        "Det indgående e-dokument med id: {ID} blev oprettet.";
    translation["inbound.webservice.response.novendor"] =
        "Ingen leverandør er knyttet til webtjeneste-id'en: {IDENTIFIER}. Sørg for, at den korrekte webtjeneste-id anvendes.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Det indgående e-dokument med id: {ID} blev oprettet. Flere leverandører er imidlertid knyttet til webtjeneste-id: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Det indgående e-dokument er ufuldstændigt, da den korrekte skabelon ikke kan fastlægges. Vælg en skabelon i den indgående e-dokumentrecord, eller konfigurer XSD'en i e-dokumentskabelonen for at aktivere automatisk valg af skabelon.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Det indgående e-dokument er ufuldstændigt, da den korrekte leverandør ikke kan fastlægges. Vælg en leverandør i den indgående e-dokumentrecord, eller sæt webtjeneste-id'en i den tilknyttede leverandørrecord.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Følgende nøgler mangler: {KEYS}, som du skal angive i webtjenesteanmodningen.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Brødteksten i webtjenesteanmodningen skal være et JSON-objekt eller en array af JSON-objekter vha. Content-Type: 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Følgende e-dokumentmodtagere har ikke en e-mailadresse i deres kontaktrecords: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Der er ingen e-dokumentmodtagere for denne transaktion. For at sende e-dokumenter pr. e-mail skal mindst én kontakt føjes til listen over e-dokumentmodtagere.";
    translation["transaction.maxrecipientexceeded"] =
        "Antallet af e-mailmodtagere, som du tilføjede, har overskredet grænsen. Du kan maksimalt tilføje 10 e-mailmodtagere.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Kun følgende transaktionstyper behandles:";
    translation["ei.prefs.formtitle"] = "Præferencer til e-dokument";
    translation["ei.prefs.information.about.certify.skip"] =
        "Trinnet Certificer overspringes, hvis afsendelsesmetoden Certificering ikke er defineret eller gælder for transaktionen.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automatisk e-fakturering";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Automatiseringstype til e-dokument";
    translation["ei.prefs.text.option.comb.disabled"] = "Deaktiver";
    translation["ei.prefs.text.option.comb.gcs"] = "Generer, certificer, send";
    translation["ei.prefs.text.option.comb.gc"] = "Generer, certificer";
    translation["ei.prefs.text.option.comb.cs"] = "Certificer, send";
    translation["ei.prefs.btn.label.cancel"] = "Annuller";
    translation["ei.prefs.btn.label.save"] = "Gem";
    translation["ei.prefs.msg.confirm.save"] =
        "Vil du gemme ændringerne af præferencer til e-dokument?";
    translation["ei.prefs.msg.success.save"] =
        "Præferencer til e-dokument er gemt.";
    translation["ei.prefs.msg.failed.save"] =
        "Præferencer til e-dokument blev ikke gemt.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Tilladelse til adgang til denne side er begrænset. Kontakt administrator for at anmode om adgang.";
    translation["ei.eip.msg.completed"] = "Behandling af e-dokument fuldført.";
    translation["ei.eip.msg.failed"] =
        "Behandling af e-dokument fejlede. Se E-Document Audit Trail for at få flere detaljer.";
    translation["ei.eip.msg.processing"] =
        "E-dokumentet er ved at blive behandlet.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "E-dokumentet er allerede ved at blive behandlet.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps License Client er ikke tilgængelig i din konto. Installer denne SuiteApp for at få adgang til alle Electronic Invoicing-funktioner.";
    translation["outbound.formtitle"] = "Send fejlede e-dokumenter";
    translation["outbound.search"] = "Søg";
    translation["outbound.send"] = "Send";
    translation["outbound.return"] = "Returner til Kriterier";
    translation["outbound.customer"] = "Kunde";
    translation["outbound.vendor"] = "Leverandør";
    translation["outbound.subsidiary"] = "Datterselskab";
    translation["outbound.type"] = "Transaktionstype";
    translation["outbound.datefrom"] = "Transaktionsdato fra";
    translation["outbound.dateto"] = "Transaktionsdato til";
    translation["outbound.subshelp"] =
        "Vælg et datterselskab for kun at vise transaktioner, der hører til datterselskabet.";
    translation["outbound.custhelp"] =
        "Vælg en kunde for kun at vise de transaktioner, der hører til den kunde. Hvis ingen kunde er valgt, vil søgeresultaterne vise alle transaktioner, der hører til datterselskabet uanset kunden.";
    translation["outbound.vendorhelp"] =
        "Vælg en leverandør for kun at vise de transaktioner, der hører til den leverandør. Hvis ingen leverandør er valgt, vil søgeresultaterne vise alle transaktioner, der hører til datterselskabet uanset leverandøren.";
    translation["outbound.entitytypehelp"] =
        "Vælg entitetstypen Kunde eller Leverandør. Derved aktiveres den tilhørende rulleliste nedenfor.";
    translation["outbound.typehelp"] =
        "Vælg en eller flere transaktionstyper til hvert e-dokument, som du vil sende. Tryk og hold Ctrl-tasten nede, mens du vælger hver transaktionstype, hvis du vil vælge flere transaktionstyper.<br /><br />Hvis ingen transaktionstype er valgt, vil søgeresultaterne vise alle e-dokumenter, der er klar til afsendelse uanset transaktionstypen.";
    translation["outbound.datefromhelp"] =
        "Vælg en dato for at definere begyndelsen af datoområdet, hvis du vil se en liste over transaktioner, der er oprettet inden for et bestemt datoområde.";
    translation["outbound.datetohelp"] =
        "Vælg en dato for at definere slutningen af datoområdet, hvis du vil se en liste over transaktioner, der er oprettet inden for et bestemt datoområde.";
    translation["outbound.entityfieldgroup"] = "Entitetssøgefiltre";
    translation["outbound.filtersfieldgroup"] = "Transaktionssøgefiltre";
    translation["outbound.entitytypeinlinehelp"] = "Vælg entitetstype:";
    translation["outbound.invalidtypetitle"] = "Ugyldige transaktionstyper";
    translation["outbound.invalidtype"] =
        "Følgende transaktionstyper understøttes ikke i øjeblikket: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Følgende transaktionstyper er ikke gyldige til den valgte entitet: {TRANSACTIONTYPES}. Vælg de relevante transaktionstyper til den entitet, som du har valgt.";
    translation["outbound.invaliddates"] =
        "Transaktionsdato fra må ikke ligge efter Transaktionsdato til. Ændr datoerne, så Transaktionsdato fra ligger før Transaktionsdato til.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Du kan ikke udføre søgningen med de valgte kriterier, da afsendelse af e-dokument allerede er i gang for transaktioner inden for datoområdet ({TRANDATE_FROM} - {TRANDATE_TO}) for datterselskabet ({SUBSIDIARY}). Du skal ændre dine søgekriterier eller prøve igen efter afsendelse af dette e-dokument.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Du kan ikke udføre søgningen med de valgte kriterier, da afsendelse af e-dokument allerede er i gang for transaktioner inden for datoområdet ({TRANDATE_FROM} - {TRANDATE_TO}). Du skal ændre dine søgekriterier eller prøve igen efter afsendelse af dette e-dokument.";
    translation["outbound.sublist.trannum"] = "Transaktionsnummer";
    translation["outbound.sublist.trantype"] = "Transaktionstype";
    translation["outbound.sublist.customer"] = "Kunde";
    translation["outbound.sublist.vendor"] = "Leverandør";
    translation["outbound.sublist.subsidiary"] = "Datterselskab";
    translation["outbound.sublist.trandate"] = "Transaktionsdato";
    translation["outbound.sublist.memo"] = "Note";
    translation["outbound.sublist.template"] = "Skabelon";
    translation["outbound.sublist.sendingmethod"] = "Afsendelsesmetode";
    translation["outbound.sublist.sublistname"] =
        "Resultater af fejlede udgående e-dokumenter, der skal sendes";
    translation["outbound.msg.sendingongoing"] =
        "E-dokumentet er ved at blive sendt. Du modtager en e-mail, når processen er fuldført.";
    translation["outbound.configurefreecountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande. For at massesende e-dokumenter skal du kontakte kontoadministratoren for at få konfigureret E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["outbound.entitysend"] = "Send til entitet";
    translation["outbound.certifysend"] = "Send til certificering";
    translation["outbound.sendingtypehelp"] =
        "Vælg Send til entitet eller Send til certificering. Tilhørende transaktioner til afsendelse opstilles.";
    translation["customer.noemail"] =
        "Der er ingen e-mailadresse for denne kunde. Indtast en gyldig e-mailadresse til kunderecorden for at muliggøre afsendelse af e-dokumenter pr. e-mail.";
    translation["customer.contactnoemail"] =
        "Følgende e-dokumentmodtagere har ikke en e-mailadresse på deres kontaktrecords: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Der er ingen e-dokumentmodtagere for denne kunde. For at sende elektroniske dokumenter pr. e-mail til denne kunde skal mindst én kontakt føjes til listen over e-dokumentmodtagere.";
    translation["customer.arrayrequired"] =
        "Kontakter-array påkrævet til validering.";
    translation["customer.parameternotarray"] =
        "Parameteren Kontakter er ikke en array.";
    translation["customer.maxrecipientexceeded"] =
        "Du har overskredet det maksimale antal e-mailmodtagere. Vælg et maksimum på kun 10 e-mailmodtagere.";
    translation["vendor.noemail"] =
        "Der er ingen e-mailadresse for denne leverandør. Indtast en gyldig e-mailadresse til leverandørrecorden for at muliggøre afsendelse af e-dokumenter pr. e-mail.";
    translation["vendor.contactnoemail"] =
        "Følgende e-dokumentmodtagere har ikke en e-mailadresse på deres kontaktrecords: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Der er ingen e-dokumentmodtagere for denne leverandør. For at sende elektroniske dokumenter pr. e-mail til denne leverandør skal mindst én kontakt føjes til listen over e-dokumentmodtagere.";
    translation["vendor.maxrecipientexceeded"] =
        "Du har overskredet det maksimale antal e-mailmodtagere. Vælg et maksimum på kun 10 e-mailmodtagere.";
    translation["vendor.nosenders"] =
        "Der er ingen e-mailafsender af e-dokument for denne leverandør. Du skal indtaste mindst én e-mailadresse i listen E-mailafsender af e-dokument for leverandør for at modtage e-dokumenter via e-mail fra denne leverandør.";
    translation["vendor.existingsender"] =
        "Afsenderens e-mailadresse findes allerede.";
    translation["vendor.existingdomain"] =
        "Afsenderens e-mailadomæne anvendes allerede af en anden leverandør.";
    translation["vendor.existingidentifier"] =
        "Webtjeneste-id'en anvendes allerede af en anden leverandør. Indtast en anden webtjeneste-id.";
    translation["customeremailrecipient.contextunsupported"] =
        "E-mailmodtager af e-dokument for kunde understøtter kun følgende kontekster: UI, CSV, SuiteScript og webtjenester.";
    translation["vendoremailrecipient.contextunsupported"] =
        "E-mailmodtager af e-dokument for leverandør understøtter kun følgende kontekster: UI, CSV, SuiteScript og webtjenester.";
    translation["vendoremailsender.contextunsupported"] =
        "E-mailafsender af e-dokument for leverandør understøtter kun følgende kontekster: UI, CSV, SuiteScript og webtjenester.";
    translation["template.incorrectregex"] =
        "REGEX-feltet indeholder et forkert almindeligt udtryk. Korrekt syntaks skal anvendes.";
    translation["template.invalidjson"] =
        "Du angav ikke en korrekt udformet JSON i feltet Skabelon til udgående e-dokumenter. Klik på OK for at fortsætte eller på Annuller for at forblive på den aktuelle side.";
    translation["template.invalidxml"] =
        "XML-skabelonen indeholder fejl. XML-format skal være korrekt udformet.";
    translation["template.templaterequired"] =
        "Skabelonindholdet mangler til den valgte udgående transaktionstype. Angiv gyldigt XML- eller JSON-skabelonindhold i feltet Udgående e-dokumenter, og prøv dernæst igen.";
    translation["template.mappingrequired"] =
        "Du valgte en indgående transaktionstype, men JSON-indholdet i feltmappingen mangler. Indtast JSON-indholdet i feltet Feltmapping til indgående e-dokumenter.";
    translation["template.templateorjsonrequired"] =
        "Der er manglende feltværdier. Til en udgående transaktion skal du angive gyldigt XML- eller JSON-indhold i feltet Skabelon til udgående e-dokumenter. Til en indgående transaktion skal du angive JSON-indhold i feltet Feltmapping til indgående e-dokument.";
    translation["template.invalidxsdfile"] =
        "Den valgte XSD-fil er ikke en gyldig XSD-fil. Sørg for, at den fil, som du vælger, har filtypenavnet .xsd.";
    translation["template.contextunsupported"] =
        "E-dokumentskabelon understøtter kun UI- og SuiteScript-kontekster.";
    translation["template.supportedtranstypefldhelp"] =
        "Vælg en eller flere transaktionstyper, der skal understøttes af denne skabelon. Tryk og hold Ctrl-tasten nede, mens du vælger transaktionstyperne, hvis du vil vælge flere transaktionstyper.<br /><br />Hvis transaktionstyper ikke kan vælges, betyder det, at skabelonen allerede er tildelt til en eller flere transaktionsrecords med den samme transaktionstype. Fjern skabelonen fra transaktionsrecorden for at muliggøre valg af transaktionstype.<br /><br />Du kan også tildele denne skabelon til indgående e-dokumenter, og hvis du gør det, deaktiveres feltet Transaktionstype.";
    translation["template.eistatus"] =
        "Begræns redigering af transaktioner med e-dokumentstatus";
    translation["template.supportedeistatusfieldhelp"] =
        "Transaktioner med den e-dokumentstatus, som du valgte, vil ikke kunne redigeres, når denne skabelon er knyttet til dem. Du kan vælge flere e-dokumentstatusser.";
    translation["template.invalidschemaordependency"] =
        "Skema er en forkert struktureret XSD, eller det afhængige skema kan ikke findes.";
    translation["template.xmldoesnotconformtoschema"] =
        "XML'en af skabelonen overholder ikke angivet XSD eller skema.";
    translation["template.xmldomexception"] =
        "XML-inputstrengen er forkert udformet.";
    translation["template.missingreqdargument"] =
        "XSD'en til udgående validering mangler.";
    translation["template.xsdvalidationexception"] =
        "Ukendt undtagelse opstod under XSD-validering.";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD-skemamappe er ugyldig eller mangler.";
    translation["invoice.generatebtn"] = "Generer e-dokument";
    translation["invoice.sendbtn"] = "Send e-dokument";
    translation["invoice.sendcertifybtn"] = "Certificer e-dokument";
    translation["invoice.eipbtn"] = "Behandl e-dokument";
    translation["invoice.loguntagged"] =
        "E-dokumentskabelon blev fjernet. Tags i transaktion er ophævet til generering af e-dokument.";
    translation["invoice.logforgenerate"] =
        "Transaktionen er klar til generering af e-dokument.";
    translation["invoice.invalidtemplatesub"] =
        "Transaktionens datterselskab er ikke gyldigt til den valgte e-dokumentskabelon. Vælg en anden e-dokumentskabelon.";
    translation["invoice.templateremovalerror"] =
        "Fjernelse af e-dokumentskabelonen for sendte e-dokumenter er ikke tilladt.";
    translation["ei.sending.currentlysending"] =
        "E-dokumentet er ved at blive sendt. Det kan tage et par minutter at fuldføre. Du må ikke afbryde processen ved at klikke på knappen Send e-dokument igen. Siden bliver genindlæst, når e-dokumentet er afsendt.";
    translation["ei.sending.notready"] =
        "Dette e-dokument er ikke klar til afsendelse. Du skal først klikke på Generer e-dokument for at generere et e-dokument.";
    translation["ei.sending.alreadysent"] =
        "Denne transaktion var allerede sendt.";
    translation["ei.sending.norecipients"] =
        "E-dokumentet kan ikke sendes, da kunden ikke har nogen e-dokumentmodtagere. Før du kan sende dette e-dokument pr. mail, skal e-dokumentmodtagere først vælges på kunderecorden.";
    translation["ei.sending.indivcustnoemail"] =
        "E-dokumentet kan ikke sendes, da kunden ikke har nogen e-mailadresse. Før du kan sende dette e-dokument pr. mail, skal en e-mailadresse angives på kunderecorden.";
    translation["ei.sending.norecipients.vendor"] =
        "E-dokumentet kan ikke sendes, da leverandøren ikke har nogen e-dokumentmodtagere. Før du kan sende dette e-dokument pr. mail, skal e-dokumentmodtagere først vælges på leverandørrecorden.";
    translation["ei.sending.indivvendnoemail"] =
        "E-dokumentet kan ikke sendes, da leverandøren ikke har nogen e-mailadresse. Før du kan sende dette e-dokument pr. mail, skal en e-mailadresse angives på leverandørrecorden.";
    translation["ei.sending.invalidmethod"] =
        "Vælg en gyldig afsendelsesmetode til {TYPE} #{INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Afsender: {SENDER}\nModtagere: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "E-dokumentafsenderen ({EMPLOYEENAME}) har ingen e-mailadresse. Indtast en gyldig e-mailadresse på medarbejderrecorden.";
    translation["ei.sending.recipientnoemail"] =
        "En eller flere modtagere af det e-dokument, der er knyttet til denne transaktion, har ikke en e-mailadresse. Verificer, at modtagerne for denne kunde har gyldige e-mailadresser.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "En eller flere modtagere af det e-dokument, der er knyttet til denne transaktion, har ikke en e-mailadresse. Verificer, at modtagerne for denne leverandør har gyldige e-mailadresser.";
    translation["ei.sending.defaulterror"] =
        "Der opstod en fejl under afsendelse af e-dokumentet. Tjek e-dokumentrevisionssporet på underfanen E-dokument for at få detaljer.";
    translation["ei.sending.inactivecustomer"] =
        "Kan ikke sende e-dokumentet for denne transaktion, da den valgte kunde er inaktiv. Feltet E-dokumentstatus er ikke blevet opdateret, og et revisionsspor er ikke blevet oprettet. Ryd feltet Inaktiv på kunderecorden, og prøv dernæst at sende e-dokumentet igen.";
    translation["ei.sending.inactivevendor"] =
        "Kan ikke sende e-dokumentet for denne transaktion, da den valgte leverandør er inaktiv. Feltet E-dokumentstatus er ikke blevet opdateret, og et revisionsspor er ikke blevet oprettet. Ryd feltet Inaktiv på leverandørrecorden, og prøv dernæst at sende e-dokumentet igen.";
    translation["ei.sending.msg.processcomplete"] =
        "E-dokumentet er blevet sendt.";
    translation["ei.sending.configurefreecountry"] =
        "Din konto skal have en aktiv licens til at benytte Electronic Invoicing i flere lande. For at massesende e-dokumenter til et enkelt land skal du vælge landet i feltet E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transaktioner med inaktive kunder understøttes ikke af e-dokumentet.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transaktioner med inaktive leverandører understøttes ikke af e-dokument.";
    translation["ei.sending.certification.defaulterror"] =
        "Der opstod en fejl under certificering af e-dokumentet. Tjek e-dokumentrevisionssporet på underfanen E-dokument for at få detaljer.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "E-dokumentet er sendt til certificering.";
    translation["ei.generation.generationlogbulk"] =
        "E-dokumentet blev massegenereret vha. e-dokumentskabelonen '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "E-dokumentet blev genereret vha. e-dokumentskabelonen '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "E-dokumentet og PDF-filen blev massegenereret vha. e-dokumentskabelonen '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "E-dokumentet og PDF-filen blev genereret vha. e-dokumentskabelonen '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "E-dokumentet blev massegenereret vha. e-dokumentskabelonen '{TEMPLATENAME}'. Den tidligere genererede PDF-fil af denne transaktion blev slettet.";
    translation["ei.generation.generationremovedpdflog"] =
        "E-dokumentet blev genereret vha. e-dokumentskabelonen '{TEMPLATENAME}'. Den tidligere genererede PDF-fil af denne transaktion blev slettet.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Massegenereringsproces\nE-dokumentskabelon anvendt: {TEMPLATENAME}\nFejldetaljer: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "E-dokumentskabelon anvendt: {TEMPLATENAME}\nFejldetaljer: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Der opstod en fejl under generering. Tjek e-dokumentrevisionssporet på underfanen E-dokument for at få detaljer.";
    translation["ei.generation.inactivecustomer"] =
        "Kan ikke generere et e-dokument for denne transaktion, da den valgte kunde er inaktiv. Feltet E-dokumentstatus er ikke blevet opdateret, og et revisionsspor er ikke blevet oprettet. Ryd feltet Inaktiv på kunderecorden, og prøv dernæst at generere e-dokumentet igen.";
    translation["ei.generation.inactivevendor"] =
        "Kan ikke generere et e-dokument for denne transaktion, da den valgte leverandør er inaktiv. Feltet E-dokumentstatus er ikke blevet opdateret, og et revisionsspor er ikke blevet oprettet. Ryd feltet Inaktiv på leverandørrecorden, og prøv dernæst at generere e-dokumentet igen.";
    translation["ei.generation.msg.processcomplete"] =
        "E-dokumentet er blevet genereret.";
    translation["ei.generation.configurefreecountry"] =
        "Din konto skal have en aktiv licens til at benytte Electronic Invoicing i flere lande. For at massegenerere e-dokumenter til et enkelt land skal du vælge landet i feltet E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transaktioner med inaktive kunder understøttes ikke af e-dokumentet.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transaktioner med inaktive leverandører understøttes ikke af e-dokument.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "E-dokumentet er genereret og digitalt signeret.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Generering fejlede, da det resulterende dokument hverken er et korrekt udformet XML eller et korrekt udformet JSON.";
    translation["notify.batchownersubject"] =
        "Afsendelse af e-dokument afsluttet";
    translation["notify.batchownerbody"] =
        "Hej <br/><br/>Din anmodning om at sende e-dokumenter er afsluttet.<br/>{SENT} ud af {TOTAL} blev sendt. Se den vedhæftede fil for detaljer. <br/><br/>Tak<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "E-dokument genereret til IO-nr. {PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-dokument genereret fra {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Til lykke! <br /><br />{MESSAGE}<br />Se vedhæftet for e-dokumentfilen.<br /><br />Tak<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Fejl fundet under generering af e-dokument";
    translation["notify.generationerrorbody"] =
        "Fejl blev fundet under generering af e-dokument.<br/>Se den vedhæftede fil for listen over transaktioner og fejldetaljer.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Et e-dokument er allerede sendt til denne transaktion. Generering af et nyt e-dokument vil overskrive det tidligere e-dokument. Er du sikker på, at du vil generere et nyt e-dokument?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Fjernelse af e-dokumentskabelonen for sendte e-dokumenter er ikke tilladt.";
    translation["transaction.msg.generate.information"] =
        "Generering af dette e-dokument er i gang.";
    translation["transaction.msg.send.information"] =
        "Afsendelse af dette e-dokument er i gang.";
    translation["transaction.msg.send.certify.information"] =
        "Certificering af dette e-dokument er i gang.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Generering af dette e-dokument er allerede i gang.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Afsendelse af dette e-dokument er allerede i gang.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Certificering af dette e-dokument er allerede i gang.";
    translation["transaction.msg.uncheckpdf"] =
        "En PDF-fil af denne transaktion blev oprettet under den sidste generering af e-dokument. Hvis du rydder dette felt, slettes den PDF-fil i den næste generering af e-dokument.";
    translation["transaction.msg.nofreecountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande. For at generere et e-dokument til denne transaktion skal du kontakte kontoadministratoren for at få angivet et land i feltet E-dokumentland til gratis anvendelse på siden Firmaoplysninger.";
    translation["transaction.msg.otherbillingcountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande. For at generere et e-dokument til denne transaktion skal du kontakte din NetSuite-kontoansvarlige for at få købt en licens.";
    translation["transaction.msg.nobillingcountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande. For at generere et e-dokument til denne transaktion skal du angive regningsadressen til denne transaktion.";
    translation["transaction.msg.noshippingcountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande. For at generere et e-dokument til denne transaktion skal du angive forsendelsesadressen til denne transaktion.";
    translation["transaction.msg.nocustomercountry"] =
        "Denne konto har ikke en aktiv licens til at benytte Electronic Invoicing til flere lande. For at generere et e-dokument til denne transaktion skal du angive en standard regningsadresse til kunden for denne transaktion.";
    translation["transaction.msg.blockededittransaction"] =
        "Redigering af transaktionen er blokeret til aktuel e-dokumentstatus. Se den vedhæftede EI-skabelon.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Ændring af værdien i feltet Indholdstype fra XML til en anden type vil fjerne alle XML-validatorer. Er du sikker på, at du vil ændre indholdstypen?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Kun validatorer til XML-indholdstype kan tilføjes.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Denne validator findes allerede i listen.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Validatorer til e-dokumentskabelon understøtter kun UI- og SuiteScript-kontekster.";
    translation["standarddocument.default.alreadyexist"] =
        "Recorden {DEFAULT_DOCUMENT_STANDARD} findes allerede. Du kan ikke oprette en dokumentpakkerecord med det samme navn. Omdøb recorden, og prøv igen.";
    translation["standarddocument.default.editnotallowed"] =
        "Redigering af navnet på eller beskrivelsen af recorden {DEFAULT_DOCUMENT_STANDARD} er ikke tilladt.";
    translation["standarddocument.default.deletenotallowed"] =
        "Sletning af recorden {DEFAULT_DOCUMENT_STANDARD} er ikke tilladt.";
    translation["standarddocument.contextunsupported"] =
        "E-dokumentpakke understøtter UI, CSV-import og SuiteScript-kontekster.";
    translation["sendingmethod.default.alreadyexist"] =
        "Afsendelsesmetoderecorden {DEFAULT_SENDING_METHOD_NAME} findes allerede. Du kan ikke oprette en afsendelsesmetoderecord med det samme navn. Omdøb recorden, og prøv igen.";
    translation["sendingmethod.default.editnotallowed"] =
        "Redigering af afsendelsesmetoderecorden {DEFAULT_SENDING_METHOD_NAME} er ikke tilladt.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Sletning af afsendelsesmetoderecorden {DEFAULT_SENDING_METHOD_NAME} er ikke tilladt.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Feltet Transaktionstype er blevet deaktiveret, da denne afsendelsesmetode er tildelt til en eller flere transaktionsrecords. For at redigere denne afsendelsesmetode skal du fjerne afsendelsesmetoden fra transaktionsrecorden for at aktivere feltet Transaktionstype og dernæst prøve igen.";
    translation["sendingmethod.contextunsupported"] =
        "E-dokumentafsendelsesmetode understøtter kun UI- og SuiteScript-kontekster.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Vælg en eller flere transaktionstyper, der skal understøttes af denne afsendelsesmetode. Tryk og hold Ctrl-tasten nede, mens du vælger transaktionstyperne, hvis du vil vælge flere transaktionstyper.<br /><br />Hvis en eller flere transaktionstyper ikke kan vælges, er afsendelsesmetoden blevet tildelt til en eller flere transaktionsrecords med den transaktionstype. Du skal først fjerne afsendelsesmetoden fra transaktionsrecorden for at muliggøre valg af transaktionstypen.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementering af plug-in til e-dokumentafsendelsesmetode";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Vælg en implementering af plug-in til afsendelsesmetode";
    translation["sendingmethod.scriptbannermessage"] =
        "Afsendelsesmetoder skal være tilpassede plug-in-implementeringer. Opret eksisterende afsendelsesmetodescripts igen som nye tilpassede plug-in-implementeringer af typen &quot;Plug-in til afsendelse&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Implementering af plug-in til tilpasset datakilde";
    translation["customdatasource.pluginimplementationhelp"] =
        "Vælg implementeringen af plug-in til tilpasset datakilde";
    translation["digitalsignature.pluginimplementation"] =
        "Implementering af plug-in til digital signatur";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Vælg en plug-in-implementering. Dette felt er påkrævet, hvis du vil signere e-dokumenter digitalt.";
    translation["digitalsignature.identifierlabel"] =
        "Dette e-dokument er digitalt signeret";
    translation["digitalsignature.successlog"] =
        "Det genererede e-dokument er digitalt signeret.";
    translation["digitalsignature.failurelog"] =
        "Det genererede e-dokument er ikke digitalt signeret.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Implementering af plug-in til digital signatur returnerede fejlstatus.";
    translation["digitalsignature.plugininvalidresult"] =
        "Det resultat, der blev returneret fra implementering af plug-in til digital signatur, er ikke gyldigt.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementering af plug-in til indgående tilpasset datakilde";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Vælg en implementeringen af plug-in til indgående tilpasset datakilde.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Resultatet af implementering af plug-in til indgående tilpasset datakilde er ugyldigt.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementering af plug-in til udgående validering";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Vælg en implementering af plug-in til validering af udgående e-dokument. Dette validerer udgående e-dokumenter.";
    translation["outboundvalidation.successlog"] =
        "Udgående validering gennemført.";
    translation["outboundvalidation.failurelog"] =
        "Udgående validering fejlede.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Implementering af plug-in til udgående validering returnerede fejlstatus.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Resultatet fra implementering af plug-in til udgående validering er ugyldigt.";
    translation["template.msg.cannotedittransactiontype"] =
        "Feltet Transaktionstype er blevet deaktiveret, da denne skabelon allerede er tildelt til en eller flere transaktionsrecords. For at redigere denne skabelon skal du fjerne skabelonen fra transaktionsrecorden for at aktivere feltet Transaktionstype og dernæst prøve igen. Du kan også tildele denne skabelon til indgående e-dokumenter, og det vil deaktivere feltet Transaktionstype.";
    translation["template.msg.forcetocopymessage"] =
        "Du kan ikke redigere standard e-dokumentskabelonen. Du kan kopiere den vha. muligheden Lav kopi under Handlinger eller oprette en ny.";
    translation["template.msg.warningoneditmessage"] =
        "Dette er en standard e-dokumentskabelon. Ændringer, der er foretaget af denne skabelon, vil gå tabt eller blive overskrevet, når SuiteApp'en opdateres.";
    translation["email.batchownernotification.subject"] =
        "Afsendelse af e-dokument afsluttet";
    translation["email.batchownernotification.body"] =
        "Hej <br/><br/>Dine e-dokumenter er blevet sendt.<br/>{SENT} ud af {TOTAL} blev sendt. Se den vedhæftede fil for detaljer. <br/><br/>Tak<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Konvertering af e-dokument afsluttet";
    translation["email.batchownerconvertnotification.body"] =
        "Hej <br/><br/>Dine e-dokumenter er blevet konverteret.<br/>{CONVERTED} ud af {TOTAL} blev konverteret. Se den vedhæftede fil for detaljer. <br/><br/>Tak<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-dokument genereret til IO-nr. {PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-dokument fra {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "E-dokument genereret til {TRANTYPE}-nr. {TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Til lykke! <br /><br />E-dokumentet til IO-nr. {PONUM} er blevet genereret.<br />Se den vedhæftede e-dokumentfil for detaljer.<br /><br />Tak<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Til lykke! <br /><br />E-dokumentet til {TYPE}-nr. {TRANID} er blevet genereret.<br />Se den vedhæftede e-dokumentfil for detaljer.<br /><br />Tak<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Fejl fundet under generering af e-dokument";
    translation["email.generationerrornotification.body"] =
        "Fejl blev fundet under generering af e-dokument.<br/>Se den vedhæftede fil for listen over transaktioner og fejldetaljer.";
    translation["email.sendingerrornotification.subject"] =
        "Fejl fundet under afsendelse af e-dokument";
    translation["email.sendingerrornotification.body"] =
        "Fejl blev fundet under afsendelse af e-dokument.<br/>Se den vedhæftede fil for listen over transaktioner og fejldetaljer.";
    translation["email.webserviceerror.subject"] =
        "Webtjenesteunderretning om indgående e-dokument";
    translation["email.webserviceerror.body"] =
        "<p>Hej</p><p>Fejl blev fundet under behandling af indgående dokument vha. webtjeneste.<br/>Se følgende detaljer.</p>{DETAIL_TABLE}<p>Tak<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Transaktionsnummer";

    return translation;
});
