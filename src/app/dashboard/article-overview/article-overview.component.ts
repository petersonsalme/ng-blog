import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Article } from 'src/app/article';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.css'],
})
export class ArticleOverviewComponent implements OnInit {
  articles: Article[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.dashboardService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }

  async togglePublishState(article: Article): Promise<void> {
    try {
      article.published = !article.published;
      const index = this.articles.findIndex((a) => a.id === article.id);
      const result = await this.dashboardService.togglePublishState(article).toPromise();
      this.articles[index] = result;
    } catch (error) {
      console.log('togglePublishState(', article, '): ', error);
      article.published = !article.published;
    }
  }
}
