import AppNav from "../components/AppNav";

export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Simple Full Stack Demo</h1>
        <p>
          This project demonstrates the complete flow: Frontend to Backend to MongoDB and back to Frontend.
        </p>

        <AppNav />

        <h2>What you can test</h2>
        <p>1. Create user from Signup page</p>
        <p>2. Login user from Login page</p>
        <p>3. Submit contact form from Contact page</p>
        <p>4. View all users and contacts in Admin page</p>
      </div>
    </main>
  );
}
