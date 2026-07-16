import type { ReactNode } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import OcmComplianceNotice from "@/components/ocm-compliance-notice";

interface PublicPageLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function PublicPageLayout({ children, header, footer }: PublicPageLayoutProps) {
  return (
    <>
      {header ?? <Navigation />}
      {children}
      <OcmComplianceNotice />
      {footer ?? <Footer />}
    </>
  );
}
