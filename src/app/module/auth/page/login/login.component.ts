import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public submitted = false;

  private returnUrl: string;
  private getLoginData$ = new Subject();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.getLoginData$.next();
    this.getLoginData$.complete();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const login = this.auth.createRecord(Login, {
      email: this.f.email.value,
      password: this.f.password.value,
    });
    login
      .save()
      .pipe(takeUntil(this.getLoginData$))
      .subscribe((tokens: Login) => {
        // maybe response structure will be different but set all those accordingly
        localStorage.setItem('role', tokens.id); // If you don't have roles in you application you can remove this line
        this.auth.setTokens(tokens.accessToken, tokens.refreshToken);
        this.returnUrl === null
          ? this.router.navigateByUrl('/dashboard')
          : this.router.navigateByUrl(this.returnUrl);
      });
  }
}
