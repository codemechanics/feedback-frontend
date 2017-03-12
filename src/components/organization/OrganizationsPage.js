import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as organizationActions from '../../actions/organizationActions';
import OrganizationList from './OrganizationList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class OrganizationsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddOrganizationPage = this.redirectToAddOrganizationPage.bind(this);
    this.deleteOrganization = this.deleteOrganization.bind(this);
  }

  organizationRow(organization, index) {
    return <div key={index}>{organization.name}</div>;
  }

  redirectToAddOrganizationPage() {
    browserHistory.push('/organization');
  }


  deleteOrganization(organizationId) {
    //event.preventDefault();
    //let organizationId = event.target.value;
    this.props.actions.deleteOrganization(organizationId);
  }

  render() {
    const {organizations} = this.props;

    return (
      <div>
        <h1>Organizations</h1>
        <input type="submit"
               value="Add Organization"
               className="btn btn-primary"
               onClick={this.redirectToAddOrganizationPage}/>
        <OrganizationList organizations={organizations} onDelete={this.deleteOrganization}/>
      </div>
    );
  }
}

OrganizationsPage.propTypes = {
  organizations: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    organizations: state.organizations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(organizationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsPage);
