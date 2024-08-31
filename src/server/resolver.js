import { getDevices } from "./query/getDevices.js";

export const resolvers = {
    Query: {
        getDevices,
    },
}
