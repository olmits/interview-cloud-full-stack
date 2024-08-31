import { connection } from "../connection.js";

export const getDevices = async (_, args, context) => {
    return connection.raw("select * from devices");
};