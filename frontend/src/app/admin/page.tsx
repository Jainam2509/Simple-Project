"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    <section className="page-wrap admin-wrap">
      <h1>Admin Dashboard</h1>
      {loading ? <p>Loading users and contacts...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!loading && !error ? (
        <>
          <div className="table-card">
            <h2>Users</h2>
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

          <div className="table-card">
            <h2>Contacts</h2>
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
    </section>
  );
}
