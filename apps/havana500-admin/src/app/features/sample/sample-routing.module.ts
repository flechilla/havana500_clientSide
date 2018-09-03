import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { SampleComponent } from "./sample.component";

const sampleRoutes: Routes = [
    {
        path: '',
        component: SampleComponent,
        // canActivate: [AuthenticatedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(sampleRoutes)],
    exports: [RouterModule]
})
export class SampleRoutingModule { }
