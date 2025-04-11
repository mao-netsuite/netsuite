define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Détails";
    translation["email.attachment.collabel.transactiontype"] =
        "Type de transaction";
    translation["email.attachment.collabel.internalid"] = "ID interne";
    translation["email.attachment.collabel.vendor"] = "Fournisseur";
    translation["email.conversionerrornotification.subject"] =
        "Une erreur s'est produite pendant la conversion du document électronique entrant";
    translation["email.conversionerrornotification.body"] =
        "Des erreurs se sont produites pendant la conversion du document électronique entrant.<br/>Veuillez consulter le fichier joint pour obtenir la liste des enregistrements avec des erreurs et leurs détails.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Remarque : Si vous voulez qu'un autre utilisateur reçoive les notifications au lieu des administrateurs de votre compte, entrez son adresse électronique dans le champ Destinataire des notifications de documents électroniques dans l'enregistrement de filiale parent.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Identifiant du document électronique entrant";
    translation["email.table.collabel.details"] = "Détails";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Une erreur s'est produite lors de la vérification de la licence du compte.";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays.</br>Pour traiter des documents électroniques en masse, veuillez configurer le pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["inboundedocument.logforconversion"] =
        "Le document électronique entrant est prêt pour la conversion.";
    translation["inboundedocument.logincomplete"] =
        "Le document électronique entrant est incomplet. Aucun {FIELD} n'a été sélectionné.";
    translation["inboundedocument.deletenotallowed"] =
        "La suppression d'un document électronique entrant n'est pas autorisée.";
    translation["inboundedocument.copynotallowed"] =
        "La copie d'un document électronique entrant n'est pas autorisée.";
    translation["inboundedocument.contextunsupported"] =
        "Les documents électroniques entrants ne prennent en charge que les contextes UI et SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "Le fichier de référence XML sélectionné n'est pas un fichier XML valide. Assurez-vous que le fichier que vous sélectionnez a une extension .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Le fichier de référence PDF sélectionné n'est pas un fichier PDF valide. Assurez-vous que le fichier que vous sélectionnez a une extension .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Le fichier de référence XML sélectionné n'est pas un document XML bien formé.";
    translation["inboundedocument.convert.button"] = "Convertir";
    translation["inboundedocument.convert.information"] =
        "La conversion de ce document électronique entrant est en cours.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "La conversion de ce document électronique entrant est déjà en cours.";
    translation["inboundedocument.cancel.button"] =
        "Annuler le document électronique";
    translation["inboundedocument.cancel.confirmation"] =
        "Êtes-vous sûr de vouloir annuler ce document électronique entrant ?";
    translation["inboundedocument.cancel.failed"] =
        "Échec de l'annulation, car le statut de cet enregistrement de document électronique entrant est '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Une erreur s'est produite pendant l'annulation. Pour plus d'informations, consultez la piste d'audit du document électronique dans le sous-onglet Document électronique.";
    translation["inboundedocument.cancel.complete"] =
        "Ce document électronique a été annulé.";
    translation["inboundedocument.preview.button"] = "Afficher le XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour convertir ce document électronique en une transaction, demandez à l'administrateur de votre compte d'indiquer une valeur dans le champ Pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour convertir ce document électronique en une transaction, veuillez contacter votre gestionnaire de compte NetSuite pour acheter une licence.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour convertir ce document électronique en une transaction, veuillez configurer l'adresse de facturation par défaut du fournisseur sélectionné.";
    translation["validationplugin.contextunsupported"] =
        "Le plug-in de validation de documents électroniques entrants ne prend en charge que les contextes UI et SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implémentation du plug-in de validation de documents électroniques entrants";
    translation["validationplugin.pluginimplementationhelp"] =
        "Sélectionnez une implémentation du plug-in de validation de documents électroniques entrants.";
    translation["validationplugin.scriptbannermessage"] =
        "La validation des documents électroniques entrants doit correspondre à des implémentations de plug-in personnalisé. Veuillez recréer les scripts de validation existants en tant que nouvelles implémentations de plug-in personnalisé du type &quot;Plug-in de validation entrante&quot;.";
    translation["ei.conversion.defaulterror"] =
        "Une erreur s'est produite pendant la conversion. Pour plus d'informations, consultez la piste d'audit du document électronique dans le sous-onglet Document électronique.";
    translation["ei.conversion.inactivevendor"] =
        "Impossible de convertir ce document électronique entrant, car le fournisseur sélectionné est inactif. Le champ Statut du document électronique n'a pas été mis à jour et aucune piste d'audit n'a été créée. Décochez la case Inactif dans l'enregistrement fournisseur, puis réessayez de convertir le document électronique.";
    translation["ei.conversion.inactivecustomer"] =
        "Impossible de convertir ce document électronique entrant, car le client sélectionné est inactif. Le champ Statut du document électronique n'a pas été mis à jour et aucune piste d'audit n'a été créée. Décochez la case Inactif dans l'enregistrement du client, puis réessayez de convertir le document électronique.";
    translation["ei.conversion.conversioncomplete"] =
        "Ce document électronique a été converti.";
    translation["ei.conversion.conversionlogbulk"] =
        "Le document électronique entrant a été inclus dans la conversion en masse et a été converti en une transaction avec le numéro d'identification interne : {INTERNALID} de type : '{TYPE}'";
    translation["ei.conversion.conversionlog"] =
        "Le document électronique entrant a été converti en une transaction avec le numéro d'identification interne : {INTERNALID} de type : '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Processus de conversion en masse\nModèle de document électronique utilisé : {TEMPLATENAME}\nPortée de l'erreur : {ERRORSCOPE}\nDétails de l'erreur : {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Modèle de document électronique utilisé : {TEMPLATENAME}\nPortée de l'erreur : {ERRORSCOPE}\nDétails de l'erreur : {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Erreur d'analyse. Vérifiez le mappage de champs des documents électroniques entrants.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Échec de la conversion.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Échec de la validation.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Échec de la conversion, car le statut de cet enregistrement de document électronique entrant est '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "La conversion des documents électroniques entrants avec des clients inactifs n'est pas prise en charge.";
    translation["ei.conversion.inactivevendor.converter"] =
        "La conversion des documents électroniques entrants avec des fournisseurs inactifs n'est pas prise en charge.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Les codes fournisseur {ITEMLIST} ne sont associés à aucun enregistrement d'article.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Les noms/codes fournisseur {ITEMLIST} ne sont associés à aucun enregistrement d'article.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Les codes fournisseur {ITEMLIST} sont associés à plusieurs enregistrements d'article. Modifiez les enregistrements d'article et assurez-vous que les codes fournisseur sont uniques pour chaque article par fournisseur.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Les noms/codes fournisseur {ITEMLIST} sont associés à plusieurs enregistrements d'article. Modifiez les enregistrements d'article et assurez-vous que les noms/codes fournisseur sont uniques pour chaque article par fournisseur.";
    translation["ei.conversion.refnumnotfound"] =
        "Le numéro de référence requis ne figure pas dans le document électronique entrant. Annulez ce document électronique et soumettez un autre document électronique qui inclut un élément XML pour le numéro de référence, mappé au champ tranid.";
    translation["ei.conversion.refnumexists"] =
        "Une facture fournisseur avec le même numéro de référence existe déjà. Annulez ce document électronique et soumettez un autre document électronique avec la bonne valeur du numéro de référence pour l'élément XML mappé au champ tranid.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Le champ vendorcode (code fournisseur) ne figure pas dans le modèle de document électronique. Modifiez le modèle de document électronique ou sélectionnez un autre modèle qui inclut le mappage du champ vendorcode.";
    translation["ei.conversion.novendorcodevalue"] =
        "Au moins un des articles n'a pas de code fournisseur. Annulez ce document électronique et soumettez un autre document électronique avec la bonne valeur pour l'élément XML mappé au champ du code fournisseur.";
    translation["ei.conversion.vendornamenotfound"] =
        "Le champ vendorname (nom du fournisseur) ne figure pas dans le modèle de document électronique. Modifiez le modèle de document électronique ou sélectionnez un autre modèle qui inclut le mappage du champ vendorname.";
    translation["ei.conversion.novendornamevalue"] =
        "Au moins un des articles n'a pas de nom/code fournisseur. Annulez ce document électronique et soumettez un autre document électronique avec la bonne valeur pour l'élément XML correspondant au champ nom/code fournisseur.";
    translation["ei.conversion.sourcetransnotfound"] =
        "L'enregistrement ({TRANSTYPE}#{TRANSID}) n'a pas été trouvé dans le système. Annulez ce document électronique et soumettez un autre document électronique avec la bonne valeur pour l'élément XML correspondant au champ createdfrom.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "L'enregistrement ({TRANSTYPE}#{TRANSID}) est attribué à une autre entité. Sélectionnez l'entité appropriée et convertissez ce document électronique.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Le fournisseur ne possède aucun compte de charges par défaut, ce qui est obligatoire pour convertir les factures incluant des frais. Afin de procéder à la conversion, définissez une valeur dans le champ Compte de charges par défaut dans l'enregistrement fournisseur.";
    translation["ei.conversion.nolinktopo"] =
        "Le document électronique entrant ne comporte pas d'article ou de dépense inclus(e) dans la commande fournisseur référencée. Vérifiez le statut de la commande fournisseur référencée pour savoir si elle peut être convertie. Si elle peut être convertie, annulez ce document électronique et soumettez un autre document électronique avec la bonne valeur pour l'élément XML correspondant au champ createdfrom.";
    translation["inbound.formtitle"] =
        "Convertir les documents électroniques entrants";
    translation["inbound.search"] = "Rechercher";
    translation["inbound.convert"] = "Convertir";
    translation["inbound.return"] = "Retourner aux critères";
    translation["inbound.vendor"] = "Fournisseur";
    translation["inbound.datefrom"] = "Date de création &quot;Du&quot;";
    translation["inbound.dateto"] = "Date de création &quot;Au&quot;";
    translation["inbound.vendorhelp"] =
        "Sélectionnez le fournisseur dont les documents électroniques entrants ayant échoué doivent être inclus dans le résultat de la recherche.";
    translation["inbound.datefromhelp"] =
        "Sélectionnez la date de début de la période dans laquelle des documents électroniques entrants ayant échoué doivent avoir été créés pour figurer dans le résultat de la recherche.";
    translation["inbound.datetohelp"] =
        "Sélectionnez la date de fin de la période dans laquelle des documents électroniques entrants ayant échoué doivent avoir été créés pour figurer dans le résultat de la recherche.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filtres de recherche de documents électroniques entrants ayant échoué";
    translation["inbound.sublist.sublistname"] =
        "Résultats de la recherche de documents électroniques entrants ayant échoué";
    translation["inbound.sublist.internalid"] = "ID interne";
    translation["inbound.sublist.vendor"] = "Fournisseur";
    translation["inbound.sublist.refnum"] = "Numéro de référence";
    translation["inbound.sublist.ponum"] = "Numéro de la commande fournisseur";
    translation["inbound.sublist.datecreated"] = "Date de création";
    translation["inbound.sublist.edoctemplate"] =
        "Modèle de document électronique";
    translation["inbound.msg.conversionongoing"] =
        "Ce document électronique est en cours de conversion. Vous recevrez un courriel une fois le processus terminé.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Vous ne pouvez pas effectuer la recherche avec les critères sélectionnés, car la conversion du document électronique entrant est déjà en cours pour la plage de dates ({DATECREATED_FROM} - {DATECREATED_TO}). Modifiez les critères de recherche ou réessayez après avoir converti ce document électronique.";
    translation["inbound.invaliddates"] =
        "La date de création &quot;De&quot; ne doit pas être postérieure à la date de création &quot;À&quot;. Modifiez les dates de sorte que la date de création &quot;Du&quot; soit antérieure à la date de création &quot;Au&quot;.";
    translation["inbound.configurefreecountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour convertir des documents électroniques en masse, demandez à l'administrateur de votre compte de configurer le pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["portlet.title"] = "Documents électroniques";
    translation["portlet.outboundforgeneration"] =
        "Documents électroniques sortants pour génération";
    translation["portlet.outboundforsending"] =
        "Documents électroniques sortants pour envoi";
    translation["portlet.outboundwitherrors"] =
        "Documents électroniques sortants avec erreurs";
    translation["portlet.outboundsendinglink"] =
        "Envoyer les documents électroniques sortants ayant échoué";
    translation["portlet.inboundforconversion"] =
        "Documents électroniques entrants pour conversion";
    translation["portlet.inboundconvertfailed"] =
        "Convertir les documents électroniques entrants ayant échoué";
    translation["portlet.inboundincomplete"] =
        "Documents électroniques entrants incomplets";
    translation["portlet.inbounduploadlink"] =
        "Charger le document électronique entrant";
    translation["portlet.outboundforcertification"] =
        "Documents électroniques sortants pour certification";
    translation["portlet.outboundcertifiedforsending"] =
        "Documents électroniques sortants pour envoi";
    translation["inbound.webservice.response.success"] =
        "Le document électronique entrant avec l'ID : {ID} a été créé avec succès.";
    translation["inbound.webservice.response.novendor"] =
        "Aucun fournisseur associé à l'identifiant de service Web {IDENTIFIER}. Vérifiez que le bon identifiant de service Web est utilisé.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Le document électronique entrant avec l'ID : {ID} a été créé avec succès. Toutefois, plusieurs fournisseurs sont associés à l'identifiant de service Web : {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Le document électronique entrant est incomplet, car le modèle adéquat ne peut pas être déterminé. Sélectionnez un modèle dans l'enregistrement du document électronique entrant ou configurez le XSD dans l'enregistrement du modèle de document électronique pour activer la sélection automatique de modèle.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Le document électronique entrant est incomplet, car le fournisseur adéquat ne peut pas être déterminé. Sélectionnez un fournisseur dans l'enregistrement du document électronique entrant ou définissez l'identifiant du service Web dans l'enregistrement du fournisseur associé.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Les clés suivantes sont manquantes : {KEYS}. Vous devez les fournir dans la demande de service Web.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Le corps de la demande de service Web doit être un objet JSON ou un tableau d'objets JSON utilisant le type de contenu : 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Les destinataires de documents électroniques suivants n'ont pas d'adresse électronique dans leur enregistrement de contact : {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Aucun destinataire de documents électroniques n'est associé à cette transaction. Pour envoyer des documents électroniques par courriel, au moins un contact doit être ajouté à la liste des destinataires de documents électroniques.";
    translation["transaction.maxrecipientexceeded"] =
        "Le nombre de destinataires de courriel que vous avez ajoutés a dépassé la limite. Vous pouvez ajouter 10 destinataires de courriel maximum.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Seuls les types de transactions suivants sont traités :";
    translation["ei.prefs.formtitle"] =
        "Préférences pour les documents électroniques";
    translation["ei.prefs.information.about.certify.skip"] =
        "L'étape de certification est ignorée si la  méthode d'envoi de certification n'est pas définie ou n'est pas applicable pour la transaction.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Facturation électronique automatique";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Type d'automatisation de document électronique";
    translation["ei.prefs.text.option.comb.disabled"] = "Désactiver";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Générer, Certifier, Envoyer";
    translation["ei.prefs.text.option.comb.gc"] = "Générer, Certifier";
    translation["ei.prefs.text.option.comb.cs"] = "Certifier, Envoyer";
    translation["ei.prefs.btn.label.cancel"] = "Annuler";
    translation["ei.prefs.btn.label.save"] = "Enregistrer";
    translation["ei.prefs.msg.confirm.save"] =
        "Voulez-vous enregistrer les modifications apportées aux préférences pour les documents électroniques";
    translation["ei.prefs.msg.success.save"] =
        "Les préférences pour les documents électroniques ont été enregistrées avec succès.";
    translation["ei.prefs.msg.failed.save"] =
        "L'enregistrement des préférences pour les documents électroniques a échoué.";
    translation["ei.prefs.insufficient.permission.details"] =
        "L'accès à cette page nécessite une autorisation. Pour demander l'accès, contactez votre administrateur.";
    translation["ei.eip.msg.completed"] =
        "Le traitement du document électronique est terminé.";
    translation["ei.eip.msg.failed"] =
        "Le traitement du document électronique a échoué. Pour plus d'informations, consultez la piste d'audit du document électronique.";
    translation["ei.eip.msg.processing"] =
        "Le document électronique est en cours de traitement.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Le document électronique a déjà été traité.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps License Client n'est pas disponible dans votre compte. Veuillez installer cette SuiteApp pour accéder à toutes les fonctionnalités de facturation électronique.";
    translation["outbound.formtitle"] =
        "Envoyer les documents électroniques qui ont échoué";
    translation["outbound.search"] = "Rechercher";
    translation["outbound.send"] = "Envoyer";
    translation["outbound.return"] = "Retourner aux critères";
    translation["outbound.customer"] = "Client";
    translation["outbound.vendor"] = "Fournisseur";
    translation["outbound.subsidiary"] = "Filiale";
    translation["outbound.type"] = "Type de transaction";
    translation["outbound.datefrom"] = "Date de transaction &quot;Du&quot;";
    translation["outbound.dateto"] = "Date de transaction &quot;Au&quot;";
    translation["outbound.subshelp"] =
        "Sélectionnez une filiale pour n'afficher que les transactions appartenant à celle-ci.";
    translation["outbound.custhelp"] =
        "Sélectionnez un client pour n'afficher que les transactions appartenant à celui-ci. Si aucun client n'est sélectionné, les résultats de la recherche présentent toutes les transactions appartenant à la filiale, quel que soit le client.";
    translation["outbound.vendorhelp"] =
        "Sélectionnez un fournisseur pour n'afficher que les transactions appartenant à celui-ci. Si aucun fournisseur n'est sélectionné, les résultats de la recherche présentent toutes les transactions appartenant à la filiale, quel que soit le fournisseur.";
    translation["outbound.entitytypehelp"] =
        "Choisissez un type d'entité, Client ou Fournisseur. Votre sélection active la liste déroulante correspondante ci-dessous.";
    translation["outbound.typehelp"] =
        "Sélectionnez un ou plusieurs types de transactions pour chaque document électronique que vous souhaitez envoyer. Pour sélectionner plusieurs types, appuyez sur la touche CTRL et maintenez-la enfoncée pendant que vous indiquez vos choix.<br /><br />Si aucun type de transaction n'est sélectionné, les résultats de recherche présentent tous les documents électroniques prêts à envoyer, quel que soit le type de transaction.";
    translation["outbound.datefromhelp"] =
        "Pour afficher une liste des transactions créées dans une plage de dates spécifique, sélectionnez la date de début de l'intervalle.";
    translation["outbound.datetohelp"] =
        "Pour afficher une liste des transactions créées dans une plage de dates spécifique, sélectionnez la date de fin de l'intervalle.";
    translation["outbound.entityfieldgroup"] = "Filtres de recherche d'entité";
    translation["outbound.filtersfieldgroup"] =
        "Filtres de recherche de transaction";
    translation["outbound.entitytypeinlinehelp"] =
        "Sélectionnez le type d'entité :";
    translation["outbound.invalidtypetitle"] =
        "Types de transactions non valides";
    translation["outbound.invalidtype"] =
        "Les types de transactions suivants ne sont pas pris en charge actuellement : {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Les types de transactions suivants ne sont pas valides pour l'entité choisie : {TRANSACTIONTYPES}. Sélectionnez les types de transactions appropriés pour l'entité que vous avez choisie.";
    translation["outbound.invaliddates"] =
        "La date de transaction &quot;Du&quot; ne doit pas être postérieure à la date de transaction &quot;Au&quot;. Modifiez les dates de sorte que la date de transaction &quot;Du&quot; soit antérieure à la date de transaction &quot;Au&quot;.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Vous ne pouvez pas exécuter de recherche à l'aide des critères sélectionnés, car l'envoi du document électronique relatif aux transactions comprises dans la plage de dates ({TRANDATE_FROM} – {TRANDATE_TO}) pour la filiale ({SUBSIDIARY}) est déjà en cours. Veuillez modifier vos critères de recherche ou réessayer ultérieurement après l'envoi de ce document électronique.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Vous ne pouvez pas exécuter de recherche à l'aide des critères sélectionnés, car l'envoi du document électronique relatif aux transactions comprises dans la plage de dates ({TRANDATE_FROM} – {TRANDATE_TO})  est déjà en cours. Veuillez modifier vos critères de recherche ou réessayer ultérieurement après l'envoi de ce document électronique.";
    translation["outbound.sublist.trannum"] = "Numéro de transaction";
    translation["outbound.sublist.trantype"] = "Type de transaction";
    translation["outbound.sublist.customer"] = "Client";
    translation["outbound.sublist.vendor"] = "Fournisseur";
    translation["outbound.sublist.subsidiary"] = "Filiale";
    translation["outbound.sublist.trandate"] = "Date de la transaction";
    translation["outbound.sublist.memo"] = "Mémo";
    translation["outbound.sublist.template"] = "Modèle";
    translation["outbound.sublist.sendingmethod"] = "Méthode d'envoi";
    translation["outbound.sublist.sublistname"] =
        "Résultats de la recherche de documents électroniques sortants ayant échoué à envoyer";
    translation["outbound.msg.sendingongoing"] =
        "L'envoi du document électronique est en cours. Vous recevrez un courriel une fois le processus terminé.";
    translation["outbound.configurefreecountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour envoyer des documents électroniques en masse, demandez à l'administrateur de votre compte de configurer le pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["outbound.entitysend"] = "Envoyer à l'entité";
    translation["outbound.certifysend"] = "Envoyer pour certification";
    translation["outbound.sendingtypehelp"] =
        "Choisissez Envoyer à l'entité ou Envoyer pour certification. Une liste des transactions correspondantes s'affichera pour l'envoi.";
    translation["customer.noemail"] =
        "Aucune adresse électronique n'est associée à ce client. Saisissez une adresse électronique valide pour l'enregistrement client afin d'activer l'envoi des documents électroniques par courriel.";
    translation["customer.contactnoemail"] =
        "Les destinataires de documents électroniques suivants n'ont pas d'adresse électronique dans leur enregistrement de contact : {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Aucun destinataire de documents électroniques n'est défini pour ce client. Pour envoyer des documents électroniques par courriel à ce client, au moins un contact doit être ajouté à la liste des destinataires de documents électroniques.";
    translation["customer.arrayrequired"] =
        "Tableau de contacts requis pour la validation.";
    translation["customer.parameternotarray"] =
        "Le paramètre Contacts n'est pas un tableau.";
    translation["customer.maxrecipientexceeded"] =
        "Vous avez dépassé le nombre maximum de destinataires de courriel. Sélectionnez au maximum 10 destinataires de courriel.";
    translation["vendor.noemail"] =
        "Aucune adresse électronique n'est associée à ce fournisseur. Saisissez une adresse électronique valide pour l'enregistrement fournisseur afin de permettre l'envoi de documents électroniques par courriel.";
    translation["vendor.contactnoemail"] =
        "Les destinataires de documents électroniques suivants n'ont pas d'adresse électronique dans leur enregistrement de contact : {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Aucun destinataire de documents électroniques n'est défini pour ce fournisseur. Pour envoyer des documents électroniques par courriel à ce fournisseur, au moins un contact doit être ajouté à la liste des destinataires de documents électroniques.";
    translation["vendor.maxrecipientexceeded"] =
        "Vous avez dépassé le nombre maximum de destinataires de courriel. Sélectionnez au maximum 10 destinataires de courriel.";
    translation["vendor.nosenders"] =
        "Il n'existe pas d'expéditeur de courriel contenant des documents électroniques pour ce fournisseur. Pour recevoir des documents électroniques par courriel de ce fournisseur, vous devez entrer au moins une adresse électronique dans la liste Expéditeur de courriel contenant des documents électroniques du fournisseur.";
    translation["vendor.existingsender"] =
        "L'adresse électronique de l'expéditeur existe déjà.";
    translation["vendor.existingdomain"] =
        "Le domaine de courriel de l'expéditeur est déjà utilisé par un autre fournisseur.";
    translation["vendor.existingidentifier"] =
        "L'identifiant du service Web est déjà utilisé par un autre fournisseur. Entrez un identifiant de service Web différent.";
    translation["customeremailrecipient.contextunsupported"] =
        "Le destinataire de courriel contenant des documents électroniques du client admet uniquement les contextes suivants : UI, CSV, SuiteScript et Services Web.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Le destinataire de courriel contenant des documents électroniques du fournisseur admet uniquement les contextes suivants : UI, CSV, SuiteScript et Services Web.";
    translation["vendoremailsender.contextunsupported"] =
        "L'expéditeur de courriel contenant des documents électroniques du fournisseur admet uniquement les contextes suivants : UI, CSV, SuiteScript et Services Web.";
    translation["template.incorrectregex"] =
        "Le champ REGEX contient une expression régulière erronée. Une syntaxe correcte doit être utilisée.";
    translation["template.invalidjson"] =
        "Le format du modèle JSON indiqué dans le champ Modèle pour les documents électroniques sortants est incorrect. Cliquez sur OK pour continuer ou sur Annuler pour rester sur la page actuelle.";
    translation["template.invalidxml"] =
        "Le modèle XML contient des erreurs. La syntaxe XML doit être bien formée.";
    translation["template.templaterequired"] =
        "Le contenu du modèle est manquant pour le type de transaction sortante sélectionné. Indiquez un contenu de modèle XML ou JSON valide dans le champ Documents électroniques sortants, puis réessayez.";
    translation["template.mappingrequired"] =
        "Vous avez sélectionné un type de transaction entrante, mais le contenu JSON du mappage de champs est manquant. Entrez le contenu JSON dans le champ Mappage de champs des documents électroniques entrants.";
    translation["template.templateorjsonrequired"] =
        "Des valeurs de champ sont manquantes. Pour une transaction sortante, spécifiez un contenu XML ou JSON valide dans le champ Modèle pour les documents électroniques sortants. Pour une transaction entrante, spécifiez le contenu JSON dans le champ Mappage de champs des documents électroniques entrants.";
    translation["template.invalidxsdfile"] =
        "Le fichier XSD sélectionné n'est pas un fichier XSD valide. Assurez-vous que le fichier que vous sélectionnez possède l'extension .xsd.";
    translation["template.contextunsupported"] =
        "Ce modèle de document électronique ne prend en charge que les contextes UI et SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Sélectionnez un ou plusieurs types de transactions que ce modèle doit prendre en charge. Pour sélectionner plusieurs types, appuyez sur la touche CTRL et maintenez-la enfoncée pendant que vous indiquez vos choix.<br /><br />Si un type de transaction n'est pas sélectionnable, cela signifie que le modèle a déjà été attribué à un enregistrement de transaction de ce type. Pour permettre la sélection de ce type de transaction, supprimez le modèle de l'enregistrement de transaction.<br /><br />Vous pouvez aussi attribuer ce modèle à des documents électroniques entrants. Le champ Type de transaction est alors désactivé.";
    translation["template.eistatus"] =
        "Limiter la modification des transactions en fonction du statut de document électronique";
    translation["template.supportedeistatusfieldhelp"] =
        "Les transactions avec le statut de document électronique sélectionné ne pourront pas être modifiées si ce modèle leur est associé. Vous pouvez sélectionner plusieurs statuts de document électronique.";
    translation["template.invalidschemaordependency"] =
        "Le schéma est un fichier XSD structuré de manière incorrecte ou le schéma dépendant est introuvable.";
    translation["template.xmldoesnotconformtoschema"] =
        "Le fichier XML du modèle n'est pas conforme au fichier XSD ou au schéma fourni.";
    translation["template.xmldomexception"] =
        "La chaîne XML saisie est incorrecte.";
    translation["template.missingreqdargument"] =
        "Le fichier XSD pour la validation sortante est manquant.";
    translation["template.xsdvalidationexception"] =
        "Une exception inconnue s'est produite lors de la validation du fichier XSD.";
    translation["template.xsdmissingdependencyfolder"] =
        "Le dossier de schémas XSD est non valide ou manquant.";
    translation["invoice.generatebtn"] = "Générer le document électronique";
    translation["invoice.sendbtn"] = "Envoyer le document électronique";
    translation["invoice.sendcertifybtn"] =
        "Certifier le document électronique";
    translation["invoice.eipbtn"] = "Traiter le document électronique";
    translation["invoice.loguntagged"] =
        "Le modèle de document électronique a été supprimé. La transaction n’est pas marquée pour la génération de document électronique.";
    translation["invoice.logforgenerate"] =
        "La transaction est prête pour la génération de document électronique.";
    translation["invoice.invalidtemplatesub"] =
        "La filiale de la transaction du modèle de document électronique sélectionné n'est pas valide. Sélectionnez un autre modèle de document électronique.";
    translation["invoice.templateremovalerror"] =
        "Vous ne pouvez pas supprimer le modèle de document électronique des documents électroniques envoyés.";
    translation["ei.sending.currentlysending"] =
        "L'envoi du document électronique est en cours. L'exécution de cette tâche peut prendre quelques minutes. Vous ne devez pas interrompre le processus en cliquant à nouveau sur le bouton Envoyer le document électronique. La page sera rechargée après l'envoi du document électronique.";
    translation["ei.sending.notready"] =
        "Ce document électronique n'est pas prêt pour l'envoi. Vous devez d'abord cliquer sur Générer le document électronique pour générer un document électronique.";
    translation["ei.sending.alreadysent"] =
        "Cette transaction a déjà été envoyée.";
    translation["ei.sending.norecipients"] =
        "Impossible d'envoyer le document électronique, car le client n'a pas de destinataire de documents électroniques. Pour pouvoir envoyer ce document électronique par courriel, vous devez au préalable sélectionner les destinataires de documents électroniques dans l'enregistrement client.";
    translation["ei.sending.indivcustnoemail"] =
        "Impossible d'envoyer le document électronique, car le client n'a pas d'adresse électronique. Pour pouvoir envoyer ce document électronique par courriel, vous devez au préalable ajouter une adresse électronique à l'enregistrement client.";
    translation["ei.sending.norecipients.vendor"] =
        "Impossible d'envoyer le document électronique, car le fournisseur n'a pas de destinataire de documents électroniques. Pour pouvoir envoyer ce document électronique par courriel, vous devez au préalable sélectionner les destinataires de documents électroniques dans l'enregistrement fournisseur.";
    translation["ei.sending.indivvendnoemail"] =
        "Impossible d'envoyer le document électronique, car le fournisseur n'a pas d'adresse électronique. Pour pouvoir envoyer ce document électronique par courriel, vous devez au préalable ajouter une adresse électronique à l'enregistrement fournisseur.";
    translation["ei.sending.invalidmethod"] =
        "Sélectionnez une méthode d'envoi valide pour {TYPE} #{INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Expéditeur : {SENDER}\nDestinataires : {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "L'expéditeur du document électronique ({EMPLOYEENAME}) n'a pas d'adresse électronique. Saisissez une adresse électronique valide dans l'enregistrement employé.";
    translation["ei.sending.recipientnoemail"] =
        "Un ou plusieurs destinataires du document électronique associé à cette transaction n'ont pas d'adresse électronique. Vérifiez que les destinataires de ce client possèdent une adresse électronique valide.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Un ou plusieurs destinataires du document électronique associé à cette transaction n'ont pas d'adresse électronique. Vérifiez que les destinataires de ce fournisseur possèdent une adresse électronique valide.";
    translation["ei.sending.defaulterror"] =
        "Une erreur s'est produite lors de l'envoi du document électronique. Pour plus d'informations, consultez la piste d'audit des documents électroniques dans le sous-onglet Document électronique.";
    translation["ei.sending.inactivecustomer"] =
        "Impossible d'envoyer le document électronique pour cette transaction, car le client sélectionné est inactif. Le champ Statut du document électronique n'a pas été mis à jour et aucune piste d'audit n'a été créée. Décochez la case Inactif dans l'enregistrement client, puis réessayez d'envoyer le document électronique.";
    translation["ei.sending.inactivevendor"] =
        "Impossible d'envoyer le document électronique pour cette transaction, car le fournisseur sélectionné est inactif. Le champ Statut du document électronique n'a pas été mis à jour et aucune piste d'audit n'a été créée. Décochez la case Inactif dans l'enregistrement fournisseur, puis réessayez d'envoyer le document électronique.";
    translation["ei.sending.msg.processcomplete"] =
        "Le document électronique a été envoyé.";
    translation["ei.sending.configurefreecountry"] =
        "Votre compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour envoyer des documents électroniques en masse dans un même pays, sélectionnez ce pays dans le champ Pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Les transactions avec des clients inactifs ne sont pas prises en charge par le document électronique.";
    translation["ei.sending.inactivevendor.manager"] =
        "Les transactions avec des fournisseurs inactifs ne sont pas prises en charge par le document électronique.";
    translation["ei.sending.certification.defaulterror"] =
        "Une erreur s'est produite lors de la certification du document électronique. Pour plus d'informations, consultez la piste d'audit du document électronique dans le sous-onglet Document électronique.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Le document électronique a été envoyé pour certification.";
    translation["ei.generation.generationlogbulk"] =
        "Le document électronique a été généré en masse à l'aide du modèle de document électronique '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "Le document électronique a été généré à l'aide du modèle de document électronique '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Le document électronique et le fichier PDF ont été générés en masse à l'aide du modèle de document électronique '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "Le document électronique et le fichier PDF ont été générés à l'aide du modèle de document électronique '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Le document électronique a été généré en masse à l'aide du modèle de document électronique '{TEMPLATENAME}'. Le fichier PDF généré précédemment pour cette transaction a été supprimé.";
    translation["ei.generation.generationremovedpdflog"] =
        "Le document électronique a été généré à l'aide du modèle de document électronique '{TEMPLATENAME}'. Le fichier PDF généré précédemment pour cette transaction a été supprimé.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Processus de génération en masse\nModèle de document électronique utilisé : {TEMPLATENAME}\nDétails de l'erreur : {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Modèle de document électronique utilisé : {TEMPLATENAME}\nDétails de l'erreur : {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Une erreur s'est produite pendant la génération. Pour plus d'informations, consultez la piste d'audit du document électronique dans le sous-onglet Document électronique.";
    translation["ei.generation.inactivecustomer"] =
        "Impossible de générer un document électronique pour cette transaction, car le client sélectionné est inactif. Le champ Statut du document électronique n'a pas été mis à jour et aucune piste d'audit n'a été créée. Décochez la case Inactif dans l'enregistrement client, puis réessayez de générer le document électronique.";
    translation["ei.generation.inactivevendor"] =
        "Impossible de générer un document électronique pour cette transaction, car le fournisseur sélectionné est inactif. Le champ Statut du document électronique n'a pas été mis à jour et aucune piste d'audit n'a été créée. Décochez la case Inactif dans l'enregistrement fournisseur, puis réessayez de générer le document électronique.";
    translation["ei.generation.msg.processcomplete"] =
        "Le document électronique a été généré.";
    translation["ei.generation.configurefreecountry"] =
        "Votre compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour générer des documents électroniques en masse pour un même pays, sélectionnez ce pays dans le champ Pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Les transactions avec des clients inactifs ne sont pas prises en charge par le document électronique.";
    translation["ei.generation.inactivevendor.generator"] =
        "Les transactions avec des fournisseurs inactifs ne sont pas prises en charge par le document électronique.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Le document électronique a été généré et signé numériquement avec succès.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "La génération a échoué car le document électronique résultant n'a pas un format XML ou JSON correct.";
    translation["notify.batchownersubject"] =
        "Envoi du document électronique terminé";
    translation["notify.batchownerbody"] =
        "Bonjour, <br/><br/>Votre demande d'envoi de documents électroniques est terminée.<br/>{SENT} documents sur {TOTAL} ont été envoyés. 'Pour plus d'informations, consultez le fichier joint. <br/><br/>Merci,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Document électronique généré pour la commande fournisseur n° {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Document électronique généré à partir de {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Bonjour, <br /><br />{MESSAGE}<br />Veuillez trouver le fichier du document électronique en pièce jointe.<br /><br />Merci,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Une erreur s'est produite pendant la génération du document électronique";
    translation["notify.generationerrorbody"] =
        "Des erreurs se sont produites pendant la génération du document électronique.<br/>Veuillez consulter le fichier joint pour obtenir la liste des transactions et les détails des erreurs.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Un document électronique a déjà été envoyé pour cette transaction. La génération d'un nouveau document électronique écrasera le document électronique précédent. Êtes-vous sûr de vouloir générer un nouveau document électronique ?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Vous ne pouvez pas supprimer le modèle de document électronique des documents électroniques envoyés.";
    translation["transaction.msg.generate.information"] =
        "La génération de ce document électronique est en cours.";
    translation["transaction.msg.send.information"] =
        "L'envoi de ce document électronique est en cours.";
    translation["transaction.msg.send.certify.information"] =
        "La certification de ce document électronique est en cours.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "La génération de ce document électronique est déjà en cours.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "L'envoi de ce document électronique est déjà en cours.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "La certification de ce document électronique est déjà en cours.";
    translation["transaction.msg.uncheckpdf"] =
        "Un fichier PDF correspondant à cette transaction a été créé lors de la génération du dernier document électronique. Le fait de décocher cette case supprimera ce fichier PDF lors de la prochaine génération de document électronique.";
    translation["transaction.msg.nofreecountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour générer un document électronique pour cette transaction, demandez à l'administrateur de votre compte d'indiquer une valeur dans le champ Pays des documents électroniques pour une utilisation gratuite dans la page d'informations sur la société.";
    translation["transaction.msg.otherbillingcountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour générer un document électronique pour cette transaction, veuillez contacter le gestionnaire de votre compte NetSuite pour acheter une licence.";
    translation["transaction.msg.nobillingcountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour générer un document électronique pour cette transaction, veuillez indiquer l'adresse de facturation pour cette transaction.";
    translation["transaction.msg.noshippingcountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de la SuiteApp Electronic Invoicing dans plusieurs pays. Pour générer un document électronique pour cette transaction, veuillez indiquer l'adresse d'expédition pour cette transaction.";
    translation["transaction.msg.nocustomercountry"] =
        "Ce compte ne possède pas de licence active pour l'utilisation de Electronic Invoicing multi-pays. Pour générer un document électronique pour cette transaction, veuillez indiquer une adresse de facturation par défaut pour le client de cette transaction.";
    translation["transaction.msg.blockededittransaction"] =
        "La modification de transaction est bloquée pour le statut actuel du document électronique. Veuillez consulter le modèle de facture électronique joint.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Si vous remplacez la valeur XML par un autre type dans le champ Type de contenu, tous les validateurs XML seront supprimés. Êtes-vous sûr de vouloir modifier le type de contenu ?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Seuls les validateurs de type de contenu XML peuvent être ajoutés.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Ce validateur est déjà dans la liste.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Les validateurs de modèle de document électronique ne prennent en charge que les contextes UI et SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "L'enregitrement {DEFAULT_DOCUMENT_STANDARD} existe déjà. Vous ne pouvez pas créer un enregistrement de package de documents utilisant le même nom. Renommez votre enregistrement de package de documents et réessayez.";
    translation["standarddocument.default.editnotallowed"] =
        "La modification du nom ou de la description de l'enregistrement {DEFAULT_DOCUMENT_STANDARD} n'est pas autorisée.";
    translation["standarddocument.default.deletenotallowed"] =
        "La suppression de l'enregistrement {DEFAULT_DOCUMENT_STANDARD} n'est pas autorisée.";
    translation["standarddocument.contextunsupported"] =
        "Ce package de documents électroniques ne prend en charge que les contextes UI, CSV Import et SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "L'enregistrement de méthode d'envoi {DEFAULT_SENDING_METHOD_NAME} existe déjà. Vous ne pouvez pas créer un enregistrement de méthode d'envoi utilisant le même nom. Renommez votre enregistrement de méthode d'envoi et réessayez.";
    translation["sendingmethod.default.editnotallowed"] =
        "Vous ne pouvez pas modifier l'enregistrement de méthode d'envoi {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Vous ne pouvez pas supprimer l'enregistrement de méthode d'envoi {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Le champ Type de transaction a été désactivé, car cette méthode d'envoi est attribuée à un ou plusieurs enregistrements de transaction. Pour modifier cette méthode d'envoi, retirez la méthode d'envoi de l'enregistrement de transaction pour activer le champ Type de transaction et réessayez.";
    translation["sendingmethod.contextunsupported"] =
        "Cette méthode d'envoi de document électronique ne prend en charge que les contextes UI et SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Sélectionnez un ou plusieurs types de transactions que cette méthode d'envoi doit prendre en charge. Pour sélectionner plusieurs types de transactions, appuyez sur la touche CTRL et maintenez-la enfoncée pendant que vous indiquez vos choix.<br /><br />Si un type de transaction n'est pas sélectionnable, cela signifie que la méthode d'envoi a été attribuée à un enregistrement de transaction de ce type. Vous devez commencer par supprimer la méthode d'envoi de l'enregistrement de transaction pour activer la sélection du type de transaction.";
    translation["sendingmethod.pluginimplementation"] =
        "Implémentation du plug-in de méthode d'envoi de documents électroniques";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Sélectionner une implémentation du plug-in de méthode d'envoi";
    translation["sendingmethod.scriptbannermessage"] =
        "Les méthodes d'envoi doivent correspondre à des implémentations de plug-in personnalisé. Veuillez recréer les scripts de méthode d'envoi existants en tant que nouvelles implémentations de plug-in personnalisées du type &quot;Plug-in d'envoi&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Implémentation du plug-in de source de données personnalisée";
    translation["customdatasource.pluginimplementationhelp"] =
        "Sélectionner l'implémentation du plug-in de source de données personnalisée";
    translation["digitalsignature.pluginimplementation"] =
        "Implémentation du plug-in de signature numérique";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Sélectionnez une implémentation de plug-in. Ce champ est obligatoire si vous souhaitez signer numériquement des documents électroniques.";
    translation["digitalsignature.identifierlabel"] =
        "Ce document électronique est signé numériquement.";
    translation["digitalsignature.successlog"] =
        "Le document électronique généré est signé numériquement.";
    translation["digitalsignature.failurelog"] =
        "Le document électronique généré n'est pas signé numériquement.";
    translation["digitalsignature.pluginfailedmessage"] =
        "L’implémentation du plug-in de signature numérique a renvoyé un état d’échec.";
    translation["digitalsignature.plugininvalidresult"] =
        "Le résultat de l'implémentation du plug-in de signature numérique n'est pas valide.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implémentation du plug-in de source de données personnalisée entrante";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Sélectionnez une implémentation du plug-in de source de données personnalisée entrante.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Le résultat de l'implémentation du plug-in de source de données personnalisée entrante n'est pas valide.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implémentation du plug-in de validation sortante";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Sélectionnez une implémentation de plug-in de validation de documents électroniques sortants. Ce plug-in valide les documents électroniques sortants.";
    translation["outboundvalidation.successlog"] =
        "Validation sortante réussie.";
    translation["outboundvalidation.failurelog"] =
        "Échec de la validation sortante.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "L'implémentation du plug-in de validation sortante a renvoyé un état d’échec.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Le résultat de l'implémentation du plug-in de validation sortante n'est pas valide.";
    translation["template.msg.cannotedittransactiontype"] =
        "Le champ Type de transaction a été désactivé, car ce modèle est déjà attribué à un ou plusieurs enregistrements de transaction. Pour modifier ce modèle, retirez-le de l'enregistrement de transaction pour activer le champ Type de transaction et réessayez. Vous pouvez aussi attribuer ce modèle à des documents électroniques entrants. Cela désactivera le champ Type de transaction.";
    translation["template.msg.forcetocopymessage"] =
        "Vous ne pouvez pas modifier le modèle par défaut de document électronique. Vous pouvez en faire une copie avec l'option Copier du menu Actions, ou bien créer un nouveau modèle.";
    translation["template.msg.warningoneditmessage"] =
        "Il s'agit du modèle de document électronique par défaut. Les modifications apportées à ce modèle seront perdues ou remplacées lors de la mise à jour de la SuiteApp.";
    translation["email.batchownernotification.subject"] =
        "Envoi du document électronique terminé";
    translation["email.batchownernotification.body"] =
        "Bonjour, <br/><br/>Vos documents électroniques ont été envoyés.<br/>{SENT} documents sur {TOTAL} ont été envoyés. Pour plus d'informations, consultez le fichier joint. <br/><br/> Merci,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Conversion du document électronique terminée";
    translation["email.batchownerconvertnotification.body"] =
        "Bonjour, <br/><br/>Vos documents électroniques ont été convertis.<br/>{CONVERTED} documents sur {TOTAL} ont été convertis. Pour plus d'informations, consultez le fichier joint. <br/><br/>Merci,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Document électronique généré pour la commande fournisseur n° {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Document électronique provenant de {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Document électronique généré pour {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Bonjour, <br /><br />Le document électronique pour la commande fournisseur #{PONUM} a été généré.<br />Pour plus d'informations, veuillez consulter le fichier du document électronique en pièce jointe.<br /><br />Merci,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Bonjour, <br /><br />Le document électronique pour {TYPE} #{TRANID} a été généré.<br />Pour plus d'informations, veuillez consulter le fichier du document électronique en pièce jointe.<br /><br />Merci,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Une erreur s'est produite pendant la génération du document électronique";
    translation["email.generationerrornotification.body"] =
        "Des erreurs se sont produites pendant la génération du document électronique.<br/>Veuillez consulter le fichier joint pour obtenir la liste des transactions et les détails des erreurs.";
    translation["email.sendingerrornotification.subject"] =
        "Une erreur s'est produite pendant l'envoi du document électronique";
    translation["email.sendingerrornotification.body"] =
        "Des erreurs se sont produites pendant l'envoi du document électronique.<br/>Veuillez consulter le fichier joint pour obtenir la liste des transactions et les détails des erreurs.";
    translation["email.webserviceerror.subject"] =
        "Notification du service Web de document électronique entrant";
    translation["email.webserviceerror.body"] =
        "<p>Bonjour,</p><p>Des erreurs sont survenues lors du traitement du document électronique entrant à l'aide du service Web.<br/>Veuillez consulter les détails suivants.</p>{DETAIL_TABLE}<p>Merci,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Numéro de transaction";

    return translation;
});
