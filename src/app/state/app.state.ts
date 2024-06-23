// Do not add the lazy loaded modules in the app state
//import { ProductState } from '../products/state/product.reducer';
import { UserState } from '../user/state/user.reducer';

export interface State {
  //products: ProductState;
  user: UserState;
}
