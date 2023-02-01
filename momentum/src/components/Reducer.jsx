import { useReducer } from "react";

export default function Reduer() {
  const [data, dispatch] = useReducer(reducer, []);

  const reducer = (state, action) => {
    let newState = [];

    switch (action.type) {
      case "CREATE": {
        newState = [action.data, ...state];
        break;
      }

      case "REMOVE": {
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

    return newState;
  };

  return <div></div>;
}
