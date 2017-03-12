import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as organizationActions from '../../actions/organizationActions';
import OrganizationForm from './OrganizationForm';
import toastr from 'toastr';

export class ManageOrganizationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      organization: Object.assign({}, props.organization),
      errors: {},
      saving: false
    };

    this.updateOrganizationState = this.updateOrganizationState.bind(this);
    this.saveOrganization = this.saveOrganization.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.organization.id != nextProps.organization.id) {
      // Necessary to populate form when existing Organization is loaded directly.
      this.setState({organization: Object.assign({}, nextProps.organization)});
    }
  }

  updateOrganizationState(event) {
    const field = event.target.name;
    let organization = this.state.organization;
    organization[field] = event.target.value;
    return this.setState({organization: organization});
  }

  organizationFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.organization.name.length < 5) {
      errors.name = 'Name must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveOrganization(event) {
    event.preventDefault();

    if (!this.organizationFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveOrganization(this.state.organization)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Organization saved');
    this.context.router.push('/organizations');
  }

  render() {
    return (
      <OrganizationForm
        onChange={this.updateOrganizationState}
        onSave={this.saveOrganization}
        organization={this.state.organization}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageOrganizationPage.propTypes = {
  organization: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageOrganizationPage.contextTypes = {
  router: PropTypes.object
};

function getOrganizationById(organizations, id) {
  const organization = organizations.filter(organization => organization.id == id);
  if (organization) return organization[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const organizationId = ownProps.params.id; // from the path `/Organization/:id`

  let organization = {id: '', type: '', name: '', identifiername: '', welcomeText: '', password: '', emailid: '', phonenumber: ''};

  if (organizationId && state.organizations.length > 0) {
    organization = getOrganizationById(state.organizations, organizationId);
  }

  return {
    organization: organization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(organizationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrganizationPage);
