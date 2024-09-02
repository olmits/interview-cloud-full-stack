import {
    INTERNAL_SERVER_ERROR,
    GRAPHQL_VALIDATION_FAILED,
} from "./constants.js";

export const formatError = (formattedError, error) => {
    switch (formattedError.extensions.code) {
        case GRAPHQL_VALIDATION_FAILED:
            return { message: "Your query doesn't match the schema. Try double-checking it!" };
        case INTERNAL_SERVER_ERROR:
            return { message: "Internal server error" };
        default:
            return formattedError;
    }
}
