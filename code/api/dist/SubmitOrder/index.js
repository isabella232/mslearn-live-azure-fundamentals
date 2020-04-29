"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataConnection_1 = require("../helper/DataConnection");
const guid_typescript_1 = require("guid-typescript");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = new DataConnection_1.DataConnection();
            let userid = yield data.GetUserIdFromToken(context);
            const orderToCreate = req.body;
            orderToCreate.itemType = "order";
            orderToCreate.id = guid_typescript_1.Guid.create().toString();
            orderToCreate.userAccount = userid;
            orderToCreate.status = "Submitted";
            orderToCreate.dateSubmitted = Date.now().toString();
            // Check that the amount >= $0
            if (orderToCreate.TotalPrice < 0) {
                context.res = {
                    status: 500,
                    body: "The order amount is incorrect. Negative orders are not allowed"
                };
                return;
            }
            // We're all good, let the data through
            let container = data.GetContainer();
            let { resource } = yield container.items.create(orderToCreate);
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: resource
            };
        }
        catch (err) {
            context.res = {
                status: 500,
                body: err.message
            };
        }
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map