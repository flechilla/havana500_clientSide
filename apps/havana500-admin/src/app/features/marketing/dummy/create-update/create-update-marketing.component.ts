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
  MarketingImageService,
  PictureType,
  PictureExtended,
  PictureEnumMapping
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
  Validators,
  NgForm,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

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

  protected marketing: PictureExtended;

  protected isTemporary: boolean;

  filteredTags: Observable<ContentTag[]>;

  marketingType = PictureType;

  imageTypes = PictureEnumMapping;

  constructor(
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateMarketingComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      marketing$: Observable<PictureExtended>;
      tags: ContentTag[];
      isTemporary: boolean;
    },
    protected contentTagService: ContentTagService,
    protected utilsService: AntUtilsService,
    protected marketingService: MarketingImageService
  ) {}

  public get pictureTypeSelected(): PictureType {
    return this.form.get('marketing').get('pictureType').value;
  }

  ngOnInit() {
    this.loadForm();

    if (!this.data) {
      console.error(
        'Data passed to dialog must not be empty and must have a list of ContentTag'
      );
    }

    this.globalTags = this.data.tags;

    this.isTemporary = this.data.isTemporary;

    if (this.data.marketing$) {
      this.onEdit = true;
    }

    if (this.onEdit) {
      this.data.marketing$.subscribe(resp => {
        this.form.get('marketing').patchValue(resp);
        this.marketing = resp;
      });
    }

    this.filteredTags = this.tagName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTags(value))
    );
  }

  protected loadForm() {
    this.form = this.fb.group({
      marketing: this.fb.group({
        id: 0,
        weight: ['', Validators.required],
        seoFileName: '',
        pictureType: ['', Validators.required],
        hRef: ['', Validators.required],
        isActive: [true, Validators.required],
        name: ['', Validators.required],
        companyName: [''],
        languageCulture: 'es',
        mimeType: '',
        width: '',
        height: '',
        isNew: true,
        fullPath: '',
        relativePath: '',
        pictureExtension: ''
      })
    });
  }

  //#region Form Properties

  public get fullPath(): AbstractControl {
    return this.form.get('marketing').get('fullPath');
  }

  public get relativePath(): AbstractControl {
    return this.form.get('marketing').get('relativePath');
  }
  public get seoFileName(): AbstractControl {
    return this.form.get('marketing').get('seoFileName');
  }
  public get mimeType(): AbstractControl {
    return this.form.get('marketing').get('mimeType');
  }
  public get pictureExtension(): AbstractControl {
    return this.form.get('marketing').get('pictureExtension');
  }

  //#endregion

  public addMainPicture(marketingId: number): void {
    const fi = this.mainPicture.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.marketingService
        .uploadMarketingImage(marketingId, fileToUpload)
        .subscribe((uploadedPic: Picture) => {
          this.refreshImageFields(uploadedPic);
        });
    }
  }

  private refreshImageFields(res: Picture) {
    this.marketing.relativePath = res.relativePath;
    this.marketing.fullPath = res.fullPath;
    this.marketing.mimeType = res.mimeType;
    this.marketing.seoFileName =
      this.marketing.seoFileName == null || this.marketing.seoFileName === ''
        ? res.seoFileName
        : this.marketing.seoFileName;
    this.marketing.pictureExtension = res.pictureExtension;
    this.fullPath.setValue(this.marketing.fullPath);
    this.relativePath.setValue(this.marketing.relativePath);
    this.seoFileName.setValue(this.marketing.seoFileName);
    this.mimeType.setValue(this.marketing.mimeType);
    this.pictureExtension.setValue(this.marketing.pictureExtension);
  }

  public close() {
    if (this.isTemporary) {
      this.dialogRef.close({ update: false, data: this.marketing.id });
    } else {
      this.dialogRef.close();
    }
  }

  public save() {
    const toUpdateOrCreate: Picture = this.form.get('marketing').value;

    this.dialogRef.close({ update: true, data: toUpdateOrCreate });
  }

  public addTag(tagForm: NgForm) {
    if (tagForm.value.name.id) {
      const selectedTag: ContentTag = tagForm.value.name;
      if (
        this.marketing.tags.findIndex(tag => tag.id === selectedTag.id) === -1
      ) {
        //OPtimistic Add Tag
        this.optimisticAddTagToPicture(selectedTag);
      }
    } else {
      const toCreateTag: ContentTag = {
        name: tagForm.value.name.toString(),
        id: this.utilsService.generateUEId()
      };

      this.optimisticCreateAndAddTagToPicture(toCreateTag);
    }

    tagForm.resetForm();
    this.tagMenu.closeMenu();
  }

  private optimisticCreateAndAddTagToPicture(toCreateTag: ContentTag) {
    this.marketing.tags.push(toCreateTag);
    this.contentTagService.create({ ...toCreateTag, id: 0 }).subscribe(
      createdTag => {
        const indexOfOld = this.marketing.tags.findIndex(
          tag => tag.id === toCreateTag.id
        );
        this.marketing.tags.splice(indexOfOld, 1);
        this.optimisticAddTagToPicture(createdTag);
        this.globalTags.push(createdTag);
      },
      () => {
        const indexOfOld = this.marketing.tags.findIndex(
          tag => tag === toCreateTag
        );
        this.marketing.tags.splice(indexOfOld, 1);
      }
    );
  }

  private optimisticAddTagToPicture(selectedTag: ContentTag) {
    this.marketing.tags.push(selectedTag);
    this.marketingService
      .addTag(this.marketing.id, selectedTag.id)
      .subscribe(null, () => {
        const index = this.marketing.tags.findIndex(
          tag => tag.id === selectedTag.id
        );
        this.marketing.tags.splice(index, 1);
      });
  }

  public onTagMenuOpened() {
    this.tagNameField.nativeElement.focus();
  }

  public deletePictureTag(tagId: any) {
    const index = this.marketing.tags.findIndex(tag => tag.id === tagId);
    const toDelete = this.marketing.tags[index];
    this.marketing.tags.splice(index, 1);
    this.marketingService
      .removeTag(this.marketing.id, tagId)
      .subscribe(null, () => {
        this.marketing.tags.splice(index, 0, toDelete);
      });
  }

  public displayName(tag: ContentTag): string {
    if (tag) return tag.name;
  }

  private _filterTags(value: any): ContentTag[] {
    let filterValue = '';

    if (value && !value.id) {
      filterValue = value.toLowerCase();
    }

    return this.globalTags.filter(tag =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }
}
