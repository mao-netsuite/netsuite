/**
 * @preserve
 * Client-side script attached to Sending Search Suitelet
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 * @NModuleScope TargetAccount
 */

/*! For license information please see cs_e_outbound_form.js.LICENSE.txt */
define(["N/error","N/format","N/https","N/log","N/query","N/record","N/runtime","N/search","N/translation","N/ui/message","N/url"],((e,t,r,n,a,o,s,i,u,c,p)=>{return d={5585:(e,t,r)=>{var n,a;n=[r(5728),r(9732),r(9328)],void 0===(a=function(e,t,r){var n="license.notinstalled";return{validateLicense:function(a){var o=!0,s=e.resolveScript({scriptId:"customscript_ei_license_info_service_su",deploymentId:"customdeploy_ei_license_info_service_su"}),i={};try{var u=t.post({url:s,body:{}});i=u&&u.body?JSON.parse(u.body):{}}catch(e){log.error(e.name,e.message+" "+e.stack),i.hasLicense=!1,i.errorCode=n,i.freeCountry=""}var c=function(e){var t=!1;return(e.hasLicense||!e.hasLicense&&e.errorCode!=n)&&(t=!0),t}(i),p=i.hasLicense,d=i.freeCountry;return c?r.isOWAccount()&&(p||d&&d===a||(o=!1)):o=!1,o}}}.apply(t,n))||(e.exports=a)},723:(e,t)=>{var r;void 0===(r=function(){var e={3:"AF",247:"AX",6:"AL",62:"DZ",12:"AS",1:"AD",9:"AO",5:"AI",10:"AQ",4:"AG",11:"AR",7:"AM",15:"AW",14:"AU",13:"AT",16:"AZ",31:"BS",23:"BH",19:"BD",18:"BB",35:"BY",20:"BE",36:"BZ",25:"BJ",27:"BM",32:"BT",29:"BO",250:"BQ",17:"BA",34:"BW",33:"BV",30:"BR",106:"IO",28:"BN",22:"BG",21:"BF",24:"BI",117:"KH",46:"CM",37:"CA",249:"IC",53:"CV",124:"KY",40:"CF",248:"EA",212:"TD",45:"CL",47:"CN",54:"CX",38:"CC",48:"CO",119:"KM",39:"CD",41:"CG",44:"CK",49:"CR",43:"CI",98:"HR",52:"CU",251:"CW",55:"CY",56:"CZ",59:"DK",58:"DJ",60:"DM",61:"DO",221:"TL",63:"EC",65:"EG",208:"SV",88:"GQ",67:"ER",64:"EE",69:"ET",72:"FK",74:"FO",71:"FJ",70:"FI",75:"FR",80:"GF",175:"PF",213:"TF",76:"GA",85:"GM",79:"GE",57:"DE",82:"GH",83:"GI",89:"GR",84:"GL",78:"GD",87:"GP",92:"GU",91:"GT",81:"GG",86:"GN",93:"GW",94:"GY",99:"HT",96:"HM",233:"VA",97:"HN",95:"HK",100:"HU",109:"IS",105:"IN",101:"ID",108:"IR",107:"IQ",102:"IE",104:"IM",103:"IL",110:"IT",112:"JM",114:"JP",111:"JE",113:"JO",125:"KZ",115:"KE",118:"KI",121:"KP",122:"KR",254:"XK",123:"KW",116:"KG",126:"LA",135:"LV",127:"LB",132:"LS",131:"LR",136:"LY",129:"LI",133:"LT",134:"LU",148:"MO",144:"MK",142:"MG",156:"MW",158:"MY",155:"MV",145:"ML",153:"MT",143:"MH",150:"MQ",151:"MR",154:"MU",243:"YT",157:"MX",73:"FM",139:"MD",138:"MC",147:"MN",140:"ME",152:"MS",137:"MA",159:"MZ",146:"MM",160:"NA",169:"NR",168:"NP",166:"NL",161:"NC",171:"NZ",165:"NI",162:"NE",164:"NG",170:"NU",163:"NF",149:"MP",167:"NO",172:"OM",178:"PK",185:"PW",173:"PA",176:"PG",186:"PY",174:"PE",177:"PH",181:"PN",179:"PL",184:"PT",182:"PR",187:"QA",188:"RE",189:"RO",190:"RU",191:"RW",26:"BL",198:"SH",120:"KN",128:"LC",141:"MF",234:"VC",241:"WS",203:"SM",207:"ST",192:"SA",204:"SN",50:"RS",194:"SC",202:"SL",197:"SG",252:"SX",201:"SK",199:"SI",193:"SB",205:"SO",244:"ZA",90:"GS",253:"SS",68:"ES",130:"LK",183:"PS",180:"PM",195:"SD",206:"SR",200:"SJ",210:"SZ",196:"SE",42:"CH",209:"SY",225:"TW",216:"TJ",226:"TZ",215:"TH",214:"TG",217:"TK",220:"TO",223:"TT",219:"TN",222:"TR",218:"TM",211:"TC",224:"TV",228:"UG",227:"UA",2:"AE",77:"GB",230:"US",231:"UY",229:"UM",232:"UZ",239:"VU",235:"VE",238:"VN",236:"VG",237:"VI",240:"WF",66:"EH",242:"YE",245:"ZM",246:"ZW"};return{getFreeCountryISOCode:function(t){return e[t]},getFreeCountryInternalId:function(t){for(var r in e)if(e.hasOwnProperty(r)&&e[r]===t)return r}}}.apply(t,[]))||(e.exports=r)},369:(e,t,r)=>{var n,a;n=[r(1303),r(6189),r(5389),r(7789)],void 0===(a=function(e,t,r,n){function a(e){var r,n,a={success:!1,message:"",cttDetails:{}};if(!e)return a.message="Invalid Transaction Type ID.",a.success=!1,a;if(!o())return a.message="Custom Transactions feature should be enabled.",a.success=!1,a;isNaN(e)?(r="scriptid",n=t.Operator.IS):(r="id",n=t.Operator.EQUAL);try{var s=t.create({type:t.Type.CUSTOM_TRANSACTION_TYPE});s.condition=s.createCondition({fieldId:r,operator:n,values:e}),s.columns=[s.createColumn({fieldId:"name"}),s.createColumn({fieldId:"id"}),s.createColumn({fieldId:"scriptid"})];var i=s.run().results;if(0!==i.length){a.success=!0,a.message="Found CTT Details";for(var u=i.length-1;u>=0;u--)log.debug("EICTTMAN","Result of search on CTT: "+i[u].values),a.cttDetails.name=i[u].values[0],a.cttDetails.internalId=i[u].values[1],a.cttDetails.stringId=i[u].values[2]}else a.success=!1,a.message="The Transaction Type does not exist in the account."}catch(e){log.error(e.name,e.message+e.stack),a.success=!1,a.message="An error occurred during search on CTT. Details: "+e.name+". "+e.message}return a}function o(){return r.isFeatureInEffect("CUSTOMTRANSACTIONS")}return{getRegisteredCTTIntIdArray:function(){for(var t="custrecord_ei_registered_ctt",r=e.lookupFields({type:"customrecord_ei_ctt_map",id:1,columns:t})[t],n=[],a=0;a<r.length;a++)n.push(r[a].value);return log.debug("EICTTMAN","IDs in EICTTMAP: "+JSON.stringify(n)),n},getCTTDetails:a,getStringIdOfCTTFromInternalId:function(e){if(e)return a(e).cttDetails.stringId},getInternalIdOfCTTFromStringId:function(e){if(e)return a(e).cttDetails.internalId},isCustomTransactionFeatureEnabled:o,getCTTTransStyle:function(e){var r=null;if(!o())return r;var a=t.create({type:t.Type.CUSTOM_TRANSACTION_TYPE}),s=a.createCondition({fieldId:n.CORE_FIELDS.SCRIPT_ID,operator:t.Operator.IS,values:e});a.condition=a.and(s),a.columns=[a.createColumn({fieldId:n.CORE_FIELDS.TRANSACTION_STYLE,context:t.FieldContext.RAW})];var i=a.run().asMappedResults();return 1==i.length&&(r=i[0].transactionstyle),r}}}.apply(t,n))||(e.exports=a)},9328:(e,t,r)=>{var n,a;n=[r(5389)],void 0===(a=function(e){function t(){return e.isFeatureInEffect("SUBSIDIARIES")}return{isOWAccount:t,areAllConditionsFulfilledForSearch:function(e,r){var n=!1;return(t()&&(e||r)||!t())&&(n=!0),n},hasLicenseValueForURLParameters:function(e){var r;return t()?t()&&(r="boolean"==typeof e?!0===e?"T":"F":e):r="T",r}}}.apply(t,n))||(e.exports=a)},7411:(e,t,r)=>{var n,a;n=[r(4148),r(8445),r(9502),r(3776),r(9452),r(5728),r(9732),r(5585),r(9328)],void 0===(a=function(e,t,r,n,a,o,s,i,u){var c,p,d="custpage_outbound_cust",l="custpage_outbound_vendor",T="custpage_outbound_subs",_="custpage_outbound_tran_type",g="custpage_outbound_tran_date_start",f="custpage_outbound_tran_date_end",y="custpage_outbound_has_license",v="custpage_outbound_free_country",S="custpage_outbound_has_license_client",I="custpage_outbound_e_type",C="outbound.invalidtypetitle",E="outbound.invalidentitytransaction",A="outbound.invalidtype",O="outbound.invaliddates",h="outbound.msg.sendingongoing",N="license.notinstalled",R="outbound.configurefreecountry",m=[],b="Invalid Transaction Types",D="The following transaction types are currently not supported: {TRANSACTIONTYPES}",L="The following transaction types are not valid for the selected entity: {TRANSACTIONTYPES}",P="The Transaction Date From must not be later than the Transaction Date To.",F="The e-document is currently being sent. You will receive an email when the process is complete.",M="The NetSuite SuiteApps License Client is not available in your account. Please install this SuiteApp to access all Electronic Invoicing features.",V="This account does not have an active license for multi-country use of Electronic Invoicing. To send e-documents by bulk, please contact your account administrator to configure the E-Document Country for Free Use under the parent company record in Electronic Invoicing Preferences page.";function U(e,t){t||(t=!1);var r=e.getValue(I),n=e.getField({fieldId:d}),a=e.getField({fieldId:l});"vendortype"===r?(n.isDisabled=!0,a.isDisabled=!1,e.setValue({fieldId:d,value:"",ignoreFieldChange:t})):(n.isDisabled=!1,a.isDisabled=!0,e.setValue({fieldId:l,value:"",ignoreFieldChange:t}))}function G(r){for(var a=r.getValue(_),o=r.getText(_),s=[],i=[],u=!0,p=0;p<a.length;p++){var d=a[p];if(d){s[d]=o[p];var l=e.isSalesTransaction(d),T=e.isValidOutboundTransactionType(d);!l&&T&&i.push(s[d])}}if(i.length>0){var g={TRANSACTIONTYPES:i.join(", ")};n.setString(L),n.replaceParameters(g),u=!1,(c=t.create({type:t.Type.ERROR,title:b,message:n.toString()})).show()}return u}function x(r){for(var a=r.getValue(_),o=r.getText(_),s=[],i=[],u=!0,p=0;p<a.length;p++){var d=a[p];d&&(s[d]=o[p],e.isPurchaseTransaction(d)||i.push(s[d]))}if(log.debug(i),i.length>0){var l={TRANSACTIONTYPES:i.join(", ")};n.setString(L),n.replaceParameters(l),u=!1,(c=t.create({type:t.Type.ERROR,title:b,message:n.toString()})).show()}return u}function B(r){for(var a=r.getValue(_),o=r.getText(_),s=[],i=[],u=!0,p=0;p<a.length;p++){var d=a[p];d&&(s[d]=o[p],e.isValidOutboundTransactionType(d)||i.push(s[d]))}if(i.length>0){var l={TRANSACTIONTYPES:i.join(", ")};n.setString(D),n.replaceParameters(l),u=!1,(c=t.create({type:t.Type.ERROR,title:b,message:n.toString()})).show()}return u}function Y(e){var t=!0,r=e.getValue(f),n=e.getValue(g);if(n&&r){var o=a.parse({value:r,type:a.Type.DATE});a.parse({value:n,type:a.Type.DATE}).getTime()>o.getTime()&&(alert(P),t=!1)}return t}function w(){var e=p.getValue(d),t=p.getValue(l),r=p.getValue(T),n=p.getValue(_).join(","),a=p.getText(g),s=p.getText(f),i=p.getValue(I),c=p.getValue("custpage_outbound_free_country"),v=!0===p.getValue(y)?"T":"F",C=!0===p.getValue(S)?"T":"F",E=p.getValue("custpage_outbound_sending_type"),A={custpage_outbound_cust:e,custpage_outbound_vendor:t,custpage_outbound_subs:r,custpage_outbound_tran_type:n,custpage_outbound_tran_date_start:a,custpage_outbound_tran_date_end:s,custpage_outbound_e_type:i,custpage_outbound_result_mode:"T",custpage_outbound_free_country:c,custpage_outbound_has_license:u.hasLicenseValueForURLParameters(v),custpage_outbound_has_license_client:C,custpage_outbound_sending_type:E};H(o.resolveScript({scriptId:"customscript_ei_outbound_form_su",deploymentId:"customdeploy_ei_outbound_form_su",params:A}))}function H(e){try{NS.form.setChanged(!1)}catch(e){log.error(e.name,e.message+"\n"+e.stack)}window.location.href=e}return{pageInit:function(e){U(p=e.currentRecord,!0),m=r.getStringMap([C,A,O,h,R,N,E]),b=m[C]||b,D=m[A]||D,L=m[E]||L,P=m[O]||P,F=m[h]||F,M=m[N]||M,V=m[R]||V;for(var n={},a=window.location.search.substring(1).split("&"),i=0;i<a.length;i++){var d=a[i].split("=");n[d[0]]=d[1]}var l=n.ongoing,T=n.mismatch;l&&(c=t.create({type:t.Type.CONFIRMATION,message:F})).show(),function(e){var t=o.resolveScript({scriptId:"customscript_ei_license_info_service_su",deploymentId:"customdeploy_ei_license_info_service_su"}),r=s.post({url:t,body:{}}),n=JSON.parse(r.body),a=function(e){var t=!1;return(e.hasLicense||!e.hasLicense&&"EI_NO_NSLC"!=e.errorCode)&&(t=!0),t}(n),i=n.hasLicense,u=n.freeCountry;e.setValue(S,a),e.setValue(y,i),e.setValue(v,u)}(p);var _=p.getValue(S),g=p.getValue(y),f=p.getValue(v);_?u.isOWAccount()&&((g||f)&&"T"!==T||t.create({type:t.Type.ERROR,message:V}).show()):t.create({type:t.Type.ERROR,message:M}).show()},fieldChanged:function(t){var r=t.currentRecord,n=!0,a=!0,o=!0,s=t.fieldId,i=r.getValue(I),p=r.getValue(S),d=r.getValue(v),l=r.getValue(y);c&&c.hide(),s===I&&(U(r,!0),function(t,r){r||(r=!1);var n=t.getValue(I),a=t.getField({fieldId:_}),o=e.getAllPurchaseTransactionIds();"vendortype"==n?t.setValue({fieldId:_,value:o,ignoreFieldChange:r}):a.isDisabled=!1}(r)),p&&u.areAllConditionsFulfilledForSearch(l,d)&&("customertype"===i?n=G(r):"vendortype"===i&&(n=x(r)),a=B(r),o=Y(r),n&&a&&o&&function(e){var t=e.getValue(T),r=e.getValue(g),n=e.getValue(f);(void 0===t||t)&&r&&n&&w()}(t.currentRecord))},saveRecord:function(e){var t=e.currentRecord,r=t.getValue(I),n=t.getValue(v),a=i.validateLicense(n);if(!a){var s=o.resolveScript({scriptId:"customscript_ei_outbound_form_su",deploymentId:"customdeploy_ei_outbound_form_su",params:{mismatch:"T"}});redirectToSearch(s)}var u,c,p;return u=B(t),c=Y(t),p="customertype"==r?G(t):x(t),u&&p&&c},redirectToURL:H,redirectToSearchResult:w}}.apply(t,n))||(e.exports=a)},4148:(e,t,r)=>{var n,a;n=[r(7266),r(1303),r(6189),r(369),r(723),r(5389),r(9063)],void 0===(a=function(e,t,r,n,a,o,s){var i,u="outbound",c="inbound",p="purchase",d="sales",l="restemp",T="SUBSIDIARIES",_={};function g(){Object.keys(_).length||(_[17]={transCode:"VendBill",edocType:[c,u],type:e.Type.VENDOR_BILL,transGroupType:p,inactive:!1},_[29]={transCode:"CashRfnd",edocType:[u],type:e.Type.CASH_REFUND,transGroupType:d,inactive:!1},_[5]={transCode:"CashSale",edocType:[u],type:e.Type.CASH_SALE,transGroupType:d,inactive:!1},_[10]={transCode:"CustCred",edocType:[u,l],type:e.Type.CREDIT_MEMO,transGroupType:d,inactive:!1},_[6]={transCode:"Estimate",edocType:[u],type:e.Type.ESTIMATE,transGroupType:d,inactive:!1},_[7]={transCode:"CustInvc",edocType:[u,l],type:e.Type.INVOICE,transGroupType:d,inactive:!1},_[15]={transCode:"PurchOrd",edocType:[u,l],type:e.Type.PURCHASE_ORDER,transGroupType:p,inactive:!1},_[33]={transCode:"RtnAuth",edocType:[u],type:e.Type.RETURN_AUTHORIZATION,transGroupType:d,inactive:!1},_[9]={transCode:"CustPymt",edocType:[u],type:e.Type.CUSTOMER_PAYMENT,transGroupType:d,inactive:!1},_[32]={transCode:"ItemShip",edocType:[u],type:e.Type.ITEM_FULFILLMENT,transGroupType:d,inactive:!1},_[20]={transCode:"VendCred",edocType:[c,u],type:e.Type.VENDOR_CREDIT,transGroupType:p,inactive:!1},_[48]={transCode:"TrnfrOrd",edocType:[u],type:e.Type.TRANSFER_ORDER,transGroupType:d,inactive:!1},_[31]={transCode:"SalesOrd",edocType:[c],type:e.Type.SALES_ORDER,transGroupType:d,inactive:!1},_[40]={transCode:"CustDep",edocType:[u],type:e.Type.CUSTOMER_DEPOSIT,transGroupType:d,inactive:!1})}function f(e){g();var t,r,n=[];S();for(var a=0;a<e.length;a++)t=e[a],(r=_[t])&&r.edocType.indexOf(u)>=0&&n.push(r.transCode);return n}function y(){g();var e=[];for(var t in S(),_){var r=_[t];r.edocType.indexOf(u)>=0&&e.push(r.transCode)}return e}function v(){g();var e=[];for(var t in S(),_){var r=_[t];r.transGroupType===d&&e.push(r.transCode)}return e}function S(){g();var e=h();for(var t in e){var r=e[t];_[t]=r}}function I(e){return-1!==e.indexOf("custom")||-1!==e.indexOf("cutr")}function C(e){var t=!1;return!!e&&(e&&!D(e)&&(t=0===e.toLowerCase().indexOf("customtransaction")),t)}function E(e){var t=!1;return!!e&&(e&&!D(e)&&(t=0===e.toLowerCase().indexOf("customtransaction")),t)}function A(e){var t=!1;return!!e&&(e&&!D(e)&&(t=0===e.toLowerCase().indexOf("customsale")),t)}function O(e){var t=!1;return!!e&&(e&&!D(e)&&(t=0===e.toLowerCase().indexOf("custompurchase")),t)}function h(){if(!i||0===Object.keys(i).length){i={};var e=[];try{e=n.getRegisteredCTTIntIdArray();for(var t=0;t<e.length;t++){var r=n.getStringIdOfCTTFromInternalId(e[t]),a=void 0,o=void 0;C(r)||E(r)?(a="custom"+e[t],o=d):A(r)?(a="cutrsale"+e[t],o=d):O(r)&&(a="cutrprch"+e[t],o=p),a&&(i[e[t]]={edocType:[u],type:r,inactive:!1,transCode:a,transGroupType:o})}}catch(e){s.error(e.name,e.message+" "+e.stack)}}return i}function N(e){var t=[];for(var r in e)I(e[r])&&t.push(e[r]);for(var n=e.length-1;n>=0;n--)for(var a=0;a<t.length;a++)e[n]===t[a]&&e.splice(n,1);return e}function R(e){var t,r;g();var n=[];S();for(var a=0;a<e.length;a++)t=e[a],(r=_[t])&&r.edocType.indexOf(u)>=0&&I(r.transCode)&&n.push(r.transCode);return n}function m(){g();var e=[];for(var t in S(),_){var r=_[t];r.transGroupType===d&&I(r.transCode)&&e.push(r.transCode)}return e}function b(){g();var e=[],t=h();for(var r in t)e.push(t[r].transCode);return e}function D(e){return!isNaN(e)}return{getSupportedTransTypeLabels:function(e,t,r){g();var a=[];if(t){if(t.indexOf(c)>=0)for(var o in _)_[o].edocType.indexOf(c)>=0&&a.push(o);else if(t.indexOf(u)>=0)for(var i in _)_[i].edocType.indexOf(u)>=0&&a.push(i);else if(t.indexOf(l)>=0)for(var p in _)_[p].edocType.indexOf(l)>=0&&a.push(p)}else for(var d in _)a.push(d);if(!r)try{a=function(e){for(var t=n.getRegisteredCTTIntIdArray(),r=0;r<t.length;r++)-1===e.indexOf(t[r])&&e.push(t[r]);return e}(a)}catch(e){s.error(e.name,e.message+" "+e.stack)}if(a.length>0)for(var T=0;T<e.length;)-1!==a.indexOf(e[T].value)?T++:e.splice(T,1);else e=[];return e},getTransactionTypeFromCode:function(e){for(var t in g(),_)if(_[t].transCode===e)return _[t].type},getTransactionTypeFromId:function(e){return g(),_[e].type},getOutboundTransactionCodes:f,getInboundTransactionCodes:function(e){g();for(var t,r,n=[],a=0;a<e.length;a++)t=e[a],(r=_[t]).edocType.indexOf(c)>=0&&n.push(r.transCode);return n},getResponseTemplateTransactionCodes:function(e){g();for(var t,r,n=[],a=0;a<e.length;a++)t=e[a],(r=_[t]).edocType.indexOf(l)>=0&&n.push(r.transCode);return n},getInboundTransactionRecordTypes:function(e){g();for(var t,r,n=[],a=0;a<e.length;a++)t=e[a],(r=_[t]).edocType.indexOf(c)>=0&&n.push(r.type);return n},isValidOutboundTransactionType:function(e){g();var t=_[e];if(t&&t.edocType.indexOf(u)>=0)return!0;var r=h()[e];return!!(r&&r.edocType.indexOf(u)>=0)},isValidInboundTransactionType:function(e){g();var t=!1,r=_[e];return r&&r.edocType.indexOf(c)>=0&&(t=!0),t},isSalesTransaction:function(e,t){g();var r,n,a=!1;if(!1!==t&&S(),parseInt(e))r=_[parseInt(e)];else for(var o in _)(n=_[o]).transCode.toLowerCase()===e.toLowerCase()&&(r=n);return r&&r.transGroupType===d&&(a=!0),a},isPurchaseTransaction:function(e,t){g();var r,n,a=!1;if(!1!==t&&S(),parseInt(e))r=_[parseInt(e)];else for(var o in _)(n=_[o]).transCode.toLowerCase()===e.toLowerCase()&&(r=n);return r&&r.transGroupType===p&&(a=!0),a},getAllSalesTransactionCodes:v,getAllPurchaseTransactionIds:function(){g();var e=[];for(var t in S(),_)_[t].transGroupType===p&&e.push(t);return e},getAllOutboundTransactionCodes:y,getValidPayloadTransactionIDs:function(){g();var e=[],t=0;for(var r in _)_[r].inactive||(e[t++]=r);var n=h();for(var a in n)e[t++]=n[a].type;return e},getValidPayloadTransactionTypes:function(){g();var e=[];for(var t in _){var r=_[t];!1===r.inactive&&e.push(r.type)}var n=h();for(var a in n)e.push(n[a].type);return e},getTransactionFilters:function(e,r,n){g();var a=[];n?n.length>0?a=f(n):0===n.length&&(a=v()):a=y(),a=N(a);var s=[["type",t.Operator.ANYOF,a]];o.isFeatureInEffect(T)&&e&&s.push("AND",["formulatext: {subsidiary.country}",t.Operator.IS,e]);var i=[];a.length>0&&i.push(s);var u=[];return u.push(["custbody_psg_ei_status",t.Operator.ANYOF,r]),u.push("AND"),u.push(["mainline",t.Operator.IS,"T"]),u.push("AND"),u.push(i),u.push("AND"),u.push(["memorized",t.Operator.IS,"F"]),u},getTransactionFiltersQuery:function(e,t,n,i,u){g();var c=[],p=[];u?u.length>0?c=f(u):0===u.length&&(c=v()):c=y(),c=N(c);var d=o.isFeatureInEffect(T);return s.debug("getTransactionFiltersQuery():allowedCountry",n),s.debug("getTransactionFiltersQuery():subsidiaryId",t),d&&(n||t)&&(t&&p.push(e.createCondition({fieldId:"transactionlines.subsidiary",operator:r.Operator.EQUAL,values:t})),n&&p.push(e.createCondition({fieldId:"transactionlines.subsidiary.country",operator:r.Operator.IS,values:a.getFreeCountryISOCode(n)})),p.push(e.createCondition({fieldId:"transactionlines.mainline",operator:r.Operator.IS,values:!0}))),c.length>0&&p.push(e.createCondition({fieldId:"type",operator:r.Operator.ANY_OF,values:c})),p.push(e.createCondition({fieldId:"custbody_psg_ei_status",operator:r.Operator.ANY_OF,values:i})),p},getCustomTransactionFilters:function(e,r){g();var n=[];r?r.length>0?n=R(r):0===r.length&&(n=m()):n=b();var a=[["type",t.Operator.ANYOF,n]],o=[];n.length>0&&o.push(a);var s=[];return s.push(["custbody_psg_ei_status",t.Operator.ANYOF,e]),s.push("AND"),s.push(["mainline",t.Operator.IS,"T"]),s.push("AND"),s.push(o),s.push("AND"),s.push(["memorized",t.Operator.IS,"F"]),s},getCustomTransactionFiltersQuery:function(e,t,n){g();var a=[];n?n.length>0?a=R(n):0===n.length&&(a=m()):a=b();var o=[];return a.length>0&&o.push(e.createCondition({fieldId:"type",operator:r.Operator.ANY_OF,values:a})),o.push(e.createCondition({fieldId:"custbody_psg_ei_status",operator:r.Operator.ANY_OF,values:t})),o},isCustomTransactionType:function(e){return g(),D(e)&&(e=n.getStringIdOfCTTFromInternalId(e)),!!e&&(C(e=e.toLowerCase())||E(e)||A(e)||O(e))},isSalesStyleCTT:A,isPurchaseStyleCTT:O,isBasicStyleCTT:C,isJournalStyleCTT:E,getAllOutboundCttCodes:b,getOutboundCttCodes:R,getAllCttSalesTransactionCodes:m,removeCttTransCodes:N,getCTTMap:h,getAllInboundSalesTransactionIds:function(){g();var e=[];for(var t in S(),_){var r=_[t];r.transGroupType===d&&r.edocType.indexOf(c)>=0&&e.push(t)}return e},getAllPurchaseInboundTransactionIds:function(){g();var e=[];for(var t in S(),_){var r=_[t];r.transGroupType===p&&r.edocType.indexOf(c)>=0&&e.push(t)}return e},getEntityFieldIDFromTransactionRecord:function(t){var r="";switch(t.type){case e.Type.CUSTOMER_DEPOSIT:case e.Type.CUSTOMER_PAYMENT:r="customer";break;case e.Type.CASH_REFUND:case e.Type.CASH_SALE:case e.Type.CREDIT_MEMO:case e.Type.ESTIMATE:case e.Type.INVOICE:case e.Type.RETURN_AUTHORIZATION:case e.Type.VENDOR_BILL:case e.Type.PURCHASE_ORDER:case e.Type.ITEM_FULFILLMENT:case e.Type.VENDOR_CREDIT:case e.Type.SALES_ORDER:case e.Type.TRANSFER_ORDER:default:r="entity"}return r},getRecordType:function(e){g();var t=null;if(e)for(var r in _){var n=_[r];n.transCode===e&&(t=n.type)}return t}}}.apply(t,n))||(e.exports=a)},7789:(e,t)=>{var r;void 0===(r=function(){return{FEATURES:{SUBSIDIARIES:"subsidiaries"},RECORD_TYPES:{INBOUND_EDOCUMENT:"customrecord_psg_ei_inbound_edoc",TRANSACTION_RESPONSE:"customrecord_psg_ei_trans_res",TRANSACTION_RESPONSE_TYPE:"customrecord_psg_ei_response_status",TRANSACTION_RESPONSE_TEMPLATE:"customrecord_psg_ei_transres_template",EI_SENDING_METHOD:"customrecord_ei_sending_method",SUBSIDIARY_PREF:"customrecord_psg_ei_sub_prefs_data",EDOCUMENT_TEMPLATE:"custbody_psg_ei_template"},CUSTOM_LISTS:{DIRECTION_TYPE:"customlist_psg_ei_direction_type",TRANSACTION_RESPONSE_STATUS:"customlist_psg_ei_sent_status",EDOC_STATUS_LIST:"customlist_psg_ei_status",AUDIT_TRAIL_LIST:"customlist_psg_ei_audit_trail_events"},SCRIPTS:{GENERATE_TRANSACTION_RESPONSE:"customscript_psg_ei_generate_trans_resp",SEND_TRANSACTION_RESPONSE:"customscript_psg_ei_send_trans_res_su",PREVIEW_DOWNLOAD:"customscript_ei_content_service_su"},CUSTPAGE_BUTTONS:{GENERATE_TRANSACTION_RESPONSE:"custpage_generate_ar_ei_button",SEND_TRANSACTION_RESPONSE:"custpage_send_ar_ei_button"},CORE_FIELDS:{INTERNAL_ID:"internalid",SCRIPT_ID:"scriptid",ID:"id",INACTIVE:"isinactive",SUBSIDIARY:"subsidiary",ENTITY:"entity",CUSTOM_STANDARD:"customstandard",TYPE:"type",TRAN_ID:"tranid",RECORD_TYPE:"recordType",APPROVAL_STATUS:"approvalstatus",TRANSACTION_STYLE:"transactionstyle"},SUITEAPPS:{EI:{ID:"436209",NAME:"Electronic Invoicing"}},LICENSES:{EI:"Electronic Invoicing",NSEB:"Netsuite Electronic Business",Avalara:"Avalara Processing For Netsuite Electronic Invoicing"},ROLE_PERMISSIONS:{GEN_AND_SEND_AR:"custrecord_permission_gen_and_send_ar"},TRANSLATE_TYPES:{MESSAGE:"message",TITLE:"title",LABEL:"label"},CUSTOM_TRANSACTION_STYLE:{BASIC:"BASIC",JOURNAL:"JOURNAL",PURCHASE:"PURCHASE",SALES:"SALES"}}}.apply(t,[]))||(e.exports=r)},3776:(e,t,r)=>{var n,a;n=[r(7903)],void 0===(a=function(e){var t;return{setString:function(r){if(!r)throw e.create({name:"REQUIRED_PARAM_MISSING",message:"Parameter of method setString of String Formatter must not be null or undefined."});t=r},replaceParameters:function(e){for(var r in e){var n=new RegExp("\\{"+r+"\\}","g");t=t.replace(n,e[r])}},toString:function(){return t.toString()}}}.apply(t,n))||(e.exports=a)},9502:(e,t,r)=>{var n,a;n=[r(5389),r(6834)],void 0===(a=function(e,t){var r;function n(n){r||(r=e.getCurrentUser().getPreference("LANGUAGE")),n=(n=n.toLowerCase()).replace(new RegExp(".".replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),"_");var a="";try{a=t.get({collection:"custcollection_ei_translations",key:n,locale:r})()}catch(e){log.error(e.name,e.message+"\n"+e.stack)}return a}return{getString:n,getStringMap:function(e){for(var t={},r=0;r<e.length;r++){var a=e[r];t[a]=n(a)}return t},setLocale:function(e){r=e}}}.apply(t,n))||(e.exports=a)},7903:t=>{"use strict";t.exports=e},9452:e=>{"use strict";e.exports=t},9732:e=>{"use strict";e.exports=r},9063:e=>{"use strict";e.exports=n},6189:e=>{"use strict";e.exports=a},7266:e=>{"use strict";e.exports=o},5389:e=>{"use strict";e.exports=s},1303:e=>{"use strict";e.exports=i},6834:e=>{"use strict";e.exports=u},8445:e=>{"use strict";e.exports=c},5728:e=>{"use strict";e.exports=p}},l={},function e(t){var r=l[t];if(void 0!==r)return r.exports;var n=l[t]={exports:{}};return d[t](n,n.exports,e),n.exports}(7411);var d,l}));