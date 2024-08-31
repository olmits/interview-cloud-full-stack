export const getDevices = async (_, args, { dataSources }) => {
    const { pagination } = args.input;
    
    return dataSources.deviceDataSource.getDevices(pagination);
};