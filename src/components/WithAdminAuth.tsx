import { account } from "@/helpers/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WithAdminAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAdmin = async () => {
        try {
          await account.get();
          setIsLoading(false);
        } catch {
          router.replace("/admin/login");
        }
      };

      checkAdmin();
    }, [router]);

    if (isLoading)
      return (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Loading...
        </div>
      );

    return <WrappedComponent {...props} />;
  };
};

export default WithAdminAuth;
