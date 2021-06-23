import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('Pince', [Validators.required]),
    price: new FormControl(15, [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  submit() {
    console.log('submit');
    // qsdfqsdf.add(this.f.value as Article);
    this.router.navigateByUrl('/stock');
  }
}
