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
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id == null) {
            context.res = {
                status: 400,
                body: "Please pass the id of the product on the url"
            };
            return;
        }
        try {
            let data = new DataConnection_1.DataConnection();
            let container = data.GetContainer();
            const productToUpdate = req.body;
            let { resource } = yield container.item(id, id).replace(productToUpdate);
            context.res = {
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