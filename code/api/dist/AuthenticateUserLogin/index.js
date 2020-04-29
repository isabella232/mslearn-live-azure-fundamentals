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
const PasswordHashHelper_1 = require("../helper/PasswordHashHelper");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = req.body;
        // Look for the user account matching the username
        let data = new DataConnection_1.DataConnection();
        let container = data.GetContainer();
        let hash = new PasswordHashHelper_1.PasswordHashHelper();
        let storedId = hash.GetStoredUserName(info.UserName);
        // See if the user already exists
        var query = {
            query: "select * from items i where i.itemType = 'user' and i.id = @id",
            parameters: [
                {
                    name: "@id",
                    value: storedId
                }
            ]
        };
        let iterator = container.items.query(query);
        let resources = yield iterator.fetchAll();
        if (resources.resources.length == 0) {
            // The user already exists and we need to return an error
            context.res = {
                status: 401,
                body: "The user/password details do not exist or match"
            };
            return;
        }
        // Return the token if the user matches
        let passwordHash = hash.MakeHash(info.Password);
        var user = resources.resources[0];
        if (user.hash != passwordHash) {
            // The user already exists and we need to return an error
            context.res = {
                status: 401,
                body: "The user/password details do not exist or match"
            };
            return;
        }
        let loginResult = {
            "username": user.username,
            "token": user.token
        };
        context.res = {
            body: loginResult
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map