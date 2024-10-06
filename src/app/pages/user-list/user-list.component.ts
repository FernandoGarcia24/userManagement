import { Component } from '@angular/core';
import { UserService } from '../../module/services/user.service';
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../module/user.module';
import { UserCardComponent } from './../user-card/user-card.component'


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent  {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  viewMode: string = 'table';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  onSearch() {
    this.filteredUsers = this.users.filter((user) =>
      this.filterUser(user)
    );
  }

  filterUser(user: User): boolean {
    const term = this.searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.address.city.toLowerCase().includes(term)
    );
  }

  changeViewMode(mode: string) {
    this.viewMode = mode;
  }
}
