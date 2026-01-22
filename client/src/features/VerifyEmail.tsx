import { Item } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Maddox_Link } from "@/components/ui/maddox_customs/maddox_link";
import { Text } from "@/components/ui/maddox_customs/maddox_text";
import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

function VerifyEmail() {
  const code = useParams({ from: "/email/verify/$code" });
  console.log(code);

  const navigate = useNavigate();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
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
              <Text>
                The link is either Invalid or expired.{""}
                <Maddox_Link onClick={() => navigate({ to: "/" })}>
                  Get a new Link
                </Maddox_Link>
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { VerifyEmail };
