/**
 * Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * Creates inbound conversion batch record.
 *
 * Version    Date            Author           Remarks
 * 1.00       10 Nov 2016	  esia
 *
 */

define(["../../data/dao_convert_batch", "N/format"], function (
    batchDao,
    formatter
) {
    /**
     * Creates inbound conversion batch. Returns the existing Batch Id if there is a match.
     *
     * @param parameters Object containing batch parameters
     *
     * @returns existingBatchIds Array containing existing Batch Ids or new Batch Id
     */
    function create(parameters) {
        var date_created_start = parameters.date_created_start;
        var date_created_end = parameters.date_created_end;
        var vendor = parameters.vendor;
        var transType = parameters.trans_type;
        var existingBatchIds = batchDao.getExistingBatch(parameters);
        if (existingBatchIds.length === 0) {
            var batchObj = {
                status: batchDao.status.QUEUED,
                vendor: vendor,
                trans_type: transType,
                date_created_start: formatter.parse({
                    value: date_created_start,
                    type: formatter.Type.DATE,
                }),
                date_created_end: formatter.parse({
                    value: date_created_end,
                    type: formatter.Type.DATE,
                }),
            };

            existingBatchIds.push(batchDao.create(batchObj));
        }

        return existingBatchIds;
    }

    return {
        create: create,
    };
});
