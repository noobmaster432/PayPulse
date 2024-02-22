import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { signIn } from "../utils/func";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../store/userAtom";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignIn = () => {
    signIn(formData).then((res) => {
      setUser(res);
      navigate("/dashboard");
    });
  }

  return (
    <div className="bg-slate-100 h-screen flex flex-col justify-center items-center">
      <div className="rounded-lg shadow-lg bg-white w-1/3 text-center py-4 px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          placeholder="name@example.com"
          label={"Email"}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <InputBox
          placeholder="••••••••"
          label={"Password"}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleSignIn} />
        </div>
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
