
"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

const Home = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/v1/users");
        const { users } = await res.json();
        setData(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <h1 className="text-3xl">{user.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Home;