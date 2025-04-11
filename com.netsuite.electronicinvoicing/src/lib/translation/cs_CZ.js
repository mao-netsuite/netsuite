define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detaily";
    translation["email.attachment.collabel.transactiontype"] = "Typ transakce";
    translation["email.attachment.collabel.internalid"] = "Interní ID";
    translation["email.attachment.collabel.vendor"] = "Dodavatel";
    translation["email.conversionerrornotification.subject"] =
        "Během převodu příchozího elektronického dokumentu došlo k chybě";
    translation["email.conversionerrornotification.body"] =
        "Během převodu příchozího elektronického dokumentu se vyskytly chyby.<br/>V přiloženém souboru najdete seznam záznamů s chybami a podrobnosti o nich.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Poznámka: Pokud chcete, aby byla oznámení místo správcům účtu zasílána jinému uživateli, zadejte jeho e-mailovou adresu do pole Příjemce oznámení elektronického dokumentu v záznamu nadřazené pobočky.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID příchozího elektronického dokumentu";
    translation["email.table.collabel.details"] = "Detaily";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Během kontroly licence účtu došlo k chybě";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí.</br>Chcete-li hromadně zpracovávat elektronické dokumenty, je třeba konfigurovat pole Země elektronického dokumentu k volnému použití na stránce Informace o společnosti.";
    translation["inboundedocument.logforconversion"] =
        "Příchozí elektronický dokument je připraven k převodu.";
    translation["inboundedocument.logincomplete"] =
        "Příchozí elektronický dokument je neúplný. Nebylo vybráno pole {FIELD}.";
    translation["inboundedocument.deletenotallowed"] =
        "Vymazání příchozího elektronického dokumentu není povoleno.";
    translation["inboundedocument.copynotallowed"] =
        "Kopírování příchozího elektronického dokumentu není povoleno.";
    translation["inboundedocument.contextunsupported"] =
        "Příchozí elektronický dokument podporuje pouze kontexty UI a SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "Vybraná reference souboru XML není platný soubor XML. Zkontrolujte, zda má vybraný soubor koncovku .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Vybraná reference souboru PDF není platný soubor PDF. Zkontrolujte, zda má vybraný soubor koncovku .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Vybraná reference souboru XML není dokument XML se správným formátem.";
    translation["inboundedocument.convert.button"] = "Převést";
    translation["inboundedocument.convert.information"] =
        "Probíhá převod tohoto příchozího elektronického dokumentu.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Již probíhá převod tohoto příchozího elektronického dokumentu.";
    translation["inboundedocument.cancel.button"] =
        "Zrušit elektronický dokument";
    translation["inboundedocument.cancel.confirmation"] =
        "Opravdu chcete tento příchozí elektronický dokument zrušit?";
    translation["inboundedocument.cancel.failed"] =
        "Zrušení selhalo, protože stav záznamu příchozího elektronického dokumentu je {STATUS}";
    translation["inboundedocument.cancel.defaulterror"] =
        "Během rušení došlo k chybě. Podrobnosti naleznete v auditním záznamu elektronického dokumentu na dílčí záložce Elektronický dokument.";
    translation["inboundedocument.cancel.complete"] =
        "Elektronický dokument byl zrušen.";
    translation["inboundedocument.preview.button"] = "Zobrazit XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing SuiteApp ve více zemích. Chcete-li tento elektronický dokument převést na transakci, obraťte se na správce účtu, který zadá zemi elektronického dokumentu pro bezplatné použití na stránce s informacemi o společnosti.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing SuiteApp ve více zemích. Chcete-li tento elektronický dokument převést na transakci, obraťte se na správce účtu NetSuite a zakupte si licenci.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing SuiteApp ve více zemích. Chcete-li tento elektronický dokument převést na transakci, nastavte výchozí fakturační adresu vybraného dodavatele.";
    translation["validationplugin.contextunsupported"] =
        "Modul plugin pro ověření příchozího elektronického dokumentu podporuje pouze kontexty UI a SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implementace modulu plugin ověření příchozího elektronického dokumentu";
    translation["validationplugin.pluginimplementationhelp"] =
        "Vyberte implementaci modulu plugin ověření příchozího elektronického dokumentu.";
    translation["validationplugin.scriptbannermessage"] =
        "Ověření příchozího elektronického dokumentu by mělo představovat implementace vlastního modulu plugin. Znovu vytvořte existující skripty ověření jako nové implementace vlastního modulu plugin typu Modul plugin pro ověření příchozího elektronického dokumentu.";
    translation["ei.conversion.defaulterror"] =
        "Během převodu došlo k chybě. Podrobnosti naleznete v auditním záznamu elektronického dokumentu na dílčí záložce Elektronický dokument.";
    translation["ei.conversion.inactivevendor"] =
        "Tento příchozí elektronický dokument nelze převést, protože vybraný dodavatel je neaktivní. Pole Stav elektronického dokumentu nebylo aktualizováno a auditní záznam nebyl vytvořen. Zrušte zaškrtnutí políčka Neaktivní v záznamu dodavatele a zkuste elektronický dokument převést znovu.";
    translation["ei.conversion.inactivecustomer"] =
        "Tento příchozí elektronický dokument nelze převést, protože vybraný zákazník je neaktivní. Pole Stav elektronického dokumentu nebylo aktualizováno a auditní záznam nebyl vytvořen. Zrušte zaškrtnutí políčka Neaktivní v záznamu zákazníka a zkuste elektronický dokument převést znovu.";
    translation["ei.conversion.conversioncomplete"] =
        "Elektronický dokument byl převeden.";
    translation["ei.conversion.conversionlogbulk"] =
        "Příchozí elektronický dokument byl zahrnut do hromadného převodu a byl převeden na transakci s interním ID {INTERNALID} typu {TYPE}.";
    translation["ei.conversion.conversionlog"] =
        "Příchozí elektronický dokument byl převeden na transakci s interním ID {INTERNALID} typu {TYPE}";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Proces hromadného převodu\nPoužitá šablona elektronického dokumentu: {TEMPLATENAME}\nRozsah chyb: {ERRORSCOPE}\nDetaily chyb: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Použitá šablona elektronického dokumentu: {TEMPLATENAME}\nRozsah chyb: {ERRORSCOPE}\nDetaily chyb: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Analýza se nezdařila. Zkontrolujte mapování pole pro příchozí elektronické dokumenty.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Převod selhal.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Ověření selhalo.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Převod selhal, protože stav záznamu příchozího elektronického dokumentu je {STATUS}";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Převod příchozích dokumentů s neaktivními zákazníky není podporován.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Převod příchozích dokumentů s neaktivními dodavateli není podporován.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Následující kódy dodavatele: {ITEMLIST} nejsou spojeny s žádnými záznamy položky.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Následující názvy/kódy dodavatele: {ITEMLIST} nejsou spojeny s žádnými záznamy položky.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Následující kódy dodavatele: {ITEMLIST} jsou spojeny s několika záznamy položky. Změňte záznamy položky a ověřte, zda jsou kódy dodavatele pro jednotlivé položky na dodavatele jedinečné.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Následující názvy/kódy dodavatele: {ITEMLIST} jsou spojeny s několika záznamy položky. Změňte záznamy položky a ověřte, zda jsou názvy/kódy dodavatele pro jednotlivé položky na dodavatele jedinečné.";
    translation["ei.conversion.refnumnotfound"] =
        "Povinné referenční číslo v příchozím elektronickém dokumentu chybí. Zrušte tento dokument a odešlete jiný dokument, který zahrnuje prvek XML pro referenční číslo namapovaný na pole ID transakce.";
    translation["ei.conversion.refnumexists"] =
        "Vyúčtování dodavatele se stejným referenčním číslem již existuje. Zrušte tento elektronický dokument a odešlete jiný dokument se správným referenčním číslem pro prvek XML namapovaný na pole ID transakce.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Pole Kód dodavatele v šabloně elektronického dokumentu chybí. Změňte šablonu elektronického dokumentu nebo vyberte jinou šablonu, která zahrnuje mapování pole Kód dodavatele.";
    translation["ei.conversion.novendorcodevalue"] =
        "Alespoň jedna z položek nemá žádný kód dodavatele. Zrušte tento elektronický dokument a odešlete jiný dokument se správnou hodnotou pro prvek XML namapovaný na pole Kód dodavatele.";
    translation["ei.conversion.vendornamenotfound"] =
        "Pole Název dodavatele v šabloně elektronického dokumentu chybí. Změňte šablonu elektronického dokumentu nebo vyberte jinou šablonu, která zahrnuje mapování pole Název dodavatele.";
    translation["ei.conversion.novendornamevalue"] =
        "Alespoň jedna z položek nemá žádný název/kód dodavatele. Zrušte tento elektronický dokument a odešlete jiný dokument se správnou hodnotou pro prvek XML namapovaný na pole Název/kód dodavatele.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Záznam ({TRANSTYPE}#{TRANSID}) nebyl v systému nalezen. Zrušte tento elektronický dokument a odešlete jiný dokument se správnou hodnotou pro prvek XML namapovaný na pole Vytvořeno od.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Záznam ({TRANSTYPE}#{TRANSID}) je přiřazen jiné entitě. Vyberte správnou entitu a převeďte tento elektronický dokument.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Dodavatel nemá žádný výchozí účet výdajů, který je požadován k převodu účtů s výdaji. Chcete-li v převodu pokračovat, nastavte v poli Výchozí účet výdajů v záznamu dodavatele nějakou hodnotu.";
    translation["ei.conversion.nolinktopo"] =
        "Příchozí elektronický dokument nemá žádnou položku ani výdaje, které jsou zahrnuty v odkazované nákupní objednávce. Zkontrolujte stav odkazované nákupní objednávky, zda může být převedena. Pokud lze nákupní objednávku převést, zrušte tento elektronický dokument a odešlete jiný dokument se správnou hodnotou pro prvek XML namapovaný na pole Vytvořeno od.";
    translation["inbound.formtitle"] =
        "Převést příchozí elektronické dokumenty";
    translation["inbound.search"] = "Hledat";
    translation["inbound.convert"] = "Převést";
    translation["inbound.return"] = "Zpět na kritéria";
    translation["inbound.vendor"] = "Dodavatel";
    translation["inbound.datefrom"] = "Datum Vytvořeno od";
    translation["inbound.dateto"] = "Datum Vytvořeno do";
    translation["inbound.vendorhelp"] =
        "Vyberte dodavatele, jehož neúspěšné příchozí dokumenty budou zahrnuty do výsledku vyhledávání.";
    translation["inbound.datefromhelp"] =
        "Vyberte počáteční datum období, během kterého budou neúspěšné příchozí dokumenty vytvořené v tomto období zahrnuty do výsledku vyhledávání.";
    translation["inbound.datetohelp"] =
        "Vyberte koncové datum období, během kterého budou neúspěšné příchozí dokumenty vytvořené v tomto období zahrnuty do výsledku vyhledávání.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filtry vyhledávání neúspěšných příchozích elektronických dokumentů";
    translation["inbound.sublist.sublistname"] =
        "Výsledky vyhledávání neúspěšných příchozích elektronických dokumentů";
    translation["inbound.sublist.internalid"] = "Interní ID";
    translation["inbound.sublist.vendor"] = "Dodavatel";
    translation["inbound.sublist.refnum"] = "Referenční číslo";
    translation["inbound.sublist.ponum"] = "Číslo NO";
    translation["inbound.sublist.datecreated"] = "Datum vytvoření";
    translation["inbound.sublist.edoctemplate"] =
        "Šablona elektronického dokumentu";
    translation["inbound.msg.conversionongoing"] =
        "Elektronický dokument se právě převádí. Po dokončení procesu obdržíte e-mail.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Pomocí vybraných kritérií nelze provést vyhledávání, protože pro období ({DATECREATED_FROM}–{DATECREATED_TO}) již probíhá převod příchozího elektronického dokumentu. Změňte kritéria vyhledávání, nebo akci opakujte po převodu tohoto elektronického dokumentu.";
    translation["inbound.invaliddates"] =
        "Datum Vytvořeno od nesmí být pozdější než datum Vytvořeno do. Změňte data tak, aby datum Vytvořeno do předcházelo datu Vytvořeno do.";
    translation["inbound.configurefreecountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing SuiteApp ve více zemích. Chcete-li hromadně převést elektronické dokumenty, obraťte se na správce účtu, který konfiguruje zemi elektronického dokumentu pro bezplatné použití na stránce s informacemi o společnosti.";
    translation["portlet.title"] = "Elektronické dokumenty";
    translation["portlet.outboundforgeneration"] =
        "Odchozí elektronické dokumenty ke generování";
    translation["portlet.outboundforsending"] =
        "Odchozí elektronické dokumenty k odeslání";
    translation["portlet.outboundwitherrors"] =
        "Odchozí elektronické dokumenty s chybami";
    translation["portlet.outboundsendinglink"] =
        "Odeslat neúspěšné odchozí elektronické dokumenty";
    translation["portlet.inboundforconversion"] =
        "Příchozí elektronické dokumenty k převodu";
    translation["portlet.inboundconvertfailed"] =
        "Převést neúspěšné příchozí elektronické dokumenty";
    translation["portlet.inboundincomplete"] =
        "Neúplné příchozí elektronické dokumenty";
    translation["portlet.inbounduploadlink"] =
        "Odeslat příchozí elektronický dokument";
    translation["portlet.outboundforcertification"] =
        "Odchozí elektronické dokumenty k certifikaci";
    translation["portlet.outboundcertifiedforsending"] =
        "Odchozí elektronické dokumenty k odeslání";
    translation["inbound.webservice.response.success"] =
        "Příchozí elektronický dokument s ID: {ID} byl úspěšně vytvořen.";
    translation["inbound.webservice.response.novendor"] =
        "S následujícím ID webové služby není spojen žádný dodavatel: {IDENTIFIER}. Použijte správné ID webové služby.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Příchozí elektronický dokument s ID: {ID} byl úspěšně vytvořen. S následujícím ID webové služby je spojeno více dodavatelů: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Příchozí elektronický dokument je neúplný, protože nelze identifikovat správnou šablonu. Vyberte šablonu v záznamu příchozího elektronického dokumentu, nebo nastavte soubor XSD v záznamu šablony elektronického dokumentu a povolte tak automatický výběr šablony.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Příchozí elektronický dokument je neúplný, protože nelze identifikovat správného dodavatele. Vyberte dodavatele v záznamu příchozího elektronického dokumentu, nebo nastavte ID webové služby v souvisejícím záznamu dodavatele.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Chybí následující klíče: {KEYS}. Tyto klíče je nutné zadat v požadavku webové služby.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Hlavní část požadavku webové služby musí být objekt JSON nebo pole objektů JSON používajících typ obsahu: application/json.";
    translation["transaction.contactnoemail"] =
        "Následující příjemci elektronického dokumentu nemají v záznamech kontaktu e-mailovou adresu: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Pro tuto transakci neexistují příjemci elektronického dokumentu. Chcete-li odesílat elektronické dokumenty e-mailem, je nutné na seznam příjemců přidat alespoň jeden kontakt.";
    translation["transaction.maxrecipientexceeded"] =
        "Počet příjemců e-mailu, které můžete přidat, překročil limit. Přidat můžete maximálně 10 příjemců e-mailu.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Zpracují se jen následující typy transakcí:";
    translation["ei.prefs.formtitle"] = "Předvolby el. dokumentů";
    translation["ei.prefs.information.about.certify.skip"] =
        "Pokud metoda odeslání certifikace není pro transakci definována nebo ji u transakce nelze použít, dojde k přeskočení kroku Certifikovat.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automatická elektronická fakturace";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Typ automatizace elektronických dokumentů";
    translation["ei.prefs.text.option.comb.disabled"] = "Deaktivovat";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Generovat, certifikovat, odeslat";
    translation["ei.prefs.text.option.comb.gc"] = "Generovat, certifikovat";
    translation["ei.prefs.text.option.comb.cs"] = "Certifikovat, odeslat";
    translation["ei.prefs.btn.label.cancel"] = "Zrušit";
    translation["ei.prefs.btn.label.save"] = "Uložit";
    translation["ei.prefs.msg.confirm.save"] =
        "Chcete uložit změny předvoleb elektronických dokumentů?";
    translation["ei.prefs.msg.success.save"] =
        "Uložení změn předvoleb elektronických dokumentů bylo úspěšné.";
    translation["ei.prefs.msg.failed.save"] =
        "Uložení změn předvoleb elektronických dokumentů selhalo.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Oprávnění k přístupu k této stránce je omezené na stanované osoby. Požádejte správce o přístup.";
    translation["ei.eip.msg.completed"] =
        "Zpracování elektronického dokumentu bylo dokončeno.";
    translation["ei.eip.msg.failed"] =
        "Zpracování elektronického dokumentu selhalo. Detaily najdete v auditním záznamu elektronického dokumentu.";
    translation["ei.eip.msg.processing"] =
        "Elektronický dokument se právě zpracovává.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Elektronický dokument se již zpracovává.";
    translation["license.notinstalled"] =
        "Klient licence k aplikacím SuiteApp NetSuite není ve vašem účtu k dispozici. Chcete-li využívat funkce aplikace Electronic Invoicing, instalujte tuto aplikaci SuiteApp.";
    translation["outbound.formtitle"] =
        "Odeslat neúspěšné elektronické dokumenty";
    translation["outbound.search"] = "Hledat";
    translation["outbound.send"] = "Odeslat";
    translation["outbound.return"] = "Zpět na kritéria";
    translation["outbound.customer"] = "Zákazník";
    translation["outbound.vendor"] = "Dodavatel";
    translation["outbound.subsidiary"] = "Pobočka";
    translation["outbound.type"] = "Typ transakce";
    translation["outbound.datefrom"] = "Počáteční datum transakce";
    translation["outbound.dateto"] = "Koncové datum transakce";
    translation["outbound.subshelp"] =
        "Výběrem pobočky zobrazíte pouze transakce, které k této pobočce náležejí.";
    translation["outbound.custhelp"] =
        "Výběrem zákazníka zobrazíte pouze transakce, které k tomuto zákazníkovi náležejí. Pokud není vybrán žádný zákazník, výsledky hledání zobrazí všechny transakce náležející pobočce, bez ohledu na zákazníka.";
    translation["outbound.vendorhelp"] =
        "Výběrem dodavatele zobrazíte pouze transakce, které k tomuto dodavateli náležejí. Pokud není vybrán žádný dodavatel, výsledky hledání zobrazí všechny transakce náležející pobočce, bez ohledu na dodavatele.";
    translation["outbound.entitytypehelp"] =
        "Zvolte typ entity Zákazník, nebo Dodavatel. Aktivujete tak odpovídající rozevírací seznam níže.";
    translation["outbound.typehelp"] =
        "U každého elektronického dokumentu, který chcete odeslat, vyberte nejméně jeden typ transakce. Pokud chcete vybrat více typů transakcí, podržte při výběru jednotlivých položek klávesu Ctrl.<br /><br /> Není-li vybrán žádný typ transakce, zobrazí se ve výsledcích vyhledávání všechny elektronické dokumenty připravené k odeslání bez ohledu na typ transakce.";
    translation["outbound.datefromhelp"] =
        "Chcete-li si zobrazit seznam transakcí vytvořených v určitém období, vyberte datum a definujte začátek rozsahu dat.";
    translation["outbound.datetohelp"] =
        "Chcete-li si zobrazit seznam transakcí vytvořených v určitém období, vyberte datum a definujte konec rozsahu dat.";
    translation["outbound.entityfieldgroup"] = "Filtry vyhledávání entity";
    translation["outbound.filtersfieldgroup"] = "Filtry vyhledávání transakce";
    translation["outbound.entitytypeinlinehelp"] = "Vyberte typ entity:";
    translation["outbound.invalidtypetitle"] = "Neplatné typy transakce";
    translation["outbound.invalidtype"] =
        "Následující typy transakcí momentálně nejsou podporovány: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Následující typy transakcí nejsou pro vybranou entitu platné: {TRANSACTIONTYPES}. Pro vybranou entitu zvolte příslušné typy transakcí.";
    translation["outbound.invaliddates"] =
        "Počáteční datum transakcí nesmí být pozdější než koncové datum transakcí. Změňte data tak, aby počáteční datum transakcí předcházelo koncovému datu transakcí.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Pomocí vybraných kritérií nelze provést vyhledávání, protože pro období ({TRANDATE_FROM} - {TRANDATE_TO}) a pobočku ({SUBSIDIARY}) již probíhá odesílání elektronického dokumentu. Změňte kritéria vyhledávání, nebo akci opakujte po odeslání tohoto elektronického dokumentu.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Pomocí vybraných kritérií nelze provést vyhledávání, protože pro období ({TRANDATE_FROM} - {TRANDATE_TO}) již probíhá odesílání elektronického dokumentu. Změňte kritéria vyhledávání, nebo akci opakujte po odeslání tohoto elektronického dokumentu.";
    translation["outbound.sublist.trannum"] = "Číslo transakce";
    translation["outbound.sublist.trantype"] = "Typ transakce";
    translation["outbound.sublist.customer"] = "Zákazník";
    translation["outbound.sublist.vendor"] = "Dodavatel";
    translation["outbound.sublist.subsidiary"] = "Pobočka";
    translation["outbound.sublist.trandate"] = "Datum transakce";
    translation["outbound.sublist.memo"] = "Poznámka";
    translation["outbound.sublist.template"] = "Šablona";
    translation["outbound.sublist.sendingmethod"] = "Metoda odeslání";
    translation["outbound.sublist.sublistname"] =
        "Výsledek neúspěšných odchozích elektronických dokumentů určených k odeslání";
    translation["outbound.msg.sendingongoing"] =
        "Elektronický dokument se právě odesílá. Po dokončení procesu obdržíte e-mail.";
    translation["outbound.configurefreecountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí. Chcete-li hromadně odeslat elektronické dokumenty, obraťte se na správce účtu, který konfiguruje zemi elektronického dokumentu pro bezplatné použití na stránce s informacemi o společnosti.";
    translation["outbound.entitysend"] = "Odeslat entitě";
    translation["outbound.certifysend"] = "Odeslat k certifikaci";
    translation["outbound.sendingtypehelp"] =
        "Zvolte buď Odeslat entitě, nebo Odeslat k certifikaci. Zobrazí se odpovídající transakce odeslání.";
    translation["customer.noemail"] =
        "Pro tohoto zákazníka neexistuje e-mailová adresa. Chcete-li povolit odesílání elektronických dokumentů e-mailem, zadejte do záznamu zákazníka platnou e-mailovou adresu.";
    translation["customer.contactnoemail"] =
        "Následující příjemci elektronického dokumentu nemají v záznamech kontaktu e-mailovou adresu: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Pro tohoto zákazníka neexistují příjemci elektronického dokumentu. Chcete-li tomuto zákazníkovi odesílat elektronické dokumenty e-mailem, je nutné na seznam příjemců přidat alespoň jeden kontakt.";
    translation["customer.arrayrequired"] =
        "Pole kontaktů vyžadované pro validaci.";
    translation["customer.parameternotarray"] = "Parametr kontaktů není pole.";
    translation["customer.maxrecipientexceeded"] =
        "Překročili jste maximální povolený počet příjemců e-mailu. Vybrat můžete maximálně 10 příjemců e-mailu.";
    translation["vendor.noemail"] =
        "Pro tohoto dodavatele neexistuje e-mailová adresa. Chcete-li povolit odesílání elektronických dokumentů e-mailem, zadejte do záznamu dodavatele platnou e-mailovou adresu.";
    translation["vendor.contactnoemail"] =
        "Následující příjemci elektronického dokumentu nemají v záznamech kontaktu e-mailovou adresu: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Pro tohoto dodavatele neexistují příjemci elektronického dokumentu. Chcete-li tomuto dodavateli odesílat elektronické dokumenty e-mailem, je nutné na seznam příjemců přidat alespoň jeden kontakt.";
    translation["vendor.maxrecipientexceeded"] =
        "Překročili jste maximální povolený počet příjemců e-mailu. Vybrat můžete maximálně 10 příjemců e-mailu.";
    translation["vendor.nosenders"] =
        "Pro tohoto dodavatele neexistuje odesílatel e-mailu s elektronickým dokumentem. Chcete-li od tohoto dodavatele přijímat elektronické dokumenty prostřednictvím e-mailu, je nutné na seznam odesílatelů e-mailů s elektronickými dokumenty dodavatele zadat alespoň jednu e-mailovou adresu.";
    translation["vendor.existingsender"] =
        "E-mailová adresa odesílatele již existuje.";
    translation["vendor.existingdomain"] =
        "E-mailovou doménu odesílatele již používá jiný dodavatel.";
    translation["vendor.existingidentifier"] =
        "ID webové služby již používá jiný dodavatel. Zadejte jiné ID webové služby.";
    translation["customeremailrecipient.contextunsupported"] =
        "Příjemce e-mailu s elektronickým dokumentem zákazníka podporuje pouze následující kontexty: UI, CSV, SuiteScript a webové služby.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Příjemce e-mailu s elektronickým dokumentem dodavatele podporuje pouze následující kontexty: UI, CSV, SuiteScript a webové služby.";
    translation["vendoremailsender.contextunsupported"] =
        "Odesilatel e-mailu s elektronickým dokumentem dodavatele podporuje pouze následující kontexty: UI, CSV, SuiteScript a webové služby.";
    translation["template.incorrectregex"] =
        "Pole REGEX obsahuje nesprávný regulární výraz. Je nutné použít správnou syntaxi.";
    translation["template.invalidjson"] =
        "V šabloně jste v poli Odchozí elektronické dokumenty nezadali správně vytvořený soubor JSON. Pokračujte kliknutím na tlačítko OK, kliknutím na tlačítko Zrušit zůstanete na aktuální stránce.";
    translation["template.invalidxml"] =
        "Šablona XML obsahuje chyby. Formát XML musí být správný.";
    translation["template.templaterequired"] =
        "Obsah šablony pro vybraný typ odchozí transakce chybí. Zadejte do pole Odchozí elektronické dokumenty platný obsah šablony XML nebo JSON a zkuste to znovu.";
    translation["template.mappingrequired"] =
        "Vybrali jste typ příchozí transakce, ale chybí obsah JSON v mapování polí. Zadejte jej do mapování polí v poli Příchozí elektronické dokumenty.";
    translation["template.templateorjsonrequired"] =
        "V některých polích chybí hodnoty. U odchozí transakce zadejte v šabloně platný obsah XML nebo JSON do pole Odchozí elektronické dokumenty. U příchozí transakce zadejte obsah JSON v mapování polí v poli Příchozí elektronické dokumenty.";
    translation["template.invalidxsdfile"] =
        "Vybraný soubor XSD není platný soubor XSD. Zkontrolujte, zda má vybraný soubor koncovku .xsd.";
    translation["template.contextunsupported"] =
        "Šablona elektronického dokumentu podporuje pouze kontexty UI a SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Vyberte jeden nebo více typů transakce, které bude tato šablona podporovat. Chcete-li vybrat více typů transakcí, podržte při výběru jednotlivých položek klávesu Ctrl.<br /><br /> Jestliže některý typ transakce nelze vybrat, znamená to, že šablona již byla přiřazena jednomu nebo více záznamům transakce daného typu. Je nutné šablonu ze záznamu odebrat, a poté bude možné typ transakce vybrat.<br /><br />Šablonu můžete přiřadit také příchozím elektronickým dokumentům. Tím deaktivujete pole Typ transakce.";
    translation["template.eistatus"] =
        "Omezit úpravy transakcí se stavem elektronického dokumentu";
    translation["template.supportedeistatusfieldhelp"] =
        "Transakce s vybraným stavem elektronického dokumentu nebude možné upravovat, když k nim bude přiřazena tato šablona. Lze vybrat více stavů elektronického dokumentu.";
    translation["template.invalidschemaordependency"] =
        "Schéma je nesprávně strukturovaný soubor XSD nebo se závislé schéma nepodařilo najít.";
    translation["template.xmldoesnotconformtoschema"] =
        "Soubor XML šablony nesplňuje zadané XSD nebo schéma.";
    translation["template.xmldomexception"] =
        "Vstupní řetězec XML má chybný formát.";
    translation["template.missingreqdargument"] =
        "XSD odchozího ověření chybí.";
    translation["template.xsdvalidationexception"] =
        "Během ověřování XSD došlo k neznámé chybě.";
    translation["template.xsdmissingdependencyfolder"] =
        "Složka schématu XSD není platná nebo chybí.";
    translation["invoice.generatebtn"] = "Generovat elektronický dokument";
    translation["invoice.sendbtn"] = "Odeslat elektronický dokument";
    translation["invoice.sendcertifybtn"] =
        "Certifikovat elektronický dokument";
    translation["invoice.eipbtn"] = "Zpracovat elektronický dokument";
    translation["invoice.loguntagged"] =
        "Šablona elektronického dokumentu byla odebrána. Označení transakce pro generování elektronického dokumentu bylo zrušeno.";
    translation["invoice.logforgenerate"] =
        "Transakce je připravena ke generování elektronického dokumentu.";
    translation["invoice.invalidtemplatesub"] =
        "Pobočka transakce není pro vybranou šablonu elektronického dokumentu platná. Vyberte jinou šablonu elektronického dokumentu.";
    translation["invoice.templateremovalerror"] =
        "Odebrání šablony elektronického dokumentu pro odeslané elektronické dokumenty není povoleno.";
    translation["ei.sending.currentlysending"] =
        "Elektronický dokument se právě odesílá. Tato akce může několik minut trvat. Během zpracování neklikejte znovu na tlačítko Odeslat elektronický dokument. Po odeslání dokumentu se stránka znovu načte.";
    translation["ei.sending.notready"] =
        "Tento elektronický dokument není připraven k odeslání. Nejprve je nutné kliknutím na tlačítko Vygenerovat elektronický dokument tento dokument vytvořit.";
    translation["ei.sending.alreadysent"] = "Tato transakce již byla odeslána.";
    translation["ei.sending.norecipients"] =
        "Elektronický dokument nelze odeslat, protože zákazník nemá žádné příjemce elektronických dokumentů. Před odesláním tohoto elektronického dokumentu e-mailem je nutné nejprve v záznamu zákazníka vybrat příjemce elektronického dokumentu.";
    translation["ei.sending.indivcustnoemail"] =
        "Elektronický dokument nelze odeslat, protože zákazník nemá žádné e-mailové adresy. Před odesláním tohoto elektronického dokumentu e-mailem je nutné nejprve v záznamu zákazníka zadat e-mailovou adresu.";
    translation["ei.sending.norecipients.vendor"] =
        "Elektronický dokument nelze odeslat, protože dodavatel nemá žádné příjemce elektronických dokumentů. Před odesláním tohoto elektronického dokumentu e-mailem je nutné nejprve v záznamu dodavatele vybrat příjemce elektronického dokumentu.";
    translation["ei.sending.indivvendnoemail"] =
        "Elektronický dokument nelze odeslat, protože dodavatel nemá žádné e-mailové adresy. Před odesláním tohoto elektronického dokumentu e-mailem je nutné nejprve v záznamu dodavatele zadat e-mailovou adresu.";
    translation["ei.sending.invalidmethod"] =
        "Vyberte platnou metodu odeslání pro dokument {TYPE} č. {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Odesílatel: {SENDER}\nPříjemci: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Odesilatel elektronického dokumentu ({EMPLOYEENAME}) nemá e-mailovou adresu. Zadejte v záznamu zaměstnance platnou e-mailovou adresu.";
    translation["ei.sending.recipientnoemail"] =
        "Jeden nebo více příjemců elektronického dokumentu spojených s touto transakcí nemá e-mailovou adresu. Ověřte, zda příjemci pro tohoto zákazníka mají platné e-mailové adresy.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Jeden nebo více příjemců elektronického dokumentu spojených s touto transakcí nemá e-mailovou adresu. Ověřte, zda příjemci pro tohoto dodavatele mají platné e-mailové adresy.";
    translation["ei.sending.defaulterror"] =
        "Během odesílání elektronického dokumentu došlo k chybě. Podrobnosti naleznete v auditním záznamu elektronického dokumentu na dílčí záložce Elektronický dokument.";
    translation["ei.sending.inactivecustomer"] =
        "Elektronický dokument pro tuto transakci nelze odeslat, protože vybraný zákazník je neaktivní. Pole Stav elektronického dokumentu nebylo aktualizováno a auditní záznam nebyl vytvořen. Zrušte zaškrtnutí políčka Neaktivní v záznamu zákazníka a zkuste elektronický dokument odeslat znovu.";
    translation["ei.sending.inactivevendor"] =
        "Elektronický dokument pro tuto transakci nelze odeslat, protože vybraný dodavatel je neaktivní. Pole Stav elektronického dokumentu nebylo aktualizováno a auditní záznam nebyl vytvořen. Zrušte zaškrtnutí políčka Neaktivní v záznamu dodavatele a zkuste elektronický dokument odeslat znovu.";
    translation["ei.sending.msg.processcomplete"] =
        "Elektronický dokument byl odeslán.";
    translation["ei.sending.configurefreecountry"] =
        "Chcete-li používat aplikaci Electronic Invoicing pro více zemí, musí pro váš účet existovat aktivní licence. Chcete-li hromadně odesílat elektronické dokumenty do jedné země, je třeba v poli Země elektronického dokumentu k volnému použití na stránce Informace o společnosti vybrat zemi.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Elektronický dokument nepodporuje transakce s neaktivními zákazníky.";
    translation["ei.sending.inactivevendor.manager"] =
        "Elektronický dokument nepodporuje transakce s neaktivními dodavateli.";
    translation["ei.sending.certification.defaulterror"] =
        "Během certifikace elektronického dokumentu došlo k chybě. Podrobnosti naleznete v auditním záznamu elektronického dokumentu na dílčí záložce Elektronický dokument.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Elektronický dokument byl odeslán k certifikaci.";
    translation["ei.generation.generationlogbulk"] =
        "Elektronický dokument byl generován hromadně pomocí šablony {TEMPLATENAME}.";
    translation["ei.generation.generationlog"] =
        "Elektronický dokument byl generován pomocí šablony {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Elektronický dokument a soubor PDF byly generovány hromadně pomocí šablony elektronického dokumentu {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflog"] =
        "Elektronický dokument a soubor PDF byly generovány pomocí šablony elektronického dokumentu {TEMPLATENAME}.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Elektronický dokument byl generován hromadně pomocí šablony {TEMPLATENAME}. Dříve generovaný soubor PDF této transakce byl odstraněn.";
    translation["ei.generation.generationremovedpdflog"] =
        "Elektronický dokument byl generován pomocí šablony {TEMPLATENAME}. Dříve generovaný soubor PDF této transakce byl odstraněn.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Proces hromadného generování\nPoužitá šablona elektronického dokumentu: {TEMPLATENAME}\nDetaily chyb: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Použitá šablona elektronického dokumentu: {TEMPLATENAME}\nDetaily chyb: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Během generování došlo k chybě. Podrobnosti naleznete v auditním záznamu elektronického dokumentu na dílčí záložce Elektronický dokument.";
    translation["ei.generation.inactivecustomer"] =
        "Elektronický dokument pro tuto transakci nelze vygenerovat, protože vybraný zákazník je neaktivní. Pole Stav elektronického dokumentu nebylo aktualizováno a auditní záznam nebyl vytvořen. Zrušte zaškrtnutí políčka Neaktivní v záznamu zákazníka a zkuste elektronický dokument vygenerovat znovu.";
    translation["ei.generation.inactivevendor"] =
        "Elektronický dokument pro tuto transakci nelze vygenerovat, protože vybraný dodavatel je neaktivní. Pole Stav elektronického dokumentu nebylo aktualizováno a auditní záznam nebyl vytvořen. Zrušte zaškrtnutí políčka Neaktivní v záznamu dodavatele a zkuste elektronický dokument vygenerovat znovu.";
    translation["ei.generation.msg.processcomplete"] =
        "Elektronický dokument byl vygenerován.";
    translation["ei.generation.configurefreecountry"] =
        "Chcete-li používat aplikaci Electronic Invoicing pro více zemí, musí pro váš účet existovat aktivní licence. Chcete-li hromadně generovat elektronické dokumenty pro jednu zemi, je třeba v poli Země elektronického dokumentu k volnému použití na stránce Informace o společnosti vybrat zemi.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Elektronický dokument nepodporuje transakce s neaktivními zákazníky.";
    translation["ei.generation.inactivevendor.generator"] =
        "Elektronický dokument nepodporuje transakce s neaktivními dodavateli.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Elektronický dokument byl vygenerován a úspěšně digitálně podepsán.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Generování selhalo, protože výsledný elektronický dokument není správně vytvořený soubor XML ani JSON.";
    translation["notify.batchownersubject"] =
        "Odesílání elektronického dokumentu bylo dokončeno";
    translation["notify.batchownerbody"] =
        "Dobrý den, <br/><br/>váš požadavek na odeslání elektronických dokumentů byl dokončen.<br/>Odesláno: {SENT} z {TOTAL} dokumentů. Podrobnosti najdete v přiloženém souboru. <br/><br/>Děkujeme,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Elektronický dokument vygenerován pro NO č. {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Elektronický dokument vygenerován od společnosti {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Dobrý den, <br /><br />{MESSAGE}<br />v příloze najdete soubor elektronického dokumentu.<br /><br />Děkujeme,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Během generování elektronického dokumentu došlo k chybě";
    translation["notify.generationerrorbody"] =
        "Během generování elektronického dokumentu se vyskytly chyby.<br/>V přiloženém souboru najdete seznam transakcí a detaily chyb.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Pro tuto transakci byl již odeslán elektronický dokument. Vygenerováním nového elektronického dokumentu přepíšete dokument předchozí. Opravdu chcete vygenerovat nový elektronický dokument?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Odebrání šablony elektronického dokumentu pro odeslané elektronické dokumenty není povoleno.";
    translation["transaction.msg.generate.information"] =
        "Probíhá generování tohoto elektronického dokumentu.";
    translation["transaction.msg.send.information"] =
        "Probíhá odesílání tohoto elektronického dokumentu.";
    translation["transaction.msg.send.certify.information"] =
        "Probíhá certifikace tohoto elektronického dokumentu.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Již probíhá generování tohoto elektronického dokumentu.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Již probíhá odesílání tohoto elektronického dokumentu.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Již probíhá certifikace tohoto elektronického dokumentu.";
    translation["transaction.msg.uncheckpdf"] =
        "Během posledního generování elektronického dokumentu byl vytvořen soubor PDF pro tuto transakci. Zrušením zaškrtnutí tohoto políčka tento soubor PDF vymažete při dalším generování elektronického dokumentu.";
    translation["transaction.msg.nofreecountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí. Chcete-li generovat elektronický dokument pro tuto transakci, obraťte se na správce účtu, který konfiguruje zemi elektronického dokumentu pro bezplatné použití na stránce s informacemi o společnosti.";
    translation["transaction.msg.otherbillingcountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí. Chcete-li generovat elektronický dokument pro tuto transakci, obraťte se na správce účtu NetSuite a zakupte si licenci.";
    translation["transaction.msg.nobillingcountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí. Chcete-li generovat elektronický dokument pro tuto transakci, uveďte fakturační adresu pro tuto transakci.";
    translation["transaction.msg.noshippingcountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí. Chcete-li generovat elektronický dokument pro tuto transakci, uveďte dodací adresu pro tuto transakci.";
    translation["transaction.msg.nocustomercountry"] =
        "Tento účet nemá aktivní licenci k použití aplikace Electronic Invoicing pro více zemí. Chcete-li generovat elektronický dokument pro tuto transakci, uveďte výchozí fakturační adresu zákazníka této transakce.";
    translation["transaction.msg.blockededittransaction"] =
        "Úpravy transakce jsou pro aktuální stav elektronického dokumentu blokovány. Podrobnosti najdete v přiložené šabloně elektronické faktury.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Změnou hodnoty v poli Typ obsahu z XML na jiný typ odstraníte všechny validátory XML. Opravdu chcete typ obsahu změnit?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Přidat lze pouze validátory pro typ obsahu XML.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Tento validátor je již na seznamu.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Validátory šablony elektronického dokumentu podporují pouze kontexty UI a SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "Záznam {DEFAULT_DOCUMENT_STANDARD} již existuje. Nelze vytvořit záznam balíčku dokumentu se stejným názvem. Přejmenujte záznam balíčku dokumentu a zkuste to znovu.";
    translation["standarddocument.default.editnotallowed"] =
        "Úprava názvu nebo popisu záznamu {DEFAULT_DOCUMENT_STANDARD} není povolena.";
    translation["standarddocument.default.deletenotallowed"] =
        "Vymazání záznamu {DEFAULT_DOCUMENT_STANDARD} není povoleno.";
    translation["standarddocument.contextunsupported"] =
        "Balíček elektronického dokumentu podporuje pouze kontexty UI, Import CSV a SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "Záznam metody odeslání {DEFAULT_SENDING_METHOD_NAME} již existuje. Nelze vytvořit záznam metody odeslání se stejným názvem. Přejmenujte záznam metody odeslání a zkuste to znovu.";
    translation["sendingmethod.default.editnotallowed"] =
        "Úprava záznamu metody odeslání {DEFAULT_SENDING_METHOD_NAME} není povolena.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Vymazání záznamu metody odeslání {DEFAULT_SENDING_METHOD_NAME} není povoleno.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Pole Typ transakce bylo zakázáno, protože tato metoda odeslání je přiřazena k jednomu nebo více záznamům transakce. Chcete-li tuto metodu odeslání upravit, odeberte ji ze záznamu transakce, čímž se aktivuje pole Typ transakce, a zkuste to znovu.";
    translation["sendingmethod.contextunsupported"] =
        "Metoda odeslání elektronického dokumentu podporuje pouze kontexty UI a SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Vyberte jeden nebo více typů transakce, které bude tato metoda odeslání podporovat. Chcete-li vybrat více typů transakce, podržte při výběru jednotlivých položek klávesu Ctrl.<br /><br />Pokud některý z typů transakce nelze vybrat, znamená to, že metoda odeslání již byla přiřazena jednomu nebo více záznamům transakce daného typu. Metodu odeslání je nutné ze záznamu transakce odebrat, a poté bude možné typ transakce vybrat.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementace modulu plugin metody odeslání elektronického dokumentu";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Vyberte implementaci modulu plugin metody odeslání";
    translation["sendingmethod.scriptbannermessage"] =
        "Metody odeslání by měly být implementace vlastního modulu plugin. Znovu vytvořte existující skripty metod odeslání jako nové implementace vlastního modulu plugin typu Modul plugin pro odesílání.";
    translation["customdatasource.pluginimplementation"] =
        "Implementace vlastního modulu plugin datového zdroje";
    translation["customdatasource.pluginimplementationhelp"] =
        "Vyberte implementaci vlastního modulu plugin datového zdroje";
    translation["digitalsignature.pluginimplementation"] =
        "Implementace modulu plugin pro digitální podpis";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Vyberte implementaci modulu plugin. Toto pole je povinné, pokud chcete digitálně podepisovat elektronické dokumenty.";
    translation["digitalsignature.identifierlabel"] =
        "Tento elektronický dokument je digitálně podepsán";
    translation["digitalsignature.successlog"] =
        "Vygenerovaný elektronický dokument byl digitálně podepsán.";
    translation["digitalsignature.failurelog"] =
        "Vygenerovaný elektronický dokument nebyl digitálně podepsán.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Implementace modulu plugin pro digitální podpis vrátila stav Neúspěch.";
    translation["digitalsignature.plugininvalidresult"] =
        "Výsledek vrácený z implementace modulu plugin pro digitální podpis je neplatný.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementace modulu plugin pro zdroj příchozích vlastních dat";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Vyberte implementaci modulu plugin pro zdroj příchozích vlastních dat.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Výsledek implementace modulu plugin pro zdroj příchozích vlastních dat je neplatný.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementace modulu plugin pro odchozí ověření";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Vyberte implementaci modulu plugin pro ověření odchozích elektronických dokumentů. Tento modul ověřuje odchozích elektronické dokumenty.";
    translation["outboundvalidation.successlog"] =
        "Odchozí ověření proběhlo úspěšně.";
    translation["outboundvalidation.failurelog"] = "Odchozí ověření selhalo.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Implementace modulu plugin pro odchozí ověření vrátila stav selhání.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Implementace modulu plugin pro odchozí ověření je neplatná.";
    translation["template.msg.cannotedittransactiontype"] =
        "Pole Typ transakce bylo zakázáno, protože tato šablona je přiřazena k jednomu nebo více záznamům transakce. Chcete-li tuto šablonu upravit, odeberte ji ze záznamu transakce, čímž se aktivuje pole Typ transakce, a zkuste to znovu. Tuto šablonu můžete přiřadit také příchozím dokumentům, čímž zakážete pole Typ transakce.";
    translation["template.msg.forcetocopymessage"] =
        "Výchozí šablonu elektronického dokumentu nelze upravovat. Buď ji pomocí volby Vytvořit kopii v nabídce Akce zkopírujte, nebo vytvořte novou.";
    translation["template.msg.warningoneditmessage"] =
        "Toto je výchozí šablona elektronického dokumentu. Po aktualizaci aplikace SuiteApp budou veškeré změny provedené v této šabloně ztraceny nebo přepsány.";
    translation["email.batchownernotification.subject"] =
        "Odesílání elektronického dokumentu bylo dokončeno";
    translation["email.batchownernotification.body"] =
        "Dobrý den, <br/><br/>vaše elektronické dokumenty byly odeslány.<br/>Odesláno: {SENT} z {TOTAL} dokumentů. Podrobnosti najdete v přiloženém souboru. <br/><br/>Děkujeme,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Převod elektronického dokumentu byl dokončen";
    translation["email.batchownerconvertnotification.body"] =
        "Dobrý den, <br/><br/>vaše elektronické dokumenty byly převedeny.<br/>Převedeno: {CONVERTED} z {TOTAL} dokumentů. Podrobnosti najdete v přiloženém souboru. <br/><br/>Děkujeme,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Elektronický dokument vygenerován pro NO č. {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Elektronický dokument od společnosti {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Byl generován elektronický dokument pro transakci č. {TRANID} typu {TRANTYPE}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Dobrý den, <br /><br />byl generován elektronický dokument k nákupní objednávce č. {PONUM}.<br />Podrobnosti najdete v přiloženém souboru elektronického dokumentu.<br /><br />Děkujeme,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Dobrý den, <br /><br />byl generován elektronický dokument pro transakci č.{TRANID} typu {TYPE}.<br />Podrobnosti najdete v přiloženém souboru elektronického dokumentu.<br /><br />Děkujeme,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Během generování elektronického dokumentu došlo k chybě";
    translation["email.generationerrornotification.body"] =
        "Během generování elektronického dokumentu se vyskytly chyby.<br/>V přiloženém souboru najdete seznam transakcí a detaily chyb.";
    translation["email.sendingerrornotification.subject"] =
        "Během odesílání elektronického dokumentu došlo k chybě";
    translation["email.sendingerrornotification.body"] =
        "Během odesílání elektronického dokumentu se vyskytly chyby.<br/>V přiloženém souboru najdete seznam transakcí a detaily chyb.";
    translation["email.webserviceerror.subject"] =
        "Oznámení webové služby pro příchozí elektronický dokument";
    translation["email.webserviceerror.body"] =
        "<p>Dobrý den,</p><p>při zpracování příchozího elektronického dokumentu pomocí webové služby byly zjištěny chyby.<br/>Detaily najdete v následující tabulce.</p>{DETAIL_TABLE}<p>Děkujeme,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Číslo transakce";

    return translation;
});
