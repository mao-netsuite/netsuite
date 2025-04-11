define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "详细信息";
    translation["email.attachment.collabel.transactiontype"] = "事务处理类型";
    translation["email.attachment.collabel.internalid"] = "内部 ID";
    translation["email.attachment.collabel.vendor"] = "供应商";
    translation["email.conversionerrornotification.subject"] =
        "转换入站电子凭证过程中出现错误";
    translation["email.conversionerrornotification.body"] =
        "转换入站电子凭证过程中出现错误。<br/>有关出错记录的列表及其详细信息，请查看随附的文件。";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>注意：如果要另一用户（而非账户管理员）接收通知，请在父级子公司记录的“电子凭证通知的收件人”字段中输入该用户的电子邮件地址。";
    translation["email.table.collabel.inboundedocumentid"] = "入站电子凭证 ID";
    translation["email.table.collabel.details"] = "详细信息";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "检查账户许可证过程中出现错误";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。</br>要批量处理电子凭证，请在公司信息页中配置“供免费使用的电子凭证国家/地区”。";
    translation["inboundedocument.logforconversion"] =
        "入站电子凭证已准备好进行转换。";
    translation["inboundedocument.logincomplete"] =
        "入站电子凭证不完整。未选择任何 {FIELD}。";
    translation["inboundedocument.deletenotallowed"] =
        "不允许删除入站电子凭证。";
    translation["inboundedocument.copynotallowed"] = "不允许复制入站电子凭证。";
    translation["inboundedocument.contextunsupported"] =
        "入站电子凭证只支持 UI 和 SuiteScript 环境。";
    translation["inboundedocument.invalidxmlfile"] =
        "所选 XML 文件参考不是有效的 XML 文件。请确保所选文件的扩展名是 .xml。";
    translation["inboundedocument.invalidpdffile"] =
        "所选 PDF 文件参考不是有效的 PDF 文件。请确保所选文件的扩展名是 .pdf。";
    translation["inboundedocument.invalidxml"] =
        "所选 XML 文件参考不是格式正确的 XML 文档。";
    translation["inboundedocument.convert.button"] = "转换";
    translation["inboundedocument.convert.information"] =
        "正在转换此入站电子凭证。";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "已在转换此入站电子凭证。";
    translation["inboundedocument.cancel.button"] = "取消电子凭证";
    translation["inboundedocument.cancel.confirmation"] =
        "是否确定要取消此入站电子凭证？";
    translation["inboundedocument.cancel.failed"] =
        "取消失败，因为入站电子凭证记录的状态是 '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "取消过程中出现错误。要了解详细信息，请查看“电子凭证”子标签上的“电子凭证审计跟踪”。";
    translation["inboundedocument.cancel.complete"] = "已取消电子凭证。";
    translation["inboundedocument.preview.button"] = "查看 XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing SuiteApp 的活动许可证。要将此电子凭证转换为事务处理，请联系账户管理员在“公司信息”页上的“供免费使用的电子凭证国家/地区”字段中指定一个国家/地区。";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing SuiteApp 的活动许可证。要将此电子凭证转换为事务处理，请联系 NetSuite 客户经理购买许可证。";
    translation["inboundedocument.msg.nobillingcountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing SuiteApp 的活动许可证。要将此电子凭证转换为事务处理，请设置所选供应商的默认开票地址。";
    translation["validationplugin.contextunsupported"] =
        "入站电子凭证验证插件只支持 UI 和 SuiteScript 环境。";
    translation["validationplugin.pluginimplementation"] =
        "入站电子凭证验证插件实施";
    translation["validationplugin.pluginimplementationhelp"] =
        "选择入站电子凭证验证插件实施。";
    translation["validationplugin.scriptbannermessage"] =
        "入站电子凭证验证应为自定义插件实施。请将现有验证脚本重新创建为“入站验证插件”类型的新自定义插件实施";
    translation["ei.conversion.defaulterror"] =
        "转换过程中出现错误。要了解详细信息，请查看“电子凭证”子标签上的“电子凭证审计跟踪”。";
    translation["ei.conversion.inactivevendor"] =
        "无法转换此入站电子凭证，因为选定的供应商处于非活动状态。未更新“电子凭证状态”字段，且未创建审计跟踪。请清除供应商记录中的“非活动”框，然后尝试重新转换电子凭证。";
    translation["ei.conversion.inactivecustomer"] =
        "无法转换此入站电子凭证，因为选定的客户处于非活动状态。未更新“电子凭证状态”字段，且未创建审计跟踪。请清除客户记录中的“非活动”框，然后尝试重新转换电子凭证。";
    translation["ei.conversion.conversioncomplete"] = "已转换电子凭证。";
    translation["ei.conversion.conversionlogbulk"] =
        "此入站电子凭证包含在批量转换中，并已转换为内部 ID 为 {INTERNALID}、类型为 '{TYPE}' 的事务处理。";
    translation["ei.conversion.conversionlog"] =
        "此入站电子凭证已转换为内部 ID 为 {INTERNALID}、类型为 '{TYPE}' 的事务处理";
    translation["ei.conversion.failedconversionlogbulk"] =
        "批量转换过程\n使用的电子凭证模板：{TEMPLATENAME}\n错误范围：{ERRORSCOPE}\n错误详细信息：{ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "使用的电子凭证模板：{TEMPLATENAME}\n错误范围：{ERRORSCOPE}\n错误详细信息：{ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "解析失败。请检查入站电子凭证的字段映射。";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "转换失败。";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "验证失败。";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "转换失败，因为入站电子凭证记录的状态是 '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "转换不支持有非活动客户的入站电子凭证。";
    translation["ei.conversion.inactivevendor.converter"] =
        "转换不支持有非活动供应商的入站电子凭证。";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "以下供应商代码未与任何货品记录关联：{ITEMLIST}。";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "以下供应商名称/代码未与任何货品记录关联：{ITEMLIST}。";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "以下供应商代码与多个货品记录关联：{ITEMLIST}。请修改货品记录，并确保供应商代码对每个供应商的每一件货品唯一。";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "以下供应商名称/代码与多个货品记录关联：{ITEMLIST}。请修改货品记录，并确保供应商名称/代码对每个供应商的每一件货品唯一。";
    translation["ei.conversion.refnumnotfound"] =
        "入站电子凭证中缺少必需的参考编号。取消此电子凭证，并提交另一个电子凭证，该电子凭证包含参考编号的 XML 元素（映射到 tranid 字段）。";
    translation["ei.conversion.refnumexists"] =
        "已存在具有相同参考编号的供应商账单。取消此电子凭证，并提交另一个电子凭证，该电子凭证包含映射到 tranid 字段的 XML 元素的正确参考编号值。";
    translation["ei.conversion.vendorcodenotfound"] =
        "电子凭证模板中缺少 vendorcode 字段。修改此电子凭证模板，或选择另一个包含 vendorcode 字段映射的模板。";
    translation["ei.conversion.novendorcodevalue"] =
        "至少一件货品没有供应商代码。取消此电子凭证，并提交另一个电子凭证，该电子凭证包含映射到供应商代码字段的 XML 元素的正确值。";
    translation["ei.conversion.vendornamenotfound"] =
        "电子凭证模板中缺少 vendorname 字段。修改此电子凭证模板，或选择另一个包含 vendorname 字段映射的模板。";
    translation["ei.conversion.novendornamevalue"] =
        "至少一件货品没有供应商名称/代码。取消此电子凭证，并提交另一个电子凭证，该电子凭证包含映射到供应商名称/代码字段的 XML 元素的正确值。";
    translation["ei.conversion.sourcetransnotfound"] =
        "在系统中未找到记录 ({TRANSTYPE}#{TRANSID})。取消此电子凭证，并提交另一个电子凭证，该电子凭证包含映射到 createdfrom 字段的 XML 元素的正确值。";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "记录 ({TRANSTYPE}#{TRANSID}) 已分配给另一个实体。选择正确的实体，并转换此电子凭证。";
    translation["ei.conversion.novendorexpenseaccount"] =
        "该供应商没有默认的费用科目，这是转换费用账单所必需的。要继续转换，请在供应商记录的“默认费用科目”字段中设置一个值。";
    translation["ei.conversion.nolinktopo"] =
        "入站电子凭证没有包含在参考采购订单中的货品或费用。如果参考采购订单可以转换，请检查其状态。如果可以转换，请取消此电子凭证，并提交另一个电子凭证，该电子凭证包含映射到 createdfrom 字段的 XML 元素的正确值。";
    translation["inbound.formtitle"] = "转换入站电子凭证";
    translation["inbound.search"] = "搜索";
    translation["inbound.convert"] = "转换";
    translation["inbound.return"] = "返回到标准";
    translation["inbound.vendor"] = "供应商";
    translation["inbound.datefrom"] = "开始创建日期";
    translation["inbound.dateto"] = "结束创建日期";
    translation["inbound.vendorhelp"] =
        "选择供应商，搜索结果将包含其失败的入站电子凭证。";
    translation["inbound.datefromhelp"] =
        "选择开始日期来定义一个时间段，搜索结果将包含在该时间段中创建的失败入站电子凭证。";
    translation["inbound.datetohelp"] =
        "选择结束日期来定义一个时间段，搜索结果将包含在该时间段中创建的失败入站电子凭证。";
    translation["inbound.inboundedocfieldgroup"] = "失败入站电子凭证搜索筛选器";
    translation["inbound.sublist.sublistname"] = "失败入站电子凭证的搜索结果";
    translation["inbound.sublist.internalid"] = "内部 ID";
    translation["inbound.sublist.vendor"] = "供应商";
    translation["inbound.sublist.refnum"] = "参考编号";
    translation["inbound.sublist.ponum"] = "采购订单号";
    translation["inbound.sublist.datecreated"] = "创建日期";
    translation["inbound.sublist.edoctemplate"] = "电子凭证模板";
    translation["inbound.msg.conversionongoing"] =
        "当前正在转换电子凭证。此过程完成时，您将收到电子邮件。";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "无法使用选定的标准执行搜索，因为当前已在转换该日期范围 ({DATECREATED_FROM} - {DATECREATED_TO}) 内的入站电子凭证。您必须更改搜索标准，或者在转换完此电子凭证后重试。";
    translation["inbound.invaliddates"] =
        "“开始创建日期”不得晚于“结束创建日期”。请更改日期，以使“开始创建日期”早于“结束创建日期”。";
    translation["inbound.configurefreecountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing SuiteApp 的活动许可证。要批量转换电子凭证，请联系账户管理员在“公司信息”页上配置“供免费使用的电子凭证国家/地区”。";
    translation["portlet.title"] = "电子凭证";
    translation["portlet.outboundforgeneration"] = "待生成的出站电子凭证";
    translation["portlet.outboundforsending"] = "待发送的出站电子凭证";
    translation["portlet.outboundwitherrors"] = "有错误的出站电子凭证";
    translation["portlet.outboundsendinglink"] = "发送失败的出站电子凭证";
    translation["portlet.inboundforconversion"] = "待转换的入站电子凭证";
    translation["portlet.inboundconvertfailed"] = "转换失败的入站电子凭证";
    translation["portlet.inboundincomplete"] = "不完整的入站电子凭证";
    translation["portlet.inbounduploadlink"] = "上传入站电子凭证";
    translation["portlet.outboundforcertification"] = "待认证的出站电子凭证";
    translation["portlet.outboundcertifiedforsending"] = "待发送的出站电子凭证";
    translation["inbound.webservice.response.success"] =
        "已成功创建 ID 为 {ID} 的入站电子凭证。";
    translation["inbound.webservice.response.novendor"] =
        "没有供应商与 Web 服务 ID {IDENTIFIER} 关联。确保使用正确的 Web 服务 ID。";
    translation["inbound.webservice.response.multiplevendor"] =
        "已成功创建 ID 为 {ID} 的入站电子凭证。但是，多个供应商与 Web 服务 ID {IDENTIFIER} 关联。";
    translation["inbound.webservice.error.templateerror"] =
        "入站电子凭证不完整，因为无法确定正确的模板。请在入站电子凭证记录中选择模板，或在电子凭证模板记录中设置 XSD 以启用模板自动选择。";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "入站电子凭证不完整，因为无法确定正确的供应商。请在入站电子凭证记录中选择供应商，或在关联的供应商记录中设置 Web 服务 ID。";
    translation["inbound.webservice.error.missingkeyerror"] =
        "缺少以下密钥：{KEYS}。您必须在 Web 服务请求中提供这些密钥。";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Web 服务请求的主体必须是 JSON 对象或使用 Content-Type: 'application/json' 的 JSON 对象数组。";
    translation["transaction.contactnoemail"] =
        "以下电子凭证收件人的联系人记录中没有电子邮件地址：{CONTACTNAMES}。";
    translation["transaction.norecipients"] =
        "此事务处理没有电子凭证收件人。要通过电子邮件发送电子凭证，必须在电子凭证收件人列表中至少添加一个联系人。";
    translation["transaction.maxrecipientexceeded"] =
        "添加的电子邮件收件人数量已超过限制。最多可以添加 10 个电子邮件收件人。";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "仅处理以下事务处理类型：";
    translation["ei.prefs.formtitle"] = "电子凭证首选项";
    translation["ei.prefs.information.about.certify.skip"] =
        "如果未定义认证发送方式，或者认证发送方式对该事务处理不适用，则跳过认证步骤。";
    translation["ei.prefs.label.sublist.automati.ei"] = "自动电子开票";
    translation["ei.prefs.label.automatic.type.selected"] =
        "电子凭证自动化类型";
    translation["ei.prefs.text.option.comb.disabled"] = "禁用";
    translation["ei.prefs.text.option.comb.gcs"] = "生成, 认证, 发送";
    translation["ei.prefs.text.option.comb.gc"] = "生成, 认证";
    translation["ei.prefs.text.option.comb.cs"] = "认证, 发送";
    translation["ei.prefs.btn.label.cancel"] = "取消";
    translation["ei.prefs.btn.label.save"] = "保存";
    translation["ei.prefs.msg.confirm.save"] =
        "是否要保存对电子凭证首选项的更改？";
    translation["ei.prefs.msg.success.save"] = "保存电子凭证首选项成功。";
    translation["ei.prefs.msg.failed.save"] = "保存电子凭证首选项失败。";
    translation["ei.prefs.insufficient.permission.details"] =
        "对此页面的访问权限受到限制。要请求访问权限，请与管理员联系。";
    translation["ei.eip.msg.completed"] = "电子凭证处理已完成。";
    translation["ei.eip.msg.failed"] =
        "电子凭证处理失败。有关更多详细信息，请参见“电子凭证审计跟踪”。";
    translation["ei.eip.msg.processing"] = "正在处理电子凭证。";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "已在处理电子凭证。";
    translation["license.notinstalled"] =
        "您的账户中没有 NetSuite SuiteApps License Client。请安装此 SuiteApp 来访问所有 Electronic Invoicing 功能。";
    translation["outbound.formtitle"] = "发送失败的电子凭证";
    translation["outbound.search"] = "搜索";
    translation["outbound.send"] = "发送";
    translation["outbound.return"] = "返回到标准";
    translation["outbound.customer"] = "客户";
    translation["outbound.vendor"] = "供应商";
    translation["outbound.subsidiary"] = "子公司";
    translation["outbound.type"] = "事务处理类型";
    translation["outbound.datefrom"] = "事务处理开始日期";
    translation["outbound.dateto"] = "事务处理结束日期";
    translation["outbound.subshelp"] =
        "选择一个子公司以只显示属于该子公司的事务处理。";
    translation["outbound.custhelp"] =
        "选择一个客户以只显示属于该客户的事务处理。如果未选择客户，则搜索结果将显示属于该子公司的所有事务处理，而不考虑客户。";
    translation["outbound.vendorhelp"] =
        "选择一个供应商以只显示属于该供应商的事务处理。如果未选择供应商，则搜索结果将显示属于该子公司的所有事务处理，而不考虑供应商。";
    translation["outbound.entitytypehelp"] =
        "选择客户或供应商实体类型。这将启用下面的对应下拉列表。";
    translation["outbound.typehelp"] =
        "为要发送的每个电子凭证选择一个或多个事务处理类型。要选择多个事务处理类型，请在按住 Ctrl 键的同时选择每个事务处理。<br /><br />如果未选择事务处理类型，则搜索结果将显示已准备好发送的所有电子凭证，而不考虑事务处理类型。";
    translation["outbound.datefromhelp"] =
        "要查看在特定日期范围内创建的事务处理的列表，请选择一个日期来定义该日期范围的开始日期。";
    translation["outbound.datetohelp"] =
        "要查看在特定日期范围内创建的事务处理的列表，请选择一个日期来定义该日期范围的结束日期。";
    translation["outbound.entityfieldgroup"] = "实体搜索筛选器";
    translation["outbound.filtersfieldgroup"] = "事务处理搜索筛选器";
    translation["outbound.entitytypeinlinehelp"] = "选择实体类型：";
    translation["outbound.invalidtypetitle"] = "无效的事务处理类型";
    translation["outbound.invalidtype"] =
        "当前不支持以下事务处理类型：{TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "以下事务处理类型对所选实体无效：{TRANSACTIONTYPES}。为您选择的实体选择合适的事务处理类型。";
    translation["outbound.invaliddates"] =
        "“事务处理开始日期”不得晚于“事务处理结束日期”。更改日期，以使“事务处理开始日期”早于“事务处理结束日期”。";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "无法使用选定的标准执行搜索，因为当前已在发送子公司 ({SUBSIDIARY}) 在该日期范围 ({TRANDATE_FROM} - {TRANDATE_TO}) 内的事务处理的电子凭证。您必须更改搜索标准，或者在发送完此电子凭证后重试。";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "无法使用选定的标准执行搜索，因为当前已在发送该日期范围 ({TRANDATE_FROM} - {TRANDATE_TO}) 内的事务处理的电子凭证。您必须更改搜索标准，或者在发送完此电子凭证后重试。";
    translation["outbound.sublist.trannum"] = "事务处理编号";
    translation["outbound.sublist.trantype"] = "事务处理类型";
    translation["outbound.sublist.customer"] = "客户";
    translation["outbound.sublist.vendor"] = "供应商";
    translation["outbound.sublist.subsidiary"] = "子公司";
    translation["outbound.sublist.trandate"] = "事务处理日期";
    translation["outbound.sublist.memo"] = "备注";
    translation["outbound.sublist.template"] = "模板";
    translation["outbound.sublist.sendingmethod"] = "发送方式";
    translation["outbound.sublist.sublistname"] =
        "要发送的失败出站电子凭证的结果";
    translation["outbound.msg.sendingongoing"] =
        "当前正在发送电子凭证。发送完成后，您会收到电子邮件。";
    translation["outbound.configurefreecountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要批量发送电子凭证，请联系账户管理员在公司信息页中配置“供免费使用的电子凭证国家/地区”。";
    translation["outbound.entitysend"] = "发送到实体";
    translation["outbound.certifysend"] = "发送进行认证";
    translation["outbound.sendingtypehelp"] =
        "选择“发送到实体”或“发送进行认证”。这将列出要发送的对应事务处理。";
    translation["customer.noemail"] =
        "此客户没有电子邮件地址。请在客户记录中输入有效的电子邮件地址，以便通过电子邮件发送电子凭证。";
    translation["customer.contactnoemail"] =
        "以下电子凭证收件人的联系人记录中没有电子邮件地址：{CONTACTNAMES}。";
    translation["customer.norecipients"] =
        "此客户没有电子凭证收件人。要通过电子邮件向此客户发送电子凭证，必须在电子凭证收件人列表中至少添加一个联系人。";
    translation["customer.arrayrequired"] = "需要验证联系人数组。";
    translation["customer.parameternotarray"] = "联系人参数不是数组。";
    translation["customer.maxrecipientexceeded"] =
        "已超出电子邮件收件人的最大数量。最多只能选择 10 个电子邮件收件人。";
    translation["vendor.noemail"] =
        "此供应商没有电子邮件地址。请在供应商记录中输入有效的电子邮件地址，以便通过电子邮件发送电子凭证。";
    translation["vendor.contactnoemail"] =
        "以下电子凭证收件人的联系人记录中没有电子邮件地址：{CONTACTNAMES}。";
    translation["vendor.norecipients"] =
        "此供应商没有电子凭证收件人。要通过电子邮件向此供应商发送电子凭证，必须在电子凭证收件人列表中至少添加一个联系人。";
    translation["vendor.maxrecipientexceeded"] =
        "已超出电子邮件收件人的最大数量。最多只能选择 10 个电子邮件收件人。";
    translation["vendor.nosenders"] =
        "此供应商没有电子凭证电子邮件发件人。要通过电子邮件接收此供应商发来的电子凭证，必须在“供应商电子凭证电子邮件发件人”列表中至少输入一个电子邮件地址。";
    translation["vendor.existingsender"] = "发件人电子邮件地址已经存在。";
    translation["vendor.existingdomain"] =
        "另一个供应商已在使用此发件人电子邮件域。";
    translation["vendor.existingidentifier"] =
        "另一个供应商已在使用此 Web 服务 ID。请输入其他 Web 服务 ID。";
    translation["customeremailrecipient.contextunsupported"] =
        "“客户电子凭证电子邮件收件人”只支持以下环境：UI、CSV、SuiteScript 和 Web 服务。";
    translation["vendoremailrecipient.contextunsupported"] =
        "“供应商电子凭证电子邮件收件人”只支持以下环境：UI、CSV、SuiteScript 和 Web 服务。";
    translation["vendoremailsender.contextunsupported"] =
        "“供应商电子凭证电子邮件发件人”只支持以下环境：UI、CSV、SuiteScript 和 Web 服务。";
    translation["template.incorrectregex"] =
        "REGEX 字段中的正则表达式错误。必须使用正确的语法。";
    translation["template.invalidjson"] =
        "您未在“出站电子凭证的模板”字段中提供格式正确的 JSON。单击“确定”继续操作，或者单击“取消”停留在当前页面上。";
    translation["template.invalidxml"] =
        "XML 模板包含错误。XML 格式必须是正确格式。";
    translation["template.templaterequired"] =
        "所选出站事务处理类型缺少模板内容。请在“出站电子凭证”字段中提供有效的 XML 或 JSON 模板内容，然后重试。";
    translation["template.mappingrequired"] =
        "您选择了入站事务处理类型，但是字段映射缺少 JSON 内容。请在“入站电子凭证的字段映射”字段中输入 JSON 内容。";
    translation["template.templateorjsonrequired"] =
        "缺少字段值。对于出站事务处理，请在“出站电子凭证的模板”字段中提供有效的 XML 或 JSON 内容。对于入站事务处理，请在“入站电子凭证的字段映射”字段中输入 JSON 内容。";
    translation["template.invalidxsdfile"] =
        "所选 XSD 文件不是有效的 XSD 文件。请确保所选文件的扩展名是 .xsd。";
    translation["template.contextunsupported"] =
        "电子凭证模板只支持 UI 和 SuiteScript 环境。";
    translation["template.supportedtranstypefldhelp"] =
        "选择此模板支持的一个或多个事务处理类型。要选择多个事务处理类型，请在按住 Ctrl 键的同时选择事务处理类型。<br /><br />如果无法选择事务处理类型，则表示该模板已经分配给相同事务处理类型的一个或多个事务处理记录。要启用事务处理类型选择，请从事务处理记录中删除模板。<br /><br />您还可以将此模板分配给入站电子凭证，这样做将禁用“事务处理类型”字段。";
    translation["template.eistatus"] =
        "限制对具有如下电子凭证状态的事务处理进行编辑";
    translation["template.supportedeistatusfieldhelp"] =
        "事务处理与此模板关联时，具有您所选电子凭证状态的事务处理将不可编辑。您可以选择多个电子凭证状态。";
    translation["template.invalidschemaordependency"] =
        "模式是结构不正确的 XSD，或者找不到相关模式。";
    translation["template.xmldoesnotconformtoschema"] =
        "模板的 XML 不符合提供的 XSD 或模式。";
    translation["template.xmldomexception"] = "输入 XML 字符串格式错误。";
    translation["template.missingreqdargument"] = "缺少用于出站验证的 XSD。";
    translation["template.xsdvalidationexception"] =
        "XSD 验证过程中出现未知异常。";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD 模式文件夹无效或缺失。";
    translation["invoice.generatebtn"] = "生成电子凭证";
    translation["invoice.sendbtn"] = "发送电子凭证";
    translation["invoice.sendcertifybtn"] = "认证电子凭证";
    translation["invoice.eipbtn"] = "处理电子凭证";
    translation["invoice.loguntagged"] =
        "已删除电子凭证模板。事务处理已取消标记待生成电子凭证。";
    translation["invoice.logforgenerate"] = "事务处理已准备好生成电子凭证。";
    translation["invoice.invalidtemplatesub"] =
        "事务处理的子公司对于选定的电子凭证模板而言无效。请选择其他电子凭证模板。";
    translation["invoice.templateremovalerror"] =
        "不允许删除已发送电子凭证的电子凭证模板。";
    translation["ei.sending.currentlysending"] =
        "当前正在发送电子凭证。完成发送可能需要几分钟的时间。请勿再次单击“发送电子凭证”按钮，这会中断发送过程。发送电子凭证后，会重新加载页面。";
    translation["ei.sending.notready"] =
        "此电子凭证尚未准备好进行发送。必须先单击“生成电子凭证”来生成电子凭证。";
    translation["ei.sending.alreadysent"] = "已发送此事务处理。";
    translation["ei.sending.norecipients"] =
        "无法发送电子凭证，因为客户没有电子凭证收件人。必须先在客户记录中选择电子凭证收件人，然后才能通过电子邮件发送此电子凭证。";
    translation["ei.sending.indivcustnoemail"] =
        "无法发送电子凭证，因为客户没有电子邮件地址。必须先在客户记录中选择电子邮件地址，然后才能通过电子邮件发送此电子凭证。";
    translation["ei.sending.norecipients.vendor"] =
        "无法发送电子凭证，因为供应商没有电子凭证收件人。必须先在供应商记录中选择电子凭证收件人，然后才能通过电子邮件发送此电子凭证。";
    translation["ei.sending.indivvendnoemail"] =
        "无法发送电子凭证，因为供应商没有电子邮件地址。必须先在供应商记录中选择电子邮件地址，然后才能通过电子邮件发送此电子凭证。";
    translation["ei.sending.invalidmethod"] =
        "为 {TYPE} #{INVOICENUMBER} 选择有效的发送方式。";
    translation["ei.sending.sentdetails"] =
        "发件人：{SENDER}\n收件人：{RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "电子凭证发件人 ({EMPLOYEENAME}) 没有电子邮件地址。请在员工记录中输入有效的电子邮件地址。";
    translation["ei.sending.recipientnoemail"] =
        "与此事务处理关联的电子凭证的一个或多个收件人没有电子邮件地址。请确认此客户的收件人都具备有效的电子邮件地址。";
    translation["ei.sending.recipientnoemail.vendor"] =
        "与此事务处理关联的电子凭证的一个或多个收件人没有电子邮件地址。请确认此供应商的收件人都具备有效的电子邮件地址。";
    translation["ei.sending.defaulterror"] =
        "发送电子凭证过程中出现错误。要了解详细信息，请查看“电子凭证”子标签上的“电子凭证审计跟踪”。";
    translation["ei.sending.inactivecustomer"] =
        "无法发送此事务处理的电子凭证，因为选定的客户处于非活动状态。未更新“电子凭证状态”字段，且未创建审计跟踪。请清除客户记录中的“非活动”框，然后尝试重新发送电子凭证。";
    translation["ei.sending.inactivevendor"] =
        "无法发送此事务处理的电子凭证，因为选定的供应商处于非活动状态。未更新“电子凭证状态”字段，且未创建审计跟踪。请清除供应商记录中的“非活动”框，然后尝试重新发送电子凭证。";
    translation["ei.sending.msg.processcomplete"] = "已发送电子凭证。";
    translation["ei.sending.configurefreecountry"] =
        "您的账户必须有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要将电子凭证批量发送到单个国家/地区，您必须从“公司信息”页上的“供免费使用的电子凭证国家/地区”字段中选择相应国家/地区。";
    translation["ei.sending.inactivecustomer.manager"] =
        "电子凭证不支持有非活动客户的事务处理。";
    translation["ei.sending.inactivevendor.manager"] =
        "电子凭证不支持有非活动供应商的事务处理。";
    translation["ei.sending.certification.defaulterror"] =
        "认证电子凭证过程中出现错误。要了解详细信息，请查看“电子凭证”子标签上的“电子凭证审计跟踪”。";
    translation["ei.sending.certification.msg.processcomplete"] =
        "已发送电子凭证进行认证。";
    translation["ei.generation.generationlogbulk"] =
        "已使用电子凭证模板 '{TEMPLATENAME}' 批量生成电子凭证。";
    translation["ei.generation.generationlog"] =
        "已使用电子凭证模板 '{TEMPLATENAME}' 生成电子凭证。";
    translation["ei.generation.generationwithpdflogbulk"] =
        "已使用电子凭证模板 '{TEMPLATENAME}' 批量生成电子凭证和 PDF 文件。";
    translation["ei.generation.generationwithpdflog"] =
        "已使用电子凭证模板 '{TEMPLATENAME}' 生成电子凭证和 PDF 文件。";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "已使用电子凭证模板 '{TEMPLATENAME}' 批量生成电子凭证。以前为此事务处理生成的 PDF 文件已被删除。";
    translation["ei.generation.generationremovedpdflog"] =
        "已使用电子凭证模板 '{TEMPLATENAME}' 生成电子凭证。以前为此事务处理生成的 PDF 文件已被删除。";
    translation["ei.generation.failedgenerationlogbulk"] =
        "批量生成过程\n使用的电子凭证模板：{TEMPLATENAME}\n错误详细信息：{ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "使用的电子凭证模板：{TEMPLATENAME}\n错误详细信息：{ERROR}";
    translation["ei.generation.defaulterror"] =
        "生成过程中出现错误。要了解详细信息，请查看“电子凭证”子标签上的“电子凭证审计跟踪”。";
    translation["ei.generation.inactivecustomer"] =
        "无法生成此事务处理的电子凭证，因为选定的客户处于非活动状态。未更新“电子凭证状态”字段，且未创建审计跟踪。请清除客户记录中的“非活动”框，然后尝试重新生成电子凭证。";
    translation["ei.generation.inactivevendor"] =
        "无法生成此事务处理的电子凭证，因为选定的供应商处于非活动状态。未更新“电子凭证状态”字段，且未创建审计跟踪。请清除供应商记录中的“非活动”框，然后尝试重新生成电子凭证。";
    translation["ei.generation.msg.processcomplete"] = "已生成电子凭证。";
    translation["ei.generation.configurefreecountry"] =
        "您的账户必须有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要批量生成电子凭证并发送到单个国家/地区，您必须从“公司信息”页上的“供免费使用的电子凭证国家/地区”字段中选择相应国家/地区。";
    translation["ei.generation.inactivecustomer.generator"] =
        "电子凭证不支持有非活动客户的事务处理。";
    translation["ei.generation.inactivevendor.generator"] =
        "电子凭证不支持有非活动供应商的事务处理。";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "已生成电子凭证，并且数字签名成功。";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "生成失败，因为生成的电子凭证既不是格式正确的 XML，也不是格式正确的 JSON。";
    translation["notify.batchownersubject"] = "已完成电子凭证发送";
    translation["notify.batchownerbody"] =
        "您好：<br/><br/>发送电子凭证的请求已完成。<br/>已发送 {SENT} 个电子凭证，共 {TOTAL} 个。要了解详细信息，请查看随附的文件。<br/><br/>谢谢！<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "已生成采购订单 #{PONUM} 的电子凭证";
    translation["notify.recipientcompsubj"] = "{COMPANYNAME} 生成的电子凭证";
    translation["notify.recipientbody"] =
        "您好：<br /><br />{MESSAGE}<br />请查看随附的电子凭证文件。<br /><br />谢谢！<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] = "生成电子凭证过程中出现错误";
    translation["notify.generationerrorbody"] =
        "生成电子凭证过程中出现错误。<br/>有关事务处理列表和错误详细信息，请查看随附的文件。";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "此事务处理的电子凭证已发送。生成新的电子凭证会覆盖之前的电子凭证。是否确定要生成新的电子凭证？";
    translation["transaction.msg.removetemplatealreadysent"] =
        "不允许删除已发送电子凭证的电子凭证模板。";
    translation["transaction.msg.generate.information"] =
        "正在生成此电子凭证。";
    translation["transaction.msg.send.information"] = "正在发送此电子凭证。";
    translation["transaction.msg.send.certify.information"] =
        "正在认证此电子凭证。";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "已在生成此电子凭证。";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "已在发送此电子凭证。";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "已在认证此电子凭证。";
    translation["transaction.msg.uncheckpdf"] =
        "在上次生成电子凭证过程中创建了此事务处理的 PDF 文件。清除此框将在下次生成电子凭证时删除该 PDF 文件。";
    translation["transaction.msg.nofreecountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要生成此事务处理的电子凭证，请联系账户管理员在“公司信息”页上的“供免费使用的电子凭证国家/地区”字段中指定一个国家/地区。";
    translation["transaction.msg.otherbillingcountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要生成此事务处理的电子凭证，请联系 NetSuite 客户经理购买许可证。";
    translation["transaction.msg.nobillingcountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要生成此事务处理的电子凭证，请指明此事务处理的开票地址。";
    translation["transaction.msg.noshippingcountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要生成此事务处理的电子凭证，请指明此事务处理的发运地址。";
    translation["transaction.msg.nocustomercountry"] =
        "此账户没有在多个国家/地区使用 Electronic Invoicing 的活动许可证。要生成此事务处理的电子凭证，请指明此事务处理的客户默认开票地址。";
    translation["transaction.msg.blockededittransaction"] =
        "当前的电子凭证状态阻止编辑此事务处理。请参阅附加的 EI 模板。";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "将“内容类型”字段中的值从 XML 更改为其他类型会删除所有 XML 验证器。是否确定要更改内容类型？";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "只能添加 XML 内容类型的验证器。";
    translation["transaction.msg.xmlvalidatorexists"] =
        "列表中已存在此验证器。";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "电子凭证模板验证器只支持 UI 和 SuiteScript 环境。";
    translation["standarddocument.default.alreadyexist"] =
        "已存在 {DEFAULT_DOCUMENT_STANDARD} 记录。不能创建同名的文档包记录。请重命名文档包记录，然后重试。";
    translation["standarddocument.default.editnotallowed"] =
        "不允许编辑 {DEFAULT_DOCUMENT_STANDARD} 记录的“名称”和“说明”。";
    translation["standarddocument.default.deletenotallowed"] =
        "不允许删除 {DEFAULT_DOCUMENT_STANDARD} 记录。";
    translation["standarddocument.contextunsupported"] =
        "电子凭证包只支持 UI、CSV 导入和 SuiteScript 环境。";
    translation["sendingmethod.default.alreadyexist"] =
        "已存在 {DEFAULT_SENDING_METHOD_NAME} 发送方式记录。不能创建同名的发送方式记录。请重命名发送方式记录，然后重试。";
    translation["sendingmethod.default.editnotallowed"] =
        "不允许编辑 {DEFAULT_SENDING_METHOD_NAME} 发送方式记录。";
    translation["sendingmethod.default.deletenotallowed"] =
        "不允许删除 {DEFAULT_SENDING_METHOD_NAME} 发送方式记录。";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "“事务处理类型”字段已禁用，因为此发送方式已被分配给一个或多个事务处理记录。要编辑此发送方式，请先将其从事务处理记录中删除以启用“事务处理类型”字段，然后重试。";
    translation["sendingmethod.contextunsupported"] =
        "电子凭证发送方式只支持 UI 和 SuiteScript 环境。";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "选择此发送方式支持的一个或多个事务处理类型。要选择多个事务处理类型，请在按住 Ctrl 键的同时选择事务处理类型。<br /><br />如果无法选择一个或多个事务处理类型，则表示该发送方式已经分配给该事务处理类型的一个或多个事务处理记录。必须先从事务处理记录中删除发送方式，然后才能选择事务处理类型。";
    translation["sendingmethod.pluginimplementation"] =
        "电子凭证发送方式插件实施";
    translation["sendingmethod.pluginimplementationhelp"] =
        "选择发送方式插件实施";
    translation["sendingmethod.scriptbannermessage"] =
        "发送方式应为自定义插件实施。请将现有发送方式脚本重新创建为“发送插件”类型的新自定义插件实施。";
    translation["customdatasource.pluginimplementation"] =
        "自定义数据源插件实施";
    translation["customdatasource.pluginimplementationhelp"] =
        "选择自定义数据源插件实施";
    translation["digitalsignature.pluginimplementation"] = "数字签名插件实施";
    translation["digitalsignature.pluginimplementationhelp"] =
        "选择插件实施。如果要对电子凭证进行数字签名，那么此字段是必填字段。";
    translation["digitalsignature.identifierlabel"] =
        "此电子凭证已进行数字签名";
    translation["digitalsignature.successlog"] =
        "生成的电子凭证已进行数字签名。";
    translation["digitalsignature.failurelog"] =
        "生成的电子凭证未进行数字签名。";
    translation["digitalsignature.pluginfailedmessage"] =
        "数字签名插件实施返回失败状态。";
    translation["digitalsignature.plugininvalidresult"] =
        "数字签名插件实施返回的结果无效。";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "入站自定义数据源插件实施";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "选择入站自定义数据源插件实施。";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "入站自定义数据源插件实施的结果无效。";
    translation["outboundvalidation.pluginimplementation"] = "出站验证插件实施";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "选择出站电子凭证验证插件实施。这会验证出站电子凭证。";
    translation["outboundvalidation.successlog"] = "出站验证成功。";
    translation["outboundvalidation.failurelog"] = "出站验证失败。";
    translation["outboundvalidation.pluginfailedmessage"] =
        "出站验证插件实施返回失败状态。";
    translation["outboundvalidation.plugininvalidresult"] =
        "出站验证插件实施返回的结果无效。";
    translation["template.msg.cannotedittransactiontype"] =
        "“事务处理类型”字段已禁用，因为此模板已被分配给一个或多个事务处理记录。要编辑此模板，请先将其从事务处理记录中删除以启用“事务处理类型”字段，然后重试。还可以将此模板分配给入站电子凭证，这样做将禁用“事务处理类型”字段。";
    translation["template.msg.forcetocopymessage"] =
        "您无法编辑默认电子凭证模板。您可以使用“操作”中的“制作副本”选项来复制它，或创建一个新模板。";
    translation["template.msg.warningoneditmessage"] =
        "这是默认电子凭证模板。在更新 SuiteApp 时，对该模板所做的所有更改都将丢失或被覆盖。";
    translation["email.batchownernotification.subject"] = "已完成电子凭证发送";
    translation["email.batchownernotification.body"] =
        "您好：<br/><br/>您的电子凭证已发送。<br/>已发送 {SENT} 个电子凭证，共 {TOTAL} 个。要了解详细信息，请查看随附的文件。<br/><br/>谢谢！<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "已完成电子凭证转换";
    translation["email.batchownerconvertnotification.body"] =
        "您好：<br/><br/>您的电子凭证已转换。<br/>已转换 {CONVERTED} 个电子凭证，共 {TOTAL} 个。要了解详细信息，请查看随附的文件。<br/><br/>谢谢！<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "已生成采购订单 #{PONUM} 的电子凭证";
    translation["email.recipientnotification.subject"] =
        "来自 {COMPANYNAME} 的电子凭证";
    translation["email.recipientnotification.customizedsubject"] =
        "已生成 {TRANTYPE} #{TRANID} 的电子凭证。{SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "您好：<br /><br />已生成采购订单 #{PONUM} 的电子凭证。<br />要了解详细信息，请查看随附的电子凭证文件。<br /><br />谢谢！<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "您好：<br /><br />已生成 {TYPE} #{TRANID} 的电子凭证。<br />要了解详细信息，请查看随附的电子凭证文件。<br /><br />谢谢！<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "生成电子凭证过程中出现错误";
    translation["email.generationerrornotification.body"] =
        "生成电子凭证过程中出现错误。<br/>有关事务处理列表和错误详细信息，请查看随附的文件。";
    translation["email.sendingerrornotification.subject"] =
        "发送电子凭证过程中出现错误";
    translation["email.sendingerrornotification.body"] =
        "发送电子凭证过程中出现错误。<br/>有关事务处理列表和错误详细信息，请查看随附的文件。";
    translation["email.webserviceerror.subject"] = "入站电子凭证 Web 服务通知";
    translation["email.webserviceerror.body"] =
        "<p>您好：</p><p>在使用 Web 服务处理入站电子凭证时出现错误。<br/>请参见以下详细信息。</p>{DETAIL_TABLE}<p>谢谢！<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] = "事务处理编号";

    return translation;
});
