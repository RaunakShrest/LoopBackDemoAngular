import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Item {
  name: string;
  id: string;
  editMode?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'student';
  protected data!: Item[];
  @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get<Item[]>('http://localhost:3000/api/items').subscribe((items) => {
      this.data = items.map(item => ({ ...item, editMode: false }));
    });
  }

//  postData(name: string) {
//     const newItem: Item = { name, id: '' };
//     this.httpClient.post<Item>('http://localhost:3000/api/items', newItem).subscribe((response) => {
//       console.log('Item created:', response);
//       this.fetchData(); // Refresh data after successful POST
//     }, (error: HttpErrorResponse) => {
//       console.error('Error creating item:', error);
//       // Handle error
//     });
//   }

postData(name: string) {
  const newItem: Partial<Item> = { name }; // Use Partial<Item> to allow omitting id
  this.httpClient.post<Item>('http://localhost:3000/api/items', newItem).subscribe((response) => {
    console.log('Item created:', response);
    this.fetchData(); // Refresh data after successful POST
  }, (error: HttpErrorResponse) => {
    console.error('Error creating item:', error);
    // Handle error
  });
}


  updateData(item: Item, newName: string) {
    const updatedItem: Item = { ...item, name: newName };
    this.httpClient.put<Item>(`http://localhost:3000/api/items/${item.id}`, updatedItem).subscribe((response) => {
      console.log('Item updated:', response);
      this.fetchData();
    }, (error: HttpErrorResponse) => {
      console.error('Error updating item:', error);
      if (error.status === 422) {
        console.error('Validation errors:', error.error);
      } else {
        // Handle other types of errors
      }
    });
  }

  toggleEditMode(item: Item) {
    item.editMode = !item.editMode;
  }

  cancelUpdate(item: Item) {
    item.editMode = false;
  }

  deleteData(item: Item) {
    this.httpClient.delete(`http://localhost:3000/api/items/${item.id}`).subscribe((response) => {
      console.log('Item deleted:', response);
      this.fetchData();
    }, (error: HttpErrorResponse) => {
      console.error('Error deleting item:', error);
      // Handle error
    });
  }
}
