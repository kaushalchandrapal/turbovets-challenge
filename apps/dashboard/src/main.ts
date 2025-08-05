import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing-module';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';;

import { authReducer } from './app/store/auth/auth.reducer';
import { AuthEffects } from './app/store/auth/auth.effect';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { organizationReducer } from './app/store/organization/organization.reducer';
import { OrganizationEffects } from './app/store/organization/organization.effect';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { TaskEffects } from './app/store/tasks/tasks.effects';
import { tasksReducer } from './app/store/tasks/tasks.reducer';
import { AuthInterceptor } from './app/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(App, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes),
    provideStore({ auth: authReducer, organization: organizationReducer, tasks: tasksReducer }),
    provideEffects([AuthEffects, OrganizationEffects, TaskEffects]),
    provideStoreDevtools(),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(MatSnackBarModule),
  ],
}).catch((err) => console.error(err));
