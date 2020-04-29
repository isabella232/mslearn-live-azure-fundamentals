import * as sha256 from "fast-sha256";
import { createHash } from "crypto";

export class PasswordHashHelper {    
    constructor()
    {
    }

    public MakeHash(pwd: string)
    {
        let salt = "books_and_things_";
        return createHash("sha256").update(salt + pwd).digest("hex");
    }

    public MakeToken(prefix: string, suffix: string, iterations: number)
    {
        var result = prefix;
        for (var i=0; i < iterations; i++)
        {
            result += Math.random().toString(36).substring(2, 15);
        }
        result += suffix;
        return result;
    }

    public GetStoredUserName(username: string)
    {
        return "_user_" + username;
    }
}
