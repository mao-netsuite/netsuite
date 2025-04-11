define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Сведения";
    translation["email.attachment.collabel.transactiontype"] = "Тип операции";
    translation["email.attachment.collabel.internalid"] = "Внутренний ИД";
    translation["email.attachment.collabel.vendor"] = "Поставщик";
    translation["email.conversionerrornotification.subject"] =
        "Ошибка при преобразовании входящего электронного документа";
    translation["email.conversionerrornotification.body"] =
        "Во время преобразования входящего электронного документа возникли ошибки.<br/>Список операций с ошибками и сведения об ошибках см. во вложенном файле.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Примечание. Если необходимо, чтобы вместо администратора учетной записи уведомления получал другой пользователь, введите адрес эл. почты пользователя в поле &quot;Получатель уведомлений об электронных документах&quot; в записи родительского филиала.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ИД входящего электронного документа";
    translation["email.table.collabel.details"] = "Сведения";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Ошибка при проверке лицензии учетной записи";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран.</br>Для использования массовой обработки электронных документов настройте поле &quot;Страна бесплатной отправки электронных документов&quot; на странице данных компании.";
    translation["inboundedocument.logforconversion"] =
        "Входящий электронный документ готов к преобразованию.";
    translation["inboundedocument.logincomplete"] =
        "Входящий электронный документ не завершен. Не выбрано: {FIELD}.";
    translation["inboundedocument.deletenotallowed"] =
        "Удаление входящего электронного документа не разрешено.";
    translation["inboundedocument.copynotallowed"] =
        "Копирование входящего электронного документа не разрешено.";
    translation["inboundedocument.contextunsupported"] =
        "Входящий электронный документ поддерживает только контексты &quot;Интерфейс&quot; и &quot;SuiteScript&quot;.";
    translation["inboundedocument.invalidxmlfile"] =
        "Выбранный справочный файл XML не является допустимым файлом XML. Убедитесь, что выбранный файл имеет расширение .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Выбранный справочный файл PDF не является допустимым файлом PDF. Убедитесь, что выбранный файл имеет расширение .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Выбранный справочный файл XML не является правильно сформированным файлом XML.";
    translation["inboundedocument.convert.button"] = "Преобразовать";
    translation["inboundedocument.convert.information"] =
        "Выполняется преобразование этого входящего электронного документа.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Преобразование этого входящего электронного документа уже выполняется.";
    translation["inboundedocument.cancel.button"] =
        "Аннулировать электронный документ";
    translation["inboundedocument.cancel.confirmation"] =
        "Действительно отменить этот входящий электронный документ?";
    translation["inboundedocument.cancel.failed"] =
        "Сбой аннулирования, так как статус входящего электронного документа — '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Во время отмены произошла ошибка. Подробную информацию см. на субвкладке &quot;Журнал аудита электронных документов&quot;.";
    translation["inboundedocument.cancel.complete"] =
        "Электронный документ отменен.";
    translation["inboundedocument.preview.button"] = "Просмотреть XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "В этой учетной записи отсутствует лицензия для использования Electronic Invoicing SuiteApp для нескольких стран. Для преобразования этого электронного документа в операцию обратитесь к администратору учетной записи с просьбой указать страну в поле &quot;Страна для бесплатного использования электронных документов &quot; на странице данных компании.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "В этой учетной записи отсутствует лицензия для использования Electronic Invoicing SuiteApp для нескольких стран. Для преобразования этого электронного документа в операцию обратитесь к менеджеру учетной записи NetSuite для приобретения лицензии.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "В этой учетной записи отсутствует лицензия для использования Electronic Invoicing SuiteApp для нескольких стран. Для преобразования этого электронного документа в операцию настройте адрес выставления счетов по умолчанию для выбранного поставщика.";
    translation["validationplugin.contextunsupported"] =
        "Подключаемый модуль проверки входящих электронных документов поддерживает только контексты &quot;Интерфейс&quot; и &quot;SuiteScript&quot;.";
    translation["validationplugin.pluginimplementation"] =
        "Реализация подключаемого модуля проверки входящих электронных документов";
    translation["validationplugin.pluginimplementationhelp"] =
        "Выберите реализацию подключаемого модуля проверки входящих электронных документов.";
    translation["validationplugin.scriptbannermessage"] =
        "Для проверки входящих электронных документов нужно использовать пользовательские реализации подключаемых модулей. Заново создайте существующие сценарии проверки в качестве новых пользовательских реализаций подключаемых модулей типа &quot;Подключаемый модуль проверки входящих документов&quot;";
    translation["ei.conversion.defaulterror"] =
        "Во время преобразования произошла ошибка. Подробную информацию см. на субвкладке &quot;Журнал аудита электронных документов&quot;.";
    translation["ei.conversion.inactivevendor"] =
        "Не удается преобразовать этот входящий электронный документ, так как выбранный поставщик неактивен. Поле &quot;Статус электронного документа&quot; не было обновлено, журнал аудита не был создан. Снимите флажок &quot;Неактивен&quot; в записи поставщика и попробуйте преобразовать электронный документ еще раз.";
    translation["ei.conversion.inactivecustomer"] =
        "Не удается преобразовать этот входящий электронный документ, так как выбранный клиент неактивен. Поле &quot;Статус электронного документа&quot; не было обновлено, журнал аудита не был создан. Снимите флажок &quot;Неактивен&quot; в записи клиента и попробуйте преобразовать электронный документ еще раз.";
    translation["ei.conversion.conversioncomplete"] =
        "Электронный документ преобразован.";
    translation["ei.conversion.conversionlogbulk"] =
        "Входящий электронный документ включен в массовое преобразование и преобразован в операцию с внутренним ИД: {INTERNALID} типа: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "Входящий электронный документ преобразован в операцию с внутренним ИД: {INTERNALID} типа: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Процесс массового преобразования\nИспользуемый шаблон электронного документа: {TEMPLATENAME}\nКонтекст ошибки: {ERRORSCOPE}\nСведения об ошибке: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Используемый шаблон электронного документа: {TEMPLATENAME}\nКонтекст ошибки: {ERRORSCOPE}\nСведения об ошибке: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Сбой разбора. Проверьте сопоставление полей для входящих электронных документов.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Сбой преобразования.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Сбой проверки.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Сбой преобразования, так как статус входящего электронного документа — '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Преобразование входящих электронных документов с неактивными клиентами не поддерживается.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Преобразование входящих электронных документов с неактивными поставщиками не поддерживается.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Коды следующих поставщиков: {ITEMLIST} не связаны ни с одной записью товара.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Названия/коды следующих поставщиков: {ITEMLIST} не связаны ни с одной записью товара.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Коды следующих поставщиков: {ITEMLIST} связаны с несколькими записями товара. Измените записи товара и убедитесь, что коды поставщиков являются уникальными для каждого товара у поставщика.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Названия/коды следующих поставщиков: {ITEMLIST} связаны с несколькими записями товара. Измените записи товара и убедитесь, что названия/коды поставщиков являются уникальными для каждого товара у поставщика.";
    translation["ei.conversion.refnumnotfound"] =
        "Во входящем документе отсутствует обязательный справочный номер. Отмените этот электронный документ и отправьте другой документ, включающий элемент XML со справочным номером, сопоставленный с полем ИД операции.";
    translation["ei.conversion.refnumexists"] =
        "Счет поставщика с таким справочным номером уже существует. Отмените этот электронный документ и отправьте другой документ, включающий правильное значение справочного номера в элементе XML, сопоставленном с полем ИД операции.";
    translation["ei.conversion.vendorcodenotfound"] =
        "В шаблоне электронного документа отсутствует поле кода поставщика. Измените шаблон электронного документа или выберите другой шаблон, включающий сопоставление поля кода поставщика.";
    translation["ei.conversion.novendorcodevalue"] =
        "По крайней мере у одного товара нет кода поставщика. Отмените этот электронный документ и отправьте другой документ, включающий правильное значение в элементе XML, сопоставленном с полем кода поставщика.";
    translation["ei.conversion.vendornamenotfound"] =
        "В шаблоне электронного документа отсутствует поле названия поставщика. Измените шаблон электронного документа или выберите другой шаблон, включающий сопоставление поля названия поставщика.";
    translation["ei.conversion.novendornamevalue"] =
        "По крайней мере у одного товара нет названия/кода поставщика. Отмените этот электронный документ и отправьте другой документ, включающий правильное значение в элементе XML, сопоставленном с полем названия/кода поставщика.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Запись ({TRANSTYPE} № {TRANSID}) не найдена в системе. Отмените этот электронный документ и отправьте другой документ, включающий правильное значение в элементе XML, сопоставленном с полем источника создания.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Запись ({TRANSTYPE} № {TRANSID}) назначена другому объекту. Выберите правильный объект и преобразуйте этот электронный документ.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "У поставщика не указан счет расходов по умолчанию, который необходим для преобразования входящих счетов с расходами. Чтобы продолжить преобразование, укажите значение в поле &quot;Счет расходов по умолчанию&quot; в записи поставщика.";
    translation["ei.conversion.nolinktopo"] =
        "Входящий электронный документ не содержит элементов или расходов, которые включены в связанный заказ на закупку. Проверьте статус связанного заказа на закупку (может ли он быть преобразован). Если он может быть преобразован, отмените этот электронный документ и отправьте другой электронный документ, включающий правильное значение в элементе XML, сопоставленном с полем источника создания.";
    translation["inbound.formtitle"] =
        "Преобразовать входящие электронные документы";
    translation["inbound.search"] = "Поиск";
    translation["inbound.convert"] = "Преобразовать";
    translation["inbound.return"] = "Вернуться к критериям";
    translation["inbound.vendor"] = "Поставщик";
    translation["inbound.datefrom"] = "Дата создания с";
    translation["inbound.dateto"] = "Дата создания по";
    translation["inbound.vendorhelp"] =
        "Выберите поставщика, чьи входящие электронные документы со сбоем нужно включить в результаты поиска.";
    translation["inbound.datefromhelp"] =
        "Выберите дату начала, чтобы задать период создания входящих электронных документов со сбоем, которые нужно включить в результаты поиска.";
    translation["inbound.datetohelp"] =
        "Выберите дату окончания, чтобы задать период создания входящих электронных документов со сбоем, которые нужно включить в результаты поиска.";
    translation["inbound.inboundedocfieldgroup"] =
        "Фильтры поиска входящих электронных документов со сбоем";
    translation["inbound.sublist.sublistname"] =
        "Результаты поиска входящих электронных документов со сбоем";
    translation["inbound.sublist.internalid"] = "Внутренний ИД";
    translation["inbound.sublist.vendor"] = "Поставщик";
    translation["inbound.sublist.refnum"] = "Справочный номер";
    translation["inbound.sublist.ponum"] = "Номер заказа на закупку";
    translation["inbound.sublist.datecreated"] = "Дата создания";
    translation["inbound.sublist.edoctemplate"] =
        "Шаблон электронного документа";
    translation["inbound.msg.conversionongoing"] =
        "Преобразование электронного документа. Вы получите электронное сообщение с уведомлением о завершении процесса.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Невозможно выполнить поиск, используя выбранные критерии, так как уже выполняется преобразование входящего электронного документа для диапазона дат ({DATECREATED_FROM} - {DATECREATED_TO}). Измените критерии поиска или повторите попытку после преобразования этого электронного документа.";
    translation["inbound.invaliddates"] =
        "Значение &quot;Дата создания с&quot; не должно быть позже значения &quot;Дата создания по&quot;. Измените даты, чтобы &quot;Дата создания с&quot; была раньше &quot;Даты создания по&quot;.";
    translation["inbound.configurefreecountry"] =
        "В этой учетной записи отсутствует лицензия для использования Electronic Invoicing SuiteApp для нескольких стран. Для использования массового преобразования электронных документов обратитесь к администратору учетной записи с просьбой настроить поле &quot;Страна бесплатной отправки электронных документов&quot; на странице данных компании.";
    translation["portlet.title"] = "Электронные документы";
    translation["portlet.outboundforgeneration"] =
        "Исходящие электронные документы для формирования";
    translation["portlet.outboundforsending"] =
        "Исходящие электронные документы для отправки";
    translation["portlet.outboundwitherrors"] =
        "Исходящие электронные документы с ошибками";
    translation["portlet.outboundsendinglink"] =
        "Исходящие электронные документы со сбоем отправки";
    translation["portlet.inboundforconversion"] =
        "Входящие электронные документы для преобразования";
    translation["portlet.inboundconvertfailed"] =
        "Входящие электронные документы со сбоем преобразования";
    translation["portlet.inboundincomplete"] =
        "Незавершенные входящие электронные документы";
    translation["portlet.inbounduploadlink"] =
        "Загрузить входящий электронный документ";
    translation["portlet.outboundforcertification"] =
        "Исходящие электронные документы для сертификации";
    translation["portlet.outboundcertifiedforsending"] =
        "Исходящие электронные документы для отправки";
    translation["inbound.webservice.response.success"] =
        "Входящий электронный документ c ИД: {ID} успешно создан.";
    translation["inbound.webservice.response.novendor"] =
        "С указанным идентификатором веб-сервиса не связан ни один поставщик: {IDENTIFIER}. Убедитесь, что используется правильный идентификатор веб-сервиса.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Входящий электронный документ с идентификатором: {ID} успешно создан. Однако со следующим идентификатором веб-сервиса связано несколько поставщиков: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Входящий электронный документ неполон, так как не удается определить правильный шаблон. Выберите шаблон в записи входящего электронного документа или настройте схему XSD в записи шаблона электронного документа, чтобы включить автовыбор шаблона.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Входящий электронный документ неполон, так как не удается определить правильного поставщика. Выберите поставщика в записи входящего электронного документа или задайте идентификатор веб-сервиса в соответствующей записи поставщика.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Следующие ключи отсутствуют: {KEYS}, их необходимо указать в запросе веб-сервиса.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Телом запроса веб-сервиса должен быть объект JSON или массив объектов JSON с использованием параметра Content-Type: 'application/json'.";
    translation["transaction.contactnoemail"] =
        "У следующих получателей электронных документов в контактных записях нет адреса эл. почты: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Для этой операции нет получателей электронных документов. Чтобы отправить электронные документы по эл. почте, необходимо добавить хотя бы один контакт в список получателей электронных документов.";
    translation["transaction.maxrecipientexceeded"] =
        "Количество добавленных получателей электронной почты превышает максимально допустимое. Можно добавить не более 10 получателей.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Обрабатываются только следующие типы операций:";
    translation["ei.prefs.formtitle"] = "Параметры электронных документов";
    translation["ei.prefs.information.about.certify.skip"] =
        "Удостоверьтесь, что шаг пропущен, если метод отправки сертификата не определен или не применим для транзакции.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Автоматическое выставление электронных счетов-фактур";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Тип автоматизации электронных документов";
    translation["ei.prefs.text.option.comb.disabled"] = "Отключить";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Создать, сертифицировать, отправить";
    translation["ei.prefs.text.option.comb.gc"] = "Создать, сертифицировать";
    translation["ei.prefs.text.option.comb.cs"] = "Сертифицировать, отправить";
    translation["ei.prefs.btn.label.cancel"] = "Отмена";
    translation["ei.prefs.btn.label.save"] = "Сохранить";
    translation["ei.prefs.msg.confirm.save"] =
        "Сохранить изменения в параметрах электронных документов?";
    translation["ei.prefs.msg.success.save"] =
        "Параметры электронных документов сохранены.";
    translation["ei.prefs.msg.failed.save"] =
        "Сбой при сохранении параметров электронных документов.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Доступ к этой странице ограничен. Чтобы запросить доступ, обратитесь к администратору.";
    translation["ei.eip.msg.completed"] =
        "Обработка электронного документа завершена.";
    translation["ei.eip.msg.failed"] =
        "Сбой при обработке электронного документа. Подробности см. в журнале аудита электронных документов.";
    translation["ei.eip.msg.processing"] =
        "Выполняется обработка электронного документа.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Обработка электронного документа уже выполняется.";
    translation["license.notinstalled"] =
        "Пакет NetSuite SuiteApps License Client недоступен в вашей учетной записи. Для получения доступа к функциям выставления электронных счетов установите это приложение SuiteApp.";
    translation["outbound.formtitle"] =
        "Электронные документы со сбоем отправки";
    translation["outbound.search"] = "Поиск";
    translation["outbound.send"] = "Отправить";
    translation["outbound.return"] = "Вернуться к критериям";
    translation["outbound.customer"] = "Клиент";
    translation["outbound.vendor"] = "Поставщик";
    translation["outbound.subsidiary"] = "Филиал";
    translation["outbound.type"] = "Тип операции";
    translation["outbound.datefrom"] = "Дата операции с";
    translation["outbound.dateto"] = "Дата операции по";
    translation["outbound.subshelp"] =
        "Выберите филиал, чтобы отображать только операции, относящиеся к этому филиалу.";
    translation["outbound.custhelp"] =
        "Выберите клиента, чтобы отображать только операции, относящиеся к этому клиенту. Если не выбрано ни одного клиента, результаты поиска будут включать все операции, относящиеся к этому филиалу, вне зависимости от клиента.";
    translation["outbound.vendorhelp"] =
        "Выберите поставщика, чтобы отображать только операции, относящиеся к этому поставщику. Если не выбрано ни одного поставщика, результаты поиска будут включать все операции, относящиеся к этому филиалу, вне зависимости от поставщика.";
    translation["outbound.entitytypehelp"] =
        "Выберите тип объекта: клиент или поставщик. При этом станут доступны поля со списками ниже.";
    translation["outbound.typehelp"] =
        "Выберите один или несколько типов операций для каждого электронного документа, который вы хотите отправить. Для выбора нескольких типов операций нажмите и удерживайте клавишу Ctrl во время выбора типов операций.<br /><br />Если тип операции не выбран, результаты поиска будут показывать все электронные документы, готовые к отправке, вне зависимости от типа операции.";
    translation["outbound.datefromhelp"] =
        "Для просмотра списка операций, созданных в определенном интервале дат, выберите дату для определения начала интервала дат.";
    translation["outbound.datetohelp"] =
        "Для просмотра списка операций, созданных в определенном интервале дат, выберите дату для определения окончания интервала дат.";
    translation["outbound.entityfieldgroup"] = "Фильтры поиска объектов";
    translation["outbound.filtersfieldgroup"] = "Фильтры поиска операций";
    translation["outbound.entitytypeinlinehelp"] = "Выберите тип объекта:";
    translation["outbound.invalidtypetitle"] = "Недопустимые типы операций";
    translation["outbound.invalidtype"] =
        "В настоящее время не поддерживаются следующие типы операций: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Следующие типы операций являются недопустимыми для выбранного объекта: {TRANSACTIONTYPES}. Выберите соответствующие типы операций для выбранного объекта.";
    translation["outbound.invaliddates"] =
        "Значение &quot;Дата операции с&quot; должно быть раньше значения &quot;Дата операции по&quot;. Измените даты, чтобы &quot;Дата операции с&quot; была раньше &quot;Даты операции по&quot;.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Невозможно выполнить поиск, используя выбранные критерии, так как отправка электронного документа уже выполняется для транзакций в диапазоне дат ({TRANDATE_FROM} - {TRANDATE_TO}) для филиала ({SUBSIDIARY}). Измените критерии поиска или повторите попытку после отправки этого электронного документа.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Невозможно выполнить поиск, используя выбранные критерии, так как отправка электронного документа уже выполняется для транзакций в диапазоне дат ({TRANDATE_FROM} - {TRANDATE_TO}). Измените критерии поиска или повторите попытку после отправки этого электронного документа.";
    translation["outbound.sublist.trannum"] = "Номер операции";
    translation["outbound.sublist.trantype"] = "Тип операции";
    translation["outbound.sublist.customer"] = "Клиент";
    translation["outbound.sublist.vendor"] = "Поставщик";
    translation["outbound.sublist.subsidiary"] = "Филиал";
    translation["outbound.sublist.trandate"] = "Дата операции";
    translation["outbound.sublist.memo"] = "Заметка";
    translation["outbound.sublist.template"] = "Шаблон";
    translation["outbound.sublist.sendingmethod"] = "Метод отправки";
    translation["outbound.sublist.sublistname"] =
        "Результаты для исходящих электронных документов для отправки, завершившейся сбоем";
    translation["outbound.msg.sendingongoing"] =
        "Отправка электронного документа. Вы получите электронное сообщение с уведомлением о завершении процесса.";
    translation["outbound.configurefreecountry"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран. Для использования массовой отправки электронных документов обратитесь к администратору учетной записи с просьбой настроить поле &quot;Страна бесплатной отправки электронных документов&quot; на странице данных компании.";
    translation["outbound.entitysend"] = "Отправить объекту";
    translation["outbound.certifysend"] = "Отправить на сертификацию";
    translation["outbound.sendingtypehelp"] =
        "Выберите &quot;Отправить объекту&quot; или &quot;Отправить на сертификацию&quot;. Будут перечислены соответствующие операции для отправки.";
    translation["customer.noemail"] =
        "Для этого клиента нет адреса эл. почты. Введите действительный адрес эл. почты в записи клиента, чтобы отправлять электронные документы по эл. почте.";
    translation["customer.contactnoemail"] =
        "У следующих получателей электронных документов в контактных записях нет адреса эл. почты: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Для этого клиента нет получателей электронных документов. Чтобы отправить электронные документы по эл. почте этому клиенту, необходимо добавить хотя бы один контакт в список получателей электронных документов.";
    translation["customer.arrayrequired"] =
        "Для проверки требуется множество контактов.";
    translation["customer.parameternotarray"] =
        "Параметр контактов не является множеством.";
    translation["customer.maxrecipientexceeded"] =
        "Превышено максимальное количество получателей эл. почты. Выберите не более 10 получателей.";
    translation["vendor.noemail"] =
        "Для этого поставщика нет адреса эл. почты. Введите действительный адрес эл. почты в записи поставщика, чтобы отправлять электронные документы по эл. почте.";
    translation["vendor.contactnoemail"] =
        "У следующих получателей электронных документов в контактных записях нет адреса эл. почты: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Для этого поставщика нет получателей электронных документов. Чтобы отправить электронные документы по эл. почте этому поставщику, необходимо добавить хотя бы один контакт в список получателей электронных документов.";
    translation["vendor.maxrecipientexceeded"] =
        "Превышено максимальное количество получателей эл. почты. Выберите не более 10 получателей.";
    translation["vendor.nosenders"] =
        "Для этого поставщика не указан отправитель эл. почты с электронными документами. Чтобы получать от этого поставщика электронные документы по эл. почте, укажите хотя бы один адрес эл. почты в списке &quot;Отправители эл. почты с электронными документами поставщиков&quot;.";
    translation["vendor.existingsender"] =
        "Адрес эл. почты отправителя уже существует.";
    translation["vendor.existingdomain"] =
        "Домен эл. почты отправителя уже используется для другого поставщика.";
    translation["vendor.existingidentifier"] =
        "Этот идентификатор веб-сервиса уже используется для другого поставщика. Введите другой идентификатор веб-сервиса.";
    translation["customeremailrecipient.contextunsupported"] =
        "Поле &quot;Получатели эл. почты с электронными документами клиентов&quot; поддерживает следующие контексты: интерфейс, CSV, SuiteScript и веб-сервисы.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Поле &quot;Получатели эл. почты с электронными документами поставщиков&quot; поддерживает следующие контексты: интерфейс, CSV, SuiteScript и веб-сервисы.";
    translation["vendoremailsender.contextunsupported"] =
        "Поле &quot;Отправители эл. почты с электронными документами поставщиков&quot; поддерживает следующие контексты: интерфейс, CSV, SuiteScript и веб-сервисы.";
    translation["template.incorrectregex"] =
        "Поле REGEX содержит неправильное регулярное выражение. Необходимо использовать правильный синтаксис.";
    translation["template.invalidjson"] =
        "Не указан корректно сформированный объект JSON в поле &quot;Шаблон для исходящих электронных документов&quot;. Нажмите &quot;ОК&quot;, чтобы продолжить, или &quot;Отмена&quot;, чтобы остаться на текущей странице.";
    translation["template.invalidxml"] =
        "В шаблоне XML содержатся ошибки. Формат языка XML должен быть сформирован правильно.";
    translation["template.templaterequired"] =
        "В шаблоне нет содержимого для выбранного типа исходящей операции. Укажите допустимое содержимое XML или JSON в поле &quot;Исходящие электронные документы&quot;, а затем повторите попытку.";
    translation["template.mappingrequired"] =
        "Был выбран тип входящей операции, однако отсутствует содержимое JSON для сопоставления полей. Введите содержимое JSON в поле &quot;Сопоставление полей для входящих электронных документов&quot;.";
    translation["template.templateorjsonrequired"] =
        "Отсутствуют значения полей. Для исходящей операции укажите допустимое содержимое XML или JSON в поле &quot;Шаблон для исходящих электронных документов&quot;. Для входящей операции укажите содержимое JSON в поле &quot;Сопоставление полей для входящих электронных документов&quot;.";
    translation["template.invalidxsdfile"] =
        "Выбранный файл XSD не является допустимым файлом XSD. Убедитесь, что выбранный файл имеет расширение .xsd.";
    translation["template.contextunsupported"] =
        "Шаблон электронного документа поддерживает только контексты &quot;Интерфейс&quot; и &quot;SuiteScript&quot;.";
    translation["template.supportedtranstypefldhelp"] =
        "Выберите один или несколько типов операций, которые будут поддерживаться этим шаблоном. Для выбора нескольких типов операций нажмите и удерживайте клавишу Ctrl во время выбора типов операций.<br /><br />Если нельзя выбрать типы операций, это означает, что шаблон уже назначен одной или нескольким записям операции этого типа. Чтобы иметь возможность выбрать тип операции, удалите шаблон из записи операции.<br /><br />Этот шаблон можно также назначить входящим электронным документам, что приведет к недоступности поля &quot;Тип операции&quot;.";
    translation["template.eistatus"] =
        "Ограничить редактирование операций со статусом электронного документа";
    translation["template.supportedeistatusfieldhelp"] =
        "Операции с выбранным статусом электронных документов не будут доступны для редактирования, когда с ними связан этот шаблон. Можно выбрать несколько статусов электронных документов.";
    translation["template.invalidschemaordependency"] =
        "Схема является неправильно структурированным файлом XSD или зависимая схема не найдена.";
    translation["template.xmldoesnotconformtoschema"] =
        "Код XML шаблона не соответствует предоставленному файлу XSD или схеме.";
    translation["template.xmldomexception"] =
        "Неверный формат входящей строки XML.";
    translation["template.missingreqdargument"] =
        "Отсутствует XSD для исходящей проверки.";
    translation["template.xsdvalidationexception"] =
        "При проверке XSD произошла неизвестная ошибка.";
    translation["template.xsdmissingdependencyfolder"] =
        "Папка схемы XSD отсутствует или является недопустимой.";
    translation["invoice.generatebtn"] = "Сформировать электронный документ";
    translation["invoice.sendbtn"] = "Отправить электронный документ";
    translation["invoice.sendcertifybtn"] =
        "Сертифицировать электронный документ";
    translation["invoice.eipbtn"] = "Обработать электронный документ";
    translation["invoice.loguntagged"] =
        "Шаблон электронного документа удален. Снята отметка операции для формирования электронного документа.";
    translation["invoice.logforgenerate"] =
        "Операция готова для формирования электронного документа.";
    translation["invoice.invalidtemplatesub"] =
        "Филиал в операции недействителен для выбранного шаблона электронного документа. Выберите другой шаблон электронного документа.";
    translation["invoice.templateremovalerror"] =
        "Удаление шаблона электронного документа для отправленного электронного документа не разрешено.";
    translation["ei.sending.currentlysending"] =
        "Отправка электронного документа. Выполнение может занять несколько минут. Не прерывайте обработку, нажимая еще раз кнопку &quot;Отправить электронный документ&quot;. После отправки электронного документа страница перезагрузится.";
    translation["ei.sending.notready"] =
        "Электронный документ не готов к отправке. Необходимо сначала нажать &quot;Сформировать электронный документ&quot;, чтобы сформировать электронный документ.";
    translation["ei.sending.alreadysent"] = "Операция уже отправлена.";
    translation["ei.sending.norecipients"] =
        "Электронный документ нельзя отправить, потому что у клиента нет получателей электронных документов. Перед отправкой электронного документа по эл. почте необходимо сначала выбрать получателей электронных документов в записи клиента.";
    translation["ei.sending.indivcustnoemail"] =
        "Электронный документ нельзя отправить, потому что у клиента нет адреса эл. почты. Перед отправкой электронного документа по эл. почте необходимо указать адрес эл. почты в записи клиента.";
    translation["ei.sending.norecipients.vendor"] =
        "Электронный документ нельзя отправить, потому что для поставщика не указаны получатели электронных документов. Перед отправкой электронного документа по эл. почте необходимо сначала выбрать получателей электронных документов в записи поставщика.";
    translation["ei.sending.indivvendnoemail"] =
        "Электронный документ нельзя отправить, потому что для поставщика не указан адрес эл. почты. Перед отправкой электронного документа по эл. почте необходимо указать адрес эл. почты в записи поставщика.";
    translation["ei.sending.invalidmethod"] =
        "Выберите действительный метод отправки для {TYPE} № {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Отправитель: {SENDER}\nПолучатели: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "У отправителя электронного документа ({EMPLOYEENAME}) нет адреса эл. почты. Введите действительный адрес эл. почты в записи сотрудника.";
    translation["ei.sending.recipientnoemail"] =
        "У одного или нескольких получателей электронного документа, связанного с этой операцией, нет адреса эл. почты. Убедитесь, что у получателей, указанных для этого клиента, есть действительные адреса эл. почты.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "У одного или нескольких получателей электронного документа, связанного с этой операцией, нет адреса эл. почты. Убедитесь, что у получателей, указанных для этого поставщика, есть действительные адреса эл. почты.";
    translation["ei.sending.defaulterror"] =
        "Во время отправки электронного документа произошла ошибка. Подробную информацию см. на субвкладке &quot;Журнал аудита электронных документов&quot;.";
    translation["ei.sending.inactivecustomer"] =
        "Невозможно отправить электронный документ для этой операции, потому что выбранный клиент неактивен. Поле &quot;Статус электронного документа&quot; не было обновлено, журнал аудита не был создан. Снимите выделение поля &quot;Неактивен&quot; в записи клиента и попробуйте отправить электронный документ еще раз.";
    translation["ei.sending.inactivevendor"] =
        "Не удается отправить электронный документ для этой операции, потому что выбранный поставщик неактивен. Поле &quot;Статус электронного документа&quot; не было обновлено, журнал аудита не был создан. Снимите флажок &quot;Неактивен&quot; в записи поставщика и попробуйте отправить электронный документ еще раз.";
    translation["ei.sending.msg.processcomplete"] =
        "Электронный документ отправлен.";
    translation["ei.sending.configurefreecountry"] =
        "Чтобы использовать Electronic Invoicing для нескольких стран, ваша учетная запись должна иметь активную лицензию. Для массовой отправки электронных документов в одну страну необходимо выбрать страну в поле &quot;Страна бесплатной отправки электронных документов&quot; на странице данных компании.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Операции с неактивными клиентами не поддерживаются в электронных документах.";
    translation["ei.sending.inactivevendor.manager"] =
        "Операции с неактивными поставщиками не поддерживаются в электронных документах.";
    translation["ei.sending.certification.defaulterror"] =
        "Во время сертификации электронного документа произошла ошибка. Подробную информацию см. на субвкладке &quot;Журнал аудита электронных документов&quot;.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Электронный документ отправлен на сертификацию.";
    translation["ei.generation.generationlogbulk"] =
        "Электронный документ сформирован в процессе массовой обработки с использованием шаблона электронного документа '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "Электронный документ сформирован с использованием шаблона электронного документа '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Электронный документ и файл PDF сформированы в процессе массовой обработки с использованием шаблона электронного документа '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "Электронный документ и файл PDF сформированы в процессе массовой обработки с использованием шаблона электронного документа '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Электронный документ сформирован в процессе массовой обработки с использованием шаблона электронного документа '{TEMPLATENAME}'. Ранее сформированный для этой операции файл PDF удален.";
    translation["ei.generation.generationremovedpdflog"] =
        "Электронный документ сформирован с использованием шаблона электронного документа '{TEMPLATENAME}'. Ранее сформированный для этой операции файл PDF удален.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Процесс массового формирования\nИспользуемый шаблон электронного документа: {TEMPLATENAME}\nСведения об ошибке: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Используемый шаблон электронного документа: {TEMPLATENAME}\nСведения об ошибке: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Во время формирования произошла ошибка. Подробную информацию см. на субвкладке &quot;Журнал аудита электронных документов&quot;.";
    translation["ei.generation.inactivecustomer"] =
        "Невозможно сформировать электронный документ для этой операции, потому что выбранный клиент неактивен. Поле &quot;Статус электронного документа&quot; не было обновлено, журнал аудита не был создан. Снимите выделение поля &quot;Неактивен&quot; в записи клиента и попробуйте сформировать электронный документ еще раз.";
    translation["ei.generation.inactivevendor"] =
        "Невозможно сформировать электронный документ для этой операции, потому что выбранный поставщик неактивен. Поле &quot;Статус электронного документа&quot; не было обновлено, журнал аудита не был создан. Снимите флажок &quot;Неактивен&quot; в записи поставщика и попробуйте сформировать электронный документ еще раз.";
    translation["ei.generation.msg.processcomplete"] =
        "Электронный документ сформирован.";
    translation["ei.generation.configurefreecountry"] =
        "Чтобы использовать Electronic Invoicing для нескольких стран, ваша учетная запись должна иметь активную лицензию. Для массового формирования электронных документов для одной страны необходимо выбрать страну в поле &quot;Страна бесплатной отправки электронных документов&quot; на странице данных компании.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Операции с неактивными клиентами не поддерживаются в электронных документах.";
    translation["ei.generation.inactivevendor.generator"] =
        "Операции с неактивными поставщиками не поддерживаются в электронных документах.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Электронный документ успешно сформирован и подписан цифровой подписью.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Сбой формирования, так как получившийся электронный документ не является корректно сформированным объектом XML или JSON.";
    translation["notify.batchownersubject"] =
        "Отправка электронного документа закончена";
    translation["notify.batchownerbody"] =
        "Здравствуйте! <br/><br/>Ваш запрос на отправку электронных документов завершен.<br/>Отправлено документов: {SENT} из {TOTAL}. Подробности см. во вложенном файле. <br/><br/>Спасибо,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Формирование электронного документа для заказа на закупку № {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Электронный документ сформирован компанией {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Здравствуйте! <br /><br />{MESSAGE}<br />См. вложенный электронный документ.<br /><br />Спасибо,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Ошибка при формировании электронного документа";
    translation["notify.generationerrorbody"] =
        "Во время формирования электронного документа возникли ошибки.<br/>Список операций и сведения об ошибках см. во вложенном файле.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Для этой операции уже отправлен электронный документ. При формировании нового электронного документа предыдущий электронный документ будет перезаписан. Действительно сформировать новый электронный документ?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Удаление шаблона электронного документа для отправленного электронного документа не разрешено.";
    translation["transaction.msg.generate.information"] =
        "Выполняется создание этого электронного документа.";
    translation["transaction.msg.send.information"] =
        "Выполняется отправка этого электронного документа.";
    translation["transaction.msg.send.certify.information"] =
        "Выполняется сертификация этого электронного документа.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Создание этого электронного документа уже выполняется.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Отправка этого электронного документа уже выполняется.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Сертификация этого электронного документа уже выполняется.";
    translation["transaction.msg.uncheckpdf"] =
        "При последнем формировании электронного документа для этой операции был создан файл PDF. Снятие этого флажка приведет к удалению этого файла PDF при следующем формировании электронного документа.";
    translation["transaction.msg.nofreecountry"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран. Чтобы сформировать электронный документ для этой операции, обратитесь к администратору учетной записи с просьбой указать страну в поле &quot;Страна бесплатной отправки электронных документов&quot; на странице данных компании.";
    translation["transaction.msg.otherbillingcountry"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран. Чтобы сформировать электронный документ для этой операции, обратитесь к менеджеру учетной записи NetSuite для приобретения лицензии.";
    translation["transaction.msg.nobillingcountry"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран. Чтобы сформировать электронный документ для этой операции, укажите адрес выставления счета для этой операции.";
    translation["transaction.msg.noshippingcountry"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран. Чтобы сформировать электронный документ для этой операции, укажите адрес доставки для этой операции.";
    translation["transaction.msg.nocustomercountry"] =
        "В этой учетной записи отсутствует активная лицензия для выставления электронных счетов для нескольких стран. Чтобы сформировать электронный документ для этой операции, укажите адрес выставления счета по умолчанию для клиента в этой операции.";
    translation["transaction.msg.blockededittransaction"] =
        "Изменение операции заблокировано для текущего статуса электронного документа. См. вложенный шаблон EI.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "При изменении значения поля &quot;Тип содержимого&quot; с XML на другой тип все средства проверки файлов XML будут удалены. Действительно изменить тип содержимого?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Можно добавить только средства проверки для типа содержимого XML.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Это средство проверки уже есть в списке.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Средства проверки шаблона электронного документа поддерживают только контексты &quot;Интерфейс&quot; и &quot;SuiteScript&quot;.";
    translation["standarddocument.default.alreadyexist"] =
        "Запись {DEFAULT_DOCUMENT_STANDARD} уже существует. Нельзя создать запись пакета документов с таким же именем. Переименуйте запись пакета документов и повторите попытку.";
    translation["standarddocument.default.editnotallowed"] =
        "Изменение имени записи или описания {DEFAULT_DOCUMENT_STANDARD} не разрешено.";
    translation["standarddocument.default.deletenotallowed"] =
        "Удаление записи {DEFAULT_DOCUMENT_STANDARD} не разрешено.";
    translation["standarddocument.contextunsupported"] =
        "Пакет электронных документов поддерживает только контексты &quot;Интерфейс&quot;, &quot;Импорт CSV&quot; и &quot;SuiteScript&quot;.";
    translation["sendingmethod.default.alreadyexist"] =
        "Запись метода отправки {DEFAULT_SENDING_METHOD_NAME} уже существует. Нельзя создать запись метода отправки с таким же именем. Переименуйте запись метода отправки и повторите попытку.";
    translation["sendingmethod.default.editnotallowed"] =
        "Изменение записи метода отправки {DEFAULT_SENDING_METHOD_NAME} не разрешено.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Удаление записи метода отправки {DEFAULT_SENDING_METHOD_NAME} не разрешено.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Поле &quot;Тип операции&quot; недоступно, поскольку этот метод отправки назначен одной или нескольким записям операций. Чтобы изменить этот метод отправки, удалите метод отправки из записи операции, чтобы поле &quot;Тип операции&quot; стало доступным, затем повторите попытку.";
    translation["sendingmethod.contextunsupported"] =
        "Метод отправки электронного документа поддерживает только контексты &quot;Интерфейс&quot; и &quot;SuiteScript&quot;.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Выберите один или несколько типов операций, которые будут поддерживаться этим методом отправки. Для выбора нескольких типов операций нажмите и удерживайте клавишу Ctrl во время выбора типов операций.<br /><br />Если нельзя выбрать один или несколько типов операций, метод отправки будет назначен одной или нескольким записям этого типа операции. Чтобы включить выбор типа операции, необходимо сначала удалить метод отправки из записи операции.";
    translation["sendingmethod.pluginimplementation"] =
        "Реализация подключаемого модуля метода отправки электронных документов";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Выберите реализацию подключаемого модуля метода отправки";
    translation["sendingmethod.scriptbannermessage"] =
        "В качестве методов отправки нужно использовать пользовательские реализации подключаемых модулей. Заново создайте существующие сценарии методов отправки в качестве новых пользовательских реализаций подключаемых модулей типа &quot;Подключаемый модуль отправки&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Реализация подключаемого модуля пользовательского источника данных";
    translation["customdatasource.pluginimplementationhelp"] =
        "Выберите пользовательскую реализацию подключаемого модуля источника данных";
    translation["digitalsignature.pluginimplementation"] =
        "Реализация подключаемого модуля цифровой подписи";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Выберите реализацию подключаемого модуля. Это поле обязательно, если нужно подписывать электронные документы цифровой подписью.";
    translation["digitalsignature.identifierlabel"] =
        "Этот электронный документ подписан цифровой подписью";
    translation["digitalsignature.successlog"] =
        "Сформированный электронный документ подписан цифровой подписью.";
    translation["digitalsignature.failurelog"] =
        "Сформированный электронный документ не подписан цифровой подписью.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Реализация подключаемого модуля цифровой подписи возвратила состояние ошибки.";
    translation["digitalsignature.plugininvalidresult"] =
        "Реализация подключаемого модуля цифровой подписи возвратила недопустимый результат.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Реализация подключаемого модуля пользовательского источника входящих данных";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Выберите реализацию подключаемого модуля пользовательского источника входящих данных.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Недопустимый результат реализации подключаемого модуля пользовательского источника входящих данных.";
    translation["outboundvalidation.pluginimplementation"] =
        "Реализация подключаемого модуля проверки исходящих документов";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Выберите реализацию подключаемого модуля проверки исходящих электронных документов. Это позволяет проверять исходящие электронные документы.";
    translation["outboundvalidation.successlog"] =
        "Проверка исходящих документов выполнена.";
    translation["outboundvalidation.failurelog"] =
        "Сбой проверки исходящих документов.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Реализация подключаемого модуля проверки исходящих документов возвратила статус сбоя.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Недопустимый результат реализации подключаемого модуля проверки исходящих документов.";
    translation["template.msg.cannotedittransactiontype"] =
        "Поле &quot;Тип операции&quot; недоступно, поскольку этот шаблон уже назначен одной или нескольким записям операций. Чтобы изменить этот шаблон, удалите его из записи операции, чтобы поле &quot;Тип операции&quot; стало доступным, затем повторите попытку. Этот шаблон можно также назначить входящим электронным документам, что приведет к недоступности поля &quot;Тип операции&quot;.";
    translation["template.msg.forcetocopymessage"] =
        "Редактировать шаблон электронного документа по умолчанию невозможно. Его можно скопировать с помощью параметра &quot;Создать копию&quot; в меню &quot;Действия&quot; или создать новый.";
    translation["template.msg.warningoneditmessage"] =
        "Это шаблон электронного документа по умолчанию. При обновлении SuiteApp любые изменения, внесенные в этот шаблон, будут потеряны или перезаписаны.";
    translation["email.batchownernotification.subject"] =
        "Отправка электронного документа закончена";
    translation["email.batchownernotification.body"] =
        "Здравствуйте! <br/><br/>Ваши электронные документы отправлены.<br/>Отправлено документов: {SENT} из {TOTAL}. Подробности см. во вложенном файле. <br/><br/>Спасибо,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Преобразование электронного документа завершено";
    translation["email.batchownerconvertnotification.body"] =
        "Здравствуйте! <br/><br/>Ваши электронные документы преобразованы.<br/>Преобразовано документов: {CONVERTED} из {TOTAL}. Подробности см. во вложенном файле. <br/><br/>Спасибо,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Формирование электронного документа для заказа на закупку № {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Электронный документ от {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Сформирован электронный документ для операции {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Здравствуйте! <br /><br />Сформирован электронный документ для заказа на закупку № {PONUM}.<br />Подробности см. во вложенном файле электронного документа.<br /><br />Спасибо,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Здравствуйте! <br /><br />Сформирован электронный документ для операции {TYPE} #{TRANID}.<br />Подробности см. во вложенном файле электронного документа.<br /><br />Спасибо,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Ошибка при формировании электронного документа";
    translation["email.generationerrornotification.body"] =
        "Во время формирования электронного документа возникли ошибки.<br/>Список операций и сведения об ошибках см. во вложенном файле.";
    translation["email.sendingerrornotification.subject"] =
        "Ошибка при отправке электронного документа";
    translation["email.sendingerrornotification.body"] =
        "Во время отправки электронного документа возникли ошибки.<br/>Список операций и сведения об ошибках см. во вложенном файле.";
    translation["email.webserviceerror.subject"] =
        "Уведомление веб-сервиса о входящих электронных документах";
    translation["email.webserviceerror.body"] =
        "<p>Здравствуйте!</p><p>При обработке входящего электронного документа с использованием веб-сервиса возникли ошибки.<br/>См. подробные сведения ниже.</p>{DETAIL_TABLE}<p>Спасибо,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Номер операции";

    return translation;
});
