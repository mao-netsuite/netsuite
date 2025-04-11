define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detaljer";
    translation["email.attachment.collabel.transactiontype"] =
        "Transaksjonstype";
    translation["email.attachment.collabel.internalid"] = "Intern ID";
    translation["email.attachment.collabel.vendor"] = "Leverandør";
    translation["email.conversionerrornotification.subject"] =
        "Feil oppstod under konvertering av innkommende e-dokument";
    translation["email.conversionerrornotification.body"] =
        "Det oppstod feil ved konvertering av det innkommende e-dokumentet.<br/>Se den vedlagte filen for listen over oppføringer med feil og tilhørende detaljer.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Merknad: Hvis du vil at en annen bruker skal motta varslingene i stedet for kontoadministratorer, må du angi brukerens e-postadresse i feltet Mottaker av e-dokumentvarslinger i overordnet datterselskapsoppføring.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID for innkommende e-dokument";
    translation["email.table.collabel.details"] = "Detaljer";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Det oppstod feil under kontroll av lisensen for kontoen";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land.</br>Hvis du vil behandle e-dokumenter i bulk, kan du konfigurere feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["inboundedocument.logforconversion"] =
        "Det innkommende e-dokumentet er klar for konvertering.";
    translation["inboundedocument.logincomplete"] =
        "Det innkommende e-dokumentet er ufullstendig. Ingen {FIELD} ble valgt.";
    translation["inboundedocument.deletenotallowed"] =
        "Det er ikke tillatt å slette et innkommende e-dokument.";
    translation["inboundedocument.copynotallowed"] =
        "Det er ikke tillatt å kopiere et innkommende e-dokument.";
    translation["inboundedocument.contextunsupported"] =
        "Innkommende e-dokument støtter kun brukergrensesnitt og SuiteScript-sammenhenger.";
    translation["inboundedocument.invalidxmlfile"] =
        "Den valgte XML-filreferansen er ikke en gyldig XML-fil. Kontroller at filen du velger, har .xml-utvidelsen.";
    translation["inboundedocument.invalidpdffile"] =
        "Den valgte PDF-filreferansen er ikke en gyldig PDF-fil. Kontroller at filen du velger, har .pdf-utvidelsen.";
    translation["inboundedocument.invalidxml"] =
        "Den valgte XML-filreferansen er ikke et korrekt utformet XML-dokument.";
    translation["inboundedocument.convert.button"] = "Konverter";
    translation["inboundedocument.convert.information"] =
        "Konvertering av dette innkommende e-dokumentet pågår.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Konvertering av dette innkommende e-dokumentet er allerede i gang.";
    translation["inboundedocument.cancel.button"] = "Kanseller e-dokument";
    translation["inboundedocument.cancel.confirmation"] =
        "Er du sikker på at du vil kansellere dette innkommende e-dokumentet?";
    translation["inboundedocument.cancel.failed"] =
        "Kansellering mislyktes fordi statusen for den innkommende e-dokumentoppføringen er {STATUS}";
    translation["inboundedocument.cancel.defaulterror"] =
        "Det oppstod en feil under kansellering. Sjekk revisjonssporet for e-dokument på underfanen for e-dokument for detaljer.";
    translation["inboundedocument.cancel.complete"] =
        "E-dokumentet er kansellert.";
    translation["inboundedocument.preview.button"] = "Vis XML-fil";
    translation["inboundedocument.msg.nofreecountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av SuiteApp-en Electronic Invoicing i flere land. Hvis du vil konvertere dette e-dokumentet til en transaksjon, kan du kontakte kontoadministratoren din for å angi et land i feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av SuiteApp-en Electronic Invoicing i flere land. For å konvertere dette e-dokumentet til en transaksjon, ta kontakt med din NetSuite-kontoansvarlige for å kjøpe en lisens.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av SuiteApp-en Electronic Invoicing i flere land. For å konvertere dette e-dokumentet til en transaksjon, må du konfigurere standard faktureringsadresse til den valgte leverandøren.";
    translation["validationplugin.contextunsupported"] =
        "Plugin for validering av innkommende e-dokument støtter kun brukergrensesnitt og SuiteScript-sammenhenger.";
    translation["validationplugin.pluginimplementation"] =
        "Implementering av plugin for innkommende e-dokumentvalidering";
    translation["validationplugin.pluginimplementationhelp"] =
        "Velg en plugin-implementering for validering av innkommende e-dokument.";
    translation["validationplugin.scriptbannermessage"] =
        "Validering av innkommende e-dokument bør være tilpassede plugin-implementeringer. Gjenopprett eksisterende valideringsskript som nye tilpassede plugin-implementeringer av typen «Plugin for validering av innkommende»";
    translation["ei.conversion.defaulterror"] =
        "Det oppstod en feil under konverteringen. Sjekk revisjonssporet for e-dokument på underfanen for e-dokument for detaljer.";
    translation["ei.conversion.inactivevendor"] =
        "Kan ikke konvertere dette innkommende e-dokumentet fordi den valgte leverandøren er inaktiv. E-dokumentstatusfeltet er ikke blitt oppdatert, og et revisjonsspor er ikke opprettet. Fjern merket i Inaktiv-ruten på leverandøroppføringen, og prøv å konvertere e-dokumentet på nytt.";
    translation["ei.conversion.inactivecustomer"] =
        "Kan ikke konvertere dette innkommende e-dokumentet fordi den valgte kunden er inaktiv. E-dokumentstatusfeltet er ikke blitt oppdatert, og et revisjonsspor er ikke opprettet. Fjern merket i Inaktiv-ruten på kundeoppføringen, og prøv å konvertere e-dokumentet på nytt.";
    translation["ei.conversion.conversioncomplete"] =
        "E-dokumentet er konvertert.";
    translation["ei.conversion.conversionlogbulk"] =
        "Det innkommende e-dokumentet ble inkludert i massekonverteringen og ble konvertert til transaksjonen med den interne ID-en {INTERNALID} av typen {TYPE}.";
    translation["ei.conversion.conversionlog"] =
        "Det innkommende e-dokumentet ble konvertert til transaksjonen med den interne ID-en {INTERNALID} av typen {TYPE}";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Massekonverteringsprosess\nE-dokumentmalen som ble brukt: {TEMPLATENAME}\nFeilomfang: {ERRORSCOPE}\n:Feildetaljer: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "E-dokumentmalen som ble brukt: {TEMPLATENAME}\nFeilomfang: {ERRORSCOPE}\n:Feildetaljer: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Analysefeil. Sjekk felttilordning for innkommende e-dokumenter.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Konverteringsfeil.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Valideringsfeil.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Konverteringen mislyktes fordi statusen for den innkommende e-dokumentoppføringen er {STATUS}";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Innkommende e-dokumenter med inaktive kunder støttes ikke for konvertering.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Innkommende e-dokumenter med inaktive leverandører støttes ikke for konvertering.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Følgende leverandørkoder: {ITEMLIST} er ikke knyttet til noen artikkeloppføringer.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Følgende leverandørnavn/-koder: {ITEMLIST} er ikke knyttet til noen artikkeloppføringer.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Følgende leverandørkoder: {ITEMLIST} er knyttet til flere artikkeloppføringer. Endre artikkeloppføringene, og sørg for at leverandørkoder er unike for hver artikkel per leverandør.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Følgende leverandørnavn/-koder: {ITEMLIST} er knyttet til flere artikkeloppføringer. Endre artikkeloppføringene, og sørg for at leverandørnavn/-koder er unike for hver artikkel per leverandør.";
    translation["ei.conversion.refnumnotfound"] =
        "Det nødvendige referansenummeret mangler i det innkommende e-dokumentet. Kanseller dette e-dokumentet og send et annet e-dokument som inneholder et XML-element for referansenummeret, tilordnet til feltet tranid.";
    translation["ei.conversion.refnumexists"] =
        "En leverandørfaktura med det samme referansenummeret finnes allerede. Kanseller dette e-dokumentet og send et annet e-dokument med riktig referansenummerverdi for XML-elementet som er tilordnet til feltet tranid.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Leverandørkodefeltet mangler i e-dokumentmalen. Endre e-dokumentmalen, eller velg en annen mal som inneholder felttilordning for leverandørkode.";
    translation["ei.conversion.novendorcodevalue"] =
        "Minst én av artiklene har ingen leverandørkode. Kanseller dette e-dokumentet og send et annet e-dokument med riktig verdi for XML-elementet som er tilordnet til leverandørkodefeltet.";
    translation["ei.conversion.vendornamenotfound"] =
        "Leverandørnavnfeltet mangler i e-dokumentmalen. Endre e-dokumentmalen, eller velg en annen mal som inneholder felttilordning for leverandørnavn.";
    translation["ei.conversion.novendornamevalue"] =
        "Minst én av artiklene har ingen leverandørnavn/-kode. Kanseller dette e-dokumentet og send et annet e-dokument med riktig verdi for XML-elementet som er tilordnet til leverandørnavn-/kodefeltet.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Oppføringen ({TRANSTYPE} # {TRANSID}) ble ikke funnet i systemet. Kanseller dette e-dokumentet og send et annet e-dokument med riktig verdi for XML-elementet som er tilordnet til feltet createdfrom.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Oppføringen ({TRANSTYPE} # {TRANSID}) er tilordnet til en annen enhet. Velg riktig enhet, og konverter dette e-dokumentet.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Leverandøren har ingen standard utgiftskonto, som er nødvendig for å konvertere fakturaer med utgifter. For å fortsette med konvertering, sett inn en verdi i feltet Standard utgiftskonto i leverandøroppføringen.";
    translation["ei.conversion.nolinktopo"] =
        "Det innkommende e-dokumentet har ingen artikkel eller utgift som er inkludert i den angitte innkjøpsordren. Sjekk statusen for den angitte innkjøpsordren om den kan konverteres. Hvis den kan konverteres, kansellerer du dette e-dokumentet og sender et annet e-dokument med riktig verdi for XML-elementet som er tilordnet til feltet createdfrom.";
    translation["inbound.formtitle"] = "Konverter innkommende e-dokumenter";
    translation["inbound.search"] = "Søk";
    translation["inbound.convert"] = "Konverter";
    translation["inbound.return"] = "Gå tilbake til kriterier";
    translation["inbound.vendor"] = "Leverandør";
    translation["inbound.datefrom"] = "Dato opprettet fra";
    translation["inbound.dateto"] = "Dato opprettet til";
    translation["inbound.vendorhelp"] =
        "Velg leverandøren til de mislykkede innkommende e-dokumentene som vil bli inkludert i søkeresultatet.";
    translation["inbound.datefromhelp"] =
        "Velg en startdato for å definere en periode der mislykkede innkommende e-dokumenter som ble opprettet i den perioden vil bli inkludert i søkeresultatet.";
    translation["inbound.datetohelp"] =
        "Velg en sluttdato for å definere en periode der mislykkede innkommende e-dokumenter opprettet i den perioden vil bli inkludert i søkeresultatet.";
    translation["inbound.inboundedocfieldgroup"] =
        "Søkefiltre for mislykkede for innkommende e-dokument";
    translation["inbound.sublist.sublistname"] =
        "Søkeresultater for mislykket innkommende e-dokument";
    translation["inbound.sublist.internalid"] = "Intern ID";
    translation["inbound.sublist.vendor"] = "Leverandør";
    translation["inbound.sublist.refnum"] = "Referansenummer";
    translation["inbound.sublist.ponum"] = "Innkjøpsordrenummer";
    translation["inbound.sublist.datecreated"] = "Opprettelsesdato";
    translation["inbound.sublist.edoctemplate"] = "E-dokumentmal";
    translation["inbound.msg.conversionongoing"] =
        "E-dokumentet blir for øyeblikket konvertert. Du vil motta en e-post når prosessen er fullført.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Du kan ikke utføre søket med de valgte kriteriene fordi konvertering av innkommende e-dokumenter allerede er i gang for datointervallet ({DATECREATED_FROM} – {DATECREATED_TO}). Du må endre søkekriteriene dine, eller prøve igjen når dette e-dokumentet er konvertert.";
    translation["inbound.invaliddates"] =
        "Dato opprettet fra, må ikke være senere enn Dato opprettet til. Endre datoene slik at Dato opprettet fra, er tidligere enn Dato opprettet til.";
    translation["inbound.configurefreecountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av SuiteApp-en Electronic Invoicing i flere land. Hvis du vil konvertere e-dokumenter i bulk, kan du kontakte kontoadministratoren din for å konfigurere feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["portlet.title"] = "Elektroniske dokumenter";
    translation["portlet.outboundforgeneration"] =
        "Utgående e-dokumenter for generering";
    translation["portlet.outboundforsending"] =
        "Utgående e-dokumenter for sending";
    translation["portlet.outboundwitherrors"] =
        "Utgående e-dokumenter med feil";
    translation["portlet.outboundsendinglink"] =
        "Mislykket sending av utgående e-dokumenter";
    translation["portlet.inboundforconversion"] =
        "Innkommende e-dokumenter for konvertering";
    translation["portlet.inboundconvertfailed"] =
        "Konverter mislykkede innkommende e-dokumenter";
    translation["portlet.inboundincomplete"] =
        "Ufullstendige innkommende e-dokumenter";
    translation["portlet.inbounduploadlink"] =
        "Last opp innkommende e-dokument";
    translation["portlet.outboundforcertification"] =
        "Utgående e-dokumenter for sertifisering";
    translation["portlet.outboundcertifiedforsending"] =
        "Utgående e-dokumenter for sending";
    translation["inbound.webservice.response.success"] =
        "Det innkommende e-dokumentet med ID: {ID} ble opprettet.";
    translation["inbound.webservice.response.novendor"] =
        "Ingen leverandør er knyttet til nettjeneste-ID-en: {IDENTIFIER}. Kontroller at den riktige nettjeneste-ID-en er brukt.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Det innkommende e-dokumentet med ID: {ID} ble opprettet. Flere leverandører er imidlertid tilknyttet nettjeneste-ID: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Det innkommende e-dokumentet er ufullstendig, da den riktige malen ikke kan bestemmes. Velg enten en mal i den innkommende e-dokumentoppføringen, eller sett opp XSD-en i e-dokumentmaloppføringen for å aktivere autovalg av mal.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Det innkommende e-dokumentet er ufullstendig, da den riktige leverandøren ikke kan bestemmes. Du kan enten velge en leverandør i den innkommende e-dokumentoppføringen, eller angi nettjeneste-ID i den tilknyttede leverandøroppføringen.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Følgende nøkler mangler: {KEYS}, som du må angi i nettjenesteforespørselen.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Brødteksten i nettjenesteforespørselen må være et JSON-objekt eller en matrise med JSON-objekter som bruker innholdstypen application/json.";
    translation["transaction.contactnoemail"] =
        "Følgende e-dokumentmottakere har ikke noen e-postadresse i sine kontaktoppføringer: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Det er ingen e-dokumentmottakere for denne transaksjonen. For å sende e-dokumenter via e-post, må minst én kontakt legges til i listen over e-dokumentmottakere.";
    translation["transaction.maxrecipientexceeded"] =
        "Antall e-postmottakere du har lagt til, overskrider grensen. Du kan legge til maksimalt 10 e-postmottakere.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Bare følgende transaksjonstyper behandles:";
    translation["ei.prefs.formtitle"] = "E-dokumentpreferanser";
    translation["ei.prefs.information.about.certify.skip"] =
        "Sertifiseringstrinnet utelates hvis sendemetode for sertifisering ikke er definert eller aktuelt for transaksjonen.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automatisk e-fakturering";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Automatiseringstype for e-dokument";
    translation["ei.prefs.text.option.comb.disabled"] = "Deaktiver";
    translation["ei.prefs.text.option.comb.gcs"] = "Generer, Sertifiser, Send";
    translation["ei.prefs.text.option.comb.gc"] = "Generer, Sertifiser";
    translation["ei.prefs.text.option.comb.cs"] = "Sertifiser, Send";
    translation["ei.prefs.btn.label.cancel"] = "Avbryt";
    translation["ei.prefs.btn.label.save"] = "Lagre";
    translation["ei.prefs.msg.confirm.save"] =
        "Vil du lagre endringene i e-dokumentpreferansene?";
    translation["ei.prefs.msg.success.save"] =
        "E-dokumentpreferansene er lagret.";
    translation["ei.prefs.msg.failed.save"] =
        "Lagring av e-dokumentpreferansene mislyktes.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Tilgangen til denne siden er begrenset. Kontakt administratoren for å be om tilgang.";
    translation["ei.eip.msg.completed"] = "E-dokumentbehandlingen er fullført.";
    translation["ei.eip.msg.failed"] =
        "E-dokumentbehandlingen mislyktes. Se revisjonssporet for e-dokument for flere detaljer.";
    translation["ei.eip.msg.processing"] = "E-dokumentet behandles.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "E-dokumentet behandles allerede.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps-lisensklienten er ikke tilgjengelig i kontoen din. Installer denne SuiteAppen for å få tilgang til alle funksjoner for elektronisk fakturering.";
    translation["outbound.formtitle"] = "Mislykket sending av e-dokumenter";
    translation["outbound.search"] = "Søk";
    translation["outbound.send"] = "Send";
    translation["outbound.return"] = "Gå tilbake til kriterier";
    translation["outbound.customer"] = "Kunde";
    translation["outbound.vendor"] = "Leverandør";
    translation["outbound.subsidiary"] = "Datterselskap";
    translation["outbound.type"] = "Transaksjonstype";
    translation["outbound.datefrom"] = "Transaksjonsdato fra";
    translation["outbound.dateto"] = "Transaksjonsdato til";
    translation["outbound.subshelp"] =
        "Velg et datterselskap for å bare vise transaksjonene som tilhører datterselskapet.";
    translation["outbound.custhelp"] =
        "Velg en kunde for å bare vise transaksjonene som tilhører den aktuelle kunden. Hvis ingen kunde er valgt, vil søkeresultatene vise alle transaksjoner som tilhører datterselskapet, uavhengig av kunde.";
    translation["outbound.vendorhelp"] =
        "Velg en leverandør for å bare vise transaksjonene som tilhører den aktuelle leverandøren. Hvis ingen leverandør er valgt, vil søkeresultatene vise alle transaksjoner som tilhører datterselskapet, uavhengig av leverandøren.";
    translation["outbound.entitytypehelp"] =
        "Velg enten Kunde eller Leverandør som enhetstype. Dette aktiverer den tilhørende rullegardinlisten nedenfor.";
    translation["outbound.typehelp"] =
        "Velg én eller flere transaksjonstyper for hvert e-dokument du vil sende. Hvis du skal velge flere transaksjonstyper, holder du inne Ctrl-tasten mens du velger hver enkelt transaksjonstype.<br /><br />Hvis ingen transaksjonstype er valgt, viser søkeresultatene alle e-dokumenter som er klare for sending, uavhengig av transaksjonstype.";
    translation["outbound.datefromhelp"] =
        "Hvis du vil vise en liste over transaksjoner som er opprettet innenfor et bestemt datointervall, velger du en dato for å definere begynnelsen av datointervallet.";
    translation["outbound.datetohelp"] =
        "Hvis du vil vise en liste over transaksjoner som er opprettet innenfor et bestemt datointervall, velger du en dato for å definere slutten av datointervallet.";
    translation["outbound.entityfieldgroup"] = "Filter for enhetssøk";
    translation["outbound.filtersfieldgroup"] = "Søkefiltre for transaksjon";
    translation["outbound.entitytypeinlinehelp"] = "Velg enhetstype:";
    translation["outbound.invalidtypetitle"] = "Ugyldige transaksjonstyper";
    translation["outbound.invalidtype"] =
        "Følgende transaksjonstyper støttes for tiden ikke: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Følgende transaksjonstyper er ikke gyldige for den valgte enheten: {TRANSACTIONTYPES}. Velg de aktuelle transaksjonstypene for enheten du har valgt.";
    translation["outbound.invaliddates"] =
        "Transaksjonsdato fra må ikke være senere enn transaksjonsdato til. Endre datoene slik at transaksjonsdato fra er tidligere enn transaksjonsdato til.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Du kan ikke utføre søket med de valgte kriteriene fordi e-dokumentsending allerede er i gang for transaksjoner innenfor datointervallet ({TRANDATE_FROM} – {TRANDATE_TO}) for datterselskapet ({SUBSIDIARY}). Du må endre søkekriteriene dine, eller prøve igjen når dette e-dokumentet er sendt.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Du kan ikke utføre søket med de valgte kriteriene fordi e-dokumentsending allerede er i gang for transaksjoner innenfor datointervallet ({TRANDATE_FROM} – {TRANDATE_TO}). Du må endre søkekriteriene dine, eller prøve igjen når dette e-dokumentet er sendt.";
    translation["outbound.sublist.trannum"] = "Transaksjonsnummer";
    translation["outbound.sublist.trantype"] = "Transaksjonstype";
    translation["outbound.sublist.customer"] = "Kunde";
    translation["outbound.sublist.vendor"] = "Leverandør";
    translation["outbound.sublist.subsidiary"] = "Datterselskap";
    translation["outbound.sublist.trandate"] = "Transaksjonsdato";
    translation["outbound.sublist.memo"] = "Notat";
    translation["outbound.sublist.template"] = "Mal";
    translation["outbound.sublist.sendingmethod"] = "Sendemetode";
    translation["outbound.sublist.sublistname"] =
        "Resultater for mislykkede utgående e-dokumenter som skal sendes";
    translation["outbound.msg.sendingongoing"] =
        "E-dokumentet sendes for øyeblikket. Du vil motta en e-post når prosessen er fullført.";
    translation["outbound.configurefreecountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land. For å sende e-dokumenter i bulk, ta kontakt med kontoadministratoren for å konfigurere feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["outbound.entitysend"] = "Send til enhet";
    translation["outbound.certifysend"] = "Send til sertifisering";
    translation["outbound.sendingtypehelp"] =
        "Velg enten Send til enhet eller Send til sertifisering. Det vil vise korresponderende transaksjoner for sending.";
    translation["customer.noemail"] =
        "Det er ingen e-postadresse for denne kunden. Skriv inn en gyldig e-postadresse for kundeoppføringen for å aktivere sending av e-dokumenter via e-post.";
    translation["customer.contactnoemail"] =
        "Følgende e-dokumentmottakere har ikke en e-postadresse i sine kontaktoppføringer: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Det er ingen e-dokumentmottakere for denne kunden. For å sende elektroniske dokumenter via e-post til denne kunden, må minst én kontakt legges til i listen over e-dokumentmottakere.";
    translation["customer.arrayrequired"] =
        "Kontaktmatriser som kreves for validering.";
    translation["customer.parameternotarray"] =
        "Kontaktparameter er ikke en matrise.";
    translation["customer.maxrecipientexceeded"] =
        "Du har overskredet maksimalt antall e-postmottakere. Velg maksimalt 10 e-postmottakere.";
    translation["vendor.noemail"] =
        "Det er ingen e-postadresse for denne leverandøren. Skriv inn en gyldig e-postadresse til leverandøroppføringen, for å aktivere sending av e-dokumenter via e-post.";
    translation["vendor.contactnoemail"] =
        "Følgende e-dokumentmottakere har ikke en e-postadresse i sine kontaktoppføringer: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Det er ingen e-dokumentmottakere for denne leverandøren. For å sende elektroniske dokumenter via e-post til denne leverandøren, må minst én kontakt legges til i listen over e-dokumentmottakere.";
    translation["vendor.maxrecipientexceeded"] =
        "Du har overskredet maksimalt antall e-postmottakere. Velg maksimalt 10 e-postmottakere.";
    translation["vendor.nosenders"] =
        "Det er ingen e-postavsender av e-dokument for denne leverandøren. Hvis du vil motta e-dokumenter via e-post fra denne leverandøren, må du angi minst én e-postadresse i leverandørens e-postsenderliste for e-dokument.";
    translation["vendor.existingsender"] =
        "Avsenderens e-postadresse finnes allerede.";
    translation["vendor.existingdomain"] =
        "E-postdomenet for avsender brukes allerede av en annen leverandør.";
    translation["vendor.existingidentifier"] =
        "nettjeneste-ID-en brukes allerede av en annen leverandør. Skriv inn en annen nettjeneste-ID.";
    translation["customeremailrecipient.contextunsupported"] =
        "E-postmottaker for kundes e-dokument støtter kun følgende sammenhenger: UI, CSV, SuiteScript og Nettjenester.";
    translation["vendoremailrecipient.contextunsupported"] =
        "E-postmottaker for leverandørs e-dokument støtter kun følgende kontekster: UI, CSV, SuiteScript og Nettjenester.";
    translation["vendoremailsender.contextunsupported"] =
        "E-postavsender for leverandørs e-dokument støtter kun følgende sammenhenger: UI, CSV, SuiteScript og Nettjenester.";
    translation["template.incorrectregex"] =
        "REGEX-feltet inneholder et feilaktig regulært uttrykk. Riktig syntaks må brukes.";
    translation["template.invalidjson"] =
        "Du har ikke angitt en korrekt utformet JSON-fil i feltet Mal for utgående e-dokumenter. Klikk på OK hvis du vil fortsette, eller klikk på Kanseller hvis du vil bli værende på denne siden.";
    translation["template.invalidxml"] =
        "XML-malen inneholder feil. XML-format må være korrekt utformet.";
    translation["template.templaterequired"] =
        "Malinnholdet mangler for den valgte utgående transaksjonstypen. Angi gyldig XML- eller JSON-malinnhold i feltet Utgående e-dokumenter, og prøv deretter på nytt.";
    translation["template.mappingrequired"] =
        "Du valgte en innkommende transaksjonstype, men JSON-innholdet i felttilordningen mangler. Angi JSON-innholdet i feltet Felttilordning for innkommende e-dokumenter.";
    translation["template.templateorjsonrequired"] =
        "Feltverdier mangler. For en utgående transaksjon må du angi gyldig XML- eller JSON-innhold i feltet Mal for utgående e-dokumenter. For en innkommende transaksjon må du angi JSON-innhold i feltet Felttilordning for innkommende e-dokument.";
    translation["template.invalidxsdfile"] =
        "Den valgte XSD-filen er ikke en gyldig XSD-fil. Kontroller at filen du velger, har .xsd-utvidelsen.";
    translation["template.contextunsupported"] =
        "E-dokumentmalen støtter kun brukergrensesnitt og SuiteScript-sammenhenger.";
    translation["template.supportedtranstypefldhelp"] =
        "Velg én eller flere transaksjonstyper som skal støttes av denne malen. Hvis du vil velge flere transaksjonstyper, holder du nede Ctrl-tasten mens du velger transaksjonstypene.<br /><br />Hvis transaksjonstyper ikke kan velges, betyr det at malen allerede er tilordnet til én eller flere transaksjonsoppføringer av samme transaksjonstype. Hvis du vil aktivere valg av transaksjonstype, fjerner du malen fra transaksjonsoppføringen.<br /><br />Du kan også tilordne denne malen til innkommende e-dokumenter, noe som deaktiverer feltet Transaksjonstype.";
    translation["template.eistatus"] =
        "Begrens redigering av transaksjoner med e-dokumentstatus";
    translation["template.supportedeistatusfieldhelp"] =
        "Transaksjoner med e-dokumentstatusen du har valgt, vil ikke kunne redigeres når denne malen er tilknyttet dem. Du kan velge flere statuser for e-dokument.";
    translation["template.invalidschemaordependency"] =
        "Skjemaet er en feilstrukturert XSD, eller det avhengige skjemaet finnes ikke.";
    translation["template.xmldoesnotconformtoschema"] =
        "XML-en av malen samsvarer ikke med angitt XSD eller skjema.";
    translation["template.xmldomexception"] =
        "XML-inndatastrengen er feilformatert.";
    translation["template.missingreqdargument"] =
        "XSD-en for utgående validering mangler.";
    translation["template.xsdvalidationexception"] =
        "Ukjent unntak oppsto under XSD-validering.";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD-skjemamappen er ugyldig eller mangler.";
    translation["invoice.generatebtn"] = "Generer e-dokument";
    translation["invoice.sendbtn"] = "Send e-dokument";
    translation["invoice.sendcertifybtn"] = "Sertifiser e-dokument";
    translation["invoice.eipbtn"] = "Behandle e-dokument";
    translation["invoice.loguntagged"] =
        "E-dokumentmal ble fjernet. Transaksjonen er ikke tagget for e-dokumentgenerering.";
    translation["invoice.logforgenerate"] =
        "Transaksjonen er klar for e-dokumentgenerering.";
    translation["invoice.invalidtemplatesub"] =
        "Datterselskapet for transaksjonen er ikke gyldig for den valgte e-dokumentmalen. Velg en annen e-dokumentmal.";
    translation["invoice.templateremovalerror"] =
        "Det er ikke tillatt å fjerne e-dokumentmalen for sendte e-dokumenter.";
    translation["ei.sending.currentlysending"] =
        "E-dokumentet sendes for øyeblikket. Dette kan ta noen minutter å fullføre. Du må ikke avbryte behandlingen ved å klikke på knappen Send e-dokument på nytt. Etter at e-dokumentet er sendt, lastes siden på nytt.";
    translation["ei.sending.notready"] =
        "Dette e-dokumentet er ikke klart for sending. Du må først klikke Generer e-dokument, for å generere et e-dokument.";
    translation["ei.sending.alreadysent"] =
        "Denne transaksjonen var allerede sendt.";
    translation["ei.sending.norecipients"] =
        "E-dokumentet kan ikke sendes fordi kunden ikke har e-dokumentmottakere. Før du kan sende dette e-dokumentet via e-post, må e-dokumentmottakere først velges i kundeoppføringen.";
    translation["ei.sending.indivcustnoemail"] =
        "E-dokumentet kan ikke sendes fordi kunden ikke har e-postadresse. Før du kan sende dette e-dokumentet via e-post, må du oppgi en e-postadresse på kundeoppføringen.";
    translation["ei.sending.norecipients.vendor"] =
        "E-dokumentet kan ikke sendes fordi leverandøren ikke har e-dokumentmottakere. Før du kan sende dette e-dokumentet via e-post, må e-dokumentmottakere først velges i leverandøroppføringen.";
    translation["ei.sending.indivvendnoemail"] =
        "E-dokumentet kan ikke sendes fordi leverandøren ikke har e-postadresse. Før du kan sende dette e-dokumentet via e-post, må du oppgi en e-postadresse i leverandøroppføringen.";
    translation["ei.sending.invalidmethod"] =
        "Velg en gyldig sendemetode for {TYPE} # {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Avsender: {SENDER}\nMottakere: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "E-dokumentsenderen ({EMPLOYEENAME}) har ingen e-postadresse. Skriv inn en gyldig e-postadresse på ansattoppføringen.";
    translation["ei.sending.recipientnoemail"] =
        "Én eller flere mottakere av e-dokumentet som er knyttet til denne transaksjonen, har ikke en e-postadresse. Verifiser at mottakere for denne kunden har gyldige e-postadresser.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Én eller flere mottakere av e-dokumentet som er knyttet til denne transaksjonen, har ikke en e-postadresse. Verifiser at mottakere for denne leverandøren har gyldige e-postadresser.";
    translation["ei.sending.defaulterror"] =
        "Det oppstod en feil under sending av e-dokumentet. Sjekk revisjonssporet for e-dokument på underfanen for e-dokument for detaljer.";
    translation["ei.sending.inactivecustomer"] =
        "Kan ikke sende e-dokumentet for denne transaksjonen fordi den valgte kunden er inaktiv. E-dokumentstatusfeltet er ikke blitt oppdatert, og et revisjonsspor er ikke opprettet. Fjern merket i Inaktiv-ruten på kundeoppføringen, og prøv å sende e-dokumentet på nytt.";
    translation["ei.sending.inactivevendor"] =
        "Kan ikke sende e-dokumentet for denne transaksjonen fordi den valgte leverandøren er inaktiv. E-dokumentstatusfeltet er ikke blitt oppdatert, og et revisjonsspor er ikke opprettet. Fjern merket i Inaktiv-ruten på leverandøroppføringen, og prøv deretter å sende e-dokumentet på nytt.";
    translation["ei.sending.msg.processcomplete"] = "E-dokumentet er sendt.";
    translation["ei.sending.configurefreecountry"] =
        "Kontoen din må ha en aktiv lisens for å kunne bruke elektronisk fakturering for flere land. Hvis du vil sende e-dokumenter i bulk til ett enkelt land, må du velge landet fra feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transaksjoner med inaktive kunder støttes ikke av e-dokument.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transaksjoner med inaktive leverandører støttes ikke av e-dokument.";
    translation["ei.sending.certification.defaulterror"] =
        "Det oppsto en feil under sertifisering av e-dokumentet. Sjekk revisjonssporet for e-dokument på underfanen for e-dokument for detaljer.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "E-dokumentet er sendt til sertifisering.";
    translation["ei.generation.generationlogbulk"] =
        "E-dokumentet ble massegenerert ved hjelp av e-dokumentmalen {TEMPLATENAME}.";
    translation["ei.generation.generationlog"] =
        "E-dokumentet ble generert ved hjelp av e-dokumentmalen {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "E-dokumentet og PDF-filen ble massegenerert ved hjelp av e-dokumentmalen {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflog"] =
        "E-dokumentet og PDF-filen ble generert ved hjelp av e-dokumentmalen {TEMPLATENAME}.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "E-dokumentet ble massegenerert ved hjelp av e-dokumentmalen {TEMPLATENAME}. Den forrige genererte PDF-filen for denne transaksjonen ble slettet.";
    translation["ei.generation.generationremovedpdflog"] =
        "E-dokumentet ble generert ved hjelp av e-dokumentmalen {TEMPLATENAME}. Den forrige genererte PDF-filen for denne transaksjonen ble slettet.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Massegenereringsprosess\nE-dokumentmalen som ble brukt: {TEMPLATENAME}\nFeildetaljer: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "E-dokumentmalen som ble brukt: {TEMPLATENAME}\nFeildetaljer: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Det oppstod en feil under genereringen. Sjekk revisjonssporet for e-dokument på underfanen for e-dokument for detaljer.";
    translation["ei.generation.inactivecustomer"] =
        "Kan ikke generere et e-dokument for denne transaksjonen fordi den valgte kunden er inaktiv. E-dokumentstatusfeltet er ikke blitt oppdatert, og et revisjonsspor er ikke opprettet. Fjern merket i Inaktiv-ruten på kundeoppføringen, og prøv å generere e-dokumentet på nytt.";
    translation["ei.generation.inactivevendor"] =
        "Kan ikke generere et e-dokument for denne transaksjonen, fordi den valgte leverandøren er inaktiv. E-dokumentstatusfeltet er ikke blitt oppdatert, og et revisjonsspor er ikke opprettet. Fjern merket i Inaktiv-ruten på leverandøroppføringen, og prøv å generere e-dokumentet på nytt.";
    translation["ei.generation.msg.processcomplete"] =
        "E-dokumentet er generert.";
    translation["ei.generation.configurefreecountry"] =
        "Kontoen din må ha en aktiv lisens for å kunne bruke elektronisk fakturering for flere land. Hvis du vil generere e-dokumenter i bulk til ett enkelt land, må du velge landet fra feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transaksjoner med inaktive kunder støttes ikke av e-dokument.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transaksjoner med inaktive leverandører støttes ikke av e-dokument.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Dette e-dokumentet er generert og digitalt signert.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Genereringen mislyktes fordi det resulterende e-dokumentet ikke er en korrekt utformet XML- eller JSON-fil.";
    translation["notify.batchownersubject"] =
        "Sending av e-dokument er fullført";
    translation["notify.batchownerbody"] =
        "Hei! <br/><br/>Forespørselen din om å sende e-dokumenter er fullført.<br/>{SENT} av {TOTAL} ble sendt. Se den vedlagte filen for detaljer. <br/><br/>Med vennlig hilsen<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "E-dokument generert for innkjøpsordrenr. {PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-dokument er generert fra {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Hei! <br /><br />{MESSAGE}<br />Se vedlegget for e-dokumentfilen.<br /><br />Med vennlig hilsen<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Feil oppstod under generering av e-dokument";
    translation["notify.generationerrorbody"] =
        "Det oppstod feil ved generering av e-dokumentet.<br/>Se den vedlagte filen for listen over transaksjoner og feildetaljer.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Et e-dokument er allerede sendt for denne transaksjonen. Ved å generere et nytt e-dokument overskrives det forrige e-dokumentet. Er du sikker på at du vil generere et nytt e-dokument?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Det er ikke tillatt å fjerne e-dokumentmalen for sendte e-dokumenter.";
    translation["transaction.msg.generate.information"] =
        "Generering av dette e-dokumentet pågår.";
    translation["transaction.msg.send.information"] =
        "Sending av dette e-dokumentet pågår.";
    translation["transaction.msg.send.certify.information"] =
        "Sertifisering av dette e-dokumentet pågår.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Generering av dette e-dokumentet er allerede i gang.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Sending av dette e-dokumentet er allerede i gang.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Sertifisering av dette e-dokumentet er allerede i gang.";
    translation["transaction.msg.uncheckpdf"] =
        "En PDF-fil av denne transaksjonen ble opprettet under den siste e-dokumentgenereringen. Hvis du fjerner merket i denne ruten, vil det slette denne PDF-filen i neste generering av e-dokument.";
    translation["transaction.msg.nofreecountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land. For å generere et e-dokument for denne transaksjonen, vennligst kontakt kontoadministratoren din for å angi et land i feltet Land for fri bruk av e-dokumenter på siden Selskapsinformasjon.";
    translation["transaction.msg.otherbillingcountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land. For å generere et e-dokument for denne transaksjonen, ta kontakt med den NetSuite-kontoansvarlige for å kjøpe en lisens.";
    translation["transaction.msg.nobillingcountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land. For å opprette et e-dokument for denne transaksjonen, oppgi faktureringsadressen for denne transaksjonen.";
    translation["transaction.msg.noshippingcountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land. For å opprette et e-dokument for denne transaksjonen, oppgi leveringsadressen for denne transaksjonen.";
    translation["transaction.msg.nocustomercountry"] =
        "Denne kontoen har ikke en aktiv lisens for bruk av elektronisk fakturering i flere land. For å generere et e-dokument for denne transaksjonen, oppgi en standard faktureringsadresse for kunden av denne transaksjonen.";
    translation["transaction.msg.blockededittransaction"] =
        "Redigeringen av transaksjonen er blokkert for gjeldende e-dokumentstatus. Se vedlagte mal for elektronisk fakturering.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Hvis du endrer verdien i innholdstypefeltet fra XML til en annen type, fjernes alle XML-validatorer. Er du sikker på at du vil endre innholdstypen?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Kun validatorer for XML-innholdstype kan legges til.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Denne validatoren er allerede i listen.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Malvalidatorer for e-dokument støtter kun brukergrensesnitt og SuiteScript-sammenhenger.";
    translation["standarddocument.default.alreadyexist"] =
        "Oppføringen {DEFAULT_DOCUMENT_STANDARD} finnes allerede. Du kan ikke opprette en dokumentpakkeoppføring med samme navn. Gi nytt navn til dokumentpakken, og prøv igjen.";
    translation["standarddocument.default.editnotallowed"] =
        "Redigering av navn- eller beskrivelsesoppføring for {DEFAULT_DOCUMENT_STANDARD} er ikke tillatt.";
    translation["standarddocument.default.deletenotallowed"] =
        "Det er ikke tillatt å slette {DEFAULT_DOCUMENT_STANDARD}-oppføringen.";
    translation["standarddocument.contextunsupported"] =
        "E-dokumentpakken støtter kun UI, CSV-import og SuiteScript-kontekster.";
    translation["sendingmethod.default.alreadyexist"] =
        "Oppføringen for sendemetoden {DEFAULT_SENDING_METHOD_NAME} finnes allerede. Du kan ikke opprette en sendemetode med samme navn. Endre navnet på sendemetoden, og prøv på nytt.";
    translation["sendingmethod.default.editnotallowed"] =
        "Det er ikke tillatt å redigere oppføringen for sendemetoden {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Det er ikke tillatt å slette oppføringen for sendemetoden {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Feltet Transaksjonstype er deaktivert fordi denne sendemetoden er tilordnet til én eller flere transaksjonsoppføringer. Hvis du vil redigere denne sendemetoden, må du fjerne sendemetoden fra transaksjonsoppføringen for å aktivere feltet Transaksjonstype, og prøve på nytt.";
    translation["sendingmethod.contextunsupported"] =
        "Sendemetoden for e-dokument støtter bare brukergrensesnitt og SuiteScript-kontekster.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Velg én eller flere transaksjonstyper som skal støttes av denne sendemetoden. Hvis du skal velge flere transaksjonstyper, holder du inne Ctrl-tasten mens du velger transaksjonstypene.<br /><br />Hvis én eller flere transaksjonstyper ikke kan velges, har sendemetoden blitt tilordnet én eller flere transaksjonsoppføringer av den aktuelle transaksjonstypen. Du må først fjerne sendemetoden fra transaksjonsoppføringen for å kunne aktivere valg av transaksjonstype.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementering av plugin for sendemetode for e-dokument";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Velg en plugin-implementering for sendemetode";
    translation["sendingmethod.scriptbannermessage"] =
        "Sendemetodene bør være tilpassede pluginimplementeringer. Gjenopprett eksisterende sendemetodeskript som nye tilpassede plugin-implementeringer av typen «Plugin for sending».";
    translation["customdatasource.pluginimplementation"] =
        "Implementering av plugin for tilpasset datakilde";
    translation["customdatasource.pluginimplementationhelp"] =
        "Velg implementeringen av plugin for tilpasset datakilde";
    translation["digitalsignature.pluginimplementation"] =
        "Implementering av plugin for digital signatur";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Velg en pluginimplementering. Dette feltet er obligatorisk hvis du ønsker digitalt signerte e-dokumenter.";
    translation["digitalsignature.identifierlabel"] =
        "Dette e-dokumentet er digitalt signert";
    translation["digitalsignature.successlog"] =
        "Det genererte e-dokumentet er digitalt signert.";
    translation["digitalsignature.failurelog"] =
        "Det genererte e-dokumentet er ikke digitalt signert.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Implementering av plugin for digital signatur returnerte feilstatus.";
    translation["digitalsignature.plugininvalidresult"] =
        "Resultatet som returneres fra implementeringen av plugin for digital signatur er ikke gyldig.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementering av plugin for innkommende egendefinert datakilde";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Velg en implementering av plugin for innkommende egendefinert datakilde.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Resultatet av implementering av plugin for innkommende egendefinert datakilde er ugyldig.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementering av plugin for utgående validering";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Velg en implementering av plugin for validering av utgående e-dokument. Dette validerer utgående e-dokumenter.";
    translation["outboundvalidation.successlog"] =
        "Utgående validering var vellykket.";
    translation["outboundvalidation.failurelog"] =
        "Utgående validering var mislykket.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Implementering av plugin for utgående validering returnerte en feilstatus.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Resultatet fra implementeringen av plugin for utgående validering er ugyldig.";
    translation["template.msg.cannotedittransactiontype"] =
        "Feltet Transaksjonstype er deaktivert fordi denne malen allerede er tildelt én eller flere transaksjonsoppføringer. For å redigere denne malen, fjern malen fra transaksjonsoppføringen for å aktivere feltet Transaksjonstype, og prøv deretter igjen. Du kan også tilordne denne malen til innkommende e-dokumenter, og det vil deaktivere feltet Transaksjonstype.";
    translation["template.msg.forcetocopymessage"] =
        "Du kan ikke redigere standardmalen for e-dokumenter. Du kan kopiere den ved hjelp av alternativet Lag kopi fra Handlinger eller opprette en ny.";
    translation["template.msg.warningoneditmessage"] =
        "Dette er en standardmal for e-dokumenter. Eventuelle endringer som gjøres i denne malen, vil gå tapt eller bli overskrevet når SuiteApp-en oppdateres.";
    translation["email.batchownernotification.subject"] =
        "Sending av e-dokument er fullført";
    translation["email.batchownernotification.body"] =
        "Hei! <br/><br/>E-dokumentene dine er sendt.<br/>{SENT} av {TOTAL} ble sendt. Se den vedlagte filen for detaljer.<br/><br/>Med vennlig hilsen<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "E-dokumentkonvertering er fullført";
    translation["email.batchownerconvertnotification.body"] =
        "Hei! <br/><br/>E-dokumentene dine er konvertert.<br/>{CONVERTED} av {TOTAL} ble konvertert. Se den vedlagte filen for detaljer.<br/><br/>Med vennlig hilsen<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-dokument generert for innkjøpsordrenr. {PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-dokument fra {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "E-dokument generert for {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Hei! <br /><br />E-dokumentet for innkjøpsordrenummer {PONUM} er generert.<br />Se den vedlagte e-dokumentfilen for detaljer.<br /><br />Med vennlig hilsen<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Hei! <br /><br />E-dokumentet for {TYPE} nummer {TRANID} er generert.<br />Se den vedlagte e-dokumentfilen for detaljer.<br /><br />Med vennlig hilsen<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Feil oppstod under generering av e-dokument";
    translation["email.generationerrornotification.body"] =
        "Det oppstod feil ved generering av e-dokumentet.<br/>Se den vedlagte filen for listen over transaksjoner og feildetaljer.";
    translation["email.sendingerrornotification.subject"] =
        "Feil oppstod under sending av e-dokument";
    translation["email.sendingerrornotification.body"] =
        "Det oppstod feil ved sending av e-dokumentet.<br/>Se den vedlagte filen for listen over transaksjoner og feildetaljer.";
    translation["email.webserviceerror.subject"] =
        "Nettjenestevarsling for innkommende e-dokument";
    translation["email.webserviceerror.body"] =
        "<p>Hei!</p><p>Det oppstod feil ved behandling av det innkommende e-dokumentet med nettjenesten.<br/>Se detaljene nedenfor.</p>{DETAIL_TABLE}<p>Med vennlig hilsen<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Transaksjonsnummer";

    return translation;
});
