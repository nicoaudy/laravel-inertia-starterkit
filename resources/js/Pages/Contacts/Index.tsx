import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Filter from "@/components/filter";
import { Contact, IDefaultData, User } from "@/types/interfaces";
import ResponsivePagination from "@/components/responsive-pagination";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/Can";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { TableCellSort } from "@/components/table-cell-sort";
import useFilterPagination from "@/hooks/useFilterPagination";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import React from "react";

interface PropsData extends IDefaultData {
  data: Contact[];
}

const Index = () => {
  const props = usePage().props;
  const contacts = props.contacts as PropsData;

  const [form, setForm] = useFilterPagination();

  const handleSort = (s: string) => {
    const newSortDir = form.sortBy === s && form.sortDir === "asc" ? "desc" : "asc";
    setForm((prevForm) => ({
      ...prevForm,
      sortBy: s,
      sortDir: newSortDir,
    }));
  };

  const ths = (
    <TableRow>
      <TableHead>No. </TableHead>
      <TableHead>
        <TableCellSort
          title='Name'
          sortBy='name'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
      <TableHead>
        <TableCellSort
          title='Email'
          sortBy='email'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
      <TableHead>City</TableHead>
      <TableHead>Phone</TableHead>
      <TableHead>
        <TableCellSort
          title='Created At'
          sortBy='created_at'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
      <TableHead></TableHead>
    </TableRow>
  );

  const rows = contacts.data.map(({ id, name, email, city, phone, created_at }, index: number) => (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{created_at}</TableCell>
      <TableCell>
        <Can permission='edit contact'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={route("contacts.edit", id)}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </Can>
      </TableCell>
    </TableRow>
  ));

  return (
    <React.Fragment>
      <Head title='Users' />

      <div className='flex justify-between items-center mb-8'>
        <Filter />

        <Can permission='add contact'>
          <Link href={route("contacts.create")}>
            <Button>Create contact</Button>
          </Link>
        </Can>
      </div>

      {rows.length === 0 && <EmptyPlaceholder title='Data not found.' className='mt-4' />}
      {rows.length !== 0 && (
        <Table>
          <TableHeader>{ths}</TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      )}

      <ResponsivePagination source={contacts} />
    </React.Fragment>
  );
};

Index.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Index;
