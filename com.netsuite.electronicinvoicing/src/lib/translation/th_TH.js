define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "รายละเอียด";
    translation["email.attachment.collabel.transactiontype"] = "ประเภทธุรกรรม";
    translation["email.attachment.collabel.internalid"] = "ID ภายใน";
    translation["email.attachment.collabel.vendor"] = "ผู้ค้า";
    translation["email.conversionerrornotification.subject"] =
        "พบข้อผิดพลาดระหว่างการแปลง E-Document ขาเข้า";
    translation["email.conversionerrornotification.body"] =
        "มีข้อผิดพลาดเกิดขึ้นระหว่างการแปลง E-Document ขาเข้า<br/>โปรดดูไฟล์ที่แนบสำหรับรายการไฟล์ข้อมูลที่มีข้อผิดพลาดและรายละเอียด";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>หมายเหตุ: หากคุณต้องการให้ผู้ใช้อื่นรับการแจ้งเตือนแทนผู้ดูแลบัญชีของคุณ ให้ป้อนที่อยู่อีเมลของผู้ใช้ในช่องผู้รับการแจ้งเตือน E-Document ในไฟล์ข้อมูลบริษัทสาขาหลักของคุณ";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID ของ E-Document ขาเข้า";
    translation["email.table.collabel.details"] = "รายละเอียด";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "พบข้อผิดพลาดระหว่างการตรวจสอบใบอนุญาตของบัญชี";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ใช้งานสำหรับการใช้ Electronic Invoicing แบบหลายประเทศ</br>หากต้องการประมวลผล E-Document เป็นจำนวนมาก โปรดกำหนดค่า &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["inboundedocument.logforconversion"] =
        "E-Document ขาเข้าพร้อมแล้วสำหรับการแปลง";
    translation["inboundedocument.logincomplete"] =
        "E-Document ขาเข้าไม่สมบูรณ์ ไม่ได้เลือก {FIELD}";
    translation["inboundedocument.deletenotallowed"] =
        "ไม่อนุญาตให้ลบ E-Document ขาเข้า";
    translation["inboundedocument.copynotallowed"] =
        "ไม่อนุญาตให้คัดลอก E-Document ขาเข้า";
    translation["inboundedocument.contextunsupported"] =
        "E-Document ขาเข้ารองรับเฉพาะบริบท UI และ SuiteScript เท่านั้น";
    translation["inboundedocument.invalidxmlfile"] =
        "การอ้างอิงไฟล์ XML ที่เลือกไม่ใช่ไฟล์ XML ที่ถูกต้อง ตรวจสอบให้แน่ใจว่าไฟล์ที่คุณเลือกมีนามสกุลเป็น .xml";
    translation["inboundedocument.invalidpdffile"] =
        "การอ้างอิงไฟล์ PDF ที่เลือกไม่ใช่ไฟล์ PDF ที่ถูกต้อง ตรวจสอบให้แน่ใจว่าไฟล์ที่คุณเลือกมีนามสกุลเป็น .pdf";
    translation["inboundedocument.invalidxml"] =
        "การอ้างอิงไฟล์ XML ที่เลือกไม่ใช่เอกสาร XML ที่มีรูปแบบถูกต้อง";
    translation["inboundedocument.convert.button"] = "แปลง";
    translation["inboundedocument.convert.information"] =
        "การแปลง E-Document ขาเข้านี้กำลังอยู่ในระหว่างดำเนินการ";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "การแปลง E-Document ขาเข้านี้กำลังอยู่ในระหว่างดำเนินการอยู่แล้ว";
    translation["inboundedocument.cancel.button"] = "ยกเลิก E-Document";
    translation["inboundedocument.cancel.confirmation"] =
        "คุณแน่ใจหรือไม่ว่าต้องการยกเลิก E-Document ขาเข้านี้";
    translation["inboundedocument.cancel.failed"] =
        "การยกเลิกล้มเหลวเนื่องจากสถานะของไฟล์ข้อมูล E-Document ขาเข้าเป็น '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "เกิดข้อผิดพลาดระหว่างการยกเลิก โปรดดูรายละเอียดของเส้นทางการตรวจสอบ E-Document บนแท็บย่อย E-Document";
    translation["inboundedocument.cancel.complete"] = "ยกเลิก E-Document แล้ว";
    translation["inboundedocument.preview.button"] = "ดู XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลสำหรับใช้ Electronic Invoicing SuiteApp ในหลายประเทศ หากต้องการแปลง E-Document นี้เป็นธุรกรรม โปรดติดต่อผู้ดูแลบัญชีของคุณเพื่อระบุประเทศในช่อง &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลสำหรับใช้ Electronic Invoicing SuiteApp ในหลายประเทศ หากต้องการแปลง E-Document นี้เป็นธุรกรรม โปรดติดต่อผู้ดูแลบัญชี NetSuite ของคุณเพื่อสั่งซื้อใบอนุญาต";
    translation["inboundedocument.msg.nobillingcountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลสำหรับใช้ Electronic Invoicing SuiteApp ในหลายประเทศ หากต้องการแปลง E-Document นี้เป็นธุรกรรม โปรดตั้งค่าที่อยู่เรียกเก็บเงินเริ่มต้้นของผู้ค้าที่เลือกไว้";
    translation["validationplugin.contextunsupported"] =
        "ปลั๊กอินการตรวจสอบความถูกต้อง E-Document ขาเข้ารองรับเฉพาะบริบท UI และ SuiteScript เท่านั้น";
    translation["validationplugin.pluginimplementation"] =
        "การใช้งานปลั๊กอินการตรวจสอบความถูกต้อง E-Document ขาเข้า";
    translation["validationplugin.pluginimplementationhelp"] =
        "เลือกการใช้งานปลั๊กอินการตรวจสอบความถูกต้อง E-Document ขาเข้า";
    translation["validationplugin.scriptbannermessage"] =
        "การตรวจสอบความถูกต้องของ E-Document ขาเข้า ควรจะเป็นการใช้งานปลั๊กอินแบบกำหนดเอง โปรดสร้างสคริปต์วิธีการตรวจสอบความถูกต้องที่มีอยู่อีกครั้งเป็นการใช้งานปลั๊กอินแบบกำหนดเองใหม่ประเภท &quot;ปลั๊กอินการตรวจสอบความถูกต้องขาเข้า&quot;";
    translation["ei.conversion.defaulterror"] =
        "เกิดข้อผิดพลาดระหว่างการแปลง โปรดดูรายละเอียดของเส้นทางการตรวจสอบ E-Document บนแท็บย่อย E-Document";
    translation["ei.conversion.inactivevendor"] =
        "ไม่สามารถแปลง E-Document ขาเข้านี้ได้ เนื่องจากผู้ค้าที่เลือกอยู่ในสถานะไม่ได้ใช้งาน ช่องสถานะ E-Document ไม่ได้รับการอัปเดต และเส้นทางการตรวจสอบไม่ได้ถูกสร้างขึ้น ล้างกล่องกาเครื่องหมายที่ไม่ได้ใช้งานบนไฟล์ข้อมูลผู้ค้า จากนั้นลองแปลง E-Document อีกครั้ง";
    translation["ei.conversion.inactivecustomer"] =
        "ไม่สามารถแปลง E-Document ขาเข้านี้ได้ เนื่องจากลูกค้าที่เลือกอยู่ในสถานะไม่ได้ใช้งาน ช่องสถานะ E-Document ไม่ได้รับการอัปเดต และเส้นทางการตรวจสอบไม่ได้ถูกสร้างขึ้น ล้างกล่องกาเครื่องหมายที่ไม่ได้ใช้งานบนไฟล์ข้อมูลลูกค้า จากนั้นลองแปลง E-Document อีกครั้ง";
    translation["ei.conversion.conversioncomplete"] = "แปลง E-Document แล้ว";
    translation["ei.conversion.conversionlogbulk"] =
        "รวม E-Document ขาเข้าไว้ในการแปลงจำนวนมาก และแปลงเป็นธุรกรรมที่มี ID ภายใน: {INTERNALID} ประเภท: '{TYPE}'";
    translation["ei.conversion.conversionlog"] =
        "แปลง E-Document ขาเข้าเป็นธุรกรรมที่มี ID ภายใน: {INTERNALID} ประเภท: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "กระบวนการแปลงจำนวนมาก\nแม่แบบ E-Document ที่ใช้: {TEMPLATENAME}\nขอบเขตข้อผิดพลาด: {ERRORSCOPE}\nรายละเอียดข้อผิดพลาด: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "แม่แบบ E-Document ที่ใช้: {TEMPLATENAME}\nขอบเขตข้อผิดพลาด: {ERRORSCOPE}\nรายละเอียดข้อผิดพลาด: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "การแยกวิเคราะห์ล้มเหลว ตรวจสอบการแมปช่องสำหรับ E-Document ขาเข้า";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "การแปลงล้มเหลว";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "การตรวจสอบความถูกต้องล้มเหลว";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "การแปลงล้มเหลวเนื่องจากสถานะของไฟล์ข้อมูล E-Document ขาเข้าเป็น '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "ไม่รองรับ E-Document ขาเข้าที่มีลูกค้าที่ไม่ได้ใช้งานสำหรับการแปลง";
    translation["ei.conversion.inactivevendor.converter"] =
        "ไม่รองรับ E-Document ขาเข้าที่มีผู้ค้าที่ไม่ได้ใช้งานสำหรับการแปลง";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "รหัสผู้ค้าต่อไปนี้: {ITEMLIST} ไม่ได้เชื่อมโยงกับไฟล์ข้อมูลรายการใดๆ";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "รหัส/ชื่อผู้ค้าต่อไปนี้: {ITEMLIST} ไม่ได้เชื่อมโยงกับไฟล์ข้อมูลรายการใดๆ";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "รหัสผู้ค้าต่อไปนี้: {ITEMLIST} ได้เชื่อมโยงกับหลายไฟล์ข้อมูลรายการ แก้ไขไฟล์ข้อมูลรายการและตรวจสอบให้แน่ใจว่ารหัสผู้ค้าไม่ซ้ำกันสำหรับแต่ละรายการต่อผู้ค้า";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "รหัส/ชื่อผู้ค้าต่อไปนี้: {ITEMLIST} ได้เชื่อมโยงกับหลายไฟล์ข้อมูลรายการ แก้ไขไฟล์ข้อมูลรายการและตรวจสอบให้แน่ใจว่ารหัส/ชื่อผู้ค้าไม่ซ้ำกันสำหรับแต่ละรายการต่อผู้ค้า";
    translation["ei.conversion.refnumnotfound"] =
        "หมายเลขอ้างอิงที่จำเป็นใน E-Document ขาเข้าหายไป ยกเลิก E-Document นี้ และส่ง E-Document อื่นที่มีองค์ประกอบ XML สำหรับหมายเลขอ้างอิงที่แมปไว้กับช่อง tranid";
    translation["ei.conversion.refnumexists"] =
        "มีใบเรียกเก็บเงินของผู้ค้าที่มีหมายเลขอ้างอิงเดียวกันอยู่แล้ว ยกเลิก E-Document นี้ และส่ง E-Document อื่นที่มีค่าหมายเลขอ้างอิงที่ถูกต้องสำหรับองค์ประกอบ XML ที่แมปไว้กับช่อง tranid";
    translation["ei.conversion.vendorcodenotfound"] =
        "ช่อง Vendorcode ในแม่แบบ E-Document หายไป แก้ไขแม่แบบ E-Document หรือเลือกแม่แบบอื่นที่มีการแมปช่อง Vendorcode";
    translation["ei.conversion.novendorcodevalue"] =
        "มีอย่างน้อยหนึ่งรายการที่ไม่มีรหัสผู้ค้า ยกเลิก E-Document นี้ และส่ง E-Document อื่นที่มีค่าที่ถูกต้องสำหรับองค์ประกอบ XML ที่แมปไว้กับช่อง Vendorcode";
    translation["ei.conversion.vendornamenotfound"] =
        "ช่อง Vendorname ในแม่แบบ E-Document หายไป แก้ไขแม่แบบ E-Document หรือเลือกแม่แบบอื่นที่มีการแมปช่อง Vendorname";
    translation["ei.conversion.novendornamevalue"] =
        "มีอย่างน้อยหนึ่งรายการที่ไม่มีรหัส/ชื่อผู้ค้า ยกเลิก E-Document นี้ และส่ง E-Document อื่นที่มีค่าที่ถูกต้องสำหรับองค์ประกอบ XML ที่แมปไว้กับช่องชื่อ/รหัสผู้ค้า";
    translation["ei.conversion.sourcetransnotfound"] =
        "ไม่พบไฟล์ข้อมูล ({TRANSTYPE}#{TRANSID}) ในระบบ ยกเลิก E-Document นี้ และส่ง E-Document อื่นที่มีค่าที่ถูกต้องสำหรับองค์ประกอบ XML ที่แมปไว้กับช่อง Createdfrom";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "กำหนดไฟล์ข้อมูล ({TRANSTYPE}#{TRANSID}) ให้กับเอนทิตี้อื่นแล้ว เลือกเอนทิตี้ที่ถูกต้องและแปลง E-Document นี้";
    translation["ei.conversion.novendorexpenseaccount"] =
        "ผู้ค้าไม่มีบัญชีค่าใช้จ่ายที่กำหนดเป็นค่าเริ่มต้น ซึ่งจำเป็นต้องมีเพื่อแปลงใบเรียกเก็บเงินที่มีค่าใช้จ่าย หากต้องการดำเนินการแปลงต่อ คุณต้องตั้งค่าไว้ในช่องบัญชีค่าใช้จ่ายที่กำหนดเป็นค่าเริ่มต้นในไฟล์ข้อมูลผู้ค้า";
    translation["ei.conversion.nolinktopo"] =
        "E-Document ขาเข้าไม่มีสินค้าหรือค่าใช้จ่ายที่รวมไว้ในใบสั่งซื้อที่อ้างถึง ตรวจสอบสถานะของใบสั่งซื้อที่อ้างถึงหากสามารถทำการแปลงได้ หากสามารถทำการแปลงได้ ให้ยกเลิก E-Document นี้ และส่ง E-Document อื่นที่มีค่าที่ถูกต้องสำหรับองค์ประกอบ XML ที่แมปไว้กับช่อง Createdfrom";
    translation["inbound.formtitle"] = "แปลง E-Document ขาเข้า";
    translation["inbound.search"] = "ค้นหา";
    translation["inbound.convert"] = "แปลง";
    translation["inbound.return"] = "กลับสู่เกณฑ์";
    translation["inbound.vendor"] = "ผู้ค้า";
    translation["inbound.datefrom"] = "วันที่สร้างตั้งแต่";
    translation["inbound.dateto"] = "วันที่สร้างถึง";
    translation["inbound.vendorhelp"] =
        "เลือกผู้ค้าที่ซึ่ง E-Document ขาเข้าที่ล้มเหลวจะถูกรวมไว้ในผลการค้นหา";
    translation["inbound.datefromhelp"] =
        "เลือกวันที่เริ่มต้นเพื่อระบุช่วงเวลาที่ซึ่ง E-Document ขาเข้าที่ล้มเหลวซึ่งสร้างขึ้นภายในช่วงเวลานั้น จะถูกรวมไว้ในผลการค้นหา";
    translation["inbound.datetohelp"] =
        "เลือกวันที่สิ้นสุดเพื่อระบุช่วงเวลาที่ซึ่ง E-Document ขาเข้าที่ล้มเหลวซึ่งสร้างขึ้นภายในช่วงเวลานั้น จะถูกรวมไว้ในผลการค้นหา";
    translation["inbound.inboundedocfieldgroup"] =
        "ฟิลเตอร์การค้นหา E-Document ขาเข้าที่ล้มเหลว";
    translation["inbound.sublist.sublistname"] =
        "ผลการค้นหาของ E-Document ขาเข้าที่ล้มเหลว";
    translation["inbound.sublist.internalid"] = "หมายเลขภายใน";
    translation["inbound.sublist.vendor"] = "ผู้ค้า";
    translation["inbound.sublist.refnum"] = "หมายเลขอ้างอิง";
    translation["inbound.sublist.ponum"] = "หมายเลข PO";
    translation["inbound.sublist.datecreated"] = "วันที่สร้าง";
    translation["inbound.sublist.edoctemplate"] = "แม่แบบ E-Document";
    translation["inbound.msg.conversionongoing"] =
        "กำลังแปลง E-Document อยู่ในขณะนี้ คุณจะได้รับอีเมลเมื่อขั้นตอนเสร็จสิ้น";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "คุณไม่สามารถดำเนินการค้นหาด้วยเกณฑ์ที่เลือก เนื่องจากการแปลง E-Document ขาเข้าอยู่ในระหว่างดำเนินการอยู่แล้วสำหรับช่วงวันที่ ({DATECREATED_FROM} - {DATECREATED_TO}) คุณต้องเปลี่ยนแปลงเกณฑ์การค้นหาหรือลองอีกครั้งหลังจากแปลง E-Document นี้";
    translation["inbound.invaliddates"] =
        "วันที่สร้างตั้งแต่จะต้องไม่ใช่วันที่หลังจากวันที่สร้างถึง เปลี่ยนวันที่เพื่อให้วันที่สร้างตั้งแต่เป็นวันที่ก่อนหน้าวันที่สร้างถึง";
    translation["inbound.configurefreecountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลสำหรับใช้ Electronic Invoicing SuiteApp ในหลายประเทศ หากต้องการแปลง E-Document เป็นจำนวนมาก โปรดติดต่อผู้ดูแลบัญชีของคุณเพื่อกำหนดค่า &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["portlet.title"] = "เอกสารอิเล็กทรอนิกส์";
    translation["portlet.outboundforgeneration"] =
        "E-Document ขาออกสำหรับการสร้าง";
    translation["portlet.outboundforsending"] = "E-Document ขาออกสำหรับการส่ง";
    translation["portlet.outboundwitherrors"] =
        "E-Document ขาออกที่มีข้อผิดพลาด";
    translation["portlet.outboundsendinglink"] =
        "ส่ง E-Document ขาออกที่ล้มเหลว";
    translation["portlet.inboundforconversion"] =
        "E-Document ขาเข้าสำหรับการแปลง";
    translation["portlet.inboundconvertfailed"] =
        "แปลง E-Document ขาเข้าที่ล้มเหลว";
    translation["portlet.inboundincomplete"] = "E-Document ขาเข้าที่ไม่สมบูรณ์";
    translation["portlet.inbounduploadlink"] = "อัปโหลด E-Document ขาเข้า";
    translation["portlet.outboundforcertification"] =
        "E-Document ขาออกสำหรับการรับรอง";
    translation["portlet.outboundcertifiedforsending"] =
        "E-Document ขาออกสำหรับการส่ง";
    translation["inbound.webservice.response.success"] =
        "E-Document ขาเข้าที่มี ID: สร้าง {ID} สำเร็จแล้ว";
    translation["inbound.webservice.response.novendor"] =
        "ไม่ได้เชื่อมโยงผู้ค้ากับ ID เว็บเซอร์วิส: {IDENTIFIER} ตรวจสอบให้แน่ใจว่าใช้ ID เว็บเซอร์วิสที่ถูกต้อง";
    translation["inbound.webservice.response.multiplevendor"] =
        "E-Document ขาเข้าที่มี ID: สร้าง {ID} สำเร็จแล้ว อย่างไรก็ตาม มีผู้ค้าหลายรายที่เชื่อมโยงกับ ID เว็บเซอร์วิส: {IDENTIFIER}";
    translation["inbound.webservice.error.templateerror"] =
        "E-Document ขาเข้าไม่สมบูรณ์ เนื่องจากไม่สามารถกำหนดแม่แบบที่ถูกต้องได้ เลือกระหว่างแม่แบบในไฟล์ข้อมูล E-Document ขาเข้า หรือตั้งค่า XSD ในไฟล์ข้อมูลแม่แบบ E-Document เพื่อให้สามารถเลือกแม่แบบได้โดยอัตโนมัติ";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "E-Document ขาเข้าไม่สมบูรณ์ เนื่องจากไม่สามารถกำหนดผู้ค้าที่ถูกต้องได้ เลือกระหว่างผู้ค้าในไฟล์ข้อมูล E-Document ขาเข้า หรือตั้งค่า ID เว็บเซอร์วิสในไฟล์ข้อมูลผู้ค้าที่เกี่ยวข้อง";
    translation["inbound.webservice.error.missingkeyerror"] =
        "คีย์ต่อไปนี้หายไป: {KEYS} ซึ่งคุณต้องแจ้งไว้ในคำขอเว็บเซอร์วิส";
    translation["inbound.webservice.error.invalidparamerror"] =
        "เนื้อหาของคำขอเว็บเซอร์วิสต้องเป็นออบเจ็กต์ JSON หรืออาร์เรย์ของออบเจ็กต์ JSON ที่ใช้ประเภทเนื้อหา: 'application/json'";
    translation["transaction.contactnoemail"] =
        "ผู้รับ E-Document ต่อไปนี้ไม่มีที่อยู่อีเมลในไฟล์ข้อมูลผู้ติดต่อของตน: {CONTACTNAMES}";
    translation["transaction.norecipients"] =
        "ไม่มีผู้รับ E-Document สำหรับธุรกรรมนี้ หากต้องการส่ง E-Document ทางอีเมล คุณจะต้องเพิ่มผู้ติดต่อในรายชื่อผู้รับ E-Document อย่างน้อยที่สุดหนึ่งชื่อ";
    translation["transaction.maxrecipientexceeded"] =
        "จำนวนผู้รับอีเมลที่คุณเพิ่มเกินขีดจำกัดแล้ว คุณสามารถเพิ่มผู้รับอีเมลได้สูงสุด 10 คน";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "ระบบจะประมวลผลเฉพาะประเภทการทำรายการต่อไปนี้:";
    translation["ei.prefs.formtitle"] = "การกำหนดค่า E-Document";
    translation["ei.prefs.information.about.certify.skip"] =
        "ระบบจะข้ามขั้นตอนการรับรอง หากไม่ได้มีการกำหนดวิธีการส่งการรับรองหรือใช้ไม่ได้กับธุรกรรม";
    translation["ei.prefs.label.sublist.automati.ei"] = "E-Invoicing อัตโนมัติ";
    translation["ei.prefs.label.automatic.type.selected"] =
        "ประเภทระบบอัตโนมัติของ E-Document";
    translation["ei.prefs.text.option.comb.disabled"] = "ปิดใช้งาน";
    translation["ei.prefs.text.option.comb.gcs"] = "สร้าง, รับรอง, ส่ง";
    translation["ei.prefs.text.option.comb.gc"] = "สร้าง, รับรอง";
    translation["ei.prefs.text.option.comb.cs"] = "รับรอง, ส่ง";
    translation["ei.prefs.btn.label.cancel"] = "ยกเลิก";
    translation["ei.prefs.btn.label.save"] = "บันทึก";
    translation["ei.prefs.msg.confirm.save"] =
        "คุณต้องการบันทึกการเปลี่ยนแปลงการกำหนดค่า E-Document หรือไม่";
    translation["ei.prefs.msg.success.save"] =
        "การบันทึกการกำหนดค่า E-Document สำเร็จแล้ว";
    translation["ei.prefs.msg.failed.save"] =
        "การบันทึกการกำหนดค่า E-Document ล้มเหลว";
    translation["ei.prefs.insufficient.permission.details"] =
        "จำกัดการอนุญาตให้เข้าใช้หน้านี้ หากต้องการส่งคำขอเข้าใช้ ให้ติดต่อผู้ดูแลระบบ";
    translation["ei.eip.msg.completed"] = "การประมวลผล E-Document เสร็จสมบูรณ์";
    translation["ei.eip.msg.failed"] =
        "การประมวลผล E-Document ล้มเหลว โปรดดูรอยทางการตรวจสอบของ E-Document สำหรับรายละเอียดเพิ่มเติม";
    translation["ei.eip.msg.processing"] = "E-Document กำลังประมวลผล";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "E-Document กำลังประมวลผลอยู่แล้ว";
    translation["license.notinstalled"] =
        "ไม่มีไคลเอ็นต์ใบอนุญาตสำหรับ NetSuite SuiteApps ที่พร้อมใช้งานในบัญชีของคุณ โปรดติดตั้ง SuiteApp นี้เพื่อเข้าใช้งานคุณสมบัติการออกใบแจ้งหนี้อิเล็กทรอนิกส์ทั้งหมด";
    translation["outbound.formtitle"] = "ส่ง E-Document ที่ล้มเหลว";
    translation["outbound.search"] = "ค้นหา";
    translation["outbound.send"] = "ส่ง";
    translation["outbound.return"] = "กลับสู่เกณฑ์";
    translation["outbound.customer"] = "ลูกค้า";
    translation["outbound.vendor"] = "ผู้ค้า";
    translation["outbound.subsidiary"] = "บริษัทสาขา";
    translation["outbound.type"] = "ประเภทธุรกรรม";
    translation["outbound.datefrom"] = "วันที่ธุรกรรมเริ่มต้น";
    translation["outbound.dateto"] = "วันที่ธุรกรรมสิ้นสุด";
    translation["outbound.subshelp"] =
        "เลือกรายการย่อยเพื่อแสดงเฉพาะธุรกรรมที่เป็นของรายการย่อยนั้นเท่านั้น";
    translation["outbound.custhelp"] =
        "เลือกลูกค้าเพื่อแสดงเฉพาะธุรกรรมที่เป็นของลูกค้ารายนั้นเท่านั้น ถ้าไม่ได้เลือกลูกค้า ผลการค้นหาจะแสดงธุรกรรมทั้งหมดที่เป็นของรายการย่อย โดยไม่คำนึงถึงลูกค้า";
    translation["outbound.vendorhelp"] =
        "เลือกผู้ค้าเพื่อแสดงเฉพาะธุรกรรมที่เป็นของผู้ค้ารายนั้นเท่านั้น ถ้าไม่ได้เลือกผู้ค้า ผลการค้นหาจะแสดงธุรกรรมทั้งหมดที่เป็นของรายการย่อย โดยไม่คำนึงถึงผู้ค้า";
    translation["outbound.entitytypehelp"] =
        "เลือกประเภทเอนทิตี้ของลูกค้าหรือผู้ค้า การดำเนินการนี้จะเปิดใช้งานรายการแบบหล่นลงที่สอดคล้องกันด้านล่าง";
    translation["outbound.typehelp"] =
        "เลือกประเภทธุรกรรมตั้งแต่หนึ่งรายการขึ้นไปสำหรับ E-Document แต่ละรายการที่คุณต้องการส่ง ในการเลือกประเภทธุรกรรมหลายประเภท ให้กดปุ่ม Ctrl ค้างไว้ขณะเลือกธุรกรรมแต่ละประเภท <br /><br />หากไม่ได้เลือกประเภทธุรกรรม ผลการค้นหาจะแสดง E-Document ทั้งหมดที่พร้อมจะส่ง โดยไม่คำนึงถึงประเภทธุรกรรม";
    translation["outbound.datefromhelp"] =
        "ในการดูรายชื่อธุรกรรมที่สร้างขึ้นภายในช่วงวันที่ที่กำหนด ให้เลือกวันที่เพื่อระบุจุดเริ่มต้นของช่วงวันที่";
    translation["outbound.datetohelp"] =
        "ในการดูรายชื่อธุรกรรมที่สร้างขึ้นภายในช่วงวันที่ที่กำหนด ให้เลือกวันที่เพื่อระบุจุดสิ้นสุดของช่วงวันที่";
    translation["outbound.entityfieldgroup"] = "ฟิลเตอร์การค้นหาเอนทิตี้";
    translation["outbound.filtersfieldgroup"] = "ฟิลเตอร์การค้นหาธุรกรรม";
    translation["outbound.entitytypeinlinehelp"] = "เลือกประเภทเอนทิตี้:";
    translation["outbound.invalidtypetitle"] = "ประเภทธุรกรรมไม่ถูกต้อง";
    translation["outbound.invalidtype"] =
        "ประเภทธุรกรรมต่อไปนี้ไม่ได้รับการรองรับในขณะนี้: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "ประเภทธุรกรรมต่อไปนี้ไม่ถูกต้องสำหรับเอนทิตี้ที่เลือกไว้: {TRANSACTIONTYPES} เลือกประเภทธุรกรรมที่เหมาะสมสำหรับเอนทิตี้ที่คุณเลือก";
    translation["outbound.invaliddates"] =
        "วันที่ธุรกรรมเริ่มต้นจะต้องไม่ใช่วันที่หลังจากวันที่ธุรกรรมสิ้นสุด เปลี่ยนวันที่เพื่อให้วันที่ธุรกรรมเริ่มต้นเป็นวันที่ก่อนหน้าวันที่ธุรกรรมสิ้นสุด";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "คุณไม่สามารถดำเนินการค้นหาด้วยเกณฑ์ที่เลือก เนื่องจากการส่ง E-Document กำลังอยู่ในระหว่างดำเนินการอยู่แล้วสำหรับธุรกรรมภายในช่วงวันที่ ({TRANDATE_FROM} - {TRANDATE_TO}) สำหรับ บริษัทในเครือ ({SUBSIDIARY}) คุณต้องเปลี่ยนเกณฑ์การค้นหาหรือลองอีกครั้งหลังจากส่ง E-Document นี้";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "คุณไม่สามารถดำเนินการค้นหาด้วยเกณฑ์ที่เลือก เนื่องจากการส่ง E-Document กำลังอยู่ในระหว่างดำเนินการอยู่แล้วสำหรับธุรกรรมภายในช่วงวันที่ ({TRANDATE_FROM} - {TRANDATE_TO}) คุณต้องเปลี่ยนเกณฑ์การค้นหาหรือลองอีกครั้งหลังจากส่ง E-Document นี้";
    translation["outbound.sublist.trannum"] = "หมายเลขธุรกรรม";
    translation["outbound.sublist.trantype"] = "ประเภทธุรกรรม";
    translation["outbound.sublist.customer"] = "ลูกค้า";
    translation["outbound.sublist.vendor"] = "ผู้ค้า";
    translation["outbound.sublist.subsidiary"] = "บริษัทสาขา";
    translation["outbound.sublist.trandate"] = "วันที่ทำธุรกรรม";
    translation["outbound.sublist.memo"] = "บันทึกย่อ";
    translation["outbound.sublist.template"] = "แม่แบบ";
    translation["outbound.sublist.sendingmethod"] = "วิธีการส่ง";
    translation["outbound.sublist.sublistname"] =
        "ผลการค้นหาของ E-Document ขาออกที่ล้มเหลวที่จะส่ง";
    translation["outbound.msg.sendingongoing"] =
        "ขณะนี้กำลังส่ง E-Document คุณจะได้รับอีเมลเมื่อขั้นตอนเสร็จสิ้น";
    translation["outbound.configurefreecountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลอยู่สำหรับการใช้ใบแจ้งหนี้อิเล็กทรอนิกส์ในหลายประเทศ หากต้องการส่ง E-Document เป็นจำนวนมาก โปรดติดต่อผู้ดูแลบัญชีของคุณเพื่อกำหนดค่า &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["outbound.entitysend"] = "ส่งไปยังเอนทิตี้";
    translation["outbound.certifysend"] = "ส่งเพื่อรับรอง";
    translation["outbound.sendingtypehelp"] =
        "เลือกว่าส่งไปยังเอนทิตี้หรือส่งเพื่อรับรอง ซึ่งระบุรายชื่อธุรกรรมที่สอดคล้องกันสำหรับการส่ง";
    translation["customer.noemail"] =
        "ไม่มีที่อยู่อีเมลสำหรับลูกค้ารายนี้ ใส่ที่อยู่อีเมลที่ถูกต้องในไฟล์ข้อมูลของลูกค้า เพื่อให้สามารถส่ง E-Document ทางอีเมลได้";
    translation["customer.contactnoemail"] =
        "ผู้รับ E-Document ต่อไปนี้ไม่มีที่อยู่อีเมลในไฟล์ข้อมูลผู้ติดต่อของตน: {CONTACTNAMES}";
    translation["customer.norecipients"] =
        "ไม่มีผู้รับ E-Document สำหรับลูกค้ารายนี้ ในการส่งเอกสารอิเล็กทรอนิกส์ทางอีเมลถึงลูกค้ารายนี้ คุณจะต้องเพิ่มผู้ติดต่อในรายการผู้รับ E-Document อย่างน้อยที่สุดหนึ่งรายการ";
    translation["customer.arrayrequired"] =
        "ต้องมีอาร์เรย์ผู้ติดต่อเพื่อการตรวจสอบความถูกต้อง";
    translation["customer.parameternotarray"] =
        "พารามิเตอร์ผู้ติดต่อไม่ใช่อาร์เรย์";
    translation["customer.maxrecipientexceeded"] =
        "คุณมีจำนวนผู้รับอีเมลเกินจำนวนสูงสุดแล้ว เลือกผู้รับอีเมลได้สูงสุดแค่ 10 รายเท่านั้น";
    translation["vendor.noemail"] =
        "ไม่มีที่อยู่อีเมลสำหรับผู้ค้ารายนี้ ใส่ที่อยู่อีเมลที่ถูกต้องในไฟล์ข้อมูลของผู้ค้า เพื่อให้สามารถส่ง E-Document ทางอีเมลได้";
    translation["vendor.contactnoemail"] =
        "ผู้รับ E-Document ต่อไปนี้ไม่มีที่อยู่อีเมลในไฟล์ข้อมูลผู้ติดต่อของตน: {CONTACTNAMES}";
    translation["vendor.norecipients"] =
        "ไม่มีผู้รับ E-Document สำหรับผู้ค้ารายนี้ ในการส่งเอกสารอิเล็กทรอนิกส์ทางอีเมลถึงผู้ค้ารายนี้ คุณจะต้องเพิ่มผู้ติดต่อในรายการผู้รับ E-Document อย่างน้อยที่สุดหนึ่งรายการ";
    translation["vendor.maxrecipientexceeded"] =
        "คุณมีจำนวนผู้รับอีเมลเกินจำนวนสูงสุดแล้ว เลือกผู้รับอีเมลได้สูงสุดแค่ 10 รายเท่านั้น";
    translation["vendor.nosenders"] =
        "ไม่มีผู้ส่งอีเมล E-Document สำหรับผู้ค้ารายนี้ ในการรับ E-Document ทางอีเมลจากผู้ค้ารายนี้ คุณต้องป้อนที่อยู่อีเมลอย่างน้อยหนึ่งรายการใน &quot;รายชื่อผู้ส่งอีเมล E-Document ของผู้ค้า&quot;";
    translation["vendor.existingsender"] = "มีที่อยู่อีเมลของผู้ส่งอยู่แล้ว";
    translation["vendor.existingdomain"] =
        "โดเมนอีเมลของผู้ส่งใช้งานอยู่แล้วโดยผู้ค้ารายอื่น";
    translation["vendor.existingidentifier"] =
        "ID เว็บเซอร์วิสใช้งานอยู่แล้วโดยผู้ค้ารายอื่น ป้อน ID เว็บเซอร์วิสอื่น";
    translation["customeremailrecipient.contextunsupported"] =
        "ผู้รับอีเมล E-Document ของลูกค้ารองรับเฉพาะบริบทต่อไปนี้เท่านั้น: UI, CSV, SuiteScript และเว็บเซอร์วิส";
    translation["vendoremailrecipient.contextunsupported"] =
        "ผู้รับอีเมล E-Document ของผู้ค้ารองรับเฉพาะบริบทต่อไปนี้เท่านั้น: UI, CSV, SuiteScript และเว็บเซอร์วิส";
    translation["vendoremailsender.contextunsupported"] =
        "ผู้ส่งอีเมล E-Document ของผู้ค้ารองรับเฉพาะบริบทต่อไปนี้เท่านั้น: UI, CSV, SuiteScript และเว็บเซอร์วิส";
    translation["template.incorrectregex"] =
        "ช่อง REGEX มีนิพจน์ทั่วไปที่ไม่ถูกต้อง จะต้องใช้ไวยากรณ์ที่ถูกต้อง";
    translation["template.invalidjson"] =
        "คุณไม่ได้ระบุ JSON ที่มีรูปแบบที่ถูกต้องในแม่แบบสำหรับช่อง E-Document ขาออก คลิกตกลงเพื่อดำเนินการต่อ หรือยกเลิกเพื่ออยู่ในหน้าปัจจุบัน";
    translation["template.invalidxml"] =
        "แม่แบบ XML มีข้อผิดพลาด รูปแบบ XML จะต้องมีรูปแบบที่ถูกต้อง";
    translation["template.templaterequired"] =
        "ไม่มีเนื้อหาแม่แบบสำหรับประเภทธุรกรรมขาออกที่เลือก ระบุเนื้อหาแม่แบบ XML หรือ JSON ที่ถูกต้องในช่อง E-Document ขาออก แล้วลองอีกครั้ง";
    translation["template.mappingrequired"] =
        "คุณเลือกประเภทธุรกรรมขาเข้าแล้ว แต่เนื้อหา JSON ของการแมปช่องหายไป ป้อนเนื้อหา JSON ลงในการแมปช่องสำหรับช่อง E-Document ขาเข้า";
    translation["template.templateorjsonrequired"] =
        "ไม่มีค่าในช่อง สำหรับธุรกรรมขาออก ให้ระบุเนื้อหา XML หรือ JSON ที่ถูกต้องในแม่แบบสำหรับช่อง E-Document ขาออก สำหรับธุรกรรมขาเข้า ให้ระบุเนื้อหา JSON ในการแมปช่องสำหรับช่อง E-Document ขาเข้า";
    translation["template.invalidxsdfile"] =
        "ไฟล์ XSD ที่เลือกไม่ใช่ไฟล์ XSD ที่ถูกต้อง ตรวจสอบให้แน่ใจว่านามสกุลของไฟล์ที่คุณเลือกเป็น .xsd";
    translation["template.contextunsupported"] =
        "แม่แบบ E-Document รองรับเฉพาะบริบท UI และ SuiteScript เท่านั้น";
    translation["template.supportedtranstypefldhelp"] =
        "เลือกประเภทธุรกรรมตั้งแต่หนึ่งรายการขึ้นไปที่จะให้แม่แบบนี้รองรับ ในการเลือกประเภทธุรกรรมหลายรายการ ให้กดปุ่ม Ctrl ค้างไว้ขณะที่เลือกประเภทธุรกรรม<br /><br />หากไม่สามารถเลือกประเภทธุรกรรมได้ แสดงว่าแม่แบบถูกกำหนดไว้สำหรับไฟล์ข้อมูลธุรกรรมตั้งแต่หนึ่งรายการขึ้นไปของประเภทธุรกรรมเดียวกันนั้น หากต้องการเปิดใช้งานการเลือกประเภทธุรกรรม ให้ลบแม่แบบออกจากไฟล์ข้อมูลธุรกรรม<br /><br />คุณยังสามารถกำหนดแม่แบบนี้ให้กับ E-Document ขาเข้า และการดำเนินการดังกล่าวจะปิดใช้งานช่องประเภทธุรกรรม";
    translation["template.eistatus"] =
        "จำกัดการแก้ไขธุรกรรมด้วยสถานะของ E-Document";
    translation["template.supportedeistatusfieldhelp"] =
        "ธุรกรรมที่มีสถานะของ E-Document ที่คุณเลือกจะไม่สามารถแก้ไขได้เมื่อแม่แบบนี้ถูกเชื่อมโยงเข้ากับธุรกรรมเหล่านั้น คุณสามารถเลือกสถานะของ E-Document ได้หลายสถานะ";
    translation["template.invalidschemaordependency"] =
        "Schema เป็น XSD ที่มีโครงสร้างไม่ถูกต้องหรือไม่พบ Schema ที่ขึ้นต่อกัน";
    translation["template.xmldoesnotconformtoschema"] =
        "XML ของแม่แบบไม่สอดคล้องกับ XSD หรือ Schema ที่ให้มา";
    translation["template.xmldomexception"] =
        "สตริง XML อินพุตมีรูปแบบไม่ถูกต้อง";
    translation["template.missingreqdargument"] =
        "XSD สำหรับการตรวจสอบความถูกต้องขาออกหายไป";
    translation["template.xsdvalidationexception"] =
        "เกิดข้อยกเว้นที่ไม่ทราบสาเหตุระหว่างการตรวจสอบความถูกต้องของ XSD";
    translation["template.xsdmissingdependencyfolder"] =
        "โฟลเดอร์สคีมา XSD ไม่ถูกต้องหรือขาดหายไป";
    translation["invoice.generatebtn"] = "สร้าง E-Document";
    translation["invoice.sendbtn"] = "ส่ง E-Document";
    translation["invoice.sendcertifybtn"] = "รับรอง E-Document";
    translation["invoice.eipbtn"] = "ประมวลผล E-Document";
    translation["invoice.loguntagged"] =
        "แม่แบบ E-Document ถูกลบแล้ว ธุรกรรมถูกยกเลิกการแท็กสำหรับการสร้าง E-Document แล้ว";
    translation["invoice.logforgenerate"] =
        "ธุรกรรมพร้อมสำหรับการสร้าง E-Document แล้ว";
    translation["invoice.invalidtemplatesub"] =
        "รายการย่อยของธุรกรรมใช้ไม่ได้สำหรับแม่แบบ E-Document ที่เลือก เลือกแม่แบบ E-Document อื่น";
    translation["invoice.templateremovalerror"] =
        "ไม่อนุญาตให้ลบแม่แบบ E-Document สำหรับ E-Document ที่ส่งแล้ว";
    translation["ei.sending.currentlysending"] =
        "ขณะนี้กำลังส่ง E-Document อาจใช้เวลาสองถึงสามนาทีในการดำเนินการให้เสร็จสิ้น คุณจะต้องไม่ขัดจังหวะขั้นตอนโดยคลิกปุ่ม ส่ง E-Document อีกครั้ง หลังจากส่ง E-Document แล้ว หน้าจะโหลดขึ้นอีกครั้ง";
    translation["ei.sending.notready"] =
        "E-Document ยังไม่พร้อมสำหรับการส่ง ก่อนอื่นคุณจะต้องคลิกสร้าง E-Document เพื่อสร้าง E-Document";
    translation["ei.sending.alreadysent"] = "ธุรกรรมนี้ถูกส่งไปแล้ว";
    translation["ei.sending.norecipients"] =
        "ไม่สามารถส่ง E-Document ได้ เนื่องจากลูกค้าไม่มีผู้รับ E-Document ก่อนที่คุณจะสามารถส่ง E-Document นี้ทางอีเมลได้ คุณจะต้องเลือกผู้รับ E-Document ในไฟล์ข้อมูลลูกค้าก่อน";
    translation["ei.sending.indivcustnoemail"] =
        "ไม่สามารถส่ง E-Document ได้ เนื่องจากลูกค้าไม่มีที่อยู่อีเมล ก่อนที่คุณจะสามารถส่ง E-Document นี้ได้ จะต้องใส่ที่อยู่อีเมลในไฟล์ข้อมูลลูกค้าก่อน";
    translation["ei.sending.norecipients.vendor"] =
        "ไม่สามารถส่ง E-Document ได้ เนื่องจากผู้ค้าไม่มีผู้รับ E-Document ก่อนที่คุณจะสามารถส่ง E-Document นี้ทางอีเมลได้ คุณจะต้องเลือกผู้รับ E-Document ในไฟล์ข้อมูลผู้ค้าก่อน";
    translation["ei.sending.indivvendnoemail"] =
        "ไม่สามารถส่ง E-Document ได้ เนื่องจากผู้ค้าไม่มีที่อยู่อีเมล ก่อนที่คุณจะสามารถส่ง E-Document นี้ทางอีเมลได้ จะต้องใส่ที่อยู่อีเมลในไฟล์ข้อมูลผู้ค้าก่อน";
    translation["ei.sending.invalidmethod"] =
        "เลือกวิธีการส่งที่ถูกต้องสำหรับ {TYPE} #{INVOICENUMBER}";
    translation["ei.sending.sentdetails"] =
        "ผู้ส่ง: {SENDER}\nผู้รับ: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "ผู้ส่ง E-Document ({EMPLOYEENAME}) ไม่มีที่อยู่อีเมล ใส่ที่อยู่อีเมลที่ถูกต้องในไฟล์ข้อมูลพนักงาน";
    translation["ei.sending.recipientnoemail"] =
        "ผู้รับ E-Document หนึ่งรายหรือมากกว่าที่เชื่อมโยงกับธุรกรรมนี้ไม่มีที่อยู่อีเมล ตรวจสอบว่าผู้รับสำหรับลูกค้ารายนี้มีที่อยู่อีเมลที่ถูกต้อง";
    translation["ei.sending.recipientnoemail.vendor"] =
        "ผู้รับ E-Document หนึ่งรายหรือมากกว่าที่เชื่อมโยงกับธุรกรรมนี้ไม่มีที่อยู่อีเมล ตรวจสอบว่าผู้รับสำหรับผู้ค้ารายนี้มีที่อยู่อีเมลที่ถูกต้อง";
    translation["ei.sending.defaulterror"] =
        "เกิดข้อผิดพลาดระหว่างการส่ง E-Document โปรดดูรายละเอียดของเส้นทางการตรวจสอบ E-Document บนแท็บย่อย E-Document";
    translation["ei.sending.inactivecustomer"] =
        "ไม่สามารถส่ง E-Document สำหรับธุรกรรมนี้ได้ เนื่องจากลูกค้าที่เลือกอยู่ในสถานะไม่ได้ใช้งาน ช่องสถานะ E-Document ไม่ได้รับการอัปเดต และเส้นทางการตรวจสอบไม่ได้ถูกสร้างขึ้น ล้างกล่องกาเครื่องหมายที่ไม่ได้ใช้งานบนไฟล์ข้อมูลลูกค้า จากนั้นลองส่ง E-Document อีกครั้ง";
    translation["ei.sending.inactivevendor"] =
        "ไม่สามารถส่ง E-Document สำหรับธุรกรรมนี้ได้ เนื่องจากผู้ค้าที่เลือกอยู่ในสถานะไม่ได้ใช้งาน ช่องสถานะ E-Document ไม่ได้รับการอัปเดต และเส้นทางการตรวจสอบไม่ได้ถูกสร้างขึ้น ล้างกล่องกาเครื่องหมายที่ไม่ได้ใช้งานบนไฟล์ข้อมูลผู้ค้า จากนั้นลองส่ง E-Document อีกครั้ง";
    translation["ei.sending.msg.processcomplete"] = "ส่ง E-Document แล้ว";
    translation["ei.sending.configurefreecountry"] =
        "บัญชีของคุณต้องมีใบอนุญาตที่ใช้งานเพื่อใช้ Electronic Invoicing สำหรับหลายประเทศ หากต้องการส่ง E-Document เป็นจำนวนมากให้ประเทศเดียว คุณต้องเลือกประเทศจากช่อง &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["ei.sending.inactivecustomer.manager"] =
        "E-Document ไม่รองรับธุรกรรมที่มีลูกค้าที่ไม่ได้ใช้งาน";
    translation["ei.sending.inactivevendor.manager"] =
        "E-Document ไม่รองรับธุรกรรมที่มีผู้ค้าที่ไม่ได้ใช้งาน";
    translation["ei.sending.certification.defaulterror"] =
        "เกิดข้อผิดพลาดระหว่างการรับรอง E-Document โปรดดูรายละเอียดของเส้นทางการตรวจสอบ E-Document บนแท็บย่อย E-Document";
    translation["ei.sending.certification.msg.processcomplete"] =
        "ส่ง E-Document เพื่อการรับรองแล้ว";
    translation["ei.generation.generationlogbulk"] =
        "E-Document ถูกสร้างขึ้นเป็นจำนวนมากโดยใช้แม่แบบ E-Document '{TEMPLATENAME}'";
    translation["ei.generation.generationlog"] =
        "E-Document ถูกสร้างขึ้นโดยใช้แม่แบบ E-Document '{TEMPLATENAME}'";
    translation["ei.generation.generationwithpdflogbulk"] =
        "E-Document และไฟล์ PDF ถูกสร้างขึ้นเป็นจำนวนมากโดยใช้แม่แบบ E-Document '{TEMPLATENAME}'";
    translation["ei.generation.generationwithpdflog"] =
        "E-Document และไฟล์ PDF ถูกสร้างขึ้นโดยใช้แม่แบบ E-Document '{TEMPLATENAME}'";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "E-Document ถูกสร้างขึ้นเป็นจำนวนมากโดยใช้แม่แบบ E-Document '{TEMPLATENAME}' ไฟล์ PDF ที่สร้างไว้ก่อนหน้าของธุรกรรมนี้ถูกลบออกแล้ว";
    translation["ei.generation.generationremovedpdflog"] =
        "E-Document ถูกสร้างขึ้นโดยใช้แม่แบบ E-Document '{TEMPLATENAME}' ไฟล์ PDF ที่สร้างไว้ก่อนหน้าของธุรกรรมนี้ถูกลบออกแล้ว";
    translation["ei.generation.failedgenerationlogbulk"] =
        "กระบวนการสร้างจำนวนมาก\nแม่แบบ E-Document ที่ใช้: {TEMPLATENAME}\nรายละเอียดข้อผิดพลาด: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "แม่แบบ E-Document ที่ใช้: {TEMPLATENAME}\nรายละเอียดข้อผิดพลาด: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "เกิดข้อผิดพลาดระหว่างการสร้าง โปรดดูรายละเอียดของเส้นทางการตรวจสอบ E-Document บนแท็บย่อย E-Document";
    translation["ei.generation.inactivecustomer"] =
        "ไม่สามารถสร้าง E-Document สำหรับธุรกรรมนี้ได้ เนื่องจากลูกค้าที่เลือกอยู่ในสถานะไม่ได้ใช้งาน ช่องสถานะ E-Document ไม่ได้รับการอัปเดต และเส้นทางการตรวจสอบไม่ได้ถูกสร้างขึ้น ล้างกล่องกาเครื่องหมายที่ไม่ได้ใช้งานบนไฟล์ข้อมูลลูกค้า จากนั้นลองสร้าง E-Document อีกครั้ง";
    translation["ei.generation.inactivevendor"] =
        "ไม่สามารถสร้าง E-Document สำหรับธุรกรรมนี้ได้ เนื่องจากผู้ค้าที่เลือกอยู่ในสถานะไม่ได้ใช้งาน ช่องสถานะ E-Document ไม่ได้รับการอัปเดต และเส้นทางการตรวจสอบไม่ได้ถูกสร้างขึ้น ล้างกล่องกาเครื่องหมายที่ไม่ได้ใช้งานบนไฟล์ข้อมูลผู้ค้า จากนั้นลองสร้าง E-Document อีกครั้ง";
    translation["ei.generation.msg.processcomplete"] = "สร้าง E-Document แล้ว";
    translation["ei.generation.configurefreecountry"] =
        "บัญชีของคุณต้องมีใบอนุญาตที่ใช้งานเพื่อใช้ Electronic Invoicing สำหรับหลายประเทศ หากต้องการสร้าง E-Document เป็นจำนวนมากให้ประเทศเดียว คุณต้องเลือกประเทศจากช่อง &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["ei.generation.inactivecustomer.generator"] =
        "E-Document ไม่รองรับธุรกรรมที่มีลูกค้าที่ไม่ได้ใช้งาน";
    translation["ei.generation.inactivevendor.generator"] =
        "E-Document ไม่รองรับธุรกรรมที่มีผู้ค้าที่ไม่ได้ใช้งาน";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "สร้าง E-Document และลงลายมือชื่อดิจิทัลเรียบร้อยแล้ว";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "การสร้างล้มเหลวเนื่องจาก E-Document ที่เป็นผลลัพธ์ไม่ใช่ทั้ง XML ที่มีรูปแบบที่ถูกต้องและ JSON ที่มีรูปแบบที่ถูกต้อง";
    translation["notify.batchownersubject"] = "ส่ง E-Document เสร็จแล้ว";
    translation["notify.batchownerbody"] =
        "สวัสดี <br/><br/>คำขอส่ง E-Document ของคุณดำเนินการเสร็จสิ้นแล้ว<br/>ส่ง {SENT} จาก {TOTAL} รายการแล้ว โปรดดูไฟล์ที่แนบสำหรับรายละเอียด <br/><br/>ขอบคุณ<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "E-Document ที่สร้างสำหรับ PO #{PONUM}";
    translation["notify.recipientcompsubj"] =
        "E-Document ที่สร้างจาก {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "สวัสดี <br /><br />{MESSAGE}<br />โปรดดูเอกสารแนบสำหรับไฟล์ E-Document<br /><br />ขอบคุณ<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "พบข้อผิดพลาดระหว่างการสร้าง E-Document";
    translation["notify.generationerrorbody"] =
        "มีข้อผิดพลาดเกิดขึ้นระหว่างการสร้าง E-Document<br/>โปรดดูไฟล์ที่แนบสำหรับรายชื่อธุรกรรมและรายละเอียดข้อผิดพลาด";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "มีการส่ง E-Document สำหรับธุรกรรมนี้แล้ว การสร้าง E-Document ใหม่จะเป็นการเขียนทับ E-Document ก่อนหน้า คุณแน่ใจหรือไม่ว่าต้องการสร้าง E-Document ใหม่";
    translation["transaction.msg.removetemplatealreadysent"] =
        "ไม่อนุญาตให้ลบแม่แบบ E-Document สำหรับ E-Document ที่ส่งแล้ว";
    translation["transaction.msg.generate.information"] =
        "การสร้าง E-Document นี้กำลังอยู่ในระหว่างดำเนินการ";
    translation["transaction.msg.send.information"] =
        "การส่ง E-Document นี้กำลังอยู่ในระหว่างดำเนินการ";
    translation["transaction.msg.send.certify.information"] =
        "การรับรอง E-Document นี้กำลังอยู่ในระหว่างดำเนินการ";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "การสร้าง E-Document นี้กำลังอยู่ในระหว่างดำเนินการอยู่แล้ว";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "การส่ง E-Document นี้กำลังอยู่ในระหว่างดำเนินการอยู่แล้ว";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "การรับรอง E-Document นี้กำลังอยู่ในระหว่างดำเนินการอยู่แล้ว";
    translation["transaction.msg.uncheckpdf"] =
        "ไฟล์ PDF ของธุรกรรมนี้ถูกสร้างขึ้นในระหว่างการสร้าง E-Document ล่าสุด การล้างกล่องกาเครื่องหมายนี้จะลบไฟล์ PDF ในการสร้าง E-Document ถัดไป";
    translation["transaction.msg.nofreecountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลอยู่สำหรับการใช้ใบแจ้งหนี้อิเล็กทรอนิกส์ในหลายประเทศ หากต้องการสร้าง E-Document สำหรับธุรกรรมนี้ โปรดติดต่อผู้ดูแลบัญชีของคุณเพื่อระบุประเทศในช่อง &quot;ประเทศที่สามารถใช้ E-Document ได้ฟรี&quot; ในหน้าข้อมูลบริษัท";
    translation["transaction.msg.otherbillingcountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลอยู่สำหรับการใช้ใบแจ้งหนี้อิเล็กทรอนิกส์ในหลายประเทศ หากต้องการสร้าง E-Document สำหรับธุรกรรมนี้ โปรดติดต่อผู้ดูแลบัญชี NetSuite ของคุณเพื่อสั่งซื้อใบอนุญาต";
    translation["transaction.msg.nobillingcountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลอยู่สำหรับการใช้ใบแจ้งหนี้อิเล็กทรอนิกส์ในหลายประเทศ หากต้องการสร้าง E-Document สำหรับธุรกรรมนี้ โปรดระบุที่อยู่เรียกเก็บเงินสำหรับธุรกรรมนี้";
    translation["transaction.msg.noshippingcountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลอยู่สำหรับการใช้ใบแจ้งหนี้อิเล็กทรอนิกส์ในหลายประเทศ หากต้องการสร้าง E-Document สำหรับธุรกรรมนี้ โปรดระบุที่อยู่จัดส่งสำหรับธุรกรรมนี้";
    translation["transaction.msg.nocustomercountry"] =
        "บัญชีนี้ไม่มีใบอนุญาตที่ยังมีผลอยู่สำหรับการใช้ใบแจ้งหนี้อิเล็กทรอนิกส์ในหลายประเทศ หากต้องการสร้าง E-Document สำหรับธุรกรรมนี้ โปรดระบุที่อยู่เรียกเก็บเงินเริ่มต้นของลูกค้าสำหรับธุรกรรมนี้";
    translation["transaction.msg.blockededittransaction"] =
        "การแก้ไขธุรกรรมถูกบล็อคไว้สำหรับสถานะของ E-Doc ปัจจุบัน โปรดดูที่แม่แบบ EI ที่แนบมา";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "การเปลี่ยนแปลงค่าในช่องประเภทเนื้อหาจาก XML เป็นประเภทอื่นจะลบตัวตรวจสอบความถูกต้อง XML ทั้งหมด คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนประเภทเนื้อหา";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "สามารถเพิ่มตัวตรวจสอบความถูกต้องสำหรับประเภทเนื้อหา XML ได้เท่านั้น";
    translation["transaction.msg.xmlvalidatorexists"] =
        "ตัวตรวจสอบความถูกต้องนี้อยู่ในรายชื่อแล้ว";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "ตัวตรวจสอบความถูกต้องแม่แบบ E-Document รองรับเฉพาะบริบท UI และ SuiteScript เท่านั้น";
    translation["standarddocument.default.alreadyexist"] =
        "มีไฟล์ข้อมูล {DEFAULT_DOCUMENT_STANDARD} อยู่แล้ว คุณไม่สามารถสร้างไฟล์ข้อมูลแพ็กเกจเอกสารที่มีชื่อเดียวกันได้ เปลี่ยนชื่อไฟล์ข้อมูลแพ็กเกจเอกสารของคุณและลองอีกครั้ง";
    translation["standarddocument.default.editnotallowed"] =
        "ไม่อนุญาตให้แก้ไขชื่อไฟล์ข้อมูล {DEFAULT_DOCUMENT_STANDARD} หรือคำอธิบาย ";
    translation["standarddocument.default.deletenotallowed"] =
        "ไม่อนุญาตให้ลบไฟล์ข้อมูล {DEFAULT_DOCUMENT_STANDARD} ";
    translation["standarddocument.contextunsupported"] =
        "แพ็กเกจ E-Document รองรับเฉพาะบริบท UI, การนำเข้า CSV และ SuiteScript เท่านั้น";
    translation["sendingmethod.default.alreadyexist"] =
        "มีไฟล์ข้อมูลวิธีการส่ง {DEFAULT_SENDING_METHOD_NAME} อยู่แล้ว คุณไม่สามารถสร้างไฟล์ข้อมูลวิธีการส่งที่มีชื่อเดียวกันได้ เปลี่ยนชื่อไฟล์ข้อมูลวิธีการส่งและลองอีกครั้ง";
    translation["sendingmethod.default.editnotallowed"] =
        "ไม่อนุญาตให้แก้ไขไฟล์ข้อมูลวิธีการส่ง {DEFAULT_SENDING_METHOD_NAME}";
    translation["sendingmethod.default.deletenotallowed"] =
        "ไม่อนุญาตให้ลบไฟล์ข้อมูลวิธีการส่ง {DEFAULT_SENDING_METHOD_NAME}";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "ช่องประเภทธุรกรรมได้ถูกปิดใช้งาน เนื่องจากวิธีการส่งนี้ถูกกำหนดไว้สำหรับไฟล์ข้อมูลธุรกรรมหนึ่งไฟล์หรือมากกว่าแล้ว หากต้องการแก้ไขวิธีการส่งนี้ ให้ลบวิธีการส่งจากไฟล์ข้อมูลธุรกรรมเพื่อเปิดใช้งานช่องประเภทธุรกรรม และลองอีกครั้ง";
    translation["sendingmethod.contextunsupported"] =
        "วิธีการส่ง E-Document รองรับเฉพาะบริบท UI และ SuiteScript เท่านั้น";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "เลือกประเภทธุรกรรมตั้งแต่หนึ่งรายการขึ้นไปที่จะให้วิธีการส่งนี้รองรับ ในการเลือกประเภทธุรกรรมหลายรายการ ให้กดปุ่ม Ctrl ค้างไว้ขณะที่เลือกประเภทธุรกรรม<br /><br />หากไม่สามารถเลือกประเภทธุรกรรมตั้งแต่หนึ่งรายการขึ้นไป แสดงว่าวิธีการส่งได้ถูกกำหนดไว้สำหรับไฟล์ข้อมูลธุรกรรมตั้งแต่หนึ่งรายการขึ้นไปของประเภทธุรกรรมนั้นแล้ว คุณต้องลบวิธีการส่งจากไฟล์ข้อมูลธุรกรรมออกก่อน จึงจะสามารถเลือกประเภทธุรกรรมได้";
    translation["sendingmethod.pluginimplementation"] =
        "การใช้งานปลั๊กอินวิธีการส่ง E-Document";
    translation["sendingmethod.pluginimplementationhelp"] =
        "เลือกการใช้งานปลั๊กอินวิธีการส่ง E-Document";
    translation["sendingmethod.scriptbannermessage"] =
        "วิธีการส่งควรเป็นการใช้งานปลั๊กอินแบบกำหนดเอง โปรดสร้างสคริปต์วิธีการส่งที่มีอยู่อีกครั้งเป็นการใช้งานปลั๊กอินแบบกำหนดเองใหม่ประเภท &quot;ปลั๊กอินการส่ง&quot;";
    translation["customdatasource.pluginimplementation"] =
        "การใช้งานปลั๊กอินแหล่งข้อมูลแบบกำหนดเอง";
    translation["customdatasource.pluginimplementationhelp"] =
        "เลือกการใช้งานปลั๊กอินแหล่งข้อมูลแบบกำหนดเอง";
    translation["digitalsignature.pluginimplementation"] =
        "การใช้งานปลั๊กอินลายมือชื่อดิจิทัล";
    translation["digitalsignature.pluginimplementationhelp"] =
        "เลือกการใช้งานปลั๊กอิน ต้องกรอกข้อมูลในช่องนี้หากคุณต้องการลงลายมือชื่อดิจิทัลบน E-Document ";
    translation["digitalsignature.identifierlabel"] =
        "ลงลายมือชื่อดิจิทัลบน E-Document นี้แล้ว";
    translation["digitalsignature.successlog"] =
        "ลงลายมือชื่อดิจิทัลบน E-Document ที่สร้างขึ้นแล้ว";
    translation["digitalsignature.failurelog"] =
        "ยังไม่ได้ลงลายมือชื่อดิจิทัลบน E-Document ที่สร้างขึ้น";
    translation["digitalsignature.pluginfailedmessage"] =
        "การใช้งานปลั๊กอินลายมือชื่อดิจิทัลได้ส่งกลับสถานะความล้มเหลว";
    translation["digitalsignature.plugininvalidresult"] =
        "ผลลัพธ์ที่ส่งกลับจากการใช้งานปลั๊กอินลายมือชื่อดิจิทัลไม่ถูกต้อง";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "การใช้งานปลั๊กอินแหล่งข้อมูลแบบกำหนดเองขาเข้า";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "เลือกการใช้งานปลั๊กอินแหล่งข้อมูลแบบกำหนดเองขาเข้า";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "ผลลัพธ์การใช้งานปลั๊กอินแหล่งข้อมูลแบบกำหนดเองขาเข้าไม่ถูกต้อง";
    translation["outboundvalidation.pluginimplementation"] =
        "การใช้งานปลั๊กอินการตรวจสอบความถูกต้องขาออก";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "เลือกการใช้งานปลั๊กอินการตรวจสอบความถูกต้อง E-Document ขาออก ซึ่งจะตรวจสอบความถูกต้องของ E-Document ขาออก";
    translation["outboundvalidation.successlog"] =
        "การตรวจสอบความถูกต้องขาออกสำเร็จแล้ว";
    translation["outboundvalidation.failurelog"] =
        "การตรวจสอบความถูกต้องขาออกล้มเหลว";
    translation["outboundvalidation.pluginfailedmessage"] =
        "การใช้งานปลั๊กอินการตรวจสอบความถูกต้องขาออกส่งคืนสถานะล้มเหลว";
    translation["outboundvalidation.plugininvalidresult"] =
        "ผลลัพธ์จากการใช้งานปลั๊กอินการตรวจสอบความถูกต้องขาออกไม่ถูกต้อง";
    translation["template.msg.cannotedittransactiontype"] =
        "ช่องประเภทธุรกรรมได้ถูกปิดใช้งาน เนื่องจากแม่แบบนี้ถูกกำหนดไว้สำหรับไฟล์ข้อมูลธุรกรรมหนึ่งไฟล์หรือมากกว่าแล้ว หากต้องการแก้ไขแม่แบบนี้ ให้ลบแม่แบบออกจากไฟล์ข้อมูลธุรกรรมเพื่อเปิดใช้งานช่องประเภทธุรกรรม และลองอีกครั้ง อีกทั้งคุณยังสามารถกำหนดแม่แบบนี้ให้กับ E-Document ขาเข้า และการดำเนินการดังกล่าวจะปิดใช้งานช่องประเภทธุรกรรม";
    translation["template.msg.forcetocopymessage"] =
        "คุณไม่สามารถแก้ไขแม่แบบ E-Document ดีฟอลต์ คุณสามารถคัดลอกโดยใช้ตัวเลือกสร้างสำเนาจากการดำเนินการ หรือสร้างรายการใหม่";
    translation["template.msg.warningoneditmessage"] =
        "นี่คือแม่แบบ E-Document ดีฟอลต์ การเปลี่ยนแปลงใดๆ ที่ทำกับแม่แบบนี้จะสูญหายหรือจะถูกเขียนทับเมื่อมีการอัปเดต SuiteApp";
    translation["email.batchownernotification.subject"] =
        "ส่ง E-Document เสร็จแล้ว";
    translation["email.batchownernotification.body"] =
        "สวัสดี <br/><br/>E-Document ของคุณได้ถูกส่งแล้ว<br/>ส่ง {SENT} จาก {TOTAL} รายการแล้ว โปรดดูไฟล์ที่แนบสำหรับรายละเอียด <br/><br/>ขอบคุณ<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "แปลง E-Document เสร็จแล้ว";
    translation["email.batchownerconvertnotification.body"] =
        "สวัสดี <br/><br/>E-Document ของคุณได้ถูกแปลงเรียบร้อยแล้ว<br/>แปลง {CONVERTED} จาก {TOTAL} รายการแล้ว โปรดดูไฟล์ที่แนบสำหรับรายละเอียด <br/><br/>ขอบคุณ<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "E-Document ที่สร้างสำหรับ PO #{PONUM}";
    translation["email.recipientnotification.subject"] =
        "E-Document จาก {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "สร้าง E-Document สำหรับ {TRANTYPE} #{TRANID} {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "สวัสดี <br /><br />E-Document สำหรับ PO #{PONUM} ถูกสร้างแล้ว<br />โปรดดูไฟล์ E-Document ที่แนบสำหรับรายละเอียด<br /><br />ขอบคุณ<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "สวัสดี <br /><br />E-Document สำหรับ {TYPE} #{TRANID} ได้ถูกสร้างแล้ว<br />โปรดดูไฟล์ E-Document ที่แนบสำหรับรายละเอียด<br /><br />ขอบคุณ<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "พบข้อผิดพลาดระหว่างการสร้าง E-Document";
    translation["email.generationerrornotification.body"] =
        "มีข้อผิดพลาดเกิดขึ้นระหว่างการสร้าง E-Document<br/>โปรดดูไฟล์ที่แนบสำหรับรายชื่อธุรกรรมและรายละเอียดข้อผิดพลาด";
    translation["email.sendingerrornotification.subject"] =
        "พบข้อผิดพลาดระหว่างการส่ง E-Document";
    translation["email.sendingerrornotification.body"] =
        "มีข้อผิดพลาดเกิดขึ้นระหว่างการส่ง E-Document<br/>โปรดดูไฟล์ที่แนบสำหรับรายชื่อธุรกรรมและรายละเอียดข้อผิดพลาด";
    translation["email.webserviceerror.subject"] =
        "การแจ้งเตือนเว็บเซอร์วิสสำหรับ E-Document ขาเข้า";
    translation["email.webserviceerror.body"] =
        "<p>สวัสดี</p><p>พบข้อผิดพลาดระหว่างการประมวลผล E-Document ขาเข้าโดยใช้เว็บเซอร์วิส<br/>โปรดดูรายละเอียดต่อไปนี้</p>{DETAIL_TABLE}<p>ขอบคุณ<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "หมายเลขธุรกรรม";

    return translation;
});
