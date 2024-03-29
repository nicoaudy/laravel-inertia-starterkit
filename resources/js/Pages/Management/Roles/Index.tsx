import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Filter from "@/components/filter";
import { IDefaultData } from "@/types/interfaces";
import ResponsivePagination from "@/components/responsive-pagination";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/Can";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { PageTabs } from "@/components/page-tabs";

interface Role {
  created_at: string;
  guard_name: string;
  id: number;
  name: string;
  updated_at: string;
}

interface IProps extends IDefaultData {
  data: Role[];
}

const Index = () => {
  const props = usePage().props;
  const roles = props.roles as IProps;
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
      <TableHead>No.</TableHead>
      <TableHead>
        <TableCellSort
          title='Guard'
          sortBy='guard_name'
          currentSortBy={form.sortBy}
          sortDir={form.sortDir}
          onSort={handleSort}
        />
      </TableHead>
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

  const rows = roles.data.map(({ id, guard_name, name, created_at }, index) => (
    <TableRow key={index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{guard_name}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{created_at}</TableCell>
      <TableCell className='py-3 px-6 text-center'>
        <Can permission='edit role'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={route("management.roles.edit", id)}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </Can>
      </TableCell>
    </TableRow>
  ));

  const navigation = [
    {
      title: "Users",
      href: route("management.users.index"),
      active: route().current("management.users.*"),
    },
    {
      title: "Roles",
      href: route("management.roles.index"),
      active: route().current("management.roles.*"),
    },
    {
      title: "Permissions",
      href: route("management.permissions.index"),
      active: route().current("management.permissions.*"),
    },
  ];

  return (
    <React.Fragment>
      <Head title='Roles' />

      <PageTabs navigation={navigation} className='mb-20' />

      <div className='flex justify-between items-center mb-8'>
        <Filter />

        <Can permission='add role'>
          <Link href={route("management.roles.create")}>
            <Button>Add new role</Button>
          </Link>
        </Can>
      </div>

      {rows.length === 0 && <EmptyPlaceholder title='Data not found' className='mt-4' />}
      {rows.length !== 0 && (
        <Table>
          <TableHeader>{ths}</TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      )}

      <ResponsivePagination source={roles} />
    </React.Fragment>
  );
};

Index.layout = (page: React.ReactNode) => <AuthenticatedLayout children={page} />;
export default Index;
