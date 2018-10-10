import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import ProjectsDashboardService from '../../../core/services/http/dashboard.service';
import {
  antAnimations
} from '@hav500workspace/shared';
import { StatsService } from '../../../core/services/http/stats.service';
import { List } from 'immutable';
import { Article } from '@hav500workspace/shared';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: antAnimations
})
export class AntDashboardComponent implements OnInit, OnDestroy {
  projects: any[];
  selectedProject: any;


 
  widgets: any;
  trendingArticlesWidget: any = {};
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
    this.trendingArticlesWidget = {
      currentRange: 'H',
      xAxis: true,
      yAxis: true,
      gradient: false,
      legend: false,
      showXAxisLabel: true,
      xAxisLabel: 'Titulo',
      showYAxisLabel: true,
      yAxisLabel: 'Numero de comentarios',
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

  setCommentWidget(): void {
    this.statsService.getCommentsCount(7).
      subscribe(r=>this.widgets.commentsWidget.data.count.LW = r);
    this.statsService.getCommentsCount(31).
      subscribe(r=>this.widgets.commentsWidget.data.count.LM = r);
      this.statsService.getCommentsCount(1000000).
      subscribe(r=>this.widgets.commentsWidget.data.count.H = r);

      this.statsService.getApprovedCommentsCount(7).
      subscribe(r=>this.widgets.commentsWidget.data.extra.aproved.count.LW = r);
    this.statsService.getApprovedCommentsCount(31).
      subscribe(r=>this.widgets.commentsWidget.data.extra.aproved.count.LM = r);
      this.statsService.getApprovedCommentsCount(1000000).
      subscribe(r=>this.widgets.commentsWidget.data.extra.aproved.count.H = r);

      this.statsService.getNotApprovedCommentsCount(7).
      subscribe(r=>this.widgets.commentsWidget.data.extra.notAproved.count.LW = r);
    this.statsService.getNotApprovedCommentsCount(31).
      subscribe(r=>this.widgets.commentsWidget.data.extra.notAproved.count.LM = r);
      this.statsService.getNotApprovedCommentsCount(1000000).
      subscribe(r=>this.widgets.commentsWidget.data.extra.notAproved.count.H = r);
  }

  setArticlesWdiget(): void{
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
  }
  

  setTrendingArticlesWidget(): void{
   
    this.statsService.getTrendingArticles(1000000)
      .subscribe(articles=>
          articles.forEach(article=>{
            this.widgets.trendingArticlesWidget.mainChart.H.push(
              {
                name : article.title,
                series:[              
                 {
                    name: 'Comentarios aprovados',
                    value: article.approvedCommentCount
                  },
                  {
                    name: 'Comentarios no aprovados',
                    value: article.notApprovedCommentCount
                  },
                ]
              }
          );
        })    
    );
    this.statsService.getTrendingArticles(31)
      .subscribe(articles=>
          articles.forEach(article=>{
            this.widgets.trendingArticlesWidget.mainChart.LM.push(
              {
                name : article.title,
                series:[              
                 {
                    name: 'Comentarios aprovados',
                    value: article.approvedCommentCount
                  },
                  {
                    name: 'Comentarios no aprovados',
                    value: article.notApprovedCommentCount
                  },
                ]
              }
          );
        })    
    );
    this.statsService.getTrendingArticles(7)
      .subscribe(articles=>
          articles.forEach(article=>{
            this.widgets.trendingArticlesWidget.mainChart.TW.push(
              {
                name : article.title,
                series:[              
                 {
                    name: 'Comentarios aprovados',
                    value: article.approvedCommentCount
                  },
                  {
                    name: 'Comentarios no aprovados',
                    value: article.notApprovedCommentCount
                  },
                ]
              }
          );
        })    
    );
    this.statsService.getTrendingArticles(1)
      .subscribe(articles=>
          articles.forEach(article=>{
            this.widgets.trendingArticlesWidget.mainChart.T.push(
              {
                name : article.title,
                series:[              
                 {
                    name: 'Comentarios aprovados',
                    value: article.approvedCommentCount
                  },
                  {
                    name: 'Comentarios no aprovados',
                    value: article.notApprovedCommentCount
                  },
                ]
              }
          );
        })    
    );
    }

  ngOnInit() {//TODO: get this values just when the user changes hte range selection
      this.setArticlesWdiget();
      this.setCommentWidget(); 
      this.setTrendingArticlesWidget();
  }

  ngOnDestroy() {}
}
