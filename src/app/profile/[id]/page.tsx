import React from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const UserProfilePage = async ({ params }: Props) => {
  const { id } = await params;
  return <div>UserId: {id}</div>;
};

export default UserProfilePage;