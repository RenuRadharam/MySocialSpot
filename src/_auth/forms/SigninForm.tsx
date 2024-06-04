import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { SigninValidation } from "@/lib/validation";

import  Loader   from "@/components/ui/shared/Loader";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";



const SigninForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSignInAccount();

 // 1. Define your form.
 const form = useForm<z.infer<typeof SigninValidation>>({
  resolver: zodResolver(SigninValidation),
  defaultValues: {
    email: '',
    password:'',
  },
})


// 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof SigninValidation>) {

  const session = await signInAccount({
    email: values.email,
    password: values.password,
  })
 
  if(!session) {
    toast({ title: 'Sign In error!! Please try again.' });
    return;
  }

  const isLoggedIn = await checkAuthUser();
  if(isLoggedIn) {
    form.reset();
    navigate('/')
  } else {
    toast({ title: 'Aww Snap! Please try again', });
    return;
  }
};
return (
  <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.png" alt="logo" style={{ width: '100px', height: '100px' }} /> 
      <p className="h3-bold md:h3-bold pt-5 sm:pt-12">MYSOCIALSPOT</p>
      <h2 className="h5-bold md:h5-bold pt-5 sm:pt-12">Log in to your account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">Welcome Back! Enter your details below to Login</p>
    
  
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
           {isUserLoading ? (
            <div className="flex-center gap-2">
               <Loader />    Please Wait...
            </div>
           ): "Sign In"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Not Registered?
          <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Click to Register now</Link>
        </p>
      </form>
      </div>
    </Form>
  );
};

export default SigninForm;