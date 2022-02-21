import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthGuard } from "./services/guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./home/home.module").then((m) => m.HomeModule) },
  { path: "store", loadChildren: () => import("./store/store.module").then((m) => m.StoreModule), canActivate: [AuthGuard] },
  { path: "order", loadChildren: () => import("./order/order.module").then((m) => m.OrderModule), canActivate: [AuthGuard]},
  { path: "registration", component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
