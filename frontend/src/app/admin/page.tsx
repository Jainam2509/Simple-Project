"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppNav from "../../components/AppNav";
import { getContactsApi, getLoggedInUser, getUsersApi } from "../../lib/api";
import { Contact, User } from "../../types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      const currentUser = getLoggedInUser();

      if (!currentUser || currentUser.role !== "admin") {
        router.replace("/login");
        return;
      }

      try {
        // Fetch both endpoints for the admin dashboard.
        const [usersResponse, contactsResponse] = await Promise.all([getUsersApi(), getContactsApi()]);

        setUsers(usersResponse.data);
        setContacts(contactsResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [router]);

  return (
    <main className="container">
      <div className="card">
        <h1>Admin Dashboard</h1>
        <AppNav />

        {loading ? <p>Loading users and contacts...</p> : null}
        {error ? <p className="message error">{error}</p> : null}

        {!loading && !error ? (
          <>
            <h2>All Users</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id || user.email}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>All Contacts</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id || `${contact.email}-${contact.name}`}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
