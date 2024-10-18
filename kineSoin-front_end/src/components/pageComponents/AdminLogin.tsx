import CustomButton from '../standaloneComponents/Button/CustomButton.tsx';

export default function AdminLogin() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primaryBlue">
          Connexion administrateur
        </h1>
        <form action="" method="POST" className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primaryBlue"
            >
              Adresse email
            </label>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              id="admin-email_input"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primaryTeal  p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primaryBlue"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              id="admin-password_input"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primaryTeal  p-2"
              required
            />
          </div>
          <div className="flex justify-center">
            <CustomButton btnText="Se connecter" normalBtn btnType="submit" />
          </div>
        </form>
      </section>
    </main>
  );
}
