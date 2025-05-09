import { getCurrentSession, loginUser, } from '@/actions/auth';
import SignInpage from '@/app/Component/sign-in-sign-up/signInPage';


import { redirect } from 'next/navigation';
import React from 'react';
import zod from 'zod';

const SignInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
})

const SignInPage2 = async () => {
  const { user } = await getCurrentSession();

  if (user) {
      return redirect('/');
  }

  const action = async (prevState: string, formData: FormData) => {
      "use server";
      const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
      if(!parsed.success) {
          return {
              message: "Invalid form data",
          };
      }
      const { email, password } = parsed.data;
      const { user, error } = await loginUser(email, password);
      if(error) {
          return { message: error };
      } else if(user) {
       
          return redirect("/");
      }
  }
  return <SignInpage action={action}/>;
};
export default SignInPage2 ;