import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { antAnimations } from '../../../shared/utils/animations';
import { ProjectsDashboardService } from '../../../core/services/http/dashboard.service';
import { StatsService } from '../../core/services/http/stats.service';

@Component({
  selector: 'ant-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: antAnimations
})
export class AntDashboardComponent implements OnInit, OnDestroy {
  projects: any[];
  selectedProject: any;

  widgets: any;
  widget5: any = {};
  widget6: any = {};
  widget7: any = {};
  widget8: any = {};
  widget9: any = {};
  widget11: any = {};

  dateNow = Date.now();

  constructor(private projectsDashboardService: ProjectsDashboardService, private statsService : StatsService) {
    this.projects = this.projectsDashboardService.projects;

    this.selectedProject = this.projects[0];

    this.widgets = this.projectsDashboardService.widgets;

    /**
     * Widget 5
     */
    this.widget5 = {
      currentRange: 'TW',
      xAxis: true,
      yAxis: true,
      gradient: false,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: 'Days',
      showYAxisLabel: false,
      yAxisLabel: 'Isues',
      scheme: {
        domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
      },
      onSelect: ev => {
        console.log(ev);
      },
      supporting: {
        currentRange: '',
        xAxis: false,
        yAxis: false,
        gradient: false,
        legend: false,
        showXAxisLabel: false,
        xAxisLabel: 'Days',
        showYAxisLabel: false,
        yAxisLabel: 'Isues',
        scheme: {
          domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
        },
        curve: shape.curveBasis
      }
    };

    /**
     * Widget 6
     */
    this.widget6 = {
      currentRange: 'TW',
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: true,
      gradient: false,
      scheme: {
        domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
      },
      onSelect: ev => {
        console.log(ev);
      }
    };

    /**
     * Widget 7
     */
    this.widget7 = {
      currentRange: 'T'
    };

    /**
     * Widget 8
     */
    this.widget8 = {
      legend: false,
      explodeSlices: false,
      labels: true,
      doughnut: false,
      gradient: false,
      scheme: {
        domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
      },
      onSelect: ev => {
        console.log(ev);
      }
    };

    /**
     * Widget 9
     */
    this.widget9 = {
      currentRange: 'TW',
      xAxis: false,
      yAxis: false,
      gradient: false,
      legend: false,
      showXAxisLabel: false,
      xAxisLabel: 'Days',
      showYAxisLabel: false,
      yAxisLabel: 'Isues',
      scheme: {
        domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
      },
      curve: shape.curveBasis
    };

    setInterval(() => {
      this.dateNow = Date.now();
    }, 1000);
  }

  ngOnInit() {//TODO: get this values just when the user changes hte range selection
    //articles widget
    this.statsService.getArticleCount(7).
      subscribe(r=>this.widgets.articlesWidget.data.count.LW = r);
    this.statsService.getArticleCount(31).
      subscribe(r=>this.widgets.articlesWidget.data.count.LM = r);
      this.statsService.getArticleCount(1000000).
      subscribe(r=>this.widgets.articlesWidget.data.count.H = r);

      this.statsService.getActiveArticlesCount(7).
      subscribe(r=>this.widgets.articlesWidget.data.extra.count.LW = r);
    this.statsService.getActiveArticlesCount(31).
      subscribe(r=>this.widgets.articlesWidget.data.extra.count.LM = r);
      this.statsService.getActiveArticlesCount(1000000).
      subscribe(r=>this.widgets.articlesWidget.data.extra.count.H = r);

      //comments widget
      this.statsService.getCommentsCount(7).
      subscribe(r=>this.widgets.commentsWidget.data.count.LW = r);
    this.statsService.getCommentsCount(31).
      subscribe(r=>this.widgets.commentsWidget.data.count.LM = r);
      this.statsService.getCommentsCount(1000000).
      subscribe(r=>this.widgets.commentsWidget.data.count.H = r);

 
  }

  ngOnDestroy() {}
}
