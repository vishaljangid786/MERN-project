import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Use the named import for `redux-thunk`
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/ProductReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk]; // Using the correctly imported `thunk`

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
