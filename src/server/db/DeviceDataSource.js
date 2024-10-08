import { SQLDataSource } from "datasource-sql";

class DeviceDataSource extends SQLDataSource {
    async getDevices(pagination, order) {
        const { offset, limit } = pagination;
        const { orderBy, orderDirection } = order;

        const orderByMapping = {
            name: [{ column: "devices.name", order: orderDirection }],
            userEmail: [{ column: "devices.user_email", order: orderDirection }],
            updatedDate: [{ column: "latest_updates.most_recent_finished", order: orderDirection }],
            version: [
                { column: "versions.major", order: orderDirection },
                { column: "versions.minor", order: orderDirection },
                { column: "versions.patch", order: orderDirection },
            ],
            status: [
                { column: "isLatestVersion", order: orderDirection },
                { column: "isUpdateInProgress", order: orderDirection }
            ],
        };

        const orderByField = orderByMapping[orderBy] || orderByMapping.name;

        const results = await this.knex
            .from("devices")
            .join("firmware_versions as versions", "devices.firmware_version_id", "=", "versions.id")
            .join("users", "devices.user_email", "=", "users.email")
            .leftJoin(
                this.knex("updates")
                    .select("device_id")
                    .max("finished as most_recent_finished")
                    .groupBy("device_id")
                    .as("latest_updates"),
                "devices.id",
                "=",
                "latest_updates.device_id"
            )
            .where("users.subscription_ends", ">=", this.knex.fn.now())
            .select(
                "devices.id as id",
                "devices.name as name",
                "devices.user_email as userEmail",
                "users.admin as isAdmin",
                "latest_updates.most_recent_finished as updatedDate",
                this.knex.raw("versions.major || '.' || versions.minor || '.' || versions.patch as version"),
                this.knex.raw(`
                    CASE
                        WHEN versions.major = (SELECT MAX(fv.major) FROM firmware_versions fv)
                            AND versions.minor = (SELECT MAX(fv.minor) FROM firmware_versions fv WHERE fv.major = versions.major)
                            AND versions.patch = (SELECT MAX(fv.patch) FROM firmware_versions fv WHERE fv.major = versions.major AND fv.minor = versions.minor)
                            AND latest_updates.most_recent_finished IS NOT NULL
                        THEN TRUE
                        ELSE FALSE
                    END as isLatestVersion
                `),
                this.knex.raw(`
                    CASE
                        WHEN latest_updates.most_recent_finished IS NULL
                        THEN TRUE
                        ELSE FALSE
                    END as isUpdateInProgress
                `)
            )
            .orderBy(orderByField)
            .offset(offset)
            .limit(limit);

        const totalCountResult = await this.knex
            .from("devices")
            .join("users", "devices.user_email", "=", "users.email")
            .where("users.subscription_ends", ">=", this.knex.fn.now())
            .count("devices.id as total");

        return {
            results,
            total: totalCountResult[0].total
        }
    }

    async getLatestVersion() {

    }
}

export default DeviceDataSource