import { IUser } from '@/utils/interface';
import React from 'react';

async function User({ userId }: { userId: number }) {
  try {
    const userResponse = await fetch(`https://jsonplaceholder.org/users/${userId}`);
    if (!userResponse.ok) throw new Error('Failed to fetch the user');
    const user = (await userResponse.json()) as IUser;

    return (
      <div>
        <p className="font-medium">👤 Author: {user.firstname} {user.lastname} ( {user.login.username} )</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="text-red-500">
        <p>Failed to load user information.</p>
      </div>
    );
  }
}

export default User;