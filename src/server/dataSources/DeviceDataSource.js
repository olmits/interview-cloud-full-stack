import { SQLDataSource } from "datasource-sql";

class DeviceDataSource extends SQLDataSource {
    getDevices({ offset, limit }) {
        return this.knex
            .from("devices")
            .join("firmware_versions as fv", "devices.firmware_version_id", "=", "fv.id")
            .join("users", "devices.user_email", "=", "users.email")
            .join(
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
            .offset(offset)
            .limit(limit);
    }
}

export default DeviceDataSource