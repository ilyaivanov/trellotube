import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createAppStore } from "./state2";
import { Provider } from "react-redux";
import App from "./AppLayout";
import { persistStore } from "redux-persist";

const store = createAppStore();
const persistor = persistStore(store as any);

const app = (
  <Provider store={store}>
    <App onClearPress={() => persistor.purge()} />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
