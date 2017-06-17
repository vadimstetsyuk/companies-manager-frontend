import { Component } from '@angular/core';

@Component({
  selector: 'companies-tree',
  templateUrl: './companies-tree.component.html'
})

export class CompaniesTreeComponent {
  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ],
      earnings: 100
    },
    {
      name: 'root2',
      children: [
        {
          name: 'child2.1',
          children: [],
          earnings: 100

        },
        {
          name: 'child2.2',
          children: [],
          earnings: 100
        }
      ],
      earnings: 100
    },
    { name: 'root3', children: [], earnings: 100 },
    { name: 'root4', children: [], earnings: 100 },
    { name: 'root5', children: [], earnings: 100 }
  ];
}