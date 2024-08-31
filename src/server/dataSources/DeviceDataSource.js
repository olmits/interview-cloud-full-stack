import { SQLDataSource } from "datasource-sql";

class DeviceDataSource extends SQLDataSource {
    getDevices({ offset, limit }) {
        return this.knex
            .from("devices")
            .join("firmware_versions as fv", "devices.firmware_version_id", "=", "fv.id")
            .join("updates", "devices.id", "=", "updates.device_id")
            .select(
                "devices.name as name",
                "devices.user_email as user_email",
                this.knex.raw("fv.major || '.' || fv.minor || '.' || fv.patch as version"),
                "updates.finished"
            )
            .offset(offset)
            .limit(limit);
    }
}

export default DeviceDataSource