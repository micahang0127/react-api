import React, { useState, useEffect } from "react";
import axios from "axios";

// useState를 사용해 요청 상태를 관리하고,
// useEffect를 사용해 컴포넌트가 렌더링 되는 시점에 요청을 시작하는 작업을 진행
function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect에서는 첫번째 파라미터로 등록하는 함수에는 async를 사용할수 없기 때문에,
  // 함수 내부에서 async를 사용하는 새로운 함수를 선언해줘야 함
  const fetchUsers = async () => {
    try {
      // 요청이 시작 할때 error와 users를 초기화
      setError(null);
      setUsers(null);
      // loading상태를 true로 바꿈
      setLoading(true);

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      // error 발생시키기
      // const response = await axios.get("https://jsonplaceholder.typicode.com/userssfsdf");

      setUsers(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
