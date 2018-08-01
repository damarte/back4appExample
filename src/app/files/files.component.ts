import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Parse } from 'parse';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  form: FormGroup;
  loading = false;
  files = [];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    Parse.masterKey = environment.PARSE_MASTER_KEY;

    this.loadFiles();
  }

  loadFiles() {
    const File = Parse.Object.extend('File');
    const query = new Parse.Query(File);
    query.descending('createdAt');
    const context = this;
    query.find({
      success: function(results) {
        console.log(results);
        context.files = results;
      },
      error: function(error) {
        console.error(error);
      }
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      file: null
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;

    const base64 = formModel.file.value;
    const file = new Parse.File(formModel.name, { base64: base64 });

    const File = Parse.Object.extend('File');
    const newFile = new File();
    newFile.set('file', file);
    newFile.set('name', formModel.name);

    const context = this;

    newFile.save(null, {
      success: function(object) {
        context.loading = false;
        console.log('File upload successfully with name: ' + object.get('name'));
        context.loadFiles();
      },

      error: function(error) {
        context.loading = false;
        console.error('Error ' + error.code + ': ' + error.message);
      }
    });
  }

  clearFile() {
    this.form.get('file').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
