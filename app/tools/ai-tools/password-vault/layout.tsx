import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Secure Password Generator & Encryptor | 100% Private | Tulz.net",
  description: "Generate secure passwords and encrypt notes using Web Crypto API. Everything stays in your browser, 100% private.",
  keywords: ["password generator", "secure passwords", "password vault", "encryption tool", "web crypto"],
}

export default function PasswordVaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
