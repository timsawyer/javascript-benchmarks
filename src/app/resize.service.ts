import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ResizeService {
  public updates = new Map<any, Function>();

  constructor() {}
}
