import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const cartPersistConfig = {
  key: "cart",
  storage: storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
  auth: authPersistedReducer,
  products: productReducer,
  cart: cartPersistedReducer,
  orders: orderReducer,
});

export default rootReducer;
