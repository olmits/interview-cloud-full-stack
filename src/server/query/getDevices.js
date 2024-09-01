export const getDevices = async (_, args, { dataSources }) => {
    const { pagination, order } = args.input;
    
    return dataSources.deviceDataSource.getDevices(pagination, order);
};