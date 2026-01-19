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

export function LoginComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate({ from: "/login" });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Einloggen</CardTitle>
          <CardDescription>Bitte gebe deine Emailadresse ein</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Passwort</FieldLabel>
                  <a
                    onClick={() =>
                      navigate({
                        to: "/verify-email",
                      })
                    }
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Passwort vergessen?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button variant={"outline"} type="submit">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Kein Konto?{" "}
                  <a
                    className="cursor-pointer"
                    onClick={() =>
                      navigate({
                        to: "/signup",
                      })
                    }
                  >
                    Registrieren
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
