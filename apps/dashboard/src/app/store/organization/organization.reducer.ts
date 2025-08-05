import { createReducer, on } from '@ngrx/store';
import { loadOrganizations, loadOrganizationsSuccess, loadOrganizationsFailure } from './organization.actions';
import { Organization } from '@turbovets-challenge/data/entities';

export interface OrganizationState {
  organizations: Organization[];
  error: any;
}

const initialState: OrganizationState = {
  organizations: [],
  error: null
};

export const organizationReducer = createReducer(
  initialState,
  on(loadOrganizations, state => ({ ...state, error: null })),
  on(loadOrganizationsSuccess, (state, { organizations }) => ({ ...state, organizations })),
  on(loadOrganizationsFailure, (state, { error }) => ({ ...state, error }))
);
