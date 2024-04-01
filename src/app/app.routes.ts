import { Routes } from '@angular/router';
import { ItemComponent } from './component/item/item.component';

import { UserComponent } from './component/user/user.component';

export const routes: Routes = [
    
    {
        component:UserComponent,
        path:"user",

    },{
        component:ItemComponent,
        path:"item"
    }
];
