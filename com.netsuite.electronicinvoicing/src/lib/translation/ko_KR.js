define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "세부정보";
    translation["email.attachment.collabel.transactiontype"] = "트랜잭션 유형";
    translation["email.attachment.collabel.internalid"] = "내부 ID";
    translation["email.attachment.collabel.vendor"] = "공급자";
    translation["email.conversionerrornotification.subject"] =
        "인바운드 전자문서 변환 중에 오류가 발생했습니다.";
    translation["email.conversionerrornotification.body"] =
        "인바운드 전자문서 변환 중에 오류가 발생했습니다.<br/>오류가 있는 레코드의 목록 및 해당 세부정보에 대한 내용은 첨부 파일을 참조하십시오.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>참고: 계정 관리자 대신 다른 사용자가 통지를 수신하도록 하려면 상위 관계사 레코드에 있는 전자문서 통지의 받는사람 필드에 해당 사용자의 이메일 주소를 입력하십시오.";
    translation["email.table.collabel.inboundedocumentid"] =
        "인바운드 전자문서 ID";
    translation["email.table.collabel.details"] = "세부정보";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "계정의 라이센스 확인 중 오류가 발생했습니다.";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다.</br>전자문서를 대량으로 처리하려면 회사 정보 페이지에서 전자문서 무료 사용 국가를 구성하십시오.";
    translation["inboundedocument.logforconversion"] =
        "인바운드 전자문서를 변환할 준비가 되었습니다.";
    translation["inboundedocument.logincomplete"] =
        "인바운드 전자문서가 미완료 상태입니다. {FIELD}이(가) 선택되지 않았습니다.";
    translation["inboundedocument.deletenotallowed"] =
        "인바운드 전자문서의 삭제는 허용되지 않습니다.";
    translation["inboundedocument.copynotallowed"] =
        "인바운드 전자문서의 복사는 허용되지 않습니다.";
    translation["inboundedocument.contextunsupported"] =
        "인바운드 전자문서는 UI와 SuiteScript 컨텍스트만 지원합니다.";
    translation["inboundedocument.invalidxmlfile"] =
        "선택한 XML 파일 참조가 유효한 XML 파일이 아닙니다. 선택한 파일에 .xml 확장자가 있는지 확인하십시오.";
    translation["inboundedocument.invalidpdffile"] =
        "선택한 PDF 파일 참조가 유효한 PDF 파일이 아닙니다. 선택한 파일에 .pdf 확장자가 있는지 확인하십시오.";
    translation["inboundedocument.invalidxml"] =
        "선택한 XML 파일 참조가 정확한 형식의 XML 문서가 아닙니다.";
    translation["inboundedocument.convert.button"] = "변환";
    translation["inboundedocument.convert.information"] =
        "이 인바운드 전자문서 변환이 진행 중입니다.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "이 인바운드 전자문서 변환이 이미 진행 중입니다.";
    translation["inboundedocument.cancel.button"] = "전자문서 취소";
    translation["inboundedocument.cancel.confirmation"] =
        "이 인바운드 전자문서를 취소하시겠습니까?";
    translation["inboundedocument.cancel.failed"] =
        "인바운드 전자문서 레코드의 상태가 '{STATUS}'이므로 취소가 실패했습니다.";
    translation["inboundedocument.cancel.defaulterror"] =
        "취소 중에 오류가 발생했습니다. 자세한 내용은 전자문서 하위 탭에서 전자문서 감사 추적을 확인하십시오.";
    translation["inboundedocument.cancel.complete"] =
        "전자문서가 취소되었습니다.";
    translation["inboundedocument.preview.button"] = "XML 보기";
    translation["inboundedocument.msg.nofreecountry"] =
        "이 계정에 여러 국가에서 전자 송장 SuiteApp을 사용할 수 있는 활성 라이센스가 없습니다. 이 전자문서를 트랜잭션으로 변환하려면 계정 관리자에게 문의하여 회사 정보 페이지에서 전자문서 무료 사용 국가 필드에 국가를 지정하십시오.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "이 계정에 여러 국가에서 전자 송장 SuiteApp을 사용할 수 있는 활성 라이센스가 없습니다. 이 전자문서를 트랜잭션으로 변환하려면 NetSuite 계정 관리자에게 문의하여 라이센스를 구매하십시오.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "이 계정에 여러 국가에서 전자 송장 SuiteApp을 사용할 수 있는 활성 라이센스가 없습니다. 이 전자문서를 트랜잭션으로 변환하려면 선택한 공급자의 기본 청구 주소를 설정하십시오.";
    translation["validationplugin.contextunsupported"] =
        "인바운드 전자문서 검증 플러그인은 UI와 SuiteScript 컨텍스트만 지원합니다.";
    translation["validationplugin.pluginimplementation"] =
        "인바운드 전자문서 검증 플러그인 구현";
    translation["validationplugin.pluginimplementationhelp"] =
        "인바운드 전자문서 검증 플러그인 구현을 선택하십시오.";
    translation["validationplugin.scriptbannermessage"] =
        "인바운드 전자문서 검증은 사용자정의 플러그인 구현이어야 합니다. 기존 검증 스크립트를 “인바운드 검증 플러그인” 유형의 새로운 사용자정의 플러그인 구현으로 재생성하십시오.";
    translation["ei.conversion.defaulterror"] =
        "변환 중에 오류가 발생했습니다. 자세한 내용은 전자문서 하위 탭에서 전자문서 감사 추적을 확인하십시오.";
    translation["ei.conversion.inactivevendor"] =
        "선택한 공급자가 비활성 상태이므로 이 인바운드 전자문서를 변환할 수 없습니다. 전자문서 상태 필드가 업데이트되지 않았으며 감사 추적이 생성되지 않았습니다. 공급자 레코드에서 비활성 확인란의 선택을 취소한 후 전자문서를 다시 변환해 보십시오.";
    translation["ei.conversion.inactivecustomer"] =
        "선택한 고객이 비활성 상태이므로 이 인바운드 전자문서를 변환할 수 없습니다. 전자문서 상태 필드가 업데이트되지 않았으며 감사 추적이 생성되지 않았습니다. 고객 레코드에서 비활성 확인란의 선택을 취소한 후 전자문서를 다시 변환해 보십시오.";
    translation["ei.conversion.conversioncomplete"] =
        "전자문서가 변환되었습니다.";
    translation["ei.conversion.conversionlogbulk"] =
        "인바운드 전자문서가 대량 변환에 포함되었으며 다음 트랜잭션으로 변환되었습니다. 내부 ID: {INTERNALID}, 유형: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "인바운드 전자문서가 다음 트랜잭션으로 변환되었습니다. 내부 ID: {INTERNALID}, 유형: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "대량 변환 프로세스\n사용된 전자 문서 템플리트: {TEMPLATENAME}\n오류 범위: {ERRORSCOPE}\n오류 세부정보: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "사용된 전자 문서 템플리트: {TEMPLATENAME}\n오류 범위: {ERRORSCOPE}\n오류 세부정보: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "구문 분석에 실패했습니다. 인바운드 전자문서의 필드 매핑을 확인하십시오.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "변환 실패.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "검증 실패.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "인바운드 전자문서 레코드의 상태가 '{STATUS}'이므로 변환이 실패했습니다.";
    translation["ei.conversion.inactivecustomer.converter"] =
        "비활성 고객이 있는 인바운드 전자문서는 변환이 지원되지 않습니다.";
    translation["ei.conversion.inactivevendor.converter"] =
        "비활성 공급자가 있는 인바운드 전자문서는 변환이 지원되지 않습니다.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "공급자 코드({ITEMLIST})는 품목 레코드와 연결되어 있지 않습니다.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "공급자 이름/코드({ITEMLIST})는 품목 레코드와 연결되어 있지 않습니다.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "공급자 코드({ITEMLIST})는 여러 품목 레코드와 연결되어 있습니다. 품목 레코드를 수정하고 해당 공급자 코드가 공급자별 각 품목에 대해 고유한지 확인하십시오.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "공급자 이름/코드({ITEMLIST})는 여러 품목 레코드와 연결되어 있습니다. 품목 레코드를 수정하고 해당 공급자 이름/코드가 공급자별 각 품목에 대해 고유한지 확인하십시오.";
    translation["ei.conversion.refnumnotfound"] =
        "인바운드 전자문서에서 필수 참조 번호가 누락되어 있습니다. 이 전자문서를 취소하고 tranid 필드에 매핑되어 있는, 참조 번호에 대한 XML 요소가 포함된 다른 전자문서를 제출하십시오.";
    translation["ei.conversion.refnumexists"] =
        "참조 번호가 같은 공급자 청구서가 이미 있습니다. 이 전자문서를 취소하고 tranid 필드에 매핑되어 있는 XML 요소에 대해 올바른 참조 번호 값을 지닌 다른 전자문서를 제출하십시오.";
    translation["ei.conversion.vendorcodenotfound"] =
        "공급자 코드 필드가 전자문서 템플리트에서 누락되어 있습니다. 전자문서 템플리트를 수정하거나 공급자 코드 필드 매핑이 포함된 다른 템플리트를 선택하십시오.";
    translation["ei.conversion.novendorcodevalue"] =
        "하나 이상의 품목에 공급자 코드가 없습니다. 이 전자문서를 취소하고 공급자 코드 필드에 매핑되어 있는 XML 요소에 대해 올바른 값을 지닌 다른 전자문서를 제출하십시오.";
    translation["ei.conversion.vendornamenotfound"] =
        "공급자 이름 필드가 전자문서 템플리트에서 누락되어 있습니다. 전자문서 템플리트를 수정하거나 공급자 이름 필드 매핑이 포함된 다른 템플리트를 선택하십시오.";
    translation["ei.conversion.novendornamevalue"] =
        "하나 이상의 품목에 공급자 이름/코드가 없습니다. 이 전자문서를 취소하고 공급자 이름/코드 필드에 매핑되어 있는 XML 요소에 대해 올바른 값을 지닌 다른 전자문서를 제출하십시오.";
    translation["ei.conversion.sourcetransnotfound"] =
        "레코드({TRANSTYPE}#{TRANSID})가 시스템에 없습니다. 이 전자문서를 취소하고 createdfrom 필드에 매핑되어 있는 XML 요소에 대해 올바른 값을 지닌 다른 전자문서를 제출하십시오.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "레코드({TRANSTYPE}#{TRANSID})가 다른 개체에 할당되었습니다. 올바른 개체를 선택한 후 이 전자문서를 변환하십시오.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "공급자에게 기본 지출 계정이 없습니다. 이 계정은 비용이 포함된 청구서를 변환하는 데 필요합니다. 변환을 계속하려면 공급자 레코드에 있는 기본 지출 계정 필드에서 값을 설정하십시오.";
    translation["ei.conversion.nolinktopo"] =
        "참조된 구매 주문에 포함되어 있는 항목 또는 비용이 인바운드 전자문서에 없습니다. 참조된 구매 주문을 변환할 수 있는지 알아보려면 참조된 구매 주문의 상태를 확인하십시오. 변환할 수 있는 경우 이 전자문서를 취소하고 createdfrom 필드에 매핑되어 있는 XML 요소에 대해 올바른 값을 지닌 다른 전자문서를 제출하십시오.";
    translation["inbound.formtitle"] = "인바운드 전자문서 변환";
    translation["inbound.search"] = "검색";
    translation["inbound.convert"] = "변환";
    translation["inbound.return"] = "기준으로 돌아가기";
    translation["inbound.vendor"] = "공급자";
    translation["inbound.datefrom"] = "생성 시작 날짜";
    translation["inbound.dateto"] = "생성 종료 날짜";
    translation["inbound.vendorhelp"] =
        "검색 결과에 포함할 실패한 인바운드 전자문서가 있는 공급자를 선택하십시오.";
    translation["inbound.datefromhelp"] =
        "검색 결과에 포함할 실패한 인바운드 전자문서가 생성되는 기간을 정의하려면 시작 날짜를 선택하십시오.";
    translation["inbound.datetohelp"] =
        "검색 결과에 포함할 실패한 인바운드 전자문서가 생성되는 기간을 정의하려면 종료 날짜를 선택하십시오.";
    translation["inbound.inboundedocfieldgroup"] =
        "실패한 인바운드 전자문서 검색 필터";
    translation["inbound.sublist.sublistname"] =
        "실패한 인바운드 전자문서 검색 결과";
    translation["inbound.sublist.internalid"] = "내부 ID";
    translation["inbound.sublist.vendor"] = "공급자";
    translation["inbound.sublist.refnum"] = "참조 번호";
    translation["inbound.sublist.ponum"] = "PO 번호";
    translation["inbound.sublist.datecreated"] = "생성 날짜";
    translation["inbound.sublist.edoctemplate"] = "전자문서 템플리트";
    translation["inbound.msg.conversionongoing"] =
        "현재 전자문서가 변환되고 있습니다. 이 프로세스가 완료되면 이메일이 전송됩니다.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "일자 범위({DATECREATED_FROM} - {DATECREATED_TO})에 대한 인바운드 전자문서 변환이 이미 진행 중이므로 선택된 기준으로 검색을 수행할 수 없습니다. 검색 기준을 변경하거나 이 전자문서 변환 후 다시 시도해야 합니다.";
    translation["inbound.invaliddates"] =
        "생성 시작 날짜는 생성 종료 날짜 이전이어야 합니다. 생성 시작 날짜가 생성 종료 날짜 이전이 되도록 날짜를 변경하십시오.";
    translation["inbound.configurefreecountry"] =
        "이 계정에 여러 국가에서 전자 송장 SuiteApp을 사용할 수 있는 활성 라이센스가 없습니다. 전자문서를 대량으로 변환하려면 계정 관리자에게 문의하여 회사 정보 페이지에서 전자문서 무료 사용 국가를 구성하십시오.";
    translation["portlet.title"] = "전자문서";
    translation["portlet.outboundforgeneration"] = "생성용 아웃바운드 전자문서";
    translation["portlet.outboundforsending"] = "전송용 아웃바운드 전자문서";
    translation["portlet.outboundwitherrors"] =
        "오류가 있는 아웃바운드 전자문서";
    translation["portlet.outboundsendinglink"] =
        "실패한 아웃바운드 전자문서 발송";
    translation["portlet.inboundforconversion"] = "변환용 인바운드 전자문서";
    translation["portlet.inboundconvertfailed"] =
        "실패한 인바운드 전자문서 변환";
    translation["portlet.inboundincomplete"] =
        "미완료 상태의 인바운드 전자문서";
    translation["portlet.inbounduploadlink"] = "인바운드 전자문서 업로드";
    translation["portlet.outboundforcertification"] =
        "인증용 아웃바운드 전자문서";
    translation["portlet.outboundcertifiedforsending"] =
        "전송용 아웃바운드 전자문서";
    translation["inbound.webservice.response.success"] =
        "ID가 {ID}인 인바운드 전자문서가 성공적으로 생성되었습니다.";
    translation["inbound.webservice.response.novendor"] =
        "다음 웹 서비스 ID와 연결된 공급자가 없습니다. {IDENTIFIER} 올바른 웹 서비스 ID를 사용 중인지 확인하십시오.";
    translation["inbound.webservice.response.multiplevendor"] =
        "ID가 {ID}인 인바운드 전자문서가 성공적으로 생성되었습니다. 그러나 여러 공급자가 웹 서비스 ID에 연결되어 있습니다. {IDENTIFIER}";
    translation["inbound.webservice.error.templateerror"] =
        "올바른 템플리트를 결정할 수 없으므로 인바운드 전자문서가 미완료 상태입니다. 인바운드 전자문서 레코드에서 템플리트를 선택하거나 전자문서 템플리트 레코드에서 XSD를 설정하여 템플리트 자동 선택을 활성화하십시오.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "올바른 공급자를 결정할 수 없으므로 인바운드 전자문서가 미완료 상태입니다. 인바운드 전자문서 레코드에서 공급자를 선택하거나 연결된 공급자 레코드에서 웹 서비스 ID를 설정하십시오.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "{KEYS} 키가 누락되었습니다. 이 키를 웹 서비스 요청에 입력해야 합니다.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "웹 서비스 요청의 본문은 JSON 객체 또는 Content-Type: 'application/json'을 사용하는 JSON 객체의 배열이어야 합니다.";
    translation["transaction.contactnoemail"] =
        "다음 전자문서 받는사람은 연락처 레코드에 이메일 주소가 없습니다. {CONTACTNAMES}";
    translation["transaction.norecipients"] =
        "이 트랜잭션에 대한 전자문서 받는사람이 없습니다. 전자문서를 이메일로 보내려면 하나 이상의 연락처를 전자문서 받는사람 목록에 추가해야 합니다.";
    translation["transaction.maxrecipientexceeded"] =
        "추가한 이메일 받는사람의 수가 제한을 초과했습니다. 최대 10명의 이메일 받는사람을 추가할 수 있습니다.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "다음 트랜잭션 유형만 처리됩니다.";
    translation["ei.prefs.formtitle"] = "전자문서 기본설정";
    translation["ei.prefs.information.about.certify.skip"] =
        "인증 전송 방법이 정의되지 않았거나 트랜잭션에 적용 할 수 없는 경우 인증 단계를 건너뜁니다.";
    translation["ei.prefs.label.sublist.automati.ei"] = "자동 전자 송장 발행";
    translation["ei.prefs.label.automatic.type.selected"] =
        "전자문서 자동화 유형";
    translation["ei.prefs.text.option.comb.disabled"] = "사용 안함";
    translation["ei.prefs.text.option.comb.gcs"] = "생성, 인증, 전송";
    translation["ei.prefs.text.option.comb.gc"] = "생성, 인증";
    translation["ei.prefs.text.option.comb.cs"] = "인증, 전송";
    translation["ei.prefs.btn.label.cancel"] = "취소";
    translation["ei.prefs.btn.label.save"] = "저장";
    translation["ei.prefs.msg.confirm.save"] =
        "전자문서 기본설정에 대한 변경사항을 저장하시겠습니까?";
    translation["ei.prefs.msg.success.save"] =
        "전자문서 기본설정 저장에 성공했습니다.";
    translation["ei.prefs.msg.failed.save"] =
        "전자문서 기본설정 저장에 실패했습니다.";
    translation["ei.prefs.insufficient.permission.details"] =
        "이 페이지에 접근할 수 있는 권한이 제한됩니다. 접근 권한을 요청하려면 관리자에게 문의하십시오.";
    translation["ei.eip.msg.completed"] = "전자문서 처리가 완료되었습니다.";
    translation["ei.eip.msg.failed"] =
        "전자문서 처리에 실패했습니다. 자세한 내용은 전자문서 감사 추적을 참조하십시오.";
    translation["ei.eip.msg.processing"] = "전자문서를 처리하는 중입니다.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "전자문서를 이미 처리하는 중입니다.";
    translation["license.notinstalled"] =
        "귀하의 계정에서 NetSuite SuiteApps License Client를 사용할 수 없습니다. 모든 전자 송장 기능에 액세스하려면 이 SuiteApp을 설치하십시오.";
    translation["outbound.formtitle"] = "실패한 전자문서 발송";
    translation["outbound.search"] = "검색";
    translation["outbound.send"] = "전송";
    translation["outbound.return"] = "기준으로 돌아가기";
    translation["outbound.customer"] = "고객";
    translation["outbound.vendor"] = "공급자";
    translation["outbound.subsidiary"] = "관계사";
    translation["outbound.type"] = "트랜잭션 유형";
    translation["outbound.datefrom"] = "트랜잭션 시작 날짜";
    translation["outbound.dateto"] = "트랜잭션 종료 날짜";
    translation["outbound.subshelp"] =
        "특정 자회사와 관련된 트랜잭션만 표시하려면 해당 자회사를 선택하십시오.";
    translation["outbound.custhelp"] =
        "특정 고객과 관련된 트랜잭션만 표시하려면 해당 고객을 선택하십시오. 고객을 선택하지 않으면 검색 결과에 고객과 관계없이 자회사와 관련된 모든 트랜잭션이 표시됩니다.";
    translation["outbound.vendorhelp"] =
        "특정 공급자와 관련된 트랜잭션만 표시하려면 해당 공급자를 선택하십시오. 공급자를 선택하지 않으면 검색 결과에 공급자와 관계없이 자회사와 관련된 모든 트랜잭션이 표시됩니다.";
    translation["outbound.entitytypehelp"] =
        "고객 또는 공급자 개체 유형 중 하나를 선택하십시오. 이렇게 하면 아래에서 해당 드롭다운 목록이 활성화됩니다.";
    translation["outbound.typehelp"] =
        "전송할 각 전자문서에 대해 하나 이상의 트랜잭션 유형을 선택하십시오. 트랜잭션 유형을 여러 개 선택하려면 Ctrl 키를 누른 상태에서 각 트랜잭션 유형을 선택하십시오.<br /><br />트랜잭션 유형을 선택하지 않으면 검색 결과에 트랜잭션 유형과 관계없이 전송 준비 중인 모든 전자문서가 표시됩니다.";
    translation["outbound.datefromhelp"] =
        "특정 기간 내에 생성된 트랜잭션 목록을 보려면 날짜 범위의 시작을 정의할 날짜를 선택하십시오.";
    translation["outbound.datetohelp"] =
        "특정 기간 내에 생성된 트랜잭션 목록을 보려면 날짜 범위의 종료를 정의할 날짜를 선택하십시오.";
    translation["outbound.entityfieldgroup"] = "개체 검색 필터";
    translation["outbound.filtersfieldgroup"] = "트랜잭션 검색 필터";
    translation["outbound.entitytypeinlinehelp"] = "개체 유형 선택:";
    translation["outbound.invalidtypetitle"] = "잘못된 트랜잭션 유형";
    translation["outbound.invalidtype"] =
        "다음 트랜잭션 유형은 현재 지원되지 않습니다. {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "다음 트랜잭션 유형은 선택한 개체에 대해 유효하지 않습니다. {TRANSACTIONTYPES} 선택한 개체에 대해 적절한 트랜잭션 유형을 선택하십시오.";
    translation["outbound.invaliddates"] =
        "트랜잭션 시작 날짜는 트랜잭션 종료 날짜 이전이어야 합니다. 트랜잭션 시작 날짜가 트랜잭션 종료 날짜 이전이 되도록 날짜를 변경하십시오.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "관계사({SUBSIDIARY})에 대한 일자 범위({TRANDATE_FROM} - {TRANDATE_TO}) 내에 있는 트랜잭션에 대한 전자문서 전송이 이미 진행 중이므로 선택된 기준으로 검색을 수행할 수 없습니다. 검색 기준을 변경하거나 이 전자문서를 전송한 후 다시 시도해야 합니다.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "일자 범위({TRANDATE_FROM} - {TRANDATE_TO}) 내에 있는 트랜잭션에 대한 전자문서 전송이 이미 진행 중이므로 선택된 기준으로 검색을 수행할 수 없습니다. 검색 기준을 변경하거나 이 전자문서를 전송한 후 다시 시도해야 합니다.";
    translation["outbound.sublist.trannum"] = "트랜잭션 번호";
    translation["outbound.sublist.trantype"] = "트랜잭션 유형";
    translation["outbound.sublist.customer"] = "고객";
    translation["outbound.sublist.vendor"] = "공급자";
    translation["outbound.sublist.subsidiary"] = "관계사";
    translation["outbound.sublist.trandate"] = "트랜잭션 날짜";
    translation["outbound.sublist.memo"] = "메모";
    translation["outbound.sublist.template"] = "템플리트";
    translation["outbound.sublist.sendingmethod"] = "전송 방법";
    translation["outbound.sublist.sublistname"] =
        "실패한 아웃바운드 전자문서의 결과 발송";
    translation["outbound.msg.sendingongoing"] =
        "현재 전자문서가 발송되는 중입니다. 이 프로세스가 완료되면 이메일이 전송됩니다.";
    translation["outbound.configurefreecountry"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다. 전자문서를 대량으로 발송하려면 계정 관리자에게 문의하여 회사 정보 페이지에서 전자문서 무료 사용 국가를 구성하십시오.";
    translation["outbound.entitysend"] = "개체에 발송";
    translation["outbound.certifysend"] = "인증을 위해 발송";
    translation["outbound.sendingtypehelp"] =
        "개체에 발송 또는 인증을 위해 발송 중에서 선택하십시오. 그러면 발송에 해당하는 트랜잭션이 나열됩니다.";
    translation["customer.noemail"] =
        "이 고객의 이메일 주소가 없습니다. 이메일로 전자문서를 발송하려면 고객 레코드에 유효한 이메일 주소를 입력하십시오.";
    translation["customer.contactnoemail"] =
        "다음 전자문서 받는사람은 연락처 레코드에 이메일 주소가 없습니다. {CONTACTNAMES}";
    translation["customer.norecipients"] =
        "이 고객에 대한 전자문서 받는사람이 없습니다. 이 고객에게 전자문서를 이메일로 보내려면 하나 이상의 연락처를 전자문서 받는사람 목록에 추가해야 합니다.";
    translation["customer.arrayrequired"] =
        "검증을 위해 연락처 배열이 필요합니다.";
    translation["customer.parameternotarray"] =
        "연락처 매개변수는 배열이 아닙니다.";
    translation["customer.maxrecipientexceeded"] =
        "이메일 받는사람의 최대 수를 초과했습니다. 최대 10명의 이메일 받는사람만 선택하십시오.";
    translation["vendor.noemail"] =
        "이 공급자의 이메일 주소가 없습니다. 이메일로 전자문서를 발송하려면 공급자 레코드에 유효한 이메일 주소를 입력하십시오.";
    translation["vendor.contactnoemail"] =
        "다음 전자문서 받는사람은 연락처 레코드에 이메일 주소가 없습니다. {CONTACTNAMES}";
    translation["vendor.norecipients"] =
        "이 공급자에 대한 전자문서 받는사람이 없습니다. 이 공급자에게 전자문서를 이메일로 보내려면 하나 이상의 연락처를 전자문서 받는사람 목록에 추가해야 합니다.";
    translation["vendor.maxrecipientexceeded"] =
        "이메일 받는사람의 최대 수를 초과했습니다. 최대 10명의 이메일 받는사람만 선택하십시오.";
    translation["vendor.nosenders"] =
        "이 공급자에 대한 전자문서 이메일 보낸사람이 없습니다. 이 공급자로부터 이메일을 통해 전자문서를 수신하려면 공급자 전자문서 이메일 보낸사람 목록에 하나 이상의 이메일 주소를 입력해야 합니다.";
    translation["vendor.existingsender"] =
        "보낸사람 이메일 주소가 이미 있습니다.";
    translation["vendor.existingdomain"] =
        "보낸사람 이메일 도메인이 이미 다른 공급자에 의해 사용되고 있습니다.";
    translation["vendor.existingidentifier"] =
        "이 웹 서비스 ID는 이미 다른 공급자에 의해 사용되고 있습니다. 다른 웹 서비스 ID를 입력하십시오.";
    translation["customeremailrecipient.contextunsupported"] =
        "고객 전자문서 이메일 받는사람은 다음 컨텍스트만 지원합니다. UI, CSV, SuiteScript 및 웹 서비스";
    translation["vendoremailrecipient.contextunsupported"] =
        "공급자 전자문서 이메일 받는사람은 다음 컨텍스트만 지원합니다. UI, CSV, SuiteScript 및 웹 서비스";
    translation["vendoremailsender.contextunsupported"] =
        "'공급자 전자문서 이메일 보낸사람'은 다음 컨텍스트만 지원합니다. UI, CSV, SuiteScript 및 웹 서비스";
    translation["template.incorrectregex"] =
        "REGEX 필드에 잘못된 정규표현식이 포함되어 있습니다. 올바른 구문을 사용해야 합니다.";
    translation["template.invalidjson"] =
        "아웃바운드 전자문서에 대한 템플리트 필드에 올바른 형식의 JSON을 제공하지 않았습니다. 계속하려면 확인을 클릭하고 현재 페이지를 유지하려면 취소를 클릭하십시오.";
    translation["template.invalidxml"] =
        "XML 템플리트에 오류가 있습니다. XML 형식은 정확해야 합니다.";
    translation["template.templaterequired"] =
        "선택된 아웃바운드 트랜잭션 유형에 대한 템플리트 콘텐츠가 누락되었습니다. 아웃바운드 전자문서 필드에 적합한 XML 또는 JSON 템플리트 콘텐츠를 제공한 후 다시 시도하십시오.";
    translation["template.mappingrequired"] =
        "인바운드 트랜잭션 유형을 선택했지만 필드 매핑의 JSON 콘텐츠가 누락되어 있습니다. 인바운드 전자문서의 필드 매핑 필드에 JSON 콘텐츠를 입력하십시오.";
    translation["template.templateorjsonrequired"] =
        "누락된 필드 값이 있습니다. 아웃바운드 트랜잭션의 경우 아웃바운드 전자문서에 대한 템플리트 필드에 적합한 XML 또는 JSON 콘텐츠를 지정하십시오. 인바운드 트랜잭션의 경우 인바운드 전자문서의 필드 매핑 필드에 JSON 콘텐츠를 지정하십시오.";
    translation["template.invalidxsdfile"] =
        "선택한 XSD 파일이 유효한 XSD 파일이 아닙니다. 선택한 파일에 .xsd 확장자가 있는지 확인하십시오.";
    translation["template.contextunsupported"] =
        "전자문서 템플리트는 UI와 SuiteScript 컨텍스트만 지원합니다.";
    translation["template.supportedtranstypefldhelp"] =
        "이 템플리트에서 지원할 하나 이상의 트랜잭션 유형을 선택하십시오. 트랜잭션 유형을 여러 개 선택하려면 Ctrl 키를 누른 상태에서 트랜잭션 유형을 선택하십시오.<br /><br />트랜잭션 유형을 선택할 수 없는 경우 템플리트가 동일한 트랜잭션 유형의 트랜잭션 레코드 하나 이상에 이미 지정되었음을 의미합니다. 트랜잭션 유형 선택을 사용으로 설정하려면 트랜잭션 레코드에서 템플리트를 제거하십시오.<br /><br />이 템플리트를 인바운드 전자문서에도 지정할 수 있으며 지정할 경우 트랜잭션 유형 필드가 사용 안함으로 설정됩니다.";
    translation["template.eistatus"] =
        "전자문서 상태가 포함된 트랜잭션의 편집 제한";
    translation["template.supportedeistatusfieldhelp"] =
        "선택한 전자문서 상태가 포함된 트랜잭션이 이 템플리트와 연결된 경우 트랜잭션을 편집할 수 없습니다. 전자문서 상태를 복수 선택할 수 있습니다.";
    translation["template.invalidschemaordependency"] =
        "스키마가 잘못 구성된 XSD이거나 종속 스키마를 찾을 수 없습니다.";
    translation["template.xmldoesnotconformtoschema"] =
        "템플리트의 XML이 제공된 XSD 또는 스키마를 준수하지 않습니다.";
    translation["template.xmldomexception"] =
        "입력 XML 문자열이 잘못된 형식입니다.";
    translation["template.missingreqdargument"] =
        "아웃바운드 검증을 위한 XSD가 없습니다.";
    translation["template.xsdvalidationexception"] =
        "XSD 검증 중 알 수 없는 예외가 발생했습니다.";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD 스키마 폴더가 부적합하거나 누락되었습니다.";
    translation["invoice.generatebtn"] = "전자문서 생성";
    translation["invoice.sendbtn"] = "전자문서 전송";
    translation["invoice.sendcertifybtn"] = "전자문서 인증";
    translation["invoice.eipbtn"] = "전자문서 처리";
    translation["invoice.loguntagged"] =
        "전자문서 템플리트가 제거되었습니다. 트랜잭션에 전자문서 생성을 위한 태그가 지정되지 않았습니다.";
    translation["invoice.logforgenerate"] =
        "트랜잭션에 대한 전자문서를 생성할 준비가 되었습니다.";
    translation["invoice.invalidtemplatesub"] =
        "선택한 전자문서 템플리트에 대해 트랜잭션의 자회사가 유효하지 않습니다. 다른 전자문서 템플리트를 선택하십시오.";
    translation["invoice.templateremovalerror"] =
        "발송된 전자문서에 대한 전자문서 템플리트는 제거할 수 없습니다.";
    translation["ei.sending.currentlysending"] =
        "현재 전자문서가 발송되는 중입니다. 몇 분 정도 걸릴 수 있습니다. 이 처리가 중단될 수 있으니 전자문서 발송 버튼을 다시 클릭하지 마십시오. 전자문서가 발송된 후 페이지가 다시 로드됩니다.";
    translation["ei.sending.notready"] =
        "이 전자문서는 전송될 준비가 되지 않았습니다. 전자문서를 생성하려면 먼저 전자문서 생성을 클릭해야 합니다.";
    translation["ei.sending.alreadysent"] =
        "이 트랜잭션은 이미 발송되었습니다.";
    translation["ei.sending.norecipients"] =
        "고객에게 전자문서 받는사람이 없어 전자문서를 발송할 수 없습니다. 이메일로 이 전자문서를 발송하려면 먼저 고객 레코드에서 전자문서 받는사람을 선택해야 합니다.";
    translation["ei.sending.indivcustnoemail"] =
        "고객에게 이메일 주소가 없어 전자문서를 발송할 수 없습니다. 이메일로 이 전자문서를 발송하려면 고객 레코드에 이메일 주소가 기재되어 있어야 합니다.";
    translation["ei.sending.norecipients.vendor"] =
        "공급자에게 전자문서 받는사람이 없어 전자문서를 발송할 수 없습니다. 이메일로 이 전자문서를 발송하려면 먼저 공급자 레코드에서 전자문서 받는사람을 선택해야 합니다.";
    translation["ei.sending.indivvendnoemail"] =
        "공급자에게 이메일 주소가 없어 전자문서를 발송할 수 없습니다. 이메일로 이 전자문서를 발송하려면 공급자 레코드에 이메일 주소가 기재되어 있어야 합니다.";
    translation["ei.sending.invalidmethod"] =
        "{TYPE} #{INVOICENUMBER}에 대한 올바른 발송 방식을 선택하십시오.";
    translation["ei.sending.sentdetails"] =
        "보낸사람: {SENDER}\n받는사람: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "전자문서 보낸사람({EMPLOYEENAME})에 이메일 주소가 없습니다. 직원 레코드에 유효한 이메일 주소를 입력하십시오.";
    translation["ei.sending.recipientnoemail"] =
        "이 트랜잭션과 연결된 전자문서 받는사람 1명 이상에게 이메일 주소가 없습니다. 이 고객의 받는사람에게 유효한 이메일 주소가 있는지 확인하십시오.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "이 트랜잭션과 연결된 전자문서 받는사람 1명 이상에게 이메일 주소가 없습니다. 이 공급자의 받는사람에게 유효한 이메일 주소가 있는지 확인하십시오.";
    translation["ei.sending.defaulterror"] =
        "전자문서 발송 중에 오류가 발생했습니다. 자세한 내용은 전자문서 하위 탭에서 전자문서 감사 추적을 확인하십시오.";
    translation["ei.sending.inactivecustomer"] =
        "선택한 고객이 비활성 상태여서 이 트랜잭션에 대한 전자문서를 보낼 수 없습니다. 전자문서 상태 필드가 업데이트되지 않았으며 감사 추적이 생성되지 않았습니다. 고객 레코드에서 비활성 확인란의 선택을 취소한 후 전자문서를 다시 발송해 보십시오.";
    translation["ei.sending.inactivevendor"] =
        "선택한 공급자가 비활성 상태여서 이 트랜잭션에 대한 전자문서를 보낼 수 없습니다. 전자문서 상태 필드가 업데이트되지 않았으며 감사 추적이 생성되지 않았습니다. 공급자 레코드에서 비활성 확인란의 선택을 취소한 후 전자문서를 다시 발송해 보십시오.";
    translation["ei.sending.msg.processcomplete"] =
        "전자문서가 발송되었습니다.";
    translation["ei.sending.configurefreecountry"] =
        "여러 국가에 대해 전자 송장을 사용하려면 계정에 활성 라이센스가 있어야 합니다. 전자문서를 단일 국가에 대량으로 전송하려면 회사 정보 페이지의 전자문서 무료 사용 국가 필드에서 국가를 선택해야 합니다.";
    translation["ei.sending.inactivecustomer.manager"] =
        "비활성 고객이 있는 트랜잭션은 전자문서가 지원되지 않습니다.";
    translation["ei.sending.inactivevendor.manager"] =
        "비활성 공급자가 있는 트랜잭션은 전자문서가 지원되지 않습니다.";
    translation["ei.sending.certification.defaulterror"] =
        "전자문서 인증 중에 오류가 발생했습니다. 자세한 내용은 전자문서 하위 탭에서 전자문서 감사 추적을 확인하십시오.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "전자문서가 인증을 위해 발송되었습니다.";
    translation["ei.generation.generationlogbulk"] =
        "전자문서가 전자문서 템플리트 '{TEMPLATENAME}'을(를) 사용하여 대량으로 생성되었습니다.";
    translation["ei.generation.generationlog"] =
        "전자문서가 전자문서 템플리트 '{TEMPLATENAME}'을(를) 사용하여 생성되었습니다.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "전자문서 및 PDF 파일이 전자문서 템플리트 '{TEMPLATENAME}'을(를) 사용하여 대량으로 생성되었습니다.";
    translation["ei.generation.generationwithpdflog"] =
        "전자문서 및 PDF 파일이 전자문서 템플리트 '{TEMPLATENAME}'을(를) 사용하여 생성되었습니다.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "전자문서가 전자문서 템플리트 '{TEMPLATENAME}'을(를) 사용하여 대량으로 생성되었습니다. 이 트랜잭션에 대해 이전에 생성되었던 PDF 파일이 삭제되었습니다.";
    translation["ei.generation.generationremovedpdflog"] =
        "전자문서가 전자문서 템플리트 '{TEMPLATENAME}'을(를) 사용하여 생성되었습니다. 이 트랜잭션에 대해 이전에 생성되었던 PDF 파일이 삭제되었습니다.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "대량 생성 프로세스\n사용된 전자 문서 템플리트: {TEMPLATENAME}\n오류 세부정보: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "사용된 전자 문서 템플리트: {TEMPLATENAME}\n오류 세부정보: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "생성 중에 오류가 발생했습니다. 자세한 내용은 전자문서 하위 탭에서 전자문서 감사 추적을 확인하십시오.";
    translation["ei.generation.inactivecustomer"] =
        "선택한 고객이 비활성 상태여서 이 트랜잭션에 대한 전자문서를 생성할 수 없습니다. 전자문서 상태 필드가 업데이트되지 않았으며 감사 추적이 생성되지 않았습니다. 고객 레코드에서 비활성 확인란의 선택을 취소한 후 전자문서를 다시 생성해 보십시오.";
    translation["ei.generation.inactivevendor"] =
        "선택한 공급자가 비활성 상태여서 이 트랜잭션에 대한 전자문서를 생성할 수 없습니다. 전자문서 상태 필드가 업데이트되지 않았으며 감사 추적이 생성되지 않았습니다. 공급자 레코드에서 비활성 확인란의 선택을 취소한 후 전자문서를 다시 생성해 보십시오.";
    translation["ei.generation.msg.processcomplete"] =
        "전자문서가 생성되었습니다.";
    translation["ei.generation.configurefreecountry"] =
        "여러 국가에 대해 전자 송장을 사용하려면 계정에 활성 라이센스가 있어야 합니다. 전자문서를 단일 국가로 대량으로 생성하려면 회사 정보 페이지의 전자문서 무료 사용 국가 필드에서 국가를 선택해야 합니다.";
    translation["ei.generation.inactivecustomer.generator"] =
        "비활성 고객이 있는 트랜잭션은 전자문서가 지원되지 않습니다.";
    translation["ei.generation.inactivevendor.generator"] =
        "비활성 공급자가 있는 트랜잭션은 전자문서가 지원되지 않습니다.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "전자문서가 성공적으로 생성되고 디지털 서명되었습니다.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "결과 전자문서가 올바른 형식의 XML 또는 올바른 형식의 JSON이 아니므로 생성이 실패했습니다.";
    translation["notify.batchownersubject"] = "전자문서 발송 완료";
    translation["notify.batchownerbody"] =
        "안녕하십니까? <br/><br/>전자문서 전송에 대한 귀하의 요청이 완료되었습니다.<br/>{TOTAL}개 중 {SENT}개가 전송되었습니다. 자세한 내용은 첨부 파일을 참조하십시오. <br/><br/>감사합니다.<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "PO #{PONUM}에 대해 생성된 전자문서";
    translation["notify.recipientcompsubj"] =
        "{COMPANYNAME}에서 생성한 전자문서";
    translation["notify.recipientbody"] =
        "안녕하십니까? <br /><br />{MESSAGE}<br />전자문서 파일에 대한 내용은 첨부 파일을 참조하십시오.<br /><br />감사합니다.<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "전자문서 생성 중에 오류가 발생했습니다.";
    translation["notify.generationerrorbody"] =
        "전자문서 생성 중에 오류가 발생했습니다.<br/>트랜잭션 목록 및 오류 세부정보에 대한 내용은 첨부 파일을 참조하십시오.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "이 트랜잭션에 대한 전자문서가 이미 발송되었습니다. 새 전자문서를 생성하면 이전 전자문서가 덮어쓰입니다. 새 전자문서를 생성하시겠습니까?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "발송된 전자문서에 대한 전자문서 템플리트는 제거할 수 없습니다.";
    translation["transaction.msg.generate.information"] =
        "이 전자문서 생성이 진행 중입니다.";
    translation["transaction.msg.send.information"] =
        "이 전자문서 전송이 진행 중입니다.";
    translation["transaction.msg.send.certify.information"] =
        "이 전자문서 인증이 진행 중입니다.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "이 전자문서 생성이 이미 진행 중입니다.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "이 전자문서 전송이 이미 진행 중입니다.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "이 전자문서 인증이 이미 진행 중입니다.";
    translation["transaction.msg.uncheckpdf"] =
        "지난번 전자문서 생성 중에 이 트랜잭션에 대한 PDF 파일이 생성되었습니다. 이 확인란의 선택을 취소하면 다음번 전자문서 생성 시 해당 PDF 파일이 삭제됩니다.";
    translation["transaction.msg.nofreecountry"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다. 이 트랜잭션에 대해 전자문서를 생성하려면 계정 관리자에게 문의하여 회사 정보 페이지에서 전자문서 무료 사용 국가 필드에 국가를 지정하십시오.";
    translation["transaction.msg.otherbillingcountry"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다. 이 트랜잭션에 대해 전자문서를 생성하려면 NetSuite 계정 관리자에게 문의하여 라이센스를 구매하십시오.";
    translation["transaction.msg.nobillingcountry"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다. 이 트랜잭션에 대해 전자문서를 생성하려면 이 트랜잭션에 대한 청구 주소를 기재하십시오.";
    translation["transaction.msg.noshippingcountry"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다. 이 트랜잭션에 대해 전자문서를 생성하려면 이 트랜잭션에 대한 배송 주소를 기재하십시오.";
    translation["transaction.msg.nocustomercountry"] =
        "이 계정에는 여러 국가에서 전자 송장을 사용할 수 있는 활성 라이센스가 없습니다. 이 트랜잭션에 대해 전자문서를 생성하려면 이 트랜잭션의 고객에 대한 기본 청구 주소를 기재하십시오.";
    translation["transaction.msg.blockededittransaction"] =
        "현재의 전자문서 상태에 대해서는 트랜잭션의 편집이 차단되어 있습니다. 첨부된 EI 템플리트를 참조하십시오.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "내용 유형 필드의 값을 XML에서 다른 유형으로 바꾸면 모든 XML 검증자가 제거됩니다. 내용 유형을 변경하시겠습니까?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "XML 내용 유형의 검증자만 추가할 수 있습니다.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "이 검증자가 이미 목록에 있습니다.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "전자문서 템플리트 검증자는 UI와 SuiteScript 컨텍스트만 지원합니다.";
    translation["standarddocument.default.alreadyexist"] =
        "{DEFAULT_DOCUMENT_STANDARD} 레코드가 이미 있습니다. 같은 이름의 문서 패키지 레코드는 생성할 수 없습니다. 문서 패키지 레코드의 이름을 바꾼 후 다시 시도하십시오.";
    translation["standarddocument.default.editnotallowed"] =
        "{DEFAULT_DOCUMENT_STANDARD} 레코드 이름 또는 설명의 편집은 허용되지 않습니다.";
    translation["standarddocument.default.deletenotallowed"] =
        "{DEFAULT_DOCUMENT_STANDARD} 레코드 삭제는 허용되지 않습니다.";
    translation["standarddocument.contextunsupported"] =
        "전자문서 패키지는 UI, CSV 임포트 및 SuiteScript 컨텍스트만 지원합니다.";
    translation["sendingmethod.default.alreadyexist"] =
        "{DEFAULT_SENDING_METHOD_NAME} 발송 방식 레코드가 이미 있습니다. 같은 이름의 발송 방식 레코드는 생성할 수 없습니다. 발송 방식 레코드의 이름을 바꾼 후 다시 시도하십시오.";
    translation["sendingmethod.default.editnotallowed"] =
        "{DEFAULT_SENDING_METHOD_NAME} 발송 방식 레코드의 편집은 허용되지 않습니다.";
    translation["sendingmethod.default.deletenotallowed"] =
        "{DEFAULT_SENDING_METHOD_NAME} 발송 방식 레코드의 삭제는 허용되지 않습니다.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "이 발송 방식이 하나 이상의 트랜잭션 레코드에 할당되었으므로 트랜잭션 유형 필드가 비활성화되었습니다. 이 발송 방식을 편집하려면 트랜잭션 레코드에서 발송 방식을 제거하여 트랜잭션 유형 필드를 활성화한 후 다시 시도하십시오.";
    translation["sendingmethod.contextunsupported"] =
        "전자문서 발송 방식은 UI와 SuiteScript 컨텍스트만 지원합니다.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "이 전송 방법에서 지원할 하나 이상의 트랜잭션 유형을 선택하십시오. 트랜잭션 유형을 여러 개 선택하려면 Ctrl 키를 누른 상태에서 트랜잭션 유형을 선택하십시오.<br /><br />하나 이상의 트랜잭션 유형을 선택할 수 없는 경우 전송 방법이 해당 트랜잭션 유형의 트랜잭션 레코드 하나 이상에 지정되었음을 의미합니다. 트랜잭션 유형 선택을 사용으로 설정하려면 먼저 트랜잭션 레코드에서 전송 방법을 제거해야 합니다.";
    translation["sendingmethod.pluginimplementation"] =
        "전자문서 발송 방식 플러그인 구현";
    translation["sendingmethod.pluginimplementationhelp"] =
        "발송 방식 플러그인 구현 선택";
    translation["sendingmethod.scriptbannermessage"] =
        "발송 방식은 사용자정의 플러그인 구현이어야 합니다. 기존 발송 방식 스크립트를 “발송 플러그인” 유형의 새로운 사용자정의 플러그인 구현으로 재생성하십시오.";
    translation["customdatasource.pluginimplementation"] =
        "사용자정의 데이터 소스 플러그인 구현";
    translation["customdatasource.pluginimplementationhelp"] =
        "사용자정의 데이터 소스 플러그인 구현 선택";
    translation["digitalsignature.pluginimplementation"] =
        "디지털 서명 플러그인 구현";
    translation["digitalsignature.pluginimplementationhelp"] =
        "플러그인 구현을 선택하십시오. 전자문서를 디지털 서명하려면 이 필드는 필수입니다.";
    translation["digitalsignature.identifierlabel"] =
        "이 전자문서는 디지털 서명되었습니다.";
    translation["digitalsignature.successlog"] =
        "생성된 전자문서가 디지털 서명되었습니다.";
    translation["digitalsignature.failurelog"] =
        "생성된 전자문서가 디지털 서명되지 않았습니다.";
    translation["digitalsignature.pluginfailedmessage"] =
        "디지털 서명 플러그인 구현이 실패 상태를 반환했습니다.";
    translation["digitalsignature.plugininvalidresult"] =
        "디지털 서명 플러그인 구현에서 반환된 결과가 유효하지 않습니다.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "인바운드 사용자정의 데이터 출처 플러그인 구현";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "인바운드 사용자정의 데이터 출처 플러그인 구현을 선택합니다.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "인바운드 사용자정의 데이터 출처 플러그인 구현 결과가 부적합합니다.";
    translation["outboundvalidation.pluginimplementation"] =
        "아웃바운드 검증 플러그인 구현";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "아웃바운드 전자문서 검증 플러그인 구현을 선택합니다. 이는 아웃바운드 전자문서를 검증합니다.";
    translation["outboundvalidation.successlog"] =
        "아웃바운드 검증이 성공했습니다.";
    translation["outboundvalidation.failurelog"] =
        "아웃바운드 검증이 실패했습니다.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "아웃바운드 검증 플러그인 구현이 실패 상태를 반환했습니다.";
    translation["outboundvalidation.plugininvalidresult"] =
        "아웃바운드 검증 플러그인 구현의 결과가 부적합합니다.";
    translation["template.msg.cannotedittransactiontype"] =
        "이 템플리트가 이미 하나 이상의 트랜잭션 레코드에 할당되었으므로 트랜잭션 유형 필드가 비활성화되었습니다. 이 템플리트를 편집하려면 트랜잭션 레코드에서 템플리트를 제거하여 트랜잭션 유형 필드를 활성화한 후 다시 시도하십시오. 이 템플리트를 인바운드 전자문서에도 할당할 수 있으며 할당할 경우 트랜잭션 유형 필드가 비활성화됩니다.";
    translation["template.msg.forcetocopymessage"] =
        "기본 전자문서 템플리트를 편집할 수 없습니다. 작업의 사본 만들기 옵션을 사용하여 복사하거나 새 템플리트를 생성하십시오.";
    translation["template.msg.warningoneditmessage"] =
        "기본 전자문서 템플리트입니다. SuiteApp이 업데이트되면 이 템플리트의 변경사항이 손실되거나 덮어쓰입니다.";
    translation["email.batchownernotification.subject"] = "전자문서 발송 완료";
    translation["email.batchownernotification.body"] =
        "안녕하십니까? <br/><br/>귀하의 전자문서가 전송되었습니다.<br/>{TOTAL}개 중 {SENT}개가 전송되었습니다. 자세한 내용은 첨부 파일을 참조하십시오. <br/><br/>감사합니다.<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "전자문서 변환 완료";
    translation["email.batchownerconvertnotification.body"] =
        "안녕하십니까? <br/><br/>귀하의 전자문서가 변환되었습니다.<br/>{TOTAL}개 중 {CONVERTED}개가 변환되었습니다. 자세한 내용은 첨부 파일을 참조하십시오. <br/><br/>감사합니다.<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "PO #{PONUM}에 대해 생성된 전자문서";
    translation["email.recipientnotification.subject"] =
        "{COMPANYNAME}의 전자문서";
    translation["email.recipientnotification.customizedsubject"] =
        "{TRANTYPE} #{TRANID}에 대한 전자문서 생성됨. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "안녕하십니까? <br /><br />PO #{PONUM}에 대한 전자문서가 생성되었습니다.<br />자세한 내용은 첨부한 전자문서 파일을 참조하십시오.<br /><br />감사합니다.<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "안녕하십니까? <br /><br />{TYPE} #{TRANID}에 대한 전자문서가 생성되었습니다.<br />자세한 내용은 첨부한 전자문서 파일을 참조하십시오.<br /><br />감사합니다.<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "전자문서 생성 중에 오류가 발생했습니다.";
    translation["email.generationerrornotification.body"] =
        "전자문서 생성 중에 오류가 발생했습니다.<br/>트랜잭션 목록 및 오류 세부정보에 대한 내용은 첨부 파일을 참조하십시오.";
    translation["email.sendingerrornotification.subject"] =
        "전자문서 발송 중에 오류가 발생했습니다.";
    translation["email.sendingerrornotification.body"] =
        "전자문서 전송 중에 오류가 발생했습니다.<br/>트랜잭션 목록 및 오류 세부정보에 대한 내용은 첨부 파일을 참조하십시오.";
    translation["email.webserviceerror.subject"] =
        "인바운드 전자문서 웹 서비스 알림";
    translation["email.webserviceerror.body"] =
        "<p>안녕하십니까?</p><p>웹 서비스를 사용하여 인바운드 전자문서를 처리하는 중에 오류가 발생했습니다.<br/>다음 세부정보를 참조하십시오.</p>{DETAIL_TABLE}<p>감사합니다.<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "트랜잭션 번호";

    return translation;
});
