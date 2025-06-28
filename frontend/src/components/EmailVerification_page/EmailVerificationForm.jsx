import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { emailVerificationSchema } from "../../lib/validation-schemas";

export default function EmailVerificationForm() {
  const form = useForm({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const inputRefs = useRef([]);

  async function onSubmit(values) {
    try {
      const verificationCode = values.code.join("");
      console.log("Verification code:", verificationCode);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ code: verificationCode }, null, 2)}
          </code>
        </pre>
      );
    } catch (error) {
      console.error("Verification error", error);
      toast.error("Failed to verify code. Please try again.");
    }
  }

  const handleInputChange = (index, value) => {
    // Only allow digits and limit to 1 character
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const currentCode = form.getValues("code");
    const newCode = [...currentCode];
    newCode[index] = value;
    form.setValue("code", newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    const currentCode = form.getValues("code");
    
    // Handle backspace
    if (e.key === "Backspace" && !currentCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pasteData.length === 6) {
      const newCode = pasteData.split("");
      form.setValue("code", newCode);
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const watchedCode = form.watch("code");
  const isCodeComplete = watchedCode.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6 sm:pb-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2 text-sm sm:text-base">
              Enter the 6-digit code sent to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-6">
                  {/* Verification Code Input */}
                  <FormField
                    control={form.control}
                    name="code"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-center block">
                          Verification Code
                        </FormLabel>
                        <FormControl>
                          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mt-4">
                            {watchedCode.map((digit, index) => (
                              <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                  handleInputChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border-2 border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 bg-white"
                                autoComplete="off"
                              />
                            ))}
                          </div>
                        </FormControl>
                        <div className="min-h-[20px] text-center">
                          <FormMessage className="text-red-500 text-sm" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={!isCodeComplete}
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 text-sm sm:text-base"
                  >
                    Verify Email
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
