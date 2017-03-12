import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const OrganizationListRow = ({organization,onDelete}) => {
  return (
    <tr>
      <td><Link to={'/organization/' + organization.id}>{organization.name}</Link></td>
      <td>{organization.type}</td>
      <td>{organization.welcomeText}</td>
      <td>{organization.emailid}</td>
      <td>{organization.phonenumber}</td>
      <td><input
        type="submit"
        value="Delete"
        className="btn btn-primary"
        onClick={() => onDelete(organization.id)}/></td>
    </tr>
  );
};
OrganizationListRow.propTypes = {
  organization: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default OrganizationListRow;
