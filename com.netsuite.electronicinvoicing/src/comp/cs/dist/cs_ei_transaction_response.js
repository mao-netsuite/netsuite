/**
 * @preserve
 * @NApiVersion 2.x
 * @NScriptType clientscript
 */

/*! For license information please see cs_ei_transaction_response.js.LICENSE.txt */
define(["N/https","N/runtime","N/translation","N/ui/dialog","N/ui/message","N/url"],((e,n,t,s,E,r)=>{return S={8233:(e,n,t)=>{var s,E;s=[t(5728),t(9732),t(7810),t(8445),t(9502),t(7789),t(2642),t(422),t(4)],void 0===(E=function(e,n,t,s,E,r,S,a,_){var o=r.SCRIPTS,T=o.GENERATE_TRANSACTION_RESPONSE,A=o.SEND_TRANSACTION_RESPONSE,i=r.RECORD_TYPES,N=S[T].DEFAULT_DEPLOYMENT,R=S[A].DEFAULT_DEPLOYMENT,c=r.RECORD_TYPES.TRANSACTION_RESPONSE,O=i.TRANSACTION_RESPONSE_TYPE,I=a.BANNERS,L=I.SEND_TRANSACTION_RESPONSE_IN_PROGRESS,l=I.GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS,p=a.ALERTS,g=p.SENDING_TR_IN_PROGRESS_ALERT_CODE,u=p.GENERATION_TR_IN_PROGRESS_ALERT_CODE;const C=p.GENERATION_ERROR_IN_TR_ALERT_CODE,d=p.SENDING_ERROR_IN_TR_ALERT_CODE;var D=a.DIALOGS,G=D.SEND_TR_CANCELLATION,M=G.BUTTONS,P=D.SEND_TR_REJECTION,v=D.SEND_TR_REJECTED,m=_[O].FOR_CANCELLATION,b=_[O].FOR_REJECTION,f=_[O].REJECTED,y=!1,h=!1;function U(n){log.debug("cs_ei_transaction_response: redirectAfterProcess(): transRespId",n);var t=e.resolveRecord({recordType:c,recordId:n,params:{ei_show_banner:!0}});log.debug("cs_ei_transaction_response: redirectAfterProcess(): recordURL",t),window.location=t}function B(e,n,t){s.create({type:e,message:t,title:n}).show()}return{generateTransactionResp:function(t,r){if(log.debug("cs_ei_transaction_response: generateTransactionResp(): transRespId",t),log.debug("cs_ei_transaction_response: generateTransactionResp(): transRespRecType",r),y)return alert(E.getString(u.MESSAGE_TRANSLATION_CODE)||u.MESSAGE);y=!0,B(s.Type.INFORMATION,"",E.getString(l.MESSAGE_TRANSLATION_CODE)||l.MESSAGE);var S=e.resolveScript({scriptId:T,deploymentId:N});n.post.promise({url:S,body:{transRespId:t,transRespRecType:r}}).then((function(){U(t)})).catch((function(e){log.error("cs_ei_transaction_response: generateTransactionResp(): err",e),alert(E.getString(C.MESSAGE_TRANSLATION_CODE)||C.MESSAGE)}))},sendTransactionResp:function(r,S,a,_,o,T,i,N){if(log.debug("sendTransactionResp(): avalaraMandate",r),log.debug("sendTransactionResp(): transRespTranId",S),log.debug("sendTransactionResp(): transRespId",a),log.debug("sendTransactionResp(): transRespType",_),log.debug("sendTransactionResp(): transRespStatus",o),log.debug("sendTransactionResp(): tranType",T),log.debug("sendTransactionResp(): subsidiaryId",i),log.debug("sendTransactionResp(): entity",N),h)return alert(E.getString(g.MESSAGE_TRANSLATION_CODE)||g.MESSAGE);var c=function(e){var n="",t="";switch(e){case m:n=E.getString(G.TITLE_TRANSLATION_CODE||G.TITLE),t=E.getString(G.MESSAGE_TRANSLATION_CODE||G.MESSAGE);break;case b:n=E.getString(P.TITLE_TRANSLATION_CODE||P.TITLE),t=E.getString(P.MESSAGE_TRANSLATION_CODE||P.MESSAGE);break;case f:n=E.getString(v.TITLE_TRANSLATION_CODE||v.TITLE),t=E.getString(v.MESSAGE_TRANSLATION_CODE||v.MESSAGE)}return{dialogTitle:n,dialogMessage:t}}(_),O={title:c.dialogTitle,message:c.dialogMessage,buttons:[{label:M.SEND.LABEL,value:1},{label:M.CANCEL.LABEL,value:0}]};t.create(O).then((function(t){if(1==t){h=!0,B(s.Type.INFORMATION,"",E.getString(L.MESSAGE_TRANSLATION_CODE)||L.MESSAGE);var c=e.resolveScript({scriptId:A,deploymentId:R});n.post.promise({url:c,body:{avalaraMandate:r,transRespTranId:S,transRespId:a,transRespType:_,transRespStatus:o,tranType:T,subsidiaryId:i,entity:N}}).then((function(){U(a)})).catch((function(e){log.error("error in sendTransactionResp",e),alert(E.getString(d.MESSAGE_TRANSLATION_CODE)||d.MESSAGE)}))}})).catch()}}}.apply(n,s))||(e.exports=E)},7789:(e,n)=>{var t;void 0===(t=function(){return{FEATURES:{SUBSIDIARIES:"subsidiaries"},RECORD_TYPES:{INBOUND_EDOCUMENT:"customrecord_psg_ei_inbound_edoc",TRANSACTION_RESPONSE:"customrecord_psg_ei_trans_res",TRANSACTION_RESPONSE_TYPE:"customrecord_psg_ei_response_status",TRANSACTION_RESPONSE_TEMPLATE:"customrecord_psg_ei_transres_template",EI_SENDING_METHOD:"customrecord_ei_sending_method",SUBSIDIARY_PREF:"customrecord_psg_ei_sub_prefs_data",EDOCUMENT_TEMPLATE:"custbody_psg_ei_template"},CUSTOM_LISTS:{DIRECTION_TYPE:"customlist_psg_ei_direction_type",TRANSACTION_RESPONSE_STATUS:"customlist_psg_ei_sent_status",EDOC_STATUS_LIST:"customlist_psg_ei_status",AUDIT_TRAIL_LIST:"customlist_psg_ei_audit_trail_events"},SCRIPTS:{GENERATE_TRANSACTION_RESPONSE:"customscript_psg_ei_generate_trans_resp",SEND_TRANSACTION_RESPONSE:"customscript_psg_ei_send_trans_res_su",PREVIEW_DOWNLOAD:"customscript_ei_content_service_su"},CUSTPAGE_BUTTONS:{GENERATE_TRANSACTION_RESPONSE:"custpage_generate_ar_ei_button",SEND_TRANSACTION_RESPONSE:"custpage_send_ar_ei_button"},CORE_FIELDS:{INTERNAL_ID:"internalid",SCRIPT_ID:"scriptid",ID:"id",INACTIVE:"isinactive",SUBSIDIARY:"subsidiary",ENTITY:"entity",CUSTOM_STANDARD:"customstandard",TYPE:"type",TRAN_ID:"tranid",RECORD_TYPE:"recordType",APPROVAL_STATUS:"approvalstatus",TRANSACTION_STYLE:"transactionstyle"},SUITEAPPS:{EI:{ID:"436209",NAME:"Electronic Invoicing"}},LICENSES:{EI:"Electronic Invoicing",NSEB:"Netsuite Electronic Business",Avalara:"Avalara Processing For Netsuite Electronic Invoicing"},ROLE_PERMISSIONS:{GEN_AND_SEND_AR:"custrecord_permission_gen_and_send_ar"},TRANSLATE_TYPES:{MESSAGE:"message",TITLE:"title",LABEL:"label"},CUSTOM_TRANSACTION_STYLE:{BASIC:"BASIC",JOURNAL:"JOURNAL",PURCHASE:"PURCHASE",SALES:"SALES"}}}.apply(n,[]))||(e.exports=t)},4:(e,n,t)=>{var s,E;s=[t(7789)],void 0===(E=function(e){var n={};return n[e.RECORD_TYPES.TRANSACTION_RESPONSE_TYPE]={ACCEPTED:"VAL_ACCEPTED",FOR_CANCELLATION:"VAL_FOR_CANCELLATION",FOR_REJECTION:"VAL_FOR_REJECTION",REJECTED:"VAL_REJECTED",ACKNOWLEDGED:"VAL_ACKNOWLEDGED"},n}.apply(n,s))||(e.exports=E)},2642:(e,n,t)=>{var s,E;s=[t(7789)],void 0===(E=function(e){var n=e.SCRIPTS,t={};return t[n.GENERATE_TRANSACTION_RESPONSE]={DEFAULT_DEPLOYMENT:"customdeploy_psg_ei_generate_trans_resp"},t[n.SEND_TRANSACTION_RESPONSE]={DEFAULT_DEPLOYMENT:"customdeploy_psg_ei_send_trans_res_su"},t[n.PREVIEW_DOWNLOAD]={DEFAULT_DEPLOYMENT:"customdeploy_ei_content_service_su"},t}.apply(n,s))||(e.exports=E)},422:(e,n)=>{var t;void 0===(t=function(){return{BUTTONS:{GENERATE_TRANSACTION_RESPONSE:{LABEL_TRANSLATION_CODE:"transres.generate.button.label",LABEL:"Generate"},SEND_TRANSACTION_RESPONSE:{LABEL_TRANSLATION_CODE:"transres.send.button.label",LABEL:"Send"}},FIELDS:{REASON_FOR_CANCELLATION:{LABEL_TRANSLATION_CODE:"transresponse.reason.for.cancellation.label",LABEL:"Reason For Cancellation"},REASON_FOR_REJECTION:{LABEL_TRANSLATION_CODE:"transresponse.reason.for.rejection.label",LABEL:"Reason For Rejection"}},BANNERS:{GENERATE_TRANSACTION_RESPONSE_SUCCESS:{MESSAGE_TRANSLATION_CODE:"transresponse.gen.success.msg",MESSAGE:"Transaction Response Content Ready to Be Sent"},GENERATE_TRANSACTION_RESPONSE_FAILURE:{TITLE_TRANSLATION_CODE:"transresponse.gen.failure.title",TITLE:"Generation Unsuccessful",MESSAGE_TRANSLATION_CODE:"transresponse.gen.failure.msg",MESSAGE:"An error occurred during generation. See the Error Details tab for more information"},SEND_TRANSACTION_RESPONSE_SUCCESS:{MESSAGE_TRANSLATION_CODE:"transresponse.sending.success",MESSAGE:"Transaction Response Content has been sent."},SEND_TRANSACTION_RESPONSE_FAILURE:{TITLE_TRANSLATION_CODE:"send.tr.unsuccess.title",TITLE:"Sending Unsuccessful",MESSAGE_TRANSLATION_CODE:"transresponse.sending.error",MESSAGE:"Error occurred during sending. Please check the Error Details subtab for more details."},SEND_TRANSACTION_RESPONSE_IN_PROGRESS:{MESSAGE_TRANSLATION_CODE:"transresponse.sending.in.progress",MESSAGE:"Transaction Response Content sending is in progress."},GENERATE_TRANSACTION_RESPONSE_IN_PROGRESS:{MESSAGE_TRANSLATION_CODE:"transresponse.generation.in.progress",MESSAGE:"Transaction Response Content generation is in progress."},NO_GEN_AND_SEND_TR_PERMISSION:{TITLE_TRANSLATION_CODE:"transresponse.no.gen.and.send.ar.access.title",TITLE:"Transaction Response Content cannot be Generated or Sent.",MESSAGE_TRANSLATION_CODE:"transresponse.no.gen.and.send.ar.access.msg",MESSAGE:"The transaction response content cannot be generated or sent due to insufficient permissions. Contact a user with the Administrator role."},REQ_LICENSES_MISSING:{TITLE_TRANSLATION_CODE:"trans.res.req.license.missing.title",TITLE:"No Active License(s) present.",MESSAGE_TRANSLATION_CODE:"trans.res.req.license.missing.msg",MESSAGE:"This account does not have active {REQ_LICENSES} license(s). To send transaction response content, please contact your account administrator to purchase the license(s)",EI:{FC_NOT_SET:{MESSAGE_TRANSLATION_CODE:"trans.res.ei.fc.not.set.msg",MESSAGE:"This account does not have an active license for multi-country use of Electronic Invoicing. To generate transaction response content, please contact your account administrator to configure the E-Document Country for Free Use under the parent company record in Electronic Invoicing Preferences page."},FC_NOT_MATCHING:{MESSAGE_TRANSLATION_CODE:"trans.res.ei.fc.not.matching.msg",MESSAGE:"This account does not have an active license for multi-country use of Electronic Invoicing. To generate transaction response content, please contact your account administrator to purchase a license."}},NO_LC_BUNDLE:{MESSAGE_TRANSLATION_CODE:"trans.res.lc.not.installed",MESSAGE:"The NetSuite SuiteApps License Client is not available in your account. To generate or send transaction response content, please install this SuiteApp."}}},ALERTS:{SENDING_TR_IN_PROGRESS_ALERT_CODE:{MESSAGE_TRANSLATION_CODE:"transresponse.sending.in.progress.alert",MESSAGE:"Sending is in progress."},GENERATION_TR_IN_PROGRESS_ALERT_CODE:{MESSAGE_TRANSLATION_CODE:"transresponse.generation.in.progress.alert",MESSAGE:"Generation is in progress."},GENERATION_ERROR_IN_TR_ALERT_CODE:{MESSAGE_TRANSLATION_CODE:"transresponse.generation.error.alert",MESSAGE:"Error generating the transaction response. Please try again later."},SENDING_ERROR_IN_TR_ALERT_CODE:{MESSAGE_TRANSLATION_CODE:"transresponse.sending.error.alert",MESSAGE:"Error sending the transaction response. Please try again later."}},DIALOGS:{SEND_TR_CANCELLATION:{TITLE_TRANSLATION_CODE:"value.val.send.dialog.cancellation.title",TITLE:"Send Cancellation Request?",MESSAGE_TRANSLATION_CODE:"value.val.send.dialog.ok.cancel",MESSAGE:"A cancellation request transaction response is being sent.&lt;br/&gt;Please note that this action cannot be undone.",BUTTONS:{SEND:{LABEL:"Send"},CANCEL:{LABEL:"Cancel"}}},SEND_TR_REJECTION:{TITLE_TRANSLATION_CODE:"value.val.send.dialog.rejection.title",TITLE:"Send Rejection Request?",MESSAGE_TRANSLATION_CODE:"value.val.send.dialog.ok.reject",MESSAGE:"A rejection request transaction response is being sent.&lt;br/&gt;Please note that this action cannot be undone.",BUTTONS:{SEND:{LABEL_TRANSLATION_CODE:"",LABEL:"Send"},CANCEL:{LABEL_TRANSLATION_CODE:"",LABEL:"Cancel"}}},SEND_TR_REJECTED:{TITLE_TRANSLATION_CODE:"value.val.send.dialog.rejected.title",TITLE:"Send Rejected Request?",MESSAGE_TRANSLATION_CODE:"value.val.send.dialog.ok.rejected",MESSAGE:"A rejected type transaction response is being sent.&lt;br/&gt;Please note that this action cannot be undone.",BUTTONS:{SEND:{LABEL_TRANSLATION_CODE:"",LABEL:"Send"},CANCEL:{LABEL_TRANSLATION_CODE:"",LABEL:"Cancel"}}}}}}.apply(n,[]))||(e.exports=t)},9502:(e,n,t)=>{var s,E;s=[t(5389),t(6834)],void 0===(E=function(e,n){var t;function s(s){t||(t=e.getCurrentUser().getPreference("LANGUAGE")),s=(s=s.toLowerCase()).replace(new RegExp(".".replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),"_");var E="";try{E=n.get({collection:"custcollection_ei_translations",key:s,locale:t})()}catch(e){log.error(e.name,e.message+"\n"+e.stack)}return E}return{getString:s,getStringMap:function(e){for(var n={},t=0;t<e.length;t++){var E=e[t];n[E]=s(E)}return n},setLocale:function(e){t=e}}}.apply(n,s))||(e.exports=E)},9732:n=>{"use strict";n.exports=e},5389:e=>{"use strict";e.exports=n},6834:e=>{"use strict";e.exports=t},7810:e=>{"use strict";e.exports=s},8445:e=>{"use strict";e.exports=E},5728:e=>{"use strict";e.exports=r}},a={},function e(n){var t=a[n];if(void 0!==t)return t.exports;var s=a[n]={exports:{}};return S[n](s,s.exports,e),s.exports}(8233);var S,a}));