import {
  AnyAction,
  configureStore,
  ThunkAction,
  Action,
  Store,
  Reducer,
  ReducersMapObject,
  combineReducers,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// import loggerMiddleware from "../config/logger-middleware";
// import errorMiddleware from "../config/error-middleware";
import rootReducer from "../reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "payload.config",
          "payload.request",
          "error",
          "meta.arg",
        ],
      },
    })
      .concat
      // errorMiddleware,
      // websocketMiddleware,
      // translationMiddleware,
      // loggerMiddleware
      (),
});

// Allow lazy loading of reducers https://github.com/reduxjs/redux/blob/master/docs/usage/CodeSplitting.md
interface InjectableStore<S = any, A extends Action = AnyAction>
  extends Store<S, A> {
  asyncReducers: ReducersMapObject;
  injectReducer(key: string, reducer: Reducer): void;
}

export function configureInjectableStore(storeToInject: any) {
  const injectableStore = storeToInject as InjectableStore<any, any>;
  injectableStore.asyncReducers = {};

  injectableStore.injectReducer = (key, asyncReducer) => {
    injectableStore.asyncReducers[key] = asyncReducer;
    injectableStore.replaceReducer(
      combineReducers({
        rootReducer, // Use rootReducer as a key-value pair
        ...injectableStore.asyncReducers,
      })
    );
  };

  return injectableStore;
}

const injectableStore = configureInjectableStore(store);

const getStore = () => injectableStore;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  AnyAction
>;

export default getStore;
