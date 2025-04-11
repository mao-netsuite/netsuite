/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 *
 * Version    Date            Author           Remarks
 * 1.00       19 Oct 2015     ssantiago
 *
 */

define(["../../data/dao_einvoice_batch", "N/format"], function (
    batchDao,
    formatter
) {
    /**
     * Creates outbound batch. Returns the existing Batch Id if there is a match.
     * @param parameters Object containing batch parameters
     * @returns existingBatchIds Array containing existing Batch Ids or new Batch Id
     */
    function create(parameters) {
        var subsidiary = parameters.subsidiary;
        var entity_type = parameters.entity_type;
        var customer = parameters.customer;
        var vendor = parameters.vendor;
        var transaction_date_start = parameters.transaction_date_start;
        var transaction_date_end = parameters.transaction_date_end;
        var transaction_type = parameters.transaction_type
            ? encodeURIComponent(parameters.transaction_type)
            : null;
        var transactionTypeArray = transaction_type
            ? transaction_type.split("%05")
            : [];
        var sendingType = parameters.sendingType;

        var existingBatchIds = batchDao.getExistingBatch(parameters);

        if (existingBatchIds.length === 0) {
            var batchObj = {
                status: batchDao.Status.QUEUED,
                subsidiary: subsidiary,
                entity_type: entity_type,
                customer: customer,
                vendor: vendor,
                transaction_date_start: formatter.parse({
                    value: transaction_date_start,
                    type: formatter.Type.DATE,
                }),
                transaction_date_end: formatter.parse({
                    value: transaction_date_end,
                    type: formatter.Type.DATE,
                }),
                transaction_type: transactionTypeArray,
                sendingType: sendingType,
            };

            existingBatchIds.push(batchDao.create(batchObj));
        }

        return existingBatchIds;
    }

    return {
        create: create,
    };
});
