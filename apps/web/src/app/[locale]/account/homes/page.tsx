import { Button, Heading, Table } from "@radix-ui/themes";
import { deleteHome, getHomes } from "@/backend/home";

export default async function HomesPage() {
  const homes = await getHomes();
  if (!homes.succ || !homes.data) return <p>Can&apos;t fetch homes</p>;

  return (
    <div className="grid w-full gap-5">
      <Heading weight="medium">Homes</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {homes.data.map((x) => (
            <Table.Row key={x.id}>
              <Table.RowHeaderCell>{x.name}</Table.RowHeaderCell>
              <Table.Cell>{x.id}</Table.Cell>
              <Table.Cell>
                <form action={deleteHome}>
                  <input className="hidden" name="home" readOnly value={x.id} />
                  <Button color="red" size="1" variant="surface">
                    Delete
                  </Button>
                </form>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
