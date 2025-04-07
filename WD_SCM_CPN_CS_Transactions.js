/**
 * (c) 2015 NetSuite Inc.  User may not copy, modify, distribute, or re-bundle or otherwise make available this code.
 *
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       07 Dec 2015     jsintos
 * 1.01       05 Apr 2016     msy
 *
 */
var SCM;
if (!SCM) { SCM = {}; };
if (!SCM.CPN) { SCM.CPN = {}; };

SCM.CPN.Transactions_CS = new function () {
    this.mode = '';
    var dictionary;
    
    this.pageInit = function _pageInit(type) {
        this.init(type);
    };

    this.fieldChanged = function _fieldChanged(type, name, linenum) {
        // No processing if feature preference turned off
        if (!SCM.CPN.Library.Record.isCpnEnabled()) return;
        dictionary = dictionary || new SCM.translation.Dictionary();

        try {
            if (type == 'item') {
                if (name == SCM.CPN.CustomerPartNumber_Record.colName) {
                    var itemCode = nlapiGetCurrentLineItemValue('item', SCM.CPN.CustomerPartNumber_Record.colName);

                    if (!SCM.Library.Objects.isUndefinedNullOrEmpty(itemCode)) {

                        var customer = nlapiGetFieldValue('entity');

                        var item = SCM.CPN.Library.Record.getItem(itemCode, customer);

                        if (!SCM.Library.Objects.isUndefinedNullOrEmpty(item)) {
                            nlapiSetCurrentLineItemValue('item', 'item', item);
                        } else {
                            alert(dictionary.get('CPN.ITEM_INACTIVE'));
                            nlapiSetCurrentLineItemValue('item', SCM.CPN.CustomerPartNumber_Record.colName, '');
                        }
                    }
                } else if (name == 'item') {
                    var item = nlapiGetCurrentLineItemValue('item', 'item');
                    var code = '';

                    if (!SCM.Library.Objects.isUndefinedNullOrEmpty(item)) {
                        var customer = nlapiGetFieldValue('entity');

                        code = SCM.CPN.Library.Record.getCustomerPartNumber(item, customer);
                    }
                    nlapiSetCurrentLineItemValue('item', SCM.CPN.CustomerPartNumber_Record.colName, code, false);
                }
            }
        } catch(e) {
            alert(dictionary.get('CPN.ACCT_SETUP_INVALID'));
        }
    };

    this.validateField = function _validateField(type, name, linenum) {
        dictionary = dictionary || new SCM.translation.Dictionary();

        // No processing if feature preference turned off
        if (SCM.CPN.Library.Record.isCpnEnabled()) {
            if (name == 'entity' && (this.mode == 'edit' || this.mode == 'copy')) {
                return confirm(dictionary.get('CPN.TRANSACTION_CUSTOMER_CHANGED'));
            }
        }

        return true;
    };

    this.init = function _init(type) {
        if (type) {
            this.mode = type;
        } else {
            this.mode = '';
        }
    };
};

//because workflow's BeforeUserEdit happens before client script's pageInit() and most events depend on this initialization{code}
SCM.CPN.Transactions_CS.init();