import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Implement your authentication logic here (e.g., checking tokens, session, etc.)
  public isLoggedIn(): boolean {
    // Replace this with your actual authentication check
    return true; // For demonstration purposes, always return true
  }
}