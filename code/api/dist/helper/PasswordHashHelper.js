"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class PasswordHashHelper {
    constructor() {
    }
    MakeHash(pwd) {
        let salt = "books_and_things_";
        return crypto_1.createHash("sha256").update(salt + pwd).digest("hex");
    }
    MakeToken(prefix, suffix, iterations) {
        var result = prefix;
        for (var i = 0; i < iterations; i++) {
            result += Math.random().toString(36).substring(2, 15);
        }
        result += suffix;
        return result;
    }
    GetStoredUserName(username) {
        return "_user_" + username;
    }
}
exports.PasswordHashHelper = PasswordHashHelper;
//# sourceMappingURL=PasswordHashHelper.js.map