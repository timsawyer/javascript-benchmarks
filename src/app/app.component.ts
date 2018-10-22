import { Component } from "@angular/core";
import { BoxData } from "./box-and-whiskers/box-and-whiskers.component";
import { HttpClient } from "@angular/common/http";

export interface DataStructureListing {
  name: string;
  operations: BoxData[];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public showSidenav = true;

  public data: DataStructureListing[];
  public selectedOperations: BoxData[];

  public toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

  constructor(private http: HttpClient) {
    this.http
      .get("assets/data/array-benchmark-data.js")
      .toPromise()
      .then((data: DataStructureListing) => {
        this.data = [data];
      });
  }
}
