import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function ProtectedRoute(props) {
    const [user, setUser] = useState({});
    const router = useRouter();
  useEffect(() => {
    setUser(getCookie("user"));
    if (!user) {
      router.push("/");
    }
  }, [user]);

  function Content() {
    if (props.children) {
      if (user) {
        return props.children;
      } else {
          return null;
      }
    } else {
      return null;
    }
  }
  return <Content />;
}
