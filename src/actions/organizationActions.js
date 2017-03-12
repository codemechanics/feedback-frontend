import organizationApi from '../api/mockOrganizationApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadOrganizationSuccess(organizations) {
  return {type: types.LOAD_ORGANIZATION_SUCCESS, organizations};
}

export function createOrganizationSuccess(organization) {
  return {type: types.CREATE_ORGANIZATION_SUCCESS, organization};
}

export function updateOrganizationSuccess(organization) {
  return {type: types.UPDATE_ORGANIZATION_SUCCESS, organization};
}

export function deleteOrganizationSuccess(organizationId) {
  return {type: types.DELETE_ORGANIZATION_SUCCESS, organizationId};
}

export function loadOrganizations() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return organizationApi.getAllOrganizations().then(organizations => {
      dispatch(loadOrganizationSuccess(organizations));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveOrganization(organization) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return organizationApi.saveOrganization(organization).then(organization => {
      organization.id ? dispatch(updateOrganizationSuccess(organization)) :
        dispatch(createOrganizationSuccess(organization));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteOrganization(organizationId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return organizationApi.deleteOrganization(organizationId).then(
        dispatch(deleteOrganizationSuccess(organizationId))
    ).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
