/**
 * @preserve
 * 
 * @NApiVersion 2.1
 * @NScriptType clientscript
 */

/*! For license information please see cs_ei_trans_response_template.js.LICENSE.txt */
define((()=>{return e={5332:(e,t)=>{var r;void 0===(r=function(){var e="custpage_ei_custom_data_source",t="custpage_psg_ei_template_supported_transtype";return{fieldChanged:function(r){const s=r.currentRecord,u=r.fieldId;u===e?s.setText({fieldId:"custrecord_psg_ei_transres_outplug",text:s.getValue(e)}):u===t&&s.setValue({fieldId:"custrecord_psg_ei_transres_trans_type",value:s.getValue(t)})}}}.apply(t,[]))||(e.exports=r)}},t={},function r(s){var u=t[s];if(void 0!==u)return u.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,r),a.exports}(5332);var e,t}));