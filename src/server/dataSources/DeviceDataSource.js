import { SQLDataSource } from "datasource-sql";

class DeviceDataSource extends SQLDataSource {
    getDevices() {
        return this.knex
            .select("*")
            .from("devices");
    }
}

export default DeviceDataSource