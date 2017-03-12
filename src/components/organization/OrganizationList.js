import React, {PropTypes} from 'react';
import OrganizationListRow from './OrganizationListRow';

const OrganizationList = ({organizations,onDelete}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>WelcomeText</th>
        <th>EmailId</th>
        <th>PhoneNumber</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {organizations.map(organization =>
        <OrganizationListRow key={organization.id} organization={organization} onDelete={onDelete}/>
      )}
      </tbody>
    </table>
  );
};

OrganizationList.propTypes = {
  organizations: PropTypes.array.isRequired
};

export default OrganizationList;
