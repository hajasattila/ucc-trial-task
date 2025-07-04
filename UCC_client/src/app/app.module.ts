import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AuthInterceptorService } from './interceptors/auth-interceptor/auth-interceptor.service';
import { TranslateHttpLoader } from './pipes/translate-http-loader';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PasswordResetPageComponent } from './pages/auth/password-reset-page/password-reset-page.component';
import { PasswordResetRequestModalComponent } from './pages/auth/password-reset-request-modal/password-reset-request-modal.component';
import { EventListPageComponent } from './pages/events/event-list-page/event-list-page.component';
import { EventCreateModalComponent } from './pages/events/event-create-modal/event-create-modal.component';
import { EventEditModalComponent } from './pages/events/event-edit-modal/event-edit-modal.component';
import { HelpdeskChatPageComponent } from './pages/helpdesk/helpdesk-chat-page/helpdesk-chat-page.component';
import { HelpdeskAgentPageComponent } from './pages/helpdesk/helpdesk-agent-page/helpdesk-agent-page.component';
import { HelpdeskMessageModalComponent } from './pages/helpdesk/helpdesk-message-modal/helpdesk-message-modal.component';
import { EventCardComponent } from './components/event/event-card/event-card.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ModalWrapperComponent } from './components/modal/modal-wrapper/modal-wrapper.component';
import { FormInputComponent } from './components/shared/form-input/form-input.component';
import { ConfirmDeleteModalComponent } from './components/shared/confirm-delete-modal/confirm-delete-modal.component';
import { ToastMessageComponent } from './components/shared/toast-message/toast-message.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import {CommonModule} from "@angular/common";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    LoginPageComponent,
    PasswordResetPageComponent,
    PasswordResetRequestModalComponent,
    EventListPageComponent,
    EventCreateModalComponent,
    EventEditModalComponent,
    HelpdeskChatPageComponent,
    HelpdeskAgentPageComponent,
    HelpdeskMessageModalComponent,
    EventCardComponent,
    ChatMessageComponent,
    ModalWrapperComponent,
    FormInputComponent,
    ConfirmDeleteModalComponent,
    ToastMessageComponent
  ],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
