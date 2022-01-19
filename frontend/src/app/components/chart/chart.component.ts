import { Spending } from 'src/app/models/spending.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Chart, registerables } from 'chart.js';

import { SpendingService } from '../../services/spending.service';
import { PetService } from '../../services/pet.service';


interface DataType {
  names: string[],
  costs: number[]
}


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})


export class ChartComponent implements OnInit {

  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  data: DataType = {
    names: [] = [],
    costs: [] = [],
  }


  constructor(
    private Spendingservice: SpendingService,
    private PetService: PetService
  ) { }



  ngOnInit(): void {
    Chart.register(...registerables);
    this.data = this.getData()


    setTimeout(() => {
      new Chart(this.chartElement.nativeElement, {
        type: 'bar',
        data: {
          labels: this.data.names,
          datasets: [{
            data: this.data.costs,
            backgroundColor: ["#7d6ecc"]
          }]
        },
        options: {
          layout: {
            padding: 20,
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                font: {
                  size: 34,
                },
              },
            },
          },
        },
      });
    }, 1000);
  }


  getData() {

    let data: DataType = {
      names: [] = [],
      costs: [] = [],
    }

    this.Spendingservice.getSpending().subscribe((spending) => {
      this.PetService.getPets().subscribe((pets) => {
        pets.forEach((pet) => {
          if (!data.names.includes(pet.name)) {
            data.names.push(pet.name);
          }
          if (data.names.length - 1 === pets.length - 1) {
            const result = this.getCosts(spending, data)
            data.costs = result.costs;
          }
        })
      })
    });

    return data;
  }

  getCosts(spending: Spending[], data: DataType) {


    spending.map((spend) => {
      this.PetService.getPetById(String(spend.pet_id)).subscribe((pet) => {

        let index = data.names.indexOf(String(pet.name))

        if (!this.data.costs[index]) this.data.costs[index] = 0;

        if (spend.cost !== NaN) {
          data.costs[index] += spend.cost!;
        }
      })
    })
    return data;
  }
}
