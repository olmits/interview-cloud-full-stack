export const getDevices = async (_, args, { dataSources }) => {
    return dataSources.deviceDataSource.getDevices();
};