import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    ProductsComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
