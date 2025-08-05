import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrganizationState } from './organization.reducer';

export const selectOrganizationState = createFeatureSelector<OrganizationState>('organization');

export const selectOrganizations = createSelector(
  selectOrganizationState,
  (state) => state.organizations
);

export const selectOrganizationError = createSelector(
  selectOrganizationState,
  (state) => state.error
);
