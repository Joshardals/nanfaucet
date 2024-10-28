

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen max-sm:p-5">
      <div className="bg-white shadow-md p-5 rounded-xl w-full sm:w-96">
        {children}
      </div>
    </div>
  );
}
