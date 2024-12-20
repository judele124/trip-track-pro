import { createContext, useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { API_BASE_URL } from "../env.config";
import { ILoginSchema } from "../zodSchemas/authSchemas";

interface IUser {
  email: string;
  name: string;
  _id: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuthContextValue {
  logout: () => Promise<void>;
  sendCode: ({ email }: ILoginSchema) => Promise<void>;
  verifyCode: (data: ILoginSchema) => Promise<void>;
  loading: boolean;
  sendCodeError: Error | null;
  verifyCodeError: Error | null;
  sendCodeStatus: number | undefined;
  verifyCodeStatus: number | undefined;
  user: IUser | null;
}

const AuthContext = createContext<null | IAuthContextValue>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [sendCodeError, setSendCodeError] = useState<Error | null>(null);
  const [verifyCodeError, setVerifyCodeError] = useState<Error | null>(null);
  const [sendCodeStatus, setSendCodeStatus] = useState<number | undefined>();
  const [verifyCodeStatus, setVerifyCodeStatus] = useState<
    number | undefined
  >();

  const [user, setUser] = useState<IUser | null>(null);

  const { activate, loading } = useAxios({ manual: true });

  const sendCode = async ({ email }: ILoginSchema) => {
    const url = `${API_BASE_URL}/auth/send-code`;
    const { error, status } = await activate({
      data: { email },
      url,
      method: "post",
    });
    setSendCodeStatus(status);
    if (error) {
      setSendCodeError(error);
    } else {
      setSendCodeError(null);
    }
  };

  const verifyCode = async (data: ILoginSchema) => {
    const url = `${API_BASE_URL}/auth/verify-code`;
    const {
      error,
      status,
      data: resData,
    } = await activate({ data, url, method: "post" });
    setVerifyCodeStatus(status);
    if (error) {
      setVerifyCodeError(error);
    } else {
      setUser(resData.user);
      setVerifyCodeError(null);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        sendCode,
        verifyCode,
        loading,
        sendCodeError,
        verifyCodeError,
        sendCodeStatus,
        verifyCodeStatus,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
