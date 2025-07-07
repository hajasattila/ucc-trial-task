import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPageComponent} from './pages/auth/login-page/login-page.component';
import {PasswordResetPageComponent} from './pages/auth/password-reset-page/password-reset-page.component';
import {EventListPageComponent} from './pages/events/event-list-page/event-list-page.component';
import {HelpdeskChatPageComponent} from './pages/helpdesk/helpdesk-chat-page/helpdesk-chat-page.component';
import {HelpdeskAgentPageComponent} from './pages/helpdesk/helpdesk-agent-page/helpdesk-agent-page.component';

import {AuthGuard} from './guard/auth-guard/auth.guard';
import {RoleGuard} from './guard/role-guard/role.guard';

import {NotfoundComponent} from './components/notfound/notfound.component';

const routes: Routes = [
  {path: '', redirectTo: 'events', pathMatch: 'full'},

  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard]
  },

  {path: 'reset-password/:code', component: PasswordResetPageComponent},

  {path: 'events', component: EventListPageComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: HelpdeskAgentPageComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
