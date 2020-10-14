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
  saved = false;
  isNew = false;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { key } = params;

      if (key === 'new') {
        this.article = new Article();
        this.article.published = false;
        this.isNew = true;
      } else {
        this.getArticle(key);
      }

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

  deleteArticle(): void {
    this.saved = false;

    if (confirm(`Deleting ${this.article.title}. Are you sure?`)) {
      this.dashboardService.deleteArticle(this.article.id).subscribe(
        () => this.router.navigateByUrl('dashboard'),
        err => alert(err.error.message)
      );
    }
  }

  createArticle(): void {
    this.saved = false;
    this.dashboardService.createArticle(this.article).subscribe(result => {
      this.article = result;
      this.saved = true;
      this.isNew = false;
    });
  }

}
