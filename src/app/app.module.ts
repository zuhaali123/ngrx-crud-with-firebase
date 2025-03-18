import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { messageReducer } from './main/messages/store/messages.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './main/messages/store/messages.effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ messages: messageReducer }),
    EffectsModule.forRoot([MessagesEffects]),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideFirestore(() => getFirestore()), 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}