import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { login } from "@/lib/api";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isValidEmail } from "@/lib/validEmail";

export function LoginComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const {
    mutate: signin,
    error,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: () => {
      console.log(error?.message);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Einloggen</CardTitle>
          <CardDescription>Bitte gebe deine Emailadresse ein</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Passwort</FieldLabel>
                <a
                  onClick={() => navigate({ to: "/" })}
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Passwort vergessen?
                </a>
              </div>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    signin({ email, password });
                  }
                }}
              />
            </Field>
            <Field>
              <Button
                variant={"outline"}
                type="submit"
                isLoading={isPending}
                isDisabled={
                  !email || isValidEmail(email) || password.length < 6
                }
                onClick={() => signin({ email, password })}
              >
                Login
              </Button>

              <FieldDescription className="text-center">
                Kein Konto?{" "}
                <a
                  className="cursor-pointer"
                  onClick={() => navigate({ to: "/signup" })}
                >
                  Registrieren
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
