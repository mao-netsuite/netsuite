define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "Detail";
    translation["email.attachment.collabel.transactiontype"] =
        "Jenis Transaksi";
    translation["email.attachment.collabel.internalid"] = "ID Internal";
    translation["email.attachment.collabel.vendor"] = "Vendor";
    translation["email.conversionerrornotification.subject"] =
        "Terjadi kesalahan saat mengonversi dokumen elektronik masuk";
    translation["email.conversionerrornotification.body"] =
        "Terjadi kesalahan saat konversi dokumen elektronik masuk.<br/>Lihat file terlampir untuk daftar transaksi dan detail kesalahan.";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>Catatan: Jika Anda ingin pengguna lain yang menerima notifikasi tersebut, bukan administrator akun Anda, masukkan alamat email pengguna di bidang Penerima Notifikasi Dokumen Elektronik dalam data anak perusahaan induk Anda.";
    translation["email.table.collabel.inboundedocumentid"] =
        "ID dokumen elektronik Masuk";
    translation["email.table.collabel.details"] = "Detail";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "Kesalahan ditemukan selama pemeriksaan lisensi akun";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik di beberapa negara.</br>Untuk memproses dokumen elektronik secara massal, konfigurasikan Negara Dokumen Elektronik untuk Penggunaan Gratis di halaman Informasi Perusahaan.";
    translation["inboundedocument.logforconversion"] =
        "Dokumen elektronik masuk siap dikonversi.";
    translation["inboundedocument.logincomplete"] =
        "Dokumen elektronik masuk tidak lengkap. Tidak ada {FIELD} yang dipilih.";
    translation["inboundedocument.deletenotallowed"] =
        "Anda tidak dapat menghapus dokumen elektronik masuk.";
    translation["inboundedocument.copynotallowed"] =
        "Anda tidak dapat menyalin dokumen elektronik masuk.";
    translation["inboundedocument.contextunsupported"] =
        "Dokumen elektronik masuk hanya mendukung konteks UI dan SuiteScript.";
    translation["inboundedocument.invalidxmlfile"] =
        "Referensi File XML yang dipilih bukan file yang valid. Pastikan bahwa file yang Anda pilih memiliki ekstensi .xml.";
    translation["inboundedocument.invalidpdffile"] =
        "Referensi File PDF yang dipilih bukan file yang valid. Pastikan file yang Anda pilih memiliki ekstensi .pdf.";
    translation["inboundedocument.invalidxml"] =
        "Referensi File XML yang dipilih bukan dokumen XML yang dibentuk dengan baik.";
    translation["inboundedocument.convert.button"] = "Konversi";
    translation["inboundedocument.convert.information"] =
        "Konversi dokumen elektronik masuk ini sedang berlangsung.";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "Konversi Dokumen elektronik masuk ini sedang berlangsung.";
    translation["inboundedocument.cancel.button"] =
        "Batalkan Dokumen Elektronik";
    translation["inboundedocument.cancel.confirmation"] =
        "Anda yakin ingin membatalkan dokumen elektronik masuk ini?";
    translation["inboundedocument.cancel.failed"] =
        "Pembatalan gagal karena status data dokumen elektronik masuk adalah '{STATUS}'";
    translation["inboundedocument.cancel.defaulterror"] =
        "Terjadi kesalahan saat pembatalan. Lihat Jejak Audit Dokumen Elektronik pada subtab Dokumen Elektronik untuk melihat detailnya.";
    translation["inboundedocument.cancel.complete"] =
        "Dokumen elektronik telah dibatalkan.";
    translation["inboundedocument.preview.button"] = "Lihat XML";
    translation["inboundedocument.msg.nofreecountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk menggunakan SuiteApp Faktur Elektronik di beberapa negara. Agar dapat mengonversi dokumen elektronik ini menjadi sebuah transaksi, hubungi administrator akun Anda untuk menetapkan negara di bidang Negara dokumen elektronik untuk Penggunaan Gratis di halaman Informasi Perusahaan.";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk menggunakan SuiteApp Faktur Elektronik di beberapa negara. Agar dapat mengonversi dokumen elektronik menjadi sebuah transaksi, hubungi pengelola akun NetSuite Anda untuk membeli lisensi.";
    translation["inboundedocument.msg.nobillingcountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk menggunakan SuiteApp Faktur Elektronik di beberapa negara. Untuk mengonversi dokumen elektronik ini menjadi sebuah transaksi, siapkan alamat penagihan default dari vendor yang dipilih.";
    translation["validationplugin.contextunsupported"] =
        "Plugin Validasi Dokumen Elektronik Masuk hanya mendukung konteks UI dan SuiteScript.";
    translation["validationplugin.pluginimplementation"] =
        "Penerapan Plugin Validasi Dokumen Elektronik Masuk";
    translation["validationplugin.pluginimplementationhelp"] =
        "Pilih Penerapan Plugin Validasi Dokumen Elektronik Masuk.";
    translation["validationplugin.scriptbannermessage"] =
        "Validasi dokumen elektronik masuk harus berupa penerapan plugin kustom. Buat ulang skrip metode pengiriman lama sebagai penerapan plugin kustom baru berjenis &quot;PlugIn Validasi Masuk&quot;.";
    translation["ei.conversion.defaulterror"] =
        "Terjadi kesalahan saat mengonversi. Lihat Jejak Audit Dokumen Elektronik pada subtab Dokumen Elektronik untuk melihat detailnya.";
    translation["ei.conversion.inactivevendor"] =
        "Tidak dapat mengonversi dokumen elektronik masuk ini karena vendor yang dipilih nonaktif. Bidang Status Dokumen Elektronik belum diperbarui dan jejak audit belum dibuat. Kosongkan kotak Nonaktif pada data vendor, lalu coba konversi lagi dokumen elektronik tersebut.";
    translation["ei.conversion.inactivecustomer"] =
        "Tidak dapat mengonversi dokumen elektronik masuk ini karena pelanggan yang dipilih nonaktif. Bidang Status Dokumen Elektronik belum diperbarui dan jejak audit belum dibuat. Kosongkan kotak Nonaktif pada data pelanggan, lalu coba konversi lagi dokumen elektronik tersebut.";
    translation["ei.conversion.conversioncomplete"] =
        "Dokumen elektronik telah dikonversi.";
    translation["ei.conversion.conversionlogbulk"] =
        "Dokumen elektronik masuk disertakan pada konversi massal dan telah dikonversi menjadi transaksi dengan ID internal: {INTERNALID} dari Jenis: '{TYPE}'.";
    translation["ei.conversion.conversionlog"] =
        "Dokumen elektronik masuk telah dikonversi menjadi transaksi dengan ID internal: {INTERNALID} dari Jenis: '{TYPE}'";
    translation["ei.conversion.failedconversionlogbulk"] =
        "Proses konversi massal\nTemplate dokumen elektronik yang digunakan: {TEMPLATENAME}\nLingkup kesalahan: {ERRORSCOPE}\nRincian kesalahan: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "Template dokumen elektronik yang digunakan: {TEMPLATENAME}\nLingkup kesalahan: {ERRORSCOPE}\nRincian kesalahan: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "Kegagalan penguraian. Periksa Pemetaan Bidang untuk Dokumen Elektronik Masuk.";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "Kegagalan konversi.";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "Kegagalan validasi.";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "Konversi gagal karena status data dokumen elektronik masuk adalah '{STATUS}'";
    translation["ei.conversion.inactivecustomer.converter"] =
        "Konversi untuk dokumen elektronik masuk dengan pelanggan nonaktif tidak didukung.";
    translation["ei.conversion.inactivevendor.converter"] =
        "Konversi untuk dokumen elektronik masuk dengan vendor nonaktif tidak didukung.";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "Kode vendor berikut: {ITEMLIST}, tidak terkait dengan data item apa pun.";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "Nama/kode vendor berikut: {ITEMLIST}, tidak terkait dengan data item apa pun.";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "Kode vendor berikut: {ITEMLIST}, terkait dengan beberapa data item. Ubah data item dan pastikan bahwa kode vendor unik untuk setiap item per vendor.";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "Nama/kode vendor berikut: {ITEMLIST}, terkait dengan beberapa data item. Ubah data item dan pastikan bahwa nama/kode vendor unik untuk setiap item per vendor.";
    translation["ei.conversion.refnumnotfound"] =
        "Nomor referensi wajib tidak ada di dokumen elektronik masuk. Batalkan dokumen elektronik ini dan kirim dokumen elektronik lain yang menyertakan elemen XML untuk nomor referensi tersebut, yang dipetakan ke bidang tranid.";
    translation["ei.conversion.refnumexists"] =
        "Tagihan vendor dengan nomor referensi yang sama sudah ada. Batalkan dokumen elektronik ini dan kirim dokumen elektronik lain dengan nilai nomor referensi yang benar untuk elemen XML yang dipetakan ke bidang tranid.";
    translation["ei.conversion.vendorcodenotfound"] =
        "Bidang kode vendor tidak ada di templat dokumen elektronik. Ubah templat dokumen elektronik atau pilih templat lain yang menyertakan pemetaan bidang vendorcode.";
    translation["ei.conversion.novendorcodevalue"] =
        "Setidaknya salah satu dari item tersebut tidak memiliki kode vendor. Batalkan dokumen elektronik ini dan kirim dokumen elektronik lain dengan nilai yang benar untuk elemen XML yang dipetakan ke bidang kode vendor.";
    translation["ei.conversion.vendornamenotfound"] =
        "Bidang nama vendor tidak ada di templat dokumen elektronik. Ubah templat dokumen elektronik atau pilih templat lain yang menyertakan pemetaan bidang vendorname.";
    translation["ei.conversion.novendornamevalue"] =
        "Setidaknya salah satu dari item tersebut tidak memiliki nama/kode vendor. Batalkan dokumen elektronik ini dan kirim dokumen elektronik lain dengan nilai yang benar untuk elemen XML yang dipetakan ke bidang nama/kode vendor.";
    translation["ei.conversion.sourcetransnotfound"] =
        "Data ({TRANSTYPE} No. {TRANSID}) tidak ditemukan di dalam sistem. Batalkan dokumen elektronik ini dan kirim dokumen elektronik lain dengan nilai yang benar untuk elemen XML yang dipetakan ke bidang dibuat dari.";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "Data ({TRANSTYPE} No. {TRANSID}) ditugaskan pada entitas yang berbeda. Pilih entitas yang benar dan konversi dokumen elektronik ini.";
    translation["ei.conversion.novendorexpenseaccount"] =
        "Vendor tersebut tidak memiliki rekening pengeluaran default, yang diperlukan untuk mengonversi tagihan dengan pengeluaran. Untuk melanjutkan konversi, tetapkan nilai di bidang Rekening Pengeluaran Default pada data vendor.";
    translation["ei.conversion.nolinktopo"] =
        "Dokumen elektronik masuk tidak memiliki item atau pengeluaran yang disertakan pada pesanan pembelian rujukan. Periksa status pesanan pembelian yang dirujuk jika dapat dikonversi. Jika dapat dikonversi, batalkan dokumen elektronik ini dan kirim dokumen elektronik lain dengan nilai yang benar untuk elemen XML yang dipetakan ke bidang createdfrom.";
    translation["inbound.formtitle"] = "Konversi Dokumen Elektronik Masuk";
    translation["inbound.search"] = "Cari";
    translation["inbound.convert"] = "Konversi";
    translation["inbound.return"] = "Kembali ke Kriteria";
    translation["inbound.vendor"] = "Vendor";
    translation["inbound.datefrom"] = "Tanggal Dibuat Dari";
    translation["inbound.dateto"] = "Tanggal Dibuat Sampai";
    translation["inbound.vendorhelp"] =
        "Pilih vendor pemilik dokumen elektronik masuk gagal yang akan disertakan pada hasil pencarian.";
    translation["inbound.datefromhelp"] =
        "Pilih tanggal mulai untuk menentukan periode dokumen elektronik masuk gagal yang dibuat dalam periode tersebut yang akan disertakan pada hasil pencarian.";
    translation["inbound.datetohelp"] =
        "Pilih tanggal selesai untuk menentukan periode dokumen elektronik masuk gagal yang dibuat dalam periode tersebut yang akan disertakan pada hasil pencarian.";
    translation["inbound.inboundedocfieldgroup"] =
        "Filter Pencarian Dokumen Elektronik Masuk yang Gagal";
    translation["inbound.sublist.sublistname"] =
        "Hasil Pencarian Dokumen Elektronik Masuk yang Gagal";
    translation["inbound.sublist.internalid"] = "ID Internal";
    translation["inbound.sublist.vendor"] = "Vendor";
    translation["inbound.sublist.refnum"] = "Nomor Referensi";
    translation["inbound.sublist.ponum"] = "Nomor PO";
    translation["inbound.sublist.datecreated"] = "Tanggal Dibuat";
    translation["inbound.sublist.edoctemplate"] = "Templat Dokumen Elektronik";
    translation["inbound.msg.conversionongoing"] =
        "Dokumen elektronik sedang dikonversi. Anda akan menerima email saat prosesnya sudah selesai.";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "Anda tidak dapat melakukan pencarian menggunakan kriteria yang dipilih karena konversi dokumen elektronik masuk sedang berlangsung untuk kisaran tanggal ({DATECREATED_FROM} - {DATECREATED_TO}). Anda harus mengubah kriteria pencarian atau mencoba lagi setelah mengonversi dokumen elektronik ini.";
    translation["inbound.invaliddates"] =
        "Tanggal Dibuat Dari tidak boleh setelah Tanggal Dibuat Sampai. Ubah tanggalnya agar Tanggal Dibuat Dari menjadi sebelum Tanggal Dibuat Sampai.";
    translation["inbound.configurefreecountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk menggunakan SuiteApp Faktur Elektronik di beberapa negara. Agar dapat mengonversi dokumen elektronik secara massal, hubungi administrator akun Anda guna mengonfigurasi Negara Dokumen Elektronik untuk Penggunaan Gratis di halaman Informasi Perusahaan.";
    translation["portlet.title"] = "Dokumen Elektronik";
    translation["portlet.outboundforgeneration"] =
        "Dokumen Elektronik Keluar untuk Pembuatan";
    translation["portlet.outboundforsending"] =
        "Dokumen Elektronik Keluar untuk Pengiriman";
    translation["portlet.outboundwitherrors"] =
        "Dokumen Elektronik Keluar dengan Kesalahan";
    translation["portlet.outboundsendinglink"] =
        "Kirim Dokumen Elektronik Keluar yang Gagal";
    translation["portlet.inboundforconversion"] =
        "Dokumen Elektronik Masuk untuk Konversi";
    translation["portlet.inboundconvertfailed"] =
        "Konversikan Dokumen Elektronik Masuk yang Gagal";
    translation["portlet.inboundincomplete"] =
        "Dokumen Elektronik Masuk Tidak Lengkap";
    translation["portlet.inbounduploadlink"] =
        "Unggah Dokumen Elektronik Masuk";
    translation["portlet.outboundforcertification"] =
        "Dokumen Elektronik Keluar untuk Sertifikasi";
    translation["portlet.outboundcertifiedforsending"] =
        "Dokumen Elektronik Keluar untuk Pengiriman";
    translation["inbound.webservice.response.success"] =
        "Dokumen elektronik masuk dengan ID: {ID} berhasil dibuat.";
    translation["inbound.webservice.response.novendor"] =
        "Tidak ada vendor yang terkait dengan ID Layanan Web: {IDENTIFIER}. Pastikan bahwa ID Layanan Web yang digunakan sudah benar.";
    translation["inbound.webservice.response.multiplevendor"] =
        "Dokumen elektronik masuk dengan ID: {ID} berhasil dibuat. Namun, beberapa vendor terkait dengan ID Layanan Web: {IDENTIFIER}.";
    translation["inbound.webservice.error.templateerror"] =
        "Dokumen elektronik masuk tidak lengkap karena templat yang benar tidak dapat ditentukan. Pilih templat pada data dokumen elektronik masuk, atau siapkan XSD pada data templat dokumen elektronik untuk mengaktifkan pemilihan otomatis templat.";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "Dokumen elektronik masuk tidak lengkap karena vendor yang benar tidak dapat ditentukan. Pilih vendor dalam data dokumen elektronik masuk, atau tetapkan ID Layanan Web dalam data vendor yang terkait.";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Kunci-kunci berikut tidak ada: {KEYS}, yang harus Anda sediakan di permintaan layanan web.";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Isi permintaan layanan web harus berupa objek JSON atau larik objek JSON yang menggunakan Jenis Konten: 'application/json'.";
    translation["transaction.contactnoemail"] =
        "Penerima dokumen elektronik berikut tidak memiliki alamat email dalam data kontak mereka: {CONTACTNAMES}.";
    translation["transaction.norecipients"] =
        "Tidak ada penerima dokumen elektronik untuk transaksi ini. Untuk mengirim dokumen elektronik melalui email, sedikitnya satu kontak harus ditambahkan ke daftar penerima dokumen elektronik.";
    translation["transaction.maxrecipientexceeded"] =
        "Jumlah penerima email yang Anda tambahkan telah melebihi batas. Anda dapat menambahkan maksimum 10 penerima email.";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "Hanya jenis transaksi berikut yang diproses:";
    translation["ei.prefs.formtitle"] = "Preferensi Dokumen Elektronik";
    translation["ei.prefs.information.about.certify.skip"] =
        "Langkah sertifikasi dilewati jika metode pengiriman sertifikasi tidak ditentukan atau berlaku untuk transaksi.";
    translation["ei.prefs.label.sublist.automati.ei"] =
        "Faktur Elektronik Otomatis";
    translation["ei.prefs.label.automatic.type.selected"] =
        "Jenis Otomatisasi Dokumen Elektronik";
    translation["ei.prefs.text.option.comb.disabled"] = "Nonaktifkan";
    translation["ei.prefs.text.option.comb.gcs"] = "Buat, Sertifikasi, Kirim";
    translation["ei.prefs.text.option.comb.gc"] = "Hasilkan, Sertifikasi";
    translation["ei.prefs.text.option.comb.cs"] = "Sertifikasi, Kirim";
    translation["ei.prefs.btn.label.cancel"] = "Batal";
    translation["ei.prefs.btn.label.save"] = "Simpan";
    translation["ei.prefs.msg.confirm.save"] =
        "Apakah Anda ingin menyimpan perubahan ke preferensi Dokumen Elektronik?";
    translation["ei.prefs.msg.success.save"] =
        "Berhasil menyimpan preferensi Dokumen Elektronik.";
    translation["ei.prefs.msg.failed.save"] =
        "Gagal menyimpan preferensi Dokumen Elektronik.";
    translation["ei.prefs.insufficient.permission.details"] =
        "Izin untuk mengakses halaman ini dibatasi. Hubungi Administrator untuk meminta akses.";
    translation["ei.eip.msg.completed"] =
        "Pemrosesan Dokumen Elektronik berhasil.";
    translation["ei.eip.msg.failed"] =
        "Gagal memproses Dokumen Elektronik. Lihat Jejak Audit Dokumen Elektronik untuk melihat detailnya.";
    translation["ei.eip.msg.processing"] =
        "Dokumen Elektronik sedang diproses.";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "Dokumen Elektronik sedang diproses.";
    translation["license.notinstalled"] =
        "Klien Lisensi SuiteApp NetSuite tidak tersedia di akun Anda. Instal SuiteApp ini untuk mengakses semua fitur Faktur Elektronik.";
    translation["outbound.formtitle"] = "Kirim Dokumen Elektronik yang Gagal";
    translation["outbound.search"] = "Cari";
    translation["outbound.send"] = "Kirim";
    translation["outbound.return"] = "Kembali ke Kriteria";
    translation["outbound.customer"] = "Pelanggan";
    translation["outbound.vendor"] = "Vendor";
    translation["outbound.subsidiary"] = "Anak Perusahaan";
    translation["outbound.type"] = "Jenis Transaksi";
    translation["outbound.datefrom"] = "Tanggal Transaksi Dari";
    translation["outbound.dateto"] = "Tanggal Transaksi Sampai";
    translation["outbound.subshelp"] =
        "Pilih anak perusahaan untuk menampilkan hanya transaksi milik anak perusahaan tersebut.";
    translation["outbound.custhelp"] =
        "Pilih pelanggan untuk menampilkan hanya transaksi milik pelanggan tersebut. Jika tidak ada pelanggan yang dipilih, hasil pencarian akan menampilkan semua transaksi milik anak perusahaan, siapa pun pelanggannya.";
    translation["outbound.vendorhelp"] =
        "Pilih vendor untuk menampilkan hanya transaksi milik vendor tersebut. Jika tidak ada vendor yang dipilih, hasil pencarian akan menampilkan semua transaksi milik anak perusahaan, siapa pun vendornya.";
    translation["outbound.entitytypehelp"] =
        "Pilih jenis entitas Pelanggan atau Vendor. Ini akan mengaktifkan daftar drop-down di bawah ini.";
    translation["outbound.typehelp"] =
        "Pilih satu atau lebih jenis transaksi untuk setiap dokumen elektronik yang ingin Anda kirim. Untuk memilih banyak jenis transaksi, tekan dan tahan tombol Ctrl saat memilih setiap jenis transaksi.<br /><br />Jika tidak ada jenis transaksi yang dipilih, hasil pencarian akan menampilkan semua dokumen elektronik yang siap dikirim, apa pun jenis transaksinya.";
    translation["outbound.datefromhelp"] =
        "Untuk melihat daftar transaksi yang dibuat dalam kisaran tanggal tertentu, pilih satu tanggal untuk menentukan awal kisaran tanggal.";
    translation["outbound.datetohelp"] =
        "Untuk melihat daftar transaksi yang dibuat dalam kisaran tanggal tertentu, pilih satu tanggal untuk menentukan akhir kisaran tanggal.";
    translation["outbound.entityfieldgroup"] = "Filter Pencarian Entitas";
    translation["outbound.filtersfieldgroup"] = "Filter Pencarian Transaksi";
    translation["outbound.entitytypeinlinehelp"] = "Pilih jenis entitas:";
    translation["outbound.invalidtypetitle"] = "Jenis Transaksi Tidak Valid";
    translation["outbound.invalidtype"] =
        "Jenis transaksi berikut saat ini tidak didukung: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "Jenis transaksi berikut tidak valid untuk entitas yang dipilih: {TRANSACTIONTYPES}. Pilih jenis transaksi yang sesuai untuk entitas yang Anda pilih.";
    translation["outbound.invaliddates"] =
        "Tanggal Transaksi Dari tidak boleh setelah Tanggal Transaksi Sampai. Ubah tanggal agar Tanggal Transaksi Dari menjadi sebelum Tanggal Transaksi Sampai.";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "Anda tidak dapat melakukan pencarian menggunakan kriteria yang dipilih karena pengiriman dokumen elektronik masuk sedang berlangsung untuk transaksi dari kisaran tanggal ({TRANDATE_FROM} - {TRANDATE_TO}) untuk anak perusahaan ({SUBSIDIARY}). Anda harus mengubah kriteria pencarian atau mencoba lagi setelah mengirim dokumen elektronik ini.";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "Anda tidak dapat melakukan pencarian menggunakan kriteria yang dipilih karena pengiriman dokumen elektronik masuk sedang berlangsung untuk transaksi dari kisaran tanggal ({TRANDATE_FROM} - {TRANDATE_TO}). Anda harus mengubah kriteria pencarian atau mencoba lagi setelah mengirim dokumen elektronik ini.";
    translation["outbound.sublist.trannum"] = "Nomor Transaksi";
    translation["outbound.sublist.trantype"] = "Jenis Transaksi";
    translation["outbound.sublist.customer"] = "Pelanggan";
    translation["outbound.sublist.vendor"] = "Vendor";
    translation["outbound.sublist.subsidiary"] = "Anak Perusahaan";
    translation["outbound.sublist.trandate"] = "Tanggal Transaksi";
    translation["outbound.sublist.memo"] = "Memo";
    translation["outbound.sublist.template"] = "Templat";
    translation["outbound.sublist.sendingmethod"] = "Metode Pengiriman";
    translation["outbound.sublist.sublistname"] =
        "Hasil Dokumen Elektronik Keluar Gagal yang Akan Dikirim";
    translation["outbound.msg.sendingongoing"] =
        "Dokumen elektronik sedang dikirim. Anda akan menerima email jika proses sudah selesai.";
    translation["outbound.configurefreecountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik beberapa negara. Agar dapat mengirim dokumen elektronik secara massal, hubungi administrator akun Anda guna mengonfigurasi Negara Dokumen Elektronik untuk Penggunaan Gratis di halaman informasi perusahaan.";
    translation["outbound.entitysend"] = "Kirim ke Entitas";
    translation["outbound.certifysend"] = "Kirim untuk Sertifikasi";
    translation["outbound.sendingtypehelp"] =
        "Pilih Kirim kepada Entitas atau Kirim untuk Sertifikasi. Ini akan membuat daftar transaksi yang berhubungan dengan pengiriman.";
    translation["customer.noemail"] =
        "Tidak ada alamat email untuk pelanggan ini. Masukkan alamat email yang valid pada data pelanggan supaya dapat mengirim dokumen elektronik via email.";
    translation["customer.contactnoemail"] =
        "Penerima dokumen elektronik berikut tidak memiliki alamat email pada data kontak mereka: {CONTACTNAMES}.";
    translation["customer.norecipients"] =
        "Tidak ada penerima dokumen elektronik untuk pelanggan ini. Agar dapat mengirim dokumen kepada pelanggan ini via email, harus ada setidaknya satu kontak yang ditambahkan ke daftar penerima dokumen elektronik.";
    translation["customer.arrayrequired"] =
        "Larik kontak diperlukan untuk validasi.";
    translation["customer.parameternotarray"] = "Parameter kontak bukan larik.";
    translation["customer.maxrecipientexceeded"] =
        "Anda telah melebihi jumlah maksimum penerima email. Pilih maksimum 10 penerima email saja.";
    translation["vendor.noemail"] =
        "Tidak ada alamat email untuk vendor ini. Masukkan alamat email yang valid pada data vendor agar dapat mengirim dokumen elektronik via email.";
    translation["vendor.contactnoemail"] =
        "Penerima dokumen elektronik berikut tidak memiliki alamat email pada data kontak mereka: {CONTACTNAMES}.";
    translation["vendor.norecipients"] =
        "Tidak ada penerima dokumen elektronik untuk vendor ini. Agar dapat mengirim dokumen elektronik kepada vendor ini via email, harus ada setidaknya satu kontak yang ditambahkan ke daftar penerima dokumen elektronik.";
    translation["vendor.maxrecipientexceeded"] =
        "Anda telah melebihi jumlah maksimum penerima email. Pilih maksimum 10 penerima email saja.";
    translation["vendor.nosenders"] =
        "Tidak ada pengirim email dokumen elektronik untuk vendor ini. Agar dapat menerima dokumen elektronik dari vendor ini via email, Anda harus memasukkan setidaknya satu alamat email dalam daftar Pengirim Email dokumen elektronik Vendor.";
    translation["vendor.existingsender"] = "Alamat email pengirim sudah ada.";
    translation["vendor.existingdomain"] =
        "Domain email pengirim sudah digunakan oleh vendor yang berbeda.";
    translation["vendor.existingidentifier"] =
        "ID Layanan Web sudah digunakan oleh vendor lain. Masukkan ID Layanan Web yang berbeda.";
    translation["customeremailrecipient.contextunsupported"] =
        "Penerima Email Dokumen Elektronik Pelanggan hanya mendukung konteks berikut: UI, CSV, SuiteScript, dan Layanan Web.";
    translation["vendoremailrecipient.contextunsupported"] =
        "Penerima Email Dokumen Elektronik Vendor hanya mendukung konteks berikut: UI, CSV, SuiteScript, dan Layanan Web.";
    translation["vendoremailsender.contextunsupported"] =
        "Pengirim Email Dokumen Elektronik Vendor hanya mendukung konteks berikut: UI, CSV, SuiteScript, dan Layanan Web.";
    translation["template.incorrectregex"] =
        "Bidang REGEX berisi ekspresi reguler yang tidak tepat. Sintaksis yang digunakan harus benar.";
    translation["template.invalidjson"] =
        "Anda tidak memberikan JSON yang dibentuk dengan baik di bidang Templat untuk Dokumen Elektronik Keluar. Klik OKE untuk melanjutkan, atau Batal untuk tetap di halaman saat ini.";
    translation["template.invalidxml"] =
        "Terdapat kesalahan pada templat XML. Format XML harus dibentuk dengan baik.";
    translation["template.templaterequired"] =
        "Isi templat tidak ada untuk jenis transaksi keluar yang dipilih. Berikan isi templat XML atau JSON di bidang Dokumen Elektronik Keluar, lalu coba lagi.";
    translation["template.mappingrequired"] =
        "Anda telah memilih jenis transaksi masuk, tetapi konten JSON pemetaan bidang tidak ada. Masukkan konten JSON di bidang Pemetaan Bidang Untuk Dokumen Elektronik Masuk.";
    translation["template.templateorjsonrequired"] =
        "Ada nilai bidang yang tidak ada. Untuk transaksi keluar, tetapkan isi XML atau JSON yang valid di bidang Templat untuk Dokumen Elektronik Keluar. Untuk transaksi masuk, tetapkan isi JSON di bidang Pemataan Bidang untuk Dokumen Elektronik Masuk.";
    translation["template.invalidxsdfile"] =
        "File XSD yang dipilih tidak valid. Pastikan file yang Anda pilih memiliki ekstensi .xsd.";
    translation["template.contextunsupported"] =
        "Templat Dokumen Elektronik hanya mendukung konteks UI dan SuiteScript.";
    translation["template.supportedtranstypefldhelp"] =
        "Pilih satu atau lebih jenis transaksi yang akan didukung oleh templat ini. Untuk memilih banyak jenis transaksi, tekan dan tahan tombol Ctrl saat memilih jenis transaksi.<br /><br />Jika jenis transaksi tidak dapat dipilih, itu berarti templat sudah ditetapkan ke satu atau lebih data transaksi untuk jenis transaksi yang sama. Untuk mengaktifkan pemilihan jenis transaksi, hapus templat dari data transaksi.<br /><br />Anda juga dapat menetapkan templat ini ke dokumen elektronik masuk, yang berarti akan menonaktifkan bidang Jenis Transaksi.";
    translation["template.eistatus"] =
        "Batasi Pengeditan Transaksi dengan Status Dokumen Elektronik";
    translation["template.supportedeistatusfieldhelp"] =
        "Transaksi dengan status dokumen elektronik yang Anda pilih tidak akan dapat diedit jika templat ini terkait dengannya. Anda dapat memilih beberapa status dokumen elektronik.";
    translation["template.invalidschemaordependency"] =
        "Skema berupa XSD yang tidak terstruktur dengan benar atau skema turunannya tidak ditemukan.";
    translation["template.xmldoesnotconformtoschema"] =
        "XML templat tidak mematuhi XSD atau skema yang diberikan.";
    translation["template.xmldomexception"] =
        "Format string XML masukan tidak benar.";
    translation["template.missingreqdargument"] =
        "XSD untuk validasi keluar tidak ada.";
    translation["template.xsdvalidationexception"] =
        "Terjadi pengecualian yang tidak diketahui selama validasi XSD.";
    translation["template.xsdmissingdependencyfolder"] =
        "Folder skema XSD tidak valid atau tidak ada.";
    translation["invoice.generatebtn"] = "Buat Dokumen Elektronik";
    translation["invoice.sendbtn"] = "Kirim Dokumen Elektronik";
    translation["invoice.sendcertifybtn"] =
        "Beri Sertifikat pada Dokumen Elektronik";
    translation["invoice.eipbtn"] = "Proses Dokumen Elektronik";
    translation["invoice.loguntagged"] =
        "Templat dokumen elektronik telah dihapus. Transaksi tidak ditandai untuk pembuatan dokumen elektronik.";
    translation["invoice.logforgenerate"] =
        "Transaksi siap untuk pembuatan dokumen elektronik.";
    translation["invoice.invalidtemplatesub"] =
        "Anak perusahaan pada transaksi tersebut tidak valid untuk templat dokumen elektronik yang dipilih. Pilih templat dokumen elektronik yang berbeda.";
    translation["invoice.templateremovalerror"] =
        "Anda tidak dapat menghapus templat dokumen elektronik untuk dokumen elektronik yang telah dikirim.";
    translation["ei.sending.currentlysending"] =
        "Dokumen elektronik sedang dikirim. Proses ini mungkin berlangsung selama beberapa menit hingga selesai. Anda tidak boleh menyela prosesnya dengan mengeklik lagi tombol Kirim Dokumen Elektronik. Setelah dokumen elektronik terkirim, halaman tersebut akan dimuat ulang.";
    translation["ei.sending.notready"] =
        "Dokumen elektronik ini belum siap untuk dikirim. Anda harus mengeklik Buat Dokumen Elektronik terlebih dahulu untuk membuat dokumen elektronik.";
    translation["ei.sending.alreadysent"] = "Transaksi ini telah dikirim.";
    translation["ei.sending.norecipients"] =
        "Dokumen elektronik tersebut tidak dapat dikirim karena pelanggan tidak memiliki penerima dokumen elektronik. Agar dapat mengirim dokumen elektronik ini melalui email, penerima dokumen elektronik harus dipilih terlebih dahulu pada data pelanggan.";
    translation["ei.sending.indivcustnoemail"] =
        "Dokumen elektronik tersebut tidak dapat dikirim karena pelanggan tidak memiliki alamat email. Agar dapat mengirim dokumen elektronik ini melalui email, alamat email harus dicantumkan terlebih dahulu pada data pelanggan.";
    translation["ei.sending.norecipients.vendor"] =
        "Dokumen elektronik tersebut tidak dapat dikirim karena vendor tidak memiliki penerima dokumen elektronik. Agar dapat mengirim dokumen elektronik ini melalui email, penerima dokumen elektronik harus dipilih terlebih dahulu pada data vendor.";
    translation["ei.sending.indivvendnoemail"] =
        "Dokumen elektronik tersebut tidak dapat dikirim karena vendor tidak memiliki alamat email. Agar dapat mengirim dokumen elektronik ini melalui email, alamat email harus dicantumkan terlebih dahulu pada data vendor.";
    translation["ei.sending.invalidmethod"] =
        "Pilih metode pengiriman yang valid untuk {TYPE} No. {INVOICENUMBER}.";
    translation["ei.sending.sentdetails"] =
        "Pengirim: {SENDER}\nPenerima: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "Pengirim dokumen elektronik ({EMPLOYEENAME}) tidak memiliki alamat email. Masukkan alamat email yang valid pada data karyawan.";
    translation["ei.sending.recipientnoemail"] =
        "Satu atau beberapa penerima dokumen elektronik yang terkait dengan transaksi ini tidak memiliki alamat email. Pastikan penerima untuk pelanggan ini memiliki alamat email yang valid.";
    translation["ei.sending.recipientnoemail.vendor"] =
        "Satu atau beberapa penerima dokumen elektronik yang terkait dengan transaksi ini tidak memiliki alamat email. Pastikan penerima untuk vendor ini memiliki alamat email yang valid.";
    translation["ei.sending.defaulterror"] =
        "Terjadi kesalahan saat mengirim dokumen elektronik. Lihat Jejak Audit Dokumen Elektronik pada subtab Dokumen Elektronik untuk melihat detailnya.";
    translation["ei.sending.inactivecustomer"] =
        "Tidak dapat mengirim dokumen elektronik untuk transaksi ini karena pelanggan yang dipilih nonaktif. Bidang Status Dokumen Elektronik belum diperbarui dan jejak audit belum dibuat. Kosongkan kotak Nonaktif pada data pelanggan, lalu coba kirim lagi dokumen elektronik tersebut.";
    translation["ei.sending.inactivevendor"] =
        "Tidak dapat mengirim dokumen elektronik untuk transaksi ini karena vendor yang dipilih nonaktif. Bidang Status Dokumen Elektronik belum diperbarui dan jejak audit belum dibuat. Kosongkan kotak Nonaktif pada data vendor, lalu coba lagi mengirim dokumen elektronik.";
    translation["ei.sending.msg.processcomplete"] =
        "Dokumen elektronik telah dikirim.";
    translation["ei.sending.configurefreecountry"] =
        "Akun Anda harus memiliki lisensi aktif untuk menggunakan Faktur Elektronik untuk beberapa negara. Untuk mengirim dokumen elektronik secara massal ke satu negara, Anda harus memilih negara dari bidang Negara Dokumen Elektronik untuk Penggunaan Gratis di halaman Informasi Perusahaan.";
    translation["ei.sending.inactivecustomer.manager"] =
        "Transaksi dengan pelanggan nonaktif tidak didukung oleh dokumen elektronik.";
    translation["ei.sending.inactivevendor.manager"] =
        "Transaksi dengan vendor nonaktif tidak didukung oleh dokumen elektronik.";
    translation["ei.sending.certification.defaulterror"] =
        "Terjadi kesalahan saat sertifikasi dokumen elektronik. Lihat Jejak Audit Dokumen Elektronik pada subtab Dokumen Elektronik untuk melihat detailnya.";
    translation["ei.sending.certification.msg.processcomplete"] =
        "Dokumen elektronik telah dikirim untuk sertifikasi.";
    translation["ei.generation.generationlogbulk"] =
        "Dokumen elektronik dibuat secara massal, menggunakan templat dokumen elektronik '{TEMPLATENAME}'.";
    translation["ei.generation.generationlog"] =
        "Dokumen elektronik dibuat menggunakan templat dokumen elektronik '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflogbulk"] =
        "Dokumen elektronik dan file PDF dibuat secara massal, menggunakan templat dokumen elektronik '{TEMPLATENAME}'.";
    translation["ei.generation.generationwithpdflog"] =
        "Dokumen elektronik dan file PDF dibuat menggunakan templat dokumen elektronik '{TEMPLATENAME}'.";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "Dokumen elektronik dibuat secara massal, menggunakan templat dokumen elektronik '{TEMPLATENAME}'. File PDF yang dibuat sebelumnya untuk transaksi ini telah dihapus.";
    translation["ei.generation.generationremovedpdflog"] =
        "Dokumen elektronik dibuat menggunakan templat dokumen elektronik '{TEMPLATENAME}'. File PDF yang dibuat sebelumnya untuk transaksi ini telah dihapus.";
    translation["ei.generation.failedgenerationlogbulk"] =
        "Proses pembuatan massal\nTemplate dokumen elektronik yang digunakan: {TEMPLATENAME}\nRincian kesalahan: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "Template dokumen elektronik yang digunakan: {TEMPLATENAME}\nRincian kesalahan: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "Terjadi kesalahan saat pembuatan. Lihat Jejak Audit Dokumen Elektronik pada subtab Dokumen Elektronik untuk melihat detailnya.";
    translation["ei.generation.inactivecustomer"] =
        "Tidak dapat membuat dokumen elektronik untuk transaksi ini karena pelanggan yang dipilih nonaktif. Bidang Status Dokumen Elektronik belum diperbarui dan jejak audit belum dibuat. Kosongkan kotak Nonaktif pada data pelanggan, lalu coba buat lagi dokumen elektronik tersebut.";
    translation["ei.generation.inactivevendor"] =
        "Tidak dapat membuat dokumen elektronik untuk transaksi ini karena vendor yang dipilih nonaktif. Bidang Status Dokumen Elektronik belum diperbarui dan jejak audit belum dibuat. Kosongkan kotak Nonaktif pada data vendor, lalu coba buat lagi dokumen elektronik tersebut.";
    translation["ei.generation.msg.processcomplete"] =
        "Dokumen elektronik telah dibuat.";
    translation["ei.generation.configurefreecountry"] =
        "Akun Anda harus memiliki lisensi aktif untuk menggunakan Faktur Elektronik untuk beberapa negara. Untuk membuat dokumen elektronik secara massal ke satu negara, Anda harus memilih negara dari bidang Negara Dokumen Elektronik untuk Penggunaan Gratis di halaman Informasi Perusahaan.";
    translation["ei.generation.inactivecustomer.generator"] =
        "Transaksi dengan pelanggan nonaktif tidak didukung oleh dokumen elektronik.";
    translation["ei.generation.inactivevendor.generator"] =
        "Transaksi dengan vendor nonaktif tidak didukung oleh dokumen elektronik.";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "Dokumen elektronik berhasil dibuat dan ditandatangani secara digital.";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "Pembuatan gagal karena dokumen elektronik yang dihasilkan bukan XML atau JSON yang dibentuk dengan baik.";
    translation["notify.batchownersubject"] =
        "Pengiriman Dokumen Elektronik Selesai";
    translation["notify.batchownerbody"] =
        "Hai, <br/><br/>Permintaan Anda untuk mengirim dokumen elektronik telah selesai.<br/>{SENT} dari {TOTAL} telah terkirim. Lihat file terlampir untuk detailnya. <br/><br/>Terima Kasih,<br/>NetSuite";
    translation["notify.recipientposubj"] =
        "Dokumen Elektronik yang Dibuat untuk No. PO {PONUM}";
    translation["notify.recipientcompsubj"] =
        "Dokumen Elektronik yang Dibuat dari {COMPANYNAME}";
    translation["notify.recipientbody"] =
        "Salam! <br /><br />{MESSAGE}<br />Lihat file dokumen elektronik terlampir.<br /><br />Terima kasih,<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "Terjadi kesalahan saat pembuatan dokumen elektronik";
    translation["notify.generationerrorbody"] =
        "Terjadi kesalahan saat pembuatan dokumen elektronik.<br/>Lihat file terlampir untuk daftar transaksi dan detail kesalahan.";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "Dokumen elektronik telah dikirim untuk transaksi ini. Membuat dokumen elektronik baru akan menimpa dokumen elektronik sebelumnya. Anda yakin ingin membuat dokumen elektronik baru?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "Anda tidak dapat menghapus templat dokumen elektronik untuk dokumen elektronik yang telah dikirim.";
    translation["transaction.msg.generate.information"] =
        "Pembuatan dokumen elektronik ini sedang berlangsung.";
    translation["transaction.msg.send.information"] =
        "Pengiriman Dokumen Elektronik ini sedang berlangsung.";
    translation["transaction.msg.send.certify.information"] =
        "Sertifikasi Dokumen Elektronik ini sedang berlangsung.";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "Pembuatan Dokumen Elektronik ini sedang berlangsung.";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "Pengiriman Dokumen Elektronik ini sedang berlangsung.";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "Sertifikasi Dokumen Elektronik ini sedang berlangsung.";
    translation["transaction.msg.uncheckpdf"] =
        "File PDF dari transaksi ini telah dibuat selama pembuatan dokumen elektronik yang terakhir. Mengosongkan kotak ini akan menghapus file PDF saat pembuatan dokumen elektronik selanjutnya.";
    translation["transaction.msg.nofreecountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik beberapa negara. Agar dapat membuat dokumen elektronik untuk transaksi ini, hubungi administrator akun Anda guna menetapkan negara di bidang Negara Dokumen Elektronik untuk Penggunaan Gratis di halaman Informasi Perusahaan.";
    translation["transaction.msg.otherbillingcountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik beberapa negara. Agar dapat membuat dokumen elektronik untuk transaksi ini, hubungi pengelola akun NetSuite Anda untuk membeli lisensi.";
    translation["transaction.msg.nobillingcountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik beberapa negara. Agar dapat membuat dokumen elektronik untuk transaksi ini, tunjukkan alamat penagihan untuk transaksi ini.";
    translation["transaction.msg.noshippingcountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik beberapa negara. Agar dapat membuat dokumen elektronik untuk transaksi ini, tunjukkan alamat pengiriman untuk transaksi ini.";
    translation["transaction.msg.nocustomercountry"] =
        "Akun ini tidak memiliki lisensi aktif untuk penggunaan Faktur Elektronik beberapa negara. Agar dapat membuat dokumen elektronik untuk transaksi ini, tunjukkan alamat penagihan default untuk pelanggan transaksi ini.";
    translation["transaction.msg.blockededittransaction"] =
        "Mengedit transaksi diblokir untuk Status Dokumen Elektronik saat ini. Lihat templat EI yang terlampir.";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "Mengubah nilai di bidang Jenis Konten dari XML menjadi jenis lainnya akan menghapus semua validator XML. Anda yakin ingin mengubah jenis kontennya?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "Hanya validator untuk jenis konten XML yang dapat ditambahkan.";
    translation["transaction.msg.xmlvalidatorexists"] =
        "Validator ini sudah ada dalam daftar.";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "Validator Templat Dokumen Elektronik hanya mendukung konteks UI dan SuiteScript.";
    translation["standarddocument.default.alreadyexist"] =
        "Data {DEFAULT_DOCUMENT_STANDARD} sudah ada. Anda tidak dapat membuat data paket dokumen dengan nama yang sama. Ganti nama data paket dokumen Anda dan coba lagi.";
    translation["standarddocument.default.editnotallowed"] =
        "Anda tidak dapat mengedit Nama atau Deskripsi data {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.default.deletenotallowed"] =
        "Anda tidak dapat menghapus data {DEFAULT_DOCUMENT_STANDARD}.";
    translation["standarddocument.contextunsupported"] =
        "Paket dokumen elektronik hanya mendukung UI, Impor CSV, dan konteks SuiteScript.";
    translation["sendingmethod.default.alreadyexist"] =
        "Data metode pengiriman {DEFAULT_SENDING_METHOD_NAME} sudah ada. Anda tidak dapat membuat data metode pengiriman dengan nama yang sama. Ganti nama data metode pengiriman Anda dan coba lagi.";
    translation["sendingmethod.default.editnotallowed"] =
        "Anda tidak dapat mengedit data metode pengiriman {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.default.deletenotallowed"] =
        "Anda tidak dapat menghapus data metode pengiriman {DEFAULT_SENDING_METHOD_NAME}.";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "Bidang Jenis Transaksi tidak aktif karena metode pengiriman ini telah ditugaskan pada satu atau beberapa data transaksi. Untuk mengedit metode pengiriman ini, hapus metode pengiriman dari data transaksi untuk mengaktifkan bidang Jenis Transaksi dan coba lagi.";
    translation["sendingmethod.contextunsupported"] =
        "Metode Pengiriman Dokumen Elektronik hanya mendukung konteks UI dan SuiteScript.";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "Pilih satu atau lebih jenis transaksi yang akan didukung oleh metode pengiriman ini. Untuk memilih banyak jenis transaksi, tekan dan tahan tombol Ctrl saat memilih jenis transaksi.<br /><br />Jika satu atau lebih jenis transaksi tidak dapat dipilih, itu berarti metode pengiriman telah ditetapkan untuk satu atau lebih data transaksi dari jenis transaksi tersebut. Anda harus menghapus terlebih dahulu metode pengiriman tersebut dari data transaksi untuk mengaktifkan pemilihan jenis transaksi.";
    translation["sendingmethod.pluginimplementation"] =
        "Penerapan Plugin Metode Pengiriman Dokumen Elektronik";
    translation["sendingmethod.pluginimplementationhelp"] =
        "Pilih Penerapan Plugin Metode Pengiriman";
    translation["sendingmethod.scriptbannermessage"] =
        "Metode pengiriman harus berupa penerapan plugin kustom. Buat ulang skrip metode pengiriman lama sebagai penerapan plugin kustom baru berjenis &quot;Plugin Pengiriman&quot;.";
    translation["customdatasource.pluginimplementation"] =
        "Penerapan Plugin Sumber Data Kustom";
    translation["customdatasource.pluginimplementationhelp"] =
        "Pilih Penerapan Plugin Sumber Data Kustom";
    translation["digitalsignature.pluginimplementation"] =
        "Penerapan Plugin Tanda Tangan Digital";
    translation["digitalsignature.pluginimplementationhelp"] =
        "Pilih penerapan plugin. Bidang ini wajib diisi jika Anda ingin menandatangani dokumen elektronik secara digital.";
    translation["digitalsignature.identifierlabel"] =
        "Dokumen ini ditandatangani secara digital";
    translation["digitalsignature.successlog"] =
        "Dokumen elektronik yang dibuat ditandatangani secara digital.";
    translation["digitalsignature.failurelog"] =
        "Dokumen elektronik yang dibuat tidak ditandatangani secara digital.";
    translation["digitalsignature.pluginfailedmessage"] =
        "Penerapan plugin Tanda Tangan Digital mengembalikan status gagal.";
    translation["digitalsignature.plugininvalidresult"] =
        "Hasil yang dikembalikan dari penerapan plugin Tanda Tangan Digital tidak valid.";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "Penerapan Plugin Sumber Data Kustom Masuk";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "Pilih penerapan plugin sumber data kustom masuk.";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "Hasil penerapan plugin Sumber Data Kustom Masuk tidak valid.";
    translation["outboundvalidation.pluginimplementation"] =
        "Penerapan Plugin Validasi Keluar";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "Pilih penerapan plugin dokumen elektronik keluar. Ini akan memvalidasi dokumen elektronik keluar.";
    translation["outboundvalidation.successlog"] = "Validasi Keluar Berhasil.";
    translation["outboundvalidation.failurelog"] = "Validasi Keluar Gagal.";
    translation["outboundvalidation.pluginfailedmessage"] =
        "Penerapan plugin Validasi Keluar mengembalikan status gagal.";
    translation["outboundvalidation.plugininvalidresult"] =
        "Hasil dari penerapan plugin Validasi Keluar tidak valid.";
    translation["template.msg.cannotedittransactiontype"] =
        "Bidang Jenis Transaksi tidak aktif karena templat ini telah ditugaskan pada satu atau beberapa data transaksi. Untuk mengedit templat ini, hapus templat dari data transaksi tersebut untuk mengaktifkan bidang Jenis Transaksi lalu coba lagi. Anda juga dapat menugaskan templat ini pada dokumen elektronik masuk, yang berarti akan menonaktifkan bidang Jenis Transaksi.";
    translation["template.msg.forcetocopymessage"] =
        "Anda tidak dapat mengedit templat dokumen elektronik default. Anda dapat menyalinnya menggunakan opsi Buat Salinan dari Tindakan, atau membuat yang baru.";
    translation["template.msg.warningoneditmessage"] =
        "Ini adalah templat dokumen elektronik default. Perubahan apa pun yang dibuat pada templat ini akan hilang atau akan ditimpa saat SuiteApp diperbarui.";
    translation["email.batchownernotification.subject"] =
        "Pengiriman Dokumen Elektronik Selesai";
    translation["email.batchownernotification.body"] =
        "Hai, <br/><br/>Dokumen elektronik Anda telah terkirim.<br/>{SENT} dari {TOTAL} telah terkirim. Lihat file terlampir untuk detailnya. <br/><br/>Terima kasih,<br/>NetSuite";
    translation["email.batchownerconvertnotification.subject"] =
        "Konversi Dokumen Elektronik Selesai";
    translation["email.batchownerconvertnotification.body"] =
        "Hai, <br/><br/>Dokumen elektronik Anda telah dikonversi.<br/>{CONVERTED} dari {TOTAL} telah dikonversi. Lihat file terlampir untuk detailnya. <br/><br/>Terima kasih,<br/>NetSuite";
    translation["email.recipientnotification.po.subject"] =
        "Dokumen Elektronik yang Dibuat untuk No. PO {PONUM}";
    translation["email.recipientnotification.subject"] =
        "Dokumen elektronik dari {COMPANYNAME}";
    translation["email.recipientnotification.customizedsubject"] =
        "Dokumen Elektronik yang Dibuat untuk {TRANTYPE} #{TRANID}. {SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "Salam! <br /><br />Dokumen elektronik untuk PO#{PONUM} telah dibuat.<br />Lihat file dokumen elektronik terlampir untuk detailnya.<br /><br />Terima kasih,<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "Salam! <br /><br />Dokumen elektronik untuk {TYPE} #{TRANID} telah dibuat.<br />Lihat file dokumen elektronik terlampir untuk detailnya.<br /><br />Terima kasih,<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "Terjadi kesalahan saat pembuatan dokumen elektronik";
    translation["email.generationerrornotification.body"] =
        "Terjadi kesalahan saat pembuatan dokumen elektronik.<br/>Lihat file terlampir untuk daftar transaksi dan detail kesalahan.";
    translation["email.sendingerrornotification.subject"] =
        "Terjadi kesalahan saat mengirim dokumen elektronik";
    translation["email.sendingerrornotification.body"] =
        "Terjadi kesalahan saat pengiriman dokumen elektronik.<br/>Lihat file terlampir untuk daftar transaksi dan detail kesalahan.";
    translation["email.webserviceerror.subject"] =
        "Notifikasi Layanan Web Dokumen Elektronik Masuk";
    translation["email.webserviceerror.body"] =
        "<p>Hai,</p><p>Terjadi kesalahan saat memproses dokumen elektronik masuk menggunakan layanan web.<br/>Lihat detail berikut ini.</p>{DETAIL_TABLE}<p>Terima kasih,<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "Nomor Transaksi";

    return translation;
});
