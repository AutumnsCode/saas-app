import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center">
      <SignIn />
    </main>
  );
};
export default SignInPage;
