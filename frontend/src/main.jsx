import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./main.css";
import store from "./store.js";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import SingleItemScreen from "./screens/SingleItemScreen.jsx";
import ItemsScreen from "./screens/ItemsScreen.jsx";
import CollectionScreen from "./screens/CollectionScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AddCollectionScreen from "./screens/AddCollectionScreen.jsx";
import AddItemScreen from "./screens/AddItemScreen.jsx";
import SingleCollectionScreen from "./screens/SingleCollectionScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomeScreen />} />
      <Route path='/items' element={<ItemsScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/collections' element={<CollectionScreen />} />
      <Route path='/items/:id' element={<SingleItemScreen />} />
      <Route path='/collections/:id' element={<SingleCollectionScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/collections/add' element={<AddCollectionScreen />} />
        <Route path='/collections/:id/add' element={<AddItemScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
