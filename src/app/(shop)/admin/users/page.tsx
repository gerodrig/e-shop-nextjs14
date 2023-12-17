export const revalidate = 0;

import { Title } from '@/components';
import { redirect } from 'next/navigation';

import { getPaginatedUsers } from '@/actions';
import { UsersTable } from './ui/UsersTable';

export default async function AdminUsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="USers management" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
