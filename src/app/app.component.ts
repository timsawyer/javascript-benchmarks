import { Component, AfterViewInit } from "@angular/core";
import { BoxData } from "./box-and-whiskers/box-and-whiskers.component";
import { HttpClient } from "@angular/common/http";
import { ResizeService } from "./resize.service";
import { BENCHMARK_DATA } from "./app.data";

export interface DataStructureListing {
  name: string;
  operations: BoxData[];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  public showSidenav = true;

  public data: DataStructureListing[] = BENCHMARK_DATA;
  public selectedOperations: BoxData[];
  public selectedOperationsMap: Map<string, BoxData> = new Map();

  public toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

  constructor(private http: HttpClient, private resizeService: ResizeService) {
    window.addEventListener("resize", () => this.updateAllCharts());

    // initialize with all array operations set to true
    this.data[0].operations.forEach(operation => {
      operation.selected = true;
      this.selectedOperationsMap.set(operation.name, operation);
    });
    this.selectedOperations = Array.from(this.selectedOperationsMap.values());
    setTimeout(() => this.updateAllCharts(), 10);
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateAllCharts(), 1000);
  }

  private updateAllCharts() {
    this.resizeService.updates.forEach((value, key, map) => {
      value();
    });
  }

  public getOperationTitle(operationName: string) {
    return operationName.split(" - ")[0];
  }
  public onOperationToggled(newValue: boolean, operation: BoxData) {
    console.log(operation);

    if (newValue) {
      this.selectedOperationsMap.set(operation.name, operation);
    } else {
      this.selectedOperationsMap.delete(operation.name);
    }

    this.selectedOperations = Array.from(this.selectedOperationsMap.values());
    setTimeout(() => this.updateAllCharts(), 10);
  }
}
