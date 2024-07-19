import { Button, Flex, Heading, Text, AlertDialog } from "@radix-ui/themes";
import { deleteAccount, useAuth } from "@/backend/auth";
import { EditForm } from "./client";

export default async function AccountPage() {
  const auth = await useAuth();

  return (
    <div className="grid w-full gap-5">
      <EditForm email={auth.email} name={auth.username} />
      <section className="grid gap-1">
        <Heading size="3" weight="medium">
          Delete account
        </Heading>
        <Text>
          When you delete your account, all homes that you own will be deleted.
        </Text>
        <DeleteAccount />
      </section>
    </div>
  );
}

function DeleteAccount() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="w-fit !bg-red-600" color="red">
          Delete account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title weight="medium">Delete account</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? You can&apos;t undo this.
        </AlertDialog.Description>

        <Flex gap="3" justify="start" mt="4">
          <AlertDialog.Cancel>
            <Button color="gray" variant="surface">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <form action={deleteAccount}>
              <Button color="red" variant="surface">
                Delete
              </Button>
            </form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
