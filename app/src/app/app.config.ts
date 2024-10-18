import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "ngx-loading";
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { spinnerInterceptor } from './helpers/spinnerInterceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([spinnerInterceptor])),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      ModalModule,
      NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.chasingDots,
        backdropBackgroundColour: "rgba(0,0,0,0,5)",
        backdropBorderRadius: "4px",
        primaryColour: "#ffffff",
        secondaryColour: "#ffffff",
        tertiaryColour: "#ffffff",
      })
    )
  ]
};
