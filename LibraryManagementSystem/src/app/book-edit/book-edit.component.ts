import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators, FormControl, FormGroupDirective} from '@angular/forms';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  description: string = '';
  author: string = '';
  publisher: string = '';
  published_year: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.api.getBook(this.route.snapshot.params['id']).subscribe(bookDetail => {
      this.bookForm = this.formBuilder.group({
        'isbn': bookDetail.isbn,
        'title': bookDetail.title,
        'description': bookDetail.description,
        'author': bookDetail.author,
        'publisher': bookDetail.publisher,
        'published_year': bookDetail.published_year
      });

    });
  }

  onFormEdit(form: NgForm) {
    this.api.updateBook(this.route.snapshot.params['id'], form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
