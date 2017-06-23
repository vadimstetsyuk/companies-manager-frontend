import { Component, Input } from '@angular/core';
import { Company } from '../models/Company';

@Component({
  selector: 'companies-tree',
  templateUrl: './companies-tree.component.html'
})

export class CompaniesTreeComponent {
  @Input() companies: Company[];
}