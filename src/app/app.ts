import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { InquiryDrawerComponent } from './mfe-inquiry/inquiry-drawer/inquiry-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, InquiryDrawerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
