import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { forgotPasswordSchema } from "../../lib/validation-schemas";

const ForgotPasswordForm = forwardRef(
  ({ handleForgotPassword, isLoading }, ref) => {
    const form = useForm({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        email: "",
      },
    });

    // Expose reset function to parent component
    useImperativeHandle(ref, () => ({
      reset: () => form.reset(),
    }));

    const onSubmit = async ({ email }) => {
      await handleForgotPassword(email);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-slate-600 mt-2">
                Enter your email address to receive a password reset link.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-5">
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center mb-2">
                            <FormLabel className="text-slate-700 font-medium">
                              Email Address
                            </FormLabel>
                            <Link
                              to="/login"
                              className="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
                            >
                              Back to Login
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              id="email"
                              placeholder="Enter your email"
                              type="email"
                              autoComplete="email"
                              className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <div className="min-h-[20px]">
                            <FormMessage className="text-red-500 text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);

ForgotPasswordForm.displayName = "ForgotPasswordForm";

export default ForgotPasswordForm;
