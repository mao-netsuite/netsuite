define(["../lib/dao_factory", "N/record"], function (daoFactory, record) {
    var RECORD_TYPE = "customrecord_psg_ei_trans_res";
    var FIELD_MAP = {
        transaction: "custrecord_psg_ei_trans_res_tran_id",
        status: "custrecord_psg_ei_trans_res_status",
        responseIssueDate: "custrecord_psg_ei_trans_res_date",
        direction: "custrecord_psg_ei_trans_res_direction",
        sentStatus: "custrecord_psg_ei_trans_res_sent",
        inboundEDoc: "custrecord_psg_ei_trans_res_inbound",
    };
    var daoParams = {
        recordType: RECORD_TYPE,
        fieldMap: FIELD_MAP,
    };

    var dao = daoFactory.getDAO(daoParams);

    function create(transactionResponse) {
        return dao.create(transactionResponse);
    }

    function deleteTransactionResponse(transactionResponseId) {
        record.delete({
            type: RECORD_TYPE,
            id: transactionResponseId,
        });
    }

    return {
        create: create,
        deleteTransactionResponse: deleteTransactionResponse,
    };
});
