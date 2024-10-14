import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/components/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(registerUser(formData));

    if (data.meta.requestStatus === "fulfilled") {
      toast({
        title: data?.payload?.message,
      });
      navigate("/auth/login");
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
          Create new account
        </h1>
        <p className="mt-1">
          Already have an account?
          <Link
            to={"/auth/login"}
            className="font-medium ml-2 text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={isLoading ? "Please wait..." : "Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={isLoading}
      />
    </div>
  );
};

export default Register;
