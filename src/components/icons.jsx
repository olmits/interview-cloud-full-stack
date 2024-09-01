import {
    Icon,
    Loader,
    Popup,
  } from 'semantic-ui-react'

export const UpToDateIcon = () => {
    const icon = <Icon name="checkmark" color="green" />;
    return <Popup content="Up to Date" trigger={icon} />;
};
  
export const UpdateInProgressIcon = () => {
    const icon = <Loader active inline size="tiny" />;
    return <Popup content="Update In Progress" trigger={icon} />;
}
  
export const UnauthorizedUserIcon = () => {
    const icon = <Icon name="warning sign" color="yellow" />;
    return <Popup content="Not Authorized" trigger={icon} />;
}
