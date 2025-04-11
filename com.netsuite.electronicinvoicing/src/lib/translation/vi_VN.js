define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Chi tiết";
    translation["email.attachment.collabel.transactiontype"] = "Loại giao dịch";
    translation["email.attachment.collabel.internalid"] = "ID nội bộ";
    translation["email.attachment.collabel.vendor"] = "Nhà cung cấp";
    translation["email.conversionerrornotification.subject"] =
        "Đã phát sinh lỗi trong quá trình chuyển đổi tài liệu điện tử gửi đến";
    translation["email.conversionerrornotification.body"] =
        "Đã phát sinh lỗi trong quá trình chuyển đổi tài liệu điện tử gửi đến.<br/>Vui lòng xem file danh sách hồ sơ bị lỗi và chi tiết đính kèm.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Ghi chú: Nếu bạn muốn một người dùng khác nhận thông báo thay vì các quản trị viên tài khoản của bạn, hãy nhập địa chỉ email của người dùng vào trường Người nhận thông báo tài liệu điện tử trong hồ sơ chính/phụ của bạn.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID tài liệu điện tử gửi đến";
    translation["email.table.collabel.details"] = "Chi tiết";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Gặp lỗi trong khi thực hiện kiểm tra giấy phép của tài khoản";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hóa đơn điện tử đa quốc gia. </br>Để xử lý một loạt tài liệu điện tử, vui lòng định cấu hình Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trong trang thông tin công ty.";
    translation["inboundedocument.logforconversion"] =
        "Tài liệu điện tử gửi đến đã sẵn sàng cho việc chuyển đổi.";
    translation["inboundedocument.logincomplete"] =
        "Tài liệu điện tử gửi đến chưa hoàn thiện. Không có {FIELD} nào được chọn.";
    translation["inboundedocument.deletenotallowed"] =
        "Việc xóa một tài liệu điện tử gửi đến là không được phép.";
    translation["inboundedocument.copynotallowed"] =
        "Việc sao chép một tài liệu điện tử gửi đến là không được phép.";
    translation["inboundedocument.contextunsupported"] =
        "Tài liệu điện tử gửi đến chỉ hỗ trợ các ngữ cảnh UI và SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "Tham chiếu tệp XML đã chọn không phải là tệp XML hợp lệ. Đảm bảo rằng tệp bạn chọn có đuôi .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Tham chiếu tệp PDF đã chọn không phải là tệp PDF hợp lệ. Đảm bảo rằng tệp bạn chọn có đuôi .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Tham chiếu tệp XML đã chọn không phải là một tài liệu XML đúng định dạng.";
    translation["inboundedocument.convert.button"] = "Chuyển đổi";
    translation["inboundedocument.convert.information"] =
        "Việc chuyển đổi tài liệu điện tử gửi đến này đang được tiến hành.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Việc chuyển đổi tài liệu điện tử gửi đến này hiện đang được tiến hành.";
    translation["inboundedocument.cancel.button"] = "Hủy tài liệu điện tử";
    translation["inboundedocument.cancel.confirmation"] =
        "Bạn có chắc muốn hủy tài liệu điện tử gửi đến này?";
    translation["inboundedocument.cancel.failed"] =
        "Hủy thất bại do trạng thái của hồ sơ tài liệu điện tử gửi đến là '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Đã phát sinh lỗi trong quá trình hủy. Kiểm tra Biên bản kiểm tra tài liệu điện tử trên tab phụ Tài liệu điện tử để xem chi tiết.";
    translation["inboundedocument.cancel.complete"] =
        "Tài liệu điện tử này đã bị hủy.";
    translation["inboundedocument.preview.button"] = "Xem XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Tài khoản này không có giấy phép hoạt động để sử dụng Electronic Invoicing SuiteApp ở nhiều quốc gia. Để chuyển đổi tài liệu điện tử này thành một giao dịch, vui lòng liên hệ với quản trị viên tài khoản của bạn để chỉ định một quốc gia trong trường Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trên trang Thông tin công ty.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Tài khoản này không có giấy phép hoạt động để sử dụng Electronic Invoicing SuiteApp ở nhiều quốc gia. Để chuyển đổi tài liệu điện tử này thành một giao dịch, vui lòng liên hệ với người quản lý tài khoản NetSuite của bạn để mua một giấy phép.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Tài khoản này không có giấy phép hoạt động để sử dụng Electronic Invoicing SuiteApp ở nhiều quốc gia. Để chuyển đổi tài liệu điện tử này thành một giao dịch, vui lòng thiết lập địa chỉ thanh toán mặc định của nhà cung cấp đã chọn.";
    translation["validationplugin.contextunsupported"] =
        "Trình cắm chứng nhận tài liệu điện tử gửi đến chỉ hỗ trợ các ngữ cảnh UI và SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Triển khai trình cắm chứng nhận tài liệu điện tử gửi đến";
    translation["validationplugin.pluginimplementationhelp"] =
        "Lựa chọn triển khai trình cắm chứng nhận tài liệu điện tử gửi đến";
    translation["validationplugin.scriptbannermessage"] =
        "Việc chứng nhận tài liệu điện tử phải là triển khai trình cắm tùy chỉnh. Vui lòng tạo lại script chứng nhận dưới dạng triển khai trình cắm tùy chỉnh mới của loại “Trình cắm chứng nhận Tài liệu Gửi đến”.";
    translation["ei.conversion.defaulterror"] =
        "Đã phát sinh lỗi trong quá trình chuyển đổi. Kiểm tra Biên bản kiểm tra tài liệu điện tử trên tab phụ Tài liệu điện tử để xem chi tiết.";
    translation["ei.conversion.inactivevendor"] =
        "Không thể chuyển đổi tài liệu điện tử gửi đến này vì nhà cung cấp đã chọn có trạng thái không hoạt động. Trường Trạng thái tài liệu điện tử chưa được cập nhật và chưa có biên bản kiểm tra nào được tạo. Hãy bỏ chọn hộp Không hoạt động trên hồ sơ nhà cung cấp, sau đó thử chuyển đổi lại tài liệu điện tử.";
    translation["ei.conversion.inactivecustomer"] =
        "Không thể chuyển đổi tài liệu điện tử gửi đến này vì khách hàng đã chọn có trạng thái không hoạt động. Trường Trạng thái tài liệu điện tử chưa được cập nhật và chưa có biên bản kiểm tra nào được tạo. Hãy bỏ chọn hộp Không hoạt động trên hồ sơ khách hàng, sau đó thử chuyển đổi lại tài liệu điện tử.";
    translation["ei.conversion.conversioncomplete"] =
        "Tài liệu điện tử đã được chuyển đổi.";
    translation["ei.conversion.conversionlogbulk"] =
        "Tài liệu điện tử gửi đến đã được bao gồm trong chuyển đổi hàng loạt và đã được chuyển đổi thành giao dịch có ID nội bộ: {INTERNALID} của Loại: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "Tài liệu điện tử gửi đến đã được chuyển đổi thành giao dịch có ID nội bộ: {INTERNALID} của Loại: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Quy trình chuyển đổi theo khối lượng lớn\nMẫu tài liệu điện tử sử dụng: {TEMPLATENAME}\nError scope: {ERRORSCOPE}\nChi tiết lỗi: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Mẫu tài liệu điện tử sử dụng: {TEMPLATENAME}\nPhạm vi lỗi: {ERRORSCOPE}\nChi tiết lỗi: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Phân tích cú pháp thất bại. Hãy kiểm tra Ánh xạ trường cho các tài liệu điện tử gửi đến.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Chuyển đổi thất bại.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Xác thực thất bại.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Chuyển đổi thất bại do trạng thái của hồ sơ tài liệu điện tử gửi đến là '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Các tài liệu điện tử gửi đến có khách hàng ở trạng thái không hoạt động thì không được hỗ trợ chuyển đổi.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Các tài liệu điện tử gửi đến có nhà cung cấp ở trạng thái không hoạt động thì không được hỗ trợ để chuyển đổi.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Các mã nhà cung cấp sau: {ITEMLIST}, không gắn với bất kỳ hồ sơ mặt hàng nào.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Các mã/tên nhà cung cấp sau: {ITEMLIST}, không gắn với bất kỳ hồ sơ mặt hàng nào.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Các mã nhà cung cấp sau: {ITEMLIST}, gắn với nhiều hồ sơ mặt hàng. Chỉnh sửa các hồ sơ mặt hàng và đảm bảo rằng mã nhà cung cấp là duy nhất đối với mỗi mặt hàng trên mỗi nhà cung cấp.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Các mã/tên nhà cung cấp sau: {ITEMLIST}, gắn với nhiều hồ sơ mặt hàng. Chỉnh sửa các hồ sơ mặt hàng và đảm bảo rằng tên/mã nhà cung cấp là duy nhất đối với mỗi mặt hàng trên mỗi nhà cung cấp.";
    translation["ei.conversion.refnumnotfound"] =
        "Số tham chiếu được yêu cầu bị thiếu trong tài liệu điện tử gửi đến. Hãy hủy tài liệu điện tử này và gửi một tài liệu điện tử khác có chứa một thành phần XML cho số tham chiếu, được liên kết tới trường tranid.";
    translation["ei.conversion.refnumexists"] =
        "Một hóa đơn nhà cung cấp có cùng số tham chiếu đã tồn tại. Hãy hủy tài liệu điện tử này và gửi một tài liệu điện tử khác có giá trị số tham chiếu chính xác cho thành phần XML được liên kết tới trường tranid.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Trường mã nhà cung cấp bị thiếu trong mẫu tài liệu điện tử. Hãy sửa mẫu tài liệu điện tử hoặc chọn mẫu khác có chứa ánh xạ trường mã nhà cung cấp.";
    translation["ei.conversion.novendorcodevalue"] =
        "Ít nhất một trong các mặt hàng không có mã nhà cung cấp. Hãy hủy tài liệu điện tử này và gửi một tài liệu điện tử khác có giá trị chính xác cho thành phần XML được liên kết tới trường mã nhà cung cấp.";
    translation["ei.conversion.vendornamenotfound"] =
        "Trường tên nhà cung cấp bị thiếu trong mẫu tài liệu điện tử. Hãy sửa mẫu tài liệu điện tử hoặc chọn mẫu khác có chứa ánh xạ trường tên nhà cung cấp.";
    translation["ei.conversion.novendornamevalue"] =
        "Ít nhất một trong các mặt hàng không có tên/mã nhà cung cấp. Hãy hủy tài liệu điện tử này và gửi một tài liệu điện tử khác có giá trị chính xác cho thành phần XML được liên kết tới trường tên/mã nhà cung cấp.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Không tìm thấy hồ sơ ({TRANSTYPE}#{TRANSID}) trong hệ thống. Hãy hủy tài liệu điện tử này và gửi một tài liệu điện tử khác có giá trị chính xác cho thành phần XML được liên kết tới trường tạo từ.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Hồ sơ ({TRANSTYPE}#{TRANSID}) được gán cho một thực thể khác. Hãy chọn thực thể đúng và chuyển đổi tài liệu điện tử này.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Nhà cung cấp không có tài khoản chi phí mặc định, là thông tin được yêu cầu để chuyển đổi hóa đơn chi phí. Để tiến hành chuyển đổi, hãy đặt một giá trị trong trường Tài khoản chi phí mặc định trong hồ sơ nhà cung cấp.";
    translation["ei.conversion.nolinktopo"] =
        "Tài liệu điện tử gửi đến không có mặt hàng hoặc chi phí nào được bao gồm trong đơn đặt hàng được tham chiếu. Hãy kiểm tra trạng thái của đơn đặt hàng được tham chiếu để xem đơn đặt hàng đó có thể chuyển đổi không. Nếu nó có thể được chuyển đổi, hãy hủy tài liệu điện tử này và gửi một tài liệu điện tử khác có giá trị chính xác cho thành phần XML được liên kết tới trường tạo từ.";
    translation["inbound.formtitle"] = "Chuyển đổi tài liệu điện tử gửi đến";
    translation["inbound.search"] = "Tìm kiếm";
    translation["inbound.convert"] = "Chuyển đổi";
    translation["inbound.return"] = "Quay lại tiêu chí";
    translation["inbound.vendor"] = "Nhà cung cấp";
    translation["inbound.datefrom"] = "Ngày tạo từ";
    translation["inbound.dateto"] = "Ngày tạo đến";
    translation["inbound.vendorhelp"] =
        "Chọn nhà cung cấp có tài liệu điện tử gửi đến không thành công sẽ được bao gồm trong kết quả tìm kiếm.";
    translation["inbound.datefromhelp"] =
        "Chọn ngày bắt đầu để xác định khoảng thời gian mà trong đó các tài liệu điện tử gửi đến thất bại sẽ được bao gồm trong kết quả tìm kiếm.";
    translation["inbound.datetohelp"] =
        "Chọn ngày kết thúc để xác định khoảng thời gian mà trong đó các tài liệu điện tử gửi đến thất bại sẽ được bao gồm trong kết quả tìm kiếm.";
    translation["inbound.inboundedocfieldgroup"] =
        "Các bộ lọc tìm kiếm tài liệu điện tử gửi đến thất bại";
    translation["inbound.sublist.sublistname"] =
        "Các kết quả tìm kiếm tài liệu điện tử gửi đến thất bại";
    translation["inbound.sublist.internalid"] = "ID nội bộ";
    translation["inbound.sublist.vendor"] = "Nhà cung cấp";
    translation["inbound.sublist.refnum"] = "Số tham chiếu";
    translation["inbound.sublist.ponum"] = "Số đơn đặt hàng";
    translation["inbound.sublist.datecreated"] = "Ngày tạo";
    translation["inbound.sublist.edoctemplate"] = "Mẫu tài liệu điện tử";
    translation["inbound.msg.conversionongoing"] =
        "Tài liệu điện tử hiện đang được chuyển đổi. Bạn sẽ nhận được một email khi tác vụ hoàn thành.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Bạn không thể thực hiện thao tác tìm kiếm với tiêu chí đã chọn vì việc chuyển đổi tài liệu điện tử gửi đến hiện đang được tiến hành trong khoảng ngày ({DATECREATED_FROM} - {DATECREATED_TO}). Bạn phải thay đổi tiêu chí tìm kiếm của mình hoặc thử lại sau khi chuyển đổi tài liệu điện tử này.";
    translation["inbound.invaliddates"] =
        "Ngày tạo từ không được muộn hơn Ngày tạo đến. Hãy thay đổi các ngày để Ngày tạo từ sớm hơn ngày tạo đến.";
    translation["inbound.configurefreecountry"] =
        "Tài khoản này không có giấy phép hoạt động để sử dụng Electronic Invoicing SuiteApp ở nhiều quốc gia. Để chuyển đổi các tài liệu điện tử theo khối lượng lớn, vui lòng liên hệ với quản trị viên tài khoản của bạn để định cấu hình Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trên trang Thông tin công ty.";
    translation["portlet.title"] = "Các tài liệu điện tử";
    translation["portlet.outboundforgeneration"] =
        "Các tài liệu điện tử gửi đi để tạo";
    translation["portlet.outboundforsending"] =
        "Các tài liệu điện tử gửi đi để gửi";
    translation["portlet.outboundwitherrors"] =
        "Các tài liệu điện tử gửi đi có lỗi";
    translation["portlet.outboundsendinglink"] =
        "Gửi các tài liệu điện tử gửi đi thất bại";
    translation["portlet.inboundforconversion"] =
        "Các tài liệu điện tử gửi đến để chuyển đổi";
    translation["portlet.inboundconvertfailed"] =
        "Chuyển đổi tài liệu điện tử gửi đến thất bại";
    translation["portlet.inboundincomplete"] =
        "Các tài liệu điện tử gửi đến chưa đầy đủ";
    translation["portlet.inbounduploadlink"] =
        "Tải lên các tài liệu điện tử gửi đến";
    translation["portlet.outboundforcertification"] =
        "Các tài liệu điện tử gửi đi để chứng nhận";
    translation["portlet.outboundcertifiedforsending"] =
        "Các tài liệu điện tử gửi đi để gửi";
    translation["inbound.webservice.response.success"] =
        "Tài liệu điện tử gửi đến với ID: {ID} được tạo thành công.";
    translation["inbound.webservice.response.novendor"] =
        "Không có nhà cung cấp nào được liên kết với ID dịch vụ web: {IDENTIFIER}. Đảm bảo rằng ID dịch vụ web chính xác được sử dụng.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Tài liệu điện tử gửi đến với ID: {ID} được tạo thành công. Tuy nhiên, nhiều nhà cung cấp được liên kết với ID dịch vụ web: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Tài liệu điện tử gửi đến chưa hoàn thiện, do không thể xác định đúng mẫu. Hoặc chọn mẫu trong hồ sơ tài liệu điện tử gửi đến, hoặc thiết lập XSD trong hồ sơ mẫu tài liệu điện tử để kích hoạt tính năng tự động chọn mẫu.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Tài liệu điện tử gửi đến chưa hoàn thiện, do không thể xác định đúng nhà cung cấp. Hoặc chọn một nhà cung cấp trong hồ sơ tài liệu điện tử gửi đến, hoặc thiết lập ID dịch vụ web trong hồ sơ nhà cung cấp có liên quan.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Các khóa sau đây bị thiếu: {KEYS}, mà bạn phải cung cấp trong yêu cầu dịch vụ web.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Phần thân của yêu cầu dịch vụ web phải là một đối tượng JSON hoặc một mảng các đối tượng JSON sử dụng Loại nội dung: 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Những người nhận tài liệu điện tử sau đây không có địa chỉ email trong hồ sơ liên hệ của họ: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Không có người nhận tài liệu điện tử nào cho giao dịch này. Để gửi các tài liệu điện tử qua email, cần thêm ít nhất một liên hệ vào danh sách người nhận tài liệu điện tử.";
    translation["transaction.maxrecipientexceeded"] =
        "Số lượng người nhận email bạn thêm vào đã vượt quá giới hạn. Bạn có thể thêm tối đa 10 người nhận email.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Chỉ xử lý các loại giao dịch dưới đây:";
    translation["ei.prefs.formtitle"] = "Tùy chọn tài liệu điện tử";
    translation["ei.prefs.information.about.certify.skip"] =
        "Bước chứng nhận sẽ bị bỏ qua nếu phương thức gửi chứng nhận không được xác định hoặc không áp cho giao dịch này.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Lập hóa đơn điện tử tự động";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Loại tự động hóa tài liệu điện tử";
    translation["ei.prefs.text.option.comb.disabled"] = "Vô hiệu hóa";
    translation["ei.prefs.text.option.comb.gcs"] = "Tạo, chứng nhận, gửi";
    translation["ei.prefs.text.option.comb.gc"] = "Tạo, chứng nhận";
    translation["ei.prefs.text.option.comb.cs"] = "Chứng nhận, gửi";
    translation["ei.prefs.btn.label.cancel"] = "Hủy";
    translation["ei.prefs.btn.label.save"] = "Lưu";
    translation["ei.prefs.msg.confirm.save"] =
        "Bạn có muốn lưu các thay đổi đối với Tùy chọn tài liệu điện tử không?";
    translation["ei.prefs.msg.success.save"] =
        "Lưu Tùy chọn tài liệu điện tử thành công.";
    translation["ei.prefs.msg.failed.save"] =
        "Lưu Tùy chọn tài liệu điện tử không thành công.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Quyền truy cập vào trang này bị hạn chế. Để yêu cầu quyền truy cập, hãy liên hệ Người quản trị.";
    translation["ei.eip.msg.completed"] =
        "Đã hoàn thành xử lý tài liệu điện tử.";
    translation["ei.eip.msg.failed"] =
        "Xử lý tài liệu điện tử không thành công. Hãy xem Biên bản kiểm tra tài liệu điện tử để biết thêm chi tiết.";
    translation["ei.eip.msg.processing"] = "Tài liệu điện tử đang được xử lý.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Tài liệu điện tử hiện đang được xử lý.";
    translation["license.notinstalled"] =
        "Trình ứng dụng khách cấp phép NetSuite SuiteApps không khả dụng trong tài khoản của bạn. Vui lòng cài đặt SuiteApp này để truy cập vào tất cả các tính năng Xuất hoá đơn điện tử.ou have not checked the box for granting GDPR consent";
    translation["outbound.formtitle"] = "Gửi các tài liệu điện tử thất bại";
    translation["outbound.search"] = "Tìm kiếm";
    translation["outbound.send"] = "Gửi";
    translation["outbound.return"] = "Quay lại tiêu chí";
    translation["outbound.customer"] = "Khách hàng";
    translation["outbound.vendor"] = "Nhà cung cấp";
    translation["outbound.subsidiary"] = "Công ty con";
    translation["outbound.type"] = "Loại giao dịch";
    translation["outbound.datefrom"] = "Ngày giao dịch từ";
    translation["outbound.dateto"] = "Ngày giao dịch đến";
    translation["outbound.subshelp"] =
        "Chọn một công ty con để chỉ hiển thị các giao dịch thuộc công ty con.";
    translation["outbound.custhelp"] =
        "Chọn một khách hàng để chỉ hiển thị các giao dịch thuộc về khách hàng đó. Nếu không có khách hàng nào được chọn, các kết quả tìm kiếm sẽ hiển thị tất cả các giao dịch thuộc về công ty con đó, bất kể khách hàng là ai.";
    translation["outbound.vendorhelp"] =
        "Chọn nhà cung cấp để chỉ hiển thị các giao dịch thuộc về nhà cung cấp đó. Nếu không có nhà cung cấp nào được chọn, các kết quả tìm kiếm sẽ hiển thị tất cả các giao dịch thuộc về công ty con đó, bất kể nhà cung cấp là ai.";
    translation["outbound.entitytypehelp"] =
        "Chọn loại thực thể Khách hàng hoặc Nhà cung cấp. Điều này sẽ kích hoạt danh sách thả xuống tương ứng dưới đây.";
    translation["outbound.typehelp"] =
        "Chọn một hoặc nhiều loại giao dịch cho mỗi tài liệu điện tử bạn muốn gửi. Để chọn nhiều loại giao dịch, hãy nhấn và giữ phím Ctrl trong khi chọn từng loại giao dịch.<br /><br />Nếu không loại giao dịch nào được chọn, kết quả tìm kiếm sẽ hiển thị tất cả tài liệu điện tử đã sẵn sàng để gửi, bất kể loại giao dịch nào.";
    translation["outbound.datefromhelp"] =
        "Để xem danh sách các giao dịch được tạo trong một khoảng ngày cụ thể, hãy chọn ngày để xác định thời điểm bắt đầu của khoảng ngày.";
    translation["outbound.datetohelp"] =
        "Để xem danh sách các giao dịch được tạo trong một khoảng ngày cụ thể, hãy chọn ngày để xác định thời điểm kết thúc của khoảng ngày.";
    translation["outbound.entityfieldgroup"] = "Các bộ lọc tìm kiếm thực thể";
    translation["outbound.filtersfieldgroup"] = "Các bộ lọc tìm kiếm giao dịch";
    translation["outbound.entitytypeinlinehelp"] = "Chọn loại thực thể:";
    translation["outbound.invalidtypetitle"] =
        "Các loại giao dịch không hợp lệ";
    translation["outbound.invalidtype"] =
        "Các loại giao dịch sau đây hiện không được hỗ trợ: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Các loại giao dịch sau không hợp lệ đối với thực thể đã chọn: {TRANSACTIONTYPES}. Chọn các loại giao dịch phù hợp cho thực thể mà bạn đã chọn.";
    translation["outbound.invaliddates"] =
        "Ngày giao dịch từ không được muộn hơn Ngày giao dịch đến. Thay đổi ngày để Ngày giao dịch từ sớm hơn Ngày giao dịch đến.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Bạn không thể thực hiện thao tác tìm kiếm với tiêu chí đã chọn vì việc gửi tài liệu điện tử hiện đang được tiến hành cho giao dịch trong khoảng ngày ({TRANDATE_FROM} - {TRANDATE_TO}) đối với công ty con ({SUBSIDIARY}). Bạn phải thay đổi tiêu chí tìm kiếm của mình hoặc thử lại sau khi gửi tài liệu điện tử này.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Bạn không thể thực hiện thao tác tìm kiếm với tiêu chí đã chọn vì việc gửi tài liệu điện tử hiện đang được tiến hành cho giao dịch trong khoảng ngày ({TRANDATE_FROM} - {TRANDATE_TO}). Bạn phải thay đổi tiêu chí tìm kiếm của mình hoặc thử lại sau khi gửi tài liệu điện tử này.";
    translation["outbound.sublist.trannum"] = "Số giao dịch";
    translation["outbound.sublist.trantype"] = "Loại giao dịch";
    translation["outbound.sublist.customer"] = "Khách hàng";
    translation["outbound.sublist.vendor"] = "Nhà cung cấp";
    translation["outbound.sublist.subsidiary"] = "Công ty con";
    translation["outbound.sublist.trandate"] = "Ngày giao dịch";
    translation["outbound.sublist.memo"] = "Bản ghi nhớ";
    translation["outbound.sublist.template"] = "Mẫu";
    translation["outbound.sublist.sendingmethod"] = "Phương thức gửi";
    translation["outbound.sublist.sublistname"] =
        "Các kết quả của các tài liệu điện tử gửi đi thất bại sẽ được gửi";
    translation["outbound.msg.sendingongoing"] =
        "Tài liệu điện tử hiện đang được gửi đi. Bạn sẽ nhận được một email khi quá trình này hoàn tất.";
    translation["outbound.configurefreecountry"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hoá đơn điện tử đa quốc gia. Để gửi các tài liệu điện tử theo khối lượng lớn, vui lòng liên hệ với quản trị viên tài khoản của bạn để định cấu hình Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trong trang thông tin công ty.";
    translation["outbound.entitysend"] = "Gửi tới Thực thể";
    translation["outbound.certifysend"] = "Gửi để Chứng nhận";
    translation["outbound.sendingtypehelp"] =
        "Chọn Gửi tới Thực thể hoặc Gửi để Chứng nhận Các giao dịch tương ứng để gửi sẽ được liệt kê.";
    translation["customer.noemail"] =
        "Không có địa chỉ email cho khách hàng này. Hãy nhập một địa chỉ email hợp lệ vào hồ sơ khách hàng để cho phép gửi các tài liệu điện tử qua email.";
    translation["customer.contactnoemail"] =
        "Những người nhận tài liệu điện tử sau đây không có địa chỉ email trong hồ sơ liên hệ của họ: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Không có người nhận tài liệu điện tử nào cho khách hàng này. Để gửi các tài liệu điện tử qua email cho khách hàng này, cần thêm ít nhất một liên hệ vào danh sách người nhận tài liệu điện tử.";
    translation["customer.arrayrequired"] =
        "Yêu cầu cần có mảng liên hệ để xác thực.";
    translation["customer.parameternotarray"] =
        "Các tham số liên hệ không phải là một mảng.";
    translation["customer.maxrecipientexceeded"] =
        "Bạn đã vượt quá số lượng người nhận email tối đa. Bạn chỉ được chọn tối đa 10 người nhận email.";
    translation["vendor.noemail"] =
        "Không có địa chỉ email đối với nhà cung cấp này. Hãy nhập một địa chỉ email hợp lệ vào hồ sơ nhà cung cấp để cho phép gửi các tài liệu điện tử qua email.";
    translation["vendor.contactnoemail"] =
        "Những người nhận tài liệu điện tử sau đây không có địa chỉ email trong hồ sơ liên hệ của họ: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Không có người nhận tài liệu điện tử đối với nhà cung cấp này. Để gửi các tài liệu điện tử qua email cho nhà cung cấp này, cần thêm ít nhất một liên hệ vào danh sách người nhận tài liệu điện tử.";
    translation["vendor.maxrecipientexceeded"] =
        "Bạn đã vượt quá số lượng người nhận email tối đa. Bạn chỉ được chọn tối đa 10 người nhận email.";
    translation["vendor.nosenders"] =
        "Không có người gửi email tài liệu điện tử đối với nhà cung cấp này. Để nhận các tài liệu điện tử qua email từ nhà cung cấp này, bạn phải nhập ít nhất một địa chỉ email trong danh sách Người gửi email tài liệu điện tử nhà cung cấp.";
    translation["vendor.existingsender"] =
        "Địa chỉ email người gửi đã tồn tại.";
    translation["vendor.existingdomain"] =
        "Tên miền email của người gửi đã được một nhà cung cấp khác sử dụng.";
    translation["vendor.existingidentifier"] =
        "ID dịch vụ web đã được một nhà cung cấp khác sử dụng. Nhập một ID dịch vụ web khác.";
    translation["customeremailrecipient.contextunsupported"] =
        "Người nhận email tài liệu điện tử khách hàng chỉ hỗ trợ các ngữ cảnh sau: UI, CSV, SuiteScript và Dịch vụ web.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Người nhận email tài liệu điện tử nhà cung cấp chỉ hỗ trợ các ngữ cảnh sau: UI, CSV, SuiteScript và Dịch vụ web.";
    translation["vendoremailsender.contextunsupported"] =
        "Người gửi email tài liệu điện tử nhà cung cấp chỉ hỗ trợ các ngữ cảnh sau: UI, CSV, SuiteScript và Dịch vụ web.";
    translation["template.incorrectregex"] =
        "Trường REGEX chứa một biểu thức chính quy không chính xác. Cú pháp thích hợp phải được sử dụng.";
    translation["template.invalidjson"] =
        "Bạn đã không cung cấp JSON đúng định dạng trong trường Mẫu dành cho các tài liệu điện tử gửi đi. Nhấp OK để tiếp tục hoặc Hủy để ở lại trang hiện tại.";
    translation["template.invalidxml"] =
        "Mẫu XML có chứa lỗi. Định dạng XML phải đúng định dạng.";
    translation["template.templaterequired"] =
        "Thiếu nội dung mẫu cho loại giao dịch gửi đi đã chọn. Cung cấp nội dung mẫu XML hoặc JSON hợp lệ trong trường Các tài liệu điện tử gửi đi rồi thử lại.";
    translation["template.mappingrequired"] =
        "Bạn đã chọn một loại giao dịch gửi đến nhưng nội dung JSON của ánh xạ trường bị thiếu. Nhập nội dung JSON vào Ánh xạ trường cho tài liệu điện tử gửi đến.";
    translation["template.templateorjsonrequired"] =
        "Giá trị trường bị thiếu. Đối với giao dịch gửi đi, hãy chỉ định nội dung XML hoặc JSON hợp lệ trong trường Mẫu cho Tài liệu điện tử gửi đi. Đối với giao dịch đến, chỉ định nội dung JSON trong trường Ánh xạ trường cho các tài liệu điện tử gửi đến.";
    translation["template.invalidxsdfile"] =
        "Tệp XSD đã chọn không phải là tệp XSD hợp lệ. Đảm bảo rằng tệp bạn chọn có đuôi .xsd.";
    translation["template.contextunsupported"] =
        "Mẫu tài liệu điện tử chỉ hỗ trợ các ngữ cảnh UI và SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Chọn một hoặc nhiều loại giao dịch được hỗ trợ bởi mẫu này. Để chọn nhiều loại giao dịch, hãy nhấn và giữ phím Ctrl trong khi chọn các loại giao dịch.<br /><br />Nếu không thể chọn các loại giao dịch, thì điều đó nghĩa là mẫu đã được gán cho một hoặc nhiều hồ sơ giao dịch của cùng loại giao dịch đó. Để cho phép kích hoạt lựa chọn loại giao dịch, hãy xoá mẫu khỏi hồ sơ giao dịch.<br /><br />Bạn có thể gán mẫu này cho các tài liệu điện tử gửi đến, và làm vậy sẽ vô hiệu hóa trường Loại giao dịch.";
    translation["template.eistatus"] =
        "Hạn chế chỉnh sửa trạng thái tài liệu điện tử";
    translation["template.supportedeistatusfieldhelp"] =
        "Giao dịch với trạng thái tài liệu điện tử mà bạn lựa chọn không thể chỉnh sửa khi đi kèm biểu mẫu này. Bạn có thể chọn nhiều trạng thái tài liệu điện tử";
    translation["template.invalidschemaordependency"] =
        "Lược đồ là XSD có cấu trúc không chính xác hoặc không thể tìm thấy lược đồ phụ thuộc.";
    translation["template.xmldoesnotconformtoschema"] =
        "XML của biểu mẫu không tuân thủ XSD hoặc lược đồ đã cung cấp.";
    translation["template.xmldomexception"] =
        "Chuỗi XML đầu vào có định dạng không hợp lệ.";
    translation["template.missingreqdargument"] =
        "Thiếu XSD cho việc xác thực tài liệu gửi đi.";
    translation["template.xsdvalidationexception"] =
        "Đã xảy ra ngoại lệ chưa biết trong quá trình xác thực XSD.";
    translation["template.xsdmissingdependencyfolder"] =
        "Thư mục giản đồ XSD không hợp lệ hoặc bị thiếu.";
    translation["invoice.generatebtn"] = "Tạo tài liệu điện tử";
    translation["invoice.sendbtn"] = "Gửi tài liệu điện tử";
    translation["invoice.sendcertifybtn"] = "Chứng nhận tài liệu điện tử";
    translation["invoice.eipbtn"] = "Xử lý tài liệu điện tử";
    translation["invoice.loguntagged"] =
        "Mẫu tài liệu điện tử đã bị xóa. Giao dịch không được gắn thẻ cho việc tạo tài liệu điện tử.";
    translation["invoice.logforgenerate"] =
        "Giao dịch đã sẵn sàng cho việc tạo tài liệu điện tử.";
    translation["invoice.invalidtemplatesub"] =
        "Công ty con của giao dịch không hợp lệ cho mẫu tài liệu điện tử đã chọn. Chọn một mẫu tài liệu điện tử khác.";
    translation["invoice.templateremovalerror"] =
        "Việc xóa bỏ mẫu tài liệu điện tử cho các tài liệu gửi là không được phép.";
    translation["ei.sending.currentlysending"] =
        "Tài liệu điện tử hiện đang được gửi đi. Quá trình này có thể mất vài phút để hoàn thành. Bạn không được làm gián đoạn quá trình xử lý bằng cách nhấn lại vào nút Gửi tài liệu điện tử. Sau khi tài liệu điện tử đã được gửi, trang sẽ được tải lại.";
    translation["ei.sending.notready"] =
        "Tài liệu điện tử này chưa sẵn sàng để gửi. Đầu tiên, bạn phải nhấp vào Tạo tài liệu điện tử để tạo một tài liệu điện tử.";
    translation["ei.sending.alreadysent"] = "Giao dịch này đã được gửi.";
    translation["ei.sending.norecipients"] =
        "Không thể gửi tài liệu điện tử vì khách hàng này không có thông tin người nhận tài liệu điện tử. Trước khi bạn có thể gửi tài liệu điện tử này qua email, trước hết, cần chọn người nhận tài liệu điện tử trong hồ sơ khách hàng.";
    translation["ei.sending.indivcustnoemail"] =
        "Không thể gửi tài liệu điện tử vì khách hàng này không có địa chỉ email nào. Trước khi bạn có thể gửi tài liệu điện tử này qua email, một địa chỉ email phải được cung cấp trong hồ sơ khách hàng.";
    translation["ei.sending.norecipients.vendor"] =
        "Không thể gửi tài liệu điện tử vì nhà cung cấp này không có thông tin người nhận tài liệu điện tử. Trước khi bạn có thể gửi tài liệu điện tử này qua email, trước hết, cần chọn người nhận tài liệu điện tử trong hồ sơ nhà cung cấp.";
    translation["ei.sending.indivvendnoemail"] =
        "Không thể gửi tài liệu điện tử vì nhà cung cấp này không có địa chỉ email nào. Trước khi bạn có thể gửi tài liệu điện tử này qua email, một địa chỉ email phải được cung cấp trong hồ sơ nhà cung cấp.";
    translation["ei.sending.invalidmethod"] =
        "Chọn phương thức gửi hợp lệ cho {TYPE} #{INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Người gửi: {SENDER}\nNgười nhận: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Người gửi tài liệu điện tử ({EMPLOYEENAME}) không có địa chỉ email nào. Nhập một địa chỉ email hợp lệ vào hồ sơ nhân viên.";
    translation["ei.sending.recipientnoemail"] =
        "Một hoặc nhiều người nhận tài liệu điện tử gắn với giao dịch này không có địa chỉ email. Xác minh rằng các người nhận đối với khách hàng này có địa chỉ email hợp lệ.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Một hoặc nhiều người nhận tài liệu điện tử gắn với giao dịch này không có địa chỉ email. Xác minh rằng các người nhận đối với nhà cung cấp này có địa chỉ email hợp lệ.";
    translation["ei.sending.defaulterror"] =
        "Đã phát sinh lỗi khi gửi tài liệu điện tử này. Kiểm tra Biên bản kiểm tra tài liệu điện tử trên tab phụ Tài liệu điện tử để xem chi tiết.";
    translation["ei.sending.inactivecustomer"] =
        "Không thể gửi tài liệu điện tử cho giao dịch này bởi vì khách hàng đã chọn có trạng thái không hoạt động. Trường Trạng thái tài liệu điện tử chưa được cập nhật và chưa có biên bản kiểm tra nào được tạo. Hãy bỏ chọn hộp Không hoạt động trên hồ sơ khách hàng, sau đó thử gửi lại tài liệu điện tử.";
    translation["ei.sending.inactivevendor"] =
        "Không thể gửi tài liệu điện tử cho giao dịch này bởi vì nhà cung cấp đã chọn có trạng thái không hoạt động. Trường Trạng thái tài liệu điện tử chưa được cập nhật và chưa có biên bản kiểm tra nào được tạo. Hãy bỏ chọn hộp Không hoạt động trên hồ sơ nhà cung cấp, sau đó thử gửi lại tài liệu điện tử.";
    translation["ei.sending.msg.processcomplete"] =
        "Tài liệu điện tử đã được gửi.";
    translation["ei.sending.configurefreecountry"] =
        "Tài khoản này phải có giấy phép hoạt động để sử dụng tính năng Xuất hóa đơn điện tử đa quốc gia. Để gửi một loạt tài liệu điện tử đến một quốc gia, bạn phải chọn quốc gia từ trường Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trong trang thông tin công ty.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Các giao dịch với khách hàng không hoạt động không được hỗ trợ bởi tài liệu điện tử.";
    translation["ei.sending.inactivevendor.manager"] =
        "Các giao dịch với nhà cung cấp không hoạt động không được hỗ trợ bởi tài liệu điện tử.";
    translation["ei.sending.certification.defaulterror"] =
        "Đã phát sinh lỗi khi chứng nhận tài liệu điện tử này. Kiểm tra Biên bản kiểm tra tài liệu điện tử trên tab phụ Tài liệu điện tử để xem chi tiết.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Tài liệu điện tử đã được gửi để chứng nhận.";
    translation["ei.generation.generationlogbulk"] =
        "Tài liệu điện tử đã được tạo ra theo khối lượng lớn bằng cách sử dụng mẫu tài liệu điện tử '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "Tài liệu điện tử đã được tạo bằng cách sử dụng mẫu tài liệu điện tử '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Tài liệu điện tử và tệp PDF đã được tạo ra theo khối lượng lớn bằng cách sử dụng mẫu tài liệu điện tử '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "Tài liệu điện tử và tệp PDF đã được tạo ra bằng cách sử dụng mẫu tài liệu điện tử '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Tài liệu điện tử đã được tạo ra theo khối lượng lớn bằng cách sử dụng mẫu tài liệu điện tử '{TEMPLATENAME}'. Tệp PDF tạo trước đó của giao dịch này đã bị xóa.";
    translation["ei.generation.generationremovedpdflog"] =
        "Tài liệu điện tử đã được tạo bằng cách sử dụng mẫu tài liệu điện tử '{TEMPLATENAME}'. Tệp PDF tạo trước đó của giao dịch này đã bị xóa.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Quy trình tạo theo khối lượng lớn\nMẫu tài liệu điện tử sử dụng: {TEMPLATENAME}\nChi tiết lỗi: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Mẫu tài liệu điện tử sử dụng: {TEMPLATENAME}\nChi tiết lỗi: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Đã phát sinh lỗi trong quá trình tạo. Kiểm tra Biên bản kiểm tra tài liệu điện tử trên tab phụ Tài liệu điện tử để xem chi tiết.";
    translation["ei.generation.inactivecustomer"] =
        "Không thể tạo một tài liệu điện tử cho giao dịch này bởi vì khách hàng đã chọn có trạng thái không hoạt động. Trường Trạng thái tài liệu điện tử chưa được cập nhật và chưa có biên bản kiểm tra nào được tạo. Hãy bỏ chọn hộp Không hoạt động trên hồ sơ khách hàng, sau đó thử tạo lại tài liệu điện tử.";
    translation["ei.generation.inactivevendor"] =
        "Không thể tạo một tài liệu điện tử cho giao dịch này bởi vì nhà cung cấp đã chọn có trạng thái không hoạt động. Trường Trạng thái tài liệu điện tử chưa được cập nhật và chưa có biên bản kiểm tra nào được tạo. Hãy bỏ chọn hộp Không hoạt động trên hồ sơ nhà cung cấp, sau đó thử tạo lại tài liệu điện tử.";
    translation["ei.generation.msg.processcomplete"] =
        "Tài liệu điện tử đã được tạo.";
    translation["ei.generation.configurefreecountry"] =
        "Tài khoản của bạn phải có giấy phép hoạt động để sử dụng tính năng Xuất hóa đơn điện tử đa quốc gia. Để tạo một loạt tài liệu điện tử cho một quốc gia, bạn phải chọn quốc gia từ trường Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trong trang thông tin công ty.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Các giao dịch với khách hàng không hoạt động không được hỗ trợ bởi tài liệu điện tử.";
    translation["ei.generation.inactivevendor.generator"] =
        "Các giao dịch với nhà cung cấp không hoạt động không được hỗ trợ bởi tài liệu điện tử.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Tài liệu điện tử được tạo và ký điện tử thành công.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Quá trình tạo không thành công do tài liệu điện tử tạo ra không phải là XML hay JSON đúng định dạng.";
    translation["notify.batchownersubject"] =
        "Đã hoàn tất việc gửi tài liệu điện tử";
    translation["notify.batchownerbody"] =
        "Xin chào, <br/><br/>Yêu cầu gửi tài liệu điện tử của bạn đã hoàn tất.<br/>{SENT} trên tổng số {TOTAL} đã được gửi. Vui lòng xem tệp đính kèm để biết chi tiết. <br/><br/>Xin cảm ơn,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Tài liệu điện tử được tạo cho PO #{PONUM}";
    translation["notify.recipientcompsubj"] =
        "Tài liệu điện tử được tạo từ {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Xin chào! <br /><br />{MESSAGE}<br />Vui lòng xem tệp tài liệu điện tử đính kèm.<br /><br />Xin cảm ơn,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Đã phát sinh lỗi trong quá trình tạo tài liệu điện tử";
    translation["notify.generationerrorbody"] =
        "Đã xảy ra lỗi trong quá trình tạo tài liệu điện tử.<br/>Vui lòng xem tệp danh sách giao dịch và chi tiết lỗi đính kèm.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Một tài liệu điện tử đã được gửi đối với giao dịch này. Việc tạo một tài liệu điện tử mới sẽ ghi đè lên tài liệu điện tử trước đó. Bạn có chắc chắn muốn tạo một tài liệu điện tử mới?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Việc xóa bỏ mẫu tài liệu điện tử cho các tài liệu gửi là không được phép.";
    translation["transaction.msg.generate.information"] =
        "Việc tạo tài liệu điện tử này đang được tiến hành.";
    translation["transaction.msg.send.information"] =
        "Việc gửi tài liệu điện tử này đang được tiến hành.";
    translation["transaction.msg.send.certify.information"] =
        "Việc chứng nhận tài liệu điện tử này đang được tiến hành.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Việc tạo tài liệu điện tử này hiện đang được tiến hành.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Việc gửi tài liệu điện tử này hiện đang được tiến hành.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Việc chứng nhận tài liệu điện tử này hiện đang được tiến hành.";
    translation["transaction.msg.uncheckpdf"] =
        "Một tệp PDF của giao dịch này đã được tạo trong quá trình tạo tài liệu điện tử cuối. Việc bỏ chọn hộp kiểm này sẽ xóa tệp PDF đó trong quá trình tạo tài liệu điện tử tiếp theo.";
    translation["transaction.msg.nofreecountry"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hoá đơn điện tử đa quốc gia. Để tạo một tài liệu điện tử cho giao dịch này, vui lòng liên hệ với quản trị viên tài khoản của bạn để chỉ định một quốc gia trong trường Quốc gia nhận tài liệu điện tử để sử dụng miễn phí trên trang Thông tin công ty.";
    translation["transaction.msg.otherbillingcountry"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hoá đơn điện tử đa quốc gia. Để tạo một tài liệu điện tử cho giao dịch này, vui lòng liên hệ với người quản lý tài khoản NetSuite của bạn để mua một giấy phép.";
    translation["transaction.msg.nobillingcountry"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hoá đơn điện tử đa quốc gia. Để tạo một tài liệu điện tử cho giao dịch này, vui lòng chỉ định địa chỉ thanh toán cho giao dịch này.";
    translation["transaction.msg.noshippingcountry"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hoá đơn điện tử đa quốc gia. Để tạo một tài liệu điện tử cho giao dịch này, vui lòng chỉ định địa chỉ nhận hàng cho giao dịch này.";
    translation["transaction.msg.nocustomercountry"] =
        "Tài khoản này không có giấy phép hoạt động cho việc sử dụng tính năng Xuất hoá đơn điện tử đa quốc gia. Để tạo một tài liệu điện tử cho giao dịch này, vui lòng chỉ định địa một chỉ thanh toán mặc định cho khách hàng của giao dịch này.";
    translation["transaction.msg.blockededittransaction"] =
        "Việc chỉnh sửa giao dịch bị cấm đối với trạng thái tài liệu điện tử hiện tại. Vui lòng xem mẫu EI đính kèm.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Việc thay đổi giá trị trong trường Loại nội dung từ XML sang một loại khác sẽ xóa bỏ tất cả các trình chứng nhận XML. Bạn có chắc là muốn thay đổi loại nội dung?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Chỉ có thể thêm các trình chứng nhận cho loại nội dung XML.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Trình chứng nhận này đã có trong danh sách.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Các trình chứng nhận mẫu tài liệu điện tử chỉ hỗ trợ các ngữ cảnh UI và SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "Hồ sơ {DEFAULT_DOCUMENT_STANDARD} này đã tồn tại. Bạn không thể tạo một hồ sơ gói tài liệu có cùng tên. Hãy đổi tên hồ sơ gói tài liệu của bạn và thử lại.";
    translation["standarddocument.default.editnotallowed"] =
        "Việc chỉnh sửa Tên hoặc Mô tả hồ sơ {DEFAULT_DOCUMENT_STANDARD} là không được phép.";
    translation["standarddocument.default.deletenotallowed"] =
        "Việc xóa hồ sơ {DEFAULT_DOCUMENT_STANDARD} là không được phép.";
    translation["standarddocument.contextunsupported"] =
        "Gói tài liệu điện tử chỉ hỗ trợ các ngữ cảnh UI, Nhập CSV và SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "Hồ sơ phương thức gửi {DEFAULT_SENDING_METHOD_NAME} đã tồn tại. Bạn không thể tạo một hồ sơ phương thức gửi có cùng tên. Hãy đổi tên hồ sơ phương thức gửi và thử lại.";
    translation["sendingmethod.default.editnotallowed"] =
        "Việc chỉnh sửa hồ sơ phương thức gửi {DEFAULT_SENDING_METHOD_NAME} là không được phép.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Việc xóa hồ sơ phương thức gửi {DEFAULT_SENDING_METHOD_NAME} là không được phép.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Trường Loại giao dịch đã bị vô hiệu bởi vì phương thức gửi này được gán cho một hoặc nhiều hồ sơ giao dịch. Để chỉnh sửa phương thức gửi này, hãy xóa phương thức gửi này khỏi hồ sơ giao dịch để kích hoạt trường Loại giao dịch và thử lại.";
    translation["sendingmethod.contextunsupported"] =
        "Phương thức gửi tài liệu điện tử chỉ hỗ trợ các ngữ cảnh UI và SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Chọn một hoặc nhiều loại giao dịch sẽ được hỗ trợ bởi phương thức gửi này. Để chọn nhiều loại giao dịch, hãy nhấn và giữ phím Ctrl trong khi chọn.<br /><br />Nếu không thể chọn một hoặc nhiều loại giao dịch thì có nghĩa là phương thức gửi đã được gán cho một hoặc nhiều hồ sơ giao dịch của loại giao dịch đó. Trước tiên, bạn phải xóa phương thức gửi khỏi hồ sơ giao dịch để cho phép kích hoạt việc lựa chọn loại giao dịch.";
    translation["sendingmethod.pluginimplementation"] =
        "Triển khai trình cắm phương thức gửi tài liệu điện tử";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Lựa chọn triển khai trình cắm phương thức gửi tài liệu điện tử";
    translation["sendingmethod.scriptbannermessage"] =
        "Phương thức gửi phải là triển khai trình cắm tùy chỉnh. Vui lòng tạo lại tập lệnh phương thức gửi dưới dạng triển khai trình cắm tùy chỉnh mới của loại “Trình cắm Gửi”.";
    translation["customdatasource.pluginimplementation"] =
        "Triển khai trình cắm nguồn dữ liệu tùy chỉnh";
    translation["customdatasource.pluginimplementationhelp"] =
        "Lựa chọn triển khai trình cắm nguồn dữ liệu tùy chỉnh";
    translation["digitalsignature.pluginimplementation"] =
        "Triển khai trình cắm chữ ký điện tử";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Chọn triển khai trình cắm. Trường này là bắt buộc nếu bạn muốn ký điện tử vào tài liệu điện tử.";
    translation["digitalsignature.identifierlabel"] =
        "Tài liệu điện tử đã được ký điện tử";
    translation["digitalsignature.successlog"] =
        "Tài liệu điện tử đã tạo đã được ký điện tử.";
    translation["digitalsignature.failurelog"] =
        "Tài liệu điện tử đã tạo chưa được ký điện tử.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Việc triển khai trình cắm chữ ký điện tử đã trả lại trạng thái không thành công.";
    translation["digitalsignature.plugininvalidresult"] =
        "Kết quả trả lại từ quy trình triển khai trình cắm Chữ ký điện tử không hợp lệ.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Triển khai trình cắm nguồn dữ liệu tùy chỉnh gửi đến";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Lựa chọn triển khai trình cắm nguồn dữ liệu tùy chỉnh gửi đến";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Kết quả từ việc triển khai trình cắm nguồn dữ liệu tùy chỉnh gửi đến không hợp lệ.";
    translation["outboundvalidation.pluginimplementation"] =
        "Triển khai trình cắm chứng nhận gửi đi";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Lựa chọn triển khai trình cắm chứng nhận tài liệu điển tử gửi đi. Việc làm này chứng nhận các tài liệu điện tử gửi đi.";
    translation["outboundvalidation.successlog"] =
        "Chứng nhận gửi đi thành công.";
    translation["outboundvalidation.failurelog"] =
        "Chứng nhận gửi đi không thành công.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Triển khai trình cắm chứng nhận gửi đi trả về trạng thái không thành công.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Kết quả từ việc triển khai trình cắm chứng nhận gửi đi không hợp lệ.";
    translation["template.msg.cannotedittransactiontype"] =
        "Trường Loại giao dịch đã bị vô hiệu vì mẫu này đã được gán cho một hoặc nhiều hồ sơ giao dịch. Để chỉnh sửa mẫu này, hãy xóa mẫu này khỏi hồ sơ giao dịch để kích hoạt trường Loại giao dịch và rồi thử lại. Bạn có thể gán mẫu này cho các tài liệu điện tử gửi đến, và làm vậy sẽ vô hiệu hóa trường Loại giao dịch.";
    translation["template.msg.forcetocopymessage"] =
        "Bạn không thể chỉnh sửa biểu mẫu tài liệu điện tử mặc định. Bạn có thể sao chép biểu mẫu này bằng cách chọn Tạo bản sao từ Hành động hoặc tạo biểu mẫu mới.";
    translation["template.msg.warningoneditmessage"] =
        "Đây là biểu mẫu tài liệu điện tử mặc định. Bất kỳ thay đổi nào cho biểu mẫu này sẽ bị mất đi hoặc sẽ bị ghi đè khi cập nhật SuiteApp .";
    translation["email.batchownernotification.subject"] =
        "Đã hoàn tất việc gửi tài liệu điện tử";
    translation["email.batchownernotification.body"] =
        "Xin chào, <br/><br/>Tài liệu điện tử của bạn đã gửi xong.<br/>{SENT} trên tổng số {TOTAL} đã được gửi. Vui lòng xem tệp đính kèm để biết chi tiết. <br/><br/>Xin cảm ơn,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Chuyển đổi tài liệu điện tử đã hoàn tất";
    translation["email.batchownerconvertnotification.body"] =
        "Xin chào, <br/><br/>Tài liệu điện tử của bạn đã chuyển đổi xong.<br/>{CONVERTED} trên tổng số {TOTAL} đã được chuyển đổi. Vui lòng xem tệp đính kèm để biết chi tiết. <br/><br/>Xin cảm ơn,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Tài liệu điện tử được tạo cho PO #{PONUM}";
    translation["email.recipientnotification.subject"] =
        "Tài liệu điện tử được gửi từ {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Tài liệu điện tử được tạo cho {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Xin chào! <br /><br />Tài liệu điện tử cho PO #{PONUM} đã được tạo.<br />Vui lòng xem tài liệu điện tử đính kèm để biết chi tiết.<br /><br />Xin cảm ơn,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Xin chào! <br /><br />Tài liệu điện tử cho {TYPE} #{TRANID} đã được tạo.<br />Vui lòng xem tài liệu điện tử đính kèm để biết chi tiết.<br /><br />Xin cảm ơn,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Đã phát sinh lỗi trong quá trình tạo tài liệu điện tử";
    translation["email.generationerrornotification.body"] =
        "Đã xảy ra lỗi trong quá trình tạo tài liệu điện tử.<br/>Vui lòng xem tệp danh sách giao dịch và chi tiết lỗi đính kèm.";
    translation["email.sendingerrornotification.subject"] =
        "Đã phát sinh lỗi trong quá trình gửi tài liệu điện tử";
    translation["email.sendingerrornotification.body"] =
        "Đã phát sinh lỗi trong quá trình gửi tài liệu điện tử.<br/>Vui lòng xem file danh sách giao dịch và chi tiết lỗi đính kèm.";
    translation["email.webserviceerror.subject"] =
        "Thông báo dịch vụ web tài liệu điện tử gửi đến";
    translation["email.webserviceerror.body"] =
        "<p>Xin chào,</p><p>Đã phát sinh lỗi trong quá trình xử lý tài liệu điện tử gửi đến sử dụng dịch vụ web.<br/>Vui lòng xem chi tiết dưới đây.</p>{DETAIL_TABLE}<p>Xin cảm ơn,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] = "Số giao dịch";

    return translation;
});
