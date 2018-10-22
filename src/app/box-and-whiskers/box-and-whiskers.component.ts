import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation
} from "@angular/core";

declare const d3;

export interface SingleBoxData {
  size: string;
  results: number[];
}
export interface BoxData {
  name: string;
  operationResults: SingleBoxData[];
}

@Component({
  selector: "app-box-and-whiskers",
  templateUrl: "./box-and-whiskers.component.html",
  styleUrls: ["./box-and-whiskers.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class BoxAndWhiskersComponent implements OnInit, OnChanges {
  @Input()
  data: BoxData;

  private chartEl: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.chartEl = this.elementRef.nativeElement;
    setTimeout(() => {
      this.updateChart();
    }, 500);
  }

  private updateChart() {
    if (this.chartEl && this.data) {
      this.clearChart();
      this.drawChart();
    } else if (this.chartEl) {
      this.clearChart();
    }
  }

  private clearChart() {
    this.chartEl.innerHTML = "";
  }

  private iqr = k => {
    return function(d) {
      const q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k;
      let i = -1,
        j = d.length;
      while (d[++i] < q1 - iqr) {}
      while (d[--j] > q3 + iqr) {}
      return [i, j];
    };
  };

  private drawChart() {
    const rect = this.chartEl.getBoundingClientRect();
    let min = Infinity;
    let max = -Infinity;
    const labels = true; // show the text labels beside individual boxplots?
    const margin = { top: 25, right: 20, bottom: 80, left: 60 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;

    // calc min / max and format data
    const data = [];
    this.data.operationResults.forEach(operationResultSet => {
      const rowMax = Math.max(...operationResultSet.results);
      const rowMin = Math.min(...operationResultSet.results);

      if (rowMax > max) {
        max = rowMax;
      }
      if (rowMin < min) {
        min = rowMin;
      }

      data.push([operationResultSet.size, operationResultSet.results]);
    });

    const chart = d3
      .box()
      .whiskers(this.iqr(1.5))
      .height(height)
      .domain([min, max])
      .showLabels(labels);

    const svg = d3
      .select(this.chartEl)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "box")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // the x-axis
    const x = d3.scale
      .ordinal()
      .domain(
        data.map(function(d) {
          return d[0];
        })
      )
      .rangeRoundBands([0, width], 0.7, 0.3);

    const xAxis = d3.svg
      .axis()
      .scale(x)
      .orient("bottom");

    // the y-axis
    const y = d3.scale
      .linear()
      .domain([min, max])
      .range([height + margin.top, 0 + margin.top]);

    const yAxis = d3.svg
      .axis()
      .scale(y)
      .orient("left");

    // draw the boxplots
    svg
      .selectAll(".box")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        return "translate(" + x(d[0]) + "," + margin.top + ")";
      })
      .call(chart.width(x.rangeBand()));

    // add a title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 + margin.top / 5)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(this.data.name);

    // draw y axis
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text") // and text1
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size", "16px")
      .text("Milliseconds");

    // draw x axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height + margin.top + 10) + ")")
      .call(xAxis)
      .append("text") // text label for the x axis
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Size");
  }
}
