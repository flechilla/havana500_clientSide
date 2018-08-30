import { NgModule } from '@angular/core';

import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { FuseKeysPipe } from './fuse-keys.pipe';
import { SearchPipe } from './search.pipe';
import { KeysPipe } from './keys.pipe';
import { EventsToViewEventsPipe } from './eventsToViewEvents.pipe';

@NgModule({
  declarations: [
    FuseKeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    KeysPipe,
    SearchPipe,
    EventsToViewEventsPipe
  ],
  imports: [],
  exports: [
    FuseKeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    KeysPipe,
    SearchPipe,
    EventsToViewEventsPipe
  ]
})
export class FusePipesModule {}
