//import { RouterModule }   from '@angular/router';

import { Tree } from './components/tree/tree';
import { Unknown } from './components/unknown';

export const AppRoutes = [
      {
        path: '',
        redirectTo: '/tree',
        pathMatch: 'full'
      },
      {
        path: 'tree',
        component: Tree
      },
      { path: '**', component: Unknown}
];

