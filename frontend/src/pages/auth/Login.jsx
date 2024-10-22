import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(loginUser(formData));

    if (data.meta.requestStatus === "fulfilled") {
      toast({
        title: data?.payload?.message,
      });
    } else if (data.meta.requestStatus === "rejected") {
      toast({
        title: data.payload?.message || error || "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-1">
          Don't have an account?
          <Link
            to={"/auth/register"}
            className="font-medium ml-2 text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={isLoading ? "Please wait..." : "Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={isLoading}
      />
    </div>
  );
};

export default Login;
