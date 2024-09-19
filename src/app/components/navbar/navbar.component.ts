import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(@Inject(DOCUMENT) private document: Document){}

  toggleTheme(){
    const isDark = this.document.body.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    this.document.body.classList.toggle('dark');
  }

  ngOnInit(){
    const theme = localStorage.getItem('theme');
    if(theme){
      this.document.body.classList.add(theme);
    }
  }
}
