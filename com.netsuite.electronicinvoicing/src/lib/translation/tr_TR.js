define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Ayrıntılar";
    translation["email.attachment.collabel.transactiontype"] = "İşlem Türü";
    translation["email.attachment.collabel.internalid"] = "İç Kimlik";
    translation["email.attachment.collabel.vendor"] = "Tedarikçi";
    translation["email.conversionerrornotification.subject"] =
        "Gelen e-doküman dönüştürme işlemi sırasında hata oluştu";
    translation["email.conversionerrornotification.body"] =
        "Gelen e-doküman dönüştürme işlemi sırasında hatalarla karşılaşıldı.<br/>Hatalı kayıtların listesi ve ayrıntıları için lütfen ekteki dosyaya bakın.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Not: Bildirimleri hesap yöneticileriniz yerine farklı bir kullanıcının almasını istiyorsanız üst bağlı şirket kaydınızdaki E-Doküman Bildirimleri Alıcısı alanına bu kullanıcının e-posta adresini girin.";
    translation["email.table.collabel.inboundedocumentid"] =
        "Gelen E-Doküman Kimliği";
    translation["email.table.collabel.details"] = "Ayrıntılar";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Hesabın lisansı kontrol edilirken hata oluştu";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok.</br>E-dokümanları toplu halde işlemek için lütfen şirket bilgileri sayfasında Ücretsiz Kullanım için E-Doküman Ülkesi alanını konfigüre edin.";
    translation["inboundedocument.logforconversion"] =
        "Gelen e-doküman, dönüştürme için hazır.";
    translation["inboundedocument.logincomplete"] =
        "Gelen e-doküman tamamlanmadı. {FIELD} seçilmedi.";
    translation["inboundedocument.deletenotallowed"] =
        "Gelen e-dokümanın silinmesine izin verilmez.";
    translation["inboundedocument.copynotallowed"] =
        "Gelen e-dokümanın kopyalanmasına izin verilmez.";
    translation["inboundedocument.contextunsupported"] =
        "Gelen e-doküman yalnızca Kullanıcı Arayüzü ve SuiteScript içeriklerini destekler.";
    translation["inboundedocument.invalidxmlfile"] =
        "Seçili XML Dosya Referansı, geçerli bir XML dosyası değil. Seçtiğiniz dosyanın uzantısının .xml olduğundan emin olun.";
    translation["inboundedocument.invalidpdffile"] =
        "Seçili PDF Dosya Referansı, geçerli bir PDF dosyası değil. Seçtiğiniz dosyanın uzantısının .pdf olduğundan emin olun.";
    translation["inboundedocument.invalidxml"] =
        "Seçili XML Dosya Referansı düzgün oluşturulmuş bir XML dokümanı değil.";
    translation["inboundedocument.convert.button"] = "Dönüştür";
    translation["inboundedocument.convert.information"] =
        "Bu gelen E-Dokümanın dönüştürülmesi devam ediyor.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Bu gelen E-Dokümanın dönüştürülmesi zaten devam ediyor.";
    translation["inboundedocument.cancel.button"] = "E-Dokümanı İptal Et";
    translation["inboundedocument.cancel.confirmation"] =
        "Bu gelen e-dokümanı iptal etmek istediğinizden emin misiniz?";
    translation["inboundedocument.cancel.failed"] =
        "Gelen e-doküman kaydı durumu '{STATUS}' olduğu için iptal edilemedi.";
    translation["inboundedocument.cancel.defaulterror"] =
        "İptal etme sırasında bir hata oluştu. Ayrıntılar için E-Doküman alt sekmesindeki E-Doküman Denetim İzi'ni kontrol edin.";
    translation["inboundedocument.cancel.complete"] = "E-doküman iptal edildi.";
    translation["inboundedocument.preview.button"] = "XML'i Görüntüle";
    translation["inboundedocument.msg.nofreecountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing SuiteApp SuiteApp kullanımı için aktif bir lisansı yok. Bu e-dokümanı bir işleme dönüştürmek için lütfen hesap yöneticinizle iletişime geçin ve şirket bilgileri sayfasında bulunan Ücretsiz Kullanım için E-Doküman Ülkesi alanında bir ülke belirtin.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing SuiteApp kullanımı için aktif bir lisansı yok. Bu e-dokümanı bir işleme dönüştürmek için lisans satın almak üzere lütfen NetSuite hesap yöneticinizle iletişime geçin.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing SuiteApp kullanımı için aktif bir lisansı yok. Bu e-dokümanı bir işleme dönüştürmek için lütfen seçili tedarikçinin varsayılan faturalama adresini belirtin.";
    translation["validationplugin.contextunsupported"] =
        "Gelen E-Doküman Doğrulama Eklentisi yalnızca Kullanıcı Arayüzü ve SuiteScript içeriklerini destekler.";
    translation["validationplugin.pluginimplementation"] =
        "Gelen E-Doküman Doğrulama Eklentisi Uygulaması";
    translation["validationplugin.pluginimplementationhelp"] =
        "Gelen E-Doküman Doğrulama Eklentisi Uygulaması seçin.";
    translation["validationplugin.scriptbannermessage"] =
        "Gelen e-doküman doğrulaması uyarlanmış eklenti uygulamaları olmalıdır. Lütfen mevcut doğrulama komutlarını &quot;Gelen Doğrulama Eklentisi&quot; türünde yeni uyarlanmış eklenti uygulamaları olarak yeniden oluşturun.";
    translation["ei.conversion.defaulterror"] =
        "Dönüştürme sırasında bir hata oluştu. Ayrıntılar için E-Doküman alt sekmesindeki E-Doküman Denetim İzi'ni kontrol edin.";
    translation["ei.conversion.inactivevendor"] =
        "Seçili tedarikçi etkin olmadığından bu gelen e-doküman dönüştürülemiyor. E-Doküman Durumu alanı güncelleştirilmedi ve bir denetim izi oluşturulmadı. Tedarikçi kaydındaki Etkin Değil kutusunun işaretini temizleyip e-dokümanı dönüştürmeyi yeniden deneyin.";
    translation["ei.conversion.inactivecustomer"] =
        "Seçili müşteri etkin olmadığından bu gelen e-doküman dönüştürülemiyor. E-doküman Durumu alanı güncellenemedi ve bir denetim izi oluşturulmadı. Müşteri kaydındaki Etkin Değil kutusunun işaretini temizleyip e-dokümanı dönüştürmeyi yeniden deneyin.";
    translation["ei.conversion.conversioncomplete"] = "E-doküman dönüştürüldü.";
    translation["ei.conversion.conversionlogbulk"] =
        "Gelen e-doküman, toplu dönüştürmeye dahil edildi ve &quot;{TYPE}&quot; türü ve &quot;{INTERNALID}&quot; iç kimliğiyle işleme dönüştürüldü.";
    translation["ei.conversion.conversionlog"] =
        "Gelen e-doküman şu iç kimlikle işleme dönüştürüldü: '{TYPE}' Türünde {INTERNALID}";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Toplu dönüştürme işlemi\nKullanılan E-Doküman Şablonu: {TEMPLATENAME}\nHata kapsamı: {ERRORSCOPE}\nHata ayrıntıları: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Kullanılan E-Doküman şablonu: {TEMPLATENAME}\nHata kapsamı: {ERRORSCOPE}\nHata ayrıntıları: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Ayrıştırma hatası. Gelen E-dokümanlar için Alan eşleştirmesini kontrol edin.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Dönüştürme hatası.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Doğrulama hatası.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Gelen e-doküman kaydı '{STATUS}' durumunda olduğu için dönüştürme başarısız oldu.";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Etkin olmayan müşteri içeren gelen e-dokümanlar dönüştürme için desteklenmez.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Etkin olmayan tedarikçi içeren gelen e-dokümanlar dönüştürme için desteklenmez.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Şu tedarikçi kodları herhangi bir kalem kaydıyla ilişkili değil: {ITEMLIST}.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Şu tedarikçi adı/kodları: {ITEMLIST}, herhangi bir kalem kaydıyla ilişkili değil.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Şu tedarikçi kodları: {ITEMLIST}, birden çok kalem kaydıyla ilişkili. Kalem kayıtlarını değiştirin ve tedarikçi kodlarının tedarikçi başına her bir kalem için benzersiz olduğundan emin olun.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Şu tedarikçi adı/kodları: {ITEMLIST}, birden çok kalem kaydıyla ilişkili. Kalem kayıtlarını değiştirin ve tedarikçi adının/kodlarının tedarikçi başına her bir kalem için benzersiz olduğundan emin olun.";
    translation["ei.conversion.refnumnotfound"] =
        "Gelen e-dokümanda gerekli referans numarası yok. Bu e-dokümanı iptal edin ve referans numarası için tranid alanına eşlenmiş XML öğesi içeren başka bir e-doküman gönderin.";
    translation["ei.conversion.refnumexists"] =
        "Aynı referans numarasına sahip bir tedarikçi faturası zaten var. Bu e-dokümanı iptal edin ve tranid alanına eşlenmiş XML öğesi için doğru referans numarasını içeren başka bir e-doküman gönderin.";
    translation["ei.conversion.vendorcodenotfound"] =
        "E-doküman şablonunda tedarikçi kodu alanı eksik. E-doküman şablonunu değiştirin veya vendorcode alanı eşleşmesini içeren başka bir şablon seçin.";
    translation["ei.conversion.novendorcodevalue"] =
        "Kalemlerden en az birinin tedarikçi kodu yok. Bu e-dokümanı iptal edin ve tedarikçi kodu alanına eşlenmiş XML öğesi için doğru değeri içeren başka bir e-doküman gönderin.";
    translation["ei.conversion.vendornamenotfound"] =
        "E-doküman şablonunda vendorcode alanı eksik. E-doküman şablonunu değiştirin veya tedarikçi adı alanı eşleştirmesini içeren başka bir şablon seçin.";
    translation["ei.conversion.novendornamevalue"] =
        "Kalemlerden en az birinin tedarikçi adı/kodu yok. Bu e-dokümanı iptal edin ve tedarikçi adı/kodu alanına eşlenmiş XML öğesi için doğru değeri içeren başka bir e-doküman gönderin.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Kayıt ({TRANSTYPE}#{TRANSID}) sistemde bulunamadı. Bu e-dokümanı iptal edin ve createdfrom alanına eşlenmiş XML öğesi için doğru değeri içeren başka bir e-doküman gönderin.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Kayıt ({TRANSTYPE}#{TRANSID}) farklı bir varlığa atanmış. Doğru tüzel kişiliği seçin ve bu e-dokümanı dönüştürün.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Tedarikçinin gider içeren faturaların dönüştürülmesi için gerekli olan varsayılan gider hesabı yok. Dönüştürmeye devam etmek için tedarikçi kaydındaki Varsayılan Gider Hesabı alanında bir değer ayarlayın.";
    translation["ei.conversion.nolinktopo"] =
        "Gelen e-dokümanda referans satın alma siparişine dahil edilmiş kalem veya gider bulunmuyor. Dönüştürülebilir olup olmadığını görmek üzere satın alma siparişinin durumunu kontrol edin. Dönüştürülebilir olması halinde bu e-dokümanı iptal edin ve createdfrom alanına eşlenmiş XML öğesi için doğru değeri içeren başka bir e-doküman gönderin.";
    translation["inbound.formtitle"] = "Gelen E-Dokümanları Dönüştür";
    translation["inbound.search"] = "Ara";
    translation["inbound.convert"] = "Dönüştür";
    translation["inbound.return"] = "Ölçütlere Dön";
    translation["inbound.vendor"] = "Tedarikçi";
    translation["inbound.datefrom"] = "Oluşturma Tarihi Başlangıcı";
    translation["inbound.dateto"] = "Oluşturma Tarihi Bitişi";
    translation["inbound.vendorhelp"] =
        "Başarısız gelen e-dokümanları arama sonucuna dahil edilecek tedarikçiyi seçin.";
    translation["inbound.datefromhelp"] =
        "Oluşturulan başarısız gelen e-dokümanların arama sonucuna dahil edileceği dönemi tanımlamak için bir başlangıç tarihi seçin.";
    translation["inbound.datetohelp"] =
        "Oluşturulan başarısız gelen e-dokümanların arama sonucuna dahil edileceği dönemi tanımlamak için bir bitiş tarihi seçin.";
    translation["inbound.inboundedocfieldgroup"] =
        "Başarısız Gelen E-Doküman Arama Filtreleri";
    translation["inbound.sublist.sublistname"] =
        "Başarısız Gelen E-Doküman Arama Sonuçları";
    translation["inbound.sublist.internalid"] = "İç Kimlik";
    translation["inbound.sublist.vendor"] = "Tedarikçi";
    translation["inbound.sublist.refnum"] = "Referans Numarası";
    translation["inbound.sublist.ponum"] = "Satın Alma Siparişi Numarası";
    translation["inbound.sublist.datecreated"] = "Oluşturma Tarihi";
    translation["inbound.sublist.edoctemplate"] = "E-Doküman Şablonu";
    translation["inbound.msg.conversionongoing"] =
        "E-doküman şu anda dönüştürülüyor. İşlem tamamlandığında bir e-posta alacaksınız.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Gelen e-doküman dönüştürme işlemi bu tarih aralığında ({DATECREATED_FROM} - {DATECREATED_TO}) devam ettiğinden seçili ölçütlerle arama gerçekleştiremezsiniz. Arama ölçütlerinizi değiştirmeli veya bu e-dokümanı dönüştürdükten sonra tekrar denemelisiniz.";
    translation["inbound.invaliddates"] =
        "Oluşturma Tarihi Başlangıcı değeri, Oluşturma Tarihi Bitişi değerinden sonra olamaz. Tarihleri, Oluşturma Tarihi Başlangıcı değeri, Oluşturma Tarihi Bitişi değerinden daha önce olacak şekilde değiştirin.";
    translation["inbound.configurefreecountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing SuiteApp kullanımı için aktif bir lisansı yok. Toplu e-doküman dönüştürmek için lütfen hesap yöneticinizle iletişime geçin ve Şirket Bilgileri sayfasında bulunan Ücretsiz Kullanım için E-Doküman Ülkesini konfigüre edin.";
    translation["portlet.title"] = "Elektronik Dokümanlar";
    translation["portlet.outboundforgeneration"] =
        "Oluşturma için Giden E-Dokümanlar";
    translation["portlet.outboundforsending"] =
        "Gönderme için Giden E-Dokümanlar";
    translation["portlet.outboundwitherrors"] = "Giden Hatalı E-Dokümanlar";
    translation["portlet.outboundsendinglink"] =
        "Başarısız Giden E-Dokümanları Gönder";
    translation["portlet.inboundforconversion"] =
        "Dönüştürme için Gelen E-Dokümanlar";
    translation["portlet.inboundconvertfailed"] =
        "Başarısız Gelen E-Dokümanları Dönüştür";
    translation["portlet.inboundincomplete"] =
        "Tamamlanmamış Gelen E-Dokümanlar";
    translation["portlet.inbounduploadlink"] = "Gelen E-Dokümanı Yükle";
    translation["portlet.outboundforcertification"] =
        "Sertifikasyon için Giden E-Dokümanlar";
    translation["portlet.outboundcertifiedforsending"] =
        "Gönderme için Giden E-Dokümanlar";
    translation["inbound.webservice.response.success"] =
        "{ID} kimlikli gelen e-doküman başarıyla oluşturuldu.";
    translation["inbound.webservice.response.novendor"] =
        "Şu Web Hizmeti Kimliği ile ilişkili tedarikçi yok: {IDENTIFIER}. Doğru Web Hizmeti Kimliğinin kullanıldığından emin olun.";
    translation["inbound.webservice.response.multiplevendor"] =
        "{ID} kimlikli gelen e-doküman başarıyla oluşturuldu. Bununla birlikte, şu Web Hizmeti Kimliği ile ilişkili birden çok tedarikçi var: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Doğru şablon belirlenemediğinden, gelen e-doküman tamamlanmadı. Gelen e-doküman kaydından bir şablon seçin ya da autoselection şablonunu etkinleştirmek için e-doküman şablon kaydındaki XSD dosyasını ayarlayın.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Doğru tedarikçi belirlenemediğinden, gelen e-doküman tamamlanmadı. Gelen e-doküman kaydından bir tedarikçi seçin ya da ilişkili tedarikçi kaydında Web Hizmeti Kimliğini ayarlayın.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Şu anahtarlar eksik: {KEYS}. Web hizmeti isteğinde bunları sağlamanız gerekir.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Web hizmeti isteğinin gövdesi bir JSON nesnesi ya da &quot;application/json&quot; içerik türünü kullanan bir JSON nesneleri dizisi olmalıdır.";
    translation["transaction.contactnoemail"] =
        "Şu e-doküman alıcılarının ilgili kişi kayıtlarında bir e-posta adresi yok: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Bu işlem için e-doküman alıcısı yok. E-posta yoluyla doküman göndermek için e-doküman alıcıları listesine en az bir ilgili kişi eklenmelidir.";
    translation["transaction.maxrecipientexceeded"] =
        "Seçtiğiniz alıcı e-postası sayısı limiti aştı. En fazla 10 e-posta alıcısı seçebilirsiniz.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Yalnızca aşağıdaki işlem türleri işlenir:";
    translation["ei.prefs.formtitle"] = "E-Doküman Tercihleri";
    translation["ei.prefs.information.about.certify.skip"] =
        "İşlem için sertifikasyon gönderme yöntemi tanımlanmamışsa veya uygulanabilir değilse bu adım atlanır.";
    translation["ei.prefs.label.sublist.automati.ei"] = "Otomatik E-Faturalama";
    translation["ei.prefs.label.automatic.type.selected"] =
        "E-Doküman Otomasyon Türü";
    translation["ei.prefs.text.option.comb.disabled"] = "Devre Dışı Bırak";
    translation["ei.prefs.text.option.comb.gcs"] =
        "Oluştur, Sertifika Ekle, Gönder";
    translation["ei.prefs.text.option.comb.gc"] = "Oluştur, Sertifika Ekle";
    translation["ei.prefs.text.option.comb.cs"] = "Sertifika Ekle, Gönder";
    translation["ei.prefs.btn.label.cancel"] = "İptal";
    translation["ei.prefs.btn.label.save"] = "Kaydet";
    translation["ei.prefs.msg.confirm.save"] =
        "E-Doküman tercihlerinde yapılan değişiklikleri kaydetmek istiyor musunuz?";
    translation["ei.prefs.msg.success.save"] =
        "E-Doküman tercihleri başarıyla kaydedildi.";
    translation["ei.prefs.msg.failed.save"] =
        "E-Doküman tercihleri kaydedilemedi.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Bu sayfaya erişme izni kısıtlandı. Erişim isteğinde bulunmak için Yönetici ile iletişime geçin.";
    translation["ei.eip.msg.completed"] = "E-doküman işleme tamamlandı.";
    translation["ei.eip.msg.failed"] =
        "E-Doküman işlenemedi. Daha ayrıntılı bilgi için E-Doküman Denetim Listesi'ne bakın.";
    translation["ei.eip.msg.processing"] = "E-Doküman işleniyor.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "E-Doküman zaten işleniyor.";
    translation["license.notinstalled"] =
        "NetSuite SuiteApps Lisans İstemcisi hesabınızda mevcut değil. Lütfen tüm Electronic Invoicing özelliklerine erişmek için bu SuiteApp uygulamasını kurun.";
    translation["outbound.formtitle"] = "Başarısız Olan E-Dokümanları Gönder";
    translation["outbound.search"] = "Ara";
    translation["outbound.send"] = "Gönder";
    translation["outbound.return"] = "Ölçütlere Dön";
    translation["outbound.customer"] = "Müşteri";
    translation["outbound.vendor"] = "Tedarikçi";
    translation["outbound.subsidiary"] = "Bağlı Şirket";
    translation["outbound.type"] = "İşlem Türü";
    translation["outbound.datefrom"] = "İşlem Tarihi Başlangıcı";
    translation["outbound.dateto"] = "İşlem Tarihi Bitişi";
    translation["outbound.subshelp"] =
        "Yalnızca bağlı şirkete ait işlemleri görüntülemek için bir bağlı şirket seçin.";
    translation["outbound.custhelp"] =
        "Yalnızca bir müşteriye ait işlemleri görüntülemek için bir müşteri seçin. Müşteri seçilmezse arama sonuçları, müşteriye bakılmaksızın bağlı şirkete ait tüm işlemleri gösterir.";
    translation["outbound.vendorhelp"] =
        "Yalnızca bir tedarikçiye ait işlemleri görüntülemek için bir tedarikçi seçin. Tedarikçi seçilmezse arama sonuçları, tedarikçiye bakılmaksızın bağlı şirkete ait tüm işlemleri gösterir.";
    translation["outbound.entitytypehelp"] =
        "Müşteri veya Tedarikçi varlık türünü seçin. Böylece aşağıdaki ilgili aşağı açılır liste etkinleşir.";
    translation["outbound.typehelp"] =
        "Göndermek istediğiniz her e-doküman için bir veya daha fazla işlem türü seçin. Birden çok işlem türü seçmek için her işlem türünü seçerken Ctrl tuşunu basılı tutun.<br /><br />İşlem türü seçilmezse arama sonuçları, işlem türüne bakılmaksızın gönderime hazır olan tüm e-dokümanları gösterir.";
    translation["outbound.datefromhelp"] =
        "Belirli bir tarih aralığında oluşturulan işlemlerin bir listesini görüntülemek için tarih aralığının başlangıcını tanımlamak üzere bir tarih seçin.";
    translation["outbound.datetohelp"] =
        "Belirli bir tarih aralığında oluşturulan işlemlerin bir listesini görüntülemek için tarih aralığının bitişini tanımlamak üzere bir tarih seçin.";
    translation["outbound.entityfieldgroup"] = "Varlık Arama Filtreleri";
    translation["outbound.filtersfieldgroup"] = "İşlem Arama Filtreleri";
    translation["outbound.entitytypeinlinehelp"] = "Varlık türünü seçin:";
    translation["outbound.invalidtypetitle"] = "Geçersiz İşlem Türleri";
    translation["outbound.invalidtype"] =
        "Şu işlem türleri şu an için desteklenmemektedir: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Seçtiğiniz varlık için şu işlem türleri geçerli değil: {TRANSACTIONTYPES}. Seçtiğiniz tüzel kişilik için uygun işlem türlerini seçin.";
    translation["outbound.invaliddates"] =
        "İşlem Tarihi Başlangıcı değeri, İşlem Tarihi Bitişi değerinden sonra olmamalıdır. Tarihleri, İşlem Tarihi Başlangıcı değeri, İşlem Tarihi Bitişi değerinden daha önce olacak şekilde değiştirin.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Bağlı şirkette ({SUBSIDIARY}) bu tarih aralığındaki ({TRANDATE_FROM} - {TRANDATE_TO}) işlemler için e-doküman gönderme zaten devam ettiğinden seçili ölçütlerle arama gerçekleştiremezsiniz. Arama ölçütlerinizi değiştirmeli veya bu e-dokümanı gönderdikten sonra tekrar denemelisiniz.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Bu tarih aralığındaki ({TRANDATE_FROM} - {TRANDATE_TO}) işlemler için e-doküman gönderme zaten devam ettiğinden seçili ölçütlerle arama gerçekleştiremezsiniz. Arama ölçütlerinizi değiştirmeli veya bu e-dokümanı gönderdikten sonra tekrar denemelisiniz.";
    translation["outbound.sublist.trannum"] = "İşlem Numarası";
    translation["outbound.sublist.trantype"] = "İşlem Türü";
    translation["outbound.sublist.customer"] = "Müşteri";
    translation["outbound.sublist.vendor"] = "Tedarikçi";
    translation["outbound.sublist.subsidiary"] = "Bağlı Şirket";
    translation["outbound.sublist.trandate"] = "İşlem Tarihi";
    translation["outbound.sublist.memo"] = "Not";
    translation["outbound.sublist.template"] = "Şablon";
    translation["outbound.sublist.sendingmethod"] = "Gönderme Yöntemi";
    translation["outbound.sublist.sublistname"] =
        "Gönderilecek Başarısız Giden E-Doküman Sonuçları";
    translation["outbound.msg.sendingongoing"] =
        "E-doküman şu anda gönderiliyor. İşlem tamamlandığında bir e-posta alacaksınız.";
    translation["outbound.configurefreecountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok. Toplu e-doküman göndermek için lütfen şirket bilgileri sayfasında Ücretsiz Kullanım için E-Doküman Ülkesi konfigürasyonuna yönelik olarak hesap yöneticinizle iletişime geçin.";
    translation["outbound.entitysend"] = "Varlığa Gönder";
    translation["outbound.certifysend"] = "Sertifikasyon için Gönder";
    translation["outbound.sendingtypehelp"] =
        "Varlığa Gönder'i ya da Sertifikasyon için Gönder'i seçin. Bunu yaptığınızda gönderilecek karşılık gelen işlemleri listeler.";
    translation["customer.noemail"] =
        "Bu müşteri için e-posta adresi yok. E-dokümanları e-postayla göndermeyi etkinleştirmek için müşteri kaydına geçerli bir e-posta adresi girin.";
    translation["customer.contactnoemail"] =
        "Şu e-doküman alıcılarının ilgili kişi kayıtlarında bir e-posta adresi yok: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Bu müşteri için e-doküman alıcısı yok. Bu müşteriye e-posta yoluyla elektronik doküman göndermek için e-doküman alıcıları listesine en az bir ilgili kişi eklenmelidir.";
    translation["customer.arrayrequired"] =
        "Doğrulama için gerekli ilgili kişi dizisi.";
    translation["customer.parameternotarray"] =
        "Kişiler parametresi bir dizi değil.";
    translation["customer.maxrecipientexceeded"] =
        "Maksimum e-posta alıcısı sayısını aştınız. En fazla 10 e-posta alıcısı seçebilirsiniz.";
    translation["vendor.noemail"] =
        "Bu tedarikçi için e-posta adresi yok. E-dokümanları e-postayla göndermeyi etkinleştirmek için tedarikçi kaydına geçerli bir e-posta adresi girin.";
    translation["vendor.contactnoemail"] =
        "Şu e-doküman alıcılarının ilgili kişi kayıtlarında bir e-posta adresi yok: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Bu tedarikçi için e-doküman alıcısı yok. Bu tedarikçiye e-posta yoluyla elektronik doküman göndermek için e-doküman alıcıları listesine en az bir ilgili kişi eklenmelidir.";
    translation["vendor.maxrecipientexceeded"] =
        "Maksimum e-posta alıcısı sayısını aştınız. En fazla 10 e-posta alıcısı seçebilirsiniz.";
    translation["vendor.nosenders"] =
        "Bu tedarikçi için bir e-doküman e-postası göndereni yok. Bu tedarikçiden e-posta yoluyla e-doküman almak için Tedarikçi E-Doküman E-Posta Gönderen listesine en az bir e-posta adresi girmelisiniz.";
    translation["vendor.existingsender"] = "Gönderen e-posta adresi zaten var.";
    translation["vendor.existingdomain"] =
        "Gönderen e-posta etki alanı farklı bir tedarikçi tarafından zaten kullanılıyor.";
    translation["vendor.existingidentifier"] =
        "Web Hizmeti Kimliği, farklı bir tedarikçi tarafından zaten kullanılıyor. Farklı bir Web Hizmeti Kimliği girin.";
    translation["customeremailrecipient.contextunsupported"] =
        "Müşteri E-Doküman E-Postası Alıcısı yalnızca şu içerikleri destekler: Kullanıcı Arayüzü, CSV, SuiteScript ve Web Hizmetleri.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Tedarikçi E-Doküman E-Postası Alıcısı yalnızca şu içerikleri destekler: Kullanıcı Arayüzü, CSV, SuiteScript ve Web Hizmetleri.";
    translation["vendoremailsender.contextunsupported"] =
        "Tedarikçi E-Doküman E-Postası Göndereni yalnızca şu içerikleri destekler: Kullanıcı Arayüzü, CSV, SuiteScript ve Web Hizmetleri.";
    translation["template.incorrectregex"] =
        "REGEX alanı hatalı bir düzenli ifade içeriyor. Doğru söz dizimi kullanılmalıdır.";
    translation["template.invalidjson"] =
        "Giden E-Dokümanlar alanına ait Şablona düzgün oluşturulmuş bir JSON girmediniz. Devam etmek için Tamam'a veya geçerli sayfada kalmak için İptal'e tıklayın.";
    translation["template.invalidxml"] =
        "XML şablonu hatalar içeriyor. XML formatının düzgün oluşturulmuş olması gerekir.";
    translation["template.templaterequired"] =
        "Seçili giden işlem türü için şablon içeriği eksik. Giden E-Dokümanlar alanına geçerli bir XML veya JSON şablonu girin ve tekrar deneyin.";
    translation["template.mappingrequired"] =
        "Bir gelen işlem türü seçtiniz ancak alan eşleştirmesinin JSON içeriği eksik. Gelen E-Dokümanlar için Alan Eşleştirme alanına JSON içeriğini girin.";
    translation["template.templateorjsonrequired"] =
        "Eksik alan değerleri var. Giden işlem için Giden E-Dokümanlar alanına ait Şablonda geçerli bir XML veya JSON içeriği belirtin. Gelen işlem için gelen E-Doküman alanına ait Alan Eşleştirmesinde JSON içeriğini belirtin.";
    translation["template.invalidxsdfile"] =
        "Seçili XSD dosyası geçerli bir XSD dosyası değil. Seçtiğiniz dosyanın uzantısının .xsd olduğundan emin olun.";
    translation["template.contextunsupported"] =
        "E-Doküman Şablonu yalnızca Kullanıcı Arayüzü ve SuiteScript içeriklerini destekler.";
    translation["template.supportedtranstypefldhelp"] =
        "Bu şablonun destekleyeceği bir veya daha fazla işlem türü seçin. Çoklu işlem türü seçmek için işlem türlerini Ctrl tuşunu basılı tutarak seçin.<br /><br />İşlem türleri seçilemiyorsa bu, söz konusu işlem türünün bir veya daha fazla işlem kaydına şablonun zaten atandığı anlamına gelir. İşlem türü seçebilmek için şablonu işlem kaydından kaldırın.<br /><br />Ayrıca bu şablonu gelen e-dokümanlara da atayabilirsiniz, bu durumda İşlem Türü alanı devre dışı kalır.";
    translation["template.eistatus"] =
        "E-Doküman Durumu ile İşlem Düzenlemeyi Sınırla";
    translation["template.supportedeistatusfieldhelp"] =
        "Bu şablon seçtiğiniz e-doküman durumuna sahip işlemlerle ilişkilendirildiğinde bu işlemler düzenlenemeyecek. Birden çok e-doküman durumu seçebilirsiniz.";
    translation["template.invalidschemaordependency"] =
        "Şema, hatalı yapılandırılmış bir XSD veya bağlı olan şema bulunamıyor.";
    translation["template.xmldoesnotconformtoschema"] =
        "Şablonun XML'i sağlanan XSD'ye veya şemaya uymuyor.";
    translation["template.xmldomexception"] = "Girdi XML dizesi kusurlu.";
    translation["template.missingreqdargument"] =
        "Giden doğrulama için XSD eksik.";
    translation["template.xsdvalidationexception"] =
        "XSD doğrulaması sırasında bilinmeyen bir özel durum gerçekleşti.";
    translation["template.xsdmissingdependencyfolder"] =
        "XSD şema klasörü geçersiz veya eksik.";
    translation["invoice.generatebtn"] = "E-Doküman Oluştur";
    translation["invoice.sendbtn"] = "E-Doküman Gönder";
    translation["invoice.sendcertifybtn"] = "E-Dokümanı Onayla";
    translation["invoice.eipbtn"] = "E-Dokümanı İşle";
    translation["invoice.loguntagged"] =
        "E-doküman şablonu kaldırıldı. E-doküman oluşturma için işlemin etiketi kaldırıldı.";
    translation["invoice.logforgenerate"] =
        "İşlem, e-doküman oluşturma için hazır.";
    translation["invoice.invalidtemplatesub"] =
        "İşlemin bağlı şirketi, seçili e-doküman şablonu için geçerli değil. Farklı bir e-doküman şablonu seçin.";
    translation["invoice.templateremovalerror"] =
        "Gönderilmiş e-dokümanların e-doküman şablonunun kaldırılmasına izin verilmez.";
    translation["ei.sending.currentlysending"] =
        "E-doküman şu anda gönderiliyor. Bu işlemin tamamlanması birkaç dakika sürebilir. E-Doküman Gönder düğmesine yeniden tıklayarak işlemi kesintiye uğratmayın. E-doküman gönderildikten sonra sayfa yeniden yüklenir.";
    translation["ei.sending.notready"] =
        "Bu e-doküman gönderime hazır değil. E-doküman oluşturmak için öncelikle E-Doküman Oluştur'a tıklamanız gerekir.";
    translation["ei.sending.alreadysent"] = "Bu işlem zaten gönderildi.";
    translation["ei.sending.norecipients"] =
        "E-doküman, müşterinin e-doküman alıcısı olmadığından gönderilemiyor. Bu e-dokümanı e-postayla gönderebilmek için e-doküman alıcılarının öncelikle müşteri kaydından seçilmeleri gerekir.";
    translation["ei.sending.indivcustnoemail"] =
        "E-doküman, müşterinin e-posta adresi olmadığından gönderilemiyor. Bu e-dokümanı e-postayla gönderebilmek için müşteri kaydından bir e-posta adresinin sağlanması gerekir.";
    translation["ei.sending.norecipients.vendor"] =
        "E-doküman, tedarikçinin e-doküman alıcısı olmadığından gönderilemiyor. Bu e-dokümanı e-postayla gönderebilmek için e-doküman alıcılarının öncelikle tedarikçi kaydından seçilmeleri gerekir.";
    translation["ei.sending.indivvendnoemail"] =
        "E-doküman, tedarikçinin e-posta adresi olmadığından gönderilemiyor. Bu e-dokümanı e-postayla gönderebilmek için tedarikçi kaydından bir e-posta adresinin sağlanması gerekir.";
    translation["ei.sending.invalidmethod"] =
        "{TYPE} #{INVOICENUMBER} için geçerli bir gönderme yöntemi seçin.";
    translation["ei.sending.sentdetails"] =
        "Gönderen: {SENDER}\nAlıcılar: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "E-doküman gönderen kişinin ({EMPLOYEENAME}) e-posta adresi yok. Çalışan kaydına geçerli bir e-posta adresi girin.";
    translation["ei.sending.recipientnoemail"] =
        "Bu işlemle ilişkili e-dokümanın bir veya birden çok alıcısının e-posta adresi yok. Bu müşteri için alıcıların geçerli e-posta adreslerine sahip olduklarından emin olun.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Bu işlemle ilişkili e-dokümanın bir veya birden çok alıcısının e-posta adresi yok. Bu tedarikçi için alıcıların geçerli e-posta adreslerine sahip olduklarından emin olun.";
    translation["ei.sending.defaulterror"] =
        "E-doküman gönderilirken bir hata oluştu. Ayrıntılar için lütfen E-doküman alt sekmesindeki E-doküman Denetim İzi'ni kontrol edin.";
    translation["ei.sending.inactivecustomer"] =
        "Seçili müşteri etkin olmadığından bu işlem için e-doküman gönderilemiyor. E-Doküman Durumu alanı güncellenmedi ve bir denetim izi oluşturulmadı. Müşteri kaydındaki Etkin Değil kutusunun işaretini temizleyip e-dokümanı göndermeyi yeniden deneyin.";
    translation["ei.sending.inactivevendor"] =
        "Seçili tedarikçi etkin olmadığından bu işlem için e-doküman gönderilemiyor. E-Doküman Durumu alanı güncellenmedi ve bir denetim izi oluşturulmadı. Tedarikçi kaydındaki Etkin Değil kutusunun işaretini temizleyip e-dokümanı göndermeyi yeniden deneyin.";
    translation["ei.sending.msg.processcomplete"] = "E-doküman gönderildi.";
    translation["ei.sending.configurefreecountry"] =
        "Hesabınızın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı olması gerekir. E-dokümanları toplu halde tek bir ülkeye göndermek için Şirket Bilgileri sayfasındaki Ücretsiz Kullanım için E-Doküman Ülkesi alanında ülkeyi seçmelisiniz.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Etkin olmayan müşteri içeren işlemler e-dokümanla desteklenmez.";
    translation["ei.sending.inactivevendor.manager"] =
        "Etkin olmayan tedarikçi içeren işlemler e-dokümanla desteklenmez.";
    translation["ei.sending.certification.defaulterror"] =
        "E-doküman sertifikasyonu sırasında bir hata oluştu. Ayrıntılar için lütfen E-Doküman alt sekmesindeki E-Doküman Denetim İzi'ni kontrol edin.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "E-doküman sertifikasyon için gönderildi.";
    translation["ei.generation.generationlogbulk"] =
        "E-doküman, '{TEMPLATENAME}' e-doküman şablonu kullanılarak toplu olarak oluşturuldu.";
    translation["ei.generation.generationlog"] =
        "E-doküman, '{TEMPLATENAME}' e-doküman şablonu kullanılarak oluşturuldu.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "E-doküman ve PDF dosyası, '{TEMPLATENAME}' e-doküman şablonu kullanılarak toplu olarak oluşturuldu.";
    translation["ei.generation.generationwithpdflog"] =
        "E-doküman ve PDF dosyası, '{TEMPLATENAME}' e-doküman şablonu kullanılarak oluşturuldu.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "E-doküman, '{TEMPLATENAME}' e-doküman şablonu kullanılarak toplu olarak oluşturuldu. Bu işlemin daha önce oluşturulan PDF dosyası silindi.";
    translation["ei.generation.generationremovedpdflog"] =
        "E-doküman, '{TEMPLATENAME}' e-doküman şablonu kullanılarak oluşturuldu. Bu işlemin daha önce oluşturulan PDF dosyası silindi.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Toplu oluşturma işlemi\nKullanılan E-Doküman şablonu: {TEMPLATENAME}\nHata ayrıntıları: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Kullanılan e-doküman şablonu: {TEMPLATENAME}\nHata ayrıntıları: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Oluşturma işlemi sırasında bir hata oluştu. Ayrıntılar için E-Doküman alt sekmesindeki E-Doküman Denetim İzi'ni kontrol edin.";
    translation["ei.generation.inactivecustomer"] =
        "Seçili müşteri etkin olmadığından bu işlem için e-doküman oluşturulamıyor. E-Doküman Durumu alanı güncelleştirilmedi ve bir denetim izi oluşturulmadı. Müşteri kaydındaki Etkin Değil kutusunun işaretini temizleyip e-dokümanı oluşturmayı yeniden deneyin.";
    translation["ei.generation.inactivevendor"] =
        "Seçili tedarikçi etkin olmadığından bu işlem için e-doküman oluşturulamıyor. E-doküman Durumu alanı güncelleştirilmedi ve bir denetim izi oluşturulmadı. Tedarikçi kaydındaki Etkin Değil kutusunun işaretini temizleyip e-dokümanı oluşturmayı yeniden deneyin.";
    translation["ei.generation.msg.processcomplete"] = "E-doküman oluşturuldu.";
    translation["ei.generation.configurefreecountry"] =
        "Hesabınızın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı olması gerekir. E-dokümanları toplu halde tek bir ülke için oluşturmak üzere Şirket Bilgileri sayfasındaki Ücretsiz Kullanım için E-Doküman Ülkesi alanında ülkeyi seçmelisiniz.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Etkin olmayan müşteri içeren işlemler e-dokümanla desteklenmez.";
    translation["ei.generation.inactivevendor.generator"] =
        "Etkin olmayan tedarikçi içeren işlemler e-dokümanla desteklenmez.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "E-doküman başarıyla oluşturuldu ve dijital olarak imzalandı.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Ortaya çıkan e-doküman düzgün oluşturulmuş bir XML veya JSON olmadığı için oluşturma işlemi başarısız oldu.";
    translation["notify.batchownersubject"] =
        "E-doküman Gönderme İşlemi Tamamlandı";
    translation["notify.batchownerbody"] =
        "Merhaba, <br/><br/>E-Doküman gönderme isteğiniz tamamlandı.<br/>Toplam {TOTAL} e-dokümandan {SENT} tanesi gönderildi. Ayrıntılar için lütfen ekteki dosyaya bakın. <br/><br/>Teşekkürler,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "{PONUM} Numaralı Satış Siparişi İçin E-doküman oluşturuldu.";
    translation["notify.recipientcompsubj"] =
        "E-Doküman {COMPANYNAME} Kaynağından Oluşturuldu";
    translation["notify.recipientbody"] =
        "Merhaba! <br /><br />{MESSAGE}<br />Lütfen ekteki e-doküman dosyasına bakın.<br /><br />Teşekkürler,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "E-doküman oluşturma işlemi sırasında hata oluştu";
    translation["notify.generationerrorbody"] =
        "E-doküman oluşturma sırasında hatalarla karşılaşıldı.<br/>İşlemlerin listesi ve hata ayrıntıları için lütfen ekteki dosyaya bakın.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Bu işlem için bir e-doküman zaten gönderildi. Yeni bir e-doküman oluşturduğunuzda önceki e-dokümanın üzerine yazılır. Yeni bir e-doküman oluşturmak istediğinizden emin misiniz?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Gönderilmiş e-dokümanların e-doküman şablonunun kaldırılmasına izin verilmez.";
    translation["transaction.msg.generate.information"] =
        "Bu E-Dokümanın oluşturulması devam ediyor.";
    translation["transaction.msg.send.information"] =
        "Bu E-Dokümanın gönderilmesi devam ediyor.";
    translation["transaction.msg.send.certify.information"] =
        "Bu E-Dokümanın sertifikasyonu devam ediyor.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Bu E-Dokümanın oluşturulması zaten devam ediyor.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Bu E-Dokümanın gönderilmesi zaten devam ediyor.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Bu E-Dokümanın sertifikasyonu zaten devam ediyor.";
    translation["transaction.msg.uncheckpdf"] =
        "Son e-doküman oluşturma işlemi sırasında bu işlemin PDF dosyası oluşturuldu. Bu kutu temizlenirse bir sonraki e-doküman oluşturma işleminde ilgili PDF dosyası silinir.";
    translation["transaction.msg.nofreecountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok. Bu işlem için bir e-doküman oluşturmak amacıyla lütfen Şirket Bilgileri sayfasında Ücretsiz Kullanım için E-Doküman Ülkesi yapılandırması alanında bir ülke belirtmek üzere hesap yöneticinizle iletişime geçin.";
    translation["transaction.msg.otherbillingcountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok. Bu işlem için bir e-doküman oluşturmak amacıyla lisans satın almak üzere lütfen NetSuite hesap yöneticinizle iletişime geçin.";
    translation["transaction.msg.nobillingcountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok. Bu işlem için bir e-doküman oluşturmak amacıyla lütfen bu işlemin faturalama adresini belirtin.";
    translation["transaction.msg.noshippingcountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok. Bu işlem için bir e-doküman oluşturmak amacıyla lütfen bu işlemin sevkiyat adresini belirtin.";
    translation["transaction.msg.nocustomercountry"] =
        "Bu hesabın birden çok ülkede Electronic Invoicing kullanımı için aktif bir lisansı yok. Bu işlem için bir e-doküman oluşturmak istiyorsanız lütfen bu işlemin müşterisi için bir varsayılan faturalama adresi belirtin.";
    translation["transaction.msg.blockededittransaction"] =
        "Geçerli E-Doküman Durumu için işlemin düzenlenmesi engellenmiştir. Lütfen ekteki EI şablonuna başvurun.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "İçerik Türü alanındaki XML değerini farklı bir türdeki değerle değiştirdiğinizde tüm XML doğrulayıcıları kaldırılır. İçerik türünü değiştirmek istediğinizden emin misiniz?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Yalnızca XML içerik türü için doğrulayıcılar eklenebilir.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Bu doğrulayıcı zaten listede.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "E-Doküman Şablonu Doğrulayıcıları yalnızca Kullanıcı Arayüzü ve SuiteScript içeriklerini destekler.";
    translation["standarddocument.default.alreadyexist"] =
        "{DEFAULT_DOCUMENT_STANDARD} kaydı zaten var. Aynı adlı bir doküman paketi kaydı oluşturamazsınız. Doküman paketi kaydınızı yeniden adlandırıp tekrar deneyin.";
    translation["standarddocument.default.editnotallowed"] =
        "{DEFAULT_DOCUMENT_STANDARD} kayıt Adı veya Açıklamasının düzenlenmesine izin verilmez.";
    translation["standarddocument.default.deletenotallowed"] =
        "{DEFAULT_DOCUMENT_STANDARD} kaydını silmeye izin verilmez.";
    translation["standarddocument.contextunsupported"] =
        "E-Doküman Paketi yalnızca Kullanıcı Arayüzü, CSV İçe Aktarma ve SuiteScript içeriklerini destekler.";
    translation["sendingmethod.default.alreadyexist"] =
        "{DEFAULT_SENDING_METHOD_NAME} gönderme yöntemi kaydı zaten var. Aynı adlı bir gönderme yöntemi kaydı oluşturamazsınız. Gönderme yöntemi kaydınızı yeniden adlandırıp tekrar deneyin.";
    translation["sendingmethod.default.editnotallowed"] =
        "{DEFAULT_SENDING_METHOD_NAME} gönderme yöntemi kaydını düzenlemeye izin verilmez.";
    translation["sendingmethod.default.deletenotallowed"] =
        "{DEFAULT_SENDING_METHOD_NAME} gönderme yöntemi kaydını silmeye izin verilmiyor.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Bu gönderme yöntemi bir veya daha fazla işlem kaydına atanmış olduğu için İşlem Türü alanı devre dışı bırakıldı. Bu gönderme yöntemini düzenlemek için İşlem Türü alanını etkinleştirmek üzere gönderme yöntemini işlem kaydından kaldırıp tekrar deneyin.";
    translation["sendingmethod.contextunsupported"] =
        "E-Doküman Gönderme Yöntemi yalnızca Kullanıcı Arayüzü ve SuiteScript içeriklerini destekler.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Bu gönderme yöntemi ile desteklenecek bir veya daha fazla işlem türü seçin. Birden çok işlem türü seçmek için işlem türlerini seçerken Ctrl tuşunu basılı tutun.<br /><br />Bir veya daha fazla işlem türü seçilemiyorsa gönderme yöntemi bu işlem türünde bir veya daha fazla işlem kaydına atanmıştır. İşlem türünün seçilebilmesi için önce gönderme yöntemini işlem kaydından kaldırmanız gerekir.";
    translation["sendingmethod.pluginimplementation"] =
        "E-Doküman Gönderme Yöntemi Eklenti Uygulaması";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Gönderme Yöntemi Eklenti Uygulaması seçin";
    translation["sendingmethod.scriptbannermessage"] =
        "Gönderme yöntemleri uyarlanmış eklenti uygulamaları olmalıdır. Lütfen mevcut gönderme yöntemi komutlarını &quot;Gönderme Eklentisi&quot; türünde yeni uyarlanmış eklenti uygulamaları olarak yeniden oluşturun.";
    translation["customdatasource.pluginimplementation"] =
        "Uyarlanmış Veri Kaynağı Eklenti Uygulaması";
    translation["customdatasource.pluginimplementationhelp"] =
        "Uyarlanmış Veri Kaynağı Eklenti Uygulamasını seçin";
    translation["digitalsignature.pluginimplementation"] =
        "Dijital İmza Eklentisini Uygulama";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Bir eklenti uygulaması seçin. E-dokümanları dijital olarak imzalamak istiyorsanız bu alan zorunludur.";
    translation["digitalsignature.identifierlabel"] =
        "Bu e-doküman dijital olarak imzalandı";
    translation["digitalsignature.successlog"] =
        "Oluşturulan e-doküman dijital olarak imzalandı.";
    translation["digitalsignature.failurelog"] =
        "Oluşturulan e-doküman dijital olarak imzalanmadı.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Dijital İmza eklentisini uygulama başarısız sonuç döndürdü.";
    translation["digitalsignature.plugininvalidresult"] =
        "Dijital İmza eklentisini uygulamadan dönen sonuç geçerli değil.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Gelen Uyarlanmış Veri Kaynağı Eklenti Uygulaması";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Gelen uyarlanmış veri kaynağı eklenti uygulamasını seçin.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Gelen Uyarlanmış Veri Kaynağı eklenti uygulama sonucu geçersiz.";
    translation["outboundvalidation.pluginimplementation"] =
        "Giden Doğrulama Eklenti Uygulaması";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Giden e-doküman doğrulaması eklenti uygulamasını seçin. Bu, giden e-dokümanları doğrular.";
    translation["outboundvalidation.successlog"] = "Giden Doğrulama Başarılı.";
    translation["outboundvalidation.failurelog"] = "Giden Doğrulama Başarısız.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Giden Doğrulama eklenti uygulaması başarısız durumu döndürdü.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Giden Doğrulama eklenti uygulaması sonucu geçersiz.";
    translation["template.msg.cannotedittransactiontype"] =
        "Bu şablon bir veya daha fazla işlem kaydına zaten atanmış olduğu için İşlem Türü alanı devre dışı bırakıldı. Bu şablonu düzenlemek için İşlem Türü alanını etkinleştirmek üzere şablonu işlem kaydından kaldırıp tekrar deneyin. Bu şablonu gelen e-dokümanlara da atayabilirsiniz. Bu durumda İşlem Türü alanı devre dışı bırakılır.";
    translation["template.msg.forcetocopymessage"] =
        "Varsayılan e-doküman şablonunu düzenleyemezsiniz. Eylemler altındaki Kopya Oluştur seçeneğini kullanarak kopyalayabilir ya da yeni bir e-doküman şablonu oluşturabilirsiniz.";
    translation["template.msg.warningoneditmessage"] =
        "Bu bir varsayılan e-doküman şablonu. Bu şablonda yapılan tüm değişiklikler kaybedilir veya SuiteApp güncellendiğinde üzerine yazılır.";
    translation["email.batchownernotification.subject"] =
        "E-Doküman Gönderme İşlemi Tamamlandı";
    translation["email.batchownernotification.body"] =
        "Merhaba, <br/><br/>E-dokümanlarınız gönderildi.<br/>Toplam {TOTAL} e-dokümandan {SENT} tanesi gönderildi. Ayrıntılar için lütfen ekteki dosyaya bakın. <br/><br/>Teşekkürler,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "E-Doküman Dönüştürme İşlemi Tamamlandı";
    translation["email.batchownerconvertnotification.body"] =
        "Merhaba, <br/><br/>E-dokümanlarınız dönüştürüldü.<br/>Toplam {TOTAL} e-dokümandan{CONVERTED} tanesi dönüştürüldü. Ayrıntılar için lütfen ekteki dosyaya bakın. <br/><br/>Teşekkürler,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "{PONUM} Numaralı Satış Siparişi İçin E-doküman oluşturuldu.";
    translation["email.recipientnotification.subject"] =
        "{COMPANYNAME} Şirketinden Alınan E-doküman";
    translation["email.recipientnotification.customizedsubject"] =
        "{TRANTYPE} #{TRANID}. {SUFFIX} için E-doküman Oluşturuldu";
    translation["email.recipientnotification.po.body"] =
        "Merhaba! <br /><br />{PONUM} numaralı satın alma siparişine ait e-doküman oluşturuldu.<br />Ayrıntılar için lütfen ekteki dosyaya bakın.<br /><br />Teşekkürler,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Merhaba! <br /><br />{TYPE} #{TRANID} için e-doküman oluşturuldu.<br />Ayrıntılar için lütfen ekteki dosyaya bakın.<br /><br />Teşekkürler,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "E-doküman oluşturma işlemi sırasında hata oluştu";
    translation["email.generationerrornotification.body"] =
        "E-doküman oluşturma sırasında hatalarla karşılaşıldı.<br/>İşlemlerin listesi ve hata ayrıntıları için lütfen ekteki dosyaya bakın.";
    translation["email.sendingerrornotification.subject"] =
        "E-doküman gönderme işlemi sırasında hata oluştu";
    translation["email.sendingerrornotification.body"] =
        "E-doküman gönderilirken hatalar oluştu.<br/>İşlemlerin listesi ve hata ayrıntıları için lütfen ekteki dosyaya bakın.";
    translation["email.webserviceerror.subject"] =
        "Gelen E-Doküman Web Hizmeti Bildirimi";
    translation["email.webserviceerror.body"] =
        "<p>Merhaba,</p><p>Web hizmeti kullanılarak gelen e-doküman işlenirken hatalarla karşılaşıldı.<br/>Lütfen aşağıdaki ayrıntılara bakın.</p>{DETAIL_TABLE}<p>Teşekkürler,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "İşlem Numarası";

    return translation;
});
