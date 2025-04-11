define([], function () {
    var translation = {};

    translation["email.attachment.collabel.details"] = "詳細";
    translation["email.attachment.collabel.transactiontype"] =
        "トランザクションの種類";
    translation["email.attachment.collabel.internalid"] = "内部ID";
    translation["email.attachment.collabel.vendor"] = "仕入先";
    translation["email.conversionerrornotification.subject"] =
        "インバウンド電子ドキュメントの変換中にエラーが発生しました";
    translation["email.conversionerrornotification.body"] =
        "インバウンド電子ドキュメントの変換中にエラーが発生しました。<br/>エラーとその詳細のレコードのリストについては、添付ファイルを参照してください。";
    translation["email.adminwarningmsg.body"] =
        "<br/><br/>注: アカウント管理者ではなく別のユーザーに通知を受信させる場合は、親の子会社レコードの「電子ドキュメント通知の受信者」フィールドにそのユーザーの電子メール・アドレスを入力します。";
    translation["email.table.collabel.inboundedocumentid"] =
        "インバウンド電子ドキュメントID";
    translation["email.table.collabel.details"] = "詳細";
    translation["email.nolicensenofreecountry.errornotification.subject"] =
        "アカウントのライセンス確認中にエラーが発生しました";
    translation["email.nolicensenofreecountry.errornotification.body"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。</br>電子ドキュメントを一括処理するには、会社情報ページで「電子ドキュメントを無料で使用できる国」を設定してください。";
    translation["inboundedocument.logforconversion"] =
        "インバウンド電子ドキュメントは変換の準備が完了しました。";
    translation["inboundedocument.logincomplete"] =
        "インバウンド電子ドキュメントは不完全です。{FIELD}が選択されていません。";
    translation["inboundedocument.deletenotallowed"] =
        "インバウンド電子ドキュメントの削除は許可されません。";
    translation["inboundedocument.copynotallowed"] =
        "インバウンド電子ドキュメントのコピーは許可されません。";
    translation["inboundedocument.contextunsupported"] =
        "インバウンド電子ドキュメントは、UIとSuiteScriptのコンテキストのみをサポートします。";
    translation["inboundedocument.invalidxmlfile"] =
        "選択したXMLファイル参照は有効なXMLファイルではありません。選択したファイルの拡張子が.xmlであることを確認してください。";
    translation["inboundedocument.invalidpdffile"] =
        "選択したPDFファイル参照は有効なPDFファイルではありません。選択したファイルの拡張子が.pdfであることを確認してください。";
    translation["inboundedocument.invalidxml"] =
        "選択したXMLファイル参照は整形式のXMLドキュメントではありません。";
    translation["inboundedocument.convert.button"] = "変換";
    translation["inboundedocument.convert.information"] =
        "このインバウンド電子ドキュメントの変換が進行中です。";
    translation["inboundedocument.convert.alreadyinprogress.information"] =
        "このインバウンド電子ドキュメントの変換がすでに進行中です。";
    translation["inboundedocument.cancel.button"] =
        "電子ドキュメントのキャンセル";
    translation["inboundedocument.cancel.confirmation"] =
        "このインバウンド電子ドキュメントをキャンセルしてもよろしいですか?";
    translation["inboundedocument.cancel.failed"] =
        "インバウンド電子ドキュメント・レコードのステータスが「{STATUS}」であるため、キャンセルに失敗しました";
    translation["inboundedocument.cancel.defaulterror"] =
        "キャンセル中にエラーが発生しました。詳細は、「電子ドキュメント」サブタブの「電子ドキュメント監査証跡」を確認してください。";
    translation["inboundedocument.cancel.complete"] =
        "電子ドキュメントがキャンセルされました。";
    translation["inboundedocument.preview.button"] = "XMLの表示";
    translation["inboundedocument.msg.nofreecountry"] =
        "このアカウントには、複数の国でElectronic Invoicing SuiteAppを使用するための有効なライセンスがありません。この電子ドキュメントをトランザクションに変換するには、アカウント管理者に連絡して、会社情報ページで「電子ドキュメントを無料で使用できる国」フィールドで国を指定してください。";
    translation["inboundedocument.msg.otherbillingcountry"] =
        "このアカウントには、複数の国でElectronic Invoicing SuiteAppを使用するための有効なライセンスがありません。この電子ドキュメントをトランザクションに変換するには、NetSuiteのアカウント・マネージャーに連絡してライセンスを購入してください。";
    translation["inboundedocument.msg.nobillingcountry"] =
        "このアカウントには、複数の国でElectronic Invoicing SuiteAppを使用するための有効なライセンスがありません。この電子ドキュメントをトランザクションに変換するには、選択した仕入先のデフォルトの請求先住所を設定してください。";
    translation["validationplugin.contextunsupported"] =
        "インバウンド電子ドキュメント検証プラグインは、UIとSuiteScriptのコンテキストのみをサポートします。";
    translation["validationplugin.pluginimplementation"] =
        "インバウンド電子ドキュメント検証プラグイン実装";
    translation["validationplugin.pluginimplementationhelp"] =
        "インバウンド電子ドキュメント検証プラグイン実装を選択";
    translation["validationplugin.scriptbannermessage"] =
        "インバウンド電子ドキュメント検証は、カスタム・プラグイン実装である必要があります。既存の検証スクリプトを「受信検証プラグイン」タイプの新しいカスタム・プラグイン実装として再作成してください。";
    translation["ei.conversion.defaulterror"] =
        "変換中にエラーが発生しました。詳細は、「電子ドキュメント」サブタブの「電子ドキュメント監査証跡」を確認してください。";
    translation["ei.conversion.inactivevendor"] =
        "選択した仕入先が無効であるため、このインバウンド電子ドキュメントを変換できません。「電子ドキュメント・ステータス」フィールドが更新されていないため、監査証跡が作成されませんでした。仕入先レコードの「無効」ボックスのチェックマークを外し、電子ドキュメントを再変換してみてください。";
    translation["ei.conversion.inactivecustomer"] =
        "選択した顧客が無効であるため、このインバウンド電子ドキュメントを変換できません。「電子ドキュメント・ステータス」フィールドが更新されていないため、監査証跡が作成されませんでした。顧客レコードの「無効」ボックスのチェックマークを外し、電子ドキュメントを再変換してみてください。";
    translation["ei.conversion.conversioncomplete"] =
        "電子ドキュメントが変換されました。";
    translation["ei.conversion.conversionlogbulk"] =
        "インバウンド電子ドキュメントは一括変換に含まれ、次の内部IDを持つトランザクションに変換されました。{INTERNALID}タイプ: 「{TYPE}」";
    translation["ei.conversion.conversionlog"] =
        "インバウンド電子ドキュメントは、次の内部IDを持つトランザクションに変換されました。{INTERNALID}タイプ: 「{TYPE}」";
    translation["ei.conversion.failedconversionlogbulk"] =
        "一括変換プロセス\n使用された電子ドキュメント・テンプレート: {TEMPLATENAME}\nエラーの範囲: {ERRORSCOPE}\nエラー詳細: {ERROR}";
    translation["ei.conversion.failedconversionlog"] =
        "使用された電子ドキュメント・テンプレート: {TEMPLATENAME}\nエラーの範囲: {ERRORSCOPE}\nエラー詳細: {ERROR}";
    translation["ei.conversion.failedconversionlog.parsefailed"] =
        "解析に失敗しました。インバウンド電子ドキュメントのフィールド・マッピングを確認してください。";
    translation["ei.conversion.failedconversionlog.convertfailed"] =
        "変換に失敗しました。";
    translation["ei.conversion.failedconversionlog.validationfailed"] =
        "検証に失敗しました。";
    translation["ei.conversion.failedconversionlog.statusfailed"] =
        "インバウンド電子ドキュメント・レコードのステータスが「{STATUS}」であるため、変換に失敗しました";
    translation["ei.conversion.inactivecustomer.converter"] =
        "無効な顧客を含むインバウンド電子ドキュメントでは、変換がサポートされていません。";
    translation["ei.conversion.inactivevendor.converter"] =
        "無効な仕入先を含むインバウンド電子ドキュメントでは、変換がサポートされていません。";
    translation["ei.conversion.multivendor.itemnotfound"] =
        "次の仕入先コード: {ITEMLIST}は、どのアイテム・レコードにも関連付けられていません。";
    translation["ei.conversion.nonmultivendor.itemnotfound"] =
        "次の仕入先名/コード: {ITEMLIST}は、どのアイテム・レコードにも関連付けられていません。";
    translation["ei.conversion.multivendor.multipleitemmatched"] =
        "次の仕入先コード: {ITEMLIST}は、複数のアイテム・レコードに関連付けられています。アイテム・レコードを修正し、仕入先コードがアイテムごと、仕入先ごとに一意であることを確認してください。";
    translation["ei.conversion.nonmultivendor.multipleitemmatched"] =
        "次の仕入先名/コード: {ITEMLIST}は、複数のアイテム・レコードに関連付けられています。アイテム・レコードを修正し、仕入先名/コードがアイテムごと、仕入先ごとに一意であることを確認してください。";
    translation["ei.conversion.refnumnotfound"] =
        "インバウンド電子ドキュメントに必要な参照番号がありません。この電子ドキュメントをキャンセルし、tranidフィールドにマップされている参照番号のXML要素を含む別の電子ドキュメントを送信してください。";
    translation["ei.conversion.refnumexists"] =
        "同じ参照番号の支払請求書がすでに存在しています。この電子ドキュメントをキャンセルし、tranidフィールドにマップされているXML要素の正しい参照番号の値を含む別の電子ドキュメントを送信してください。";
    translation["ei.conversion.vendorcodenotfound"] =
        "電子ドキュメント・テンプレートにvendorcodeフィールドがありません。電子ドキュメント・テンプレートを修正するか、vendorcodeフィールド・マッピングを含む別のテンプレートを選択してください。";
    translation["ei.conversion.novendorcodevalue"] =
        "1つ以上のアイテムに仕入先コードがありません。この電子ドキュメントをキャンセルし、仕入先コード・フィールドにマップされているXML要素の正しい値を含む別の電子ドキュメントを送信してください。";
    translation["ei.conversion.vendornamenotfound"] =
        "電子ドキュメント・テンプレートにvendornameフィールドがありません。電子ドキュメント・テンプレートを修正するか、vendornameフィールド・マッピングを含む別のテンプレートを選択してください。";
    translation["ei.conversion.novendornamevalue"] =
        "1つ以上のアイテムに仕入先名/コードがありません。この電子ドキュメントをキャンセルし、仕入先名/コード・フィールドにマップされているXML要素の正しい値を含む別の電子ドキュメントを送信してください。";
    translation["ei.conversion.sourcetransnotfound"] =
        "レコード({TRANSTYPE}#{TRANSID})がシステムに見つかりませんでした。この電子ドキュメントをキャンセルし、createdfromフィールドにマップされているXML要素の正しい値を含む別の電子ドキュメントを送信してください。";
    translation["ei.conversion.sourcetransentitynotmatch"] =
        "レコード({TRANSTYPE}#{TRANSID})が別のエンティティに割り当てられています。正しいエンティティを選択し、この電子ドキュメントを変換してください。";
    translation["ei.conversion.novendorexpenseaccount"] =
        "仕入先には、経費を伴う請求書の変換に必要なデフォルトの費用勘定がありません。変換手続きを進めるには、仕入先レコードの「デフォルト費用勘定」フィールドに値を設定します。";
    translation["ei.conversion.nolinktopo"] =
        "インバウンド電子ドキュメントには、参照された発注書に記載されているアイテムや経費はありません。参照された発注書を変換できるかどうか、そのステータスを確認してください。変換できる場合は、この電子ドキュメントをキャンセルし、createdfromフィールドにマップされているXML要素の正しい値を含む別の電子ドキュメントを送信してください。";
    translation["inbound.formtitle"] = "インバウンド電子ドキュメントを変換";
    translation["inbound.search"] = "検索";
    translation["inbound.convert"] = "変換";
    translation["inbound.return"] = "条件に戻る";
    translation["inbound.vendor"] = "仕入先";
    translation["inbound.datefrom"] = "作成開始日";
    translation["inbound.dateto"] = "作成終了日";
    translation["inbound.vendorhelp"] =
        "仕入先を選択します。その仕入先の失敗したインバウンド電子ドキュメントが検索結果に含まれます。";
    translation["inbound.datefromhelp"] =
        "開始日を選択して、期間を定義します。その期間内に作成された失敗したインバウンド電子ドキュメントが検索結果に含まれます。";
    translation["inbound.datetohelp"] =
        "終了日を選択して、期間を定義します。その期間内に作成された失敗したインバウンド電子ドキュメントが検索結果に含まれます。";
    translation["inbound.inboundedocfieldgroup"] =
        "失敗したインバウンド電子ドキュメントの検索フィルター";
    translation["inbound.sublist.sublistname"] =
        "失敗したインバウンド電子ドキュメントの検索結果";
    translation["inbound.sublist.internalid"] = "内部ID";
    translation["inbound.sublist.vendor"] = "仕入先";
    translation["inbound.sublist.refnum"] = "参照番号";
    translation["inbound.sublist.ponum"] = "発注書番号";
    translation["inbound.sublist.datecreated"] = "作成日";
    translation["inbound.sublist.edoctemplate"] =
        "電子ドキュメント・テンプレート";
    translation["inbound.msg.conversionongoing"] =
        "電子ドキュメントは現在変換中です。処理が完了すると、電子メールが届きます";
    translation["inbound.msg.batchalreadyinprogress.si"] =
        "日付範囲({DATECREATED_FROM} - {DATECREATED_TO})のインバウンド電子ドキュメントの変換がすでに進行中であるため、選択した条件で検索を実行できません。検索条件を変更するか、この電子ドキュメントの変換後に再試行してください。";
    translation["inbound.invaliddates"] =
        "「作成開始日」は「作成終了日」よりも後にできません。「作成開始日」が「作成終了日」よりも前になるように日付を変更してください。";
    translation["inbound.configurefreecountry"] =
        "このアカウントには、複数の国でElectronic Invoicing SuiteAppを使用するための有効なライセンスがありません。電子ドキュメントを一括変換するには、アカウント管理者に連絡して、会社情報ページで「電子ドキュメントを無料で使用できる国」を設定してください。";
    translation["portlet.title"] = "電子ドキュメント";
    translation["portlet.outboundforgeneration"] =
        "生成用のアウトバウンド電子ドキュメント";
    translation["portlet.outboundforsending"] =
        "送信用のアウトバウンド電子ドキュメント";
    translation["portlet.outboundwitherrors"] =
        "エラーのあるアウトバウンド電子ドキュメント";
    translation["portlet.outboundsendinglink"] =
        "送信失敗したアウトバウンド電子ドキュメント";
    translation["portlet.inboundforconversion"] =
        "変換用のインバウンド電子ドキュメント";
    translation["portlet.inboundconvertfailed"] =
        "失敗したインバウンド電子ドキュメントを変換";
    translation["portlet.inboundincomplete"] =
        "不完全なインバウンド電子ドキュメント";
    translation["portlet.inbounduploadlink"] =
        "インバウンド電子ドキュメントをアップロード";
    translation["portlet.outboundforcertification"] =
        "証明用のアウトバウンド電子ドキュメント";
    translation["portlet.outboundcertifiedforsending"] =
        "送信用のアウトバウンド電子ドキュメント";
    translation["inbound.webservice.response.success"] =
        "IDが{ID}のインバウンド電子ドキュメントは正常に作成されました。";
    translation["inbound.webservice.response.novendor"] =
        "WebサービスID: {IDENTIFIER}に関連付けられている仕入先はありません。使用したWebサービスIDが正しいことを確認してください。";
    translation["inbound.webservice.response.multiplevendor"] =
        "IDが{ID}のインバウンド電子ドキュメントは正常に作成されました。ただし、複数の仕入先がWebサービスID{IDENTIFIER}に関連付けられています。";
    translation["inbound.webservice.error.templateerror"] =
        "正しいテンプレートを確定できないため、インバウンド電子ドキュメントは不完全です。インバウンド電子ドキュメント・レコードでテンプレートを選択するか、電子ドキュメント・テンプレート・レコードにXSDを設定してテンプレートを自動選択できるようにします。";
    translation["inbound.webservice.error.multiplevendorerror"] =
        "正しい仕入先を確定できないため、インバウンド電子ドキュメントは不完全です。インバウンド電子ドキュメント・レコードで仕入先を選択するか、関連付けられている仕入先レコードでWebサービスIDを設定します。";
    translation["inbound.webservice.error.missingkeyerror"] =
        "Webサービス・リクエストに必要な{KEYS}キーが入力されていません。";
    translation["inbound.webservice.error.invalidparamerror"] =
        "Webサービス・リクエストの本文は、JSONオブジェクトかJSONオブジェクトの配列(Content-Type: 'application/json'を使用)である必要があります。";
    translation["transaction.contactnoemail"] =
        "次の電子ドキュメントの受信者は、連絡先レコードに電子メール・アドレスがありません: {CONTACTNAMES}。";
    translation["transaction.norecipients"] =
        "このトランザクションには電子ドキュメントの受信者がいません。電子ドキュメントを送信するには、1つ以上の連絡先を電子ドキュメント受信者のリストに追加する必要があります。";
    translation["transaction.maxrecipientexceeded"] =
        "電子メール受信者の最大数を超えました。電子メール受信者は最大10人まで追加できます。";
    translation["bulkgeneration.onlycusttxnsprocessed"] =
        "次のトランザクション・タイプのみが処理されます:";
    translation["ei.prefs.formtitle"] = "電子ドキュメント・プリファレンス";
    translation["ei.prefs.information.about.certify.skip"] =
        "証明の送信方法が定義されていないかトランザクションに対して適切でない場合、証明ステップはスキップされます。";
    translation["ei.prefs.label.sublist.automati.ei"] = "自動電子請求書作成";
    translation["ei.prefs.label.automatic.type.selected"] =
        "電子ドキュメント自動化タイプ";
    translation["ei.prefs.text.option.comb.disabled"] = "無効";
    translation["ei.prefs.text.option.comb.gcs"] = "生成, 証明, 送信";
    translation["ei.prefs.text.option.comb.gc"] = "生成, 証明";
    translation["ei.prefs.text.option.comb.cs"] = "証明, 送信";
    translation["ei.prefs.btn.label.cancel"] = "キャンセル";
    translation["ei.prefs.btn.label.save"] = "保存";
    translation["ei.prefs.msg.confirm.save"] =
        "電子ドキュメント・プリファレンスへの変更を保存しますか?";
    translation["ei.prefs.msg.success.save"] =
        "電子ドキュメント・プリファレンスが正常に保存されました。";
    translation["ei.prefs.msg.failed.save"] =
        "電子ドキュメント・プリファレンスの保存に失敗しました。";
    translation["ei.prefs.insufficient.permission.details"] =
        "このページへのアクセス権限は制限されています。アクセスをリクエストするには管理者に連絡してください。";
    translation["ei.eip.msg.completed"] =
        "電子ドキュメントの処理が完了しました。";
    translation["ei.eip.msg.failed"] =
        "電子ドキュメントの処理に失敗しました。詳細は、「電子ドキュメント監査証跡」を参照してください。";
    translation["ei.eip.msg.processing"] = "電子ドキュメントは処理中です。";
    translation["ei.eip.msg.processing.alreadyinprogress"] =
        "電子ドキュメントはすでに処理中です。";
    translation["license.notinstalled"] =
        "このアカウントでは、NetSuite SuiteAppライセンス・クライアントを使用できません。Electronic Invoicingのすべての機能にアクセスするには、このSuiteAppをインストールしてください。";
    translation["outbound.formtitle"] = "送信失敗した電子ドキュメント";
    translation["outbound.search"] = "検索";
    translation["outbound.send"] = "送信";
    translation["outbound.return"] = "条件に戻る";
    translation["outbound.customer"] = "顧客";
    translation["outbound.vendor"] = "仕入先";
    translation["outbound.subsidiary"] = "子会社";
    translation["outbound.type"] = "トランザクションの種類";
    translation["outbound.datefrom"] = "トランザクション開始日";
    translation["outbound.dateto"] = "トランザクション終了日";
    translation["outbound.subshelp"] =
        "子会社を選択すると、その子会社に属するトランザクションのみが表示されます。";
    translation["outbound.custhelp"] =
        "顧客を選択すると、その顧客に属するトランザクションのみが表示されます。顧客を選択しない場合、検索結果には、顧客に関係なく子会社に属するすべてのトランザクションが表示されます。";
    translation["outbound.vendorhelp"] =
        "仕入先を選択すると、その仕入先に属するトランザクションのみが表示されます。仕入先を選択しない場合、検索結果には、仕入先に関係なく子会社に属するすべてのトランザクションが表示されます。";
    translation["outbound.entitytypehelp"] =
        "顧客または仕入先のエンティティの種類を選択します。これにより、以下の対応するドロップダウン・リストが有効になります。";
    translation["outbound.typehelp"] =
        "送信する電子ドキュメントごとに1つ以上のトランザクションの種類を選択します。トランザクションの種類を複数選択するには、Ctrlキーを押したまま各トランザクションの種類を選択します。<br /><br />トランザクションの種類を選択しない場合、検索結果には、トランザクションの種類に関係なく送信準備が完了したすべての電子ドキュメントが表示されます。";
    translation["outbound.datefromhelp"] =
        "特定の日付範囲内に作成されたトランザクションのリストを表示するには、日付を選択して日付範囲の開始日を定義します。";
    translation["outbound.datetohelp"] =
        "特定の日付範囲内に作成されたトランザクションのリストを表示するには、日付を選択して日付範囲の終了日を定義します。";
    translation["outbound.entityfieldgroup"] = "エンティティ検索フィルター";
    translation["outbound.filtersfieldgroup"] =
        "トランザクション検索フィルター";
    translation["outbound.entitytypeinlinehelp"] = "エンティティの種類を選択:";
    translation["outbound.invalidtypetitle"] = "無効なトランザクションの種類";
    translation["outbound.invalidtype"] =
        "次のトランザクションの種類は現在サポートされていません: {TRANSACTIONTYPES}";
    translation["outbound.invalidentitytransaction"] =
        "選択したエンティティに対して、次のトランザクションの種類は有効ではありません: {TRANSACTIONTYPES}。選択したエンティティに適したトランザクションの種類を選択します。";
    translation["outbound.invaliddates"] =
        "「トランザクション開始日」は「トランザクション終了日」よりも後にできません。「トランザクション開始日」が「トランザクション終了日」よりも前になるように日付を変更してください。";
    translation["outbound.msg.batchalreadyinprogress.ow"] =
        "子会社({SUBSIDIARY})の日付範囲({TRANDATE_FROM} - {TRANDATE_TO})内のトランザクションについて電子ドキュメントの送信がすでに進行中であるため、選択した条件で検索を実行できません。検索条件を変更するか、この電子ドキュメントの送信後に再試行してください。";
    translation["outbound.msg.batchalreadyinprogress.si"] =
        "日付範囲({TRANDATE_FROM} - {TRANDATE_TO})内のトランザクションについて電子ドキュメントの送信がすでに進行中であるため、選択した条件で検索を実行できません。検索条件を変更するか、この電子ドキュメントの送信後に再試行してください。";
    translation["outbound.sublist.trannum"] = "トランザクション番号";
    translation["outbound.sublist.trantype"] = "トランザクションの種類";
    translation["outbound.sublist.customer"] = "顧客";
    translation["outbound.sublist.vendor"] = "仕入先";
    translation["outbound.sublist.subsidiary"] = "子会社";
    translation["outbound.sublist.trandate"] = "トランザクション日付";
    translation["outbound.sublist.memo"] = "メモ";
    translation["outbound.sublist.template"] = "テンプレート";
    translation["outbound.sublist.sendingmethod"] = "送信方法";
    translation["outbound.sublist.sublistname"] =
        "失敗したアウトバウンド電子ドキュメントの結果";
    translation["outbound.msg.sendingongoing"] =
        "電子ドキュメントは現在送信中です。処理が完了すると、電子メールが届きます";
    translation["outbound.configurefreecountry"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。電子ドキュメントを一括送信するには、アカウント管理者に連絡して、会社情報ページで「電子ドキュメントを無料で使用できる国」を設定してください。";
    translation["outbound.entitysend"] = "エンティティに送信";
    translation["outbound.certifysend"] = "証明用に送信";
    translation["outbound.sendingtypehelp"] =
        "「エンティティに送信」または「証明用に送信」を選択します。送信時に対応するトランザクションが一覧表示されます。";
    translation["customer.noemail"] =
        "この顧客の電子メール・アドレスがありません。電子メールによる電子ドキュメント送信を有効にするには、顧客レコードに有効な電子メール・アドレスを入力します。";
    translation["customer.contactnoemail"] =
        "次の電子ドキュメントの受信者は、連絡先レコードに電子メール・アドレスがありません: {CONTACTNAMES}。";
    translation["customer.norecipients"] =
        "この顧客には電子ドキュメントの受信者がいません。この顧客に電子ドキュメントを送信するには、1つ以上の連絡先を電子ドキュメント受信者のリストに追加する必要があります。";
    translation["customer.arrayrequired"] =
        "検証のために連絡先配列が必要です。";
    translation["customer.parameternotarray"] =
        "連絡先パラメーターが配列ではありません。";
    translation["customer.maxrecipientexceeded"] =
        "電子メール受信者の最大数を超えました。最大10人の電子メール受信者を選択してください。";
    translation["vendor.noemail"] =
        "この仕入先の電子メール・アドレスがありません。電子メールによる電子ドキュメント送信を有効にするには、仕入先レコードに有効な電子メール・アドレスを入力します。";
    translation["vendor.contactnoemail"] =
        "次の電子ドキュメントの受信者は、連絡先レコードに電子メール・アドレスがありません: {CONTACTNAMES}。";
    translation["vendor.norecipients"] =
        "この仕入先には電子ドキュメントの受信者がいません。この仕入先に電子ドキュメントを送信するには、1つ以上の連絡先を電子ドキュメント受信者のリストに追加する必要があります。";
    translation["vendor.maxrecipientexceeded"] =
        "電子メール受信者の最大数を超えました。最大10人の電子メール受信者を選択してください。";
    translation["vendor.nosenders"] =
        "この仕入先には電子ドキュメントの電子メール送信者がいません。この仕入先から電子メールで電子ドキュメントを受信するには、1つ以上の電子メール・アドレスを「仕入先電子ドキュメントの電子メール送信者」リストに入力する必要があります。";
    translation["vendor.existingsender"] =
        "送信者の電子メール・アドレスはすでに存在します。";
    translation["vendor.existingdomain"] =
        "送信者の電子メール・ドメインは別の仕入先によってすでに使用されています。";
    translation["vendor.existingidentifier"] =
        "WebサービスIDは別の仕入先によってすでに使用されています。別のWebサービスIDを入力してください。";
    translation["customeremailrecipient.contextunsupported"] =
        "顧客の電子ドキュメントの電子メール受信者は、以下のコンテキストのみをサポートします: UI、CSV、SuiteScript、Webサービス。";
    translation["vendoremailrecipient.contextunsupported"] =
        "仕入先の電子ドキュメントの電子メール受信者は、以下のコンテキストのみをサポートします: UI、CSV、SuiteScript、Webサービス。";
    translation["vendoremailsender.contextunsupported"] =
        "仕入先の電子ドキュメントの電子メール送信者は、以下のコンテキストのみをサポートします: UI、CSV、SuiteScript、Webサービス。";
    translation["template.incorrectregex"] =
        "REGEXフィールドに正しくない正規表現が含まれています。適切な構文を使用する必要があります。";
    translation["template.invalidjson"] =
        "「アウトバウンド電子ドキュメント用テンプレート」フィールドに整形式のJSONを指定できませんでした。続行するには「OK」をクリックし、現在のページに留まるには「キャンセル」をクリックしてください。";
    translation["template.invalidxml"] =
        "XMLテンプレートにエラーが含まれています。XMLフォーマットは整形式でなければなりません。";
    translation["template.templaterequired"] =
        "選択したアウトバウンド・トランザクションの種類用テンプレートの内容がありません。「アウトバウンド電子ドキュメント」フィールドに有効なXMLまたはJSONテンプレートの内容を指定して再試行してください。";
    translation["template.mappingrequired"] =
        "受信トランザクションの種類が選択されましたが、フィールド・マッピングのJSONコンテンツがありません。「インバウンド電子ドキュメントのフィールド・マッピング」フィールドにJSONコンテンツを入力してください。";
    translation["template.templateorjsonrequired"] =
        "フィールドの値がありません。アウトバウンド・トランザクションの場合は、「アウトバウンド電子ドキュメント用テンプレート」フィールドに有効なXMLまたはJSONコンテンツを指定してください。受信トランザクションの場合は、「インバウンド電子ドキュメントのフィールド・マッピング」フィールドにJSONコンテンツを指定してください。";
    translation["template.invalidxsdfile"] =
        "選択したXSDファイルは有効なXSDファイルではありません。選択したファイルの拡張子が.xsdであることを確認してください。";
    translation["template.contextunsupported"] =
        "電子ドキュメント・テンプレートは、UIとSuiteScriptのコンテキストのみをサポートします。";
    translation["template.supportedtranstypefldhelp"] =
        "このテンプレートでサポートされる1つ以上のトランザクションの種類を選択します。トランザクションの種類を複数選択するには、Ctrlキーを押したままトランザクションの種類を選択します。<br /><br />トランザクションの種類を選択できない場合、テンプレートはすでに同じトランザクションの種類の1つ以上のトランザクション・レコードに割り当てられています。トランザクションの種類の選択を有効にするには、トランザクション・レコードからテンプレートを削除します。<br /><br />このテンプレートはインバウンド電子ドキュメントにも割り当てることができます。これにより、「トランザクションの種類」フィールドが無効になります。";
    translation["template.eistatus"] =
        "電子ドキュメント・ステータスによるトランザクションの編集制限";
    translation["template.supportedeistatusfieldhelp"] =
        "選択した電子ドキュメント・ステータスのトランザクションは、このテンプレートが関連付けられている場合は編集できません。複数の電子ドキュメント・ステータスを選択できます。";
    translation["template.invalidschemaordependency"] =
        "スキーマがXSDに誤って構成されているか、依存スキーマが見つかりません。";
    translation["template.xmldoesnotconformtoschema"] =
        "テンプレートのXMLが、提供されたXSDまたはスキーマに準拠していません。";
    translation["template.xmldomexception"] =
        "入力XML文字列の形式が誤っています。";
    translation["template.missingreqdargument"] =
        "アウトバウンド検証のXSDがありません。";
    translation["template.xsdvalidationexception"] =
        "XSDの検証中に不明な例外が発生しました。";
    translation["template.xsdmissingdependencyfolder"] =
        "XSDスキーマ・フォルダーが無効であるか、見つかりません。";
    translation["invoice.generatebtn"] = "電子ドキュメントの生成";
    translation["invoice.sendbtn"] = "電子ドキュメントの送信";
    translation["invoice.sendcertifybtn"] = "電子ドキュメントを証明";
    translation["invoice.eipbtn"] = "電子ドキュメントの処理";
    translation["invoice.loguntagged"] =
        "電子ドキュメント・テンプレートが削除されました。電子ドキュメント生成用のタグをトランザクションから削除しました。";
    translation["invoice.logforgenerate"] =
        "トランザクションは電子ドキュメント生成の準備が完了しました。";
    translation["invoice.invalidtemplatesub"] =
        "トランザクションの子会社は、選択した電子ドキュメント・テンプレートで有効ではありません。別の電子ドキュメント・テンプレートを選択してください。";
    translation["invoice.templateremovalerror"] =
        "送信済み電子ドキュメントの電子ドキュメント・テンプレートの削除は許可されません。";
    translation["ei.sending.currentlysending"] =
        "電子ドキュメントは現在送信中です。完了するまで数分かかる場合があります。「電子ドキュメントの送信」ボタンをもう一度クリックして、処理を中断してはなりません。電子ドキュメントが送信されると、ページが再ロードされます。";
    translation["ei.sending.notready"] =
        "この電子ドキュメントは送信の準備が完了していません。最初に「電子ドキュメントの生成」をクリックして電子ドキュメントを生成する必要があります。";
    translation["ei.sending.alreadysent"] =
        "このトランザクションはすでに送信されました。";
    translation["ei.sending.norecipients"] =
        "顧客に電子ドキュメントの受信者がいないため、電子ドキュメントは送信できません。この電子ドキュメントを電子メールで送信する前に、最初に電子ドキュメントの受信者を顧客レコードで選択する必要があります。";
    translation["ei.sending.indivcustnoemail"] =
        "顧客に電子メール・アドレスがないため、この電子ドキュメントを送信できません。この電子ドキュメントを電子メールで送信する前に、電子メール・アドレスを顧客レコードに入力する必要があります。";
    translation["ei.sending.norecipients.vendor"] =
        "仕入先に電子ドキュメントの受信者がいないため、電子ドキュメントは送信できません。この電子ドキュメントを電子メールで送信する前に、最初に電子ドキュメントの受信者を仕入先レコードで選択する必要があります。";
    translation["ei.sending.indivvendnoemail"] =
        "仕入先に電子メール・アドレスがないため、この電子ドキュメントを送信できません。この電子ドキュメントを電子メールで送信する前に、電子メール・アドレスを仕入先レコードに入力する必要があります。";
    translation["ei.sending.invalidmethod"] =
        "{TYPE} #{INVOICENUMBER}に有効な送信方法を選択します。";
    translation["ei.sending.sentdetails"] =
        "送信者: {SENDER}\n受信者: {RECIPIENTS}";
    translation["ei.sending.sendernoemail"] =
        "電子ドキュメントの送信者({EMPLOYEENAME})に電子メール・アドレスがありません。従業員レコードに有効な電子メール・アドレスを入力してください。";
    translation["ei.sending.recipientnoemail"] =
        "このトランザクションに関連付けられている電子ドキュメントの1人以上の受信者に電子メール・アドレスがありません。この顧客の受信者に有効な電子メール・アドレスがあることを確認してください。";
    translation["ei.sending.recipientnoemail.vendor"] =
        "このトランザクションに関連付けられている電子ドキュメントの1人以上の受信者に電子メール・アドレスがありません。この仕入先の受信者に有効な電子メール・アドレスがあることを確認してください。";
    translation["ei.sending.defaulterror"] =
        "電子ドキュメントの送信中にエラーが発生しました。詳細は、「電子ドキュメント」サブタブの「電子ドキュメント監査証跡」を確認してください。";
    translation["ei.sending.inactivecustomer"] =
        "選択した顧客が無効なため、このトランザクションの電子ドキュメントを送信できません。「電子ドキュメント・ステータス」フィールドが更新されていないため、監査証跡が作成されませんでした。顧客レコードの「無効」ボックスのチェックマークを外し、電子ドキュメントを再送信してみてください。";
    translation["ei.sending.inactivevendor"] =
        "選択した仕入先が無効なため、このトランザクションの電子ドキュメントを送信できません。「電子ドキュメント・ステータス」フィールドが更新されていないため、監査証跡が作成されませんでした。仕入先レコードの「無効」ボックスのチェックマークを外し、電子ドキュメントを再送信してみてください。";
    translation["ei.sending.msg.processcomplete"] =
        "電子ドキュメントが送信されました。";
    translation["ei.sending.configurefreecountry"] =
        "複数の国でElectronic Invoicingを使用するには、アカウントに有効なライセンスが必要です。電子ドキュメントを1つの国に一括送信するには、会社情報ページで「電子ドキュメントを無料で使用できる国」フィールドからその国を選択する必要があります。";
    translation["ei.sending.inactivecustomer.manager"] =
        "無効な顧客とのトランザクションは、電子ドキュメントでサポートされていません。";
    translation["ei.sending.inactivevendor.manager"] =
        "無効な仕入先とのトランザクションは、電子ドキュメントでサポートされていません。";
    translation["ei.sending.certification.defaulterror"] =
        "電子ドキュメントの証明中にエラーが発生しました。詳細は、「電子ドキュメント」サブタブの「電子ドキュメント監査証跡」を確認してください。";
    translation["ei.sending.certification.msg.processcomplete"] =
        "電子ドキュメントは証明用に送信されました。";
    translation["ei.generation.generationlogbulk"] =
        "電子ドキュメントは、電子ドキュメント・テンプレート「{TEMPLATENAME}」を使用して一括生成されました。";
    translation["ei.generation.generationlog"] =
        "電子ドキュメントは、電子ドキュメント・テンプレート「{TEMPLATENAME}」を使用して生成されました。";
    translation["ei.generation.generationwithpdflogbulk"] =
        "電子ドキュメントとPDFファイルは、電子ドキュメント・テンプレート「{TEMPLATENAME}」を使用して一括生成されました。";
    translation["ei.generation.generationwithpdflog"] =
        "電子ドキュメントとPDFファイルは、電子ドキュメント・テンプレート「{TEMPLATENAME}」を使用して生成されました。";
    translation["ei.generation.generationremovedpdflogbulk"] =
        "電子ドキュメントは、電子ドキュメント・テンプレート「{TEMPLATENAME}」を使用して一括生成されました。過去に生成されたこのトランザクションのPDFファイルは削除されました。";
    translation["ei.generation.generationremovedpdflog"] =
        "電子ドキュメントは、電子ドキュメント・テンプレート「{TEMPLATENAME}」を使用して生成されました。過去に生成されたこのトランザクションのPDFファイルは削除されました。";
    translation["ei.generation.failedgenerationlogbulk"] =
        "一括生成プロセス\n使用された電子ドキュメント・テンプレート: {TEMPLATENAME}\nエラー詳細: {ERROR}";
    translation["ei.generation.failedgenerationlog"] =
        "使用された電子ドキュメント・テンプレート: {TEMPLATENAME}\nエラー詳細: {ERROR}";
    translation["ei.generation.defaulterror"] =
        "生成中にエラーが発生しました。詳細は、「電子ドキュメント」サブタブの「電子ドキュメント監査証跡」を確認してください。";
    translation["ei.generation.inactivecustomer"] =
        "選択した顧客が無効なため、このトランザクションの電子ドキュメントを生成できません。「電子ドキュメント・ステータス」フィールドが更新されていないため、監査証跡が作成されませんでした。顧客レコードの「無効」ボックスのチェックマークを外し、電子ドキュメントを再生成してみてください。";
    translation["ei.generation.inactivevendor"] =
        "選択した仕入先が無効なため、このトランザクションの電子ドキュメントを生成できません。「電子ドキュメント・ステータス」フィールドが更新されていないため、監査証跡が作成されませんでした。仕入先レコードの「無効」ボックスのチェックマークを外し、電子ドキュメントを再生成してみてください。";
    translation["ei.generation.msg.processcomplete"] =
        "電子ドキュメントが生成されました。";
    translation["ei.generation.configurefreecountry"] =
        "複数の国でElectronic Invoicingを使用するには、アカウントに有効なライセンスが必要です。電子ドキュメントを1つの国に一括生成するには、会社情報ページで「電子ドキュメントを無料で使用できる国」フィールドからその国を選択する必要があります。";
    translation["ei.generation.inactivecustomer.generator"] =
        "無効な顧客とのトランザクションは、電子ドキュメントでサポートされていません。";
    translation["ei.generation.inactivevendor.generator"] =
        "無効な仕入先とのトランザクションは、電子ドキュメントでサポートされていません。";
    translation["ei.generation.msg.completedwithdigitalsignature"] =
        "電子ドキュメントの生成とデジタル署名が正常に完了しました。";
    translation["ei.generation.msg.failedgenerationfinalmalformed"] =
        "結果の電子ドキュメントが整形式のXMLまたは整形式のJSONのいずれでもないため、生成に失敗しました。";
    translation["notify.batchownersubject"] =
        "電子ドキュメントの送信が完了しました";
    translation["notify.batchownerbody"] =
        "こんにちは、<br/><br/>電子ドキュメントの送信リクエストが完了しました。<br/>{SENT}/{TOTAL}件が送信されました。詳細は添付ファイルを参照してください。<br/><br/>ご利用ありがとうございました。<br/>Netsuite";
    translation["notify.recipientposubj"] =
        "PO #{PONUM}の電子ドキュメントが生成されました";
    translation["notify.recipientcompsubj"] =
        "{COMPANYNAME}から電子ドキュメントが生成されました";
    translation["notify.recipientbody"] =
        "こんにちは!<br /><br />{MESSAGE}<br />電子ドキュメント・ファイルについては添付ファイルを参照してください。<br /><br />ご利用ありがとうございました。<br />{COMPANYNAME}";
    translation["notify.generationerrorsubj"] =
        "電子ドキュメントの生成中にエラーが発生しました。";
    translation["notify.generationerrorbody"] =
        "電子ドキュメントの生成中にエラーが発生しました。<br/>トランザクションとエラー詳細のリストについては、添付ファイルを参照してください。";
    translation["transaction.msg.alreadysentgenerationconfirm"] =
        "このトランザクションの電子ドキュメントはすでに送信されました。新しい電子ドキュメントを生成すると以前の電子ドキュメントが上書きされます。新しい電子ドキュメントを生成してもよろしいですか?";
    translation["transaction.msg.removetemplatealreadysent"] =
        "送信済み電子ドキュメントの電子ドキュメント・テンプレートの削除は許可されません。";
    translation["transaction.msg.generate.information"] =
        "この電子ドキュメントの生成が進行中です。";
    translation["transaction.msg.send.information"] =
        "この電子ドキュメントの送信が進行中です。";
    translation["transaction.msg.send.certify.information"] =
        "この電子ドキュメントの証明が進行中です。";
    translation["transaction.msg.generate.alreadyinprogress.information"] =
        "この電子ドキュメントの生成がすでに進行中です。";
    translation["transaction.msg.send.alreadyinprogress.information"] =
        "この電子ドキュメントの送信がすでに進行中です。";
    translation["transaction.msg.send.alreadyinprogress.certify.information"] =
        "この電子ドキュメントの証明がすでに進行中です。";
    translation["transaction.msg.uncheckpdf"] =
        "このトランザクションのPDFファイルは、前回の電子ドキュメント生成時に作成されました。このボックスのチェックマークを外すと、そのPDFファイルは次回の電子ドキュメント生成時に削除されます。";
    translation["transaction.msg.nofreecountry"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。このトランザクションの電子ドキュメントを生成するには、アカウント管理者に連絡して、会社情報ページで「電子ドキュメントを無料で使用できる国」フィールドで国を指定してください。";
    translation["transaction.msg.otherbillingcountry"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。このトランザクションの電子ドキュメントを生成するには、NetSuiteのアカウント・マネージャーに連絡してライセンスを購入してください。";
    translation["transaction.msg.nobillingcountry"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。このトランザクションの電子ドキュメントを生成するには、このトランザクションの請求先住所を明記してください。";
    translation["transaction.msg.noshippingcountry"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。このトランザクションの電子ドキュメントを生成するには、このトランザクションの配送先住所を明記してください。";
    translation["transaction.msg.nocustomercountry"] =
        "このアカウントには、複数の国でElectronic Invoicingを使用するための有効なライセンスがありません。このトランザクションの電子ドキュメントを生成するには、このトランザクションの顧客のデフォルトの請求先住所を明記してください。";
    translation["transaction.msg.blockededittransaction"] =
        "現在の電子ドキュメント・ステータスでは、トランザクションの編集がブロックされています。添付のEIテンプレートを参照してください。";
    translation["transaction.msg.xmltypechangedconfirm"] =
        "「コンテンツの種類」フィールドの値をXMLから別の種類に変更すると、XMLバリデータがすべて削除されます。コンテンツの種類を変更してもよろしいですか?";
    translation["transaction.msg.xmlvalidatorsonly"] =
        "追加できるのはXMLコンテンツ・タイプのみです。";
    translation["transaction.msg.xmlvalidatorexists"] =
        "このバリデータはすでにリストにあります。";
    translation["transaction.msg.xmlvalidatorcontextunsupported"] =
        "電子ドキュメント・テンプレート・バリデータは、UIとSuiteScriptのコンテキストのみをサポートします。";
    translation["standarddocument.default.alreadyexist"] =
        "{DEFAULT_DOCUMENT_STANDARD}レコードはすでに存在します。同じ名前のドキュメント・パッケージ・レコードは作成できません。ドキュメント・パッケージ・レコードの名前を変更して再試行してください。";
    translation["standarddocument.default.editnotallowed"] =
        "{DEFAULT_DOCUMENT_STANDARD}レコードの名前または説明の編集は許可されません。";
    translation["standarddocument.default.deletenotallowed"] =
        "{DEFAULT_DOCUMENT_STANDARD}レコードの削除は許可されません。";
    translation["standarddocument.contextunsupported"] =
        "電子ドキュメント・パッケージは、UI、CSVインポート、SuiteScriptのコンテキストのみをサポートします。";
    translation["sendingmethod.default.alreadyexist"] =
        "{DEFAULT_SENDING_METHOD_NAME}送信方法レコードはすでに存在します。同じ名前の送信方法レコードは作成できません。送信方法レコードの名前を変更して再試行してください。";
    translation["sendingmethod.default.editnotallowed"] =
        "{DEFAULT_SENDING_METHOD_NAME}送信方法レコードの編集は許可されません。";
    translation["sendingmethod.default.deletenotallowed"] =
        "{DEFAULT_SENDING_METHOD_NAME}送信方法レコードの削除は許可されません。";
    translation["sendingmethod.msg.cannotedittransactiontype"] =
        "この送信方法は1つ以上のトランザクション・レコードに割り当てられているため、「トランザクションの種類」フィールドは無効になっています。この送信方法を編集するには、トランザクション・レコードから送信方法を削除して「トランザクションの種類」フィールドを有効にしてから、再試行してください。";
    translation["sendingmethod.contextunsupported"] =
        "電子ドキュメント送信方法は、UIとSuiteScriptのコンテキストのみをサポートします。";
    translation["sendingmethod.supportedtranstypefldhelp"] =
        "この送信方法によりサポートされる1つ以上のトランザクションの種類を選択します。トランザクションの種類を複数選択するには、Ctrlキーを押したままトランザクションの種類を選択します。<br /><br />1つ以上のトランザクションの種類を選択できない場合、そのトランザクションの種類の1つ以上のトランザクション・レコードに送信方法が割り当てられています。トランザクションの種類の選択を有効にするには、まずトランザクション・レコードから送信方法を削除する必要があります。";
    translation["sendingmethod.pluginimplementation"] =
        "電子ドキュメント送信方法プラグイン実装";
    translation["sendingmethod.pluginimplementationhelp"] =
        "送信方法プラグイン実装を選択";
    translation["sendingmethod.scriptbannermessage"] =
        "送信方法は、カスタム・プラグイン実装である必要があります。既存の送信方法スクリプトを「送信プラグイン」タイプの新しいカスタム・プラグイン実装として再作成してください。";
    translation["customdatasource.pluginimplementation"] =
        "カスタム・データ・ソース・プラグイン実装";
    translation["customdatasource.pluginimplementationhelp"] =
        "カスタム・データ・ソース・プラグイン実装を選択";
    translation["digitalsignature.pluginimplementation"] =
        "デジタル署名プラグイン実装";
    translation["digitalsignature.pluginimplementationhelp"] =
        "プラグイン実装を選択します。電子ドキュメントにデジタル署名をする場合、このフィールドは必須です。";
    translation["digitalsignature.identifierlabel"] =
        "この電子ドキュメントはデジタル署名されています。";
    translation["digitalsignature.successlog"] =
        "生成済み電子ドキュメントはデジタル署名されています。";
    translation["digitalsignature.failurelog"] =
        "生成済み電子ドキュメントはデジタル署名されていません。";
    translation["digitalsignature.pluginfailedmessage"] =
        "デジタル署名プラグイン実装から失敗のステータスが返されました。";
    translation["digitalsignature.plugininvalidresult"] =
        "デジタル署名プラグイン実装から返された結果は有効ではありません。";
    translation["inboundcustomdatasource.pluginimplementation"] =
        "インバウンド・カスタム・データ・ソース・プラグイン実装";
    translation["inboundcustomdatasource.pluginimplementationhelp"] =
        "インバウンド・カスタム・データ・ソース・プラグイン実装を選択します。";
    translation["inboundcustomdatasource.plugininvalidresult"] =
        "インバウンド・カスタム・データ・ソース・プラグイン実装結果が無効です。";
    translation["outboundvalidation.pluginimplementation"] =
        "アウトバウンド検証プラグイン実装";
    translation["outboundvalidation.pluginimplementationhelp"] =
        "アウトバウンド電子ドキュメント検証プラグイン実装を選択します。これによってアウトバウンド電子ドキュメントを検証します。";
    translation["outboundvalidation.successlog"] =
        "アウトバウンド検証に成功しました。";
    translation["outboundvalidation.failurelog"] =
        "アウトバウンド検証に失敗しました。";
    translation["outboundvalidation.pluginfailedmessage"] =
        "アウトバウンド検証プラグイン実装から失敗ステータスが返されました。";
    translation["outboundvalidation.plugininvalidresult"] =
        "アウトバウンド検証プラグイン実装からの結果が無効です。";
    translation["template.msg.cannotedittransactiontype"] =
        "このテンプレートはすでに1つ以上のトランザクション・レコードに割り当てられているため、「トランザクションの種類」フィールドは無効になっています。このテンプレートを編集するには、トランザクション・レコードからテンプレートを削除して「トランザクションの種類」フィールドを有効にしてから、再試行してください。このテンプレートはインバウンド電子ドキュメントにも割り当てることができます。これにより、「トランザクションの種類」フィールドが無効になります。";
    translation["template.msg.forcetocopymessage"] =
        "デフォルトの電子ドキュメント・テンプレートは編集できません。「アクション」から「コピー作成」オプションを使用してこのテンプレートをコピーするか、新しいテンプレートを作成できます。";
    translation["template.msg.warningoneditmessage"] =
        "これはデフォルトの電子ドキュメント・テンプレートです。このテンプレートに加えた変更は、SuiteAppの更新時に失われるか上書きされます。";
    translation["email.batchownernotification.subject"] =
        "電子ドキュメントの送信が完了しました";
    translation["email.batchownernotification.body"] =
        "こんにちは、<br/><br/>電子ドキュメントが送信されました。<br/>{SENT}/{TOTAL}件が送信されました。詳細は添付ファイルを参照してください。<br/><br/>ご利用ありがとうございました。<br/>Netsuite";
    translation["email.batchownerconvertnotification.subject"] =
        "電子ドキュメントの変換が完了しました";
    translation["email.batchownerconvertnotification.body"] =
        "こんにちは、<br/><br/>電子ドキュメントが変換されました。<br/>{CONVERTED}/{TOTAL}件が変換されました。詳細は添付ファイルを参照してください。<br/><br/>ご利用ありがとうございました。<br/>Netsuite";
    translation["email.recipientnotification.po.subject"] =
        "PO #{PONUM}の電子ドキュメントが生成されました";
    translation["email.recipientnotification.subject"] =
        "{COMPANYNAME}からの電子ドキュメント";
    translation["email.recipientnotification.customizedsubject"] =
        "{TRANTYPE} #{TRANID}の電子ドキュメントが生成されました。{SUFFIX}";
    translation["email.recipientnotification.po.body"] =
        "こんにちは!<br /><br />PO #{PONUM}の電子ドキュメントが生成されました。<br />詳細は添付の電子ドキュメント・ファイルを参照してください。<br /><br />ご利用ありがとうございました。<br />{COMPANYNAME}";
    translation["email.recipientnotification.body"] =
        "こんにちは!<br /><br />{TYPE} #{TRANID}の電子ドキュメントが生成されました。<br />詳細は添付の電子ドキュメント・ファイルを参照してください。<br /><br />ご利用ありがとうございました。<br />{COMPANYNAME}";
    translation["email.generationerrornotification.subject"] =
        "電子ドキュメントの生成中にエラーが発生しました。";
    translation["email.generationerrornotification.body"] =
        "電子ドキュメントの生成中にエラーが発生しました。<br/>トランザクションとエラー詳細のリストについては、添付ファイルを参照してください。";
    translation["email.sendingerrornotification.subject"] =
        "電子ドキュメントの送信中にエラーが発生しました";
    translation["email.sendingerrornotification.body"] =
        "電子ドキュメントの送信中にエラーが発生しました。<br/>トランザクションとエラー詳細のリストについては、添付ファイルを参照してください。";
    translation["email.webserviceerror.subject"] =
        "インバウンド電子ドキュメントのWebサービス通知";
    translation["email.webserviceerror.body"] =
        "<p>こんにちは、</p><p>Webサービスを使用したインバウンド電子ドキュメントの処理中にエラーが発生しました。<br/>詳細は以下を参照してください。</p>{DETAIL_TABLE}<p>ご利用ありがとうございました。<br />NetSuite</p>";
    translation["email.attachment.collabel.transactionnumber"] =
        "トランザクション番号";

    return translation;
});
