define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "明細";
    translation["email.attachment.collabel.transactiontype"] = "交易類型";
    translation["email.attachment.collabel.internalid"] = "內部 ID";
    translation["email.attachment.collabel.vendor"] = "廠商";
    translation["email.conversionerrornotification.subject"] =
        "內送電子文件轉換期間發生錯誤";
    translation["email.conversionerrornotification.body"] =
        "內送電子文件轉換期間發生錯誤。<br/>請參閱附件檔案中的錯誤記錄和其詳細內容清單。";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>注意：如果要讓帳戶管理員以外的其他使用者接收通知，請在母公司之子公司記錄的「電子文件通知的收件者」欄位中輸入使用者的電子郵件地址。";
    translation["email.table.collabel.inboundedocumentid"] = "內送電子文件 ID";
    translation["email.table.collabel.details"] = "明細";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "檢查帳戶授權時發生錯誤";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。</br>若要大量處理電子文件，請在公司資訊頁面上設定「免費使用電子文件的國家/地區」。";
    translation["inboundedocument.logforconversion"] =
        "內送電子文件已準備好進行轉換。";
    translation["inboundedocument.logincomplete"] =
        "內送電子文件不完整。並未選擇任何 {FIELD}。";
    translation["inboundedocument.deletenotallowed"] =
        "不允許刪除內送電子文件。";
    translation["inboundedocument.copynotallowed"] = "不允許複製內送電子文件。";
    translation["inboundedocument.contextunsupported"] =
        "內送電子文件僅支援 UI 和 SuiteScript 內容。";
    translation["inboundedocument.invalidxmlfile"] =
        "選取的 XML 檔案參考不是有效的 XML 檔案。請確定您所選檔案的副檔名為 .xml。";
    translation["inboundedocument.invalidpdffile"] =
        "選取的 PDF 檔案參考不是有效的 PDF 檔案。請確定您所選檔案的副檔名為 .pdf。";
    translation["inboundedocument.invalidxml"] =
        "選擇的「XML 檔案參考」不是具有正確格式的 XML 文件。";
    translation["inboundedocument.convert.button"] = "轉換";
    translation["inboundedocument.convert.information"] =
        "此內送電子文件正在轉換中。";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "此內送電子文件已在轉換中。";
    translation["inboundedocument.cancel.button"] = "取消電子文件";
    translation["inboundedocument.cancel.confirmation"] =
        "您確定要取消此內送電子文件嗎？";
    translation["inboundedocument.cancel.failed"] =
        "內送電子文件記錄的狀態為 '{STATUS}'，因此取消失敗";
    translation["inboundedocument.cancel.defaulterror"] =
        "取消期間發生錯誤。請檢查「電子文件」子頁標中的「電子文件稽核追蹤」以瞭解明細。";
    translation["inboundedocument.cancel.complete"] = "電子文件已取消。";
    translation["inboundedocument.preview.button"] = "檢視 XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing SuiteApp 的現用授權。若要將此電子文件轉換為交易，請與帳戶管理員聯絡以在「公司資訊」頁面上的「免費使用電子文件的國家/地區」欄位中指定國家/地區。";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing SuiteApp 的現用授權。若要將此電子文件轉換為交易，請與 NetSuite 帳戶管理員聯絡以購買授權。";
    translation["inboundedocument.msg.nobillingcountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing SuiteApp 的現用授權。若要將此電子文件轉換為交易，請設定所選廠商的預設帳單地址。";
    translation["validationplugin.contextunsupported"] =
        "內送電子文件驗證外掛程式僅支援 UI 和 SuiteScript 內容。";
    translation["validationplugin.pluginimplementation"] =
        "內送電子文件驗證外掛程式實施";
    translation["validationplugin.pluginimplementationhelp"] =
        "選擇內送電子文件驗證外掛程式實施。";
    translation["validationplugin.scriptbannermessage"] =
        "內送電子文件驗證應為自訂外掛程式實施。請將現有的驗證指令碼重新建立為「內送驗證外掛程式」類型的新自訂外掛程式實施";
    translation["ei.conversion.defaulterror"] =
        "轉換期間發生錯誤。請檢查「電子文件」子頁標中的「電子文件稽核追蹤」以瞭解明細。";
    translation["ei.conversion.inactivevendor"] =
        "選取的廠商為非現用，因此無法轉換此內送電子文件。「電子文件狀態」欄位未更新，且未建立稽核追蹤。請清除廠商記錄上的「非現用」方塊，然後重新嘗試轉換電子文件。";
    translation["ei.conversion.inactivecustomer"] =
        "選取的客戶為非現用，因此無法轉換此內送電子文件。「電子文件狀態」欄位未更新，且未建立稽核追蹤。請清除客戶記錄上的「非現用」方塊，然後重新嘗試轉換電子文件。";
    translation["ei.conversion.conversioncomplete"] = "電子文件已轉換。";
    translation["ei.conversion.conversionlogbulk"] =
        "內送電子文件已包含在大量轉換中，且已轉換為具有內部 ID：{INTERNALID}、類型：'{TYPE}' 的交易。";
    translation["ei.conversion.conversionlog"] =
        "內送電子文件已轉換為具有內部 ID：{INTERNALID}、類型：'{TYPE}' 的交易。";
    translation["ei.conversion.failedconversionlogbulk"] =
        "大量轉換程序\n使用的電子文件範本：{TEMPLATENAME}\n錯誤範圍：{ERRORSCOPE}\n錯誤明細：{ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "使用的電子文件範本：{TEMPLATENAME}\n錯誤範圍：{ERRORSCOPE}\n錯誤明細：{ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "剖析失敗。請檢查內送電子文件的欄位對應。";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "轉換失敗。";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "驗證失敗。";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "內送電子文件記錄的狀態為 '{STATUS}'，因此轉換失敗";
    translation["ei.conversion.inactivecustomer.converter"] =
        "不支援轉換非現用客戶的內送電子文件。";
    translation["ei.conversion.inactivevendor.converter"] =
        "不支援轉換非現用廠商的內送電子文件。";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "下列廠商代碼 {ITEMLIST} 未與任何項目記錄相關聯。";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "下列廠商名稱/代碼 {ITEMLIST} 未與任何項目記錄相關聯。";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "下列廠商代碼 {ITEMLIST} 與多個項目記錄相關聯。請修改這些項目記錄，並確定每個廠商的每個項目都有唯一的廠商代碼。";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "下列廠商名稱/代碼 {ITEMLIST} 與多個項目記錄相關聯。請修改這些項目記錄，並確定每個廠商的每個項目都有唯一的廠商名稱/代碼。";
    translation["ei.conversion.refnumnotfound"] =
        "內送電子文件中遺漏必要的參考編號。請取消此電子文件，並送出另一個包含參考編號之 XML 元素 (對應於 tranid 欄位) 的電子文件。";
    translation["ei.conversion.refnumexists"] =
        "具有相同參考編號的廠商帳單已存在。請取消此電子文件，並送出另一個具有 XML 元素之正確參考編號值 (對應於 tranid 欄位) 的電子文件。";
    translation["ei.conversion.vendorcodenotfound"] =
        "電子文件範本中遺漏了 vendorcode 欄位。請修改電子文件範本，或選擇包含 vendorcode 欄位對應的另一個範本。";
    translation["ei.conversion.novendorcodevalue"] =
        "至少其中一個項目沒有廠商代碼。請取消此電子文件，並送出另一個具有 XML 元素之正確值 (對應於廠商代碼欄位) 的電子文件。";
    translation["ei.conversion.vendornamenotfound"] =
        "電子文件範本中遺漏了 vendorname 欄位。請修改電子文件範本，或選擇包含 vendorname 欄位對應的另一個範本。";
    translation["ei.conversion.novendornamevalue"] =
        "至少其中一個項目沒有廠商名稱/代碼。請取消此電子文件，並送出另一個具有 XML 元素之正確值 (對應於廠商名稱/代碼欄位) 的電子文件。";
    translation["ei.conversion.sourcetransnotfound"] =
        "在系統中找不到記錄 ({TRANSTYPE}#{TRANSID})。請取消此電子文件，並送出另一個具有 XML 元素之正確值 (對應於 createdfrom 欄位) 的電子文件。";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "記錄 ({TRANSTYPE}#{TRANSID}) 已指定給其他實體。請選取正確的實體，並轉換此電子文件。";
    translation["ei.conversion.novendorexpenseaccount"] =
        "廠商沒有轉換具有費用的帳單時所需要的預設支出科目。若要繼續進行轉換，請在廠商記錄的「預設支出科目」欄位中設定一個值。";
    translation["ei.conversion.nolinktopo"] =
        "內送電子文件沒有參考的採購單中所包含的項目或費用。請檢查參考的採購單是否處於可轉換的狀態。如果可轉換，請取消此電子文件，並送出另一個具有 XML 元素之正確值 (對應於 createdfrom 欄位) 的電子文件。";
    translation["inbound.formtitle"] = "轉換內送電子文件";
    translation["inbound.search"] = "搜尋";
    translation["inbound.convert"] = "轉換";
    translation["inbound.return"] = "返回條件";
    translation["inbound.vendor"] = "廠商";
    translation["inbound.datefrom"] = "建立開始日期";
    translation["inbound.dateto"] = "建立結束日期";
    translation["inbound.vendorhelp"] =
        "選擇會將失敗的內送電子文件包含在搜尋結果中的廠商。";
    translation["inbound.datefromhelp"] =
        "選擇開始日期以定義特定範圍內所建立失敗內送電子文件將包含在搜尋結果中的期間。";
    translation["inbound.datetohelp"] =
        "選擇結束日期以定義特定範圍內所建立失敗內送電子文件將包含在搜尋結果中的期間。";
    translation["inbound.inboundedocfieldgroup"] =
        "失敗的內送電子文件搜尋篩選條件";
    translation["inbound.sublist.sublistname"] = "失敗的內送電子文件的搜尋結果";
    translation["inbound.sublist.internalid"] = "內部 ID";
    translation["inbound.sublist.vendor"] = "廠商";
    translation["inbound.sublist.refnum"] = "參考編號";
    translation["inbound.sublist.ponum"] = "採購單編號";
    translation["inbound.sublist.datecreated"] = "建立日期";
    translation["inbound.sublist.edoctemplate"] = "電子文件範本";
    translation["inbound.msg.conversionongoing"] =
        "目前正在轉換電子文件。您將在程序完成後收到電子郵件。";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "正在處理 {DATECREATED_FROM} - {DATECREATED_TO} 期間內的內送電子文件轉換，因此您無法使用選取的條件執行搜尋。請變更您的搜尋條件，或此電子文件轉換完畢後再重試。";
    translation["inbound.invaliddates"] =
        "建立開始日期不得晚於建立結束日期。請變更日期，使建立開始日期早於建立結束日期。";
    translation["inbound.configurefreecountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing SuiteApp 的現用授權。若要大量轉換電子文件，請與帳戶管理員聯絡以在「公司資訊」頁面上設定「免費使用電子文件的國家/地區」。";
    translation["portlet.title"] = "電子文件";
    translation["portlet.outboundforgeneration"] = "待產生的外送電子文件";
    translation["portlet.outboundforsending"] = "待傳送的外送電子文件";
    translation["portlet.outboundwitherrors"] = "有錯誤的外送電子文件";
    translation["portlet.outboundsendinglink"] = "傳送失敗的外送電子文件";
    translation["portlet.inboundforconversion"] = "待轉換的內送電子文件";
    translation["portlet.inboundconvertfailed"] = "轉換失敗的內送電子文件";
    translation["portlet.inboundincomplete"] = "不完整的內送電子文件";
    translation["portlet.inbounduploadlink"] = "上傳內送電子文件";
    translation["portlet.outboundforcertification"] = "待認證的外送電子文件";
    translation["portlet.outboundcertifiedforsending"] = "待傳送的外送電子文件";
    translation["inbound.webservice.response.success"] =
        "已順利建立 ID 為 {ID} 的內送電子文件。";
    translation["inbound.webservice.response.novendor"] =
        "沒有與網路服務 ID {IDENTIFIER} 相關聯的廠商。請確定使用正確的網路服務 ID。";
    translation["inbound.webservice.response.multiplevendor"] =
        "已順利建立 ID 為 {ID} 的內送電子文件。不過，有多個廠商與網路服務 ID {IDENTIFIER} 相關聯。";
    translation["inbound.webservice.error.templateerror"] =
        "內送電子文件不完整，因為無法判斷正確的範本。請在內送電子文件記錄中選擇範本，或在電子文件範本記錄中設定 XSD 來啟用範本 autoselection。";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "內送電子文件不完整，因為無法判斷正確的廠商。請在內送電子文件記錄中選擇廠商，或在相關聯的廠商記錄中設定網路服務 ID。";
    translation["inbound.webservice.error.missingkeyerror"] =
        "遺漏下列索引鍵：{KEYS}，網路服務要求中必須提供這些索引鍵。";
    translation["inbound.webservice.error.invalidparamerror"] =
        "網路服務要求的內文必須為 JSON 物件，或是使用以下內容類型的 JSON 物件陣列：'application/json'。";
    translation["transaction.contactnoemail"] =
        "下列電子文件收件者的聯絡記錄中沒有電子郵件地址：{CONTACTNAMES}。";
    translation["transaction.norecipients"] =
        "沒有此交易的電子文件收件者。若要透過電子郵件傳送電子文件，必須在電子文件收件者清單中新增至少一個聯絡人。";
    translation["transaction.maxrecipientexceeded"] =
        "您新增的電子郵件收件者數量已超過限制。您可以新增最多 10 個電子郵件收件者。";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "僅處理下列交易類型：";
    translation["ei.prefs.formtitle"] = "電子文件偏好";
    translation["ei.prefs.information.about.certify.skip"] =
        "若未定義認證傳送方法或不適用於此交易，會略過認證步驟。";
    translation["ei.prefs.label.sublist.automati.ei"] = "自動開立電子發票";
    translation["ei.prefs.label.automatic.type.selected"] =
        "電子文件自動化類型";
    translation["ei.prefs.text.option.comb.disabled"] = "停用";
    translation["ei.prefs.text.option.comb.gcs"] = "產生, 認證, 傳送";
    translation["ei.prefs.text.option.comb.gc"] = "產生, 認證";
    translation["ei.prefs.text.option.comb.cs"] = "認證, 傳送";
    translation["ei.prefs.btn.label.cancel"] = "取消";
    translation["ei.prefs.btn.label.save"] = "儲存";
    translation["ei.prefs.msg.confirm.save"] =
        "您是否要儲存對電子文件偏好進行的變更？";
    translation["ei.prefs.msg.success.save"] = "順利儲存電子文件偏好。";
    translation["ei.prefs.msg.failed.save"] = "電子文件偏好儲存失敗。";
    translation["ei.prefs.insufficient.permission.details"] =
        "存取此頁面的權限有限制。若要要求存取權，請與管理員聯絡。";
    translation["ei.eip.msg.completed"] = "電子文件處理完畢。";
    translation["ei.eip.msg.failed"] =
        "電子文件處理失敗。如需更多明細，請參閱「電子文件稽核追蹤」。";
    translation["ei.eip.msg.processing"] = "此電子文件正在處理中。";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "此電子文件已在處理中。";
    translation["license.notinstalled"] =
        "您的帳戶沒有安裝 NetSuite SuiteApps License Client。請安裝此 SuiteApp 才能存取所有的 Electronic Invoicing 功能。";
    translation["outbound.formtitle"] = "傳送失敗的電子文件";
    translation["outbound.search"] = "搜尋";
    translation["outbound.send"] = "傳送";
    translation["outbound.return"] = "返回條件";
    translation["outbound.customer"] = "客戶";
    translation["outbound.vendor"] = "廠商";
    translation["outbound.subsidiary"] = "子公司";
    translation["outbound.type"] = "交易類型";
    translation["outbound.datefrom"] = "交易開始日期";
    translation["outbound.dateto"] = "交易結束日期";
    translation["outbound.subshelp"] =
        "選擇一家子公司，即可顯示僅屬於該子公司的交易。";
    translation["outbound.custhelp"] =
        "選擇一位客戶，即可顯示僅屬於該客戶的交易。如果未選擇任何客戶，搜尋結果將顯示所有屬於子公司的交易，而不區分客戶。";
    translation["outbound.vendorhelp"] =
        "選擇一家廠商，即可顯示僅屬於該廠商的交易。如果未選擇任何廠商，搜尋結果將顯示所有屬於子公司的交易，而不區分廠商。";
    translation["outbound.entitytypehelp"] =
        "選擇「客戶」或「廠商」實體類型。這會啟用下方的對應下拉式清單。";
    translation["outbound.typehelp"] =
        "針對您想傳送的每一份電子文件，選取一或多個交易類型。若要選取多個交易類型，請按住 Ctrl 鍵並選取交易類型。<br /><br />如果未選取任何交易類型，搜尋結果將顯示所有準備好傳送的電子文件，而不區分交易類型。";
    translation["outbound.datefromhelp"] =
        "若要檢視特定日期範圍內建立的交易清單，請選擇一個日期，以定義日期範圍的開始日期。";
    translation["outbound.datetohelp"] =
        "若要檢視特定日期範圍內建立的交易清單，請選擇一個日期，以定義日期範圍的結束日期。";
    translation["outbound.entityfieldgroup"] = "實體搜尋篩選條件";
    translation["outbound.filtersfieldgroup"] = "交易搜尋篩選條件";
    translation["outbound.entitytypeinlinehelp"] = "選擇實體類型：";
    translation["outbound.invalidtypetitle"] = "交易類型無效";
    translation["outbound.invalidtype"] =
        "目前不支援下列交易類型：{TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "下列交易類型對選擇的實體而言無效：{TRANSACTIONTYPES}。請對您選擇的實體選取適當的交易類型。";
    translation["outbound.invaliddates"] =
        "交易開始日期不得晚於交易結束日期。請變更日期，使交易開始日期早於交易結束日期。";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "正在傳送 {SUBSIDIARY} 子公司於 {TRANDATE_FROM} – {TRANDATE_TO} 期間內的交易電子文件，因此您無法使用選取的條件執行搜尋。請變更您的搜尋條件，或此電子文件傳送完畢後再重試。";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "正在傳送 {TRANDATE_FROM} – {TRANDATE_TO} 期間內的交易電子文件，因此您無法使用選取的條件執行搜尋。請變更您的搜尋條件，或此電子文件傳送完畢後再重試。";
    translation["outbound.sublist.trannum"] = "交易編號";
    translation["outbound.sublist.trantype"] = "交易類型";
    translation["outbound.sublist.customer"] = "客戶";
    translation["outbound.sublist.vendor"] = "廠商";
    translation["outbound.sublist.subsidiary"] = "子公司";
    translation["outbound.sublist.trandate"] = "交易日期";
    translation["outbound.sublist.memo"] = "備忘錄";
    translation["outbound.sublist.template"] = "範本";
    translation["outbound.sublist.sendingmethod"] = "傳送方法";
    translation["outbound.sublist.sublistname"] =
        "待傳送之失敗的外送電子文件結果";
    translation["outbound.msg.sendingongoing"] =
        "目前正在傳送電子文件。您將在程序完成後收到電子郵件。";
    translation["outbound.configurefreecountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要大量傳送電子文件，請與帳戶管理員聯絡以在公司資訊頁面上設定「免費使用電子文件的國家/地區」。";
    translation["outbound.entitysend"] = "傳送至實體";
    translation["outbound.certifysend"] = "傳送以供認證";
    translation["outbound.sendingtypehelp"] =
        "請選擇「傳送至實體」或「傳送以供認證」。待傳送的對應交易將會列出。";
    translation["customer.noemail"] =
        "沒有此客戶的電子郵件地址。請於客戶記錄中輸入有效的電子郵件地址，以啟用透過電子郵件傳送電子文件的功能。";
    translation["customer.contactnoemail"] =
        "下列電子文件收件者的聯絡記錄中沒有電子郵件地址：{CONTACTNAMES}。";
    translation["customer.norecipients"] =
        "沒有此客戶的電子文件收件者。若要透過電子郵件傳送電子文件給此客戶，必須在電子文件收件者清單中新增至少一個聯絡人。";
    translation["customer.arrayrequired"] = "驗證需要聯絡人陣列。";
    translation["customer.parameternotarray"] = "聯絡人參數不是陣列。";
    translation["customer.maxrecipientexceeded"] =
        "已超過電子郵件收件者的數量上限。請選擇不超過 10 人的電子郵件收件者。";
    translation["vendor.noemail"] =
        "沒有此廠商的電子郵件地址。請於廠商記錄中輸入有效的電子郵件地址，以啟用透過電子郵件傳送電子文件的功能。";
    translation["vendor.contactnoemail"] =
        "下列電子文件收件者的聯絡記錄中沒有電子郵件地址：{CONTACTNAMES}。";
    translation["vendor.norecipients"] =
        "沒有此廠商的電子文件收件者。若要透過電子郵件傳送電子文件給此廠商，必須在電子文件收件者清單中新增至少一個聯絡人。";
    translation["vendor.maxrecipientexceeded"] =
        "已超過電子郵件收件者的數量上限。請選擇不超過 10 人的電子郵件收件者。";
    translation["vendor.nosenders"] =
        "沒有此廠商的電子文件電子郵件寄件者。若要透過電子郵件接收此廠商的電子文件，您必須在「廠商電子文件的電子郵件寄件者」清單中輸入至少一個電子郵件地址。";
    translation["vendor.existingsender"] = "此寄件者電子郵件地址已存在。";
    translation["vendor.existingdomain"] =
        "此寄件者電子郵件網域已被其他廠商使用。";
    translation["vendor.existingidentifier"] =
        "此網路服務 ID 已被另一個廠商使用。請輸入其他網路服務 ID。";
    translation["customeremailrecipient.contextunsupported"] =
        "客戶電子文件的電子郵件收件者僅支援下列內容：UI、CSV、SuiteScript 和網路服務。";
    translation["vendoremailrecipient.contextunsupported"] =
        "廠商電子文件的電子郵件收件者僅支援下列內容：UI、CSV、SuiteScript 和網路服務。";
    translation["vendoremailsender.contextunsupported"] =
        "廠商電子文件的電子郵件寄件者僅支援下列內容：UI、CSV、SuiteScript 和網路服務。";
    translation["template.incorrectregex"] =
        "REGEX 欄位內含不正確的正規表示式。必須使用正確的語法。";
    translation["template.invalidjson"] =
        "您沒有在「外送電子文件的範本」欄位中提供正確格式的 JSON。請按一下「確定」繼續，或按「取消」留在目前的頁面。";
    translation["template.invalidxml"] =
        "XML 範本包含錯誤。XML 格式必須是正確格式。";
    translation["template.templaterequired"] =
        "遺漏用於所選外送交易類型的範本內容。請在「外送電子文件」欄位提供有效的 XML 或 JSON 範本內容，然後重試。";
    translation["template.mappingrequired"] =
        "您已選擇內送交易類型，但遺漏了欄位對應的 JSON 內容。請在「內送電子文件的欄位對應」欄位中輸入 JSON 內容。";
    translation["template.templateorjsonrequired"] =
        "遺漏欄位值。請於「外送電子文件的範本」欄位指定外送交易的有效 XML 或 JSON 內容，並於「內送電子文件的欄位對應」欄位指定內送交易的 JSON 內容。";
    translation["template.invalidxsdfile"] =
        "選取的 XSD 檔案不是有效的 XSD 檔案。請確定您所選檔案的副檔名為 .xsd。";
    translation["template.contextunsupported"] =
        "電子文件範本僅支援 UI 和 SuiteScript 內容。";
    translation["template.supportedtranstypefldhelp"] =
        "選取此範本支援的一或多個交易類型。若要選取多個交易類型，請按住 Ctrl 鍵並選取交易類型。<br /><br />若無法選取交易類型，則表示範本已被指定給相同交易類型的一或多個交易記錄。若要啟用選擇交易類型的功能，請從交易記錄中移除範本。<br /><br />您也可以將此範本指定給內送電子文件，這麼做將會停用「交易類型」欄位。";
    translation["template.eistatus"] = "限制編輯具有指定電子文件狀態的交易";
    translation["template.supportedeistatusfieldhelp"] =
        "若交易與此範本關聯時，則具有指定電子文件狀態的交易將無法被編輯。您可選取多個電子文件狀態。";
    translation["template.invalidschemaordependency"] =
        "綱要是結構不正確的 XSD 或找不到相依的綱要。";
    translation["template.xmldoesnotconformtoschema"] =
        "範本的 XML 不符合提供的 XSD 或綱要。";
    translation["template.xmldomexception"] = "輸入 XML 字串的格式錯誤。";
    translation["template.missingreqdargument"] = "缺少外送驗證的 XSD。";
    translation["template.xsdvalidationexception"] =
        "在 XSD 驗證期間發生未知的例外。";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD 綱要資料夾無效或遺漏。";
    translation["invoice.generatebtn"] = "產生電子文件";
    translation["invoice.sendbtn"] = "傳送電子文件";
    translation["invoice.sendcertifybtn"] = "認證電子文件";
    translation["invoice.eipbtn"] = "處理電子文件";
    translation["invoice.loguntagged"] =
        "已移除電子文件範本。已取消交易上待產生電子文件的標記。";
    translation["invoice.logforgenerate"] = "交易已準備好產生電子文件。";
    translation["invoice.invalidtemplatesub"] =
        "交易的子公司對選擇的電子文件範本而言無效。請選擇其他電子文件範本。";
    translation["invoice.templateremovalerror"] =
        "不允許移除已傳送之電子文件的電子文件範本。";
    translation["ei.sending.currentlysending"] =
        "目前正在傳送電子文件。此作業可能需要數分鐘才能完成。請勿再次按下「傳送電子文件」按鈕，此舉將會干擾作業。傳送電子文件後，頁面將重新載入。";
    translation["ei.sending.notready"] =
        "此電子文件尚未準備好傳送。您必須先按一下「產生電子文件」，才會產生電子文件。";
    translation["ei.sending.alreadysent"] = "此交易已傳送。";
    translation["ei.sending.norecipients"] =
        "沒有客戶的電子文件收件者，因此無法傳送電子文件。透過電子郵件傳送此電子文件前，必須先在客戶記錄上選取電子文件收件者。";
    translation["ei.sending.indivcustnoemail"] =
        "沒有客戶的電子郵件地址，因此無法傳送電子文件。透過電子郵件傳送此電子文件前，必須先在客戶記錄上提供電子郵件地址。";
    translation["ei.sending.norecipients.vendor"] =
        "沒有廠商的電子文件收件者，因此無法傳送電子文件。透過電子郵件傳送此電子文件前，必須先在廠商記錄上選取電子文件收件者。";
    translation["ei.sending.indivvendnoemail"] =
        "沒有廠商的電子郵件地址，因此無法傳送電子文件。透過電子郵件傳送此電子文件前，必須先在廠商記錄上提供電子郵件地址。";
    translation["ei.sending.invalidmethod"] =
        "選取 {TYPE} #{INVOICENUMBER} 的有效傳送方法。";
    translation["ei.sending.sentdetails"] =
        "寄件者：{SENDER}\n收件者：{RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "沒有電子文件寄件者 ({EMPLOYEENAME}) 的電子郵件地址。請於員工記錄中輸入有效的電子郵件地址。";
    translation["ei.sending.recipientnoemail"] =
        "與此交易相關聯之電子文件的一或多個收件者沒有電子郵件地址。請確認此客戶的收件者擁有有效的電子郵件地址。";
    translation["ei.sending.recipientnoemail.vendor"] =
        "與此交易相關聯之電子文件的一或多個收件者沒有電子郵件地址。請確認此廠商的收件者擁有有效的電子郵件地址。";
    translation["ei.sending.defaulterror"] =
        "傳送電子文件期間發生錯誤。請檢查「電子文件」子頁標中的「電子文件稽核追蹤」以瞭解明細。";
    translation["ei.sending.inactivecustomer"] =
        "選取的客戶為非現用，因此無法傳送此交易的電子文件。「電子文件狀態」欄位未更新，且未建立稽核追蹤。請清除客戶記錄上的「非現用」方塊，然後重新嘗試傳送電子文件。";
    translation["ei.sending.inactivevendor"] =
        "選取的廠商為非現用，因此無法傳送此交易的電子文件。「電子文件狀態」欄位未更新，且未建立稽核追蹤。請清除廠商記錄上的「非現用」方塊，然後重新嘗試傳送電子文件。";
    translation["ei.sending.msg.processcomplete"] = "電子文件已傳送。";
    translation["ei.sending.configurefreecountry"] =
        "您的帳戶必須具有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要大量傳送電子文件至單一國家/地區，則必須在「公司資訊」頁面的「免費使用電子文件的國家/地區」欄位選取國家/地區。";
    translation["ei.sending.inactivecustomer.manager"] =
        "電子文件不支援非現用客戶的交易。";
    translation["ei.sending.inactivevendor.manager"] =
        "電子文件不支援非現用廠商的交易。";
    translation["ei.sending.certification.defaulterror"] =
        "認證電子文件期間發生錯誤。請檢查「電子文件」子頁標中的「電子文件稽核追蹤」以瞭解明細。";
    translation["ei.sending.certification.msg.processcomplete"] =
        "已傳送電子文件以供認證。";
    translation["ei.generation.generationlogbulk"] =
        "已使用電子文件範本 '{TEMPLATENAME}' 大量產生電子文件。";
    translation["ei.generation.generationlog"] =
        "已使用電子文件範本 '{TEMPLATENAME}' 產生電子文件。";
    translation["ei.generation.generationwithpdflogbulk"] =
        "已使用電子文件範本 '{TEMPLATENAME}' 大量產生電子文件和 PDF 檔案。";
    translation["ei.generation.generationwithpdflog"] =
        "已使用電子文件範本 '{TEMPLATENAME}' 產生電子文件和 PDF 檔案。";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "已使用電子文件範本 '{TEMPLATENAME}' 大量產生電子文件。已刪除此交易先前所產生的 PDF 檔案。";
    translation["ei.generation.generationremovedpdflog"] =
        "已使用電子文件範本 '{TEMPLATENAME}' 產生電子文件。已刪除此交易先前所產生的 PDF 檔案。";
    translation["ei.generation.failedgenerationlogbulk"] =
        "大量產生程序\n使用的電子文件範本：{TEMPLATENAME}\n錯誤明細：{ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "使用的電子文件範本：{TEMPLATENAME}\n錯誤明細：{ERROR}";
    translation["ei.generation.defaulterror"] =
        "產生期間發生錯誤。請檢查「電子文件」子頁標中的「電子文件稽核追蹤」以瞭解明細。";
    translation["ei.generation.inactivecustomer"] =
        "選取的客戶為非現用，因此無法產生此交易的電子文件。「電子文件狀態」欄位未更新，且未建立稽核追蹤。請清除客戶記錄上的「非現用」方塊，然後重新嘗試產生電子文件。";
    translation["ei.generation.inactivevendor"] =
        "選取的廠商為非現用，因此無法產生此交易的電子文件。「電子文件狀態」欄位未更新，且未建立稽核追蹤。請清除廠商記錄上的「非現用」方塊，然後重新嘗試產生電子文件。";
    translation["ei.generation.msg.processcomplete"] = "已產生電子文件。";
    translation["ei.generation.configurefreecountry"] =
        "您的帳戶必須具有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要大量產生電子文件至單一國家/地區，則必須在「公司資訊」頁面的「免費使用電子文件的國家/地區」欄位選取國家/地區。";
    translation["ei.generation.inactivecustomer.generator"] =
        "電子文件不支援非現用客戶的交易。";
    translation["ei.generation.inactivevendor.generator"] =
        "電子文件不支援非現用廠商的交易。";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "已順利產生電子文件並進行數位簽署。";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "產生的電子文件不是正確格式的 XML 或 JSON，因此產生失敗。";
    translation["notify.batchownersubject"] = "電子文件傳送已完成";
    translation["notify.batchownerbody"] =
        "您好，<br/><br/>已完成您傳送電子文件的要求。<br/>已傳送 {SENT} 份文件 (總計 {TOTAL} 份)。請參閱附件檔案以瞭解明細。<br/><br/>感謝您，<br/>NetSuite";
    translation["notify.recipientposubj"] = "已產生採購單 #{PONUM} 的電子文件";
    translation["notify.recipientcompsubj"] = "{COMPANYNAME} 產生的電子文件";
    translation["notify.recipientbody"] =
        "您好！ <br /><br />{MESSAGE}<br />請查收附件的電子文件檔案。<br /><br />感謝您，<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] = "產生電子文件期間發生錯誤";
    translation["notify.generationerrorbody"] =
        "產生電子文件期間發生錯誤。<br/>請參閱附件檔案中的交易和錯誤明細清單。";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "已傳送此交易的電子文件。產生新的電子文件將覆寫之前的電子文件。您確定要產生新的電子文件嗎？";
    translation["transaction.msg.removetemplatealreadysent"] =
        "不允許移除已傳送之電子文件的電子文件範本。";
    translation["transaction.msg.generate.information"] =
        "此電子文件正在產生中。";
    translation["transaction.msg.send.information"] = "此電子文件正在傳送中。";
    translation["transaction.msg.send.certify.information"] =
        "此電子文件正在認證中。";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "此電子文件已在產生中。";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "此電子文件已在傳送中。";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "此電子文件已在認證中。";
    translation["transaction.msg.uncheckpdf"] =
        "已在最後電子文件產生期間建立此交易的 PDF 檔案。清除此方塊會在下次電子文件產生中刪除該 PDF 檔案。";
    translation["transaction.msg.nofreecountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要產生此交易的電子文件，請與帳戶管理員聯絡以在「公司資訊」頁面上的「免費使用電子文件的國家/地區」欄位中指定國家/地區。";
    translation["transaction.msg.otherbillingcountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要產生此交易的電子文件，請與 NetSuite 帳戶管理員聯絡以購買授權。";
    translation["transaction.msg.nobillingcountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要產生此交易的電子文件，請指出此交易的帳單地址。";
    translation["transaction.msg.noshippingcountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要產生此交易的電子文件，請指出此交易的送貨地址。";
    translation["transaction.msg.nocustomercountry"] =
        "此帳戶沒有在多個國家/地區使用 Electronic Invoicing 的現用授權。若要產生此交易的電子文件，請指出此交易之客戶的預設帳單地址。";
    translation["transaction.msg.blockededittransaction"] =
        "目前電子文件狀態的交易編輯功能已封鎖。請參閱附件的 EI 範本。";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "將「內容類型」欄位中的值從 XML 變更為其他類型後，將會移除所有的 XML 驗證工具。您確定要變更內容類型嗎？";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "僅可新增 XML 內容類型的驗證工具。";
    translation["transaction.msg.xmlvalidatorexists"] =
        "清單中已包含此驗證工具。";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "電子文件範本驗證工具僅支援 UI 和 SuiteScript 內容。";
    translation["standarddocument.default.alreadyexist"] =
        "{DEFAULT_DOCUMENT_STANDARD} 記錄已存在。您無法建立具有相同名稱的文件套裝記錄。請重新命名您的文件套裝記錄，然後重試。";
    translation["standarddocument.default.editnotallowed"] =
        "不允許編輯 {DEFAULT_DOCUMENT_STANDARD} 記錄「名稱」或「說明」。";
    translation["standarddocument.default.deletenotallowed"] =
        "不允許刪除 {DEFAULT_DOCUMENT_STANDARD} 記錄。";
    translation["standarddocument.contextunsupported"] =
        "電子文件套裝僅支援 UI、CSV 匯入和 SuiteScript 內容。";
    translation["sendingmethod.default.alreadyexist"] =
        "{DEFAULT_SENDING_METHOD_NAME} 傳送方法記錄已存在。您無法建立具有相同名稱的傳送方法記錄。請重新命名您的傳送方法記錄，然後重試。";
    translation["sendingmethod.default.editnotallowed"] =
        "不允許編輯 {DEFAULT_SENDING_METHOD_NAME} 的傳送方法記錄。";
    translation["sendingmethod.default.deletenotallowed"] =
        "不允許刪除 {DEFAULT_SENDING_METHOD_NAME} 的傳送方法。";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "此傳送方法已指定給一或多個交易記錄，因此停用「交易類型」欄位。若要編輯此傳送方法，請從交易記錄中移除此傳送方法以啟用「交易類型」欄位，然後重試。";
    translation["sendingmethod.contextunsupported"] =
        "電子文件傳送方法僅支援 UI 和 SuiteScript 內容。";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "選取此傳送方法支援的一或多個交易類型。若要選取多個交易類型，請按住 Ctrl 鍵並選取交易類型。<br /><br />若無法選取一或多個交易類型，則表示傳送方法已被指定給該交易類型的一或多個交易記錄。您必須先從交易記錄中移除傳送方法，以啟用選擇交易類型的功能。";
    translation["sendingmethod.pluginimplementation"] =
        "電子文件傳送方法外掛程式實施";
    translation["sendingmethod.pluginimplementationhelp"] =
        "選擇傳送方法外掛程式實施";
    translation["sendingmethod.scriptbannermessage"] =
        "傳送方法應為自訂外掛程式實施。請將現有的傳送方法指令碼重新建立為「傳送外掛程式」類型的新自訂外掛程式實施。";
    translation["customdatasource.pluginimplementation"] =
        "自訂資料來源外掛程式實施";
    translation["customdatasource.pluginimplementationhelp"] =
        "選擇自訂資料來源外掛程式實施";
    translation["digitalsignature.pluginimplementation"] =
        "數位簽章外掛程式實施";
    translation["digitalsignature.pluginimplementationhelp"] =
        "選擇外掛程式實施。如果您要數位簽署電子文件，則此欄位為必填。";
    translation["digitalsignature.identifierlabel"] = "此電子文件已數位簽署";
    translation["digitalsignature.successlog"] = "產生的電子文件已數位簽署。";
    translation["digitalsignature.failurelog"] = "產生的電子文件未數位簽署。";
    translation["digitalsignature.pluginfailedmessage"] =
        "數位簽章外掛程式實施傳回失敗狀態。";
    translation["digitalsignature.plugininvalidresult"] =
        "數位簽章外掛程式實施傳回的結果無效。";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "內送自訂資料來源外掛程式實施";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "選擇內送自訂資料來源外掛程式實施。";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "內送自訂資料來源外掛程式實施的結果無效。";
    translation["outboundvalidation.pluginimplementation"] =
        "外送驗證外掛程式實施";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "選擇外送電子文件驗證外掛程式實施。這會驗證外送電子文件。";
    translation["outboundvalidation.successlog"] = "外送驗證成功。";
    translation["outboundvalidation.failurelog"] = "外送驗證失敗。";
    translation["outboundvalidation.pluginfailedmessage"] =
        "外送驗證外掛程式實施傳回失敗狀態。";
    translation["outboundvalidation.plugininvalidresult"] =
        "外送驗證外掛程式實施傳回的結果無效。";
    translation["template.msg.cannotedittransactiontype"] =
        "此範本已指定給一或多個交易記錄，因此停用「交易類型」欄位。若要編輯此範本，請從交易記錄中移除此範本以啟用「交易類型」欄位，然後重試。您也可以將此範本指定給內送電子文件，這麼做將會停用「交易類型」欄位。";
    translation["template.msg.forcetocopymessage"] =
        "您無法編輯預設電子文件範本。您可以使用「動作」中的「建立副本」選項加以複製，或建立新的範本。";
    translation["template.msg.warningoneditmessage"] =
        "此為預設電子文件範本。若更新 SuiteApp，將會遺失或覆寫對此範本所做的任何變更。";
    translation["email.batchownernotification.subject"] = "電子文件傳送已完成";
    translation["email.batchownernotification.body"] =
        "您好，<br/><br/>已傳送您的電子文件。<br/>已傳送 {SENT} 份文件 (總計 {TOTAL} 份)。請參閱附件檔案以瞭解明細。<br/><br/>感謝您，<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "電子文件轉換已完成";
    translation["email.batchownerconvertnotification.body"] =
        "您好，<br/><br/>已轉換您的電子文件。<br/>已轉換 {CONVERTED} 份文件 (總計 {TOTAL} 份)。請參閱附件檔案以瞭解明細。<br/><br/>感謝您，<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "已產生採購單 #{PONUM} 的電子文件";
    translation["email.recipientnotification.subject"] =
        "來自 {COMPANYNAME} 的電子文件";
    translation["email.recipientnotification.customizedsubject"] =
        "已產生{TRANTYPE} #{TRANID} 的電子文件。{SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "您好！ <br /><br />已產生採購單 #{PONUM} 的電子文件。<br />請參閱附件的電子文件檔案以瞭解明細。<br /><br />感謝您，<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "您好！ <br /><br />已產生{TYPE} #{TRANID} 的電子文件。<br />請參閱附件的電子文件檔案以瞭解明細。<br /><br />感謝您，<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "產生電子文件期間發生錯誤";
    translation["email.generationerrornotification.body"] =
        "產生電子文件期間發生錯誤。<br/>請參閱附件檔案中的交易和錯誤明細清單。";
    translation["email.sendingerrornotification.subject"] =
        "傳送電子文件期間發生錯誤";
    translation["email.sendingerrornotification.body"] =
        "傳送電子文件期間發生錯誤。<br/>請參閱附件檔案中的交易和錯誤明細清單。";
    translation["email.webserviceerror.subject"] = "內送電子文件網路服務通知";
    translation["email.webserviceerror.body"] =
        "<p>您好，</p><p>使用網路服務處理內送電子文件時發生錯誤。<br/>請參閱以下詳細內容。</p>{DETAIL_TABLE}<p>感謝您，<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] = "交易編號";

    return translation;
});
