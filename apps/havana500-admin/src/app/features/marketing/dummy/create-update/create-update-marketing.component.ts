import { UploadService } from './../../../../core/services/http/upload.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import {
  antAnimations,
  ContentTag,
  Picture,
  ContentTagService,
  AntUtilsService,
  MarketingImageService
} from '@hav500workspace/shared';
import {
  MatMenuTrigger,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'admin-create-update-marketing',
  templateUrl: 'create-update-marketing.component.html',
  styleUrls: ['create-update-marketing.component.scss'],
  animations: antAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CreateUpdateMarketingComponent implements OnInit {
  @ViewChild('tagMenuTrigger')
  tagMenu: MatMenuTrigger;
  @ViewChild('tagNameField')
  tagNameField: ElementRef;
  @ViewChild('tagName')
  tagName: FormControl;
  @ViewChild('mainPicture')
  mainPicture;

  public form: FormGroup;
  public onEdit = false;

  protected globalTags: ContentTag[];

  protected marketing: Picture;

  protected isTemporary: boolean;

  filteredTags: Observable<ContentTag[]>;

  constructor(
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateMarketingComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      picture$: Observable<Picture>;
      tags: ContentTag[];
      isTemporary: boolean;
    },
    protected contentTagService: ContentTagService,
    protected utilsService: AntUtilsService,
    protected pictureService: MarketingImageService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.loadForm();

    if (!this.data) {
      console.error(
        'Data passed to dialog must not be empty and must have a list of ContentTag'
      );
    }

    this.globalTags = this.data.tags;

    this.isTemporary = this.data.isTemporary;

    if (this.data.picture$) {
      this.onEdit = true;
    }

    if (this.onEdit) {
      this.data.picture$.subscribe(resp => {
        this.form.get('marketing').patchValue(resp);
        this.marketing = resp;
      });
    }
  }

  protected loadForm() {
    this.form = this.fb.group({
      article: this.fb.group({
        id: 0,
        sectionId: 0,
        title: ['', Validators.required],
        body: ['', Validators.required],
        allowComments: true,
        allowAnonymousComments: false,
        startDateUtc: '',
        endDateUtc: '',
        metaKeywords: '',
        metaDescription: '',
        metaTitle: '',
        editorWeight: 0,
        readingTime: 1
      })
    });
  }

  public addMainPicture(articleId: number): void {
    console.log('image changed');

    const fi = this.mainPicture.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.uploadService.upload(fileToUpload, articleId).subscribe(res => {
        console.log(res);
      });
    }
  }

  public close() {
    console.log('Closing');
    console.log(this.isTemporary);

    if (this.isTemporary) {
      this.dialogRef.close({ update: false, data: this.marketing.id });
    } else {
      this.dialogRef.close();
    }
  }
}
