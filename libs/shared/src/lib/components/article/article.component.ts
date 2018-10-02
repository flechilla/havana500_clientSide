import { Component, OnInit } from '@angular/core';
import ArticleService from '../../../../../../apps/havana500-webclient/src/app/core/services/http/article.service';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private articleService: ArticleService) { 
  }

  ngOnInit() {
  }

}
