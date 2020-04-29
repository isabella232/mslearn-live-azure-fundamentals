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
        // See if the user details are correct
        if (info.UserName == null || info.UserName.length < 3) {
            context.res = {
                status: 400,
                body: "The username must be supplied and be at least 6 characters"
            };
            return;
        }
        if (info.Password == null || info.Password.length < 8) {
            context.res = {
                status: 400,
                body: "The user password must be supplied and be at least 8 characters"
            };
            return;
        }
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
        if (resources.resources.length > 0) {
            // The user already exists and we need to return an error
            context.res = {
                status: 400,
                body: "The user cannot be registered as a user with that name already exists"
            };
            return;
        }
        // Create a token and appropriate hash    
        let passwordHash = hash.MakeHash(info.Password);
        let generatedToken = hash.MakeToken(info.UserName + "_", "_token", 4);
        // Create an user item in the database with an appropriate token
        var userToStore = {
            "id": storedId,
            "itemType": "user",
            "username": info.UserName,
            "hash": passwordHash,
            "token": generatedToken
        };
        let { resource } = yield container.items.create(userToStore);
        // return the Login Details back from the user account for the app
        var returnedLoginDetails = {
            "username": userToStore.username,
            "token": userToStore.token
        };
        context.res = {
            body: returnedLoginDetails
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map