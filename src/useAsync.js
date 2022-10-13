import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 첫번째 파라미터 : api 요청을 시작하는 함수
// 두번째 파라미터 : desp값은 해당 함수 안에서 사용하는 useEffect의 deps로 설정된다.
//              이 값은 나중에 사용할 비동기 함수에서 파라미터가 필요하고, 그 파라미터가 바뀔대 새로운 데이터를 불러오고 싶은 경우에 활용할 수 있다.
//              이 값의 기본값은 [] 이다. 즉, 컴포넌트가 가장 처음 렌더링 할때만 API를 호출하고 싶다는 의미이다.
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
