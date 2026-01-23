import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Maddox_Link } from "@/components/ui/maddox_customs/maddox_link";
import { Text } from "@/components/ui/maddox_customs/maddox_text";
import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function VerifyEmail() {
  const code = useParams({ from: "/email/verify/$code" });
  console.log(code);

  const navigate = useNavigate();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="flex justify-center mt-12">
      <div className="mx-auto max-w-md py-12 px-6 text-center">
        {isPending ? (
          <div>some spinner here</div>
        ) : (
          <div>
            <Item
              className="w-fit rounded-sm"
              status={isSuccess ? "success" : "error"}
            >
              <p>Some icon</p>
              {isSuccess ? "Email verified" : "invalid Link"}
            </Item>
            {isError && (
              <div className="flex flex-col">
                <Text>The link is either Invalid or expired.{""}</Text>
                <div className="flex flex-row">
                  <Button
                    variant={"outline"}
                    onClick={() => navigate({ to: "/" })}
                  >
                    Get a new Link
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    aria-label={"Submit"}
                  >
                    <ArrowUpRightIcon />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { VerifyEmail };
