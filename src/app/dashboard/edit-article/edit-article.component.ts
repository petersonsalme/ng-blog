import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: Article = null;
  saved: boolean;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { key } = params;
      this.getArticle(key);
    });
  }

  getArticle(key: string): void {
    this.dashboardService.getArticle(key).subscribe(
      (article: Article) => {
        if (!article) {
          this.router.navigateByUrl('404');
          return;
        }
        this.article = article;
      }
    );
  }

  updateArticle(): void {
    this.saved = false;
    this.dashboardService.updateArticle(this.article).subscribe(result => {
      this.article = result;
      this.saved = true;
    });
  }

  viewPreview(): void {
    this.router.navigateByUrl('/dashboard/preview/' + this.article.key);
  }

}
