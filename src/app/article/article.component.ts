import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Article = new Article();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private titleService: Title,
    private sharedService: SharedService,
    private meta: Meta,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { key } = params;

      if (this.router.url.indexOf('dashboard/preview') === -1) {
        this.articleService.getArticle(key).subscribe((a) => {
          this.displayArticle(a);
        });
        return;
      }

      this.dashboardService.getArticle(key).subscribe((a) => {
        this.displayArticle(a);
      });
    });
  }

  displayArticle(article: Article): void {
    if (article) {
      this.article = article;
      this.titleService.setTitle(
        `${this.article.title} - ${this.sharedService.blogTitle}`
      );
      this.meta.addTags([
        {
          property: 'og:title',
          content: `${this.article.title} - ${this.sharedService.blogTitle}`,
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: this.sharedService.baseUrl + this.article.key,
        },
        { property: 'og:image', content: this.article.imageUrl },
        { property: 'og:description', content: this.article.description },
        { property: 'og:site_name', content: this.sharedService.blogTitle },
      ]);
    } else {
      this.router.navigateByUrl('404');
    }
  }
}
