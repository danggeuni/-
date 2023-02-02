import "./App.css";

import Clock from "./components/Clock";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Name from "./components/Name";

import React, { useRef, useReducer, useEffect } from "react";

// reducer CRUD 함수
const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }

    case "DELETE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }

    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.targetId ? { ...action.data } : item
      );
      break;
    }

    default:
      return state;
  }

  localStorage.setItem("list", JSON.stringify(newState));
  return newState;
};

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem("list");

    if (localData) {
      const todoList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (todoList.length >= 1) {
        dataId.current = parseInt(todoList[0].id) + 1;
        dispatch({ type: "INIT", data: todoList });
      }
    }
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("list");
    if (localData) {
      console.log("테스트입니다.");
    }
  }, [data]);

  // 아이템 생성 함수
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        content,
      },
    });
    dataId.current += 1;
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  return (
    <stateContext.Provider value={data}>
      <dispatchContext.Provider value={{ onCreate, onDelete }}>
        <div className="App">
          <Header />
          <div className={"article"}>
            <Clock />
            <Name />
          </div>
          <Footer />
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
