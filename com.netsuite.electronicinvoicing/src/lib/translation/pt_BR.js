define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detalhes";
    translation["email.attachment.collabel.transactiontype"] =
        "Tipo de transação";
    translation["email.attachment.collabel.internalid"] = "ID interno";
    translation["email.attachment.collabel.vendor"] = "Fornecedor";
    translation["email.conversionerrornotification.subject"] =
        "Erro durante a conversão do documento eletrônico de entrada";
    translation["email.conversionerrornotification.body"] =
        "Erros durante a conversão do documento eletrônico.<br/>Consulte o arquivo anexado para visualizar a lista de registros com erros e seus detalhes.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Nota: para que as notificações sejam enviadas a outro usuário (em vez de administradores de contas), digite o endereço de e-mail do usuário no campo Destinatário de notificações de documentos eletrônicos do seu registro de subsidiária primária.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID do documento eletrônico de entrada";
    translation["email.table.collabel.details"] = "Detalhes";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Erro encontrado durante a verificação de licença da conta.";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países.</br>Se deseja processar documentos eletrônicos em lote, configure o País do documento eletrônico para uso gratuito na página de informações da empresa.";
    translation["inboundedocument.logforconversion"] =
        "O documento eletrônico de entrada está pronto para conversão.";
    translation["inboundedocument.logincomplete"] =
        "O documento eletrônico de entrada está incompleto. Nenhum {FIELD} foi selecionado.";
    translation["inboundedocument.deletenotallowed"] =
        "Não é permitido excluir um documento eletrônico de entrada.";
    translation["inboundedocument.copynotallowed"] =
        "Não é permitido copiar um documento eletrônico de entrada.";
    translation["inboundedocument.contextunsupported"] =
        "O documento eletrônico de entrada é compatível somente com contextos de Interface do usuário e SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "A referência de arquivo XML selecionada não é um arquivo XML válido. Verifique se o arquivo selecionado tem a extensão .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "A referência de arquivo PDF selecionada não é um arquivo PDF válido. Verifique se o arquivo selecionado tem a extensão .pdf.";
    translation["inboundedocument.invalidxml"] =
        "A Referência de arquivo XML selecionada não é um documento XML bem-formado.";
    translation["inboundedocument.convert.button"] = "Converter";
    translation["inboundedocument.convert.information"] =
        "A conversão desse documento eletrônico de entrada está em andamento.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "A conversão desse documento eletrônico de entrada já está em andamento.";
    translation["inboundedocument.cancel.button"] =
        "Cancelar documento eletrônico";
    translation["inboundedocument.cancel.confirmation"] =
        "Tem certeza de que deseja cancelar esse documento eletrônico de entrada?";
    translation["inboundedocument.cancel.failed"] =
        "Falha de cancelamento porque o status do registro do documento eletrônico é '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Erro durante o cancelamento. Verifique a Trilha de auditoria do documento eletrônico na subaba Documento eletrônico para obter detalhes.";
    translation["inboundedocument.cancel.complete"] =
        "O documento eletrônico foi cancelado.";
    translation["inboundedocument.preview.button"] = "Visualizar XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Essa conta não tem uma licença ativa para usar o Electronic Invoicing SuiteApp em vários países. Para converter esse documento eletrônico em uma transação, entre em contato com o administrador da conta para especificar um país no campo País do documento eletrônico para uso gratuito na página Informações da empresa.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Essa conta não tem uma licença ativa para usar o Electronic Invoicing SuiteApp em vários países. Para converter esse documento eletrônico em uma transação, entre em contato com o gerente de conta NetSuite para comprar uma licença.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Essa conta não tem uma licença ativa para usar o Electronic Invoicing SuiteApp em vários países. Para converter esse documento eletrônico em uma transação, configure o endereço de cobrança padrão do fornecedor selecionado.";
    translation["validationplugin.contextunsupported"] =
        "O Plug-in de validação do documento eletrônico de entrada é compatível somente com contextos de Interface do usuário e SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Implementação do Plug-in de validação do documento eletrônico de entrada";
    translation["validationplugin.pluginimplementationhelp"] =
        "Selecione uma implementação do Plug-in de validação do documento eletrônico de entrada.";
    translation["validationplugin.scriptbannermessage"] =
        "As validações de documentos eletrônicos de entrada devem ser implementações de plug-in personalizadas. Recrie os scripts de validação atuais como novas implementações de plug-in personalizadas do tipo “Plug-in de validação de entrada”.";
    translation["ei.conversion.defaulterror"] =
        "Erro durante a conversão. Verifique a Trilha de auditoria do documento eletrônico na subaba Documento eletrônico para obter detalhes.";
    translation["ei.conversion.inactivevendor"] =
        "Não foi possível converter esse documento eletrônico de entrada porque o fornecedor selecionado está inativo. O campo Status do documento eletrônico ainda não foi atualizado, e uma trilha de auditoria não foi criada. Desmarque a caixa Inativo no registro do fornecedor e, em seguida, tente converter o documento eletrônico novamente.";
    translation["ei.conversion.inactivecustomer"] =
        "Não foi possível converter esse documento eletrônico de entrada porque o cliente selecionado está inativo. O campo Status do documento eletrônico ainda não foi atualizado, e uma trilha de auditoria não foi criada. Desmarque a caixa Inativo no registro do cliente e, em seguida, tente converter o documento eletrônico novamente.";
    translation["ei.conversion.conversioncomplete"] =
        "O documento eletrônico foi convertido.";
    translation["ei.conversion.conversionlogbulk"] =
        "O documento eletrônico de entrada foi incluído na conversão em lote e convertido na transação com ID interno: {INTERNALID} de tipo: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "O documento eletrônico de entrada foi convertido na transação com ID interno: {INTERNALID} de tipo: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Processo de geração em lotes\nModelo de documento eletrônico usado: {TEMPLATENAME}\nEscopo do erro: {ERRORSCOPE}\nDetalhes do erro: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Modelo de documento eletrônico usado: {TEMPLATENAME}\nEscopo do erro: {ERRORSCOPE}\nDetalhes do erro: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Falha na análise. Marque Mapeamento de campo para documentos eletrônicos de entrada.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Falha na conversão.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Falha na validação.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Falha na conversão porque o status do registro do documento eletrônico de entrada é '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Os documentos eletrônicos de entrada com clientes inativos não são compatíveis com a conversão.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Os documentos eletrônicos de entrada com fornecedores inativos não são compatíveis com a conversão.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Os seguintes códigos de fornecedor: {ITEMLIST} não estão associados a nenhum registro de item.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Os seguintes nomes/códigos de fornecedor: {ITEMLIST} não estão associados a nenhum registro de item.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Os seguintes códigos de fornecedor: {ITEMLIST} estão associados a vários registros de item. Modifique os registros dos itens e verifique se os códigos de fornecedor são exclusivos para cada item dos fornecedores.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Os seguintes nomes/códigos de fornecedor: {ITEMLIST} estão associados a vários registros de item. Modifique os registros dos itens e verifique se o nome e os códigos do fornecedor são exclusivos para cada item dos fornecedores.";
    translation["ei.conversion.refnumnotfound"] =
        "Está faltando o número de referência necessário no documento eletrônico de entrada. Cancele esse documento eletrônico e envie outro que inclua um elemento XML relativo ao número de referência, mapeado para o campo tranid.";
    translation["ei.conversion.refnumexists"] =
        "Já existe uma fatura de fornecedor com esse número de referência. Cancele esse documento eletrônico e envie outro que inclua o valor de número de referência correto relativo ao elemento XML mapeado para o campo tranid.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Está faltando o campo vendorcode no modelo de documento eletrônico. Modifique o modelo do documento eletrônico ou selecione outro modelo que inclua o mapeamento do campo vendorcode.";
    translation["ei.conversion.novendorcodevalue"] =
        "Pelo menos um dos itens não tem código de fornecedor. Cancele esse documento eletrônico e envie outro que inclua o valor correto para o elemento XML mapeado para o campo de código do fornecedor.";
    translation["ei.conversion.vendornamenotfound"] =
        "Está faltando o campo vendorname no modelo de documento eletrônico. Modifique o modelo do documento eletrônico ou selecione outro modelo que inclua o mapeamento do campo vendorname.";
    translation["ei.conversion.novendornamevalue"] =
        "Pelo menos um dos itens não tem nome/código de fornecedor. Cancele esse documento eletrônico e envie outro que inclua o valor correto relativo ao elemento XML mapeado para o campo de nome/código do fornecedor.";
    translation["ei.conversion.sourcetransnotfound"] =
        "O registro ({TRANSTYPE}#{TRANSID}) não foi encontrado no sistema. Cancele esse documento eletrônico e envie outro que inclua o valor correto relativo ao elemento XML mapeado para o campo createdfrom.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "O registro ({TRANSTYPE}#{TRANSID}) foi atribuído a outra entidade. Selecione a entidade correta e converta esse documento eletrônico.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "O fornecedor não tem conta de despesas padrão, o que é necessário para converter faturas com despesas. Para continuar a conversão, defina um valor no campo Conta de despesas padrão no registro do fornecedor.";
    translation["ei.conversion.nolinktopo"] =
        "O documento eletrônico de entrada não tem nenhum item ou despesa incluídos no pedido de compra referenciado. Confira se o status do pedido de compra referenciado pode ser convertido. Caso afirmativo, cancele esse documento eletrônico e envie outro com o valor correto relativo ao elemento XML mapeado para o campo createdfrom.";
    translation["inbound.formtitle"] =
        "Converter documentos eletrônicos de entrada";
    translation["inbound.search"] = "Buscar";
    translation["inbound.convert"] = "Converter";
    translation["inbound.return"] = "Retornar aos critérios";
    translation["inbound.vendor"] = "Fornecedor";
    translation["inbound.datefrom"] = "Data de início da criação";
    translation["inbound.dateto"] = "Data da criação de término";
    translation["inbound.vendorhelp"] =
        "Selecione o fornecedor cujos documentos eletrônicos de entrada com falha serão incluídos no resultado da busca.";
    translation["inbound.datefromhelp"] =
        "Selecione uma data de início para definir o período no qual os documentos eletrônicos de entrada com falha serão incluídos no resultado da busca.";
    translation["inbound.datetohelp"] =
        "Selecione uma data de término para definir o período no qual os documentos eletrônicos de entrada com falha criados serão incluídos no resultado da busca.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filtros de busca de documentos eletrônicos de entrada com falha";
    translation["inbound.sublist.sublistname"] =
        "Resultados da busca de documentos eletrônicos de entrada com falha";
    translation["inbound.sublist.internalid"] = "ID interno";
    translation["inbound.sublist.vendor"] = "Fornecedor";
    translation["inbound.sublist.refnum"] = "Número de referência";
    translation["inbound.sublist.ponum"] = "Número do pedido de compra";
    translation["inbound.sublist.datecreated"] = "Data de criação";
    translation["inbound.sublist.edoctemplate"] =
        "Modelo do documento eletrônico";
    translation["inbound.msg.conversionongoing"] =
        "O documento eletrônico está sendo convertido no momento. Você receberá um e-mail quando o processo for concluído.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Não é possível fazer a busca com os critérios selecionados, pois a conversão do documento eletrônico de entrada já está em andamento para o intervalo de datas ({DATECREATED_FROM} - {DATECREATED_TO}). Altere seus critérios de busca ou tente novamente após converter o documento eletrônico.";
    translation["inbound.invaliddates"] =
        "A Data de início da criação não deve ser posterior à Data de término da criação. Altere as datas para que a Data de início da criação seja anterior à de término.";
    translation["inbound.configurefreecountry"] =
        "Essa conta não tem uma licença ativa para usar o Electronic Invoicing SuiteApp em vários países. Para converter documentos eletrônicos em lote, entre em contato com o administrador da conta para configurar o País do documento eletrônico para uso gratuito na página de informações da empresa.";
    translation["portlet.title"] = "Documentos eletrônicos";
    translation["portlet.outboundforgeneration"] =
        "Documentos eletrônicos de saída para geração";
    translation["portlet.outboundforsending"] =
        "Documentos eletrônicos de saída para envio";
    translation["portlet.outboundwitherrors"] =
        "Documentos eletrônicos de saída com erros";
    translation["portlet.outboundsendinglink"] =
        "Enviar documentos eletrônicos de saída com falha";
    translation["portlet.inboundforconversion"] =
        "Documentos eletrônicos de entrada para conversão";
    translation["portlet.inboundconvertfailed"] =
        "Converter documentos eletrônicos de entrada com falha";
    translation["portlet.inboundincomplete"] =
        "Documentos eletrônicos de entrada incompletos";
    translation["portlet.inbounduploadlink"] =
        "Carregar documento eletrônico de entrada";
    translation["portlet.outboundforcertification"] =
        "Documentos eletrônicos de saída para certificação";
    translation["portlet.outboundcertifiedforsending"] =
        "Documentos eletrônicos de saída para envio";
    translation["inbound.webservice.response.success"] =
        "O documento eletrônico de entrada com ID: {ID} foi criado com êxito.";
    translation["inbound.webservice.response.novendor"] =
        "Nenhum fornecedor está associado ao ID do web service: {IDENTIFIER}. Certifique-se de que o ID do web service correto seja usado.";
    translation["inbound.webservice.response.multiplevendor"] =
        "O documento eletrônico de entrada com ID: {ID} foi criado com êxito. No entanto, vários fornecedores estão associados ao ID do web service: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "O documento eletrônico de entrada está incompleto, pois não é possível determinar o modelo correto. Selecione um modelo no registro de documento eletrônico de entrada ou configure o XSD no registro de modelo de documento eletrônico para habilitar a seleção automática de modelos.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "O documento eletrônico de entrada está incompleto, pois não é possível determinar o fornecedor correto. Selecione um fornecedor no registro de documento eletrônico de entrada ou defina o ID do web service no registro de fornecedor associado.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Estão faltando as seguintes chaves: {KEYS}, que você deve fornecer na solicitação de web service.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "O corpo da solicitação de web service deve ser um objeto JSON ou uma matriz de objetos JSON usando o Tipo de conteúdo: 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Os seguintes destinatários do documento eletrônico não têm um endereço de e-mail em seus registros de contato: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Não há destinatários de documento eletrônico para essa transação. Para enviar documentos eletrônicos por e-mail, pelo menos um contato deverá ser adicionado à lista de destinatários de documento eletrônico.";
    translation["transaction.maxrecipientexceeded"] =
        "O número de destinatários de e-mail adicionados excedeu o limite. É possível adicionar um máximo de dez destinatários de e-mail.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Apenas os seguintes tipos de transação são permitidos:";
    translation["ei.prefs.formtitle"] =
        "Preferências de documentos eletrônicos";
    translation["ei.prefs.information.about.certify.skip"] =
        "A etapa de certificação é ignorada quando o método de envio não é definido ou aplicável para a transação.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Faturamento eletrônico automático";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Tipo de automação do documento eletrônico";
    translation["ei.prefs.text.option.comb.disabled"] = "Desabilitar";
    translation["ei.prefs.text.option.comb.gcs"] = "Gerar, certificar, enviar";
    translation["ei.prefs.text.option.comb.gc"] = "Gerar, certificar";
    translation["ei.prefs.text.option.comb.cs"] = "Certificar, enviar";
    translation["ei.prefs.btn.label.cancel"] = "Cancelar";
    translation["ei.prefs.btn.label.save"] = "Salvar";
    translation["ei.prefs.msg.confirm.save"] =
        "Deseja salvar as alterações às preferências do documento eletrônico?";
    translation["ei.prefs.msg.success.save"] =
        "Preferências do documento eletrônico salvas com êxito.";
    translation["ei.prefs.msg.failed.save"] =
        "Falha ao salvar as preferências do documento eletrônico.";
    translation["ei.prefs.insufficient.permission.details"] =
        "A permissão para acessar esta página é restrita. Para solicitar acesso, entre em contato com o administrador.";
    translation["ei.eip.msg.completed"] =
        "Processamento do documento eletrônico concluído.";
    translation["ei.eip.msg.failed"] =
        "Falha ao processar o documento eletrônico. Consulte Trilha de auditoria do documento eletrônico para obter mais detalhes.";
    translation["ei.eip.msg.processing"] =
        "O documento eletrônico está sendo processado.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "O documento eletrônico já está sendo processado.";
    translation["license.notinstalled"] =
        "O NetSuite SuiteApps License Client não está disponível na sua conta. Instale esse SuiteApp para acessar todos os recursos do Electronic Invoicing.";
    translation["outbound.formtitle"] =
        "Enviar documentos eletrônicos com falha";
    translation["outbound.search"] = "Buscar";
    translation["outbound.send"] = "Enviar";
    translation["outbound.return"] = "Retornar aos critérios";
    translation["outbound.customer"] = "Cliente";
    translation["outbound.vendor"] = "Fornecedor";
    translation["outbound.subsidiary"] = "Subsidiária";
    translation["outbound.type"] = "Tipo de transação";
    translation["outbound.datefrom"] = "Data de início da transação";
    translation["outbound.dateto"] = "Data de término da transação";
    translation["outbound.subshelp"] =
        "Selecione uma subsidiária para exibir somente as transações pertencentes a ela.";
    translation["outbound.custhelp"] =
        "Selecione um cliente para exibir somente as transações pertencentes a ele. Se nenhum cliente for selecionado, os resultados da busca exibirão todas as transações pertencentes à subsidiária, independentemente do cliente.";
    translation["outbound.vendorhelp"] =
        "Selecione um fornecedor para exibir somente as transações pertencentes a ele. Se nenhum fornecedor for selecionado, os resultados da busca exibirão todas as transações pertencentes à subsidiária, independentemente do fornecedor.";
    translation["outbound.entitytypehelp"] =
        "Escolha o tipo de entidade Cliente ou Fornecedor. Isso habilita a lista suspensa correspondente abaixo.";
    translation["outbound.typehelp"] =
        "Selecione um ou mais tipos de transação para cada documento eletrônico que deseja enviar. Para selecionar vários tipos de transação, mantenha pressionada a tecla Ctrl enquanto seleciona cada tipo de transação.<br /><br />Se nenhum tipo de transação for selecionado, os resultados da busca exibirão todos os documentos eletrônicos prontos para envio, independentemente do tipo da transação.";
    translation["outbound.datefromhelp"] =
        "Para visualizar uma lista das transações criadas em um intervalo de datas específico, selecione uma data para definir o início do intervalo.";
    translation["outbound.datetohelp"] =
        "Para visualizar uma lista das transações criadas em um intervalo de datas específico, selecione uma data para definir o fim do intervalo.";
    translation["outbound.entityfieldgroup"] = "Filtros de busca de entidade";
    translation["outbound.filtersfieldgroup"] = "Filtros de busca de transação";
    translation["outbound.entitytypeinlinehelp"] =
        "Selecionar tipo de entidade:";
    translation["outbound.invalidtypetitle"] = "Tipos de transação inválidos";
    translation["outbound.invalidtype"] =
        "Os seguintes tipos de transação não são compatíveis no momento: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Os seguintes tipos de transação não são válidos para a entidade escolhida: {TRANSACTIONTYPES}. Selecione os tipos de transação adequados para a entidade escolhida.";
    translation["outbound.invaliddates"] =
        "A Data de início da transação não deve ser posterior à Data de término da transação. Altere as datas para que a Data de início da transação seja anterior à de término.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Não é possível fazer a busca com os critérios selecionados, pois o envio do documento eletrônico já está em andamento para transações no intervalo de datas ({TRANDATE_FROM} - {TRANDATE_TO}) para a subsidiária ({SUBSIDIARY}). Altere seus critérios de busca ou tente novamente após enviar o documento eletrônico.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Não é possível fazer a busca com os critérios selecionados, pois o envio do documento eletrônico já está em andamento para transações no intervalo de datas ({TRANDATE_FROM} - {TRANDATE_TO}). Altere seus critérios de busca ou tente novamente após enviar o documento eletrônico.";
    translation["outbound.sublist.trannum"] = "Número da transação";
    translation["outbound.sublist.trantype"] = "Tipo de transação";
    translation["outbound.sublist.customer"] = "Cliente";
    translation["outbound.sublist.vendor"] = "Fornecedor";
    translation["outbound.sublist.subsidiary"] = "Subsidiária";
    translation["outbound.sublist.trandate"] = "Data da transação";
    translation["outbound.sublist.memo"] = "Nota";
    translation["outbound.sublist.template"] = "Modelo";
    translation["outbound.sublist.sendingmethod"] = "Método de envio";
    translation["outbound.sublist.sublistname"] =
        "Resultados de documentos eletrônicos de saída com falha a serem enviados";
    translation["outbound.msg.sendingongoing"] =
        "O documento eletrônico está sendo enviado no momento. Você receberá um e-mail quando o processo for concluído.";
    translation["outbound.configurefreecountry"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países. Para enviar documentos eletrônicos em lote, entre em contato com o administrador da sua conta. Ele configurará o País do documento eletrônico para uso gratuito na página de informações da empresa.";
    translation["outbound.entitysend"] = "Enviar para entidade";
    translation["outbound.certifysend"] = "Enviar para certificação";
    translation["outbound.sendingtypehelp"] =
        "Selecione Enviar para entidade ou Enviar para certificação. A opção selecionada listará as transações correspondentes para envio.";
    translation["customer.noemail"] =
        "Não há endereço de e-mail para esse cliente. Digite um endereço válido para o registro do cliente a fim de permitir o envio de documentos eletrônicos por e-mail.";
    translation["customer.contactnoemail"] =
        "Os seguintes destinatários do documento eletrônico não têm um endereço de e-mail em seus registros de contato: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Não há destinatários de documento eletrônico para esse cliente. Para enviar documentos eletrônicos por e-mail para esse cliente, pelo menos um contato deve ser adicionado à lista de destinatários.";
    translation["customer.arrayrequired"] =
        "A matriz Contatos é necessária para validação.";
    translation["customer.parameternotarray"] =
        "O parâmetro Contatos não é uma matriz.";
    translation["customer.maxrecipientexceeded"] =
        "Você ultrapassou o limite máximo de destinatários de e-mail. Selecione até dez destinatários de e-mail.";
    translation["vendor.noemail"] =
        "Não há endereço de e-mail para esse fornecedor. Digite um endereço de e-mail válido para o registro do fornecedor a fim de permitir o envio de documentos eletrônicos por e-mail.";
    translation["vendor.contactnoemail"] =
        "Os seguintes destinatários do documento eletrônico não têm um endereço de e-mail em seus registros de contato: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Não há destinatários de documento eletrônico para esse fornecedor. Para enviar documentos eletrônicos por e-mail para esse fornecedor pelo menos um contato deve ser adicionado à lista de destinatários.";
    translation["vendor.maxrecipientexceeded"] =
        "Você ultrapassou o limite máximo de destinatários de e-mail. Selecione até dez destinatários de e-mail.";
    translation["vendor.nosenders"] =
        "Não há remetente de endereço de e-mail para esse fornecedor. Para receber documentos eletrônicos desse fornecedor por e-mail, insira pelo menos um endereço na lista Remetente de e-mail do documento eletrônico do fornecedor.";
    translation["vendor.existingsender"] =
        "Esse endereço de e-mail do remetente já existe.";
    translation["vendor.existingdomain"] =
        "O domínio de e-mail do remetente já está sendo usado por outro fornecedor.";
    translation["vendor.existingidentifier"] =
        "O ID de web service já está sendo usado por outro fornecedor. Insira outro ID de web service.";
    translation["customeremailrecipient.contextunsupported"] =
        "O Destinatário de e-mail do documento eletrônico do cliente é compatível apenas com os seguintes contextos: Interface do usuário, CSV, SuiteScript e Web services.";
    translation["vendoremailrecipient.contextunsupported"] =
        "O Destinatário de e-mail do documento eletrônico do fornecedor é compatível apenas com os seguintes contextos: Interface do usuário, CSV, SuiteScript e Web services.";
    translation["vendoremailsender.contextunsupported"] =
        "O Remetente de e-mail do documento eletrônico do fornecedor é compatível apenas com os seguintes contextos: Interface do usuário, CSV, SuiteScript e Web services.";
    translation["template.incorrectregex"] =
        "O campo REGEX contém uma expressão regular incorreta. A sintaxe adequada precisa ser usada.";
    translation["template.invalidjson"] =
        "Você não forneceu um formato JSON bem-formado no campo Modelo para documentos eletrônicos de saída. Clique em OK para continuar ou em Cancelar para permanecer na página atual.";
    translation["template.invalidxml"] =
        "O modelo XML contém erros. O formato XML precisa estar bem-formado.";
    translation["template.templaterequired"] =
        "Está faltando o conteúdo do modelo para o tipo de transação de saída selecionado. Forneça um modelo JSON ou XML válido no campo Documentos eletrônicos de saída e, em seguida, tente novamente.";
    translation["template.mappingrequired"] =
        "Você selecionou um tipo de transação de entrada, mas está faltando o conteúdo JSON do mapeamento do campo. Insira o conteúdo JSON no campo Mapeamento de campo para documentos eletrônicos de entrada.";
    translation["template.templateorjsonrequired"] =
        "Estão faltando valores de campo. Para a transação de saída, especifique um conteúdo JSON ou XML válido no campo Modelo para documentos eletrônicos de saída. Para a transação de entrada, especifique o conteúdo JSON em Mapeamento de campo para documentos eletrônicos de entrada.";
    translation["template.invalidxsdfile"] =
        "O arquivo XSD selecionado não é um arquivo XSD válido. Verifique se o arquivo selecionado tem a extensão .xsd.";
    translation["template.contextunsupported"] =
        "O Modelo de documento eletrônico é compatível somente com contextos de Interface do usuário e SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Selecione um ou mais tipos de transação para que recebam suporte desse modelo. Para selecionar vários tipos de transação, mantenha pressionada a tecla Ctrl ao selecionar os tipos de transação.<br /><br />Se não é possível selecionar os tipos de transação, isso significa que o modelo já foi atribuído a um ou mais registros de transação do mesmo tipo. Para habilitar a seleção do tipo de transação, remova o modelo do registro de transação.<br /><br />Também é possível atribuir esse modelo a documentos eletrônicos de entrada; esse procedimento desabilitará o campo Tipo da transação.";
    translation["template.eistatus"] =
        "Edição restrita de transações com status de documento eletrônico";
    translation["template.supportedeistatusfieldhelp"] =
        "As transações com o status do documento eletrônico que você selecionou não serão editáveis quando esse modelo estiver associado a elas. É possível selecionar vários status de documento eletrônico.";
    translation["template.invalidschemaordependency"] =
        "O esquema XML é um XSD estruturado incorretamente, ou não é possível encontrar o esquema dependente.";
    translation["template.xmldoesnotconformtoschema"] =
        "O XML do modelo não está em conformidade com o XSD ou o esquema fornecido.";
    translation["template.xmldomexception"] =
        "A string XML de entrada está malformada.";
    translation["template.missingreqdargument"] =
        "Está faltando o XSD para validação de saída.";
    translation["template.xsdvalidationexception"] =
        "Ocorreu uma exceção desconhecida durante a validação de XSD.";
    translation["template.xsdmissingdependencyfolder"] =
        "A pasta do esquema XSD é inválida ou está faltando.";
    translation["invoice.generatebtn"] = "Gerar documento eletrônico";
    translation["invoice.sendbtn"] = "Enviar documento eletrônico";
    translation["invoice.sendcertifybtn"] = "Certificar documento eletrônico";
    translation["invoice.eipbtn"] = "Processar documento eletrônico";
    translation["invoice.loguntagged"] =
        "O modelo do documento eletrônico foi removido. A transação está desmarcada para a geração de documentos eletrônicos.";
    translation["invoice.logforgenerate"] =
        "A transação está pronta para a geração de documentos eletrônicos.";
    translation["invoice.invalidtemplatesub"] =
        "A subsidiária da transação não é válida para o modelo de documento eletrônico selecionado. Selecione outro modelo de documento eletrônico.";
    translation["invoice.templateremovalerror"] =
        "Não é permitido remover o modelo de documento eletrônico enviado.";
    translation["ei.sending.currentlysending"] =
        "O documento eletrônico está sendo enviado no momento. Isso pode levar alguns minutos. Não interrompa o processo clicando no botão Enviar documento eletrônico novamente. Depois que o documento eletrônico for enviado, a página será recarregada.";
    translation["ei.sending.notready"] =
        "Este documento eletrônico não está pronto para envio. Primeiro, clique em Gerar documento eletrônico para realizar essa ação.";
    translation["ei.sending.alreadysent"] = "Essa transação já foi enviada.";
    translation["ei.sending.norecipients"] =
        "Não é possível enviar o documento eletrônico porque o cliente não tem destinatários. Para enviar esse documento eletrônico por e-mail, os destinatários deverão ser selecionados no registro de clientes.";
    translation["ei.sending.indivcustnoemail"] =
        "Não é possível enviar o documento eletrônico porque o cliente não tem endereço de e-mail. Para enviar esse documento eletrônico por e-mail, um endereço de e-mail deverá ser fornecido no registro de clientes.";
    translation["ei.sending.norecipients.vendor"] =
        "Não é possível enviar o documento eletrônico porque o fornecedor não tem destinatários. Para enviar esse documento eletrônico por e-mail, os destinatários deverão ser selecionados no registro de fornecedores.";
    translation["ei.sending.indivvendnoemail"] =
        "Não é possível enviar o documento eletrônico porque o fornecedor não tem endereço de e-mail. Para enviar esse documento eletrônico por e-mail, um endereço de e-mail deverá ser fornecido no registro de fornecedor.";
    translation["ei.sending.invalidmethod"] =
        "Selecione um método de envio válido para {TYPE} #{INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Remetente: {SENDER}\nDestinatários: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "O remetente do documento eletrônico ({EMPLOYEENAME}) não tem endereço de e-mail. Digite um endereço de e-mail válido no registro do funcionário.";
    translation["ei.sending.recipientnoemail"] =
        "Um ou mais destinatários do documento eletrônico associado a essa transação não têm endereços de e-mail. Verifique se os destinatários desse cliente têm endereços de e-mail válidos.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Um ou mais destinatários do documento eletrônico associado a essa transação não têm endereços de e-mail. Verifique se os destinatários desse fornecedor têm endereços de e-mail válidos.";
    translation["ei.sending.defaulterror"] =
        "Erro durante o envio do documento eletrônico. Verifique a Trilha de auditoria do documento eletrônico na subaba Documento eletrônico para obter detalhes.";
    translation["ei.sending.inactivecustomer"] =
        "Não foi possível enviar o documento eletrônico para essa transação porque o cliente selecionado está inativo. O campo Status do documento eletrônico ainda não foi atualizado, e uma trilha de auditoria não foi criada. Desmarque a caixa Inativo no registro do cliente e, em seguida, tente reenviar o documento eletrônico.";
    translation["ei.sending.inactivevendor"] =
        "Não foi possível enviar o documento eletrônico para essa transação porque o fornecedor selecionado está inativo. O campo Status do documento eletrônico ainda não foi atualizado, e uma trilha de auditoria não foi criada. Desmarque a caixa Inativo no registro do fornecedor e, em seguida, tente reenviar o documento eletrônico.";
    translation["ei.sending.msg.processcomplete"] =
        "O documento eletrônico foi enviado.";
    translation["ei.sending.configurefreecountry"] =
        "Sua conta deve ter uma licença ativa para usar o Electronic Invoicing para vários países. Se deseja enviar documentos eletrônicos em lote para um único país, selecione uma opção no campo País do documento eletrônico para uso gratuito na página Informações da empresa.";
    translation["ei.sending.inactivecustomer.manager"] =
        "As transações com clientes inativos não são compatíveis com o documento eletrônico.";
    translation["ei.sending.inactivevendor.manager"] =
        "As transações com fornecedores inativos não são compatíveis com o documento eletrônico.";
    translation["ei.sending.certification.defaulterror"] =
        "Erro durante a certificação do documento eletrônico. Verifique a Trilha de auditoria do documento eletrônico na subaba Documento eletrônico para obter detalhes.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "O documento eletrônico foi enviado para certificação.";
    translation["ei.generation.generationlogbulk"] =
        "O documento eletrônico foi gerado em lote usando o modelo '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "O documento eletrônico foi gerado usando o modelo '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "O documento eletrônico e o arquivo PDF foram gerados em lote, usando o modelo de documento eletrônico '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "O documento eletrônico e o arquivo PDF foram gerados usando o modelo '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "O documento eletrônico foi gerado em lote usando o modelo '{TEMPLATENAME}'. O arquivo PDF dessa transação gerado anteriormente foi excluído.";
    translation["ei.generation.generationremovedpdflog"] =
        "O documento eletrônico foi gerado usando o modelo '{TEMPLATENAME}'. O arquivo PDF dessa transação gerado anteriormente foi excluído.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Processo de geração em lotes\nModelo de documento eletrônico usado: {TEMPLATENAME}\nDetalhes do erro: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Modelo de documento eletrônico usado: {TEMPLATENAME}\nDetalhes do erro: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Erro durante a geração. Verifique a Trilha de auditoria do documento eletrônico na subaba Documento eletrônico para obter detalhes.";
    translation["ei.generation.inactivecustomer"] =
        "Não foi possível gerar um documento eletrônico para essa transação porque o cliente selecionado está inativo. O campo Status do documento eletrônico ainda não foi atualizado, e uma trilha de auditoria não foi criada. Desmarque a caixa Inativo no registro do cliente e, em seguida, tente gerar o documento eletrônico novamente.";
    translation["ei.generation.inactivevendor"] =
        "Não foi possível gerar um documento eletrônico para essa transação porque o fornecedor selecionado está inativo. O campo Status do documento eletrônico ainda não foi atualizado, e uma trilha de auditoria não foi criada. Desmarque a caixa Inativo no registro do fornecedor e, em seguida, tente gerar o documento eletrônico novamente.";
    translation["ei.generation.msg.processcomplete"] =
        "O documento eletrônico foi gerado.";
    translation["ei.generation.configurefreecountry"] =
        "Sua conta deve ter uma licença ativa para usar o Electronic Invoicing para vários países. Se deseja gerar documentos eletrônicos em lote para um único país, selecione uma opção no campo País do documento eletrônico para uso gratuito na página Informações da empresa.";
    translation["ei.generation.inactivecustomer.generator"] =
        "As transações com clientes inativos não são compatíveis com o documento eletrônico.";
    translation["ei.generation.inactivevendor.generator"] =
        "As transações com fornecedores inativos não são compatíveis com o documento eletrônico.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "O documento eletrônico foi gerado e assinado digitalmente com êxito.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Falha na geração porque o documento eletrônico resultante não é um XML ou JSON bem-formado.";
    translation["notify.batchownersubject"] =
        "Envio de documento eletrônico concluído";
    translation["notify.batchownerbody"] =
        "Olá, <br/><br/>Sua solicitação de envio de documentos eletrônicos foi concluída.<br/>{SENT} de {TOTAL} foram enviados. Veja o arquivo em anexo para obter detalhes. <br/><br/>Obrigado,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Documento eletrônico gerado para o pedido de compra nº {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Documento eletrônico gerado por {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Saudações! <br /><br />{MESSAGE}<br />Consulte o arquivo de documento eletrônico anexado.<br /><br />Obrigado,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Erro durante a geração do documento eletrônico";
    translation["notify.generationerrorbody"] =
        "Erros durante a geração do documento eletrônico.<br/>Consulte o arquivo anexado para visualizar a lista de transações e detalhes do erro.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Um documento eletrônico já foi enviado para essa transação. A geração de um novo documento eletrônico substituirá o documento eletrônico anterior. Tem certeza de que deseja gerar um novo documento eletrônico?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Não é permitido remover o modelo de documento eletrônico enviado.";
    translation["transaction.msg.generate.information"] =
        "A geração desse documento eletrônico está em andamento.";
    translation["transaction.msg.send.information"] =
        "O envio desse documento eletrônico está em andamento.";
    translation["transaction.msg.send.certify.information"] =
        "A certificação desse documento eletrônico está em andamento.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "A geração desse documento eletrônico já está em andamento.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "O envio desse documento eletrônico já está em andamento.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "A certificação desse documento eletrônico já está em andamento.";
    translation["transaction.msg.uncheckpdf"] =
        "Um arquivo PDF dessa transação foi criado durante a última geração de documento eletrônico. Se essa caixa for desmarcada, o arquivo PDF será excluído na próxima geração de documento eletrônico.";
    translation["transaction.msg.nofreecountry"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países. Para gerar o documento eletrônico dessa transação, entre em contato com o administrador da sua conta para especificar um país no campo País do documento eletrônico para uso gratuito na página Informações da empresa.";
    translation["transaction.msg.otherbillingcountry"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países. Para gerar um documento eletrônico para essa transação, entre em contato com o gerente de conta do NetSuite para comprar uma licença.";
    translation["transaction.msg.nobillingcountry"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países. Para gerar um documento eletrônico para essa transação, indique o endereço de cobrança dessa transação.";
    translation["transaction.msg.noshippingcountry"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países. Para gerar um documento eletrônico para essa transação, indique o endereço de expedição dessa transação.";
    translation["transaction.msg.nocustomercountry"] =
        "Esta conta não tem uma licença ativa para uso do Electronic Invoicing em vários países. Para gerar um documento eletrônico para essa transação, indique o endereço de cobrança padrão do cliente da transação.";
    translation["transaction.msg.blockededittransaction"] =
        "A edição da transação está bloqueada para o status de documento eletrônico atual. Consulte o modelo de documento fiscal eletrônico anexado.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "A alteração do valor do campo Tipo de conteúdo de XML para outro tipo removerá todos os validadores de XML. Tem certeza de que deseja alterar o tipo de conteúdo?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Somente os validadores do tipo de conteúdo XML podem ser adicionados.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Esse validador já está na lista.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Os Validadores de modelo do documento eletrônico são compatíveis somente com contextos de Interface do usuário e SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "O registro {DEFAULT_DOCUMENT_STANDARD} já existe. Não é possível criar um registro de pacote de documentos com o mesmo nome. Renomeie seu registro do pacote de documentos e tente novamente.";
    translation["standarddocument.default.editnotallowed"] =
        "Não é permitido editar o Nome nem a Descrição do registro {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.default.deletenotallowed"] =
        "Não é permitido excluir o registro {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.contextunsupported"] =
        "O Pacote de documentos eletrônicos é compatível somente com contextos de Interface do usuário, Importação de CSV e SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "O registro de método de envio {DEFAULT_SENDING_METHOD_NAME} já existe. Não é possível criar um registro de método de envio com o mesmo nome. Renomeie seu registro do método de envio e tente novamente.";
    translation["sendingmethod.default.editnotallowed"] =
        "Não é permitido editar o registro do método de envio {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Não é permitido excluir o registro do método de envio {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "O campo Tipo da transação foi desabilitado porque o método de envio foi atribuído a um ou mais registros de transação. Para editar esse método de envio, remova-o do registro de transação para habilitar o campo Tipo da transação e tente novamente.";
    translation["sendingmethod.contextunsupported"] =
        "O Método de envio do documento eletrônico é compatível somente com contextos de Interface do usuário e SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Selecione um ou mais tipos de transação para receber suporte desse método de envio. Para selecionar vários tipos de transação, mantenha pressionada a tecla Ctrl ao selecionar os tipos de transação.<br /><br />Se não for possível selecionar um ou mais tipos de transação, isso significa que o método de envio já foi atribuído a um ou mais registros de transação do mesmo tipo. Primeiro, é preciso remover o método de envio do registro de transação para habilitar a seleção do tipo de transação.";
    translation["sendingmethod.pluginimplementation"] =
        "Implementação do plug-in de método de envio de documentos eletrônicos";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Selecione uma implementação do Plug-in de método de envio";
    translation["sendingmethod.scriptbannermessage"] =
        "Os métodos de envio devem ser implementações de plug-in personalizadas. Recrie os scripts de método de envio atuais como novas implementações de plug-in personalizadas do tipo “Plug-in de envio”.";
    translation["customdatasource.pluginimplementation"] =
        "Implementação de plug-in de fonte de dados personalizada";
    translation["customdatasource.pluginimplementationhelp"] =
        "Selecione a implementação do plug-in de fonte de dados personalizada";
    translation["digitalsignature.pluginimplementation"] =
        "Implementação de plug-in de assinatura digital";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Selecione uma implementação de plug-in. Esse campo será obrigatório se você desejar assinar digitalmente documentos eletrônicos.";
    translation["digitalsignature.identifierlabel"] =
        "Este documento eletrônico está assinado digitalmente";
    translation["digitalsignature.successlog"] =
        "O documento eletrônico gerado está assinado digitalmente.";
    translation["digitalsignature.failurelog"] =
        "O documento eletrônico gerado não está assinado digitalmente.";
    translation["digitalsignature.pluginfailedmessage"] =
        "A implementação de plug-in de assinatura digital retornou um status de falha.";
    translation["digitalsignature.plugininvalidresult"] =
        "O resultado retornado da implementação de plug-in de assinatura digital não é válido.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Implementação de plug-in de fonte de dados personalizada";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Selecione a implementação do plug-in de fonte de dados personalizada.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "O resultado da implementação do plug-in Fonte de dados personalizada de entrada é inválido.";
    translation["outboundvalidation.pluginimplementation"] =
        "Implementação de plug-in de validação de saída";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Para validar documentos eletrônicos de saída, selecione uma implementação de plug-in de validação.";
    translation["outboundvalidation.successlog"] =
        "Validação de saída bem-sucedida.";
    translation["outboundvalidation.failurelog"] =
        "Falha na validação de saída.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "A implementação de plug-in de validação de saída retornou um status de falha.";
    translation["outboundvalidation.plugininvalidresult"] =
        "O resultado da implementação de plug-in de validação de saída é inválido.";
    translation["template.msg.cannotedittransactiontype"] =
        "O campo Tipo da transação foi desabilitado porque esse modelo já está atribuído a um ou mais registros de transação. Para editar esse modelo, remova-o do registro de transação para habilitar o campo Tipo da transação e tente novamente. Também é possível atribuir esse modelo a documentos eletrônicos de entrada; esse procedimento desabilitará o campo Tipo da transação.";
    translation["template.msg.forcetocopymessage"] =
        "Não é possível editar o modelo de documento eletrônico padrão. Copie-o usando a opção Fazer cópia de Ações, ou crie um novo.";
    translation["template.msg.warningoneditmessage"] =
        "Este é um modelo de documento eletrônico padrão. Todas as alterações feitas nele serão perdidas ou substituídas quando o SuiteApp for atualizado.";
    translation["email.batchownernotification.subject"] =
        "Envio de documento eletrônico concluído";
    translation["email.batchownernotification.body"] =
        "Olá, <br/><br/>Seus documentos eletrônicos foram enviados.<br/>{SENT} de {TOTAL} foram enviados. Confira o arquivo em anexo para obter detalhes. <br/><br/>Obrigado,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Conversão de documento eletrônico concluída";
    translation["email.batchownerconvertnotification.body"] =
        "Olá, <br/><br/>Seus documentos eletrônicos foram convertidos.<br/>{CONVERTED} de {TOTAL} foram convertidos. Confira o arquivo em anexo para obter detalhes. <br/><br/>Obrigado,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Documento eletrônico gerado para o pedido de compra nº {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Documento eletrônico de {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Documento eletrônico gerado para pedido de compra nº {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Saudações! <br /><br />O documento eletrônico para o pedido de compra nº {PONUM} foi gerado.<br />Consulte o arquivo de documento eletrônico anexado para obter detalhes.<br /><br />Obrigado,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Saudações! <br /><br />O documento eletrônico para {TYPE} nº {TRANID} foi gerado.<br />Consulte o arquivo de documento eletrônico anexado para obter detalhes.<br /><br />Obrigado,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Erro durante a geração do documento eletrônico";
    translation["email.generationerrornotification.body"] =
        "Erros durante a geração do documento eletrônico.<br/>Consulte o arquivo anexado para visualizar a lista de transações e detalhes do erro.";
    translation["email.sendingerrornotification.subject"] =
        "Erro durante o envio do documento eletrônico";
    translation["email.sendingerrornotification.body"] =
        "Erros durante o envio do documento eletrônico.<br/>Consulte o arquivo anexado para visualizar a lista de transações e detalhes do erro.";
    translation["email.webserviceerror.subject"] =
        "Notificação de web service do documento eletrônico de entrada";
    translation["email.webserviceerror.body"] =
        "<p>Olá,</p><p>Houve erros no processamento do documento eletrônico de entrada usando o web service.<br/>Consulte os detalhes a seguir.</p>{DETAIL_TABLE}<p>Obrigado,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Número da transação";

    return translation;
});
