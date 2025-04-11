define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Tiedot";
    translation["email.attachment.collabel.transactiontype"] =
        "Tapahtumatyyppi";
    translation["email.attachment.collabel.internalid"] = "Sisäinen tunnus";
    translation["email.attachment.collabel.vendor"] = "Toimittaja";
    translation["email.conversionerrornotification.subject"] =
        "Saapuvan sähköisen asiakirjan muunnon aikana tapahtui virhe";
    translation["email.conversionerrornotification.body"] =
        "Saapuvan sähköisen asiakirjan muunnon aikana tapahtui virheitä.<br/>Tietueiden luettelo ja lisätietoja virheistä on liitetiedostossa.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Huomautus: Jos haluat, että ilmoitukset lähetetään muille käyttäjille kuin tilisi pääkäyttäjille, lisää käyttäjän sähköpostiosoite Sähköisten asiakirjojen ilmoitusten vastaanottaja -kenttään emoyhtiötietueessa.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Saapuvan sähköisen asiakirjan tunnus";
    translation["email.table.collabel.details"] = "Tiedot";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Virhe tilin lisenssin tarkistuksen aikana";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa.</br>Jos haluat toteuttaa sähköisten asiakirjojen joukkokäsittelyn, määritä sähköisen asiakirjan maa ilmaista käyttöä varten Yritystiedot-sivulla.";
    translation["inboundedocument.logforconversion"] =
        "Saapuva sähköinen asiakirja on valmis muunnettavaksi.";
    translation["inboundedocument.logincomplete"] =
        "Saapuva sähköinen asiakirja on keskeneräinen. Kenttää {FIELD} ei ole valittu.";
    translation["inboundedocument.deletenotallowed"] =
        "Saapuvan sähköisen asiakirjan poistoa ei sallita.";
    translation["inboundedocument.copynotallowed"] =
        "Saapuvan sähköisen asiakirjan kopiointia ei sallita.";
    translation["inboundedocument.contextunsupported"] =
        "Saapuva sähköinen asiakirja tukee vain käyttöliittymä- ja SuiteScript-konteksteja.";
    translation["inboundedocument.invalidxmlfile"] =
        "Valittu XML-tiedostoviite ei ole sallittu XML-tiedosto. Varmista, että valitsemallasi tiedostolla on .xml-pääte.";
    translation["inboundedocument.invalidpdffile"] =
        "Valittu PDF-tiedostoviite ei ole sallittu PDF-tiedosto. Varmista, että valitsemallasi tiedostolla on .pdf-pääte.";
    translation["inboundedocument.invalidxml"] =
        "Valittu XML-tiedostoviite ei ole oikein muotoiltu XML-asiakirja.";
    translation["inboundedocument.convert.button"] = "Muunna";
    translation["inboundedocument.convert.information"] =
        "Tämän saapuvan sähköisen asiakirjan muunto on käynnissä.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Tämän saapuvan sähköisen asiakirjan muunto on jo käynnissä.";
    translation["inboundedocument.cancel.button"] =
        "Peruuta sähköinen asiakirja";
    translation["inboundedocument.cancel.confirmation"] =
        "Haluatko varmasti peruuttaa tämän saapuvan sähköisen asiakirjan?";
    translation["inboundedocument.cancel.failed"] =
        "Peruutus epäonnistui, koska saapuvan sähköisen asiakirjan tietueen tila on {STATUS}";
    translation["inboundedocument.cancel.defaulterror"] =
        "Peruutuksen aikana tapahtui virhe. Tarkista sähköisten asiakirjojen kirjausketju Sähköiset asiakirjat -alivälilehdessä, jos haluat lisätietoja.";
    translation["inboundedocument.cancel.complete"] =
        "Sähköinen asiakirja on peruutettu.";
    translation["inboundedocument.preview.button"] = "Tarkastele XML:ää";
    translation["inboundedocument.msg.nofreecountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing SuiteApp -sovelluksen käyttöön monessa maassa. Jos haluat muuntaa tämän sähköisen asiakirjan tapahtumaksi, ota yhteyttä tilisi pääkäyttäjään ja määritä sähköisen asiakirjan maa vapaaseen käyttöön Yritystiedot-sivulla.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing SuiteApp -sovelluksen käyttöön monessa maassa. Jos haluat muuntaa tämän sähköisen asiakirjan tapahtumaksi, ota yhteyttä NetSuite-asiakaspäällikköön ja osta lisenssi.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing SuiteApp -sovelluksen käyttöön monessa maassa. Jos haluat muuntaa tämän sähköisen asiakirjan tapahtumaksi, määritä oletuslaskutusosoite valitulle toimittajalle.";
    translation["validationplugin.contextunsupported"] =
        "Saapuvan sähköisen asiakirjan tarkistuksen liitännäinen tukee vain käyttöliittymä- ja SuiteScript-konteksteja.";
    translation["validationplugin.pluginimplementation"] =
        "Saapuvan sähköisen asiakirjan tarkistuksen liitännäisen käyttöönotto";
    translation["validationplugin.pluginimplementationhelp"] =
        "Valitse saapuvan sähköisen asiakirjan tarkistusliitännäisen käyttöönotto.";
    translation["validationplugin.scriptbannermessage"] =
        "Saapuvien sähköisten asiakirjojen tarkistuksen on oltava mukautettu liitännäinen. Luo nykyiset tarkistuskomentosarjat uudestaan mukautettuina liitännäisinä, joiden tyyppi on Saapuvan asiakirjan tarkistuksen liitännäinen";
    translation["ei.conversion.defaulterror"] =
        "Muunnon aikana tapahtui virhe. Tarkista sähköisten asiakirjojen kirjausketju Sähköiset asiakirjat -alivälilehdessä, jos haluat lisätietoja.";
    translation["ei.conversion.inactivevendor"] =
        "Tätä saapuvaa sähköistä asiakirjaa ei voitu muuntaa, sillä valittu toimittaja ei ole aktiivinen. Sähköisen asiakirjan tila -kenttää ei ole päivitetty eikä kirjausketjua ole luotu. Poista Ei aktiivinen -ruudun valinta toimittajatietueesta ja yritä sitten muuntaa sähköinen asiakirja uudelleen.";
    translation["ei.conversion.inactivecustomer"] =
        "Tätä saapuvaa sähköistä asiakirjaa ei voitu muuntaa, sillä valittu asiakas ei ole aktiivinen. Sähköisen asiakirjan tila -kenttää ei ole päivitetty eikä kirjausketjua ole luotu. Poista Ei aktiivinen -ruudun valinta asiakastietueesta ja yritä sitten muuntaa sähköinen asiakirja uudelleen.";
    translation["ei.conversion.conversioncomplete"] =
        "Sähköinen asiakirja on muunnettu.";
    translation["ei.conversion.conversionlogbulk"] =
        "Saapuva sähköinen asiakirja sisältyi joukkomuuntoon ja se muunnettiin tapahtumaan, jonka sisäinen tunnus on {INTERNALID} ja tyyppi {TYPE}.";
    translation["ei.conversion.conversionlog"] =
        "Saapuva sähköinen asiakirja muunnettiin tapahtumaan, jonka sisäinen tunnus on {INTERNALID} ja tyyppi {TYPE}";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Joukkomuuntoprosessi\nKäytetty sähköisen asiakirjan malli: {TEMPLATENAME}\nVirheen vaikutusalue: {ERRORSCOPE}\nVirheen tiedot: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Käytetty sähköisen asiakirjan malli: {TEMPLATENAME}\nVirheen vaikutusalue: {ERRORSCOPE}\nVirheen tiedot: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Jäsennysvirhe. Tarkista saapuvien sähköisten asiakirjojen kenttämääritys.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Muuntovirhe.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Tarkistusvirhe.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Muunto epäonnistui, koska saapuvan sähköisen asiakirjan tietueen tila on {STATUS}";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Saapuvia sähköisiä asiakirjoja, joilla ei ole aktiivisia asiakkaita, ei tueta muunnossa.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Saapuvia sähköisiä asiakirjoja, joilla ei ole aktiivisia toimittajia, ei tueta muunnossa.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Seuraavia toimittajien koodeja ei ole liitetty nimiketietueisiin: {ITEMLIST}.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Seuraavia toimittajien nimiä/koodeja ei ole liitetty nimiketietueisiin: {ITEMLIST}.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Seuraavat toimittajien koodit on liitetty moniin nimiketietueisiin: {ITEMLIST}. Muokkaa nimiketietueita ja varmista, että toimittajien koodit ovat yksilöllisiä kullekin toimittajan nimikkeelle.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Seuraavat toimittajien nimet/koodit on liitetty moniin nimiketietueisiin: {ITEMLIST}. Muokkaa nimiketietueita ja varmista, että toimittajien nimet/koodit ovat yksilöllisiä kullekin toimittajan nimikkeelle.";
    translation["ei.conversion.refnumnotfound"] =
        "Vaadittu viitenumero puuttuu saapuvasta sähköisestä asiakirjasta. Peruuta tämä sähköinen asiakirja ja lähetä toinen asiakirja, joka sisältää XML-elementin viitenumerolle, joka on määritetty tranid-kenttään.";
    translation["ei.conversion.refnumexists"] =
        "Samalla viitenumerolla on jo toimittajan lasku. Peruuta tämä sähköinen asiakirja ja lähetä toinen sähköinen asiakirja, joka sisältää oikean viitenumeroarvon XML-elementille, joka on määritetty tranid-kenttään.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Sähköisen asiakirjan mallista puuttuu toimittajakoodin kenttä. Muokkaa sähköisen asiakirjan mallia tai valitse toinen malli, joka sisältää toimittajakoodin kentän määrityksen.";
    translation["ei.conversion.novendorcodevalue"] =
        "Vähintään yhdellä nimikkeistä ei ole toimittajan koodia. Peruuta tämä sähköinen asiakirja ja lähetä toinen sähköinen asiakirja, joka sisältää oikean XML-elementin arvon, joka on määritetty toimittajan koodin kenttään.";
    translation["ei.conversion.vendornamenotfound"] =
        "Sähköisen asiakirjan mallista puuttuu toimittajan nimen kenttä. Muokkaa sähköisen asiakirjan mallia tai valitse toinen malli, joka sisältää toimittajan nimen kentän määrityksen.";
    translation["ei.conversion.novendornamevalue"] =
        "Vähintään yhdellä nimikkeistä ei ole toimittajan nimeä/koodia. Peruuta tämä sähköinen asiakirja ja lähetä toinen sähköinen asiakirja, joka sisältää oikean XML-elementin arvon, joka on määritetty toimittajan nimen/koodin kenttään.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Tietuetta ({TRANSTYPE} {TRANSID}) ei löytynyt järjestelmästä. Peruuta tämä sähköinen asiakirja ja lähetä toinen asiakirja, joka sisältää oikean XML-elementin arvon, joka on määritetty createdfrom-kenttään.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Tietue ({TRANSTYPE} {TRANSID}) on määritetty toiseen sidosryhmään. Valitse oikea sidosryhmä ja muunna tämä sähköinen asiakirja.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Toimittajalla ei ole oletuskulutiliä, joka vaaditaan kulullisten laskujen muuntoon. Voit jatkaa muuntoa asettamalla arvon Oletusarvoinen kulutili -kenttään toimittajatietueessa.";
    translation["ei.conversion.nolinktopo"] =
        "Saapuvalla sähköisellä asiakirjalla ei ole tuotetta tai kulua, joka sisältyisi viitattuun ostotilaukseen. Tarkista, voidaanko viitatun ostotilauksen tila muuntaa. Jos se voidaan muuntaa, peruuta tämä sähköinen asiakirja ja lähetä toinen asiakirja, joka sisältää oikean XML-elementin arvon, joka on määritetty createdfrom-kenttään.";
    translation["inbound.formtitle"] = "Muunna saapuvat sähköiset asiakirjat";
    translation["inbound.search"] = "Hae";
    translation["inbound.convert"] = "Muunna";
    translation["inbound.return"] = "Palaa kriteereihin";
    translation["inbound.vendor"] = "Toimittaja";
    translation["inbound.datefrom"] = "Luonnin alkamispäivämäärä";
    translation["inbound.dateto"] = "Luonnin päättymispäivämäärä";
    translation["inbound.vendorhelp"] =
        "Valitse toimittaja, jonka epäonnistuneet saapuvat sähköiset asiakirjat sisällytetään hakutuloksiin.";
    translation["inbound.datefromhelp"] =
        "Valitse alkamispäivämäärä määrittääksesi jakson, jonka aikana luodut epäonnistuneet saapuvat sähköiset asiakirjat sisällytetään hakutuloksiin.";
    translation["inbound.datetohelp"] =
        "Valitse päättymispäivämäärä määrittääksesi jakson, jonka aikana luodut epäonnistuneet saapuvat sähköiset asiakirjat sisällytetään hakutuloksiin.";
    translation["inbound.inboundedocfieldgroup"] =
        "Epäonnistuneen saapuvan sähköisen asiakirjan hakusuodattimet";
    translation["inbound.sublist.sublistname"] =
        "Epäonnistuneen saapuvan sähköisen asiakirjan haun tulokset";
    translation["inbound.sublist.internalid"] = "Sisäinen tunnus";
    translation["inbound.sublist.vendor"] = "Toimittaja";
    translation["inbound.sublist.refnum"] = "Viitenumero";
    translation["inbound.sublist.ponum"] = "Ostotilausnumero";
    translation["inbound.sublist.datecreated"] = "Luontipäivämäärä";
    translation["inbound.sublist.edoctemplate"] = "Sähköisen asiakirjan malli";
    translation["inbound.msg.conversionongoing"] =
        "Sähköistä asiakirjaa muunnetaan. Saat sähköpostiviestin, kun prosessi on valmis.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Et voi suorittaa hakua valitsemillasi kriteereillä, koska saapuvan sähköisen asiakirjan muunto on jo käynnissä jaksolla ({DATECREATED_FROM} - {DATECREATED_TO}). Vaihda hakukriteereitäsi tai yritä uudelleen, kun sähköinen asiakirja on muunnettu.";
    translation["inbound.invaliddates"] =
        "Luonnin alkamispäivämäärä ei voi olla myöhempi kuin luonnin päättymispäivämäärä. Muuta päivämääriä niin, että luonnin alkamispäivämäärä on ennen luonnin päättymispäivämäärää.";
    translation["inbound.configurefreecountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing SuiteApp -sovelluksen käyttöön monessa maassa. Jos haluat toteuttaa sähköisten asiakirjojen joukkomuunnon, ota yhteyttä tilisi pääkäyttäjään ja määritä sähköisen asiakirjan maa vapaaseen käyttöön Yritystiedot-sivulla.";
    translation["portlet.title"] = "Sähköiset asiakirjat";
    translation["portlet.outboundforgeneration"] =
        "Luotavat lähtevät sähköiset asiakirjat";
    translation["portlet.outboundforsending"] =
        "Lähetettävät lähtevät sähköiset asiakirjat";
    translation["portlet.outboundwitherrors"] =
        "Virheelliset lähtevät sähköiset asiakirjat";
    translation["portlet.outboundsendinglink"] =
        "Lähetä epäonnistuneet lähtevät sähköiset asiakirjat";
    translation["portlet.inboundforconversion"] =
        "Muunnettavat saapuvat sähköiset asiakirjat";
    translation["portlet.inboundconvertfailed"] =
        "Saapuvien sähköisten asiakirjojen muunto epäonnistui";
    translation["portlet.inboundincomplete"] =
        "Keskeneräiset saapuvat sähköiset asiakirjat";
    translation["portlet.inbounduploadlink"] =
        "Lataa saapuva sähköinen asiakirja";
    translation["portlet.outboundforcertification"] =
        "Sertifioitavat lähtevät sähköiset asiakirjat";
    translation["portlet.outboundcertifiedforsending"] =
        "Lähetettävät lähtevät sähköiset asiakirjat";
    translation["inbound.webservice.response.success"] =
        "Saapuva sähköinen asiakirja, jonka tunnus on {ID}, luotiin.";
    translation["inbound.webservice.response.novendor"] =
        "Web-palvelun tunnukseen {IDENTIFIER} ei ole liitetty toimittajaa. Varmista, että käytössä on oikea web-palvelun tunnus.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Saapuva sähköinen asiakirja, jonka tunnus on {ID}, luotiin. Web-palvelun tunnukseen {IDENTIFIER} on kuitenkin liitetty useita toimittajia.";
    translation["inbound.webservice.error.templateerror"] =
        "Saapuva sähköinen asiakirja on keskeneräinen, koska oikeaa mallia ei voi määrittää. Valitse malli saapuvan sähköisen asiakirjan tietueessa tai määritä XSD-tiedosto sähköisen asiakirjan mallin tietueessa ottaaksesi käyttöön mallin autoselection-toiminnon.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Saapuva sähköinen asiakirja on keskeneräinen, koska oikeaa toimittajaa ei voi määrittää. Valitse toimittaja saapuvan sähköisen asiakirjan tietueessa tai määritä web-palvelun tunnus liitetyn toimittajan tietueessa.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Seuraavat avaimet puuttuvat: {KEYS}. Ne on annettava web-palvelupyynnössä.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Web-palvelupyynnön tekstin on oltava JSON-objekti tai JSON-objektien taulukko, jossa käytetään sisältötyyppiä application/json.";
    translation["transaction.contactnoemail"] =
        "Seuraavilla sähköisten asiakirjojen vastaanottajilla ei ole sähköpostiosoitetta yhteystietotietueissa: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Tässä tapahtumassa ei ole sähköisten asiakirjojen vastaanottajia. Jos haluat lähettää sähköisiä asiakirjoja sähköpostitse, sähköisten asiakirjojen vastaanottajien luetteloon on lisättävä vähintään yksi yhteyshenkilö.";
    translation["transaction.maxrecipientexceeded"] =
        "Lisäämäsi sähköpostin vastaanottajien määrä ylittää rajan. Voit lisätä enintään 10 sähköpostin vastaanottajaa.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Vain seuraavantyyppiset tapahtumat käsitellään:";
    translation["ei.prefs.formtitle"] = "Sähköisen asiakirjan määritykset";
    translation["ei.prefs.information.about.certify.skip"] =
        "Sertifiointivaihe ohitetaan, jos sertifioinnin lähetystapaa ei määritetä tai jos tapahtumaan ei liity sertifiointia.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Automaattinen sähköinen laskutus";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Sähköisen asiakirjan automatisoinnin tyyppi";
    translation["ei.prefs.text.option.comb.disabled"] = "Poista käytöstä";
    translation["ei.prefs.text.option.comb.gcs"] = "Luo, Sertifioi, Lähetä";
    translation["ei.prefs.text.option.comb.gc"] = "Luo, Sertifioi";
    translation["ei.prefs.text.option.comb.cs"] = "Sertifioi, Lähetä";
    translation["ei.prefs.btn.label.cancel"] = "Peruuta";
    translation["ei.prefs.btn.label.save"] = "Tallenna";
    translation["ei.prefs.msg.confirm.save"] =
        "Haluatko tallentaa sähköisen asiakirjan määrityksiin tehdyt muutokset?";
    translation["ei.prefs.msg.success.save"] =
        "Sähköisen asiakirjan määritysten tallennus onnistui.";
    translation["ei.prefs.msg.failed.save"] =
        "Sähköisen asiakirjan määritysten tallennus epäonnistui.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Tämän sivun käyttöoikeus on rajoitettu. Pyydä käyttöoikeutta järjestelmänvalvojalta.";
    translation["ei.eip.msg.completed"] = "Sähköinen asiakirja on käsitelty.";
    translation["ei.eip.msg.failed"] =
        "Sähköisen asiakirjan käsittely epäonnistui. Katso tiedot asiakirjan kirjausketjusta.";
    translation["ei.eip.msg.processing"] =
        "Sähköinen asiakirja on käsittelyssä.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Sähköinen asiakirja on jo käsittelyssä.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps License Client ei ole käytettävissä tililläsi. Asenna tämä SuiteApp, jotta voit käyttää kaikkia Electronic Invoicing -sovelluksen ominaisuuksia.";
    translation["outbound.formtitle"] =
        "Epäonnistuneiden sähköisten asiakirjojen lähetys";
    translation["outbound.search"] = "Hae";
    translation["outbound.send"] = "Lähetä";
    translation["outbound.return"] = "Palaa kriteereihin";
    translation["outbound.customer"] = "Asiakas";
    translation["outbound.vendor"] = "Toimittaja";
    translation["outbound.subsidiary"] = "Yhtiö";
    translation["outbound.type"] = "Tapahtumatyyppi";
    translation["outbound.datefrom"] = "Tapahtuman alkamispäivämäärä";
    translation["outbound.dateto"] = "Tapahtuman päättymispäivämäärä";
    translation["outbound.subshelp"] =
        "Valitse yhtiö, jos haluat näyttää vain kyseiseen yhtiöön liittyvät tapahtumat.";
    translation["outbound.custhelp"] =
        "Valitse asiakas, jos haluat näyttää vain kyseiseen asiakkaaseen liittyvät tapahtumat. Jos asiakasta ei ole valittu, hakutuloksissa näytetään kaikki yhtiölle kuuluvat tapahtumat asiakkaasta riippumatta.";
    translation["outbound.vendorhelp"] =
        "Valitse toimittaja, jos haluat näyttää vain kyseiseen toimittajaan liittyvät tapahtumat. Jos toimittajaa ei ole valittu, hakutuloksissa näytetään kaikki yhtiölle kuuluvat tapahtumat toimittajasta riippumatta.";
    translation["outbound.entitytypehelp"] =
        "Valitse joko Asiakas- tai Toimittaja-sidosryhmätyyppi. Tämä aktivoi alla vastaavan avattavan luettelon.";
    translation["outbound.typehelp"] =
        "Valitse ainakin yksi tapahtumatyyppi jokaiselle sähköiselle asiakirjalle, jonka haluat lähettää. Voit valita useita tapahtumatyyppejä pitämällä Ctrl-näppäintä painettuna tyyppien valinnan aikana.<br /><br />Jos tapahtumatyyppiä ei valita, hakutuloksissa näytetään tapahtumatyypistä riippumatta kaikki sähköiset asiakirjat, jotka ovat valmiina lähetettäväksi.";
    translation["outbound.datefromhelp"] =
        "Jos haluat tarkastella luetteloa tietyllä jaksolla luoduista tapahtumista, valitse jakson aloittava päivämäärä.";
    translation["outbound.datetohelp"] =
        "Jos haluat tarkastella luetteloa tietyllä jaksolla luoduista tapahtumista, valitse jakson päättävä päivämäärä.";
    translation["outbound.entityfieldgroup"] = "Sidosryhmien hakusuodattimet";
    translation["outbound.filtersfieldgroup"] = "Tapahtumien hakusuodattimet";
    translation["outbound.entitytypeinlinehelp"] = "Valitse sidosryhmätyyppi:";
    translation["outbound.invalidtypetitle"] = "Virheelliset tapahtumatyypit";
    translation["outbound.invalidtype"] =
        "Seuraavia tapahtumatyyppejä ei tällä hetkellä tueta: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Seuraavat tapahtumatyypit eivät ole sallittuja valitulle sidosryhmälle: {TRANSACTIONTYPES}. Valitse soveltuvat tapahtumatyypit valitsemallesi sidosryhmälle.";
    translation["outbound.invaliddates"] =
        "Tapahtuman alkamispäivämäärä ei voi olla myöhempi kuin tapahtuman päättymispäivämäärä. Muuta päivämääriä niin, että tapahtuman alkamispäivämäärä on ennen tapahtuman päättymispäivämäärää.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Et voi suorittaa hakua valitsemillasi kriteereillä, koska yhtiön ({SUBSIDIARY}) jakson ({TRANDATE_FROM} - {TRANDATE_TO}) tapahtumiin liittyvän sähköisen asiakirjan lähetys on jo käynnissä. Vaihda hakukriteereitäsi tai yritä uudelleen, kun sähköinen asiakirja on lähetetty.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Et voi suorittaa hakua valitsemillasi kriteereillä, koska jakson ({TRANDATE_FROM} - {TRANDATE_TO}) tapahtumiin liittyvän sähköisen asiakirjan lähetys on jo käynnissä. Vaihda hakukriteereitäsi tai yritä uudelleen, kun sähköinen asiakirja on lähetetty.";
    translation["outbound.sublist.trannum"] = "Tapahtumanumero";
    translation["outbound.sublist.trantype"] = "Tapahtumatyyppi";
    translation["outbound.sublist.customer"] = "Asiakas";
    translation["outbound.sublist.vendor"] = "Toimittaja";
    translation["outbound.sublist.subsidiary"] = "Yhtiö";
    translation["outbound.sublist.trandate"] = "Tapahtumapäivämäärä";
    translation["outbound.sublist.memo"] = "Hyvityslasku";
    translation["outbound.sublist.template"] = "Malli";
    translation["outbound.sublist.sendingmethod"] = "Lähetystapa";
    translation["outbound.sublist.sublistname"] =
        "Epäonnistuneiden lähetettävien lähtevien sähköisten asiakirjojen tulokset";
    translation["outbound.msg.sendingongoing"] =
        "Sähköistä asiakirjaa lähetetään. Saat sähköpostiviestin, kun prosessi on valmis.";
    translation["outbound.configurefreecountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat toteuttaa sähköisten asiakirjojen joukkolähetyksen, ota yhteyttä tilisi pääkäyttäjään ja määritä sähköisen asiakirjan maa vapaaseen käyttöön Yritystiedot-sivulla.";
    translation["outbound.entitysend"] = "Lähetä sidosryhmälle";
    translation["outbound.certifysend"] = "Lähetä sertifioitavaksi";
    translation["outbound.sendingtypehelp"] =
        "Valitse joko Lähetä sidosryhmälle- tai Lähetä sertifioitavaksi -kohta. Vastaavat tapahtumat on lueteltu lähetystä varten.";
    translation["customer.noemail"] =
        "Tälle asiakkaalle ei ole sähköpostiosoitetta. Lisää voimassa oleva sähköpostiosoite asiakastietueeseen, jotta sähköisiä asiakirjoja voidaan lähettää sähköpostitse.";
    translation["customer.contactnoemail"] =
        "Seuraavilla sähköisten asiakirjojen vastaanottajilla ei ole sähköpostiosoitetta yhteystietotietueissa: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Tälle asiakkaalle ei ole sähköisten asiakirjojen vastaanottajia. Jos haluat lähettää sähköisiä asiakirjoja tälle asiakkaalle sähköpostitse, sähköisten asiakirjojen vastaanottajien luetteloon on lisättävä vähintään yksi yhteyshenkilö.";
    translation["customer.arrayrequired"] =
        "Yhteyshenkilöt-taulukko vaaditaan tarkistusta varten.";
    translation["customer.parameternotarray"] =
        "Yhteyshenkilöt-parametri ei ole taulukko.";
    translation["customer.maxrecipientexceeded"] =
        "Olet ylittänyt sähköpostin vastaanottajien enimmäismäärän. Valitse enintään 10 sähköpostin vastaanottajaa.";
    translation["vendor.noemail"] =
        "Tälle toimittajalle ei ole sähköpostiosoitetta. Lisää voimassa oleva sähköpostiosoite toimittajatietueeseen, jotta sähköisiä asiakirjoja voidaan lähettää sähköpostitse.";
    translation["vendor.contactnoemail"] =
        "Seuraavilla sähköisten asiakirjojen vastaanottajilla ei ole sähköpostiosoitetta yhteystietotietueissa: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Tälle toimittajalle ei ole sähköisten asiakirjojen vastaanottajia. Jos haluat lähettää sähköisiä asiakirjoja tälle toimittajalle sähköpostitse, sähköisten asiakirjojen vastaanottajien luetteloon on lisättävä vähintään yksi yhteyshenkilö.";
    translation["vendor.maxrecipientexceeded"] =
        "Olet ylittänyt sähköpostin vastaanottajien enimmäismäärän. Valitse enintään 10 sähköpostin vastaanottajaa.";
    translation["vendor.nosenders"] =
        "Tälle toimittajalle ei ole sähköisten asiakirjojen sähköpostin lähettäjiä. Jos haluat vastaanottaa sähköisiä asiakirjoja tältä toimittajalta sähköpostitse, Toimittajan sähköisten asiakirjojen sähköpostin lähettäjä -luetteloon on lisättävä vähintään yksi sähköpostiosoite.";
    translation["vendor.existingsender"] =
        "Lähettäjän sähköpostiosoite on jo olemassa.";
    translation["vendor.existingdomain"] =
        "Lähettäjän sähköpostitoimialue on jo käytössä toisella toimittajalla.";
    translation["vendor.existingidentifier"] =
        "Web-palvelun tunnus on jo toisen toimittajan käytössä. Anna toinen web-palvelun tunnus.";
    translation["customeremailrecipient.contextunsupported"] =
        "Asiakkaan sähköisten asiakirjojen sähköpostin vastaanottaja tukee vain seuraavia konteksteja: käyttöliittymä, CSV, SuiteScript ja web-palvelut.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Toimittajan sähköisten asiakirjojen sähköpostin vastaanottaja tukee vain seuraavia konteksteja: käyttöliittymä, CSV, SuiteScript ja web-palvelut.";
    translation["vendoremailsender.contextunsupported"] =
        "Toimittajan sähköisten asiakirjojen sähköpostin lähettäjä tukee vain seuraavia konteksteja: käyttöliittymä, CSV, SuiteScript ja web-palvelut.";
    translation["template.incorrectregex"] =
        "REGEX-kenttä sisältää virheellisen säännöllisen lausekkeen. Oikeaa syntaksia on käytettävä.";
    translation["template.invalidjson"] =
        "Et antanut oikein muotoiltua JSON:ää Lähtevät sähköiset asiakirjat -kentän mallissa. Jatka valitsemalla OK tai valitse Peruuta, jos haluat pysyä nykyisellä sivulla.";
    translation["template.invalidxml"] =
        "XML-malli sisältää virheitä. XML-muodon on oltava oikein muotoiltu.";
    translation["template.templaterequired"] =
        "Valitun lähtevän tapahtuman tyypin mallin sisältö puuttuu. Anna sallittu XML- tai JSON-mallin sisältö Lähtevät sähköiset asiakirjat -kentässä ja yritä sitten uudelleen.";
    translation["template.mappingrequired"] =
        "Valitsit saapuvan tapahtuman tyypin, mutta kenttämäärityksen JSON-sisältö puuttuu. Lisää JSON-sisältö Saapuvien sähköisten asiakirjojen kenttämääritys -kenttään.";
    translation["template.templateorjsonrequired"] =
        "Kenttien arvoja puuttuu. Määritä lähtevälle tapahtumalle sallittu XML- tai JSON-sisältö Lähtevät sähköiset asiakirjat -kentän mallissa. Määritä saapuvalle tapahtumalle JSON-sisältö Saapuvien sähköisten asiakirjojen kenttämääritys -kentässä.";
    translation["template.invalidxsdfile"] =
        "Valittu XSD-tiedosto ei ole sallittu XSD-tiedosto. Varmista, että valitsemallasi tiedostolla on .xsd-pääte.";
    translation["template.contextunsupported"] =
        "Sähköisen asiakirjan malli tukee vain käyttöliittymä- ja SuiteScript-konteksteja.";
    translation["template.supportedtranstypefldhelp"] =
        "Valitse ainakin yksi tapahtumatyyppi, jota tämä malli tukee. Voit valita useita tapahtumatyyppejä pitämällä Ctrl-näppäintä painettuna tyyppien valinnan aikana.<br /><br />Jos tapahtumatyyppiä ei voi valita, malli on jo määritetty ainakin yhdelle saman tapahtumatyypin tapahtumatietueelle. Saat tapahtumatyypin valinnan käyttöön poistamalla mallin tapahtumatietueesta.<br /><br />Voit määrittää tämän mallin myös saapuville sähköisille asiakirjoille, mikä poistaa Tapahtumatyyppi-kentän käytöstä.";
    translation["template.eistatus"] =
        "Rajoita sellaisten tapahtumien muokkausta, joilla on sähköisen asiakirjan tila";
    translation["template.supportedeistatusfieldhelp"] =
        "Tapahtumia, joilla on valitsemasi sähköisen asiakirjan tila, ei voi muokata, kun tämä malli on liitetty niihin. Voit valita monia sähköisen asiakirjan tiloja.";
    translation["template.invalidschemaordependency"] =
        "Rakenne on väärin jäsennetty XSD-tiedosto tai riippuvaista rakennetta ei löydy.";
    translation["template.xmldoesnotconformtoschema"] =
        "Mallin XML-tiedosto ei vastaa XSD-tiedostoa tai -rakennetta.";
    translation["template.xmldomexception"] =
        "XML-syötemerkkijono on väärin muotoiltu.";
    translation["template.missingreqdargument"] =
        "Lähtevän asiakirjan tarkistuksen XSD-tiedosto puuttuu.";
    translation["template.xsdvalidationexception"] =
        "Tuntematon poikkeus XSD-tarkistuksen aikana.";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD-rakenteen kansio on virheellinen, tai se puuttuu.";
    translation["invoice.generatebtn"] = "Luo sähköinen asiakirja";
    translation["invoice.sendbtn"] = "Lähetä sähköinen asiakirja";
    translation["invoice.sendcertifybtn"] = "Sertifioi sähköinen asiakirja";
    translation["invoice.eipbtn"] = "Käsittele sähköinen asiakirja";
    translation["invoice.loguntagged"] =
        "Sähköisen asiakirjan malli poistettiin. Tapahtumaa ei ole merkitty sähköisen asiakirjan luontia varten.";
    translation["invoice.logforgenerate"] =
        "Tapahtuma on valmis sähköisen asiakirjan luontia varten.";
    translation["invoice.invalidtemplatesub"] =
        "Tapahtuman yhtiö ei ole sallittu valitulle sähköisen asiakirjan mallille. Valitse toinen sähköisen asiakirjan malli.";
    translation["invoice.templateremovalerror"] =
        "Sähköisen asiakirjan mallin poistoa lähetetyistä sähköisistä asiakirjoista ei sallita.";
    translation["ei.sending.currentlysending"] =
        "Sähköistä asiakirjaa lähetetään. Tähän saattaa kulua muutama minuutti. Älä keskeytä prosessia napsauttamalla Lähetä sähköinen asiakirja -painiketta uudelleen. Kun sähköinen asiakirja on lähetetty, sivu latautuu uudelleen.";
    translation["ei.sending.notready"] =
        "Tämä sähköinen asiakirja ei ole valmis lähetettäväksi. Valitse ensin Luo sähköinen asiakirja -kohta, jotta voit luoda sähköisen asiakirjan.";
    translation["ei.sending.alreadysent"] = "Tämä tapahtuma on jo lähetetty.";
    translation["ei.sending.norecipients"] =
        "Sähköistä asiakirjaa ei voi lähettää, koska asiakkaalla ei ole sähköisen asiakirjan vastaanottajia. Jotta voit lähettää tämän sähköisen asiakirjan sähköpostitse, sähköisen asiakirjan vastaanottajat on ensin valittava asiakastietueessa.";
    translation["ei.sending.indivcustnoemail"] =
        "Sähköistä asiakirjaa ei voi lähettää, koska asiakkaalla ei ole sähköpostiosoitetta. Jotta voit lähettää tämän sähköisen asiakirjan sähköpostitse, asiakastietueeseen on lisättävä sähköpostiosoite.";
    translation["ei.sending.norecipients.vendor"] =
        "Sähköistä asiakirjaa ei voi lähettää, koska toimittajalla ei ole sähköisen asiakirjan vastaanottajia. Jotta voit lähettää tämän sähköisen asiakirjan sähköpostitse, sähköisen asiakirjan vastaanottajat on ensin valittava toimittajatietueessa.";
    translation["ei.sending.indivvendnoemail"] =
        "Sähköistä asiakirjaa ei voi lähettää, koska toimittajalla ei ole sähköpostiosoitetta. Jotta voit lähettää tämän sähköisen asiakirjan sähköpostitse, toimittajatietueeseen on lisättävä sähköpostiosoite.";
    translation["ei.sending.invalidmethod"] =
        "Valitse sallittu lähetystapa kohteelle {TYPE} {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Lähettäjä: {SENDER}\nVastaanottajat: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Sähköisten asiakirjojen lähettäjällä ({EMPLOYEENAME}) ei ole sähköpostiosoitetta. Lisää voimassa oleva sähköpostiosoite työntekijätietueeseen.";
    translation["ei.sending.recipientnoemail"] =
        "Vähintään yhdellä tähän tapahtumaan liitetyn sähköisen asiakirjan vastaanottajista ei ole sähköpostiosoitetta. Tarkista, että tämän asiakkaan vastaanottajien sähköpostiosoitteet ovat voimassa.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Vähintään yhdellä tähän tapahtumaan liitetyn sähköisen asiakirjan vastaanottajista ei ole sähköpostiosoitetta. Tarkista, että tämän toimittajan vastaanottajien sähköpostiosoitteet ovat voimassa.";
    translation["ei.sending.defaulterror"] =
        "Sähköisen asiakirjan lähetyksen aikana tapahtui virhe. Tarkista sähköisten asiakirjojen kirjausketju Sähköiset asiakirjat -alivälilehdessä, jos haluat lisätietoja.";
    translation["ei.sending.inactivecustomer"] =
        "Tälle tapahtumalle ei voitu lähettää sähköistä asiakirjaa, sillä valittu asiakas ei ole aktiivinen. Sähköisen asiakirjan tila -kenttää ei ole päivitetty eikä kirjausketjua ole luotu. Poista Ei aktiivinen -ruudun valinta asiakastietueessa ja yritä sitten lähettää sähköinen asiakirja uudelleen.";
    translation["ei.sending.inactivevendor"] =
        "Tälle tapahtumalle ei voitu lähettää sähköistä asiakirjaa, sillä valittu toimittaja ei ole aktiivinen. Sähköisen asiakirjan tila -kenttää ei ole päivitetty eikä kirjausketjua ole luotu. Poista Ei aktiivinen -ruudun valinta toimittajatietueessa ja yritä sitten lähettää sähköinen asiakirja uudelleen.";
    translation["ei.sending.msg.processcomplete"] =
        "Sähköinen asiakirja on lähetetty.";
    translation["ei.sending.configurefreecountry"] =
        "Tililläsi on oltava aktiivinen lisenssi Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat toteuttaa sähköisten asiakirjojen joukkolähetyksen yhteen maahan, valitse maa Yritystiedot-sivun Sähköisen asiakirjan maa ilmaista käyttöä varten -kentästä.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Sähköiset asiakirjat eivät tue tapahtumia, joilla ei ole aktiivisia asiakkaita.";
    translation["ei.sending.inactivevendor.manager"] =
        "Sähköiset asiakirjat eivät tue tapahtumia, joilla ei ole aktiivisia toimittajia.";
    translation["ei.sending.certification.defaulterror"] =
        "Sähköisen asiakirjan sertifioinnin aikana tapahtui virhe. Tarkista sähköisten asiakirjojen kirjausketju Sähköiset asiakirjat -alivälilehdessä, jos haluat lisätietoja.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Sähköinen asiakirja on lähetetty sertifioitavaksi.";
    translation["ei.generation.generationlogbulk"] =
        "Sähköinen asiakirja luotiin käyttämällä joukkoluontia ja sähköisen asiakirjan mallia {TEMPLATENAME}.";
    translation["ei.generation.generationlog"] =
        "Sähköinen asiakirja luotiin käyttämällä sähköisen asiakirjan mallia {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Sähköinen asiakirja ja PDF-tiedosto luotiin käyttämällä joukkoluontia ja sähköisen asiakirjan mallia {TEMPLATENAME}.";
    translation["ei.generation.generationwithpdflog"] =
        "Sähköinen asiakirja ja PDF-tiedosto luotiin käyttämällä sähköisen asiakirjan mallia {TEMPLATENAME}.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Sähköinen asiakirja luotiin käyttämällä joukkoluontia ja sähköisen asiakirjan mallia {TEMPLATENAME}. Aiemmin luotu tapahtuman PDF-tiedosto poistettiin.";
    translation["ei.generation.generationremovedpdflog"] =
        "Sähköinen asiakirja luotiin käyttämällä sähköisen asiakirjan mallia {TEMPLATENAME}. Aiemmin luotu tapahtuman PDF-tiedosto poistettiin.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Joukkoluontiprosessi\nKäytetty sähköisen asiakirjan malli: {TEMPLATENAME}\nVirheen tiedot: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Käytetty sähköisen asiakirjan malli: {TEMPLATENAME}\nVirheen tiedot: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Luonnin aikana tapahtui virhe. Tarkista sähköisten asiakirjojen kirjausketju Sähköiset asiakirjat -alivälilehdessä, jos haluat lisätietoja.";
    translation["ei.generation.inactivecustomer"] =
        "Tälle tapahtumalle ei voitu luoda sähköistä asiakirjaa, sillä valittu asiakas ei ole aktiivinen. Sähköisen asiakirjan tila -kenttää ei ole päivitetty eikä kirjausketjua ole luotu. Poista Ei aktiivinen -ruudun valinta asiakastietueessa ja yritä sitten luoda sähköinen asiakirja uudelleen.";
    translation["ei.generation.inactivevendor"] =
        "Tälle tapahtumalle ei voitu luoda sähköistä asiakirjaa, sillä valittu toimittaja ei ole aktiivinen. Sähköisen asiakirjan tila -kenttää ei ole päivitetty eikä kirjausketjua ole luotu. Poista Ei aktiivinen -ruudun valinta toimittajatietueessa ja yritä sitten luoda sähköinen asiakirja uudelleen.";
    translation["ei.generation.msg.processcomplete"] =
        "Sähköinen asiakirja on luotu.";
    translation["ei.generation.configurefreecountry"] =
        "Tililläsi on oltava aktiivinen lisenssi Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat toteuttaa sähköisten asiakirjojen joukkoluonnin yhteen maahan, valitse maa Yritystiedot-sivun Sähköisen asiakirjan maa ilmaista käyttöä varten -kentästä.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Sähköiset asiakirjat eivät tue tapahtumia, joilla ei ole aktiivisia asiakkaita.";
    translation["ei.generation.inactivevendor.generator"] =
        "Sähköiset asiakirjat eivät tue tapahtumia, joilla ei ole aktiivisia toimittajia.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Sähköinen asiakirja luotiin ja allekirjoitettiin digitaalisesti.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Luonti epäonnistui, koska sähköinen asiakirja ei ole oikein muotoiltu XML tai JSON.";
    translation["notify.batchownersubject"] =
        "Sähköisen asiakirjan lähetys on valmis";
    translation["notify.batchownerbody"] =
        "Hei <br/><br/>Sähköisten asiakirjojen lähetyspyyntösi on valmis.<br/>{SENT}/{TOTAL} lähetettiin. Lisätietoja on liitetiedostossa. <br/><br/>Kiitos!<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Sähköinen asiakirja luotiin ostotilaukselle {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Sähköinen asiakirja luotiin yritykseltä {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Tervehdys <br /><br />{MESSAGE}<br />Sähköinen asiakirja on liitteenä.<br /><br />Kiitos!<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Sähköisen asiakirjan luonnin aikana tapahtui virhe";
    translation["notify.generationerrorbody"] =
        "Sähköisen asiakirjan luonnin aikana tapahtui virheitä.<br/>Tapahtumien luettelo ja lisätietoja virheistä on liitetiedostossa.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Tälle tapahtumalle on jo lähetetty sähköinen asiakirja. Uuden sähköisen asiakirjan luonti korvaa aiemman sähköisen asiakirjan. Haluatko varmasti luoda uuden sähköisen asiakirjan?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Sähköisen asiakirjan mallin poistoa lähetetyistä sähköisistä asiakirjoista ei sallita.";
    translation["transaction.msg.generate.information"] =
        "Tämän sähköisen asiakirjan luonti on käynnissä.";
    translation["transaction.msg.send.information"] =
        "Tämän sähköisen asiakirjan lähetys on käynnissä.";
    translation["transaction.msg.send.certify.information"] =
        "Tämän sähköisen asiakirjan sertifiointi on käynnissä.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Tämän sähköisen asiakirjan luonti on jo käynnissä.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Tämän sähköisen asiakirjan lähetys on jo käynnissä.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Tämän sähköisen asiakirjan sertifiointi on jo käynnissä.";
    translation["transaction.msg.uncheckpdf"] =
        "Tämän tapahtuman PDF-tiedosto luotiin viimeisimmän sähköisten asiakirjojen luonnin aikana. Jos poistat tämän ruudun valinnan, PDF-tiedosto poistetaan seuraavasta sähköisen asiakirjan luonnista.";
    translation["transaction.msg.nofreecountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat luoda sähköisen asiakirjan tästä tapahtumasta, ota yhteyttä tilisi pääkäyttäjään ja määritä sähköisen asiakirjan maa vapaaseen käyttöön Yritystiedot-sivulla.";
    translation["transaction.msg.otherbillingcountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat luoda sähköisen asiakirjan tästä tapahtumasta, ota yhteyttä NetSuite-asiakaspäällikköön ja osta lisenssi.";
    translation["transaction.msg.nobillingcountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat luoda sähköisen asiakirjan tästä tapahtumasta, määritä laskutusosoite tälle tapahtumalle.";
    translation["transaction.msg.noshippingcountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat luoda sähköisen asiakirjan tästä tapahtumasta, määritä lähetysosoite tälle tapahtumalle.";
    translation["transaction.msg.nocustomercountry"] =
        "Tällä tilillä ei ole aktiivista lisenssiä Electronic Invoicing -sovelluksen käyttöön monessa maassa. Jos haluat luoda sähköisen asiakirjan tästä tapahtumasta, määritä oletuslaskutusosoite tämän tapahtuman asiakkaalle.";
    translation["transaction.msg.blockededittransaction"] =
        "Tapahtuman muokkaus on estetty nykyisessä sähköisen asiakirjan tilassa. Katso liitteenä oleva sähköisten laskujen malli.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Sisältötyyppi-kentän arvon muutos XML:stä toiseen tyyppiin poistaa kaikki XML-tarkistajat. Haluatko varmasti vaihtaa sisältötyyppiä?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Vain XML-sisältötyypin tarkistajia voidaan lisätä.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Tämä tarkistaja on jo luettelossa.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Sähköisen asiakirjan mallin tarkistajat tukevat vain käyttöliittymä- ja SuiteScript-konteksteja.";
    translation["standarddocument.default.alreadyexist"] =
        "Tietue {DEFAULT_DOCUMENT_STANDARD} on jo olemassa. Et voi luoda asiakirjapakettitietuetta samalla nimellä. Nimeä asiakirjapakettitietueesi uudelleen ja yritä uudestaan.";
    translation["standarddocument.default.editnotallowed"] =
        "Tietueen {DEFAULT_DOCUMENT_STANDARD} nimen tai kuvauksen muokkausta ei sallita.";
    translation["standarddocument.default.deletenotallowed"] =
        "Tietueen {DEFAULT_DOCUMENT_STANDARD} poistoa ei sallita.";
    translation["standarddocument.contextunsupported"] =
        "Sähköisten asiakirjojen paketti tukee vain käyttöliittymä-, CSV-tuonti- ja SuiteScript-konteksteja.";
    translation["sendingmethod.default.alreadyexist"] =
        "Lähetystapatietue {DEFAULT_SENDING_METHOD_NAME} on jo olemassa. Et voi luoda lähetystapatietuetta samalla nimellä. Nimeä lähetystapatietueesi uudelleen ja yritä uudestaan.";
    translation["sendingmethod.default.editnotallowed"] =
        "Lähetystapatietueen {DEFAULT_SENDING_METHOD_NAME} muokkausta ei sallita.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Lähetystapatietueen {DEFAULT_SENDING_METHOD_NAME} poistoa ei sallita.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Tapahtumatyyppi-kenttä on poistettu käytöstä, sillä tämä lähetystapa on määritetty vähintään yhdelle tapahtumatietueelle. Jos haluat muokata lähetystapaa, poista lähetystapa tapahtumatietueesta, ota Tapahtumatyyppi-kenttä käyttöön ja yritä uudelleen.";
    translation["sendingmethod.contextunsupported"] =
        "Sähköisen asiakirjan lähetystapa tukee vain käyttöliittymä- ja SuiteScript-konteksteja.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Valitse vähintään yksi tapahtumatyyppi, jota tämä lähetystapa tukee. Voit valita useita tapahtumatyyppejä pitämällä Ctrl-näppäintä painettuna.<br /><br />Jos vähintään yhtä tapahtumatyyppiä ei voi valita, lähetystapa on määritetty vähintään yhdelle tapahtumatyypin tapahtumatietueelle. Poista ensin lähetystapa tapahtumatietueesta, jotta tyypin voi valita.";
    translation["sendingmethod.pluginimplementation"] =
        "Sähköisen asiakirjan lähetystavan liitännäisen käyttöönotto";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Valitse lähetystavan liitännäisen käyttöönotto";
    translation["sendingmethod.scriptbannermessage"] =
        "Lähetystapojen on oltava mukautettuja liitännäisiä. Luo nykyiset lähetystavan komentosarjat uudestaan mukautettuina liitännäisinä, joiden tyyppi on Lähettämisliitännäinen.";
    translation["customdatasource.pluginimplementation"] =
        "Mukautetun tietolähteen liitännäisen käyttöönotto";
    translation["customdatasource.pluginimplementationhelp"] =
        "Valitse mukautetun tietolähteen liitännäisen käyttöönotto";
    translation["digitalsignature.pluginimplementation"] =
        "Sähköisen allekirjoituksen liitännäisen käyttöönotto";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Valitse liitännäisen käyttöönotto. Tämä kenttä on pakollinen, jos haluat allekirjoittaa asiakirjoja sähköisesti.";
    translation["digitalsignature.identifierlabel"] =
        "Tämä sähköinen asiakirja on sähköisesti allekirjoitettu";
    translation["digitalsignature.successlog"] =
        "Luotu sähköinen asiakirja on sähköisesti allekirjoitettu.";
    translation["digitalsignature.failurelog"] =
        "Luotua sähköistä asiakirjaa ei ole sähköisesti allekirjoitettu.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Sähköisen allekirjoituksen liitännäisen käyttöönotto palautti epäonnistumisen tilan.";
    translation["digitalsignature.plugininvalidresult"] =
        "Sähköisen allekirjoituksen liitännäisen palauttamat tulokset eivät ole sallittuja.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Saapuvan mukautetun tietolähteen liitännäisen käyttöönotto";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Valitse saapuvan mukautetun tietolähteen liitännäisen käyttöönotto";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Saapuvien mukautetun tietolähteen liitännäistoteutuksen tulos on virheellinen.";
    translation["outboundvalidation.pluginimplementation"] =
        "Lähtevän asiakirjan tarkistusliitännäisen käyttöönotto";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Valitse lähtevän asiakirjan tarkistusliitännäisen käyttöönotto. Tämä tarkistaa lähtevät sähköiset asiakirjat.";
    translation["outboundvalidation.successlog"] =
        "Lähtevän asiakirjan tarkistus onnistui.";
    translation["outboundvalidation.failurelog"] =
        "Lähtevän asiakirjan tarkistus epäonnistui.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Lähtevän asiakirjan tarkistusliitännäisen käyttöönotto palautti epäonnistumisen tilatiedon.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Lähtevän asiakirjan tarkistusliitännäisen käyttöönottotulokset ovat virheellisiä.";
    translation["template.msg.cannotedittransactiontype"] =
        "Tapahtumatyyppi-kenttä on poistettu käytöstä, sillä tämä malli on jo määritetty vähintään yhdelle tapahtumatietueelle. Jos haluat muokata mallia, poista malli tapahtumatietueesta, ota Tapahtumatyyppi-kenttä käyttöön ja yritä uudelleen. Voit määrittää tämän mallin myös saapuville sähköisille asiakirjoille. Tämä poistaa Tapahtumatyyppi-kentän käytöstä.";
    translation["template.msg.forcetocopymessage"] =
        "Et voi muokata oletusarvoista sähköisen asiakirjan mallia. Voit kopioida sen valitsemalla toiminnoista Tee kopio -valinnan tai luoda uuden mallin.";
    translation["template.msg.warningoneditmessage"] =
        "Tämä on oletusarvoinen sähköisen asiakirjan malli. Kaikki malliin tehdyt muutokset menetetään tai korvataan, kun SuiteApp päivitetään.";
    translation["email.batchownernotification.subject"] =
        "Sähköisen asiakirjan lähetys on valmis";
    translation["email.batchownernotification.body"] =
        "Hei <br/><br/>Sähköiset asiakirjasi on lähetetty.<br/>{SENT}/{TOTAL} lähetettiin. Lisätietoja on liitetiedostossa. <br/><br/>Kiitos!<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Sähköisen asiakirjan muunto on valmis";
    translation["email.batchownerconvertnotification.body"] =
        "Hei <br/><br/>Sähköiset asiakirjasi on muunnettu.<br/>{CONVERTED}/{TOTAL} muunnettiin. Lisätietoja on liitetiedostossa. <br/><br/>Kiitos!<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Sähköinen asiakirja luotiin ostotilaukselle {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Sähköinen asiakirja yritykseltä {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Sähköinen asiakirja luotiin tapahtumalle {TRANTYPE} {TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Tervehdys <br /><br />Sähköinen asiakirja on luotu ostotilaukselle {PONUM}.<br />Lisätietoja on liitteenä olevassa sähköisessä asiakirjassa.<br /><br />Kiitos!<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Tervehdys <br /><br />Sähköinen asiakirja on luotu tapahtumalle {TYPE} #{TRANID}.<br />Lisätietoja on liitteenä olevassa sähköisessä asiakirjassa.<br /><br />Kiitos!<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Sähköisen asiakirjan luonnin aikana tapahtui virhe";
    translation["email.generationerrornotification.body"] =
        "Sähköisen asiakirjan luonnin aikana tapahtui virheitä.<br/>Tapahtumien luettelo ja lisätietoja virheistä on liitetiedostossa.";
    translation["email.sendingerrornotification.subject"] =
        "Sähköisen asiakirjan lähetyksen aikana tapahtui virhe";
    translation["email.sendingerrornotification.body"] =
        "Sähköisen asiakirjan lähetyksen aikana tapahtui virheitä.<br/>Tapahtumien luettelo ja lisätietoja virheistä on liitetiedostossa.";
    translation["email.webserviceerror.subject"] =
        "Saapuvan sähköisen asiakirjan web-palveluilmoitus";
    translation["email.webserviceerror.body"] =
        "<p>Hei</p><p>Saapuvan sähköisen asiakirjan käsittelyssä web-palvelussa tapahtui virheitä.<br/>Katso seuraavat tiedot:</p>{DETAIL_TABLE}<p>Kiitos!<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Tapahtumanumero";

    return translation;
});
