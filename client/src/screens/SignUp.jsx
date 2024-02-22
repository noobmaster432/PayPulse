import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { signUp } from "../utils/func";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../store/userAtom";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignUp = () => {
    signUp(formData)
      .then((res) => {
        setUser(res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error signing up:", err);
      });
  }

  return (
    <div className="bg-slate-100 h-screen flex flex-col justify-center items-center">
      <div className="rounded-lg shadow-lg bg-white w-1/3 text-center p-2 px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your details to create an account"} />
        <InputBox
          placeholder="John"
          label={"First Name"}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <InputBox
          placeholder="Doe"
          label={"Last Name"}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
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
          <Button label={"Sign up"} onClick={handleSignUp} />
        </div>
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
