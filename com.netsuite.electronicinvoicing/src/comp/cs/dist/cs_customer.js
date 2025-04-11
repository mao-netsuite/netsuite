/**
 * @preserve
 * @NApiVersion 2.1
 * @NScriptName E-Invoicing Customer CS
 * @NScriptId _ei_customer_cs
 * @NScriptType clientscript
 */

/*! For license information please see cs_customer.js.LICENSE.txt */
define(["N/error","N/query","N/record","N/runtime","N/search","N/translation"],((e,t,n,r,i,s)=>{return a={6810:(e,t,n)=>{var r,i;r=[n(4528),n(9950),n(3623),n(5389)],void 0===(i=function(e,t,n,r){var i="customer";return{validateIndividualCustomer:function(t){e.setEntityType(i);var r=[];return t.getValue("email")||r.push(e.hasNoEmail()),n.consolidateValidationResults(r),n},validateRecipients:function(r,s,a){e.setEntityType(i);var o=[],c=r.getLineCount(s);if(c>10)o.push(e.hasExceededRecipients());else if(c>0){for(var u=[],d=0;d<c;d++){var l=r.getSublistValue({sublistId:s,fieldId:a,line:d});u.push(l)}var p=t.loadContacts(u);o.push(e.validateContactsEmails(p))}else o.push(e.hasNoRecipients());return n.consolidateValidationResults(o),n},validateSenders:function(t,r){e.setEntityType(i);var s=[];return t.getLineCount(r)<1&&s.push(e.hasNoSenders()),n.consolidateValidationResults(s),n},validateSenderEmail:function(t,s,a,o,c){e.setEntityType(i);var u,d=[];u=c===r.ContextType.USER_INTERFACE?t.getCurrentSublistValue({sublistId:s,fieldId:a}):t.getSublistValue({sublistId:s,fieldId:a,line:o});var l=t.findSublistLineWithValue({sublistId:s,fieldId:a,value:u});return-1!==l&&l!==o&&d.push(e.senderExists()),n.consolidateValidationResults(d),n},validateSenderDomain:function(r){e.setEntityType(i);var s=[],a=r.getValue("custentity_edoc_sender_domain");return a&&t.getCustomersUsingSenderDomain(a,r.id)>0&&s.push(e.domainExists()),n.consolidateValidationResults(s),n},validateWebServiceIdentifier:function(r){e.setEntityType(i);var s=[],a=r.getValue("custentity_edoc_ws_id");return a&&t.getCustomersUsingWebServiceIdentifier(a,r.id)>0&&s.push(e.webServiceIdentifierExists()),n.consolidateValidationResults(s),n}}}.apply(t,r))||(e.exports=i)},4528:(e,t,n)=>{var r,i;r=[n(3899),n(3776),n(7903),n(9502)],void 0===(i=function(e,t,n,r){var i,s,a="customer.noemail",o="customer.contactnoemail",c="customer.norecipients",u="customer.maxrecipientexceeded",d="customer.nosenders",l="customer.existingsender",p="customer.existingdomain",g="customer.existingidentifier",_="vendor.noemail",f="vendor.contactnoemail",v="vendor.norecipients",m="vendor.maxrecipientexceeded",y="vendor.nosenders",h="vendor.existingsender",S="vendor.existingdomain",x="vendor.existingidentifier",I="msg_no_email",M="msg_contact_no_email",C="msg_no_recipients",E="msg_exceeded_recipients",V="msg_no_senders",R="msg_existing_sender",b="msg_existing_domain",T="msg_existing_vendor_id";function N(){var e=[a,o,c,u,d,l,p,g,_,f,v,m,y,h,S,x],t=r.getStringMap(e);i={},"vendor"==s?(i[I]=t[_],i[M]=t[f],i[C]=t[v],i[E]=t[m],i[V]=t[y],i[R]=t[h],i[b]=t[S],i[T]=t[x]):(i[I]=t[a],i[M]=t[o],i[C]=t[c],i[E]=t[u],i[V]=t[d],i[R]=t[l],i[b]=t[p],i[T]=t[g])}return{hasNoEmail:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[I]),t},hasNoRecipients:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[C]),t},hasNoSenders:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[V]),t},senderExists:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[R]),t},domainExists:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[b]),t},webServiceIdentifierExists:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[T]),t},validateContactsEmails:function(r){var s;if(i||N(),!r)throw s={name:"REQUIRED_PARAM_MISSING",message:"Contacts array required for validation.",notifyOff:!0},log.error(s.name,s.message),n.create(s);if(!util.isArray(r))throw s={name:"PARAM_IS_NOT_AN_ARRAY",message:"Contacts parameter is not an array.",notifyOff:!0},log.error(s.name,s.message),n.create(s);for(var a=!0,o=e.create(),c=[],u=0;u<r.length;u++){var d=r[u],l=d.getValue("email"),p=d.getValue("entityid");l||(a=!1,c.push(p))}if(o.setValidity(a),!o.isValid()){var g={CONTACTNAMES:c.join(", ")};t.setString(i[M]),t.replaceParameters(g),o.setMessage(t.toString())}return o},hasExceededRecipients:function(){i||N();var t=e.create();return t.setValidity(!1),t.setMessage(i[E]),t},setEntityType:function(e){i=null,s=e}}}.apply(t,r))||(e.exports=i)},7854:(e,t,n)=>{var r,i;r=[n(6810),n(8521),n(5389)],void 0===(i=function(e,t,n){var r="recmachcustrecord_psg_ei_email_sender_customer";return{saveRecord:function(n){var i=n.currentRecord,s=i.getValue("custentity_psg_ei_entity_edoc_standard"),a=i.getValue("custentity_edoc_sender_domain"),o=i.getValue("custentity_edoc_use_sender_list"),c=i.getValue("custentity_edoc_ws_id"),u=!0;if(s){var d,l=function(e){var n=!1,r={edocumentstandard:e,sendingchannel:"email"};return t.getSendingMethods(r).length>0&&(n=!0),n}(s);l&&((d="T"==i.getValue("isperson")?e.validateIndividualCustomer(i):e.validateRecipients(i,"recmachcustrecord_psg_ei_email_recipient_cust","custrecord_psg_ei_email_recipient_cont")).isSuccessful()||(alert(d.getMessage()),u=!1))}if(!0===o){var p=e.validateSenders(i,r);p.isSuccessful()||(alert(p.getMessage()),u=!1)}if(a){var g=e.validateSenderDomain(i);g.isSuccessful()||(alert(g.getMessage()),u=!1)}if(c){var _=e.validateWebServiceIdentifier(i);_.isSuccessful()||(alert(_.getMessage()),u=!1)}return u},validateLine:function(t){var i=t.currentRecord,s=!0;if(t.sublistId===r){var a=i.getCurrentSublistIndex(r),o=e.validateSenderEmail(i,r,"custrecord_psg_ei_cust_sender_email",a,n.executionContext);o.isSuccessful()||(alert(o.getMessage()),s=!1)}return s}}}.apply(t,r))||(e.exports=i)},9950:(e,t,n)=>{var r,i;r=[n(5239),n(1303),n(6189)],void 0===(i=function(e,t,n){var r={entityid:"entityid",internalid:"internalid"},i={recordType:"customer",fieldMap:r},s=e.getDAO(i);return{create:function(e){return s.create(e)},loadContacts:function(e){var n=[];return t.create({type:"contact",columns:["entityid","email"],filters:["internalid","anyof",e]}).run().each((function(e){return n.push(e),!0})),n},loadEIRecipients:function(e){var n=[];return t.create({type:"customrecord_psg_ei_email_recipient",columns:[t.createColumn({name:"email",join:"custrecord_psg_ei_email_recipient_cont"})],filters:["custrecord_psg_ei_email_recipient_cust","is",e]}).run().each((function(e){var t=e.getValue({name:"email",join:"custrecord_psg_ei_email_recipient_cont"});return n.push(t),!0})),n},getCustomersUsingSenderDomain:function(e,t){var i=n.create({type:n.Type.CUSTOMER}),s=[],a=i.createCondition({fieldId:"custentity_edoc_sender_domain",operator:n.Operator.IS,values:e});if(s.push(a),t){var o=i.createCondition({fieldId:"id",operator:n.Operator.EQUAL_NOT,values:t});s.push(o)}return i.condition=i.and(s),i.columns=[i.createColumn({fieldId:r.entityid})],i.run().asMappedResults().length},getCustomersUsingWebServiceIdentifier:function(e,t){var i=n.create({type:n.Type.CUSTOMER}),s=[],a=i.createCondition({fieldId:"custentity_edoc_ws_id",operator:n.Operator.IS,values:e});if(s.push(a),t){var o=i.createCondition({fieldId:"id",operator:n.Operator.EQUAL_NOT,values:t});s.push(o)}return i.condition=i.and(s),i.columns=[i.createColumn({fieldId:r.entityid})],i.run().asMappedResults().length},getCustomerUsingIdentifierAndSender:function(e,t){var i=[],s=n.create({type:n.Type.CUSTOMER}),a=s.createCondition({fieldId:"custentity_edoc_ws_sender",operator:n.Operator.EQUAL,values:t}),o=s.createCondition({fieldId:"custentity_edoc_ws_id",operator:n.Operator.IS,values:e}),c=s.createCondition({fieldId:"custentity_psg_ei_entity_edoc_standard",operator:n.Operator.EMPTY_NOT});s.condition=s.and([a,o,c]),s.columns=[s.createColumn({fieldId:"id"}),s.createColumn({fieldId:r.entityid})];for(var u=s.run().asMappedResults(),d=0;d<u.length;d++)i.push(u[d]);return i}}}.apply(t,r))||(e.exports=i)},8521:(e,t,n)=>{var r,i;r=[n(5239),n(1303)],void 0===(i=function(e,t){var n="customrecord_ei_sending_method",r={recordType:n,fieldMap:{edocumentstandard:"custrecord_psg_ei_edoc_standard",sendingscript:"custrecord_ei_sending_method_script",sendingchannel:"custrecord_ei_sending_method_channel"}},i=e.getDAO(r);return{create:function(e){return i.create(e)},getSendingMethods:function(e){var r=[],i=[];return e.edocumentstandard&&(i.length>0&&i.push("and"),i.push(["custrecord_psg_ei_edoc_standard","is",e.edocumentstandard])),e.sendingchannel&&(i.length>0&&i.push("and"),i.push(["custrecord_ei_sending_method_channel","is",e.sendingchannel])),t.create({type:n,columns:[],filters:i}).run().each((function(e){var t={eDocumentStandard:e.getValue({name:"custrecord_psg_ei_edoc_standard"}),sendingScript:e.getValue({name:"custrecord_ei_sending_method_script"}),sendingChannel:e.getValue({name:"custrecord_ei_sending_method_channel"})};return r.push(t),!0})),r}}}.apply(t,r))||(e.exports=i)},5239:(e,t,n)=>{var r,i;r=[n(7266)],void 0===(i=function(e){function t(t){var n=t.recordType,r=t.fieldMap,i=t.subListMaps;function s(e){for(var t=e.record,n=e.subList,r=e.subListMap,i=t.getLineCount({sublistId:n}),s=[],a=0;a<i;a++){var o={};for(var c in r)o[c]=t.getSublistValue({sublistId:n,fieldId:r[c],line:a});s.push(o)}return s}this.create=function(t,i,s){var a=!1,o=!1,c=!1;i&&i.hasOwnProperty("isDynamic")&&(a=i.isDynamic);var u=e.create({type:n,isDynamic:a});for(var d in r){var l=r[d];u.setValue(l,t[d])}return s&&(s.hasOwnProperty("enableSourcing")&&(o=s.enableSourcing),s.hasOwnProperty("ignoreMandatoryFields")&&(c=s.ignoreMandatoryFields)),u.save({enableSourcing:o,ignoreMandatoryFields:c})},this.retrieve=function(t){var a,o={subLists:{}},c=e.load({type:n,id:t});for(var u in r)o[u]=c.getValue(r[u]);var d=o.subLists;for(var l in i)a={record:c,subList:l,subListMap:i[l]},d[l]=s(a);return o},this.retreiveNSRecord=function(t){return e.load({type:n,id:t})}}return{getDAO:function(e){return new t(e)}}}.apply(t,r))||(e.exports=i)},3623:(e,t)=>{var n;void 0===(n=function(){var e,t=!0;return{consolidateValidationResults:function(n){for(var r=!0,i=[],s=0;s<n.length;s++){var a=n[s];r=r&&a.isValid(),a.getMessage()&&i.push(a.getMessage())}t=r,e=i.join("\n")},isSuccessful:function(){return t},getMessage:function(){return e}}}.apply(t,[]))||(e.exports=n)},3776:(e,t,n)=>{var r,i;r=[n(7903)],void 0===(i=function(e){var t;return{setString:function(n){if(!n)throw e.create({name:"REQUIRED_PARAM_MISSING",message:"Parameter of method setString of String Formatter must not be null or undefined."});t=n},replaceParameters:function(e){for(var n in e){var r=new RegExp("\\{"+n+"\\}","g");t=t.replace(r,e[n])}},toString:function(){return t.toString()}}}.apply(t,r))||(e.exports=i)},9502:(e,t,n)=>{var r,i;r=[n(5389),n(6834)],void 0===(i=function(e,t){var n;function r(r){n||(n=e.getCurrentUser().getPreference("LANGUAGE")),r=(r=r.toLowerCase()).replace(new RegExp(".".replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),"_");var i="";try{i=t.get({collection:"custcollection_ei_translations",key:r,locale:n})()}catch(e){log.error(e.name,e.message+"\n"+e.stack)}return i}return{getString:r,getStringMap:function(e){for(var t={},n=0;n<e.length;n++){var i=e[n];t[i]=r(i)}return t},setLocale:function(e){n=e}}}.apply(t,r))||(e.exports=i)},3899:(e,t)=>{var n;void 0===(n=function(){function e(){var e,t;this.setValidity=function(t){e=t},this.isValid=function(){return e},this.setMessage=function(e){t=e},this.getMessage=function(){return t}}return{create:function(){return new e}}}.apply(t,[]))||(e.exports=n)},7903:t=>{"use strict";t.exports=e},6189:e=>{"use strict";e.exports=t},7266:e=>{"use strict";e.exports=n},5389:e=>{"use strict";e.exports=r},1303:e=>{"use strict";e.exports=i},6834:e=>{"use strict";e.exports=s}},o={},function e(t){var n=o[t];if(void 0!==n)return n.exports;var r=o[t]={exports:{}};return a[t](r,r.exports,e),r.exports}(7854);var a,o}));