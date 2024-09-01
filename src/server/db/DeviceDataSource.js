import { SQLDataSource } from "datasource-sql";

class DeviceDataSource extends SQLDataSource {
    async getDevices(pagination, order) {
        const { offset, limit } = pagination;
        const { orderBy, orderDirection } = order;

        const orderByMapping = {
            name: "devices.name",
            userEmail: "devices.user_email",
            version: this.knex.raw("fv.major || '.' || fv.minor || '.' || fv.patch"),
            updatedDate: "latest_updates.most_recent_finished"
        };

        const orderByField = orderByMapping[orderBy] || orderByMapping.name;

        const results = await this.knex
            .from("devices")
            .join("firmware_versions as fv", "devices.firmware_version_id", "=", "fv.id")
            .join("users", "devices.user_email", "=", "users.email")
            .leftJoin(
                this.knex('updates')
                    .select("device_id")
                    .max('finished as most_recent_finished')
                    .groupBy("device_id")
                    .as('latest_updates'),
                "devices.id",
                "=",
                "latest_updates.device_id"
            )
            .select(
                "devices.id as id",
                "devices.name as name",
                "devices.user_email as userEmail",
                this.knex.raw("fv.major || '.' || fv.minor || '.' || fv.patch as version"),
                "latest_updates.most_recent_finished as updatedDate"
            )
            .orderBy(orderByField, orderDirection)
            .offset(offset)
            .limit(limit);

        const totalCountResult = await this.knex
            .from("devices")
            .count("devices.id as total");

        return {
            results,
            total: totalCountResult[0].total
        }
    }
}

export default DeviceDataSource