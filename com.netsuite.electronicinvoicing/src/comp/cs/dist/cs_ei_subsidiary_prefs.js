/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 */

/*! For license information please see cs_ei_subsidiary_prefs.js.LICENSE.txt */
define((()=>{return e={811:(e,r)=>{var t;void 0===(t=function(){const e="custpage_psg_ei_sub_filtered_free_country",r="custpage_psg_ei_filtered_edoc_sender",t="custrecord_psg_ei_supp_trans_res",s="custrecord_psg_ei_send_meth_trans_res";return{pageInit:function(e){const r=e.currentRecord;r.getValue({fieldId:t})||(r.getField({fieldId:s}).isDisabled=!0)},fieldChanged:function(d){const i=d.currentRecord,_=d.fieldId;if(_===e&&i.setText({fieldId:"custrecord_psg_ei_sub_edoc_free_country",text:i.getValue(e)}),_===r&&i.setValue({fieldId:"custrecord_psg_ei_sub_sender",value:i.getValue(r)}),_===t){var u=i.getField({fieldId:s});i.getValue({fieldId:t})?u.isDisabled=!1:(i.setValue({fieldId:s,value:""}),u.isDisabled=!0)}}}}.apply(r,[]))||(e.exports=t)}},r={},function t(s){var d=r[s];if(void 0!==d)return d.exports;var i=r[s]={exports:{}};return e[s](i,i.exports,t),i.exports}(811);var e,r}));