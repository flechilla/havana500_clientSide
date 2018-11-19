import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';
import {
  MarketingContent,
  Picture,
  antAnimations,
  ContentTag,
  MarketingImageService,
  ContentTagService,
  PictureExtended
} from '@hav500workspace/shared';
import { MatDialog } from '@angular/material';
import { CreateUpdateMarketingComponent } from '../dummy/create-update/create-update-marketing.component';

@Component({
  selector: 'admin-marketing-home',
  templateUrl: 'marketing-home.component.html',
  styleUrls: ['marketing-home.component.scss'],
  animations: [antAnimations]
})
export class MarketingHomeComponent extends BaseTableContainerComponent<Picture>
  implements OnInit, AfterViewInit {
  protected dialogRef: any;
  protected globalTags: ContentTag[];

  constructor(
    protected dialog: MatDialog,
    protected marketingService: MarketingImageService,
    protected contentTagService: ContentTagService
  ) {
    super(['id', 'relativePath', 'pictureType', 'name', 'companyName', 'isActive'], marketingService, 'id, relativePath, pictureType, name, companyName, isActive', 'Pictures');
  }

  ngOnInit() {
    super.ngOnInit();
    this.globalTags = [];

    this.contentTagService.getAll().subscribe(resp => {
      this.globalTags = resp;
    });
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  openCreateDialog(marketingToEdit?: PictureExtended) {
    this.dialogRef = this.dialog.open(CreateUpdateMarketingComponent, {
      panelClass: 'article-form-dialog',
      data: {
        marketing$: marketingToEdit
          ? this.marketingService.getWithTags(marketingToEdit.id)
          : this.marketingService.createTemporaryPicture(),
        tags: this.globalTags,
        isTemporary: marketingToEdit == null
      }
    });

    this.dialogRef
      .afterClosed()
      .subscribe(
        (response: { update: Boolean; data: PictureExtended | number }) => {
          this.loadPage();
          if (!response) {
            return;
          } else if (!response.update) {
            this.marketingService.delete(response.data).subscribe();
          } else {
            this.marketingService
              .update(
                (response.data as PictureExtended).id,
                response.data as PictureExtended
              )
              .subscribe();
          }
        }
      );
  }
}
