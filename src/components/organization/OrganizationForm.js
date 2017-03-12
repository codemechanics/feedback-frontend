import React from 'react';
import TextInput from '../common/TextInput';

const OrganizationForm = ({organization, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name="type"
        label="Type"
        value={organization.type}
        onChange={onChange}
        error={errors.type}/>

      <TextInput
        name="name"
        label="Name"
        value={organization.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="identifiername"
        label="Identifier name"
        value={organization.identifiername}
        onChange={onChange}
        error={errors.identifiername}/>

      <TextInput
        name="welcomeText"
        label="Welcome Text"
        value={organization.welcomeText}
        onChange={onChange}
        error={errors.welcomeText}/>

      <TextInput
        name="password"
        label="Password"
        value={organization.password}
        onChange={onChange}
        error={errors.password}/>

      <TextInput
        name="emailid"
        label="Email Id"
        value={organization.emailid}
        onChange={onChange}
        error={errors.emailid}/>

      <TextInput
        name="phonenumber"
        label="Phone number"
        value={organization.phonenumber}
        onChange={onChange}
        error={errors.phonenumber}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

OrganizationForm.propTypes = {
  organization: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default OrganizationForm;
