import { useReducerAsync } from "use-reducer-async";
import { createContainer } from "react-tracked";
import axios from "axios";
import { notification } from "antd";

const initialState = {
  todoIds: [],
  products: [],
  todoMap: {},
  visible: false,
  query: "",
  pending: true,
  error: null,
};

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Producto",
    description:
      type === "success"
        ? "Producto creado"
        : "Error de comunicacion con la DB",
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STARTED":
      return {
        ...state,
        pending: true,
      };
    case "TODO_CREATED":
      return {
        ...state,
        todoIds: [...state.todoIds, action.todo.id],
        todoMap: { ...state.todoMap, [action.todo.id]: action.todo },
        pending: false,
      };
    case "PRODUCT_FETCHED":
      return {
        ...state,
        pending: false,
        products: action.products,
      };
    case "API_OK":
      return {
        ...state,
        pending: false,
      };
    case "VISIBLE_MODAL":
      return {
        ...state,
        visible: !state.visible,
      };
    case "TODO_UPDATED":
      return {
        ...state,
        todoMap: { ...state.todoMap, [action.todo.id]: action.todo },
        pending: false,
      };
    case "TODO_DELETED": {
      const { [action.id]: _removed, ...rest } = state.todoMap;
      return {
        ...state,
        todoIds: state.todoIds.filter((id) => id !== action.id),
        todoMap: rest,
        pending: false,
      };
    }
    case "PRODUCT_DELECTED": {
      //  const { [action.id]: _removed, ...rest } = state.todoMap;

      return {
        ...state,
        products: state.products.filter((id) => id !== action.payload),
        pending: false,
      };
    }
    case "FAILED":
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case "QUERY_CHANGED":
      return {
        ...state,
        query: action.query,
      };
    default:
      throw new Error("unknown action type");
  }
};

const asyncActionHandlers = {
  CREATE_TODO: ({ dispatch }) => async (action) => {
    try {
      dispatch({ type: "STARTED" });
      const response = await fetch(`https://reqres.in/api/todos?delay=1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: action.title }),
      });
      const data = await response.json();
      if (typeof data.id !== "string") throw new Error("no id");
      if (typeof data.title !== "string") throw new Error("no title");
      dispatch({ type: "TODO_CREATED", todo: data });
    } catch (error) {
      dispatch({ type: "FAILED", error });
    }
  },
  FETCH_PRODUCTS: ({ dispatch }) => async (action) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products?sort=created_date`
      );
      const data = await response.json();
      dispatch({ type: "PRODUCT_FETCHED", products: data });
    } catch (error) {
      dispatch({ type: "FAILED", error });
    }
  },
  SAVE_PRODUCTS: ({ dispatch }) => async (action) => {
    try {
      dispatch({ type: "STARTED" });
      let { name, reference, price, weight, category, stock } = {
        ...action.payload,
      };
      const response = await axios.post(
        `http://localhost:8080/products`,
        `name=${name}&reference=${reference}&price=${price}&weight=${weight}&category=${category}&stock=${stock}`
      );

      const data = await response;
      if (data.status == 201) {
        openNotificationWithIcon("success");
        dispatch({ type: "VISIBLE_MODAL" });
        const response = await fetch(
          `http://localhost:8080/products?sort=created_date`
        );
        const data = await response.json();
        dispatch({ type: "PRODUCT_FETCHED", products: data });
        dispatch({ type: "API_OK" });
      } else {
        openNotificationWithIcon("error");
        dispatch({ type: "VISIBLE_MODAL" });
        dispatch({ type: "API_OK" });
      }
    } catch (error) {
      console.log("data error catch", error);
      dispatch({ type: "FAILED", error });
    }
  },
  DELETE_PRODUCT: ({ dispatch }) => async (action) => {
    try {
      dispatch({ type: "STARTED" });
      let { id } = {
        ...action.payload,
      };
      console.log("action.payload", action.payload);
      const response = await axios.delete(
        `http://localhost:8080/products/${action.payload}`
      );

      const data = await response;
      if (data.status === 204) {
        openNotificationWithIcon("success");
        const response = await fetch(
          `http://localhost:8080/products?sort=created_date`
        );
        const data = await response.json();
        dispatch({ type: "PRODUCT_FETCHED", products: data });
        dispatch({ type: "API_OK" });
      } else {
        openNotificationWithIcon("error");
        dispatch({ type: "API_OK" });
      }
    } catch (error) {
      console.log("data error catch", error);
      dispatch({ type: "FAILED", error });
    }
  },
  TOGGLE_TODO: ({ dispatch, getState }) => async (action) => {
    try {
      dispatch({ type: "STARTED" });
      const todo = getState().todoMap[action.id];
      const body = {
        ...todo,
        completed: !todo.completed,
      };
      const response = await fetch(
        `https://reqres.in/api/todos/${action.id}?delay=1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (typeof data.title !== "string") throw new Error("no title");
      dispatch({ type: "TODO_UPDATED", todo: { ...data, id: action.id } });
    } catch (error) {
      dispatch({ type: "FAILED", error });
    }
  },
  DELETE_TODO: ({ dispatch }) => async (action) => {
    try {
      dispatch({ type: "STARTED" });
      await fetch(`https://reqres.in/api/todos/${action.id}?delay=1`, {
        method: "DELETE",
      });
      dispatch({ type: "TODO_DELETED", id: action.id });
    } catch (error) {
      dispatch({ type: "FAILED", error });
    }
  },
};

const useValue = () =>
  useReducerAsync(reducer, initialState, asyncActionHandlers);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
