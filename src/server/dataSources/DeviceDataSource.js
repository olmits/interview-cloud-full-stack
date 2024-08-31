import { SQLDataSource } from "datasource-sql";

class DeviceDataSource extends SQLDataSource {
    getDevices({ offset, limit }) {
        return this.knex
            .from("devices")
            .join("firmware_versions as fv", "devices.firmware_version_id", "=", "fv.id")
            .join("updates", "devices.id", "=", "updates.device_id")
            .join("users", "devices.user_email", "=", "users.email")
            .select(
                "devices.name as name",
                "devices.user_email as userEmail",
                this.knex.raw("fv.major || '.' || fv.minor || '.' || fv.patch as version"),
                "updates.finished as updatedDate"
            )
            .offset(offset)
            .limit(limit);
    }
}

export default DeviceDataSource